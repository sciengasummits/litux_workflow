import React from 'react';
import './Brochure.css';
import brochurePdf from '../../assets/brochure/World-General-Medicine-Congress-Your-Official-Digital-Platform.pdf';
import { Download, FileText, CheckCircle } from 'lucide-react';

const Brochure = () => {
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
                                <div className="preview-header">
                                    <div className="preview-logo-placeholder">LTVS 2026</div>
                                    <div className="preview-badge">2026 Edition</div>
                                </div>
                                <div className="preview-main">
                                    <div className="vortex-accent"></div>
                                    <h3 className="preview-title">Annual International Conference on Liutex and Vortex Identification</h3>
                                    <div className="preview-divider"></div>
                                    <p className="preview-subtitle">Official Digital Platform Brochure</p>
                                </div>
                                <div className="preview-footer">
                                    <p>December 14-16, 2026</p>
                                    <p>Outram, Singapore</p>
                                </div>
                            </div>
                        </div>

                        <div className="brochure-details">
                            <h2 className="mb-4">Inside the Brochure</h2>
                            <p className="mb-4 text-muted">
                                Download the official conference brochure to get comprehensive information about the Annual International Conference on Liutex and Vortex Identification.
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
                                <a href={brochurePdf} download="World-General-Medicine-Congress-Brochure.pdf" className="download-btn">
                                    <Download size={20} />
                                    Download Brochure
                                </a>
                                <a href={brochurePdf} target="_blank" rel="noopener noreferrer" className="view-btn">
                                    <FileText size={20} />
                                    View Online
                                </a>
                            </div>
                            <p className="download-note mt-3">
                                * File size: 2.5 MB • Format: PDF • Updated: February 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Brochure;
