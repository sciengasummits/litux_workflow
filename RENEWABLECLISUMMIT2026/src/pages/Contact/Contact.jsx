import React from 'react';
import Button from '../../components/common/Button/Button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-breadcrumb">Home / Contact Us</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="contact__grid">
                    <div className="contact__info">
                        <h2 className="section-title">Get In Touch</h2>
                        <p className="mb-4">
                            Have questions about registration, abstract submission, or the conference schedule?
                            Our team is here to help. Reach out to us using the form or contact details below.
                        </p>

                        <div className="info-item">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4>Address</h4>
                                <p>Munich, Germany</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4>Phone</h4>
                                <p>+91 7842090097</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>contact@renewableenergyconf.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h4>Working Hours</h4>
                                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact__form-wrapper">
                        <div className="form-header">
                            <h3>Send Us a Message</h3>
                            <p>We'd love to hear from you!</p>
                        </div>
                        <form className="contact__form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" placeholder="john@example.com" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" className="form-control" placeholder="Inquiry about..." required />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" className="form-control" placeholder="How can we help you?" required></textarea>
                            </div>
                            <Button type="submit" className="btn-submit-custom">
                                <Send size={18} /> SEND MESSAGE
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
