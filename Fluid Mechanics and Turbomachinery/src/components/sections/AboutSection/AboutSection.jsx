import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, Clock, Star } from 'lucide-react';
import Button from '../../common/Button/Button';
import './AboutSection.css';
import { fetchContent } from '../../../api/siteApi';

const ICON_MAP = { CalendarDays, CheckCircle, Clock, Star };

const DEFAULT_ABOUT = {
    subtitle: 'Welcome To Our Summit',
    title: 'About The Conference',
    paragraph1: 'We are truly delighted to welcome you to the INTERNATIONAL CONFERENCE ON FLUID MECHANICS & TURBOMACHINERY, scheduled to take place from December 14-16, 2026, in the vibrant city of Outram, Singapore.',
    paragraph2: 'The congress is designed to bridge the gap between visionary research and real-world implementation, serving as a dynamic platform for collaboration, knowledge exchange, and future-focused thinking.',
    objectives: [
        'Global Collaboration: Facilitate networking among researchers, engineers, and industry leaders',
        'Innovation Showcase: Highlight cutting-edge research and advanced technologies in turbomachinery',
        'Bridge Academia & Industry: Create platform for translational research and industrial applications',
        'Sustainability Focus: Explore energy-efficient solutions and green technologies',
        'Empower Future Leaders: Provide mentorship and presentation opportunities for students',
        'Knowledge Dissemination: Publish high-quality findings and foster engineering discussions'
    ],
    keyThemes: [
        'Computational Fluid Dynamics (CFD): Advanced simulations and turbulence modeling',
        'Aerodynamics & Hydrodynamics: Flow analysis and propulsion systems',
        'Turbomachinery Design: Gas turbines, compressors, pumps, and wind turbines',
        'Heat & Mass Transfer: Thermal management and multiphase flows',
        'Renewable Energy Systems: Hydropower, tidal energy, and wind energy conversion',
        'Fluid-Structure Interaction: Vibration analysis and aeroelasticity'
    ]
};

const DEFAULT_DATES = [
    { month: 'June', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
    { month: 'September', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
    { month: 'October', day: '30', year: '2026', event: 'Abstract Submission Deadline', icon: 'Clock' },
    { month: 'December', day: '14', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 14–16, 2026' }
];

const AboutSection = () => {
    const [about, setAbout] = useState(DEFAULT_ABOUT);
    const [dates, setDates] = useState(DEFAULT_DATES);

    useEffect(() => {
        fetchContent('about').then(data => { 
            if (data) setAbout(prev => ({ ...prev, ...data })); 
        });
        fetchContent('importantDates').then(data => { 
            if (data?.dates) setDates(data.dates); 
        });
    }, []);

    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                {/* Left Side: Content */}
                <div className="about__content">
                    <h4 className="section-subtitle">{about.subtitle}</h4>
                    <h2 className="section-title">{about.title}</h2>
                    <div className="about__scroll-content">
                        <p className="about__text">
                            {about.paragraph1}
                        </p>
                        <p className="about__text">
                            {about.paragraph2}
                        </p>

                        <div className="about__lists-container">
                            <div className="about__list-group">
                                <h3 className="about__list-title">Conference Objectives</h3>
                                <ul className="about__list">
                                    {about.objectives?.map((objective, index) => (
                                        <li key={index}>{objective}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="about__list-group">
                                <h3 className="about__list-title">Key Themes & Topics</h3>
                                <ul className="about__list">
                                    {about.keyThemes?.map((theme, index) => (
                                        <li key={index}>{theme}</li>
                                    ))}
                                </ul>
                            </div>
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
                            {dates.map((date, index) => {
                                const IconComponent = ICON_MAP[date.icon] || CalendarDays;
                                return (
                                    <div className="premium-date-card" key={index}>
                                        <div className="pd-date-box">
                                            <span className="pd-month">{date.month}</span>
                                            <span className="pd-day">{date.day}</span>
                                        </div>
                                        <div className="pd-content">
                                            <span className="pd-year">{date.year}</span>
                                            <h4 className="pd-event">{date.event}</h4>
                                            {date.sub && <span className="pd-sub">{date.sub}</span>}
                                        </div>
                                        <div className="pd-icon-bg">
                                            <IconComponent size={40} />
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