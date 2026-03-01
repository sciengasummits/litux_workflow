import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, Clock, Star } from 'lucide-react';
import './AboutSection.css';
import { fetchContent } from '../../../api/siteApi';

const ICON_MAP = { CalendarDays, CheckCircle, Clock, Star };

const AboutSection = () => {
    const [about, setAbout] = useState({
        subtitle: 'Advancing Food Innovation',
        title: 'About The Conference',
        paragraph1: 'The International Conference on Food Science Technology and Agriculture is a premier international platform dedicated to advancing the understanding of food science, agricultural innovation, and sustainable food systems.',
        paragraph2: 'This conference brings together leading researchers, academicians, food scientists, agricultural experts, and industry professionals to explore recent developments, innovative technologies, sustainable practices, and real-world applications in food science and agriculture.',
        objectives: [
            'Promote advancements in food science and technology',
            'Explore innovations in sustainable agriculture',
            'Discuss food safety, quality control, and nutritional science',
            'Bridge academia and industry in agricultural research',
            'Encourage collaboration across food processing, biotechnology, and environmental sustainability domains'
        ],
        keyThemes: [
            'Food Processing and Preservation Technologies',
            'Sustainable Agriculture and Crop Management',
            'Food Safety and Quality Assurance',
            'Nutritional Science and Functional Foods',
            'Agricultural Biotechnology and Genetic Engineering',
            'Smart Farming and Precision Agriculture',
        ],
    });

    const [dates, setDates] = useState([
        { month: 'JUL', day: '01', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
        { month: 'SEP', day: '30', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
        { month: 'NOV', day: '15', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
        { month: 'DEC', day: '07', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 07-09, Singapore' },
    ]);

    useEffect(() => {
        fetchContent('about').then(data => { if (data) setAbout(prev => ({ ...prev, ...data })); });
        fetchContent('importantDates').then(data => { if (data?.dates) setDates(data.dates); });
    }, []);

    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                {/* Left Side: Content */}
                <div className="about__content">
                    <h4 className="section-subtitle">{about.subtitle}</h4>
                    <h2 className="section-title">{about.title}</h2>
                    {about.paragraph1 && <p className="about__text">{about.paragraph1}</p>}
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
                            {dates.map((d, i) => {
                                const IconComp = ICON_MAP[d.icon] || CalendarDays;
                                return (
                                    <div key={i} className={`premium-date-card${d.icon === 'Star' ? ' highlight-card' : ''}`}>
                                        <div className="pd-date-box">
                                            <span className="pd-month">{d.month}</span>
                                            <span className="pd-day">{d.day}</span>
                                        </div>
                                        <div className="pd-content">
                                            <span className="pd-year">{d.year}</span>
                                            <h4 className="pd-event">{d.event}</h4>
                                            {d.sub && <span className="pd-sub">{d.sub}</span>}
                                        </div>
                                        <div className="pd-icon-bg"><IconComp size={40} /></div>
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
