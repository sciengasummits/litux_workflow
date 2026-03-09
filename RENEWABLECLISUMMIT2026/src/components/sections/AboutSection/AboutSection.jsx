import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, Clock, Star } from 'lucide-react';
import './AboutSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_ABOUT = {
    subtitle: 'Welcome To Our Summit',
    title: 'About The Conference',
    paragraph1: 'We are truly delighted to welcome you to the International Conference On RENEWABLE ENERGY & CLIMATE CHANGE, scheduled to take place from March 23-25, 2027, in the vibrant city of Munich, Germany. This premier international summit brings together top minds from academia, industry, and government to explore transformative innovations in renewable energy and climate resilience.',
    paragraph2: 'The congress is designed to bridge the gap between visionary research and real-world implementation, serving as a dynamic platform for collaboration, knowledge exchange, and future-focused thinking. The conference aims to accelerate progress across disciplines and foster impactful connections that will drive a sustainable future for our planet.',
    paragraph3: 'Join us in Germany for three impactful days of insight, innovation, and connection at the forefront of clean energy and environmental science!',
    objectives: [
        'Advance Global Knowledge Exchange: To facilitate a premier platform for researchers, industry leaders, and policymakers to exchange groundbreaking ideas and research in renewable energy and climate science.',
        'Foster Interdisciplinary Collaboration: To encourage cross-sector partnerships between academia, government bodies, and private industries for accelerating sustainable solutions.',
        'Showcase Innovative Technologies: To present state-of-the-art technologies and methodologies that address the pressing challenges of climate change and energy transition.',
        'Promote Policy Development: To discuss and formulate actionable policy frameworks that support global sustainability goals and environmental protection.',
        'Empower Future Leaders: To mentor and inspire young scientists and engineers through workshops, networking, and exposure to cutting-edge research.'
    ],
    keyThemes: [
        'Solar Energy Technologies & Photovoltaics',
        'Wind Energy Systems & Offshore Developments',
        'Bioenergy, Biofuels & Biomass',
        'Green Hydrogen & Fuel Cells',
        'Climate Change Adaptation & Mitigation Strategies',
        'Energy Storage & Grid Modernization',
        'Sustainable Urban Planning & Smart Cities',
        'Carbon Capture, Utilization, and Storage (CCUS)'
    ]
};

const DEFAULT_DATES = {
    dates: [
        { month: 'SEP', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
        { month: 'NOV', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
        { month: 'JAN', day: '25', year: '2027', event: 'Submission Deadline', icon: 'Clock' },
        { month: 'MAR', day: '23', year: '2027', event: 'Conference Date', icon: 'Star', sub: 'March 23-25, Munich' }
    ]
};

const iconMap = {
    CalendarDays: <CalendarDays size={40} />,
    CheckCircle: <CheckCircle size={40} />,
    Clock: <Clock size={40} />,
    Star: <Star size={40} />
};

const AboutSection = () => {
    const [about, setAbout] = useState(DEFAULT_ABOUT);
    const [dates, setDates] = useState(DEFAULT_DATES);

    useEffect(() => {
        fetchContent('about').then(d => d && setAbout(prev => ({ ...prev, ...d })));
        fetchContent('importantDates').then(d => d && setDates(prev => ({ ...prev, ...d })));
    }, []);

    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                <div className="about__content">
                    <h4 className="section-subtitle">{about.subtitle}</h4>
                    <h2 className="section-title">{about.title}</h2>
                    <div className="about__scroll-content">
                        <p className="about__text">{about.paragraph1}</p>
                        <p className="about__text">{about.paragraph2}</p>
                        {about.paragraph3 && <p className="about__text">{about.paragraph3}</p>}

                        {about.objectives && (
                            <div className="about__objectives" style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Conference Objectives</h3>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)' }}>
                                    {about.objectives.map((obj, i) => {
                                        const parts = obj.split(':');
                                        return (
                                            <li key={i} style={{ marginBottom: '0.5rem' }}>
                                                {parts.length > 1 ? (
                                                    <><strong>{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                                ) : obj}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {about.keyThemes && (
                            <div className="about__themes" style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Key Themes & Topics</h3>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                                    {about.keyThemes.map((theme, i) => <li key={i}>{theme}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="about__dates-wrapper">
                    <div className="premium-dates-container">
                        <div className="premium-header">
                            <h3 className="premium-title">Important Dates</h3>
                            <div className="header-decoration"></div>
                        </div>

                        <div className="premium-dates-list">
                            {(dates.dates || []).map((d, i) => (
                                <div key={i} className={`premium-date-card ${d.icon === 'Star' ? 'highlight-card' : ''}`}>
                                    <div className="pd-date-box">
                                        <span className="pd-month">{d.month}</span>
                                        <span className="pd-day">{d.day}</span>
                                    </div>
                                    <div className="pd-content">
                                        <span className="pd-year">{d.year}</span>
                                        <h4 className="pd-event">{d.event}</h4>
                                        {d.sub && <span className="pd-sub">{d.sub}</span>}
                                    </div>
                                    <div className="pd-icon-bg">
                                        {iconMap[d.icon] || <CalendarDays size={40} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
