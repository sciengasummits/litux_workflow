import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import './PricingSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_PRICING = {
    title: 'REGISTRATION PRICING',
    packages: [
        {
            title: 'Speaker',
            price: '799',
            currency: 'USD',
            features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks'],
        },
        {
            title: 'Delegate',
            price: '899',
            currency: 'USD',
            features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks'],
        },
        {
            title: 'Student',
            price: '499',
            currency: 'USD',
            features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks'],
        },
    ],
};

const PricingSection = () => {
    const [pricing, setPricing] = useState(DEFAULT_PRICING);

    useEffect(() => {
        fetchContent('pricing').then(d => { if (d) setPricing(prev => ({ ...prev, ...d })); });
    }, []);

    return (
        <section className="pricing-section-home section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">{pricing.title}</h2>
                    <div className="section-title-underline"></div>
                </div>

                <div className="pricing-cards-container">
                    {(pricing.packages || []).map((pkg, index) => (
                        <div className="pricing-card-home" key={index}>
                            <div className="pricing-card-header">
                                <h3 className="pkg-title">{pkg.title}</h3>
                                <div className="pkg-price">
                                    <span className="currency">{pkg.currency === 'USD' ? '$' : pkg.currency}</span>
                                    <span className="amount">{pkg.price}</span>
                                </div>
                            </div>
                            <div className="pricing-card-body">
                                <ul className="pkg-features">
                                    {(pkg.features || []).map((feature, fIndex) => (
                                        <li key={fIndex}>
                                            <Check size={16} className="check-icon" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pricing-card-footer">
                                <Link to="/register" className="btn-register-home">REGISTER NOW</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
