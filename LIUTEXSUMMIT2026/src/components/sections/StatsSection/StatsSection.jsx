import React from 'react';
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

const stats = [
    {
        id: 1,
        icon: <Calendar size={32} />,
        number: "15+",
        label: "Years Experience"
    },
    {
        id: 2,
        icon: <CalendarCheck size={32} />,
        number: "100+",
        label: "Annual Events"
    },
    {
        id: 3,
        icon: <MapPin size={32} />,
        number: "200+",
        label: "Onsite Approach"
    },
    {
        id: 4,
        icon: <Mic size={32} />,
        number: "2000+",
        label: "Speakers"
    },
    {
        id: 5,
        icon: <Users size={32} />,
        number: "5000+",
        label: "Attendees"
    },
    {
        id: 6,
        icon: <Building2 size={32} />,
        number: "20+",
        label: "Exhibitors"
    },
    {
        id: 7,
        icon: <Globe size={32} />,
        number: "150+",
        label: "Countries"
    },
    {
        id: 8,
        icon: <Newspaper size={32} />,
        number: "2000+",
        label: "Publications"
    }
];

const StatsSection = () => {
    return (
        <section className="stats-section section-padding">
            <div className="container">


                <div className="text-center mb-5">
                    <h2 className="section-title" style={{ marginBottom: '3rem', color: 'var(--color-text-header)' }}>SCIENGA SUMMITS CONFERENCES APPROACH</h2>
                </div>

                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.id} className="stats-card">
                            <div className="stats-icon">
                                {stat.icon}
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
