import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Activity, Wind, Droplet, Factory, Flame, Zap, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';

const themesData = {
    'cfd': {
        title: 'Computational Fluid Dynamics (CFD)',
        icon: <Activity size={48} />,
        description: 'Advanced simulations, turbulence modeling, and high-performance computing in fluid flow analysis.',
        topics: [
            'Turbulence Modeling', 'Numerical Methods', 'DNS & LES Simulations', 'Fluid-Structure Interaction', 'Algorithm Development'
        ]
    },
    'aerodynamics': {
        title: 'Aerodynamics & Gas Dynamics',
        icon: <Wind size={48} />,
        description: 'Exploration of air flow over objects, supersonic flows, and aerodynamic optimization for vehicles and aircraft.',
        topics: [
            'External Aerodynamics', 'Compressible Flow', 'Flow Control Techniques', 'Transonic & Supersonic Flows', 'Boundary Layer Analysis'
        ]
    },
    'hydrodynamics': {
        title: 'Hydrodynamics & Marine Engineering',
        icon: <Droplet size={48} />,
        description: 'Study of liquid motion, ship propulsion, offshore structures, and marine energy systems.',
        topics: [
            'Ship Hydrodynamics', 'Wave Mechanics', 'Underwater Vehicles', 'Cavitation & Bubble Dynamics', 'Coastal Engineering'
        ]
    },
    'turbomachinery-design': {
        title: 'Turbomachinery Design & Analysis',
        icon: <Factory size={48} />,
        description: 'Innovations in the design, optimization, and reliability of rotating fluid machinery.',
        topics: [
            'Blade Design & Optimization', 'Loss Mechanisms', 'Stall & Surge Control', 'Variable Geometry Systems', 'Component Matching'
        ]
    },
    'gas-turbines': {
        title: 'Gas Turbines & Jet Engines',
        icon: <Flame size={48} />,
        description: 'Advancements in propulsion systems, internal combustion, and high-temperature material applications.',
        topics: [
            'Combustion Stability', 'Cooling Technologies', 'Emissions Reduction', 'Cycle Analysis', 'Aero-engine Performance'
        ]
    },
    'steam-turbines': {
        title: 'Steam Turbines & Power Plants',
        icon: <Zap size={48} />,
        description: 'Optimizing power generation through advanced steam turbine cycles and thermodynamic efficiency.',
        topics: [
            'Rankine Cycle Optimization', 'Moisture Management', 'Seal Technology', 'Dynamic Response', 'Cogeneration Systems'
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
