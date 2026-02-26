import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './VenueSection.css';
import heroImg from '../../../assets/images/Hero.png';

const venues = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1525625230556-8e8ad8aaad9d?w=1920&q=80", // Singapore Skyline
        local: heroImg
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80", // Large Conference Hall
        local: heroImg
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80", // Modern Tech Conference
        local: heroImg
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920&q=80", // Singapore Botanic Gardens (Venue atmosphere)
        local: heroImg
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80", // Networking/Forum area
        local: heroImg
    }
];

const VenueSection = () => {
    const [activeVenue, setActiveVenue] = useState(0);
    const [direction, setDirection] = useState('next');

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('next');
            setActiveVenue((prev) => (prev + 1) % venues.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToVenue = (index) => {
        if (index !== activeVenue) {
            setDirection(index > activeVenue ? 'next' : 'prev');
            setActiveVenue(index);
        }
    };

    const goToPrev = () => {
        setDirection('prev');
        setActiveVenue((prev) => (prev - 1 + venues.length) % venues.length);
    };

    const goToNext = () => {
        setDirection('next');
        setActiveVenue((prev) => (prev + 1) % venues.length);
    };

    return (
        <section className="venue" id="venue" style={{ backgroundColor: '#083344' }}>
            <div className="venue__slides">
                {venues.map((venue, index) => (
                    <div
                        key={venue.id}
                        className={`venue__slide ${index === activeVenue ? 'active' : ''} ${index === activeVenue ? direction : ''}`}
                    >
                        <img
                            src={venue.image}
                            alt={`Venue view showing ${venue.id}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = venue.local || heroImg;
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                position: 'relative',
                                zIndex: 0
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
                    {venues.map((_, index) => (
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
