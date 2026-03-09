import React from 'react';
import './Sponsors.css';
import Button from '../../components/common/Button/Button';

const Sponsors = () => {
    const packages = [
        {
            title: "Platinum Sponsorship",
            price: "$5000",
            features: [
                "4 Complimentary registrations",
                "Complementary workshop",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference",
                "15 Minutes presentation opportunity about company's products or services in the congress"
            ]
        },
        {
            title: "Gold Sponsorship",
            price: "$4000",
            features: [
                "3 Complimentary registrations",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference"
            ]
        },
        {
            title: "Silver Sponsorship",
            price: "$3000",
            features: [
                "2 Complimentary registrations",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference"
            ]
        },
        {
            title: "Exhibitor / Table exhibit",
            price: "$2500",
            features: [
                "1 Table in exhibition area",
                "2 Complimentary conference registrations",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference",
                "Direct interactions with participants"
            ]
        }
    ];

    return (
        <div className="pt-5">
            <div className="page-header" style={{ marginTop: '0' }}>
                <div className="container">
                    <h1 className="page-title">SPONSORSHIPS</h1>
                    <p className="page-breadcrumb">Home / Sponsorships</p>
                </div>
            </div>

            <div className="container section-padding sponsorship-packages">
                <div className="packages-grid">
                    {packages.map((pkg, index) => (
                        <div className="package-card" key={index}>
                            <h3 className="package-title">{pkg.title}</h3>
                            <span className="package-price">{pkg.price}</span>
                            <ul className="package-features">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx}><span className="check-icon">✓</span> {feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Info Box */}
                <div className="sponsorship-info-box">
                    <div className="info-text">
                        <p>
                            The exhibit provides a platform for companies and institutions to present their products and distribute brochures and business cards. The exhibit also
                            provides a unique networking opportunity with many experts and researchers.
                        </p>
                        <p>
                            For more information about sponsorship/exhibitor <a href="#" className="info-link">click here</a>.
                        </p>
                        <p>
                            If you are interested in sponsoring this event, please write an email to: <strong>sciengasummits@gmail.com</strong>
                        </p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Button onClick={() => window.location.href = '/register'}>Pay Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sponsors;
