import React from 'react';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import UniversitiesMarquee from '../../components/sections/UniversitiesMarquee/UniversitiesMarquee';
import AboutSection from '../../components/sections/AboutSection/AboutSection';
import KeyThemesSection from '../../components/sections/KeyThemesSection/KeyThemesSection';
import SpeakersSection from '../../components/sections/SpeakersSection/SpeakersSection';
import PricingSection from '../../components/sections/PricingSection/PricingSection';
import VenueSection from '../../components/sections/VenueSection/VenueSection';
import SponsorsSection from '../../components/sections/SponsorsSection/SponsorsSection';
import StatsSection from '../../components/sections/StatsSection/StatsSection';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <UniversitiesMarquee />
            <AboutSection />
            <StatsSection />
            <SpeakersSection showViewAll={true} />
            <PricingSection />
            {/*
                Sessions (left) + Conference Schedule (right) — live from dashboard.
                showLearnMore=true: caps items, adds fade overlay + "Learn More" → /sessions
            */}
            <KeyThemesSection showLearnMore={true} />
            <VenueSection />
            <SponsorsSection />
        </div>
    );
};

export default Home;
