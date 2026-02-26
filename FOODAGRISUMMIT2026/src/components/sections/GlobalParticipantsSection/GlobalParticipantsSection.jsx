import React from 'react';
import { Users, Globe, Building2, Award } from 'lucide-react';
import './GlobalParticipantsSection.css';

const GlobalParticipantsSection = () => {
    const participants = [
        {
            id: 1,
            icon: <Users size={48} />,
            number: "500+",
            label: "Global Participants"
        },
        {
            id: 2,
            icon: <Globe size={48} />,
            number: "50+",
            label: "Countries"
        },
        {
            id: 3,
            icon: <Building2 size={48} />,
            number: "100+",
            label: "Organizations"
        },
        {
            id: 4,
            icon: <Award size={48} />,
            number: "200+",
            label: "Speakers"
        }
    ];

    return (
        <section className="global-participants section-padding">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">Global Participants</h2>
                    <div className="section-line"></div>
                </div>

                <div className="participants-grid">
                    {participants.map((item) => (
                        <div key={item.id} className="participant-card">
                            <div className="participant-icon">
                                {item.icon}
                            </div>
                            <div className="participant-number">{item.number}</div>
                            <div className="participant-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalParticipantsSection;
