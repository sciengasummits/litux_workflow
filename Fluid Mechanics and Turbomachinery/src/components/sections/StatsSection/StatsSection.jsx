import React, { useState, useEffect } from 'react';
import {
    Calendar, CalendarCheck, MapPin, Mic,
    Users, Building2, Globe, Newspaper
} from 'lucide-react';
import './StatsSection.css';
import { fetchContent } from '../../../api/siteApi';

const ICON_LIST = [
    <Calendar size={32} />, <CalendarCheck size={32} />, <MapPin size={32} />,
    <Mic size={32} />, <Users size={32} />, <Building2 size={32} />,
    <Globe size={32} />, <Newspaper size={32} />
];

const DEFAULT_ITEMS = [
    { number: '15+', label: 'Years Experience' },
    { number: '100+', label: 'Events' },
    { number: '200+', label: 'Onsite Approach' },
    { number: '2000+', label: 'Speakers' },
    { number: '5000+', label: 'Attendees' },
    { number: '20+', label: 'Exhibitors' },
    { number: '150+', label: 'Countries' },
    { number: '2000+', label: 'Publications' },
];

const StatsSection = () => {
    const [stats, setStats] = useState({
        title: 'FLUID MECHANICS & TURBOMACHINERY CONFERENCES APPROACH',
        items: DEFAULT_ITEMS,
    });

    useEffect(() => {
        fetchContent('stats').then(data => {
            if (data) setStats(prev => ({ ...prev, ...data }));
        });
    }, []);

    return (
        <section className="stats-section section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title" style={{ marginBottom: '3rem', color: 'var(--color-text-header)' }}>
                        {stats.title}
                    </h2>
                </div>
                <div className="stats-grid">
                    {(stats.items || DEFAULT_ITEMS).map((stat, i) => (
                        <div key={i} className="stats-card">
                            <div className="stats-icon">{ICON_LIST[i % ICON_LIST.length]}</div>
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
