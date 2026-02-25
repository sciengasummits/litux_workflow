import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import cpdImage from '../../../assets/images/cpd-certification.jpeg';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT = {
    subtitle: 'ANNUAL INTERNATIONAL CONFERENCE ON',
    title: 'LIUTEX AND VORTEX\nIDENTIFICATION',
    description: 'International Conference on Liutex and Vortex Identification. where global experts unite to shape the future of fluid mechanics. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
    conferenceDate: 'December 14-16, 2026',
    venue: 'Outram, Singapore',
    countdownTarget: '2026-12-14T09:00:00+01:00',
    showRegister: true,
    showAbstract: true,
    showBrochure: true,
};

const HeroSection = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(DEFAULT);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Fetch live data from backend + poll every 15 s for dashboard changes
    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('hero').then(d => {
                if (!cancelled && d) setData(prev => ({ ...prev, ...d }));
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

    // Countdown
    useEffect(() => {
        const targetDate = new Date(data.countdownTarget).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;
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
    }, [data.countdownTarget]);

    // Parse multiline title (split on \n)
    const titleLines = (data.title || '').split('\n');

    // If a custom background was uploaded via the dashboard, override the CSS bg
    const heroBgStyle = data.bgImage
        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${data.bgImage}')` }
        : {};

    return (
        <section className="hero" style={heroBgStyle}>
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">{data.subtitle}</span>
                        {titleLines.map((line, i) => (
                            <React.Fragment key={i}>{line}{i < titleLines.length - 1 && <br />}</React.Fragment>
                        ))}
                    </h1>

                    <div className="hero__countdown-header">Days To Go</div>
                    <div className="hero__countdown">
                        {[['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Minutes', timeLeft.minutes], ['Seconds', timeLeft.seconds]].map(([label, val]) => (
                            <div className="countdown-item" key={label}>
                                <span className="countdown-value">{val}</span>
                                <span className="countdown-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    <p className="hero__desc">{data.description}</p>

                    <div className="hero__actions">
                        {data.showBrochure !== false && (
                            <Button onClick={() => navigate('/brochure')}>DOWNLOAD BROCHURE</Button>
                        )}
                        {data.showRegister !== false && (
                            <Button onClick={() => navigate('/register')}>REGISTER NOW</Button>
                        )}
                        {data.showAbstract !== false && (
                            <Button onClick={() => navigate('/abstract-submission')}>SUBMIT ABSTRACT</Button>
                        )}
                    </div>
                </div>

                <div className="hero__info-cards">
                    <div className="info-card date-card">
                        <h3>{(() => {
                            const parts = (data.conferenceDate || 'December 14-16, 2026').trim().split(' ');
                            return parts[0]; // Month
                        })()}</h3>
                        <p>{(() => {
                            const parts = (data.conferenceDate || 'December 14-16, 2026').trim().split(' ');
                            return parts.slice(1).join(' '); // Date + Year
                        })()}</p>
                    </div>
                    <div className="info-card venue-card">
                        <h3>Venue</h3>
                        <p>Event Venue: {data.venue}</p>
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
