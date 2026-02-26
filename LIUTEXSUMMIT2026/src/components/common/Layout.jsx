import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import mediaImage from '../../assets/images/Media.jpg';

const Layout = () => {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />

            {/* Global CPD Floating Badge - Now on all pages */}
            <div className="cpd-floating-badge">
                <img src={mediaImage} alt="CPD Accredited Provider" className="blinking-image" />
            </div>
        </div>
    );
};

export default Layout;
