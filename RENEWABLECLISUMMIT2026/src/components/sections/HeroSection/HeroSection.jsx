import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './HeroSection.css';

const HeroSection = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    React.useEffect(() => {
        const targetDate = new Date('March 23, 2027 09:00:00 GMT+0100').getTime();

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
    }, []);


    const handleDownloadBrochure = () => {
        navigate('/brochure');
    };

    return (
        <section className="hero">
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">International Conference On</span> <br />
                        RENEWABLE ENERGY & CLIMATE CHANGE
                    </h1>

                    <p className="hero__countdown-label">Days To Go</p>
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

                    <p className="hero__desc">
                        Join distinguished researchers, industry leaders, and policymakers at the forefront of renewable energy innovation and climate action. Engage with cutting-edge research, establish strategic collaborations, and contribute to sustainable solutions addressing critical global environmental challenges.
                    </p>
                    <div className="hero__actions">
                        <Button onClick={handleDownloadBrochure}>Download Brochure</Button>
                        <Button onClick={() => navigate('/register')}>Register Now</Button>
                        <Button onClick={() => navigate('/abstract-submission')}>
                            Submit Abstract
                        </Button>
                    </div>
                </div>

                <div className="hero__info-cards">
                    <div className="info-card date-card">
                        <h3>March</h3>
                        <p>23-25, 2027</p>
                    </div>

                    <div className="info-card venue-card">
                        <h3>Venue</h3>
                        <p>Event Venue: Munich, Germany</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
