import React from 'react';
import SpeakersSection from '../../components/sections/SpeakersSection/SpeakersSection';

const Speakers = () => {
    return (
        <div className="pt-5">
            <div className="page-header" style={{ marginTop: '0' }}>
                <div className="container">
                    <h1 className="page-title">Speakers</h1>
                    <p className="page-breadcrumb">Home / Speakers</p>
                </div>
            </div>
            <SpeakersSection />
        </div>
    );
};

export default Speakers;
