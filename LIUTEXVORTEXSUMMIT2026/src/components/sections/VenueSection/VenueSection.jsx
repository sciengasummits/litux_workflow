import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './VenueSection.css';
import heroImg from '../../../assets/images/Hero.png';
import { fetchContent } from '../../../api/siteApi';

const STATIC_VENUES = [
    { id: 1, image: 'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80' },
    { id: 2, image: 'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80' },
    { id: 3, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80' },
    { id: 4, image: heroImg },
];

const VenueSection = () => {
    const [activeVenue, setActiveVenue] = useState(0);
    const [direction, setDirection] = useState('next');
    const [venues, setVenues] = useState(STATIC_VENUES);
    const [venueInfo, setVenueInfo] = useState({ name: 'Outram, Singapore', mapLink: '' });

    // Fetch live venue data
    useEffect(() => {
        Promise.all([
            fetchContent('venue'),
            fetchContent('venueContent'),
        ]).then(([venue, venueContent]) => {
            if (venue) {
                setVenueInfo(prev => ({
                    ...prev,
                    name: venue.name || prev.name,
                    mapLink: venue.mapLink || '',
                }));
                // If backend has custom images, use them
                if (venue.images?.length > 0) {
                    setVenues(venue.images.map((img, i) => ({ id: i + 1, image: img })));
                }
            }
            if (venueContent?.mapLink) {
                setVenueInfo(prev => ({ ...prev, mapLink: venueContent.mapLink }));
            }
        }).catch(() => { });
    }, []);

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('next');
            setActiveVenue(prev => (prev + 1) % venues.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [venues.length]);

    const goToVenue = (index) => {
        if (index !== activeVenue) {
            setDirection(index > activeVenue ? 'next' : 'prev');
            setActiveVenue(index);
        }
    };
    const goToPrev = () => { setDirection('prev'); setActiveVenue(prev => (prev - 1 + venues.length) % venues.length); };
    const goToNext = () => { setDirection('next'); setActiveVenue(prev => (prev + 1) % venues.length); };

    return (
        <section className="venue" id="venue" style={{ backgroundColor: '#1e293b' }}>
            {/* Venue name badge */}
            {venueInfo.name && (
                <div style={{
                    position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                    color: '#fff', padding: '8px 20px', borderRadius: '20px', fontSize: '14px',
                    fontWeight: 700, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                }}>
                    <MapPin size={14} /> {venueInfo.name}
                </div>
            )}

            <div className="venue__slides">
                {venues.map((venue, index) => (
                    <div
                        key={venue.id}
                        className={`venue__slide ${index === activeVenue ? 'active' : ''} ${index === activeVenue ? direction : ''}`}
                    >
                        <img
                            src={venue.image}
                            alt={`Venue view ${index + 1}`}
                            onError={e => { e.target.onerror = null; e.target.src = heroImg; }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 0 }}
                        />
                        <div className="venue__overlay"></div>
                    </div>
                ))}
            </div>

            {/* Map preview (if set) */}
            {venueInfo.mapLink && (
                <div style={{
                    position: 'absolute', bottom: '70px', right: '20px', zIndex: 10,
                    width: '220px', height: '120px', borderRadius: '10px', overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}>
                    <iframe
                        src={venueInfo.mapLink}
                        width="100%" height="100%"
                        allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Conference Venue Map"
                        style={{ border: 'none' }}
                    />
                </div>
            )}

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
