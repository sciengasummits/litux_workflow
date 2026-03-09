import React, { useState, useEffect } from 'react';
import './VenueSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_VENUE = {
    title: 'Conference Venue',
    name: 'Munich, Germany',
    address: 'Munich, Germany',
    description: 'Munich, the capital of Bavaria, is a city where history meets high-tech. Known for its beautiful architecture, world-class museums, and as a hub for engineering and environmental innovation, it provides the perfect backdrop for our conference.',
    images: [
        'https://images.unsplash.com/photo-1595181710363-f1109f2d1130?w=1920&q=80',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80',
        'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80'
    ]
};

const VenueSection = () => {
    const [data, setData] = useState(DEFAULT_VENUE);
    const [activeVenue, setActiveVenue] = useState(0);
    const [direction, setDirection] = useState('next');

    const images = data.images || [];

    useEffect(() => {
        fetchContent('venue').then(d => d && setData(prev => ({ ...prev, ...d })));
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;
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
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`venue__slide ${index === activeVenue ? 'active' : ''} ${index === activeVenue ? direction : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    >
                    </div>
                ))}
            </div>

            <div className="venue__info-overlay">
                <div className="container">
                    <div className="venue__info-card">
                        <h2 className="venue__title">{data.title}</h2>
                        <h3 className="venue__name">{data.name}</h3>
                        <p className="venue__address">{data.address}</p>
                        <p className="venue__desc">{data.description}</p>
                    </div>
                </div>
            </div>

            <div className="venue__controls-bottom">
                <button className="venue__arrow venue__arrow--left" onClick={goToPrev}>
                    ‹
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
                    ›
                </button>
            </div>
        </section>
    );
};

export default VenueSection;
