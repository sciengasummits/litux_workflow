// Central API service for all dashboard <-> backend communication
const BASE_URL = 'http://localhost:5000/api';

async function request(method, endpoint, body = null) {
    const opts = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${BASE_URL}${endpoint}`, opts);
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || 'Request failed');
    }
    return res.json();
}

// ── Generic Content CRUD ──────────────────────────────────────
export const getAllContent = () => request('GET', '/content');
export const getContent = (key) => request('GET', `/content/${key}`);
export const updateContent = (key, data) => request('PUT', `/content/${key}`, data);

// ── Speakers ─────────────────────────────────────────────────
// GET /api/speakers/all → all speakers (admin)
// GET /api/speakers?category=X → visible only (website)
export const getSpeakers = (category) => request('GET', `/speakers/all${category ? `?category=${category}` : ''}`);
export const getSpeakersPublic = (category) => request('GET', `/speakers${category ? `?category=${encodeURIComponent(category)}` : ''}`);
export const createSpeaker = (data) => request('POST', '/speakers', data);
export const updateSpeaker = (id, data) => request('PUT', `/speakers/${id}`, data);
export const deleteSpeaker = (id) => request('DELETE', `/speakers/${id}`);

// ── Sponsors / Media Partners ────────────────────────────────
// GET /api/sponsors/all → all (admin)
// GET /api/sponsors?type=sponsor → visible only (website)
export const getSponsors = (type) => request('GET', `/sponsors/all${type ? `?type=${type}` : ''}`);
export const getSponsorsPublic = (type) => request('GET', `/sponsors${type ? `?type=${encodeURIComponent(type)}` : ''}`);
export const createSponsor = (data) => request('POST', '/sponsors', data);
export const updateSponsor = (id, data) => request('PUT', `/sponsors/${id}`, data);
export const deleteSponsor = (id) => request('DELETE', `/sponsors/${id}`);

// ── Image upload ──────────────────────────────────────────────
export async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${BASE_URL}/upload`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Upload failed');
    return res.json(); // { url, filename }
}
