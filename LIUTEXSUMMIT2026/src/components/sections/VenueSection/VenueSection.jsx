import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchContent } from '../../../api/siteApi';
import './VenueSection.css';
import heroImg from '../../../assets/images/Hero.png';

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1525625230556-8e8ad8aaad9d?w=1920&q=80',
    'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80',
];

const VenueSection = () => {
    const [activeVenue, setActiveVenue] = useState(0);
    const [direction, setDirection] = useState('next');
    const [images, setImages] = useState(DEFAULT_IMAGES);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('venue').then(d => {
                if (!cancelled && d && d.images && d.images.length > 0) {
                    setImages(d.images);
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

    // Auto-rotate slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('next');
            setActiveVenue((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToVenue = (index) => {
        if (index !== activeVenue) {
            setDirection(index > activeVenue ? 'next' : 'prev');
            setActiveVenue(index);
        }
    };

    const goToPrev = () => {
        setDirection('prev');
        setActiveVenue((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setDirection('next');
        setActiveVenue((prev) => (prev + 1) % images.length);
    };

    return (
        <section className="venue" id="venue" style={{ backgroundColor: '#083344' }}>
            <div className="venue__slides">
                {images.map((imgUrl, index) => (
                    <div
                        key={index}
                        className={`venue__slide ${index === activeVenue ? 'active' : ''} ${index === activeVenue ? direction : ''}`}
                    >
                        <img
                            src={imgUrl}
                            alt={`Venue view ${index + 1}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = heroImg;
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                position: 'relative',
                                zIndex: 0,
                            }}
                        />
                        <div className="venue__overlay"></div>
                    </div>
                ))}
            </div>

            <div className="venue__controls-bottom">
                <button className="venue__arrow venue__arrow--left" onClick={goToPrev}>
                    <ChevronLeft size={24} />
                </button>

                <div className="venue__indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`venue__indicator ${index === activeVenue ? 'active' : ''}`}
                            onClick={() => goToVenue(index)}
                        />
                    ))}
                </div>

                <button className="venue__arrow venue__arrow--right" onClick={goToNext}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default VenueSection;
