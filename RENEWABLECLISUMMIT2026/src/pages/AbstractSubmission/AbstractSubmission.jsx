import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import { CalendarDays } from 'lucide-react';
import './AbstractSubmission.css';

// Comprehensive list of all countries
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Abstract submitted successfully! (This is a demo)');
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
                                        {countries.map((country) => (
                                            <option key={country} value={country}>{country}</option>
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
                                        <option value="cardiology">Cardiology</option>
                                        <option value="neurology">Neurology</option>
                                        <option value="oncology">Oncology</option>
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
                                <Button type="submit">Submit Abstract</Button>
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
                                    <p>September 15, 2026</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Early Bird Deadline</h4>
                                    <p>November 25, 2026</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Abstract Submission Deadline</h4>
                                    <p>January 25, 2027</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Conference Date</h4>
                                    <p>March 23–25, 2027</p>
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
