import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import './VisaInfo.css';

const VisaInfo = () => {
    const [email, setEmail] = useState('');

    const handleInviteRequest = (e) => {
        e.preventDefault();
        alert(`Request sent for ${email}`);
        setEmail('');
    };

    return (
        <div className="visa-page">
            <header className="page-header">
                <div className="container text-center">
                    <h1 className="page-title">Visa Information</h1>
                    <div className="page-breadcrumb">Home / Visa Info</div>
                </div>
            </header>

            <section className="section-padding visa-text-section">
                <div className="container">
                    <div className="visa-content-wrapper">
                        <h2 className="visa-main-title">VISA INFORMATION FOR INTERNATIONAL PARTICIPANTS</h2>

                        <p className="visa-intro-text">
                            The <strong>ANNUAL INTERNATIONAL CONFERENCE ON FOOD SCIENCE TECHNOLOGY AND AGRICULTURE</strong> welcomes speakers & delegates from all over the world.
                            Below is essential visa-related information to assist with your travel planning to Singapore:
                        </p>

                        <div className="visa-info-block">
                            <h3 className="visa-block-title">1. Do You Need a Visa?</h3>
                            <ul className="visa-list">
                                <li>
                                    <strong>Check if you require a visa to enter Singapore</strong> using the immigration & Checkpoints Authority (ICA) website or your local Singapore Embassy.
                                </li>
                                <li>
                                    Nationals of many countries (including <strong>USA, UK, Canada, Australia, Japan, and most EU countries</strong>) may enter Singapore for short-term visits (up to 30 or 90 days) without applying for a visa in advance.
                                </li>
                                <li>
                                    All visitors must complete the <strong>SG Arrival Card (SGAC)</strong> with Electronic Health Declaration within 3 days prior to arrival.
                                </li>
                            </ul>
                        </div>

                        <div className="visa-info-block">
                            <h3 className="visa-block-title">2. Visa Types</h3>
                            <ul className="visa-list">
                                <li>
                                    <strong>Short-Term Visit Pass:</strong> This is granted upon arrival for social visits, tourism, or attending short seminars/conferences.
                                </li>
                                <li>
                                    <strong>Entry Visa:</strong> For nationals of assessment level I and II countries, an entry visa is required before travel. Check the ICA website for the list of countries.
                                </li>
                            </ul>
                        </div>

                        <div className="visa-info-block">
                            <h3 className="visa-block-title">3. Required Documents</h3>
                            <ul className="visa-list">
                                <li>Valid passport (minimum 6 months validity from your planned date of arrival).</li>
                                <li>Proof of onward travel (confirmed return flight ticket).</li>
                                <li>Proof of accommodation (hotel booking confirmation).</li>
                                <li>Proof of sufficient financial means for the duration of stay.</li>
                                <li>Letter of Invitation (provided by the Summit Committee upon registration).</li>
                            </ul>
                        </div>

                        <div className="visa-info-block">
                            <h3 className="visa-block-title">4. Invitation Letter</h3>
                            <ul className="visa-list">
                                <li>
                                    Registered participants can request an official invitation letter to support their visa application.
                                    This letter confirms your registration and participation in the congress.
                                </li>
                            </ul>

                            {/* Simple Form embedded in the text flow or separated */}
                            <div className="simple-invite-form">
                                <p><strong>Request your Invitation Letter:</strong></p>
                                <form onSubmit={handleInviteRequest} className="text-invite-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button type="submit" variant="primary" className="btn-sm">Send Request</Button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisaInfo;
