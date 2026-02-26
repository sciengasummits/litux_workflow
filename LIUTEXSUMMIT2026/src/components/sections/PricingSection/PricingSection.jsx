import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../../common/Button/Button';
import './PricingSection.css';

const PricingSection = () => {
    const navigate = useNavigate();
    const pricingData = [
        {
            title: "Speaker",
            price: "799",
            features: [
                "Oral Presentation",
                "Networking with Fellow Speakers",
                "E-Abstract Book",
                "Certificate of Attendance",
                "Conference Schedule Handout",
                "Access to All Sessions and Workshops",
                "Lunch and Coffee Breaks"
            ]
        },
        {
            title: "Delegate",
            price: "899",
            features: [
                "Delegate Opportunities",
                "Connect with Fellow Delegates",
                "E-Abstract Book",
                "Certificate of Attendance",
                "Conference Schedule Handout",
                "Access to All Sessions and Workshops",
                "Lunch and Coffee Breaks"
            ]
        },
        {
            title: "Student",
            price: "499",
            features: [
                "Student Presentation",
                "Meet Our Experts",
                "E-Abstract Book",
                "Certificate of Attendance",
                "Conference Schedule Handout",
                "Access to All Sessions and Workshops",
                "Lunch and Coffee Breaks"
            ]
        }
    ];

    return (
        <section className="pricing-section-home section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">REGISTRATION PRICING</h2>
                    <div className="section-title-underline"></div>
                </div>

                <div className="pricing-cards-container">
                    {pricingData.map((pkg, index) => (
                        <div className="pricing-card-home" key={index}>
                            <div className="pricing-card-header">
                                <h3 className="pkg-title">{pkg.title}</h3>
                                <div className="pkg-price">
                                    <span className="currency">$</span>
                                    <span className="amount">{pkg.price}</span>
                                </div>
                            </div>
                            <div className="pricing-card-body">
                                <ul className="pkg-features">
                                    {pkg.features.map((feature, fIndex) => (
                                        <li key={fIndex}>
                                            <Check size={16} className="check-icon" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pricing-card-footer">
                                <Button
                                    className="w-100"
                                    onClick={() => navigate('/register')}
                                >
                                    REGISTER NOW
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
