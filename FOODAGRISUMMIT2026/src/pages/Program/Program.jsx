import React, { useState } from 'react';
import { Clock, MapPin, Coffee, Utensils, Mic, Award, User, Calendar } from 'lucide-react';
import './Program.css';

const Program = () => {
    const [activeDay, setActiveDay] = useState(1);

    const scheduleData = {
        1: [
            {
                time: "08:00 - 09:00",
                title: "Registration & Welcome Coffee",
                description: "Pick up your conference badge and networking materials. Enjoy a warm welcome coffee with fellow delegates.",
                location: "Grand Ballroom Foyer",
                icon: <Coffee size={18} />,
                type: "Event"
            },
            {
                time: "09:00 - 10:00",
                title: "Opening Ceremony",
                description: "Official opening of the Annual International Conference on Food Science Technology and Agriculture. Welcome address by the Organizing Committee.",
                location: "Main Hall",
                icon: <Mic size={18} />,
                type: "Ceremony"
            },
            {
                time: "10:00 - 11:30",
                title: "Keynote: The Future of Sustainable Agriculture",
                description: "Deep dive into upcoming trends and sustainable practices that are reshaping the global agricultural landscape.",
                location: "Main Hall",
                icon: <User size={18} />,
                speaker: "Prof. Sarah Johnson",
                type: "Keynote"
            },
            {
                time: "11:30 - 13:00",
                title: "Panel Discussion: Global Food Security",
                description: "Expert panel discussing challenges and solutions for ensuring food security in the wake of climate change.",
                location: "Conference Room A",
                icon: <Mic size={18} />,
                type: "Discussion"
            },
            {
                time: "13:00 - 14:00",
                title: "Networking Lunch",
                description: "Gourmet lunch served for all participants. An excellent opportunity for informal networking.",
                location: "Dining Hall",
                icon: <Utensils size={18} />,
                type: "Break"
            },
            {
                time: "14:00 - 16:00",
                title: "Session 1: Food Processing & Biotechnology",
                description: "Presentations on the latest advancements in food processing technologies and biotechnological applications.",
                location: "Breakout Room 1",
                icon: <Award size={18} />,
                type: "Session"
            },
            {
                time: "16:00 - 17:30",
                title: "Poster Presentations",
                description: "Interactive session featuring research posters from emerging scientists and practitioners.",
                location: "Exhibition Area",
                icon: <Calendar size={18} />,
                type: "Expo"
            }
        ],
        2: [
            {
                time: "09:00 - 10:30",
                title: "Keynote: AI & IoT in Precision Farming",
                description: "Exploring how integrated technology is increasing crop yields and optimizing resource management.",
                location: "Main Hall",
                icon: <User size={18} />,
                speaker: "Dr. Michael Chen",
                type: "Keynote"
            },
            {
                time: "10:30 - 12:00",
                title: "Workshop: Organic Food Certification",
                description: "Practical guide to the standards and processes required for international organic certification.",
                location: "Workshop Room B",
                icon: <Award size={18} />,
                type: "Workshop"
            },
            {
                time: "12:00 - 13:00",
                title: "Networking Lunch",
                description: "Casual lunch with dedicated tables for specific research interests.",
                location: "Dining Hall",
                icon: <Utensils size={18} />,
                type: "Break"
            },
            {
                time: "13:00 - 15:30",
                title: "Session 2: Soil Health & Nutrient Management",
                description: "Scientific discussions on maintaining soil fertility and innovative nutrient delivery systems.",
                location: "Breakout Room 2",
                icon: <Award size={18} />,
                type: "Session"
            },
            {
                time: "15:30 - 17:00",
                title: "Exhibition Tour & Demonstrations",
                description: "Live demonstrations of the latest agricultural machinery and food processing equipment.",
                location: "Exhibition Area",
                icon: <Calendar size={18} />,
                type: "Expo"
            }
        ],
        3: [
            {
                time: "09:30 - 11:00",
                title: "Special Session: Climate-Resilient Crops",
                description: "Focusing on genetic engineering and traditional breeding for climate change adaptation.",
                location: "Conference Room A",
                icon: <Award size={18} />,
                type: "Session"
            },
            {
                time: "11:00 - 12:30",
                title: "Roundtable: Supply Chain Transparency",
                description: "Discussing blockchain and other tools for tracing food from farm to consumer.",
                location: "Main Hall",
                icon: <Mic size={18} />,
                type: "Discussion"
            },
            {
                time: "12:30 - 13:30",
                title: "Farewell Lunch",
                description: "Final networking opportunity and wrap-up of the conference proceedings.",
                location: "Dining Hall",
                icon: <Utensils size={18} />,
                type: "Break"
            },
            {
                time: "13:30 - 15:00",
                title: "Closing Ceremony & Awards",
                description: "Best paper awards, closing remarks, and announcement of the next conference location.",
                location: "Main Hall",
                icon: <Award size={18} />,
                type: "Ceremony"
            }
        ]
    };

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
                            <span className="date-label">Dec 07, 2026</span>
                        </button>
                        <button
                            className={`tab-btn ${activeDay === 2 ? 'active' : ''}`}
                            onClick={() => setActiveDay(2)}
                        >
                            <span className="day-label">Day Two</span>
                            <span className="date-label">Dec 08, 2026</span>
                        </button>
                        <button
                            className={`tab-btn ${activeDay === 3 ? 'active' : ''}`}
                            onClick={() => setActiveDay(3)}
                        >
                            <span className="day-label">Day Three</span>
                            <span className="date-label">Dec 09, 2026</span>
                        </button>
                    </div>

                    <div className="schedule-container">
                        {scheduleData[activeDay].map((item, index) => (
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
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Program;
