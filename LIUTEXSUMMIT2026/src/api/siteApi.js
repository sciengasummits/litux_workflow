// API service for LIUTEXSUMMIT2026 website
// Fetches live data from the dashboard backend (port 5000)


const BASE_URL = 'http://localhost:5000/api';

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
export const fetchContent = (key) => get(`/content/${key}`);

// Get all content blocks at once
export const fetchAllContent = () => get('/content');

// Speakers — uses public endpoint (visible only, sorted by order)
export const fetchSpeakers = (category) =>
    get(`/speakers${category ? `?category=${encodeURIComponent(category)}` : ''}`);

// Sponsors/Media partners — uses public endpoint (visible only)
export const fetchSponsors = (type) =>
    get(`/sponsors${type ? `?type=${encodeURIComponent(type)}` : ''}`);

// Submit an abstract — always tags conference: 'liutex'
export async function submitAbstract(payload) {
    const res = await fetch(`${BASE_URL}/abstracts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'liutex' }),
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

// Submit registration — always tags conference: 'liutex'
export async function submitRegistration(payload) {
    const res = await fetch(`${BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'liutex' }),
    });
    if (!res.ok) throw new Error('Server error');
    return res.json();
}
