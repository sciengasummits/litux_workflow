import { useNavigate } from 'react-router-dom';
import VenueSection from '../../components/sections/VenueSection/VenueSection';
import Button from '../../components/common/Button/Button';
import './Venue.css';
import vortexImg from '../../assets/images/vortex.jpg';

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
            name: 'Gardens by the Bay',
            distance: '1.5 km',
            image: "https://www.bing.com/th/id/OIP.d4BXWuPhEaobxhJHDsmpfgHaE8?w=238&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        },
        {
            name: 'Marina Bay Sands',
            distance: '2.0 km',
            image: "https://www.bing.com/th/id/OIP.w-__LWQfcodvks2nfUOsdAHaEj?w=252&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        },
        {
            name: 'Singapore Botanic Gardens',
            distance: '4.5 km',
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
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
                            <h4 className="section-subtitle">Discover Singapore</h4>
                            <h2 className="section-title">About the Host City</h2>
                            <p className="city-description">
                                Singapore is a global hub for education, innovation, and technology. Known for its
                                stunning skyline, lush green spaces, and diverse cultural heritage, it offers a
                                unique blend of tradition and modernity.
                            </p>
                            <p className="city-description">
                                As one of the world's leading conference destinations, Singapore provides
                                state-of-the-art facilities and world-class infrastructure. Outram, located in the
                                historical heart of the city, offers easy access to major business districts and
                                iconic landmarks.
                            </p>
                            <div className="city-stats">
                                <div className="stat-box">
                                    <h3>5.6M+</h3>
                                    <p>Population</p>
                                </div>
                                <div className="stat-box">
                                    <h3>31°C</h3>
                                    <p>Avg. Temperature</p>
                                </div>
                                <div className="stat-box">
                                    <h3>GMT+8</h3>
                                    <p>Time Zone</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-city-image">
                            <img
                                src="https://tse3.mm.bing.net/th/id/OIP.jJNZIfQn_INbB0uopJI_vgHaFH?w=1024&h=708&rs=1&pid=ImgDetMain&o=7&rm=3"
                                alt="Singapore City Skyline"
                                style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', height: 'auto', display: 'block' }}
                                onError={(e) => {
                                    e.target.src = "https://tse3.mm.bing.net/th/id/OIP.jJNZIfQn_INbB0uopJI_vgHaFH?w=1024&h=708&rs=1&pid=ImgDetMain&o=7&rm=3";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Nearby Attractions */}
            <section className="nearby-attractions section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4 className="section-subtitle">Explore Singapore</h4>
                        <h2 className="section-title">Nearby Attractions</h2>
                        <p className="section-desc">
                            Make the most of your visit with these must-see destinations
                        </p>
                    </div>

                    <div className="attractions-grid">
                        {nearbyAttractions.map((attraction, index) => (
                            <div className="attraction-card" key={index}>
                                <div className="attraction-image">
                                    <img
                                        src={attraction.image}
                                        alt={attraction.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = vortexImg;
                                        }}
                                    />
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
            <section className="venue-cta section-padding">
                <div className="container text-center">
                    <h2 className="cta-title">
                        Ready to Join Us?
                    </h2>
                    <p className="cta-desc">
                        Secure your spot at the International Conference on Liutex Theory and Applications in Vortex Identification and Vortex Dynamics and be part of this transformative event
                    </p>
                    <div className="cta-action">
                        <Button
                            onClick={() => navigate('/register')}
                        >
                            REGISTER NOW
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Venue;
