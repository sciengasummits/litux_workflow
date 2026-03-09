import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';
import mediaImage from '../../assets/images/Media.jpg';
import '../../assets/styles/global.css';

const Layout = () => {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
            <img src={mediaImage} alt="Media Partner" className="global-media-image" />
        </div>
    );
};

export default Layout;
