import React, { useState, useEffect } from 'react';
import { Users, Globe, Building2, Award } from 'lucide-react';
import './GlobalParticipantsSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_PARTICIPANTS = [
    { id: 1, iconType: 'Users', number: "500+", label: "Global Participants" },
    { id: 2, iconType: 'Globe', number: "50+", label: "Countries" },
    { id: 3, iconType: 'Building2', number: "100+", label: "Organizations" },
    { id: 4, iconType: 'Award', number: "200+", label: "Speakers" }
];

const ICON_MAP = { Users, Globe, Building2, Award };

const GlobalParticipantsSection = () => {
    const [data, setData] = useState({ title: "Global Participants", items: DEFAULT_PARTICIPANTS });

    useEffect(() => {
        let cancelled = false;
        const load = () => {
            fetchContent('participants').then(d => {
                if (!cancelled && d) {
                    setData(prev => ({ ...prev, ...d }));
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

    const items = data.items || DEFAULT_PARTICIPANTS;

    return (
        <section className="global-participants section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">{data.title}</h2>
                    <div className="section-line"></div>
                </div>

                <div className="participants-grid">
                    {items.map((item, idx) => {
                        const IconComponent = ICON_MAP[item.iconType] || Users;
                        return (
                            <div key={item.id || idx} className="participant-card">
                                <div className="participant-icon">
                                    <IconComponent size={48} />
                                </div>
                                <div className="participant-number">{item.number}</div>
                                <div className="participant-label">{item.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default GlobalParticipantsSection;
