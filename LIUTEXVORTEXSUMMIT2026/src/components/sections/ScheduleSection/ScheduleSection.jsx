import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScheduleSection.css';

const DEFAULT_DAYS = [
    {
        label: 'Day 1',
        rows: [
            { time: '8.30 – 9.00', program: 'Registration' },
            { time: '9.00 – 9.30', program: 'Conference Inauguration' },
            { time: '9.30 – 11.00', program: 'Plenary Sessions' },
            { time: '11.00 – 11.20', program: 'Tea/Coffee Break' },
            { time: '11.20 – 13.00', program: 'Plenary Sessions' },
            { time: '13.00 – 13.10', program: 'Group Photograph' },
            { time: '13.10 – 14.00', program: 'Lunch' },
            { time: '14.00 – 15.40', program: 'Keynote Sessions' },
            { time: '15.40 – 16.00', program: 'Tea/Coffee Break' },
            { time: '16.00 – 17.30', program: 'Keynote Sessions' },
            { time: '17.30 – 18.30', program: 'Workshop' },
        ],
    },
    {
        label: 'Day 2',
        rows: [
            { time: '9.00 – 10.30', program: 'Scientific Sessions' },
            { time: '10.30 – 10.50', program: 'Tea/Coffee Break' },
            { time: '10.50 – 13.00', program: 'Poster Presentations' },
            { time: '13.00 – 14.00', program: 'Lunch' },
            { time: '14.00 – 15.30', program: 'Panel Discussions' },
            { time: '15.30 – 16.00', program: 'Award Ceremony & Closing' },
        ],
    },
    {
        label: 'Day 3',
        rows: [
            { time: '9.00 – 10.30', program: 'Networking Session' },
            { time: '10.30 – 11.00', program: 'Tea/Coffee Break' },
            { time: '11.00 – 12.30', program: 'Future Trends Workshop' },
            { time: '12.30 – 13.30', program: 'Lunch' },
            { time: '13.30 – 15.00', program: 'Final Remarks & Departure' },
        ],
    },
];

/* TAB_SUBS — cycled as subtitle for however many days exist */
const TAB_SUBS = ['Conference', 'Discussions', 'Workshops', 'Sessions', 'Activities', 'Closing'];

/* Preview: shows first 6 rows + "View Full Schedule" button (home page)
   Full:    shows all rows (Sessions page) */
const ScheduleSection = ({ preview = false }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [days, setDays] = useState(DEFAULT_DAYS);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/content/sessions')
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (!data) return;

                if (data.days?.length) {
                    // New array format saved by updated dashboard
                    setDays(data.days);
                } else if (data.schedule) {
                    // Legacy day1/day2/day3 format — convert to array
                    const legacy = Object.entries(data.schedule)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([key, rows], i) => ({
                            label: `Day ${i + 1}`,
                            rows: Array.isArray(rows) ? rows : [],
                        }))
                        .filter(d => d.rows.length > 0);
                    if (legacy.length) setDays(legacy);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const safeIdx = Math.min(activeIdx, days.length - 1);
    const activeDay = days[safeIdx] || { label: 'Day 1', rows: [] };
    const rows = activeDay.rows || [];
    const displayRows = preview ? rows.slice(0, 6) : rows;

    return (
        <section className="schedule section-padding" id="schedule">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Program Schedule</h2>
                    <div className="section-line"></div>
                </div>

                {/* Day tabs — rendered dynamically for any number of days */}
                <div className="schedule__tabs-wrapper">
                    <div className="schedule__tabs">
                        {days.map((day, i) => (
                            <button
                                key={i}
                                className={`schedule__tab ${safeIdx === i ? 'active' : ''}`}
                                onClick={() => setActiveIdx(i)}
                            >
                                <span className="tab-day">{day.label || `Day ${i + 1}`}</span>
                                <span className="tab-date">{TAB_SUBS[i % TAB_SUBS.length]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="schedule__content fade-in">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                            <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'sched-spin 0.8s linear infinite', margin: '0 auto 10px' }} />
                            Loading schedule…
                        </div>
                    ) : (
                        <div className={`schedule__table-container${preview ? ' demo-container' : ''}`}>
                            <table className="schedule__table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Session Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayRows.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                                                No schedule items for this day yet.
                                            </td>
                                        </tr>
                                    ) : displayRows.map((item, index) => (
                                        <tr key={index}>
                                            <td className="time-col">
                                                <div className="time-badge">{item.time}</div>
                                            </td>
                                            <td className="program-col">
                                                <div className="program-info">
                                                    <span className="program-title">{item.program}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Fade overlay only in preview mode */}
                            {preview && rows.length > 6 && (
                                <div className="schedule-fade-overlay"></div>
                            )}
                        </div>
                    )}

                    {preview && !loading && (
                        <div className="text-center mt-4">
                            <button className="btn-view-schedule" onClick={() => navigate('/sessions')}>
                                View Full Schedule
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`@keyframes sched-spin { to { transform: rotate(360deg); } }`}</style>
        </section>
    );
};

export default ScheduleSection;
