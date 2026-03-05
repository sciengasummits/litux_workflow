import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import cpdImage from '../../../assets/images/Media.jpg';
import { fetchContent } from '../../../api/siteApi';

const DEFAULTS = {
    subtitle: 'INTERNATIONAL CONFERENCE ON',
    title: 'FOOD SCIENCE TECHNOLOGY AND AGRICULTURE',
    description: 'International Conference on Food Science Technology and Agriculture, where global experts unite to shape the future of food science and agricultural innovation. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
    conferenceDate: 'December 07-09, 2026',
    venue: 'Marina Bay, Singapore',
    countdownTarget: '2026-12-07T09:00:00+08:00',
    showRegister: true, showAbstract: true, showBrochure: true,
};

const HeroSection = () => {
    const navigate = useNavigate();
    const [hero, setHero] = useState(DEFAULTS);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Fetch live hero content from backend + polling
    useEffect(() => {
        let cancelled = false;
        const load = () => {
            fetchContent('hero').then(data => {
                if (!cancelled && data) setHero(prev => ({ ...prev, ...data }));
            });
        };

        load(); // initial fetch

        // Poll every 15 seconds so dashboard edits appear without a page reload
        const interval = setInterval(load, 15000);

        // Also re-fetch immediately when the visitor switches back to this tab
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    // Countdown timer
    useEffect(() => {
        const targetDate = new Date(hero.countdownTarget).getTime();
        const interval = setInterval(() => {
            const diff = targetDate - Date.now();
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [hero.countdownTarget]);

    // Parse multiline title (split on \n)
    const titleLines = (hero.title || '').split('\n');

    // If a custom background was uploaded via the dashboard, override the CSS bg
    const heroBgStyle = hero.bgImage
        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${hero.bgImage}')` }
        : {};

    return (
        <section className="hero" style={heroBgStyle}>
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">{hero.subtitle}</span>{' '}
                        {titleLines.map((line, i) => (
                            <React.Fragment key={i}>{line}{i < titleLines.length - 1 && <br />}</React.Fragment>
                        ))}
                    </h1>

                    <div className="hero__countdown-wrapper">
                        <p style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-white)', textTransform: 'uppercase', letterSpacing: '1px' }}>Days To Go</p>
                        <div className="hero__countdown">
                            {[['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']].map(([k, l]) => (
                                <div className="countdown-item" key={k}>
                                    <span className="countdown-value">{timeLeft[k]}</span>
                                    <span className="countdown-label">{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="hero__desc">{hero.description}</p>

                    <div className="hero__actions">
                        {hero.showBrochure !== false && <Button onClick={() => navigate('/brochure')}>Download Brochure</Button>}
                        {hero.showRegister !== false && <Button onClick={() => navigate('/register')}>Register Now</Button>}
                        {hero.showAbstract !== false && <Button onClick={() => navigate('/abstract-submission')}>Submit Abstract</Button>}
                    </div>
                </div>

                <div className="hero__info-cards">
                    <div className="info-card date-card">
                        <h3>{(() => {
                            const parts = (hero.conferenceDate || 'December 07-09, 2026').trim().split(' ');
                            return parts[0]; // Month
                        })()}</h3>
                        <p>{(() => {
                            const parts = (hero.conferenceDate || 'December 07-09, 2026').trim().split(' ');
                            return parts.slice(1).join(' '); // Date + Year
                        })()}</p>
                    </div>
                    <div className="info-card venue-card">
                        <h3>Venue</h3>
                        <p>{hero.venue}</p>
                    </div>
                </div>
            </div>

            <div className="hero__cpd-image">
                <img src={cpdImage} alt="CPD Certification" />
            </div>
        </section>
    );
};

export default HeroSection;
