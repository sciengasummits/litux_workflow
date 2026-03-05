import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { fetchSpeakers } from '../../../api/siteApi';
import './SpeakersSection.css';

const SpeakersSection = ({ showViewAll }) => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState(location.state?.category || 'Committee');
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [speakersList, setSpeakersList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDisplayCategory = (category) => {
        if (category === 'Student') return 'Student Speaker';
        if (category === 'Committee') return 'Committee';
        return category;
    };

    useEffect(() => {
        setLoading(true);
        // Map frontend categories to backend categories if needed
        // Backend usually expects 'Committee', 'Keynote', 'Oral', 'Poster', etc.
        let categoryToFetch = activeCategory;
        if (activeCategory === 'Speakers') categoryToFetch = 'Keynote'; // example mapping
        if (activeCategory === 'Posters') categoryToFetch = 'Poster Presenter';
        if (activeCategory === 'Students') categoryToFetch = 'Student';
        if (activeCategory === 'Delegates') categoryToFetch = 'Delegate';

        fetchSpeakers(categoryToFetch).then(d => {
            if (d) setSpeakersList(d);
            setLoading(false);
        });
    }, [activeCategory]);

    const displaySpeakers = showViewAll ? speakersList.slice(0, 8) : speakersList;

    const openModal = (speaker) => {
        setSelectedSpeaker(speaker);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setSelectedSpeaker(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

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
                    {displaySpeakers.map((speaker, index) => (
                        <div className="speaker-card" key={speaker._id || index}>
                            <div className="speaker-img-wrapper">
                                <img src={speaker.image} alt={speaker.name} className="speaker-img" />
                                <div className="speaker-overlay"></div>
                            </div>
                            <div className="speaker-info">
                                {speaker.category && <span className="speaker-category">{getDisplayCategory(speaker.category)}</span>}
                                <h3 className="speaker-name">{speaker.name}</h3>
                                <p className="speaker-title">{speaker.title}</p>
                                <p className="speaker-affiliation">{speaker.affiliation}</p>
                                <button className="btn-biograph" onClick={() => openModal(speaker)}>
                                    <User size={16} /> Biography
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {loading && <div className="text-center mt-4">Loading members...</div>}
                {!loading && displaySpeakers.length === 0 && (
                    <div className="text-center mt-4">No participants found in this category.</div>
                )}

                {showViewAll && speakersList.length > 8 && (
                    <div className="text-center mt-5">
                        <Link
                            to="/speakers"
                            state={{ category: activeCategory }}
                            className="btn-biograph"
                            style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '2rem' }}
                        >
                            Show More
                        </Link>
                    </div>
                )}
            </div>

            {/* Speaker Modal */}
            {selectedSpeaker && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>

                        <div className="modal-body">
                            {selectedSpeaker.category && <p className="modal-category">{getDisplayCategory(selectedSpeaker.category)}</p>}
                            <h3 className="modal-title">{selectedSpeaker.name}</h3>
                            <span className="modal-type">{selectedSpeaker.title}</span>
                            <p className="modal-affiliation-highlight">{selectedSpeaker.affiliation}</p>
                            <p className="modal-desc">{selectedSpeaker.bio || "A distinguished expert in the field of renewable energy and climate science, contributing significantly to research and sustainable development."}</p>
                        </div>
                    </div>
                </div>
            )}
        </section >
    );
};

export default SpeakersSection;
