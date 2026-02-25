import {
    FileText,
    ClipboardList,
    BookOpen,
    Users,
    Mic,
    Megaphone,
    Star,
    UserPlus,
    Layers
} from 'lucide-react';

const STATS = [
    {
        id: 'abstracts',
        label: 'Abstracts',
        value: 12,
        icon: <FileText size={28} strokeWidth={2} />,
        color: 'teal',
    },
    {
        id: 'registrations',
        label: 'Registrations',
        value: 62,
        icon: <ClipboardList size={28} strokeWidth={2} />,
        color: 'green',
    },
    {
        id: 'scientific',
        label: 'Scientific Programme',
        value: 0,
        icon: <BookOpen size={28} strokeWidth={2} />,
        color: 'gold',
    },
    {
        id: 'committee',
        label: 'Committee',
        value: 11,
        icon: <Users size={28} strokeWidth={2} />,
        color: 'teal',
    },
    {
        id: 'plenary',
        label: 'Plenary Speakers',
        value: 4,
        icon: <Mic size={28} strokeWidth={2} />,
        color: 'green',
    },
    {
        id: 'keynote',
        label: 'Keynote Speakers',
        value: 6,
        icon: <Megaphone size={28} strokeWidth={2} />,
        color: 'gold',
    },
    {
        id: 'featured',
        label: 'Featured Speakers',
        value: 0,
        icon: <Star size={28} strokeWidth={2} />,
        color: 'teal',
    },
    {
        id: 'invited',
        label: 'Invited Speakers',
        value: 0,
        icon: <UserPlus size={28} strokeWidth={2} />,
        color: 'green',
    },
    {
        id: 'tracks',
        label: 'Tracks',
        value: 0,
        icon: <Layers size={28} strokeWidth={2} />,
        color: 'gold',
    },
];

export default function StatsGrid({ onCardClick }) {
    return (
        <div className="stats-grid">
            {STATS.map((stat) => (
                <div
                    key={stat.id}
                    className={`stat-card ${stat.color}`}
                    onClick={() => onCardClick && onCardClick(stat.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onCardClick && onCardClick(stat.id)}
                >
                    <div className="stat-icon-wrap">{stat.icon}</div>
                    <div className="stat-info">
                        <div className="stat-label">{stat.label}</div>
                        <div className="stat-value">{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
