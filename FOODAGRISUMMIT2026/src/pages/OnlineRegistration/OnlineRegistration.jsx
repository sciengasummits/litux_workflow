import React, { useState } from 'react';
import { countries } from '../../data/countriesData';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import './OnlineRegistration.css';



const OnlineRegistration = () => {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        phone: '',
        organization: '',
        country: '',
        description: '',
        amount: '',
        captcha: ''
    });

    const [captchaCode, setCaptchaCode] = useState('pz4tv9');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRefreshCaptcha = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your registration request. This is a demo submission.');
        console.log('Online Registration Data:', formData);
    };

    return (
        <div className="online-reg-page">
            <div className="reg-top-banner">
                <div className="container">
                    <div className="reg-tab-wrapper">
                    </div>
                </div>
            </div>

            <div className="container section-padding">
                <div className="online-reg-container">
                    <h1 className="online-reg-title">Registration</h1>

                    <div className="stripe-badge-wrapper">
                        <div className="stripe-badge">
                            <div className="stripe-header">
                                <span className="stripe-logo">stripe</span>
                                <span className="stripe-text">Secure<br />Payments</span>
                            </div>
                            <div className="stripe-cards">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Maestro" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" />
                            </div>
                        </div>
                    </div>

                    <form className="online-reg-form" onSubmit={handleSubmit}>
                        <div className="reg-form-grid">
                            <div className="form-group">
                                <select
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="reg-control"
                                >
                                    <option value="">Select Titles</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Ms">Ms.</option>
                                    <option value="Dr">Dr.</option>
                                    <option value="Prof">Prof.</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="reg-control"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="reg-control"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="reg-control"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="organization"
                                    placeholder="Organization Name"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="reg-control"
                                />
                            </div>

                            <div className="form-group">
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="reg-control"
                                >
                                    <option value="">Select country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Enter the description of your payment"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="reg-control"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter the Amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="reg-control"
                                />
                            </div>
                        </div>


                        <div className="reg-submit-wrapper">
                            <button type="submit" className="btn-online-register">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnlineRegistration;
