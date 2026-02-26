import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import './Unsubscribe.css';

const Unsubscribe = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
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
                    {!submitted ? (
                        <>
                            <h2 className="unsubscribe-title">Mailing List Unsubscribe</h2>
                            <p className="unsubscribe-desc">
                                We are sorry to see you go. Please enter your email address below to unsubscribe from our mailing list.
                            </p>
                            <form className="unsubscribe-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <Button type="submit">Unsubscribe</Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="unsubscribe-success">
                            <div className="success-icon">✓</div>
                            <h2>Unsubscribed Successfully</h2>
                            <p>
                                You have been successfully unsubscribed from our mailing list.
                                You will no longer receive updates from LIUTEX2026.
                            </p>
                            <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Unsubscribe;
