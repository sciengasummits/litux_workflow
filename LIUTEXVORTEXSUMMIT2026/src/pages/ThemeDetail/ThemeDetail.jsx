import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Stethoscope, Heart, Brain, Activity, Microscope, Globe, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';

const themesData = {
    'primary-care': {
        title: 'Primary Care',
        icon: <Stethoscope size={48} />,
        description: 'Innovations in primary healthcare delivery focusing on patient-centered care, prevention, and community health strategies.',
        topics: [
            'Family Medicine', 'Preventive Healthcare', 'Geriatrics', 'Chronic Disease Management', 'Telemedicine in Primary Care'
        ]
    },
    'cardiology': {
        title: 'Cardiology',
        icon: <Heart size={48} />,
        description: 'Latest research in cardiovascular medicine, including interventional cardiology, heart failure management, and preventive cardiology.',
        topics: [
            'Interventional Cardiology', 'Heart Failure', 'Preventive Cardiology', 'Pediatric Cardiology', 'Cardiac Imaging'
        ]
    },
    'neurology': {
        title: 'Neurology',
        icon: <Brain size={48} />,
        description: 'Advancements in treating neurological disorders such as stroke, epilepsy, Alzheimer\'s, and Parkinson\'s disease.',
        topics: [
            'Stroke Management', 'Epilepsy Research', 'Neurodegenerative Diseases', 'Neuroimaging', 'Pediatric Neurology'
        ]
    },
    'public-health': {
        title: 'Public Health',
        icon: <Globe size={48} />,
        description: 'Global strategies for public health challenges, epidemiology, and health policy implementation.',
        topics: [
            'Epidemiology', 'Global Health Policy', 'Infectious Disease Control', 'Health Equity', 'Occupational Health'
        ]
    },
    'emergency-medicine': {
        title: 'Emergency Medicine',
        icon: <Activity size={48} />,
        description: 'Critical care and emergency response protocols, trauma management, and disaster medicine.',
        topics: [
            'Trauma Care', 'Critical Care Medicine', 'Disaster Response', 'Pediatric Emergency', 'Toxicology'
        ]
    },
    'clinical-research': {
        title: 'Clinical Research',
        icon: <Microscope size={48} />,
        description: 'Updates from cutting-edge clinical trials, research methodology, and translational medicine.',
        topics: [
            'Clinical Trials Methodology', 'Translational Medicine', 'Bioethics', 'Drug Development', 'Data Analysis in Research'
        ]
    }
};

const ThemeDetail = () => {
    const { themeId } = useParams();
    const theme = themesData[themeId];

    if (!theme) {
        return (
            <div className="section-padding text-center">
                <h2>Theme Not Found</h2>
                <Link to="/">
                    <Button variant="outline">Go Back Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="theme-detail-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">{theme.title}</h1>
                    <p className="page-breadcrumb">
                        <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link> / Key Themes / {theme.title}
                    </p>
                </div>
            </div>

            <div className="container section-padding">
                <Link to="/" className="mb-4 d-inline-block" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '2rem' }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <div className="theme-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="text-center mb-5">
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--color-bg-light)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: 'var(--color-primary-end)'
                        }}>
                            {theme.icon}
                        </div>
                        <p className="lead" style={{ fontSize: '1.2rem', color: 'var(--color-text-body)' }}>
                            {theme.description}
                        </p>
                    </div>

                    <div className="theme-topics">
                        <h3 className="mb-4">Key Topics & Sessions</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                            {theme.topics.map((topic, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-5 text-center">
                        <h3 className="mb-3">Interested in this track?</h3>
                        <Link to="/abstract-submission">
                            <Button>Submit Abstract for {theme.title}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeDetail;
