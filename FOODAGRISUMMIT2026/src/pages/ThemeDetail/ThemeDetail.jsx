import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Factory, Leaf, ShieldCheck, FlaskConical, Cpu, Activity, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';

const themesData = {
    'food-processing': {
        title: 'Food Processing & Engineering',
        icon: <Factory size={48} />,
        description: 'Innovations in food manufacturing, preservation techniques, and engineering solutions for efficient food production.',
        topics: [
            'Post-Harvest Technology', 'Food Packaging Innovations', 'Novel Processing Techniques', 'Automation in Food Production', 'Waste Management'
        ]
    },
    'sustainable-agri': {
        title: 'Sustainable Agriculture',
        icon: <Leaf size={48} />,
        description: 'Focusing on environmentally friendly farming practices, biodiversity, and long-term agricultural sustainability.',
        topics: [
            'Organic Farming', 'Soil Health Management', 'Water Conservation', 'Agroecology', 'Climate-Resilient Crops'
        ]
    },
    'food-safety': {
        title: 'Food Safety & Quality Control',
        icon: <ShieldCheck size={48} />,
        description: 'Systems and standards ensuring the safety and quality of food from farm to fork.',
        topics: [
            'HACCP and ISO Standards', 'Traceability Systems', 'Food Microbiology', 'Toxicology', 'Global Safety Regulations'
        ]
    },
    'agri-biotech': {
        title: 'Agricultural Biotechnology',
        icon: <FlaskConical size={48} />,
        description: 'Applying biological research and techniques to enhance agricultural productivity and food nutritional value.',
        topics: [
            'Genetic Engineering', 'Biofortification', 'Plant Breeding Innovations', 'Microbial Inoculants', 'Molecular Farming'
        ]
    },
    'nutritional-science': {
        title: 'Nutritional Science & Dietetics',
        icon: <Activity size={48} />,
        description: 'The science of food nutrients, their effects on human health, and dietary strategies for wellness.',
        topics: [
            'Functional Foods', 'Personalized Nutrition', 'Nutraceuticals', 'Dietary Assessment', 'Public Health Nutrition'
        ]
    },
    'smart-farming': {
        title: 'Smart Farming & IoT',
        icon: <Cpu size={48} />,
        description: 'Integrating digital technology and data analytics into farming to optimize productivity and resource use.',
        topics: [
            'Precision Agriculture', 'Drones in Farming', 'IoT Sensor Networks', 'AI for Yield Prediction', 'Digital Supply Chains'
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
