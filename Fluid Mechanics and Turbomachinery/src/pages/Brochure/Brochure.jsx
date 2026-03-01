import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Brochure.css';
import brochurePdf from '../../assets/brochure/World-General-Medicine-Congress-Your-Official-Digital-Platform.pdf';
import { Download, FileText, CheckCircle, Globe } from 'lucide-react';

const Brochure = () => {
    const navigate = useNavigate();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = brochurePdf;
        link.download = 'Fluid-Mechanics-and-Turbomachinery-Summit-2026-Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewOnline = () => {
        navigate('/online-brochure');
    };

    return (
        <div className="brochure-page pt-5">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Conference Brochure</h1>
                    <p className="page-breadcrumb">Home / Brochure</p>
                </div>
            </div>

            <section className="brochure-content section-padding">
                <div className="container">
                    <div className="brochure-grid">
                        <div className="brochure-preview">
                            <div className="preview-card">
                                <div className="preview-icon">
                                    <Globe size={64} strokeWidth={1} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem' }}>INTERNATIONAL CONFERENCE ON FLUID MECHANICS & TURBOMACHINERY</h3>
                                <p>Official Digital Platform Brochure</p>
                                <div className="preview-badge">2026 Edition</div>
                            </div>
                        </div>

                        <div className="brochure-details">
                            <h2 className="mb-4">Inside the Brochure</h2>
                            <p className="mb-4 text-muted">
                                Download the official conference brochure to get comprehensive information about the  INTERNATIONAL CONFERENCE ON FLUID MECHANICS & TURBOMACHINERY.
                                It serves as your complete guide to the event, featuring detailed schedules, speaker profiles, and venue information.
                            </p>

                            <ul className="brochure-features mb-5">
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Complete 3-Day Program Schedule</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Keynote Speaker Biographies & Topics</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Workshop & Breakout Session Details</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Venue Maps & Accommodation Guide</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Sponsorship & Exhibition Opportunities</span>
                                </li>
                            </ul>

                            <div className="brochure-actions">
                                <button onClick={handleDownload} className="download-btn">
                                    <Download size={20} />
                                    Download Brochure
                                </button>
                                <button onClick={handleViewOnline} className="view-btn">
                                    <FileText size={20} />
                                    View Online
                                </button>
                            </div>
                            <p className="download-note mt-3">
                                * Brochure coming soon • Format: PDF • Updated: February 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Brochure;
