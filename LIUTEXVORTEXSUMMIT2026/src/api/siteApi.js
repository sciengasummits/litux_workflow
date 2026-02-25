// API service for LIUTEXVORTEXSUMMIT2026 website
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
