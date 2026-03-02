import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../../common/Button/Button';
import './RegistrationPricingSection.css';

const RegistrationPricingSection = () => {
    const navigate = useNavigate();

    const pricingPlans = [
        {
            title: 'SPEAKER',
            price: '799',
            features: [
                'Oral Presentation',
                'Networking with Fellow Speakers',
                'E-Abstract Book',
                'Certificate of Attendance',
                'Conference Schedule Handout',
                'Access to All Sessions and Workshops',
                'Lunch and Coffee Breaks'
            ]
        },
        {
            title: 'DELEGATE',
            price: '899',
            features: [
                'Delegate Opportunities',
                'Connect with Fellow Delegates',
                'E-Abstract Book',
                'Certificate of Attendance',
                'Conference Schedule Handout',
                'Access to All Sessions and Workshops',
                'Lunch and Coffee Breaks'
            ],
            highlighted: true
        },
        {
            title: 'STUDENT',
            price: '499',
            features: [
                'Student Presentation',
                'Meet Our Experts',
                'E-Abstract Book',
                'Certificate of Attendance',
                'Conference Schedule Handout',
                'Access to All Sessions and Workshops',
                'Lunch and Coffee Breaks'
            ]
        }
    ];

    return (
        <section className="registration-pricing section-padding">
            <div className="container">
                <h2 className="section-title text-center">REGISTRATION PRICING</h2>
                
                <div className="pricing-cards">
                    {pricingPlans.map((plan, index) => (
                        <div 
                            key={index} 
                            className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
                        >
                            <div className="pricing-header">
                                <h3 className="pricing-title">{plan.title}</h3>
                                <div className="pricing-amount">
                                    <span className="currency">$</span>
                                    <span className="price">{plan.price}</span>
                                </div>
                            </div>
                            
                            <ul className="pricing-features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <Check size={18} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <Button onClick={() => navigate('/register')}>
                                REGISTER NOW
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RegistrationPricingSection;
