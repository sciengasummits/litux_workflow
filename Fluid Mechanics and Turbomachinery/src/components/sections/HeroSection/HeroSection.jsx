import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import mediaImage from '../../../assets/images/Media.jpg';
import { fetchContent } from '../../../api/siteApi';

const DEFAULTS = {
    subtitle: 'INTERNATIONAL CONFERENCE ON',
    title: 'FLUID MECHANICS & TURBOMACHINERY',
    description: 'International Conference on Fluid Mechanics & Turbomachinery, where global experts unite to shape the future of engineering dynamics. Discover ground-breaking innovations in fluid systems, connect with top mechanical engineers, and explore solutions transforming industrial efficiency.',
    conferenceDate: 'December 14-16, 2026',
    venue: 'Outram, Singapore',
    countdownTarget: '2026-12-14T09:00:00+01:00',
    showRegister: true,
    showAbstract: true,
    showBrochure: true
};

const HeroSection = () => {
    const navigate = useNavigate();
    const [hero, setHero] = useState(DEFAULTS);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Fetch dynamic hero content from backend
    useEffect(() => {
        fetchContent('hero').then(data => {
            if (data) setHero({ ...DEFAULTS, ...data });
        });
    }, []);

    useEffect(() => {
        const targetDate = new Date(hero.countdownTarget || '2026-12-14T09:00:00+01:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [hero.countdownTarget]);

    const handleDownloadBrochure = () => {
        navigate('/brochure');
    };

    return (
        <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 15, 31, 0.6), rgba(0, 15, 31, 0.6)), url('https://5.imimg.com/data5/SELLER/Default/2023/4/304158028/BI/ED/JG/115492319/cryopump-coldhead-and-helium-compressor-repair-services-500x500.jpg')` }}>
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">{hero.subtitle}</span> <br />
                        {hero.title}
                    </h1>

                    <div className="hero__countdown-wrapper">
                        <span className="days-to-go-label" style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-primary-end)', textTransform: 'uppercase', letterSpacing: '1px' }}>Days To Go</span>
                        <div className="hero__countdown">
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.days}</span>
                                <span className="countdown-label">Days</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.hours}</span>
                                <span className="countdown-label">Hours</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.minutes}</span>
                                <span className="countdown-label">Minutes</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.seconds}</span>
                                <span className="countdown-label">Seconds</span>
                            </div>
                        </div>
                    </div>

                    <p className="hero__desc">
                        {hero.description}
                    </p>
                    <div className="hero__actions">
                        {hero.showBrochure && (
                            <Button onClick={handleDownloadBrochure}>Download Brochure</Button>
                        )}
                        {hero.showRegister && (
                            <Button onClick={() => navigate('/register')}>Register Now</Button>
                        )}
                        {hero.showAbstract && (
                            <Button onClick={() => navigate('/abstract-submission')}>
                                Submit Abstract
                            </Button>
                        )}
                    </div>
                </div>

                <div className="hero__info-cards">
                    <div className="info-card date-card">
                        <h3>December</h3>
                        <p>14-16, 2026</p>
                    </div>

                    <div className="info-card venue-card">
                        <h3>Venue</h3>
                        <p>Event Venue: {hero.venue}</p>
                    </div>
                </div>
            </div>

            <img src={mediaImage} alt="Media Partner" className="hero__cpd-image" />
        </section>
    );
};

export default HeroSection;
