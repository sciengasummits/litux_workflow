import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MessageCircle } from 'lucide-react';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import './Navbar.css';


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'PROGRAM', path: '/program' },
        { name: 'SESSIONS', path: '/sessions' },
        { name: 'BROCHURE', path: '/brochure' },
        { name: 'ABSTRACT', path: '/abstract-submission' },
        { name: 'SPEAKERS', path: '/speakers' },
        { name: 'SPONSORSHIP', path: '/sponsors' },
        { name: 'REGISTER', path: '/register' },
        {
            name: 'MORE',
            path: '#',
            dropdown: [
                { name: "FAQ'S", path: '/faqs' },
                { name: 'Venue', path: '/venue' },
                { name: 'Visa Info', path: '/visa-info' }
            ]
        },
        { name: 'CONTACT', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__container">
                <div className="navbar__top">
                    <Logo onClick={closeMobileMenu} />

                    <div className="navbar__contact">
                        <div className="contact-item">
                            <Mail size={18} className="contact-icon" />
                            <div className="contact-info">
                                <span className="contact-label">SEND US AN EMAIL</span>
                                <span className="contact-value">contact@liutexvortexsummit.com</span>
                            </div>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} className="contact-icon" />
                            <div className="contact-info">
                                <span className="contact-label">CALL US NOW</span>
                                <span className="contact-value">+91 7842090097</span>
                            </div>
                        </div>
                        <div className="contact-item">
                            <MessageCircle size={18} className="contact-icon" />
                            <div className="contact-info">
                                <span className="contact-label">WHATSAPP</span>
                                <span className="contact-value">+91 7842090097</span>
                            </div>
                        </div>
                    </div>

                    <button className="navbar__toggle" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className="navbar__divider"></div>

                <div className="navbar__bottom">
                    <div className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--active' : ''}`}>
                        {navLinks.map((link) => (
                            link.dropdown ? (
                                <div className="navbar__dropdown" key={link.name}>
                                    <span className={`navbar__link ${location.pathname === link.path ? 'active' : ''}`}>
                                        {link.name}
                                    </span>
                                    <div className="navbar__dropdown-menu">
                                        {link.dropdown.map((subLink) => (
                                            <Link
                                                key={subLink.name}
                                                to={subLink.path}
                                                className="navbar__dropdown-item"
                                                onClick={closeMobileMenu}
                                            >
                                                {subLink.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`navbar__link ${location.pathname === link.path ? 'active' : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
