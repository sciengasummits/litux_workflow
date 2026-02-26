import React, { useState } from 'react';
import { submitRegistration } from '../../api/siteApi';
import { countries } from '../../data/countriesData';
import './Register.css';



const Register = ({ isDiscounted = false }) => {
    // State for form fields
    const [formData, setFormData] = useState({
        designation: '',
        fullName: '',
        email: '',
        telephone: '',
        country: '',
        company: '',
        address: ''
    });

    // State for selected academic category (Radio)
    const [selectedAcademicCategory, setSelectedAcademicCategory] = useState(null);

    // State for Terms
    const [termsAccepted, setTermsAccepted] = useState(false);

    // New State for Accommodation
    const [includeAccompanying, setIncludeAccompanying] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [selectedSponsorship, setSelectedSponsorship] = useState(null);

    // Discount multiplier (20% off if discounted)
    const discountMultiplier = isDiscounted ? 0.8 : 1;
    const applyDiscount = (price) => Math.round(price * discountMultiplier);

    // Date Logic to determine active phase
    const currentDate = new Date();
    const earlyBirdEnd = new Date('2026-09-29');
    const standardEnd = new Date('2026-10-30');

    let activePhase = 'early';

    if (currentDate <= earlyBirdEnd) {
        activePhase = 'early';
    } else if (currentDate <= standardEnd) {
        activePhase = 'standard';
    } else {
        activePhase = 'onspot';
    }

    // Pricing Data
    const academicPricing = [
        { id: 'speaker', label: 'Speaker Registration ', early: applyDiscount(749), standard: applyDiscount(849), onspot: applyDiscount(949) },
        { id: 'delegate', label: 'Delegate Registration', early: applyDiscount(899), standard: applyDiscount(999), onspot: applyDiscount(1099) },
        { id: 'poster', label: 'Poster Registration', early: applyDiscount(449), standard: applyDiscount(549), onspot: applyDiscount(649) },
        { id: 'student', label: 'Student ', early: applyDiscount(299), standard: applyDiscount(399), onspot: applyDiscount(499) },
        { id: 'virtual', label: 'Virtual(Online)', early: applyDiscount(199), standard: applyDiscount(249), onspot: applyDiscount(299) },
    ];

    const accommodationOptions = [
        { nights: 2, single: 360, double: 400, triple: 440 },
        { nights: 3, single: 540, double: 600, triple: 660 },
        { nights: 4, single: 720, double: 800, triple: 880 },
        { nights: 5, single: 900, double: 1000, triple: 1100 },
    ];

    const sponsorshipPricing = [
        { id: 'platinum', label: 'Platinum Sponsor', price: applyDiscount(4999) },
        { id: 'diamond', label: 'Diamond Sponsor', price: applyDiscount(3999) },
        { id: 'gold', label: 'Gold Sponsor', price: applyDiscount(2999) },
        { id: 'exhibitor', label: 'Exhibitor', price: applyDiscount(1999) },
    ];

    // Helper to calculate total
    const calculateTotal = () => {
        let total = 0;

        // Add Academic Registration
        if (selectedAcademicCategory) {
            const item = academicPricing.find(p => p.id === selectedAcademicCategory);
            if (item) {
                // Use activePhase price
                total += item[activePhase];
            }
        }

        // Add Sponsorship
        if (selectedSponsorship) {
            const item = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (item) {
                total += item.price;
            }
        }

        // Add Accompanying Person
        if (includeAccompanying) {
            total += 249;
        }

        // Add Accommodation
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const option = accommodationOptions.find(o => o.nights === parseInt(nights));
            if (option) {
                total += option[type];
            }
        }

        return total;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [submitting, setSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null); // 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            alert('Please fill in your Full Name and Email before submitting.');
            return;
        }

        const total = calculateTotal();

        // Build description string
        const descParts = [];
        if (selectedAcademicCategory) {
            const cat = academicPricing.find(p => p.id === selectedAcademicCategory);
            if (cat) descParts.push(`${cat.label} : $${cat[activePhase]}`);
        }
        if (selectedSponsorship) {
            const sp = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (sp) descParts.push(`${sp.label} : $${sp.price}`);
        }
        if (includeAccompanying) descParts.push('Accompanying Person : $249');
        if (selectedAccommodation) descParts.push(`Accommodation : ${selectedAccommodation}`);

        const payload = {
            title: formData.designation,
            name: formData.fullName,
            email: formData.email,
            phone: formData.telephone,
            country: formData.country,
            company: formData.company,
            address: formData.address,
            registrationCategory: selectedAcademicCategory
                ? academicPricing.find(p => p.id === selectedAcademicCategory)?.label || ''
                : '',
            accommodation: selectedAccommodation || '',
            sponsorship: selectedSponsorship
                ? sponsorshipPricing.find(p => p.id === selectedSponsorship)?.label || ''
                : '',
            accompanyingPerson: includeAccompanying,
            totalAmount: total,
            description: descParts.join('\n'),
            status: 'Pending',
        };

        setSubmitting(true);
        setSubmitStatus(null);
        try {
            // submitRegistration() from siteApi automatically adds conference:'foodagri'
            const result = await submitRegistration(payload);
            if (result?.error) throw new Error(result.error);
            setSubmitStatus('success');
            handleReset();
        } catch {
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            designation: '',
            fullName: '',
            email: '',
            telephone: '',
            country: '',
            company: '',
            address: ''
        });
        setSelectedAcademicCategory(null);
        setTermsAccepted(false);
        setIncludeAccompanying(false);
        setSelectedAccommodation(null);
        setSelectedSponsorship(null);
    };

    return (
        <div className="register-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Registration</h1>
                    <p className="page-breadcrumb">Home / Register</p>
                </div>
            </div>

            <div className="container section-padding">

                <div className="registration-form-container">
                    {/* Left Side: Form */}
                    <div className="form-section full-width-form">
                        <div className="form-row">
                            <select
                                name="designation"
                                className="form-control"
                                value={formData.designation}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Designation</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                                <option value="Dr">Dr</option>
                                <option value="Prof">Prof</option>
                                <option value="PhD">PhD</option>
                            </select>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="form-control"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-row">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="tel"
                                name="telephone"
                                placeholder="Telephone Number"
                                className="form-control"
                                value={formData.telephone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-row">
                            <select
                                name="country"
                                className="form-control"
                                value={formData.country}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="company"
                                placeholder="Company/University"
                                className="form-control"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-row full-width">
                            <textarea
                                name="address"
                                placeholder="Address"
                                className="form-control"
                                rows="3"
                                value={formData.address}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="pricing-section">
                    <h2 className="pricing-title">SELECT FROM VARIOUS CATEGORIES BELOW</h2>

                    <table className="pricing-table">
                        <thead>
                            <tr>
                                <th className="category-header">TYPES OF PARTICIPATION</th>
                                <th className={activePhase === 'early' ? 'active-header-early' : ''}>
                                    Early Bird Registration<br />
                                    <span className="date">September 29, 2026</span>
                                    {activePhase === 'early' && <span className="badge-active">ACTIVE</span>}
                                </th>
                                <th className={activePhase === 'standard' ? 'active-header-standard' : ''}>
                                    Standard Registration<br />
                                    <span className="date">October 30, 2026</span>
                                    {activePhase === 'standard' && <span className="badge-active">ACTIVE</span>}
                                </th>
                                <th className={activePhase === 'onspot' ? 'active-header-onspot' : ''}>
                                    OnSpot Registration<br />
                                    <span className="date">December 07, 2026</span>
                                    {activePhase === 'onspot' && <span className="badge-active">ACTIVE</span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {academicPricing.map(item => (
                                <tr key={item.id} className={selectedAcademicCategory === item.id ? 'selected-row' : ''}>
                                    <td className="item-cell">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="academicCategory"
                                                checked={selectedAcademicCategory === item.id}
                                                onChange={() => setSelectedAcademicCategory(item.id)}
                                            />
                                            {item.label}
                                        </label>
                                    </td>
                                    <td className={`${activePhase === 'early' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                        <span className={activePhase === 'early' ? 'price-active' : ''}>$ {item.early}</span>
                                    </td>
                                    <td className={`${activePhase === 'standard' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                        <span className={activePhase === 'standard' ? 'price-active' : ''}>$ {item.standard}</span>
                                    </td>
                                    <td className={`${activePhase === 'onspot' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                        <span className={activePhase === 'onspot' ? 'price-active' : ''}>$ {item.onspot}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* New Sponsorship Section matching layout */}
                    <table className="pricing-table sponsorship-table">
                        <thead>
                            <tr>
                                {sponsorshipPricing.map(item => (
                                    <th key={item.id}>{item.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {sponsorshipPricing.map(item => (
                                    <td key={item.id}>
                                        <label className="radio-label" style={{ justifyContent: 'center' }}>
                                            <input
                                                type="radio"
                                                name="sponsorship"
                                                checked={selectedSponsorship === item.id}
                                                onChange={() => setSelectedSponsorship(item.id)}
                                            />
                                            ${item.price}
                                        </label>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Accommodation Section */}
                <div className="accommodation-section">
                    <div className="accompanying-checkbox">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={includeAccompanying}
                                onChange={(e) => setIncludeAccompanying(e.target.checked)}
                            />
                            <strong>Include Accompanying Person ( $249 Extra)</strong>
                        </label>
                    </div>

                    <table className="accommodation-table">
                        <thead>
                            <tr>
                                <th>Accommodation</th>
                                <th>Single Occupancy</th>
                                <th>Double Occupancy</th>
                                <th>Triple Occupancy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accommodationOptions.map((option) => (
                                <tr key={option.nights}>
                                    <td className="nights-cell">For {option.nights} Nights</td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-single`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-single`)}
                                            />
                                            ${option.single}
                                        </label>
                                    </td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-double`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-double`)}
                                            />
                                            ${option.double}
                                        </label>
                                    </td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-triple`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-triple`)}
                                            />
                                            ${option.triple}
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="summary-section">
                    <div className="total-display">
                        <span className="total-label">TOTAL PRICE($) :</span>
                        <span className="total-amount">{calculateTotal()}</span>
                    </div>

                    <div className="terms-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            I've read and accept the <span className="terms-link">terms & conditions</span>.
                        </label>
                    </div>

                    <p className="processing-fee">Note: 5% of processing charges will be applicable.</p>

                    {submitStatus === 'success' && (
                        <div style={{ padding: '14px 20px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', color: '#15803d', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                            ✅ Registration submitted successfully! We will contact you shortly.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div style={{ padding: '14px 20px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                            ❌ Submission failed. Please check your connection and try again.
                        </div>
                    )}

                    <div className="action-buttons">
                        <button
                            className="btn-register"
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                        >
                            {submitting ? 'Submitting…' : 'REGISTER NOW'}
                        </button>
                        <button className="btn-reset" onClick={handleReset}>RESET</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
