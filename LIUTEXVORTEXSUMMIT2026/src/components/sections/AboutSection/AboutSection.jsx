import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, Clock, Star, Calendar, MapPin } from 'lucide-react';
import './AboutSection.css';
import { fetchContent } from '../../../api/siteApi';

const ICON_MAP = { CalendarDays, CheckCircle, Clock, Star, Calendar, MapPin };

const DEFAULT_ABOUT = {
    subtitle: 'Liutex and Vortex Identification and Its Applications',
    title: 'About The Conference',
    paragraph1: 'The Annual International Conference on Liutex Theory and Applications in Vortex Identification and Vortex Dynamics is a premier international platform dedicated to advancing the understanding of Liutex theory and its transformative applications in vortex identification and vortex dynamics.',
    paragraph2: 'This conference brings together leading researchers, academicians, computational scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, numerical methods, and real-world applications of Liutex-based vortex analysis.',
    objectives: [
        'Promote advancements in Liutex theory',
        'Explore innovations in vortex identification techniques',
        'Discuss computational and experimental approaches in vortex dynamics',
        'Bridge academia and industry in fluid mechanics research',
        'Encourage collaboration across aerospace, mechanical, civil, and environmental engineering domains',
    ],
    keyThemes: [
        'Fundamentals of Liutex Theory',
        'Vortex Identification Methods (Q-criterion, λ2, Ω method, Liutex)',
        'Turbulence Modeling and Analysis',
        'Computational Fluid Dynamics (CFD) Applications',
        'Vortex Dynamics in Aerospace Engineering',
        'Data-Driven and AI Approaches in Flow Field Identification',
    ],
};

const DEFAULT_DATES = {
    dates: [
        { month: 'JUN', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
        { month: 'SEP', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
        { month: 'OCT', day: '30', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
        { month: 'DEC', day: '14', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 14-16, 2026, Singapore' },
    ],
};

const AboutSection = () => {
    const [about, setAbout] = useState(DEFAULT_ABOUT);
    const [datesData, setDatesData] = useState(DEFAULT_DATES);

    useEffect(() => {
        fetchContent('about').then(d => { if (d) setAbout(prev => ({ ...prev, ...d })); });
        fetchContent('importantDates').then(d => { if (d) setDatesData(prev => ({ ...prev, ...d })); });
    }, []);

    const isHighlight = (idx, total) => idx === total - 1;

    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                {/* Left Side: Content */}
                <div className="about__content">
                    <h4 className="section-subtitle">{about.subtitle}</h4>
                    <h2 className="section-title">{about.title}</h2>
                    <p className="about__text">{about.paragraph1}</p>
                    {about.paragraph2 && <p className="about__text">{about.paragraph2}</p>}

                    {about.objectives?.length > 0 && (
                        <>
                            <h3 className="section-title-sm">Conference Objectives</h3>
                            <ul className="about__list">
                                {about.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                            </ul>
                        </>
                    )}

                    {about.keyThemes?.length > 0 && (
                        <>
                            <h3 className="section-title-sm">Key Themes &amp; Topics</h3>
                            <ul className="about__list">
                                {about.keyThemes.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        </>
                    )}
                </div>

                {/* Right Side: Important Dates */}
                <div className="about__dates-wrapper">
                    <div className="premium-dates-container">
                        <div className="premium-header">
                            <h3 className="premium-title">Important Dates</h3>
                            <div className="header-decoration"></div>
                        </div>

                        <div className="premium-dates-list">
                            {(datesData.dates || []).map((d, idx) => {
                                const IconComp = ICON_MAP[d.icon] || CalendarDays;
                                const highlight = isHighlight(idx, datesData.dates.length);
                                return (
                                    <div className={`premium-date-card${highlight ? ' highlight-card' : ''}`} key={idx}>
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
                                            <IconComp size={40} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
