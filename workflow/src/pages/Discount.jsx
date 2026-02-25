import { useState } from 'react';
import {
    Percent,
    List,
    Plus,
    Eye,
    Tag,
    Filter,
    Save,
    Trash2,
    UserPlus,
    Building2,
    Star,
    CheckCircle,
    Copy,
} from 'lucide-react';

const PERCENTAGES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const CATEGORIES = [
    {
        id: 'registration',
        label: 'Only Registration',
        sub: 'Discount applies only to registration fees',
        icon: <UserPlus size={36} />,
    },
    {
        id: 'accommodation',
        label: 'Only Accommodation',
        sub: 'Discount applies only to accommodation',
        icon: <Building2 size={36} />,
    },
    {
        id: 'both',
        label: 'Both',
        sub: 'Discount applies to registration and accommodation',
        icon: <Star size={36} />,
    },
];

export default function Discount() {
    const [activeTab, setActiveTab] = useState('create'); // 'create' | 'view'
    const [coupon, setCoupon] = useState('');
    const [category, setCategory] = useState('registration');
    const [percentage, setPercentage] = useState(10);
    const [discounts, setDiscounts] = useState([]);
    const [toast, setToast] = useState(null);
    const [copied, setCopied] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleCreate = () => {
        if (!coupon.trim()) {
            showToast('Please enter a discount coupon code.', 'error');
            return;
        }
        const newDiscount = {
            id: Date.now(),
            coupon: coupon.trim().toUpperCase(),
            category,
            percentage,
        };
        setDiscounts(prev => [newDiscount, ...prev]);
        setCoupon('');
        setCategory('registration');
        setPercentage(10);
        showToast(`Discount code "${newDiscount.coupon}" created successfully!`);
    };

    const handleDelete = (id) => {
        setDiscounts(prev => prev.filter(d => d.id !== id));
        showToast('Discount deleted.', 'error');
    };

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).catch(() => { });
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    const categoryLabel = {
        registration: 'Only Registration',
        accommodation: 'Only Accommodation',
        both: 'Both',
    };

    return (
        <div className="disc-page">

            {/* Toast */}
            {toast && (
                <div className={`disc-toast disc-toast--${toast.type}`}>
                    <CheckCircle size={16} />
                    <span>{toast.msg}</span>
                </div>
            )}

            {/* ── Header ── */}
            <div className="disc-header">
                <div className="disc-header-left">
                    <Percent size={26} className="disc-header-icon" />
                    <h1 className="disc-title">Discount</h1>
                </div>
                <button
                    className="disc-view-all-btn"
                    onClick={() => setActiveTab('view')}
                    id="disc-view-all-btn"
                >
                    <List size={16} /> View All Discounts
                </button>
            </div>

            {/* ── Tabs ── */}
            <div className="disc-tabs">
                <button
                    id="disc-tab-create"
                    className={`disc-tab-btn${activeTab === 'create' ? ' disc-tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('create')}
                >
                    <Plus size={15} /> Create New Discount
                </button>
                <button
                    id="disc-tab-view"
                    className={`disc-tab-btn disc-tab-btn--outline${activeTab === 'view' ? ' disc-tab-btn--outline-active' : ''}`}
                    onClick={() => setActiveTab('view')}
                >
                    <Eye size={15} /> View Discounts
                </button>
            </div>

            {/* ── Create Tab ── */}
            {activeTab === 'create' && (
                <div className="disc-form-card">

                    {/* Coupon Input */}
                    <div className="disc-section">
                        <div className="disc-section-label">
                            <Tag size={16} className="disc-section-icon" />
                            <span>Discount Coupon <span className="disc-required">*</span></span>
                        </div>
                        <input
                            id="disc-coupon-input"
                            className="disc-coupon-input"
                            type="text"
                            placeholder="ENTER DISCOUNT CODE"
                            value={coupon}
                            onChange={e => setCoupon(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleCreate()}
                            maxLength={30}
                        />
                    </div>

                    {/* Category */}
                    <div className="disc-section">
                        <div className="disc-section-label">
                            <Filter size={16} className="disc-section-icon" />
                            <span>Select Category <span className="disc-required">*</span></span>
                        </div>
                        <div className="disc-category-grid">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    id={`disc-cat-${cat.id}`}
                                    className={`disc-cat-card${category === cat.id ? ' disc-cat-card--active' : ''}`}
                                    onClick={() => setCategory(cat.id)}
                                >
                                    <span className="disc-cat-icon">{cat.icon}</span>
                                    <span className="disc-cat-label">{cat.label}</span>
                                    <span className="disc-cat-sub">{cat.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Percentage */}
                    <div className="disc-section">
                        <div className="disc-section-label">
                            <Percent size={16} className="disc-section-icon" />
                            <span>Select Discount Percentage <span className="disc-required">*</span></span>
                            <span className="disc-pct-badge">{percentage}%</span>
                        </div>
                        <div className="disc-pct-grid">
                            {PERCENTAGES.map(p => (
                                <button
                                    key={p}
                                    id={`disc-pct-${p}`}
                                    className={`disc-pct-btn${percentage === p ? ' disc-pct-btn--active' : ''}`}
                                    onClick={() => setPercentage(p)}
                                >
                                    {p}%
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        id="disc-create-btn"
                        className="disc-create-btn"
                        onClick={handleCreate}
                    >
                        <Save size={16} /> Create Discount Code
                    </button>
                </div>
            )}

            {/* ── View Tab ── */}
            {activeTab === 'view' && (
                <div className="disc-view-card">
                    {discounts.length === 0 ? (
                        <div className="disc-empty">
                            <Percent size={48} className="disc-empty-icon" />
                            <p>No discount codes created yet.</p>
                            <button
                                className="disc-tab-btn disc-tab-btn--active"
                                onClick={() => setActiveTab('create')}
                            >
                                <Plus size={14} /> Create One Now
                            </button>
                        </div>
                    ) : (
                        <div className="disc-table-wrap">
                            <table className="disc-table">
                                <thead>
                                    <tr className="disc-thead-row">
                                        <th className="disc-th" style={{ width: '50px', textAlign: 'center' }}>Sno</th>
                                        <th className="disc-th">Coupon Code</th>
                                        <th className="disc-th">Category</th>
                                        <th className="disc-th" style={{ textAlign: 'center' }}>Discount %</th>
                                        <th className="disc-th" style={{ textAlign: 'center' }}>Copy</th>
                                        <th className="disc-th" style={{ textAlign: 'center' }}>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {discounts.map((d, idx) => (
                                        <tr key={d.id} className={`disc-tr${idx % 2 !== 0 ? ' disc-tr-alt' : ''}`}>
                                            <td className="disc-td" style={{ textAlign: 'center' }}>{idx + 1}</td>
                                            <td className="disc-td">
                                                <span className="disc-code-chip">{d.coupon}</span>
                                            </td>
                                            <td className="disc-td">{categoryLabel[d.category]}</td>
                                            <td className="disc-td" style={{ textAlign: 'center' }}>
                                                <span className="disc-pct-chip">{d.percentage}%</span>
                                            </td>
                                            <td className="disc-td" style={{ textAlign: 'center' }}>
                                                <button
                                                    className={`disc-icon-btn disc-copy-btn${copied === d.coupon ? ' disc-copied' : ''}`}
                                                    onClick={() => handleCopy(d.coupon)}
                                                    title="Copy Code"
                                                >
                                                    {copied === d.coupon ? <CheckCircle size={15} /> : <Copy size={15} />}
                                                </button>
                                            </td>
                                            <td className="disc-td" style={{ textAlign: 'center' }}>
                                                <button
                                                    className="disc-icon-btn disc-del-btn"
                                                    onClick={() => handleDelete(d.id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
