import React from 'react';
import './DigitalBrochure.css';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DigitalBrochure = () => {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('print') === 'true') {
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    }, [location]);

    return (
        <div className="digital-brochure-container">
            <div className="brochure-nav">
                <button onClick={() => navigate('/brochure')} className="back-btn">
                    <ArrowLeft size={20} /> Back to Overview
                </button>
                <div className="brochure-nav-actions">
                    <span className="page-indicator">Digital Guide 2026</span>
                    <button className="nav-download-btn" onClick={() => window.print()}>
                        <Download size={18} /> Save as PDF
                    </button>
                </div>
            </div>

            <div className="digital-brochure-page">
                <div className="brochure-header">
                    <div className="brochure-badge">Official Guide</div>
                    <h1 className="brochure-title">
                        ANNUAL INTERNATIONAL CONFERENCE ON <br />
                        <span className="highlight-text">FOOD SCIENCE TECHNOLOGY AND AGRICULTURE</span> <br />
                        <span className="subtitle">Your Official Digital Platform Guide</span>
                    </h1>
                </div>

                <div className="brochure-body">
                    <p className="brochure-intro">
                        The Annual International Conference on Food Science Technology and Agriculture (AICFSTA) digital platform
                        is the single authoritative hub for the 2026 experience. Built for researchers, agriculturists,
                        food scientists, and delegates, the platform centralizes everything from program schedules and
                        speaker profiles to abstract submission workflows and sponsor engagement tools. Designed around
                        innovation and accessibility, it supports registration, personalized agendas, live updates,
                        and an integrated networking suite — all accessible via desktop and mobile.
                    </p>

                    <div className="info-boxes">
                        <div className="info-box">
                            <h3 className="box-title">Core Mission</h3>
                            <p className="box-text">
                                Deliver a streamlined, secure, and inclusive digital experience that enhances conference
                                participation and accelerates scientific exchange in food and agricultural sciences globally.
                            </p>
                        </div>
                        <div className="info-box">
                            <h3 className="box-title">Audience</h3>
                            <p className="box-text">
                                Food Scientists, Agricultural Researchers, Biotechnology Experts, Sustainability Specialists,
                                Industry Partners, and Policy Makers from around the world.
                            </p>
                        </div>
                        <div className="info-box">
                            <h3 className="box-title">Platform Highlights</h3>
                            <p className="box-text">
                                Registration, submissions, scheduling, live notifications, session streaming,
                                networking, and analytics — unified under one secure account.
                            </p>
                        </div>
                    </div>

                    <div className="theme-footer-note">
                        <div className="note-accent"></div>
                        <p>
                            Visual consistency is anchored in a professional agricultural palette — primary emphasis on
                            <strong> Deep Forest Green</strong> (#14532d) with <strong>Vibrant Leaf Green</strong> (#4ade80) accents.
                            This palette ensures premium readability and reflects our commitment to agricultural sustainability
                            and technological innovation.
                        </p>
                    </div>
                </div>

                <div className="brochure-page-footer">
                    <div className="footer-left">
                        <span className="footer-event">AICFSTA 2026 | Singapore</span>
                    </div>
                    <div className="footer-right">
                        <span>© 2026 Scienga Summits. Empowering Global Research.</span>
                    </div>
                </div>
            </div>

            <div className="print-hint">
                * For the best experience, use "Print to PDF" to save this digital brochure.
            </div>
        </div>
    );
};

export default DigitalBrochure;
