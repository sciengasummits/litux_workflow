import React, { useState } from 'react';
import { submitRegistration } from '../../api/siteApi';
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

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
        "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
        "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
        "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
        "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
        "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
        "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
        "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
        "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

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
    const earlyBirdEnd = new Date('2026-09-25');
    const standardEnd = new Date('2026-10-30');
    // const earlyBirdEnd = new Date('2026-10-25');
    // const standardEnd = new Date('2027-02-16');

    let activePhase;

    if (currentDate <= earlyBirdEnd) {
        activePhase = 'early';
    } else if (currentDate <= standardEnd) {
        activePhase = 'standard';
    } else {
        activePhase = 'onspot';
    }

    // Pricing Data
    const baseAcademicPricing = [
        { id: 'speaker', label: 'Speaker Registration', early: 749, standard: 849, onspot: 949 },
        { id: 'delegate', label: 'Delegate Registration', early: 899, standard: 999, onspot: 1099 },
        { id: 'poster', label: 'Poster Registration', early: 449, standard: 549, onspot: 649 },
        { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 },
        { id: 'virtual', label: 'Virtual (Online)', early: 199, standard: 249, onspot: 299 },
    ];

    const academicPricing = baseAcademicPricing.map(item => ({
        ...item,
        early: applyDiscount(item.early),
        standard: applyDiscount(item.standard),
        onspot: applyDiscount(item.onspot),
        original: item // Keep original for display
    }));

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

    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAcademicCategory && !selectedSponsorship) {
            setSubmitMsg({ type: 'error', text: 'Please select a registration category.' });
            return;
        }
        if (!termsAccepted) {
            setSubmitMsg({ type: 'error', text: 'Please accept the terms & conditions.' });
            return;
        }

        const total = calculateTotal();
        const selectedCat = academicPricing.find(p => p.id === selectedAcademicCategory);
        const selectedSponsor = sponsorshipPricing.find(p => p.id === selectedSponsorship);

        const payload = {
            ...formData,
            category: selectedCat ? selectedCat.label : (selectedSponsor ? selectedSponsor.label : ''),
            amount: total,
            phase: activePhase,
            accommodation: selectedAccommodation || '',
            sponsorship: selectedSponsor ? selectedSponsor.label : '',
            accompanyingPerson: includeAccompanying,
            status: 'pending',
        };

        setSubmitting(true);
        setSubmitMsg(null);
        try {
            await submitRegistration(payload);
            setSubmitMsg({ type: 'success', text: 'Registration submitted successfully! Our team will contact you shortly.' });
            handleReset();
        } catch (err) {
            setSubmitMsg({ type: 'error', text: 'Submission failed. Please try again or contact support.' });
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

                {isDiscounted && (
                    <div className="discount-banner">
                        <span className="discount-icon">🎉</span>
                        <div className="discount-text">
                            <h3>Special Discount Activated!</h3>
                            <p>You have unlocked a <strong>20% discount</strong> on all registration categories.</p>
                        </div>
                    </div>
                )}

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
                                    <span className="date">September 25, 2026</span>
                                    {activePhase === 'early' && <span className="badge-active">ACTIVE</span>}
                                </th>
                                <th className={activePhase === 'standard' ? 'active-header-standard' : ''}>
                                    Standard Registration<br />
                                    <span className="date">October 30, 2026</span>
                                    {activePhase === 'standard' && <span className="badge-active">ACTIVE</span>}
                                </th>
                                <th className={activePhase === 'onspot' ? 'active-header-onspot' : ''}>
                                    OnSpot Registration<br />
                                    <span className="date">December 14, 2026</span>
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
                                        <div className="price-wrapper">
                                            {isDiscounted && <span className="original-price">${item.original.early}</span>}
                                            <span className={activePhase === 'early' ? 'price-active' : ''}>$ {item.early}</span>
                                        </div>
                                    </td>
                                    <td className={`${activePhase === 'standard' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                        <div className="price-wrapper">
                                            {isDiscounted && <span className="original-price">${item.original.standard}</span>}
                                            <span className={activePhase === 'standard' ? 'price-active' : ''}>$ {item.standard}</span>
                                        </div>
                                    </td>
                                    <td className={`${activePhase === 'onspot' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                        <div className="price-wrapper">
                                            {isDiscounted && <span className="original-price">${item.original.onspot}</span>}
                                            <span className={activePhase === 'onspot' ? 'price-active' : ''}>$ {item.onspot}</span>
                                        </div>
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
                            I've read and accept the <span className="terms-link">terms &amp; conditions</span>.
                        </label>
                    </div>

                    <p className="processing-fee">Note: 5% of processing charges will be applicable.</p>

                    {submitMsg && (
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: '8px',
                            marginBottom: '12px',
                            background: submitMsg.type === 'success' ? '#dcfce7' : '#fee2e2',
                            color: submitMsg.type === 'success' ? '#166534' : '#991b1b',
                            border: `1px solid ${submitMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                            fontWeight: '500',
                        }}>
                            {submitMsg.text}
                        </div>
                    )}

                    <div className="action-buttons">
                        <button className="btn-register" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? 'Submitting...' : 'REGISTER NOW'}
                        </button>
                        <button className="btn-reset" onClick={handleReset}>RESET</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
