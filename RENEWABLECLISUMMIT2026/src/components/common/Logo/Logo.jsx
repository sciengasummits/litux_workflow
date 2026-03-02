
import React from 'react';
import { Sun, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ className = '', linkTo = '/', onClick }) => {
    return (
        <Link to={linkTo} className={`app-logo ${className}`} onClick={onClick}>
            <div className="logo-icon-container">
                <Sun size={28} strokeWidth={2.5} className="logo-icon-primary" />
                <div className="logo-icon-heart-wrapper">
                    <div className="logo-icon-heart">
                        <Leaf size={12} fill="currentColor" strokeWidth={0} />
                    </div>
                </div>
            </div>
            <div className="logo-text-container">
                <span className="logo-text-main">RENECLIMSUMMIT2026</span>
            </div>
        </Link>
    );
};

export default Logo;
