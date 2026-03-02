import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Activity,
    Wind,
    Zap,
    Droplet,
    Globe,
    ShieldCheck,
    Cpu,
    Anchor,
    Flame,
    BarChart,
    Terminal,
    Layers,
    Binary,
    Boxes,
    Compass,
    Settings,
    Unplug,
    Trello,
    Smartphone,
    Share2,
    Database,
    LineChart,
    Layout,
    Target,
    Eye,
    Mic,
    Factory
} from 'lucide-react';
import { fetchContent } from '../../../api/siteApi';
import './KeyThemesSection.css';
import Button from '../../common/Button/Button';

// Cycle through icons for dynamic session lists
const SESSION_ICONS = [
    Compass, Target, Binary, Settings, Layers, Wind, Cpu, Terminal, Activity, Zap,
    Droplet, Globe, Factory, Eye, Mic, Activity, Boxes, Share2, Database, Layout,
];

const DEFAULT_SESSIONS = [
    'Fundamentals of Liutex Theory',
    'Vortex Identification Methods',
    'Vector & Tensor Decompositions',
    'Omega (Ω) Method Applications',
    'Liutex-based Turbulence Modeling',
    'Vortex Dynamics in Aerospace',
    'CFD & High-Order Methods',
    'AI in Flow Field Identification',
    'Vortex-Induced Vibrations',
    'Bio-inspired Vortex Flows',
    'Hydrodynamics & Wake Analysis',
    'Oceanic & Atmospheric Vortices',
    'Rotating Machinery Dynamics',
    'Experimental Flow Visualization',
    'Acoustic Noise & Vortex Flow',
    'Liutex in Medical Fluid Dynamics',
    'Mathematical Vortex Foundations',
    'Complex Flow Topology',
    'RANS/LES/DNS Comparisons',
    'Vortex Core Tracking Algorithms',
];

const DEFAULT_SCHEDULE = {
    day1: [
        { time: '8.30 – 9.00', program: 'Registration' },
        { time: '9.00 – 9.30', program: 'Conference Inauguration' },
        { time: '9.30 – 11.00', program: 'Plenary Sessions' },
        { time: '11.00 – 11.20', program: 'Tea/Coffee Break' },
        { time: '11:20 – 13.00', program: 'Plenary Sessions' },
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
    const [activeDay, setActiveDay] = useState('day1');
    const navigate = useNavigate();
    const [sessions, setSessions] = useState(DEFAULT_SESSIONS);
    const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('sessions').then(d => {
                if (!cancelled && d) {
                    if (d.sessions && d.sessions.length > 0) setSessions(d.sessions);
                    if (d.schedule) setSchedule(prev => ({ ...prev, ...d.schedule }));
                }
            });
        };

        load();

        const interval = setInterval(load, 30000);
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    // Build sessions with icons (api returns plain strings, we pair icons by index)
    const sessionsWithIcons = sessions.map((s, i) => ({
        title: typeof s === 'string' ? s : (s.title || s),
        icon: SESSION_ICONS[i % SESSION_ICONS.length],
    }));

    const activeSchedule = schedule[activeDay] || [];

    // Limit items if in preview mode (Home page)
    const displaySessions = showLearnMore ? sessionsWithIcons.slice(0, 10) : sessionsWithIcons;
    const displaySchedule = showLearnMore ? activeSchedule.slice(0, 5) : activeSchedule;

    return (
        <section className={`sessions-schedule-section section-padding ${showLearnMore ? 'preview-mode' : ''}`} id="sessions">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Conference Schedule</h2>
                    <div className="section-line"></div>
                </div>

                <div className="sessions-schedule-layout" style={showLearnMore ? { overflow: 'hidden' } : {}}>
                    {/* Left Column: Sessions List */}
                    <div className="sessions-column">
                        <h3 className="column-title">Sessions</h3>
                        <div className="sessions-list-container">
                            <ul className="sessions-list-clean">
                                {displaySessions.map((session, index) => {
                                    const Icon = session.icon || Activity;
                                    return (
                                        <li key={index} className="session-item-clean">
                                            <span className="session-icon-small">
                                                <Icon size={18} />
                                            </span>
                                            <span className="session-text">{session.title}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Center Divider */}
                    <div className="schedule-divider">
                        <div className="divider-line"></div>
                    </div>

                    {/* Right Column: Schedule */}
                    <div className="schedule-column">
                        <div className="schedule__tabs-wrapper">
                            <div className="schedule__tabs">
                                <button
                                    className={`schedule__tab ${activeDay === 'day1' ? 'active' : ''}`}
                                    onClick={() => setActiveDay('day1')}
                                >
                                    <span className="tab-day">Day 01</span>
                                    <span className="tab-date">Conference</span>
                                </button>
                                <button
                                    className={`schedule__tab ${activeDay === 'day2' ? 'active' : ''}`}
                                    onClick={() => setActiveDay('day2')}
                                >
                                    <span className="tab-day">Day 02</span>
                                    <span className="tab-date">Conference</span>
                                </button>
                                <button
                                    className={`schedule__tab ${activeDay === 'day3' ? 'active' : ''}`}
                                    onClick={() => setActiveDay('day3')}
                                >
                                    <span className="tab-day">Day 03</span>
                                    <span className="tab-date">Conference</span>
                                </button>
                            </div>
                        </div>

                        <div className="schedule__content fade-in">
                            <div className="schedule__table-container">
                                <table className="schedule__table">
                                    <thead>
                                        <tr>
                                            <th>TIME</th>
                                            <th>CONFERENCE SCHEDULE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displaySchedule.map((item, index) => (
                                            <tr key={index}>
                                                <td className="time-col">
                                                    <div className="time-badge">{item.time}</div>
                                                </td>
                                                <td className="program-col">
                                                    <div className="program-info">
                                                        <span className="program-title">{item.program}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Fade Overlay */}
                    {showLearnMore && <div className="key-themes-fade-overlay"></div>}
                </div>

                {/* Learn More Button */}
                {showLearnMore && (
                    <div className="text-center mt-4">
                        <Button onClick={() => navigate('/sessions')}>
                            LEARN MORE
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default KeyThemesSection;
