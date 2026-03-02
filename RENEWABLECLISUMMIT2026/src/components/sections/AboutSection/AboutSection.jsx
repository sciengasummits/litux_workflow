import React from 'react';
import { CalendarDays, CheckCircle, Clock, Star } from 'lucide-react';
import Button from '../../common/Button/Button';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                {/* Left Side: Content */}
                <div className="about__content">
                    <h4 className="section-subtitle">Welcome To Our Summit</h4>
                    <h2 className="section-title">About The Conference</h2>
                    <div className="about__scroll-content">
                        <p className="about__text">
                            We are truly delighted to welcome you to the <strong>International Conference On RENEWABLE ENERGY & CLIMATE CHANGE</strong>, scheduled to take place from <strong>March 23-25, 2027</strong>, in the vibrant city of <strong>Munich, Germany</strong>. This premier international summit brings together top minds from academia, industry, and government to explore transformative innovations in renewable energy and climate resilience.
                        </p>
                        <p className="about__text">
                            The congress is designed to bridge the gap between visionary research and real-world implementation, serving as a dynamic platform for collaboration, knowledge exchange, and future-focused thinking. The conference aims to accelerate progress across disciplines and foster impactful connections that will drive a sustainable future for our planet.
                        </p>
                        <p className="about__text">
                            Join us in <strong>Germany</strong> for three impactful days of insight, innovation, and connection at the forefront of clean energy and environmental science!
                        </p>
                        <p className="about__text">
                            Industry Excellence: Munich is home to world-leading energy exhibitions like Intersolar Europe, making it a focal point for the global solar and clean-tech industry.
                            State-of-the-Art Infrastructure: The summit will leverage Munich’s advanced conference facilities, such as the Messe München or ICM, known for hosting premier international trade shows.
                            Sustainability Leadership: Germany’s "Energiewende" (Energy Transition) policy makes Munich an inspiring location to witness real-world implementations of renewable energy at scale.
                        </p>

                        <div className="about__objectives" style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Conference Objectives</h3>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)' }}>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Advance Global Knowledge Exchange:</strong> To facilitate a premier platform for researchers, industry leaders, and policymakers to exchange groundbreaking ideas and research in renewable energy and climate science.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Foster Interdisciplinary Collaboration:</strong> To encourage cross-sector partnerships between academia, government bodies, and private industries for accelerating sustainable solutions.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Showcase Innovative Technologies:</strong> To present state-of-the-art technologies and methodologies that address the pressing challenges of climate change and energy transition.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Promote Policy Development:</strong> To discuss and formulate actionable policy frameworks that support global sustainability goals and environmental protection.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Empower Future Leaders:</strong> To mentor and inspire young scientists and engineers through workshops, networking, and exposure to cutting-edge research.</li>
                            </ul>
                        </div>

                        <div className="about__themes" style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Key Themes & Topics</h3>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                                <li>Solar Energy Technologies & Photovoltaics</li>
                                <li>Wind Energy Systems & Offshore Developments</li>
                                <li>Bioenergy, Biofuels & Biomass</li>
                                <li>Green Hydrogen & Fuel Cells</li>
                                <li>Climate Change Adaptation & Mitigation Strategies</li>
                                <li>Energy Storage & Grid Modernization</li>
                                <li>Sustainable Urban Planning & Smart Cities</li>
                                <li>Carbon Capture, Utilization, and Storage (CCUS)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side: Important Dates */}
                <div className="about__dates-wrapper">
                    <div className="premium-dates-container">
                        <div className="premium-header">
                            <h3 className="premium-title">Important Dates</h3>
                            <div className="header-decoration"></div>
                        </div>

                        <div className="premium-dates-list">
                            {/* Card 1 */}
                            <div className="premium-date-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">SEP</span>
                                    <span className="pd-day">15</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2026</span>
                                    <h4 className="pd-event">Abstract Submission Opens</h4>
                                </div>
                                <div className="pd-icon-bg">
                                    <CalendarDays size={40} />
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="premium-date-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">NOV</span>
                                    <span className="pd-day">25</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2026</span>
                                    <h4 className="pd-event">Early Bird Deadline</h4>
                                </div>
                                <div className="pd-icon-bg">
                                    <CheckCircle size={40} />
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="premium-date-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">JAN</span>
                                    <span className="pd-day">25</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2027</span>
                                    <h4 className="pd-event">Submission Deadline</h4>
                                </div>
                                <div className="pd-icon-bg">
                                    <Clock size={40} />
                                </div>
                            </div>

                            {/* Card 4 - Highlight */}
                            <div className="premium-date-card highlight-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">MAR</span>
                                    <span className="pd-day">23</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2027</span>
                                    <h4 className="pd-event">Conference Date</h4>
                                    <span className="pd-sub">March 23-25, Munich</span>
                                </div>
                                <div className="pd-icon-bg">
                                    <Star size={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
