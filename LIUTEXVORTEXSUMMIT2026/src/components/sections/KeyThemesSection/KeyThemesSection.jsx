import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sun, Wind, Zap, Droplet, Leaf, Globe,
    ShieldCheck, Thermometer, Recycle, Battery,
    CloudRain, Cpu, Anchor, Flame, Activity,
    Factory, Lightbulb, BarChart, TreeDeciduous,
    Mountain, Stethoscope
} from 'lucide-react';
import './KeyThemesSection.css';
import { fetchContent } from '../../../api/siteApi';

const ALL_ICONS = [Sun, Wind, Thermometer, Droplet, Leaf, Battery, Flame, CloudRain, ShieldCheck, Zap, Mountain, Anchor, Factory, Recycle, Cpu, BarChart, Activity, Zap, Globe, TreeDeciduous, Factory, Battery, Zap, CloudRain, Leaf, Factory, Activity, Globe, Lightbulb, Sun];

const DEFAULT_SESSIONS = [
    'Fundamentals of Liutex Theory',
    'Vortex Identification Methods (Q-criterion, λ2, Ω, Liutex)',
    'Turbulence Modeling and Analysis',
    'CFD Applications in Vortex Dynamics',
    'Vortex Dynamics in Aerospace Engineering',
    'AI & Data-Driven Flow Field Identification',
    'Experimental Methods in Vortex Research',
    'Liutex Applications in Ocean Engineering',
    'DNS and LES of Turbulent Flows',
    'Instability and Transition in Fluid Flows',
];

const DEFAULT_SCHEDULE = {
    day1: [
        { time: '8.30 – 9.00', program: 'Registration' },
        { time: '9.00 – 9.30', program: 'Conference Inauguration' },
        { time: '9.30 – 11.00', program: 'Plenary Sessions' },
        { time: '11.00 – 11.20', program: 'Tea/Coffee Break' },
        { time: '11.20 – 13.00', program: 'Plenary Sessions' },
        { time: '13.00 – 13.10', program: 'Group Photograph' },
        { time: '13.10 – 14.00', program: 'Lunch' },
        { time: '14.00 – 15.40', program: 'Keynote Sessions' },
        { time: '15.40 – 16.00', program: 'Tea/Coffee Break' },
        { time: '16.00 – 17.30', program: 'Keynote Sessions' },
        { time: '17.30 – 18.30', program: 'Workshop' },
    ],
    day2: [
        { time: '9.00 – 10.30', program: 'Scientific Sessions' },
        { time: '10.30 – 10.50', program: 'Tea/Coffee Break' },
        { time: '10.50 – 13.00', program: 'Poster Presentations' },
        { time: '13.00 – 14.00', program: 'Lunch' },
        { time: '14.00 – 15.30', program: 'Panel Discussions' },
        { time: '15.30 – 16.00', program: 'Award Ceremony & Closing' },
    ],
    day3: [
        { time: '9.00 – 10.30', program: 'Networking Session' },
        { time: '10.30 – 11.00', program: 'Tea/Coffee Break' },
        { time: '11.00 – 12.30', program: 'Future Trends Workshop' },
        { time: '12.30 – 13.30', program: 'Lunch' },
        { time: '13.30 – 15.00', program: 'Final Remarks & Departure' },
    ],
};

const KeyThemesSection = ({ showLearnMore = false }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const navigate = useNavigate();
    const [sessionsData, setSessionsData] = useState(DEFAULT_SESSIONS);
    // days = array of { label, rows }
    const [days, setDays] = useState([
        { label: 'Day 01', rows: DEFAULT_SCHEDULE.day1 },
        { label: 'Day 02', rows: DEFAULT_SCHEDULE.day2 },
        { label: 'Day 03', rows: DEFAULT_SCHEDULE.day3 },
    ]);

    useEffect(() => {
        fetchContent('sessions').then(data => {
            if (!data) return;
            // Sessions list (left column)
            if (data.sessions?.length > 0) setSessionsData(data.sessions);

            // Schedule (right column) — prefer new array format, fall back to legacy
            if (data.days?.length) {
                setDays(data.days);
            } else if (data.schedule) {
                const legacy = Object.entries(data.schedule)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([, rows], i) => ({
                        label: `Day 0${i + 1}`,
                        rows: Array.isArray(rows) ? rows : [],
                    }))
                    .filter(d => d.rows.length > 0);
                if (legacy.length) setDays(legacy);
            }
        });
    }, []);

    const safeIdx = Math.min(activeIdx, days.length - 1);
    const displaySessions = showLearnMore ? sessionsData.slice(0, 10) : sessionsData;
    const activeRows = days[safeIdx]?.rows || [];
    const TAB_SUBS = ['Conference', 'Discussions', 'Workshops', 'Sessions', 'Activities', 'Closing'];
    const displaySchedule = showLearnMore ? activeRows.slice(0, 5) : activeRows;

    return (
        <section className={`sessions-schedule-section section-padding ${showLearnMore ? 'preview-mode' : ''}`} id="sessions">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Conference Schedule</h2>
                    <div className="section-line"></div>
                </div>

                <div className="sessions-schedule-layout" style={showLearnMore ? { overflow: 'hidden' } : {}}>
                    {/* Sessions List */}
                    <div className="sessions-column">
                        <h3 className="column-title">Sessions</h3>
                        <div className="sessions-list-container">
                            <ul className="sessions-list-clean">
                                {displaySessions.map((session, index) => {
                                    const Icon = ALL_ICONS[index % ALL_ICONS.length] || Stethoscope;
                                    const title = typeof session === 'string' ? session : session.title;
                                    return (
                                        <li key={index} className="session-item-clean">
                                            <span className="session-icon-small"><Icon size={18} /></span>
                                            <span className="session-text">{title}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="schedule-divider"><div className="divider-line"></div></div>

                    {/* Schedule */}
                    <div className="schedule-column">
                        <div className="schedule__tabs-wrapper">
                            <div className="schedule__tabs">
                                {days.map((day, i) => (
                                    <button
                                        key={i}
                                        className={`schedule__tab ${safeIdx === i ? 'active' : ''}`}
                                        onClick={() => setActiveIdx(i)}
                                    >
                                        <span className="tab-day">{day.label || `Day 0${i + 1}`}</span>
                                        <span className="tab-date">{TAB_SUBS[i % TAB_SUBS.length]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="schedule__content fade-in">
                            <div className="schedule__table-container">
                                <table className="schedule__table">
                                    <thead>
                                        <tr><th>Time</th><th>Conference Schedule</th></tr>
                                    </thead>
                                    <tbody>
                                        {displaySchedule.map((item, index) => (
                                            <tr key={index}>
                                                <td className="time-col"><div className="time-badge">{item.time}</div></td>
                                                <td className="program-col"><div className="program-info"><span className="program-title">{item.program}</span></div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {showLearnMore && <div className="key-themes-fade-overlay"></div>}
                </div>

                {showLearnMore && (
                    <div className="text-center mt-4">
                        <button className="btn-learn-more" onClick={() => navigate('/sessions')}>
                            Learn More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default KeyThemesSection;
