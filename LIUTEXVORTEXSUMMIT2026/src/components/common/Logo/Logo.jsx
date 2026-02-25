
import React from 'react';
import { Wind, Tornado } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ className = '', linkTo = '/', onClick }) => {
    return (
        <Link to={linkTo} className={`app-logo ${className}`} onClick={onClick}>
            <div className="logo-icon-container">
                <Wind size={28} strokeWidth={2.5} className="logo-icon-primary" />
                <div className="logo-icon-accent-wrapper">
                    <div className="logo-icon-accent">
                        <Tornado size={14} className="logo-icon-secondary" strokeWidth={3} />
                    </div>
                </div>
            </div>
            <div className="logo-text-container">
                <span className="logo-text-main">LIUTEX2026</span>
            </div>
        </Link>
    );
};

export default Logo;
