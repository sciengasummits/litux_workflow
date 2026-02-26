import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import './PricingSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_PACKAGES = [
    {
        title: 'SPEAKER', price: '799', currency: '$',
        features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
    },
    {
        title: 'DELEGATE', price: '899', currency: '$', featured: true,
        features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
    },
    {
        title: 'STUDENT', price: '499', currency: '$',
        features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
    }
];

const PricingSection = () => {
    const navigate = useNavigate();
    const [pricing, setPricing] = useState({ title: 'REGISTRATION PRICING', packages: DEFAULT_PACKAGES });

    useEffect(() => {
        fetchContent('pricing').then(data => {
            if (data) setPricing(prev => ({ ...prev, ...data }));
        });
    }, []);

    const packages = pricing.packages?.length > 0 ? pricing.packages : DEFAULT_PACKAGES;

    return (
        <section className="pricing-section section-padding">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">{pricing.title}</h2>
                    <div className="section-line"></div>
                </div>
                <div className="pricing-grid">
                    {packages.map((plan, idx) => (
                        <div key={idx} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                            <div className="pricing-header">
                                <h3 className="pricing-title">{plan.title?.toUpperCase()}</h3>
                                <div className="pricing-price">
                                    <span className="currency">{plan.currency || '$'}</span>
                                    <span className="amount">{plan.price}</span>
                                </div>
                            </div>
                            <ul className="pricing-features">
                                {(plan.features || []).map((feature, i) => (
                                    <li key={i} className="pricing-feature">
                                        <Check size={20} className="check-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="pricing-btn" onClick={() => navigate('/register')}>
                                REGISTER NOW
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
