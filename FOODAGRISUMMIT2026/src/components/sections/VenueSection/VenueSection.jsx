import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchContent } from '../../../api/siteApi';
import './VenueSection.css';

const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1525625239513-44a08522b1c3?w=1920&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80",
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
        <section className="venue" id="venue">
            <div className="venue__slides">
                {images.map((imgUrl, index) => (
                    <div
                        key={index}
                        className={`venue__slide ${index === activeVenue ? 'active' : ''} ${index === activeVenue ? direction : ''}`}
                        style={{ backgroundImage: `url(${imgUrl})` }}
                    >
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
