import React, { useState, useEffect } from 'react';
import {
    Calendar,
    CalendarCheck,
    MapPin,
    Mic,
    Users,
    Building2,
    Globe,
    Newspaper
} from 'lucide-react';
import './StatsSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_STATS = {
    title: 'RENEWABLE ENERGY & CLIMATE CHANGE CONFERENCES APPROACH',
    items: [
        { id: 1, icon: 'Calendar', number: "15+", label: "Years Experience" },
        { id: 2, icon: 'CalendarCheck', number: "100+", label: "Events" },
        { id: 3, icon: 'MapPin', number: "200+", label: "Onsite Approach" },
        { id: 4, icon: 'Mic', number: "2000+", label: "Speakers" },
        { id: 5, icon: 'Users', number: "5000+", label: "Attendees" },
        { id: 6, icon: 'Building2', number: "20+", label: "Exhibitors" },
        { id: 7, icon: 'Globe', number: "150+", label: "Countries" },
        { id: 8, icon: 'Newspaper', number: "2000+", label: "Publications" }
    ]
};

const iconMap = {
    Calendar: <Calendar size={32} />,
    CalendarCheck: <CalendarCheck size={32} />,
    MapPin: <MapPin size={32} />,
    Mic: <Mic size={32} />,
    Users: <Users size={32} />,
    Building2: <Building2 size={32} />,
    Globe: <Globe size={32} />,
    Newspaper: <Newspaper size={32} />
};

const StatsSection = () => {
    const [data, setData] = useState(DEFAULT_STATS);

    useEffect(() => {
        fetchContent('stats').then(d => d && setData(prev => ({ ...prev, ...d })));
    }, []);

    return (
        <section className="stats-section section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title" style={{ marginBottom: '3rem', color: '#000', fontSize: 'clamp(1.8rem, 4vw, 2.25rem)', fontWeight: '800' }}>
                        {data.title}
                    </h2>
                </div>

                <div className="stats-grid">
                    {(data.items || []).map((stat, index) => (
                        <div key={stat.id || index} className="stats-card">
                            <div className="stats-icon">
                                {iconMap[stat.icon] || <Calendar size={32} />}
                            </div>
                            <div className="stats-number">{stat.number}</div>
                            <div className="stats-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
