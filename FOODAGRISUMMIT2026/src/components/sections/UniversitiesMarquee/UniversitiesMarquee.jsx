import React, { useState, useEffect } from 'react';
import './UniversitiesMarquee.css';
import { fetchContent } from '../../../api/siteApi';

// Importing images from the universities folder
import uni1 from '../../../assets/images/universities/download.png';
import uni2 from '../../../assets/images/universities/download2.jpg';
import uni3 from '../../../assets/images/universities/images.png';
import uni4 from '../../../assets/images/universities/images2.jpg';

const defaultUniversities = [
    { name: 'University 1', imgUrl: uni1, id: 1 },
    { name: 'University 2', imgUrl: uni2, id: 2 },
    { name: 'University 3', imgUrl: uni3, id: 3 },
    { name: 'University 4', imgUrl: uni4, id: 4 },
];

const UniversitiesMarquee = () => {
    const [universities, setUniversities] = useState([...defaultUniversities, ...defaultUniversities]);
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
        const interval = setInterval(load, 15000);
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
            {marqueeData.title && (
                <div className="container marquee-header">
                    <h2 className="marquee-title">{marqueeData.title}</h2>
                </div>
            )}
            <div className="marquee-track">
                {universities.map((uni, idx) => (
                    <div key={`${uni.id}-${idx}`} className="university-item">
                        <img src={uni.imgUrl} alt={uni.name} className="university-logo" />
                        <span className="university-name-tag">{uni.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UniversitiesMarquee;
