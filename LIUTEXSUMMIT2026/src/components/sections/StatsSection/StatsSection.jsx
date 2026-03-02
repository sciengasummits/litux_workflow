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
import { fetchContent } from '../../../api/siteApi';
import './StatsSection.css';

const ICONS = [
    <Calendar size={32} />,
    <CalendarCheck size={32} />,
    <MapPin size={32} />,
    <Mic size={32} />,
    <Users size={32} />,
    <Building2 size={32} />,
    <Globe size={32} />,
    <Newspaper size={32} />,
];

const DEFAULT_STATS = {
    title: 'SCIENGA SUMMITS CONFERENCES APPROACH',
    items: [
        { number: '15+', label: 'Years Experience' },
        { number: '100+', label: 'Events' },
        { number: '200+', label: 'Onsite Approach' },
        { number: '2000+', label: 'Speakers' },
        { number: '5000+', label: 'Attendees' },
        { number: '20+', label: 'Exhibitors' },
        { number: '150+', label: 'Countries' },
        { number: '2000+', label: 'Publications' },
    ],
};

const StatsSection = () => {
    const [statsData, setStatsData] = useState(DEFAULT_STATS);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('stats').then(d => {
                if (!cancelled && d && d.items && d.items.length > 0) {
                    setStatsData(prev => ({ ...prev, ...d }));
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
        <section className="stats-section section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title" style={{ marginBottom: '3rem', color: 'var(--color-text-header)' }}>
                        {statsData.title || 'SCIENGA SUMMITS CONFERENCES APPROACH'}
                    </h2>
                </div>

                <div className="stats-grid">
                    {(statsData.items || []).map((stat, index) => (
                        <div key={index} className="stats-card">
                            <div className="stats-icon">
                                {ICONS[index % ICONS.length]}
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
