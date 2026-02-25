import React, { useState, useEffect } from 'react';
import {
    Calendar, CalendarCheck, MapPin, Mic,
    Users, Building2, Globe, Newspaper
} from 'lucide-react';
import './StatsSection.css';
import { fetchContent } from '../../../api/siteApi';

const ICON_LIST = [Calendar, CalendarCheck, MapPin, Mic, Users, Building2, Globe, Newspaper];

const DEFAULT_STATS = {
    title: 'LIUTEX VORTEX SUMMIT CONFERENCES APPROACH',
    items: [
        { number: '15+', label: 'Years Experience' },
        { number: '100+', label: 'Annual Events' },
        { number: '200+', label: 'Onsite Approach' },
        { number: '2000+', label: 'Speakers' },
        { number: '5000+', label: 'Attendees' },
        { number: '20+', label: 'Exhibitors' },
        { number: '150+', label: 'Countries' },
        { number: '2000+', label: 'Publications' },
    ],
};

const StatsSection = () => {
    const [stats, setStats] = useState(DEFAULT_STATS);

    useEffect(() => {
        fetchContent('stats').then(d => { if (d) setStats(prev => ({ ...prev, ...d })); });
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
                    {(stats.items || []).map((stat, i) => {
                        const Icon = ICON_LIST[i % ICON_LIST.length];
                        return (
                            <div key={i} className="stats-card">
                                <div className="stats-icon"><Icon size={32} /></div>
                                <div className="stats-number">{stat.number}</div>
                                <div className="stats-label">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
