import React, { useState, useEffect } from 'react';
import './UniversitiesMarquee.css';
import { fetchContent } from '../../../api/siteApi';

// Importing images from the universities folder as fallback
import uni1 from '../../../assets/images/universities/download.png';
import uni2 from '../../../assets/images/universities/download2.jpg';
import uni3 from '../../../assets/images/universities/images.png';
import uni4 from '../../../assets/images/universities/images2.jpg';

const defaultUniversities = [
    { name: 'University 1', imgUrl: uni1, id: 1 },
    { name: 'University 2', imgUrl: uni2, id: 2 },
    { name: 'University 3', imgUrl: uni3, id: 3 },
    { name: 'University 4', imgUrl: uni4, id: 4 },
    // Repeating to ensure continuous flow
    { name: 'University 1', imgUrl: uni1, id: 5 },
    { name: 'University 2', imgUrl: uni2, id: 6 },
    { name: 'University 3', imgUrl: uni3, id: 7 },
    { name: 'University 4', imgUrl: uni4, id: 8 },
];

const UniversitiesMarquee = () => {
    const [universities, setUniversities] = useState(defaultUniversities);
    const [marqueeData, setMarqueeData] = useState({ title: 'Supporting Universities & Institutions' });

    useEffect(() => {
        let cancelled = false;
        const load = () => {
            fetchContent('marquee').then(data => {
                if (!cancelled && data) {
                    setMarqueeData(data);
                    if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                        const dynamicUniversities = data.items.map((name, index) => ({
                            name: name,
                            imgUrl: [uni1, uni2, uni3, uni4][index % 4],
                            id: index + 1
                        }));
                        setUniversities([...dynamicUniversities, ...dynamicUniversities]);
                    }
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

    return (
        <section className="universities-marquee">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '1rem'
                    }}>
                        {marqueeData.title}
                    </h2>
                </div>
            </div>
            <div className="marquee-track">
                {/* Original Set */}
                {universities.map((uni) => (
                    <div key={uni.id} className="university-item">
                        <img src={uni.imgUrl} alt={uni.name} className="university-logo" />
                    </div>
                ))}

                {/* Duplicate Set for Seamless Loop */}
                {universities.map((uni) => (
                    <div key={`dup-${uni.id}`} className="university-item">
                        <img src={uni.imgUrl} alt={uni.name} className="university-logo" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UniversitiesMarquee;
