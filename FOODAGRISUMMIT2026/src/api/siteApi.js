// API service for FOODAGRISUMMIT2026 website
// Fetches live data from the shared dashboard backend (port 5000)

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://backend-phi-ivory-81.vercel.app/api').replace(/\/$/, '');

// ── This must ALWAYS be 'foodagri' for this conference site ──
const CONFERENCE_ID = 'foodagri';

console.log(`[SiteAPI-FoodAgri] Base URL: ${BASE_URL}`);

async function get(endpoint) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        console.log(`[SiteAPI-FoodAgri] GET request to: ${url}`);
        const res = await fetch(url);
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || errorData.message || `Fetch failed: ${res.statusText} (${res.status})`);
        }
        return res.json();
    } catch (e) {
        console.error(`[SiteAPI-FoodAgri] GET ${endpoint} failed:`, e.message);
        throw new Error(`Connection Error: ${e.message} (Is the backend at ${BASE_URL} reachable?)`);
    }
}

// Get a single content block by key (e.g. 'hero', 'about', etc.)
export const fetchContent = (key) =>
    get(`/content/${key}?conference=${CONFERENCE_ID}`);

// Get all content blocks at once
export const fetchAllContent = () =>
    get(`/content?conference=${CONFERENCE_ID}`);

// Speakers — uses public endpoint (visible only, sorted by order)
export const fetchSpeakers = (category) =>
    get(`/speakers?conference=${CONFERENCE_ID}${category ? `&category=${encodeURIComponent(category)}` : ''}`);

// Sponsors/Media partners — uses public endpoint (visible only)
export const fetchSponsors = (type) =>
    get(`/sponsors?conference=${CONFERENCE_ID}${type ? `&type=${encodeURIComponent(type)}` : ''}`);

// Submit abstract — always tags with this conference
export async function submitAbstract(payload) {
    const res = await fetch(`${BASE_URL}/abstracts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: CONFERENCE_ID }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || 'Submission failed');
    }
    return res.json();
}

// Upload an abstract file — returns { url, originalName }
export async function uploadAbstractFile(file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${BASE_URL}/upload-file`, { method: 'POST', body: fd });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || 'Upload failed');
    }
    return res.json();
}

// Submit registration — always tags with this conference
export async function submitRegistration(data) {
    const url = `${BASE_URL}/registrations`;
    try {
        console.log(`[SiteAPI-FoodAgri] POST request to: ${url}`);
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, conference: CONFERENCE_ID }),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || errorData.message || `Submission failed: ${res.statusText} (${res.status})`);
        }
        return res.json();
    } catch (e) {
        console.error('[SiteAPI-FoodAgri] submitRegistration failed:', e.message);
        throw new Error(`Connection Error: ${e.message} (Is the backend at ${BASE_URL} reachable?)`);
    }
}

// Validate a discount coupon code against the backend
// Returns: { valid: true, percentage, category, coupon } | { valid: false, message }
export async function validateDiscountCode(coupon) {
    try {
        const res = await fetch(`${BASE_URL}/discounts/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coupon, conference: CONFERENCE_ID }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return { valid: false, message: err.message || 'Invalid code' };
        }
        return res.json();
    } catch (e) {
        console.error('[SiteAPI-FoodAgri] Discount validate failed:', e.message);
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
        body: JSON.stringify({ ...payload, conference: CONFERENCE_ID }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || 'Failed to create payment order.');
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
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || 'Payment verification failed.');
    }
    return res.json();
}
