import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sun,
    Wind,
    Zap,
    Droplet,
    Leaf,
    Globe,
    ShieldCheck,
    Thermometer,
    Recycle,
    Battery,
    CloudRain,
    Cpu,
    Anchor,
    Flame,
    Activity,
    Factory,
    Lightbulb,
    BarChart,
    TreeDeciduous,
    Mountain
} from 'lucide-react';
import './KeyThemesSection.css';
import { fetchContent } from '../../../api/siteApi';

const defaultSessionsData = [
    { title: "Computational Fluid Dynamics (CFD)", icon: Activity },
    { title: "Aerodynamics & Gas Dynamics", icon: Wind },
    { title: "Hydrodynamics & Marine Engineering", icon: Droplet },
    { title: "Turbomachinery Design & Analysis", icon: Factory },
    { title: "Gas Turbines & Jet Engines", icon: Flame },
    { title: "Steam Turbines & Power Plants", icon: Zap },
    { title: "Hydraulic Turbines & Pumps", icon: Anchor },
    { title: "Wind Energy & Wind Turbines", icon: Wind },
    { title: "Heat & Mass Transfer", icon: Thermometer },
    { title: "Multiphase Flow & Cavitation", icon: CloudRain },
    { title: "Bio-Fluid Mechanics", icon: Leaf },
    { title: "Micro & Nano Fluidics", icon: Cpu },
    { title: "Flow Visualization & Measurement", icon: Lightbulb },
    { title: "Fluid-Structure Interaction", icon: Activity },
    { title: "Propulsion Systems", icon: Flame },
    { title: "Industrial Fluid Engineering", icon: Factory },
    { title: "Pipeline & Transport Systems", icon: Recycle },
    { title: "Renewable Energy Fluid Dynamics", icon: Sun },
    { title: "Vortex Dynamics & Turbulence", icon: Wind },
    { title: "HVAC & Refrigeration Systems", icon: Thermometer },
];

const defaultScheduleData = {
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
    ]
};

const iconMap = [
    Activity, Wind, Droplet, Factory, Flame, Zap, Anchor, Wind, Thermometer, CloudRain,
    Leaf, Cpu, Lightbulb, Activity, Flame, Factory, Recycle, Sun, Wind, Thermometer,
    Globe, Droplet, Cpu, Battery, ShieldCheck, Wind, Mountain, Flame, BarChart, Lightbulb
];

const KeyThemesSection = ({ showLearnMore = false }) => {
    const [activeDay, setActiveDay] = useState('day1');
    const [sessionsData, setSessionsData] = useState(defaultSessionsData);
    const [scheduleData, setScheduleData] = useState(defaultScheduleData);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContent('sessions').then(data => {
            if (data) {
                if (data.sessions && Array.isArray(data.sessions)) {
                    const dynamicSessions = data.sessions.map((title, index) => ({
                        title: title,
                        icon: iconMap[index % iconMap.length]
                    }));
                    setSessionsData(dynamicSessions);
                }
                if (data.schedule) {
                    setScheduleData(data.schedule);
                }
            }
        });
    }, []);

    // Limit items if in preview mode (Home page)
    const displaySessions = showLearnMore ? sessionsData.slice(0, 10) : sessionsData;
    const displaySchedule = showLearnMore ? scheduleData[activeDay]?.slice(0, 5) : scheduleData[activeDay];

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
                                    const Icon = session.icon || Sun;
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
                                            <th>Time</th>
                                            <th>Conference Schedule</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(displaySchedule || []).map((item, index) => (
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
