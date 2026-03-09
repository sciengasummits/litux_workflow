import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Home from '../pages/Home/Home';
import AbstractSubmission from '../pages/AbstractSubmission/AbstractSubmission';
import Register from '../pages/Register/Register';
import Contact from '../pages/Contact/Contact';
import Speakers from '../pages/Speakers/Speakers';
import Venue from '../pages/Venue/Venue';
import Sponsors from '../pages/Sponsors/Sponsors';
import Sessions from '../pages/Sessions/Sessions';
import ThemeDetail from '../pages/ThemeDetail/ThemeDetail';
import FAQ from '../pages/FAQ/FAQ';
import VisaInfo from '../pages/VisaInfo/VisaInfo';
import Brochure from '../pages/Brochure/Brochure';
import Program from '../pages/Program/Program';
import Unsubscribe from '../pages/Unsubscribe/Unsubscribe';
import DiscountRegistration from '../pages/DiscountRegistration/DiscountRegistration';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="abstract-submission" element={<AbstractSubmission />} />
                    <Route path="speakers" element={<Speakers />} />
                    <Route path="sessions" element={<Sessions />} />
                    <Route path="sessions/:themeId" element={<ThemeDetail />} />
                    <Route path="venue" element={<Venue />} />
                    <Route path="sponsors" element={<Sponsors />} />
                    <Route path="faqs" element={<FAQ />} />
                    <Route path="visa-info" element={<VisaInfo />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="register" element={<Register />} />
                    <Route path="register/onlineregistration" element={<DiscountRegistration />} />
                    <Route path="brochure" element={<Brochure />} />
                    <Route path="program" element={<Program />} />
                    <Route path="unsubscribe" element={<Unsubscribe />} />
                    <Route path="*" element={<div className="section-padding text-center"><h1>404 Not Found</h1></div>} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
