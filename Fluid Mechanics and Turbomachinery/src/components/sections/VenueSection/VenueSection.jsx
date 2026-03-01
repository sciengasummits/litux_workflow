import React, { useState, useEffect } from 'react';
import './VenueSection.css';
import { fetchContent } from '../../../api/siteApi';

const defaultVenues = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1525625239911-372990664e40?w=1920&q=80" // Marina Bay Sands
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1920&q=80" // Conference Hall
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=1920&q=80" // Gardens by the Bay
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" // Modern Office Building
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1559599076-9c61d8e1b97c?w=1920&q=80" // Jewel Changi
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1563824368593-9c8845348981?w=1920&q=80" // Singapore Skyline
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1496887556096-cf90c6861962?w=1920&q=80" // Helix Bridge / ArtScience Museum
    }
];

const VenueSection = () => {
    const [activeVenue, setActiveVenue] = useState(0);
    const [direction, setDirection] = useState('next');
    const [venues, setVenues] = useState(defaultVenues);

    useEffect(() => {
        fetchContent('venue').then(data => {
            if (data && data.images && Array.isArray(data.images) && data.images.length > 0) {
                const venueImages = data.images.map((image, index) => ({
                    id: index + 1,
                    image: image
                }));
                setVenues(venueImages);
            }
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('next');
            setActiveVenue((prev) => (prev + 1) % venues.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [venues.length]);

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
        <section className="venue" id="venue">
            <div className="venue__slides">
                {venues.map((venue, index) => (
                    <div
                        key={venue.id}
                        className={`venue__slide ${index === activeVenue ? 'active' : ''} ${index === activeVenue ? direction : ''}`}
                        style={{ backgroundImage: `url(${venue.image})` }}
                    >
                    </div>
                ))}
            </div>

            <div className="venue__controls-bottom">
                <button className="venue__arrow venue__arrow--left" onClick={goToPrev}>
                    ‹
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
                    ›
                </button>
            </div>
        </section>
    );
};

export default VenueSection;
