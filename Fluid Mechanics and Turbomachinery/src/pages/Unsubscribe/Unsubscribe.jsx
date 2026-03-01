import React, { useState } from 'react';
import './Unsubscribe.css';

const Unsubscribe = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Unsubscribe email:', email);
        setIsSubmitted(true);
        // Add unsubscribe logic here
    };

    return (
        <div className="unsubscribe-page">
            <div className="unsubscribe__hero">
                <div className="container">
                    <h1>Unsubscribe</h1>
                    <p className="breadcrumb">HOME / UNSUBSCRIBE</p>
                </div>
            </div>

            <div className="container">
                <div className="unsubscribe__content">
                    <div className="unsubscribe-card">
                        <h2>Mailing List Unsubscribe</h2>
                        <p className="unsubscribe-description">
                            We are sorry to see you go. Please enter your email address below to unsubscribe from our mailing list.
                        </p>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="unsubscribe-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="unsubscribe-btn">
                                    UNSUBSCRIBE
                                </button>
                            </form>
                        ) : (
                            <div className="success-message">
                                <p>You have been successfully unsubscribed from our mailing list.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unsubscribe;
