import React from 'react';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import AboutSection from '../../components/sections/AboutSection/AboutSection';
import StatsSection from '../../components/sections/StatsSection/StatsSection';
import KeyThemesSection from '../../components/sections/KeyThemesSection/KeyThemesSection';
import SpeakersSection from '../../components/sections/SpeakersSection/SpeakersSection';
import PricingSection from '../../components/sections/PricingSection/PricingSection';
import SponsorsSection from '../../components/sections/SponsorsSection/SponsorsSection';
import PreviousConferenceSection from '../../components/sections/PreviousConferenceSection/PreviousConferenceSection';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <AboutSection />
            <StatsSection />
            <SpeakersSection />
            <PricingSection />
            <KeyThemesSection showLearnMore={true} />
            <PreviousConferenceSection />
            <SponsorsSection />
        </div>
    );
};

export default Home;
