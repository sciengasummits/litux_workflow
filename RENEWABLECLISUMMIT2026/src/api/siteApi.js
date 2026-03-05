// API service for RENEWABLECLISUMMIT2026 website
// Fetches live data from the dashboard backend (port 5000)

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function get(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    } catch (e) {
        console.warn(`[SiteAPI] Failed to fetch ${endpoint}:`, e.message);
        return null;
    }
}

// Get a single content block by key (e.g. 'hero', 'about', etc.)
export const fetchContent = (key) => get(`/content/${key}?conference=renewable`);

// Get all content blocks at once
export const fetchAllContent = () => get('/content?conference=renewable');

// Speakers — uses public endpoint (visible only, sorted by order)
// Always pass conference=renewable so the backend filters correctly
export const fetchSpeakers = (category) =>
    get(`/speakers?conference=renewable${category ? `&category=${encodeURIComponent(category)}` : ''}`);

// Sponsors/Media partners — uses public endpoint (visible only)
export const fetchSponsors = (type) =>
    get(`/sponsors?conference=renewable${type ? `&type=${encodeURIComponent(type)}` : ''}`);

// Submit an abstract — always tags conference: 'renewable'
export async function submitAbstract(payload) {
    const res = await fetch(`${BASE_URL}/abstracts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'renewable' }),
    });
    if (!res.ok) throw new Error('Server error');
    return res.json();
}

// Upload an abstract file — returns { url, originalName }
export async function uploadAbstractFile(file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${BASE_URL}/upload-file`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
}

// Submit registration — always tags conference: 'renewable'
export async function submitRegistration(payload) {
    const res = await fetch(`${BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'renewable' }),
    });
    if (!res.ok) throw new Error('Server error');
    return res.json();
}

// Validate a discount coupon code against the backend
// Returns: { valid: true, percentage, category, coupon } | { valid: false, message }
export async function validateDiscountCode(coupon) {
    try {
        const res = await fetch(`${BASE_URL}/discounts/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coupon, conference: 'renewable' }),
        });
        if (!res.ok) throw new Error('Server error');
        return res.json();
    } catch (e) {
        console.warn('[SiteAPI] Discount validate failed:', e.message);
        return { valid: false, message: 'Could not reach server. Please try again.' };
    }
}

// ─── Payment APIs ──────────────────────────────────────────────

// Fetch the Razorpay public key
export const fetchPaymentKey = () => get('/payment/key');

// Create a Razorpay order
export async function createPaymentOrder(payload) {
    const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'renewable' }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create payment order.');
    }
    return res.json();
}

// Verify a Razorpay payment signature
export async function verifyPayment(payload) {
    const res = await fetch(`${BASE_URL}/payment/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Payment verification failed.');
    }
    return res.json();
}

