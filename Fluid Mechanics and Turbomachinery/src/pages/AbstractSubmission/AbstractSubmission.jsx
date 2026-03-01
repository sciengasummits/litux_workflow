import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import { CalendarDays } from 'lucide-react';
import { submitAbstract, uploadAbstractFile } from '../../api/siteApi';
import './AbstractSubmission.css';

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
        address: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState(null);

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
        "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
        "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
        "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
        "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
        "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
        "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
        "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
        "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setSelectedFile(files[0] || null);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitMsg(null);
        try {
            let fileUrl = '';
            let fileOriginalName = '';
            if (selectedFile) {
                const uploaded = await uploadAbstractFile(selectedFile);
                fileUrl = uploaded.url || '';
                fileOriginalName = uploaded.originalName || selectedFile.name;
            }
            await submitAbstract({ ...formData, fileUrl, fileOriginalName });
            setSubmitMsg({ type: 'success', text: 'Abstract submitted successfully! Our team will review and respond shortly.' });
            setFormData({ title: '', name: '', email: '', mobile: '', organization: '', country: '', interest: '', topic: '', address: '' });
            setSelectedFile(null);
        } catch (err) {
            setSubmitMsg({ type: 'error', text: 'Submission failed. Please try again or contact support.' });
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

                    {/* Left Column: Form */}
                    <div className="abstract-col-left">
                        <h2 className="abstract-title">Abstract Submission</h2>

                        <p className="abstract-intro">
                            You are invited to submit abstract. Kindly fill the below form to submit an abstract of your research. <a href="#" className="template-link">Download the Abstract Template</a>
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
                                        <option value="fluid_dynamics">Fluid Dynamics</option>
                                        <option value="turbomachinery">Turbomachinery</option>
                                        <option value="aerodynamics">Aerodynamics</option>
                                        <option value="cfd">Computational Fluid Dynamics (CFD)</option>
                                        <option value="hydrodynamics">Hydrodynamics</option>
                                        <option value="propulsion">Propulsion Systems</option>
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
                                ></textarea>
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
                                    <p className="file-upload-note">Note: (.doc), (.docx), (.pdf) and (.zip) files only.</p>
                                </div>
                            </div>

                            <div className="form-actions">
                                {submitMsg && (
                                    <div style={{
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        marginBottom: '12px',
                                        background: submitMsg.type === 'success' ? '#dcfce7' : '#fee2e2',
                                        color: submitMsg.type === 'success' ? '#166534' : '#991b1b',
                                        border: `1px solid ${submitMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                                        fontWeight: '500',
                                    }}>
                                        {submitMsg.text}
                                    </div>
                                )}
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Submit Abstract'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Important Dates */}
                    <div className="abstract-col-right">
                        <h3 className="dates-header-title">Important Dates</h3>

                        <div className="dates-list-vertical">
                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Abstract Submission Opens</h4>
                                    <p> June 15, 2026</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Early Bird Deadline</h4>
                                    <p>September 25, 2026</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Abstract Submission Deadline</h4>
                                    <p>October 30, 2026</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Conference Date</h4>
                                    <p>December 14–16, 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AbstractSubmission;
