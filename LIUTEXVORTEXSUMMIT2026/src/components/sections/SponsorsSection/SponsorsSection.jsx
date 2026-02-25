import React, { useState, useEffect } from 'react';
import './SponsorsSection.css';
import { fetchSponsors } from '../../../api/siteApi';

// Static fallback imports — kept as default partners
import partner1 from '../../../assets/images/media/486-Mediapartner-Photo.png';
import partner2 from '../../../assets/images/media/487-Mediapartner-Photo.png';
import partner3 from '../../../assets/images/media/488-Mediapartner-Photo.jpg';
import partner4 from '../../../assets/images/media/489-Mediapartner-Photo.webp';
import partner5 from '../../../assets/images/media/498-Mediapartner-Photo.png';
import partner6 from '../../../assets/images/media/506-Mediapartner-Photo.png';
import partner7 from '../../../assets/images/media/507-Mediapartner-Photo.png';
import partner8 from '../../../assets/images/media/513-Mediapartner-Photo.png';
import partner9 from '../../../assets/images/media/525-Mediapartner-Photo.png';
import partner10 from '../../../assets/images/media/529-Mediapartner-Photo.png';
import partner11 from '../../../assets/images/media/530-Mediapartner-Photo.png';
import partner12 from '../../../assets/images/media/531-Mediapartner-Photo.png';
import partner13 from '../../../assets/images/media/532-Mediapartner-Photo.png';
import partner14 from '../../../assets/images/media/536-Mediapartner-Photo.png';
import partner15 from '../../../assets/images/media/538-Mediapartner-Photo.png';
import partner16 from '../../../assets/images/media/540-Mediapartner-Photo.png';

const STATIC_SPONSORS = [
    { name: 'International Conference Alerts', logo: partner1 },
    { name: 'AI & ML Events', logo: partner2 },
    { name: 'Conference Alerts', logo: partner3 },
    { name: 'All Conference Alert', logo: partner4 },
    { name: 'Times Of AI', logo: partner5 },
    { name: 'Technology Express', logo: partner6 },
    { name: 'Events Notification', logo: partner7 },
    { name: 'World With Science', logo: partner8 },
    { name: 'Conference in Europe', logo: partner9 },
    { name: 'World Conference Alerts', logo: partner10 },
    { name: 'Main Event', logo: partner11 },
    { name: 'All International Conference', logo: partner12 },
    { name: 'Conference Alert Network', logo: partner13 },
    { name: 'AI Press Room', logo: partner14 },
    { name: 'DigiEvent', logo: partner15 },
    { name: 'Global Conferencing', logo: partner16 },
];

const MarqueeRow = ({ items, direction }) => (
    <div className={`marquee-row ${direction}`}>
        {[...items, ...items].map((sponsor, index) => (
            <div key={index} className="marquee-item">
                <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'none' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            </div>
        ))}
    </div>
);

export default function SponsorsSection() {
    const [sponsors, setSponsors] = useState(STATIC_SPONSORS);

    useEffect(() => {
        fetchSponsors('media_partner').then(data => {
            if (data && data.length > 0) {
                // Use API data if available, otherwise keep static
                setSponsors(data.map(s => ({ name: s.name, logo: s.logo })));
            }
        });
    }, []);

    const row1 = sponsors.slice(0, Math.ceil(sponsors.length / 2));
    const row2 = sponsors.slice(Math.ceil(sponsors.length / 2));

    return (
        <section id="sponsors" style={{
            padding: '5.2rem 0',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0',
            overflow: 'hidden',
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.25rem)',
                        fontWeight: '800',
                        color: '#1e293b',
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}>
                        Promoting &amp; Media Partners
                    </h2>
                    <div style={{
                        width: '60px', height: '4px',
                        background: 'var(--brand-gradient, linear-gradient(135deg, #0F172A 0%, #1E40AF 100%))',
                        margin: '0 auto', borderRadius: '2px',
                    }}></div>
                </div>

                <div className="marquee-wrapper">
                    <MarqueeRow items={row1} direction="scroll-left" />
                    {row2.length > 0 && <MarqueeRow items={row2} direction="scroll-right" />}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                        Interested in becoming a media partner?{' '}
                        <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                            Contact Us
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
