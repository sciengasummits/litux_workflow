import React from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import './Program.css';

const Program = () => {
    return (
        <div className="program-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Program</h1>
                    <p className="page-breadcrumb">Home / Program</p>
                </div>
            </div>

            <section className="program-content section-padding">
                <div className="container">
                    <div className="program-placeholder">
                        <div className="program-icon">
                            <Calendar size={48} />
                        </div>
                        <h2>Detailed Program Schedule</h2>
                        <p>The comprehensive conference schedule, including keynote timings and technical sessions, will be revealed by May 2026.</p>

                        <Button variant="primary">
                            <Bell size={18} style={{ marginRight: '8px' }} /> Notify Me On Update
                        </Button>

                        <div className="program-timeline-mock">
                            <div className="timeline-skeleton">
                                <div className="skeleton-text"></div>
                                <div className="skeleton-time"><Clock size={12} /> --:--</div>
                            </div>
                            <div className="timeline-skeleton">
                                <div className="skeleton-text"></div>
                                <div className="skeleton-time"><Clock size={12} /> --:--</div>
                            </div>
                            <div className="timeline-skeleton">
                                <div className="skeleton-text" style={{ width: '40%' }}></div>
                                <div className="skeleton-time"><Clock size={12} /> --:--</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Program;
