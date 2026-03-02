import React from 'react';
import { useNavigate } from 'react-router-dom';
import VenueSection from '../../components/sections/VenueSection/VenueSection';
import Button from '../../components/common/Button/Button';
import './Venue.css';

const Venue = () => {
    const navigate = useNavigate();
    const venueFeatures = [
        {
            title: 'World-Class Facilities',
            description: 'State-of-the-art conference halls equipped with the latest audio-visual technology'
        },
        {
            title: 'Catering Services',
            description: 'International cuisine and refreshments throughout the conference'
        },
        {
            title: 'Easy Access',
            description: 'Convenient location with excellent public transport connections'
        },
        {
            title: 'High-Speed WiFi',
            description: 'Complimentary high-speed internet access throughout the venue'
        },
        {
            title: 'Parking Available',
            description: 'Ample parking space for all attendees'
        },
        {
            title: 'Accessibility',
            description: 'Fully accessible facilities for all participants'
        }
    ];

    const nearbyAttractions = [
        {
            name: 'Marienplatz',
            distance: '0.5 km',
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80"
        },
        {
            name: 'English Garden',
            distance: '3.2 km',
            image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80"
        },
        {
            name: 'Nymphenburg Palace',
            distance: '6.5 km',
            image: "data:image/jpeg;base64,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"
        }
    ];

    return (
        <div className="venue-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Event Venue</h1>
                    <p className="page-breadcrumb">Home / Venue</p>
                </div>
            </div>

            <VenueSection />

            {/* Venue Features Section */}
            <section className="venue-features section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4 className="section-subtitle">Venue Amenities</h4>
                        <h2 className="section-title">Why Choose Our Venue</h2>
                        <p className="section-desc">
                            Experience world-class facilities designed for international conferences
                        </p>
                    </div>

                    <div className="features-grid">
                        {venueFeatures.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About the City Section */}
            <section className="about-city section-padding" style={{ background: 'var(--color-bg-light)' }}>
                <div className="container">
                    <div className="about-city-content">
                        <div className="about-city-text">
                            <h4 className="section-subtitle">Discover Munich</h4>
                            <h2 className="section-title">About the Host City</h2>
                            <p className="city-description">
                                Munich is the capital of Bavaria and one of Germany’s most popular destinations. Known for its
                                rich history, stunning architecture, and vibrant culture, the city seamlessly blends
                                traditional Bavarian charm with modern innovation.
                            </p>
                            <p className="city-description">
                                As a major European hub for technology and research, Munich provides world-class
                                conference facilities and excellent infrastructure. Visitors can explore centuries-old
                                buildings, numerous museums, and the famous English Garden, making it an ideal location
                                for international summits.
                            </p>
                            <div className="city-stats">
                                <div className="stat-box">
                                    <h3>1.5M+</h3>
                                    <p>Population</p>
                                </div>
                                <div className="stat-box">
                                    <h3>14°C</h3>
                                    <p>Avg. Temperature</p>
                                </div>
                                <div className="stat-box">
                                    <h3>GMT+1</h3>
                                    <p>Time Zone</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-city-image">
                            <img
                                src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80"
                                alt="Munich City"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Nearby Attractions */}
            <section className="nearby-attractions section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4 className="section-subtitle">Explore Munich</h4>
                        <h2 className="section-title">Nearby Attractions</h2>
                        <p className="section-desc">
                            Make the most of your visit with these must-see destinations
                        </p>
                    </div>

                    <div className="attractions-grid">
                        {nearbyAttractions.map((attraction, index) => (
                            <div className="attraction-card" key={index}>
                                <div className="attraction-image">
                                    <img src={attraction.image} alt={attraction.name} />
                                    <div className="attraction-distance">{attraction.distance}</div>
                                </div>
                                <div className="attraction-info">
                                    <h3>{attraction.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="venue-cta section-padding" style={{ background: 'var(--color-primary-gradient)' }}>
                <div className="container text-center">
                    <h2 className="cta-title" style={{ color: 'white', marginBottom: '1rem' }}>
                        Ready to Join Us?
                    </h2>
                    <p className="cta-desc" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Secure your spot at the International Conference On RENEWABLE ENERGY & CLIMATE CHANGE and be part of this transformative event
                    </p>
                    <Button variant="outline" style={{ borderColor: 'white', color: 'white', background: 'transparent' }} onClick={() => navigate('/register')}>
                        Register Now
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Venue;
