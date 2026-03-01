import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import './PricingSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_PACKAGES = [
    {
        title: 'SPEAKER', price: '799', currency: 'USD',
        features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
    },
    {
        title: 'DELEGATE', price: '899', currency: 'USD', featured: true,
        features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
    },
    {
        title: 'STUDENT', price: '499', currency: 'USD',
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
        <section className="pricing-section">
            <div className="container">
                <div className="pricing-grid">
                    {packages.map((plan, idx) => (
                        <div key={idx} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                            <div className="pricing-card__header">
                                <h3 className="pricing-card__title">{plan.title?.toUpperCase()}</h3>
                                <div className="pricing-card__price">
                                    <span className="currency">$</span>
                                    <span className="amount">{plan.price}</span>
                                </div>
                            </div>
                            <ul className="pricing-card__features">
                                {(plan.features || []).map((feature, i) => (
                                    <li key={i}>
                                        <Check size={18} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                className="pricing-card__button"
                                onClick={() => navigate('/register')}
                            >
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
