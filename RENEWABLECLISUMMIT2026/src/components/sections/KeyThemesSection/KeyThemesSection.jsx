import React, { useState } from 'react';
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

const sessionsData = [
    { title: "Solar Energy & Photovoltaics", icon: Sun },
    { title: "Wind Energy Technologies", icon: Wind },
    { title: "Climate Change & Global Warming", icon: Thermometer },
    { title: "Hydroelectric Power Systems", icon: Droplet },
    { title: "Bioenergy & Biofuels", icon: Leaf },
    { title: "Smart Grids & Energy Storage", icon: Battery },
    { title: "Green Hydrogen Economy", icon: Flame },
    { title: "Carbon Capture & Storage", icon: CloudRain },
    { title: "Environmental Policy & Regulation", icon: ShieldCheck },
    { title: "Electric Vehicles & Clean Transport", icon: Zap },
    { title: "Geothermal Energy", icon: Mountain },
    { title: "Ocean & Tidal Energy", icon: Anchor },
    { title: "Sustainable Urban Planning", icon: Factory },
    { title: "Waste-to-Energy Systems", icon: Recycle },
    { title: "AI in Energy Management", icon: Cpu },
    { title: "Energy Economics & Finance", icon: BarChart },
    { title: "Circular Economy", icon: Activity },
    { title: "Nuclear Energy & Safety", icon: Zap },
    { title: "Climate Adaptation Strategies", icon: Globe },
    { title: "Forestry & Carbon Sinks", icon: TreeDeciduous },
    { title: "Energy Efficiency in Industry", icon: Factory },
    { title: "Advanced Battery Technologies", icon: Battery },
    { title: "Renewable Energy Integration", icon: Zap },
    { title: "Meteorology & Climate Modeling", icon: CloudRain },
    { title: "Sustainable Agriculture & Land Use", icon: Leaf },
    { title: "Green Building Technologies", icon: Factory },
    { title: "Environmental Impact Assessment", icon: Activity },
    { title: "Social Aspects of Climate Change", icon: Globe },
    { title: "Innovation in Clean Tech", icon: Lightbulb },
    { title: "Future of Global Energy", icon: Sun },
];

const Link = ({ href, children }) => <a href={href}>{children}</a>; // Placeholder if needed

const scheduleData = {
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

const KeyThemesSection = ({ showLearnMore = false }) => {
    const [activeDay, setActiveDay] = useState('day1');
    const navigate = useNavigate();

    // Limit items if in preview mode (Home page)
    const displaySessions = showLearnMore ? sessionsData.slice(0, 10) : sessionsData;
    const displaySchedule = showLearnMore ? scheduleData[activeDay].slice(0, 5) : scheduleData[activeDay];

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
                                    const Icon = session.icon || Stethoscope;
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
                                    <span className="tab-date">Discussions</span>
                                </button>
                                <button
                                    className={`schedule__tab ${activeDay === 'day3' ? 'active' : ''}`}
                                    onClick={() => setActiveDay('day3')}
                                >
                                    <span className="tab-day">Day 03</span>
                                    <span className="tab-date">Workshops</span>
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
