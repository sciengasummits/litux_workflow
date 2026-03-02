import React from 'react';
import KeyThemesSection from '../../components/sections/KeyThemesSection/KeyThemesSection';

const KeyThemes = () => {
    return (
        <div className="pt-5">
            <div className="page-header" style={{ marginTop: '0' }}>
                <div className="container">
                    <h1 className="page-title">Sessions</h1>
                    <p className="page-breadcrumb">Home / Sessions</p>
                </div>
            </div>
            <KeyThemesSection />

            <div className="container section-padding">
                <h3>Call for Papers</h3>
                <p>
                    We invite researchers, clinicians, and academicians to submit their abstracts on the above themes.
                    Accepted abstracts will be published in the conference proceedings.
                </p>
            </div>
        </div>
    );
};

export default KeyThemes;
