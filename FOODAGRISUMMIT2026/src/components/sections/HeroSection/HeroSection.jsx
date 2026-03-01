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
    countdownTarget: 'December 07, 2026 09:00:00 GMT+0800',
    showRegister: true, showAbstract: true, showBrochure: true,
};

const HeroSection = () => {
    const navigate = useNavigate();
    const [hero, setHero] = useState(DEFAULTS);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Fetch live hero content from backend
    useEffect(() => {
        fetchContent('hero').then(data => {
            if (data) setHero({ ...DEFAULTS, ...data });
        });
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

    return (
        <section className="hero" style={hero.bgImage ? { backgroundImage: `url(${hero.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">{hero.subtitle}</span><br />
                        {hero.title}
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
                        {hero.showBrochure && <Button onClick={() => navigate('/brochure')}>Download Brochure</Button>}
                        {hero.showRegister && <Button onClick={() => navigate('/register')}>Register Now</Button>}
                        {hero.showAbstract && <Button onClick={() => navigate('/abstract-submission')}>Submit Abstract</Button>}
                    </div>
                </div>

                <div className="hero__info-cards">
                    <div className="info-card date-card">
                        <h3>December</h3>
                        <p>07-09, 2026</p>
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
