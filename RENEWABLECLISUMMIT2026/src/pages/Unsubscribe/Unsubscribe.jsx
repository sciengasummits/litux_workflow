import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import './Unsubscribe.css';

const Unsubscribe = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Handle unsubscribe logic here
            console.log('Unsubscribe email:', email);
            setIsSubmitted(true);
            setTimeout(() => {
                setEmail('');
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <div className="unsubscribe-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Unsubscribe</h1>
                    <p className="page-breadcrumb">Home / Unsubscribe</p>
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
                            <div className="success-message">
                                <p>You have been successfully unsubscribed from our mailing list.</p>
                            </div>
                        ) : (
                            <form className="unsubscribe-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button type="submit">UNSUBSCRIBE</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unsubscribe;
