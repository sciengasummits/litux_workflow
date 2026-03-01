import React, { useEffect } from 'react';
import './DigitalBrochure.css';
import { Download, Printer, Home, ChevronRight, CheckCircle, Calendar, MapPin, Users, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DigitalBrochure = () => {

    const location = useLocation();

    useEffect(() => {
        // Handle auto-print if query param exists
        const params = new URLSearchParams(location.search);
        if (params.get('print') === 'true') {
            window.print();
        }
    }, [location]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="digital-brochure-container">
            {/* Control Bar - Hidden on print */}
            <div className="brochure-controls no-print">
                <div className="container flex-between">
                    <Link to="/brochure" className="back-link">
                        <Home size={18} /> Back to Brochure page
                    </Link>
                    <div className="action-group">
                        <button onClick={handlePrint} className="control-btn print-btn">
                            <Printer size={18} /> Print / Save PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Brochure Document */}
            <div className="brochure-document shadow-2xl">
                {/* Page 1: Cover Page */}
                <div className="brochure-page cover-page">
                    <div className="cover-overlay"></div>
                    <div className="cover-content">
                        <div className="conf-badge">International Summit 2026</div>
                        <h1 className="main-title"> INTERNATIONAL CONFERENCE ON</h1>
                        <h2 className="sub-title">FLUID MECHANICS & TURBOMACHINERY</h2>

                        <div className="conf-details-strip">
                            <div className="detail-item">
                                <Calendar size={24} />
                                <span>December 14-16, 2026</span>
                            </div>
                            <div className="detail-item">
                                <MapPin size={24} />
                                <span>Outram, Singapore</span>
                            </div>
                        </div>

                        <div className="cover-footer">
                            <p>Official Event Prospectus</p>
                            <div className="accent-line"></div>
                        </div>
                    </div>
                </div>

                {/* Page 2: Welcome & About */}
                <div className="brochure-page content-page page-break">
                    <div className="page-header-small">
                        <h3>About the Conference</h3>
                    </div>

                    <div className="page-body">
                        <p className="intro-para">
                            We are delighted to welcome you to the <strong>INTERNATIONAL CONFERENCE ON FLUID MECHANICS & TURBOMACHINERY</strong>,
                            scheduled to take place from December 14-16, 2026, in the vibrant city of Outram, Singapore.
                        </p>

                        <p className="body-text">
                            This premier international summit brings together top minds from academia, industry, and government to
                            explore transformative innovations in fluid dynamics and turbomachinery systems. The congress is designed
                            to bridge the gap between visionary research and real-world implementation, serving as a dynamic platform
                            for collaboration, knowledge exchange, and future-focused thinking.
                        </p>

                        <div className="objectives-grid">
                            <div className="obj-card">
                                <h4>Global Collaboration</h4>
                                <p>Facilitate networking among researchers, engineers, and industry leaders to tackle global challenges.</p>
                            </div>
                            <div className="obj-card">
                                <h4>Innovation Showcase</h4>
                                <p>Highlight cutting-edge research, advanced technologies, and novel methodologies in turbomachinery.</p>
                            </div>
                            <div className="obj-card">
                                <h4>Sustainability Focus</h4>
                                <p>Explore energy-efficient solutions and green technologies within fluid dynamics.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page 3: Scientific Themes */}
                <div className="brochure-page content-page page-break">
                    <div className="page-header-small">
                        <h3>Scientific Tracks & Sessions</h3>
                    </div>

                    <div className="page-body">
                        <p className="mb-6">The conference features 30+ specialized tracks covering the entire spectrum of fluid science and engineering:</p>

                        <div className="themes-list">
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Computational Fluid Dynamics (CFD)</span>
                            </div>
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Aerodynamics & Gas Dynamics</span>
                            </div>
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Hydrodynamics & Marine Engineering</span>
                            </div>
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Turbomachinery Design & Analysis</span>
                            </div>
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Propulsion Systems & Jet Engines</span>
                            </div>
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Heat & Mass Transfer</span>
                            </div>
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Renewable Energy Fluid Dynamics</span>
                            </div>
                            <div className="theme-entry">
                                <ChevronRight size={16} className="bullet" />
                                <span>Vortex Dynamics & Turbulence</span>
                            </div>
                        </div>

                        <div className="highlight-box">
                            <h4>Submit Your Work</h4>
                            <p>Abstract submission is now open. Share your findings with a global audience of mechanical and fluid engineering professionals.</p>
                        </div>
                    </div>
                </div>

                {/* Page 4: Registration & Deadlines */}
                <div className="brochure-page content-page page-break">
                    <div className="page-header-small">
                        <h3>Registration Information</h3>
                    </div>

                    <div className="page-body">
                        <div className="timeline-container">
                            <div className="timeline-item">
                                <div className="time-date">June 15, 2026</div>
                                <div className="time-label">Abstract Submission Opens</div>
                            </div>
                            <div className="timeline-item highlight">
                                <div className="time-date">September 25, 2026</div>
                                <div className="time-label">Early Bird Deadline</div>
                            </div>
                            <div className="timeline-item">
                                <div className="time-date">October 30, 2026</div>
                                <div className="time-label">Regular Submission Deadline</div>
                            </div>
                        </div>

                        <div className="venue-info-section">
                            <h4>Host City: Outram, Singapore</h4>
                            <p>Singapore is a global hub for advanced manufacturing and aerospace engineering. Participants will enjoy world-class facilities and the vibrant culture of this tropical city-state.</p>
                        </div>

                        <div className="footer-contact">
                            <div className="contact-grid">
                                <div className="contact-item">
                                    <Globe size={16} />
                                    <span>www.fluidturbosummit.com</span>
                                </div>
                                <div className="contact-item">
                                    <Users size={16} />
                                    <span>Singapore Event Committee</span>
                                </div>
                            </div>
                            <p className="disclaimer">© 2026 INTERNATIONAL CONFERENCE ON FLUID MECHANICS & TURBOMACHINERY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalBrochure;
