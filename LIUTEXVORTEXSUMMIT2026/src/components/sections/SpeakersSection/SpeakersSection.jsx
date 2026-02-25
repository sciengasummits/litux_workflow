import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { speakers as staticSpeakers } from '../../../data/speakersData';
import { fetchSpeakers } from '../../../api/siteApi';
import './SpeakersSection.css';

const SpeakersSection = ({ showViewAll }) => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(location.state?.category || 'Committee');
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [allSpeakers, setAllSpeakers] = useState(staticSpeakers);

    // Fetch live speakers from API
    useEffect(() => {
        fetchSpeakers().then(data => {
            if (data && data.length > 0) {
                setAllSpeakers(data);
            }
        });
    }, []);

    const getDisplayCategory = (category) => {
        if (category === 'Student') return 'Student Speaker';
        if (category === 'Committee') return 'Committee';
        return category;
    };

    const filteredSpeakers = allSpeakers.filter(speaker => {
        if (activeCategory === 'Committee') return speaker.category === 'Committee';
        if (activeCategory === 'Speakers') return ['Plenary', 'Keynote', 'Invited', 'Featured'].includes(speaker.category);
        if (activeCategory === 'Posters') return speaker.category === 'Poster Presenter';
        if (activeCategory === 'Students') return speaker.category === 'Student';
        if (activeCategory === 'Delegates') return speaker.category === 'Delegate';
        return true;
    }).slice(0, showViewAll ? 8 : allSpeakers.length);

    useEffect(() => {
        document.body.style.overflow = selectedSpeaker ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedSpeaker]);

    return (
        <section className="speakers section-padding" id="speakers">
            <div className="container">
                <div className="text-center mb-5">
                    <h4 className="section-subtitle">Meet The Experts</h4>
                    <h2 className="section-title">Global Participants</h2>
                </div>

                <div className="speakers__filters">
                    {['Committee', 'Speakers', 'Posters', 'Students', 'Delegates'].map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="speakers__grid">
                    {filteredSpeakers.length === 0 ? (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                            <User size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
                            <p style={{ fontSize: '16px' }}>No participants in this category yet.</p>
                        </div>
                    ) : (
                        filteredSpeakers.map((speaker, idx) => (
                            <div className="speaker-card" key={speaker._id || speaker.id || idx}>
                                <div className="speaker-img-wrapper">
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className="speaker-img"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(speaker.name?.[0] || '?'); }}
                                    />
                                    <div className="speaker-overlay"></div>
                                </div>
                                <div className="speaker-info">
                                    {speaker.category && (
                                        <span className="speaker-category">
                                            <span className="speaker-category-text">{getDisplayCategory(speaker.category)}</span>
                                        </span>
                                    )}
                                    <h3 className="speaker-name">{speaker.name}</h3>
                                    <p className="speaker-title">{speaker.title}</p>
                                    <p className="speaker-affiliation">{speaker.affiliation}</p>
                                    <button className="btn-biograph" onClick={() => setSelectedSpeaker(speaker)}>
                                        <User size={16} /> Biography
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {showViewAll && filteredSpeakers.length > 0 && (
                    <div className="text-center mt-5">
                        <Link to="/speakers" state={{ category: activeCategory }} className="btn-biograph"
                            style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '2rem' }}>
                            Show More
                        </Link>
                    </div>
                )}
            </div>

            {/* Speaker Modal */}
            {selectedSpeaker && (
                <div className="modal-overlay" onClick={() => setSelectedSpeaker(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedSpeaker(null)}>&times;</button>
                        <div className="modal-body">
                            {selectedSpeaker.category && <p className="modal-category">{getDisplayCategory(selectedSpeaker.category)}</p>}
                            <h3 className="modal-title">{selectedSpeaker.name}</h3>
                            <span className="modal-type">{selectedSpeaker.title}</span>
                            <p className="modal-affiliation-highlight">{selectedSpeaker.affiliation}</p>
                            <p className="modal-desc">{selectedSpeaker.bio || 'A distinguished expert in the field, contributing significantly to research and clinical practice.'}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SpeakersSection;
