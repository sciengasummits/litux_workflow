import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import './DiscountRegistration.css';

// Comprehensive list of all countries
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

const DiscountRegistration = () => {
    const [discountCode, setDiscountCode] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
        address: ''
    });
    
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSponsorship, setSelectedSponsorship] = useState('');
    const [includeAccompanying, setIncludeAccompanying] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const registrationCategories = [
        { id: 'speaker', label: 'Speaker Registration', early: 749, standard: 849, onspot: 949 },
        { id: 'delegate', label: 'Delegate Registration', early: 899, standard: 999, onspot: 1099 },
        { id: 'poster', label: 'Poster Registration', early: 449, standard: 549, onspot: 649 },
        { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 },
        { id: 'virtual', label: 'Virtual (Online)', early: 199, standard: 249, onspot: 299 }
    ];

    const sponsorshipOptions = [
        { id: 'platinum', label: 'Platinum Sponsor', price: 4999 },
        { id: 'diamond', label: 'Diamond Sponsor', price: 3999 },
        { id: 'gold', label: 'Gold Sponsor', price: 2999 },
        { id: 'exhibitor', label: 'Exhibitor', price: 1999 }
    ];

    const accommodationOptions = [
        { nights: 2, single: 360, double: 400, triple: 440 },
        { nights: 3, single: 540, double: 600, triple: 660 },
        { nights: 4, single: 720, double: 800, triple: 880 },
        { nights: 5, single: 900, double: 1000, triple: 1100 }
    ];

    const activePhase = 'early';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () => {
        let total = 0;
        
        if (selectedCategory) {
            const category = registrationCategories.find(c => c.id === selectedCategory);
            if (category) total += category[activePhase];
        }
        
        if (selectedSponsorship) {
            const sponsor = sponsorshipOptions.find(s => s.id === selectedSponsorship);
            if (sponsor) total += sponsor.price;
        }
        
        if (includeAccompanying) total += 249;
        
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const option = accommodationOptions.find(o => o.nights === parseInt(nights));
            if (option) total += option[type];
        }
        
        return total;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Registration submitted successfully! (This is a demo)');
    };

    return (
        <div className="discount-registration-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Discount Registration</h1>
                    <p className="page-breadcrumb">Home / Register / Discount</p>
                </div>
            </div>

            <div className="container section-padding">
                <form className="discount-reg-form-full" onSubmit={handleSubmit}>
                    {/* Discount Code Section */}
                    <div className="discount-code-section">
                        {/* Payment Badges - Top Right Corner */}
                        <div className="payment-badges-box">
                            <div className="stripe-header">
                                <span className="stripe-text">stripe</span>
                                <span className="secure-text">SECURE<br/>PAYMENTS</span>
                            </div>
                            <div className="payment-icons-small">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" />
                            </div>
                        </div>
                        
                        <div className="discount-code-header">
                            <h3><span className="tag-icon">🏷️</span> Have a Discount Code?</h3>
                            <p>Enter the discount code provided by the organizers to get reduced pricing.</p>
                        </div>
                        <div className="discount-code-input-group">
                            <input
                                type="text"
                                placeholder="ENTER DISCOUNT CODE (E.G. SAVE20)"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="discount-code-input"
                            />
                            <button type="button" className="apply-code-btn">Apply Code</button>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="form-section">
                        <h3 className="section-title">Personal Details</h3>
                        <div className="form-grid">
                            <select name="title" value={formData.title} onChange={handleChange} className="form-input" required>
                                <option value="">Select Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                                <option value="Dr">Dr</option>
                                <option value="Prof">Prof</option>
                            </select>
                            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className="form-input" required />
                            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} className="form-input" required />
                            <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} className="form-input" required />
                            <select name="country" value={formData.country} onChange={handleChange} className="form-input" required>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            <input type="text" name="company" placeholder="Company / University" value={formData.company} onChange={handleChange} className="form-input" />
                            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-input full-width" rows="3"></textarea>
                        </div>
                    </div>

                    {/* Registration Category */}
                    <div className="form-section">
                        <h3 className="section-title">Select Registration Category</h3>
                        <div className="category-table">
                            <div className="category-header">
                                <div className="category-col category-label">Category</div>
                                <div className="category-col category-early active">
                                    <span className="phase-title">Early Bird</span>
                                    <span className="phase-date">Sep 15, 2026</span>
                                    <span className="phase-badge">ACTIVE</span>
                                </div>
                                <div className="category-col category-standard">
                                    <span className="phase-title">Standard</span>
                                    <span className="phase-date">Oct 30, 2026</span>
                                </div>
                                <div className="category-col category-onspot">
                                    <span className="phase-title">On-Spot</span>
                                    <span className="phase-date">Dec 14, 2026</span>
                                </div>
                            </div>
                            {registrationCategories.map((cat) => (
                                <div key={cat.id} className={`category-row ${selectedCategory === cat.id ? 'selected' : ''}`}>
                                    <div className="category-col category-label">
                                        <label>
                                            <input type="radio" name="category" value={cat.id} checked={selectedCategory === cat.id} onChange={(e) => setSelectedCategory(e.target.value)} />
                                            {cat.label}
                                        </label>
                                    </div>
                                    <div className="category-col">${cat.early}</div>
                                    <div className="category-col">${cat.standard}</div>
                                    <div className="category-col">${cat.onspot}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sponsorship */}
                    <div className="form-section">
                        <h3 className="section-title">Sponsorship Opportunities</h3>
                        <div className="sponsorship-grid">
                            {sponsorshipOptions.map((sponsor) => (
                                <div key={sponsor.id} className={`sponsorship-option ${selectedSponsorship === sponsor.id ? 'selected' : ''}`}>
                                    <div className="sponsor-label">{sponsor.label}</div>
                                    <label className="sponsor-radio-label">
                                        <input type="radio" name="sponsorship" value={sponsor.id} checked={selectedSponsorship === sponsor.id} onChange={(e) => setSelectedSponsorship(e.target.value)} />
                                        <div className="sponsor-price">${sponsor.price}</div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Accommodation */}
                    <div className="form-section">
                        <h3 className="section-title">Accommodation</h3>
                        <div className="accompanying-checkbox">
                            <label>
                                <input type="checkbox" checked={includeAccompanying} onChange={(e) => setIncludeAccompanying(e.target.checked)} />
                                Include Accompanying Person ($249 extra)
                            </label>
                        </div>
                        <div className="accommodation-table">
                            <div className="accommodation-header">
                                <div>Nights</div>
                                <div>Single Occupancy</div>
                                <div>Double Occupancy</div>
                                <div>Triple Occupancy</div>
                            </div>
                            {accommodationOptions.map((option) => (
                                <div key={option.nights} className="accommodation-row">
                                    <div>{option.nights} Nights</div>
                                    <div><label><input type="radio" name="accommodation" value={`${option.nights}-single`} checked={selectedAccommodation === `${option.nights}-single`} onChange={(e) => setSelectedAccommodation(e.target.value)} /> ${option.single}</label></div>
                                    <div><label><input type="radio" name="accommodation" value={`${option.nights}-double`} checked={selectedAccommodation === `${option.nights}-double`} onChange={(e) => setSelectedAccommodation(e.target.value)} /> ${option.double}</label></div>
                                    <div><label><input type="radio" name="accommodation" value={`${option.nights}-triple`} checked={selectedAccommodation === `${option.nights}-triple`} onChange={(e) => setSelectedAccommodation(e.target.value)} /> ${option.triple}</label></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total and Submit */}
                    <div className="form-section total-section">
                        <div className="total-display">
                            <span>TOTAL AMOUNT (USD):</span>
                            <span className="total-amount">${calculateTotal()}</span>
                        </div>
                        <div className="terms-checkbox">
                            <label>
                                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
                                I've read and accept the <a href="#">terms & conditions</a>
                            </label>
                        </div>
                        <p className="processing-note">Note: 5% processing charges will be applicable.</p>
                        <div className="form-actions">
                            <Button type="submit">REGISTER NOW</Button>
                            <button type="button" className="btn-reset" onClick={() => window.location.reload()}>RESET</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DiscountRegistration;