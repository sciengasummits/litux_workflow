import React from 'react';
import { Download, CheckCircle, Calendar, MapPin, Users, Award, FileText } from 'lucide-react';
import './DigitalBrochure.css';

const DigitalBrochure = () => {
    return (
        <div className="digital-brochure">
            <div className="brochure-page-container">
                {/* PAGE 1: COVER */}
                <div className="brochure-sheet cover-page">
                    <div className="vortex-background"></div>
                    <div className="brochure-content">
                        <header className="brochure-header">
                            <h4 className="brochure-subtitle-top">Annual International Conference on</h4>
                            <h1 className="brochure-main-title">
                                Liutex Theory and Applications <br />
                                <span>in Vortex Identification and Vortex Dynamics</span>
                            </h1>
                        </header>

                        <div className="brochure-hero-info">
                            <div className="info-item">
                                <Calendar size={24} />
                                <div>
                                    <p className="info-label">DATE</p>
                                    <p className="info-value">December 14-16, 2026</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <MapPin size={24} />
                                <div>
                                    <p className="info-label">VENUE</p>
                                    <p className="info-value">Outram, Singapore</p>
                                </div>
                            </div>
                        </div>

                        <div className="brochure-edition-badge">
                            OFFICIAL 2026 EDITION
                        </div>
                    </div>
                    <footer className="brochure-footer-brand">
                        LIUTEX VORTEX SUMMIT 2026
                    </footer>
                </div>

                {/* PAGE 2: OBJECTIVES & THEMES */}
                <div className="brochure-sheet">
                    <div className="sheet-inner">
                        <div className="sheet-side-accent"></div>
                        <h2 className="sheet-title">Conference Overview</h2>
                        <p className="sheet-description">
                            The Annual International Conference on Liutex Theory and Applications is the premier gathering for experts in vortex identification. This summit bridges the gap between pure mathematics and practical engineering.
                        </p>

                        <div className="sheet-grid">
                            <div className="sheet-section">
                                <h3><Award size={20} className="section-icon" /> Core Objectives</h3>
                                <ul className="sheet-list">
                                    <li><CheckCircle size={14} /> Advance the knowledge of Liutex-based rotation definitions.</li>
                                    <li><CheckCircle size={14} /> Solve the "shear contamination" problem in vortex identification.</li>
                                    <li><CheckCircle size={14} /> Promote cross-disciplinary research in CFD and fluid mechanics.</li>
                                    <li><CheckCircle size={14} /> Implement AI-driven vortex detection frameworks.</li>
                                </ul>
                            </div>

                            <div className="sheet-section">
                                <h3><Users size={20} className="section-icon" /> Target Audience</h3>
                                <ul className="sheet-list">
                                    <li>Aerospace & Mechanical Engineers</li>
                                    <li>Computational Fluid Dynamics (CFD) Researchers</li>
                                    <li>Atmospheric Scientists & Meteorologists</li>
                                    <li>Applied Mathematicians & Physicists</li>
                                </ul>
                            </div>
                        </div>

                        <div className="sheet-section full-width">
                            <h3><FileText size={20} className="section-icon" /> Key Themes for 2026</h3>
                            <div className="themes-flex">
                                <span className="theme-tag">Liutex Fundamentals</span>
                                <span className="theme-tag">Omega Method</span>
                                <span className="theme-tag">Turbulence Structure Analysis</span>
                                <span className="theme-tag">Machined Learning in Fluids</span>
                                <span className="theme-tag">Aerospace Application</span>
                                <span className="theme-tag">Vortex Dynamics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING ACTION BAR */}
            <div className="digital-brochure-tools">
                <button className="tool-btn" onClick={() => window.print()}>
                    <Download size={20} />
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default DigitalBrochure;
