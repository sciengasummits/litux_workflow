import React, { useState, useEffect } from 'react';
import './UniversitiesMarquee.css';
import { fetchContent } from '../../../api/siteApi';

const UniversitiesMarquee = () => {
    const [data, setData] = useState({ images: [] });

    useEffect(() => {
        fetchContent('marquee').then(d => d && setData(d));
    }, []);

    const images = data.images || [];

    if (images.length === 0) return null;

    return (
        <section className="universities-marquee">
            <div className="marquee-track">
                {/* Original Set */}
                {images.map((img, index) => (
                    <div key={index} className="university-item">
                        <img src={img} alt="University logo" className="university-logo" />
                    </div>
                ))}

                {/* Duplicate Set for Seamless Loop */}
                {images.map((img, index) => (
                    <div key={`dup-${index}`} className="university-item">
                        <img src={img} alt="University logo" className="university-logo" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UniversitiesMarquee;
