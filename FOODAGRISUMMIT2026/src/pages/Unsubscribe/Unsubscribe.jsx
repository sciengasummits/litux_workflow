import React, { useState } from 'react';
import './Unsubscribe.css';

const Unsubscribe = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle unsubscribe logic here
        console.log('Unsubscribe email:', email);
        setIsSubmitted(true);
        setTimeout(() => {
            setEmail('');
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="unsubscribe-page">
            <div className="unsubscribe-banner">
                <div className="container">
                    <h1 className="unsubscribe-banner-title">Unsubscribe</h1>
                    <p className="unsubscribe-breadcrumb">HOME / UNSUBSCRIBE</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="unsubscribe-container">
                    <div className="unsubscribe-card">
                        <h2 className="unsubscribe-title">Mailing List Unsubscribe</h2>
                        <p className="unsubscribe-description">
                            We are sorry to see you go. Please enter your email address below to unsubscribe from our mailing list.
                        </p>

                        {isSubmitted ? (
                            <div className="unsubscribe-success">
                                <p>You have been successfully unsubscribed from our mailing list.</p>
                            </div>
                        ) : (
                            <form className="unsubscribe-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="unsubscribe-input"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="unsubscribe-btn">
                                    UNSUBSCRIBE
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unsubscribe;
