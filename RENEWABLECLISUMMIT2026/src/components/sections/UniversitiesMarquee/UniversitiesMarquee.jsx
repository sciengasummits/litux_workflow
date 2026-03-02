import React from 'react';
import './UniversitiesMarquee.css';

// Importing images from the universities folder
import uni1 from '../../../assets/images/universities/download.png';
import uni2 from '../../../assets/images/universities/download2.jpg';
import uni3 from '../../../assets/images/universities/images.png';
import uni4 from '../../../assets/images/universities/images2.jpg';

const universities = [
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
    return (
        <section className="universities-marquee">
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
