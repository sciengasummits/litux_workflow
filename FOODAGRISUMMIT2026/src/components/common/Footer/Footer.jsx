import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import Logo from '../Logo/Logo';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__col">
                        <div className="footer__coll-logo" style={{ marginBottom: '1.5rem' }}>
                            <Logo />
                        </div>
                        <p className="footer__desc">
                            Annual International Conference on Food Science Technology and Agriculture, where global experts unite to shape the future of food science and agricultural innovation.
                        </p>
                        <div className="footer__socials">
                            <a href="https://www.facebook.com/profile.php?id=61588065033161" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={20} /></a>
                            <a href="https://www.linkedin.com/company/scienga-summits/" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>
                            <a href="https://www.instagram.com/sciengasummits/" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4>Important Links</h4>
                        <ul className="footer__links">
                            <li><Link to="/abstract-submission">Abstract Submission</Link></li>
                            <li><Link to="/register">Registration</Link></li>
                            <li><Link to="/online-registration">Discount Registration</Link></li>
                            <li><Link to="/sessions">Sessions</Link></li>
                            <li><Link to="/program">Program</Link></li>
                            <li><Link to="/speakers">Speakers</Link></li>
                            <li><Link to="/unsubscribe">Unsubscribe</Link></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4>Contact Info</h4>
                        <ul className="footer__contact">
                            <li>
                                <MapPin size={18} />
                                <div>
                                    <span style={{ display: 'block', fontWeight: 'bold', color: 'white' }}>Venue:</span>
                                    <span>Marina Bay, Singapore</span>
                                </div>
                            </li>

                            <li>
                                <Mail size={18} />
                                <span>contact@foodagrisummit.com</span>
                            </li>
                            <li>
                                <Phone size={18} />
                                <span>+91 7842090097</span>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4>Subscribe</h4>
                        <p>Get the latest updates and news.</p>
                        <form className="footer__form">
                            <input type="email" placeholder="Your Email" />
                            <button type="submit">Go</button>
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} Annual International Conference on Food Science Technology and Agriculture. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
