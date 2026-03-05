import React, { useState, useEffect } from 'react';
import './SponsorsSection.css';
import { fetchSponsors } from '../../../api/siteApi';

const MarqueeRow = ({ items, direction }) => (
    <div className={`marquee-row ${direction}`}>
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((sponsor, index) => (
            <div key={index} className="marquee-item">
                <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'none'
                    }}
                />
            </div>
        ))}
    </div>
);

export default function SponsorsSection() {
    const [sponsors, setSponsors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSponsors().then(d => {
            if (d) setSponsors(d);
            setLoading(false);
        });
    }, []);

    const row1 = sponsors.slice(0, Math.ceil(sponsors.length / 2));
    const row2 = sponsors.slice(Math.ceil(sponsors.length / 2));

    if (loading) return null;
    if (sponsors.length === 0) return null;

    return (
        <section id="sponsors" style={{
            padding: '5.2rem 0',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.25rem)',
                        fontWeight: '800',
                        color: '#1e293b',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        Promoting & Media Partners
                    </h2>
                    <div style={{
                        width: '60px',
                        height: '4px',
                        background: 'var(--brand-gradient, linear-gradient(135deg, #0F172A 0%, #1E40AF 100%))',
                        margin: '0 auto',
                        borderRadius: '2px'
                    }}></div>
                </div>

                <div className="marquee-wrapper">
                    {row1.length > 0 && <MarqueeRow items={row1} direction="scroll-left" />}
                    {row2.length > 0 && <MarqueeRow items={row2} direction="scroll-right" />}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                        Interested in becoming a media partner? <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Contact Us</a>
                    </p>
                </div>
            </div>
        </section>
    );
}
