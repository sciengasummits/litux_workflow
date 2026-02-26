import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, Target, Layers, Wind, Cpu, Terminal, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';

const themesData = {
    'liutex-fundamentals': {
        title: 'Liutex Fundamentals',
        icon: <Compass size={48} />,
        description: 'Exploring the mathematical foundations and definition of Liutex as a physical quantity for rotation.',
        topics: [
            'Mathematical Definition of Liutex', 'Vector Decompositions', 'Principal Coordinate System', 'Liutex vs. Vorticity', 'Rotational Strength Analysis'
        ]
    },
    'vortex-identification': {
        title: 'Vortex Identification',
        icon: <Target size={48} />,
        description: 'Advanced methods for identifying and extracting vortex structures from complex flow fields.',
        topics: [
            'Omega (Ω) Method', 'Q-criterion & λ2-criterion', 'Objective Vortex Identification', 'Threshold Selection Strategies', 'Comparative Study of Methods'
        ]
    },
    'turbulence-modeling': {
        title: 'Turbulence Modeling',
        icon: <Layers size={48} />,
        description: 'Applying Liutex theory to enhance turbulence models and understand energy cascades.',
        topics: [
            'Liutex-based RANS Models', 'LES & Wall-bounded Flows', 'DNS Data Analysis', 'Subgrid Scale Modeling', 'Turbulent Structure Extraction'
        ]
    },
    'aerospace-applications': {
        title: 'Aerospace Engineering',
        icon: <Wind size={48} />,
        description: 'Vortex dynamics in aerodynamics, wing tip vortices, and propulsion systems.',
        topics: [
            'Wing-tip Vortex Control', 'Delta Wing Aerodynamics', 'Turbomachinery Flows', 'Supersonic Vortex Stability', 'Unsteady Lift Generation'
        ]
    },
    'cfd-algorithms': {
        title: 'CFD & Algorithms',
        icon: <Cpu size={48} />,
        description: 'High-order numerical schemes and hardware-accelerated vortex tracking.',
        topics: [
            'High-Order Spectral Methods', 'Real-time Vortex Detection', 'GPU Accelerated Solvers', 'Adaptive Mesh Refinement', 'Flow Field Reconstruction'
        ]
    },
    'ai-flow-analysis': {
        title: 'AI & Flow Analysis',
        icon: <Terminal size={48} />,
        description: 'Leveraging machine learning for automated vortex feature extraction and prediction.',
        topics: [
            'Deep Learning for Vortex Tracking', 'Physics-Informed Neural Networks', 'Reduced Order Modeling', 'Reinforcement Learning in Flow Control', 'Big Data in Fluid Mechanics'
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
