import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Coffee, Utensils, Mic, Award, User, Calendar } from 'lucide-react';
import './Program.css';
import { fetchContent } from '../../api/siteApi';

const defaultSchedule = {
    1: [
        {
            time: "08:30 - 09:00",
            title: "Registration & Welcome Coffee",
            description: "Delegates' arrival and kit distribution.",
            location: "Grand Ballroom Foyer",
            icon: <Coffee size={18} />,
            type: "Event"
        },
        {
            time: "09:00 - 09:30",
            title: "Conference Inauguration",
            description: "Opening remarks and keynote introduction.",
            location: "Main Hall",
            icon: <Mic size={18} />,
            type: "Ceremony"
        }
    ],
    2: [
        {
            time: "09:00 - 10:30",
            title: "Plenary Sessions",
            description: "Presentation of research papers and academic discussions.",
            location: "Main Hall",
            icon: <Award size={18} />,
            type: "Session"
        }
    ],
    3: [
        {
            time: "09:00 - 10:30",
            title: "Networking Session",
            description: "Connecting experts and industry professionals.",
            location: "Lounge Area",
            icon: <User size={18} />,
            type: "Event"
        }
    ]
};

const Program = () => {
    const [activeDay, setActiveDay] = useState(1);
    const [scheduleData, setScheduleData] = useState(defaultSchedule);

    useEffect(() => {
        let cancelled = false;
        const load = () => {
            fetchContent('sessions').then(data => {
                if (!cancelled && data && data.schedule) {
                    const newSchedule = {};
                    ['day1', 'day2', 'day3'].forEach((dayKey, idx) => {
                        const dayNum = idx + 1;
                        if (data.schedule[dayKey] && data.schedule[dayKey].length > 0) {
                            newSchedule[dayNum] = data.schedule[dayKey].map(item => ({
                                time: item.time,
                                title: item.program,
                                description: item.description || "Join us for this insightful session part of our technical program.",
                                location: item.location || "Conference Hall",
                                icon: item.type === 'Break' ? <Utensils size={18} /> : <Award size={18} />,
                                type: item.type || "Session"
                            }));
                        } else {
                            newSchedule[dayNum] = defaultSchedule[dayNum] || [];
                        }
                    });
                    setScheduleData(newSchedule);
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

    return (
        <div className="program-page pt-5">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Conference Program</h1>
                    <p className="page-breadcrumb">Home / Program</p>
                </div>
            </div>

            <section className="program-content section-padding">
                <div className="container">
                    <div className="program-tabs">
                        <button
                            className={`tab-btn ${activeDay === 1 ? 'active' : ''}`}
                            onClick={() => setActiveDay(1)}
                        >
                            <span className="day-label">Day One</span>
                            <span className="date-label">Dec 14, 2026</span>
                        </button>
                        <button
                            className={`tab-btn ${activeDay === 2 ? 'active' : ''}`}
                            onClick={() => setActiveDay(2)}
                        >
                            <span className="day-label">Day Two</span>
                            <span className="date-label">Dec 15, 2026</span>
                        </button>
                        <button
                            className={`tab-btn ${activeDay === 3 ? 'active' : ''}`}
                            onClick={() => setActiveDay(3)}
                        >
                            <span className="day-label">Day Three</span>
                            <span className="date-label">Dec 16, 2026</span>
                        </button>
                    </div>

                    <div className="schedule-container">
                        {(scheduleData[activeDay] || []).length > 0 ? (
                            (scheduleData[activeDay] || []).map((item, index) => (
                                <div className="schedule-item" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="schedule-dot"></div>
                                    <div className="schedule-card">
                                        <div className="schedule-time">
                                            <div className="time-box">
                                                <Clock size={16} />
                                                <span>{item.time}</span>
                                            </div>
                                            <div className="location-box">
                                                <MapPin size={14} />
                                                <span>{item.location}</span>
                                            </div>
                                        </div>
                                        <div className="schedule-info">
                                            <h3 className="d-flex align-items-center gap-2">
                                                {item.icon}
                                                {item.title}
                                            </h3>
                                            <p>{item.description}</p>
                                            {item.speaker && (
                                                <div className="speaker-tag">
                                                    <User size={14} />
                                                    <span>{item.speaker}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <p className="text-muted">Schedule for this day is being finalized.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Program;
