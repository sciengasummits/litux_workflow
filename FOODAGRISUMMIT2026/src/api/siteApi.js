// API service for FOODAGRISUMMIT2026 website
// Fetches live data from the shared dashboard backend (port 5000)

const BASE_URL = 'http://localhost:5000/api';

// ── This must ALWAYS be 'foodagri' for this conference site ──
const CONFERENCE_ID = 'foodagri';

async function get(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    } catch (e) {
        console.warn(`[SiteAPI-FoodAgri] Failed to fetch ${endpoint}:`, e.message);
        return null;
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

// Submit registration — always tags with this conference
export async function submitRegistration(data) {
    try {
        const res = await fetch(`${BASE_URL}/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, conference: CONFERENCE_ID }),
        });
        return res.json();
    } catch (e) {
        console.warn('[SiteAPI-FoodAgri] submitRegistration failed:', e.message);
        return { error: e.message };
    }
}
