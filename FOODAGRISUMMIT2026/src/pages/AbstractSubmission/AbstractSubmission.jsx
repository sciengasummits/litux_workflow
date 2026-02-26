import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, Clock, Star, Calendar, MapPin } from 'lucide-react';
import { countries } from '../../data/countriesData';
import './AbstractSubmission.css';
import { submitAbstract, uploadAbstractFile } from '../../api/siteApi';

// ─── Important Dates defaults (shown if backend is unreachable) ───────────────
const DEFAULT_DATES = [
    { month: 'JUL', day: '1', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
    { month: 'SEP', day: '30', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
    { month: 'NOV', day: '5', year: '2026', event: 'Abstract Submission Deadline', icon: 'Clock' },
    {
        month: 'DEC', day: '7', year: '2026',
        event: 'Conference Date',
        sub: 'December 7–9, 2026, Singapore',
        icon: 'Star',
    },
];

const ICON_MAP = { CalendarDays, CheckCircle, Clock, Star, Calendar, MapPin };

const AbstractSubmission = () => {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        mobile: '',
        organization: '',
        country: '',
        interest: '',
        topic: '',
        address: '',
    });

    const [abstractFile, setAbstractFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    const [importantDates, setImportantDates] = useState(DEFAULT_DATES);

    // Live-fetch Important Dates from backend; silently fall back to defaults
    useEffect(() => {
        fetch('http://localhost:5000/api/content/importantDates?conference=foodagri')
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (data?.dates?.length) setImportantDates(data.dates); })
            .catch(() => { });
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setAbstractFile(files[0] || null);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            alert('Please fill in your Name and Email before submitting.');
            return;
        }

        setSubmitting(true);
        setSubmitStatus(null);

        let fileUrl = '';
        let fileName = '';

        // Upload file first if one was selected
        if (abstractFile) {
            try {
                const uploaded = await uploadAbstractFile(abstractFile);
                fileUrl = uploaded.url || '';
                fileName = uploaded.originalName || abstractFile.name;
            } catch {
                fileName = abstractFile.name; // non-fatal — keep filename anyway
            }
        }

        const payload = {
            title: formData.title,
            name: formData.name,
            email: formData.email,
            phone: formData.mobile,
            organization: formData.organization,
            country: formData.country,
            interest: formData.interest,
            topic: formData.topic,
            address: formData.address,
            fileName,
            fileUrl,
            status: 'Pending',
        };

        try {
            // submitAbstract() in siteApi.js automatically adds conference: 'foodagri'
            await submitAbstract(payload);
            setSubmitStatus('success');
            // Reset form
            setFormData({
                title: '', name: '', email: '', mobile: '',
                organization: '', country: '', interest: '', topic: '', address: '',
            });
            setAbstractFile(null);
        } catch {
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="abstract-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Abstract Submission</h1>
                    <p className="page-breadcrumb">Home / Abstract Submission</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="abstract-layout">

                    {/* ── Left Column: Form ─────────────────────────────────── */}
                    <div className="abstract-col-left">
                        <h2 className="abstract-title">Abstract Submission</h2>

                        <p className="abstract-intro">
                            You are invited to submit abstract. Kindly fill the below form to submit an abstract
                            of your research.{' '}
                            <a href="#" className="template-link">Download the Abstract Template</a>
                        </p>

                        <form className="submission-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <select
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Select Title -</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Dr">Dr</option>
                                        <option value="Prof">Prof</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Name"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter Mobile Number"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        placeholder="Enter Organization"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Please choose a country -</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <select
                                        name="interest"
                                        value={formData.interest}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Interested In -</option>
                                        <option value="oral">Oral Presentation</option>
                                        <option value="poster">Poster Presentation</option>
                                        <option value="workshop">Workshop</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Select Topics of Discussion: -</option>
                                        <option value="food-processing">Food Processing &amp; Engineering</option>
                                        <option value="sustainable-agri">Sustainable Agriculture</option>
                                        <option value="agri-biotech">Agricultural Biotechnology</option>
                                        <option value="food-safety">Food Safety &amp; Quality Control</option>
                                        <option value="nutritional-science">Nutritional Science</option>
                                        <option value="smart-farming">Smart Farming &amp; IoT</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Full Postal Address..."
                                    rows="4"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group full-width">
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        name="file"
                                        className="form-control-file"
                                        accept=".doc,.docx,.pdf,.zip"
                                        onChange={handleChange}
                                    />
                                    <p className="file-upload-note">
                                        Note: (.doc), (.docx), (.pdf) and (.zip) files only.
                                    </p>
                                </div>
                            </div>

                            {/* ── Inline feedback banners ─────────────────────── */}
                            {submitStatus === 'success' && (
                                <div style={{
                                    padding: '14px 20px',
                                    background: '#f0fdf4',
                                    border: '1px solid #86efac',
                                    borderRadius: '10px',
                                    color: '#15803d',
                                    fontWeight: 600,
                                    marginBottom: '16px',
                                    textAlign: 'center',
                                }}>
                                    ✅ Abstract submitted successfully! We will review your submission and get back to you.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div style={{
                                    padding: '14px 20px',
                                    background: '#fef2f2',
                                    border: '1px solid #fca5a5',
                                    borderRadius: '10px',
                                    color: '#dc2626',
                                    fontWeight: 600,
                                    marginBottom: '16px',
                                    textAlign: 'center',
                                }}>
                                    ❌ Submission failed. Please check your internet connection and try again.
                                </div>
                            )}

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="abstract-submit-btn"
                                    style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                                >
                                    {submitting ? 'Submitting…' : 'Submit Abstract'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* ── Right Column: Important Dates — live from backend ─── */}
                    <div className="abstract-col-right">
                        <h3 className="dates-header-title">Important Dates</h3>

                        <div className="dates-list-vertical">
                            {importantDates.map((d, i) => {
                                const Icon = ICON_MAP[d.icon] || CalendarDays;
                                const label = [d.month, d.day, d.year].filter(Boolean).join(' ');
                                return (
                                    <div key={i} className="date-card-item">
                                        <div className="date-icon-circle">
                                            <Icon size={20} />
                                        </div>
                                        <div className="date-content">
                                            <h4>{d.event}</h4>
                                            <p>{d.sub || label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AbstractSubmission;
