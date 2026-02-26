import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import dns from 'dns';

// ─── Critical Fix: Node.js c-ares DNS fails for mongodb.net on Windows ──────
// c-ares (used by dns.resolve/resolveSrv) cannot reach DNS servers in this network.
// dns.lookup uses the Windows OS resolver which works correctly.
// By passing lookup: dns.lookup in mongoOptions, Mongoose uses the OS resolver.
dns.setDefaultResultOrder('ipv4first');

import { promises as dnsPromises } from 'dns';

import SiteContent from './models/SiteContent.js';
import Speaker from './models/Speaker.js';
import Sponsor from './models/Sponsor.js';
import Registration from './models/Registration.js';
import Abstract from './models/Abstract.js';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
    origin: function (origin, callback) {
        // Allow any localhost origin (any port) or no origin (curl/Postman)
        if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS: Not allowed - ' + origin));
        }
    },
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// ─── Multer Setup ──────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp|svg/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) return cb(null, true);
        cb(new Error('Only image files allowed'));
    }
});

// ─── Multer for document uploads (PDF / DOC / DOCX / ZIP) ──────
const uploadFile = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    fileFilter: (req, file, cb) => {
        const allowedExts = /pdf|doc|docx|zip/;
        const allowedMimes = /pdf|msword|officedocument|zip|octet-stream/;
        const ext = allowedExts.test(path.extname(file.originalname).toLowerCase());
        const mime = allowedMimes.test(file.mimetype);
        if (ext || mime) return cb(null, true);
        cb(new Error('Only PDF, DOC, DOCX, or ZIP files are allowed'));
    }
});

// ─── MongoDB Connect (Atlas M0 resilient) ─────────────────────
const mongoOptions = {
    serverSelectionTimeoutMS: 45000,
    socketTimeoutMS: 60000,
    connectTimeoutMS: 45000,
    heartbeatFrequencyMS: 10000,
    maxPoolSize: 5,
    minPoolSize: 1,
    family: 4,       // Force IPv4
    lookup: dns.lookup, // Use OS DNS resolver (fixes c-ares failures on Windows)
    // bufferCommands: true (Mongoose default) — safely queues ops while Atlas is waking up
};

let isConnected = false;
let retryDelay = 3000;
let connectingNow = false;

async function connectDB() {
    if (connectingNow || mongoose.connection.readyState === 1) return;
    connectingNow = true;
    try {
        console.log('🔌 Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
        isConnected = true;
        retryDelay = 3000;
        console.log('✅ MongoDB Atlas connected');
        seedDefaultData();
    } catch (err) {
        isConnected = false;
        console.error(`❌ MongoDB connect failed: ${err.message}`);
        if (err.message.includes('querySrv') || err.message.includes('ETIMEOUT'))
            console.error('⚠️  DNS/network timeout — Atlas M0 may be waking up, will retry...');
        if (err.message.includes('Authentication'))
            console.error('⚠️  Check MONGODB_URI credentials in .env');
        console.log(`🔄 Retrying in ${retryDelay / 1000}s...`);
        setTimeout(connectDB, retryDelay);
        retryDelay = Math.min(retryDelay * 2, 30000);
    } finally {
        connectingNow = false;
    }
}

connectDB();

// Prevent server crash on buffering timeouts (Atlas M0 slow cold-start)
process.on('uncaughtException', (err) => {
    if (err && err.message && err.message.includes('buffering timed out')) {
        console.warn('⚠️  DB query buffering timed out (Atlas still connecting) — safe to ignore, retrying...');
        return; // Don't exit — Atlas M0 will connect soon
    }
    console.error('💥 Uncaught exception:', err);
    process.exit(1);
});

mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log('🔗 Mongoose connected event');
});

mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('⚠️  MongoDB disconnected — will reconnect in 5s...');
    setTimeout(connectDB, 5000);
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
    // Don't call .close() — it triggers a disconnect → reconnect loop
});

// Keep-alive ping every 30s to prevent Atlas dropping idle connections
setInterval(async () => {
    if (mongoose.connection.readyState === 1) {
        try { await mongoose.connection.db.admin().ping(); }
        catch (e) { console.warn('⚠️  Keep-alive ping failed:', e.message); }
    }
}, 30000);

// ─── Default Data Seed ────────────────────────────────────────
async function seedDefaultData() {
    const defaults = [
        {
            key: 'hero',
            data: {
                subtitle: 'ANNUAL INTERNATIONAL CONFERENCE ON',
                title: 'LIUTEX AND VORTEX\nIDENTIFICATION',
                description: 'International Conference on Liutex and Vortex Identification. where global experts unite to shape the future of fluid mechanics. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
                conferenceDate: 'December 14-16, 2026',
                venue: 'Outram, Singapore',
                countdownTarget: '2026-12-14T09:00:00+01:00',
                showRegister: true,
                showAbstract: true,
                showBrochure: true
            }
        },
        {
            key: 'about',
            data: {
                subtitle: 'Liutex and Vortex Identification and Its Applications',
                title: 'About The Conference',
                paragraph1: 'The Annual International Conference on Liutex Theory and Applications in Vortex Identification and Vortex Dynamics is a premier international platform dedicated to advancing the understanding of Liutex theory and its transformative applications in vortex identification and vortex dynamics.',
                paragraph2: 'This conference brings together leading researchers, academicians, computational scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, numerical methods, and real-world applications of Liutex-based vortex analysis.',
                objectives: [
                    'Promote advancements in Liutex theory',
                    'Explore innovations in vortex identification techniques',
                    'Discuss computational and experimental approaches in vortex dynamics',
                    'Bridge academia and industry in fluid mechanics research',
                    'Encourage collaboration across aerospace, mechanical, civil, and environmental engineering domains'
                ],
                keyThemes: [
                    'Fundamentals of Liutex Theory',
                    'Vortex Identification Methods (Q-criterion, λ2, Ω method, Liutex)',
                    'Turbulence Modeling and Analysis',
                    'Computational Fluid Dynamics (CFD) Applications',
                    'Vortex Dynamics in Aerospace Engineering',
                    'Data-Driven and AI Approaches in Flow Field Identification'
                ]
            }
        },
        {
            key: 'importantDates',
            data: {
                dates: [
                    { month: 'JUN', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                    { month: 'SEP', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                    { month: 'OCT', day: '30', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
                    { month: 'DEC', day: '14', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 14-16, 2026, Singapore' }
                ]
            }
        },
        {
            key: 'stats',
            data: {
                title: 'LIUTEX VORTEX SUMMIT CONFERENCES APPROACH',
                items: [
                    { number: '15+', label: 'Years Experience' },
                    { number: '100+', label: 'Annual Events' },
                    { number: '200+', label: 'Onsite Approach' },
                    { number: '2000+', label: 'Speakers' },
                    { number: '5000+', label: 'Attendees' },
                    { number: '20+', label: 'Exhibitors' },
                    { number: '150+', label: 'Countries' },
                    { number: '2000+', label: 'Publications' }
                ]
            }
        },
        {
            key: 'pricing',
            data: {
                title: 'REGISTRATION PRICING',
                packages: [
                    {
                        title: 'Speaker',
                        price: '799',
                        currency: 'USD',
                        features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Delegate',
                        price: '899',
                        currency: 'USD',
                        features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Student',
                        price: '499',
                        currency: 'USD',
                        features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    }
                ]
            }
        },
        {
            key: 'sessions',
            data: {
                sessions: [
                    'Fundamentals of Liutex Theory',
                    'Vortex Identification Methods (Q-criterion, λ2, Ω, Liutex)',
                    'Turbulence Modeling and Analysis',
                    'CFD Applications in Vortex Dynamics',
                    'Vortex Dynamics in Aerospace Engineering',
                    'AI & Data-Driven Flow Field Identification',
                    'Experimental Methods in Vortex Research',
                    'Liutex Applications in Ocean Engineering',
                    'DNS and LES of Turbulent Flows',
                    'Instability and Transition in Fluid Flows',
                    'Boundary Layer Vortex Structures',
                    'Coherent Structures in Turbulence',
                    'Multi-Scale Vortex Interactions',
                    'Particle Tracking in Vortical Flows',
                    'Wake Dynamics and Control',
                    'Biofluid Mechanics and Vortex Patterns',
                    'Vortex-Induced Vibrations',
                    'Flow Visualization Techniques',
                    'Machine Learning for Fluid Mechanics',
                    'Green Energy & Vortex Dynamics'
                ],
                schedule: {
                    day1: [
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
                        { time: '17.30 – 18.30', program: 'Workshop' }
                    ],
                    day2: [
                        { time: '9.00 – 10.30', program: 'Scientific Sessions' },
                        { time: '10.30 – 10.50', program: 'Tea/Coffee Break' },
                        { time: '10.50 – 13.00', program: 'Poster Presentations' },
                        { time: '13.00 – 14.00', program: 'Lunch' },
                        { time: '14.00 – 15.30', program: 'Panel Discussions' },
                        { time: '15.30 – 16.00', program: 'Award Ceremony & Closing' }
                    ],
                    day3: [
                        { time: '9.00 – 10.30', program: 'Networking Session' },
                        { time: '10.30 – 11.00', program: 'Tea/Coffee Break' },
                        { time: '11.00 – 12.30', program: 'Future Trends Workshop' },
                        { time: '12.30 – 13.30', program: 'Lunch' },
                        { time: '13.30 – 15.00', program: 'Final Remarks & Departure' }
                    ]
                }
            }
        },
        {
            key: 'venue',
            data: {
                title: 'Conference Venue',
                name: 'Outram, Singapore',
                address: 'Singapore',
                description: 'A world-class conference venue in the heart of Singapore, offering state-of-the-art facilities for an international academic conference.',
                images: [
                    'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
                    'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80',
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80'
                ]
            }
        },
        {
            key: 'contact',
            data: {
                email: 'info@liutexvortexsummit.com',
                phone: '+65 0000 0000',
                address: 'Singapore',
                socialLinks: {
                    facebook: '',
                    twitter: '',
                    linkedin: '',
                    instagram: ''
                }
            }
        },
        {
            key: 'marquee',
            data: {
                title: 'Supporting Universities & Institutions',
                items: [
                    'University of Texas at Arlington',
                    'Peking University',
                    'Tsinghua University',
                    'National University of Singapore',
                    'MIT',
                    'Stanford University',
                    'ETH Zurich',
                    'Imperial College London',
                    'Caltech',
                    'University of Cambridge'
                ]
            }
        },
        {
            key: 'sessions',
            data: {
                schedule: {
                    day1: [
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
                    day2: [
                        { time: '9.00 – 10.30', program: 'Scientific Sessions' },
                        { time: '10.30 – 10.50', program: 'Tea/Coffee Break' },
                        { time: '10.50 – 13.00', program: 'Poster Presentations' },
                        { time: '13.00 – 14.00', program: 'Lunch' },
                        { time: '14.00 – 15.30', program: 'Panel Discussions' },
                        { time: '15.30 – 16.00', program: 'Award Ceremony & Closing' },
                    ],
                    day3: [
                        { time: '9.00 – 10.30', program: 'Networking Session' },
                        { time: '10.30 – 11.00', program: 'Tea/Coffee Break' },
                        { time: '11.00 – 12.30', program: 'Future Trends Workshop' },
                        { time: '12.30 – 13.30', program: 'Lunch' },
                        { time: '13.30 – 15.00', program: 'Final Remarks & Departure' },
                    ]
                },
                sessions: [
                    'Fundamentals of Liutex Theory',
                    'Vortex Identification Methods (Q-criterion, λ2, Ω, Liutex)',
                    'Turbulence Modeling and Analysis',
                    'CFD Applications in Vortex Dynamics',
                    'Vortex Dynamics in Aerospace Engineering',
                    'AI & Data-Driven Flow Field Identification',
                    'Experimental Methods in Vortex Research',
                    'Liutex Applications in Ocean Engineering',
                    'DNS and LES of Turbulent Flows',
                    'Instability and Transition in Fluid Flows',
                ]
            }
        }
    ];

    // Keys whose DEFAULT fields should be merged in if missing
    // (restores fields like subtitle/title that got wiped, without overwriting user edits)
    const mergeDefaults = ['hero', 'about'];

    for (const item of defaults) {
        if (mergeDefaults.includes(item.key)) {
            // Build a $set that only fills in missing fields using dot-notation
            const setOnMissing = {};
            for (const [field, value] of Object.entries(item.data)) {
                setOnMissing[`data.${field}`] = value;
            }
            // Use findOneAndUpdate with $set but only if field doesn't exist yet
            // Strategy: upsert inserts full doc, existing doc gets missing fields via aggregation pipeline
            const existing = await SiteContent.findOne({ key: item.key });
            if (!existing) {
                await SiteContent.create({ key: item.key, data: item.data });
            } else {
                // Only fill in fields that are undefined/null/missing in the stored data
                const patch = {};
                for (const [field, value] of Object.entries(item.data)) {
                    if (existing.data[field] === undefined || existing.data[field] === null || existing.data[field] === '') {
                        patch[`data.${field}`] = value;
                    }
                }
                if (Object.keys(patch).length > 0) {
                    await SiteContent.updateOne({ key: item.key }, { $set: patch });
                    console.log(`🔧 Patched missing fields for '${item.key}':`, Object.keys(patch));
                }
            }
        } else {
            // Insert-only: don't overwrite user edits for other sections
            await SiteContent.findOneAndUpdate(
                { key: item.key },
                { $setOnInsert: { key: item.key, data: item.data } },
                { upsert: true, new: true }
            );
        }
    }
    console.log('✅ Default data seeded');
}

// ─── ROUTES ──────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'LIUTEX Dashboard API running' });
});

// ── Authentication
app.post('/api/auth/login', (req, res) => {
    const { username, otp } = req.body;
    const validUsername = process.env.AUTH_USERNAME;
    const validOtp = process.env.AUTH_OTP;

    if (!username || !otp) {
        return res.status(400).json({ success: false, message: 'Username and OTP are required.' });
    }
    if (username !== validUsername) {
        return res.status(401).json({ success: false, message: 'Username not found. Please check and try again.' });
    }
    if (otp !== validOtp) {
        return res.status(401).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }
    return res.json({ success: true, message: 'Login successful.' });
});

// Upload image (images only)
app.post('/api/upload', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Handle multer-specific errors (file too large, wrong type, etc.)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ error: 'File too large. Maximum size is 25MB.' });
            }
            return res.status(400).json({ error: err.message || 'Upload failed' });
        }
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
        res.json({ url, filename: req.file.filename });
    });
});

// Upload document — PDF / DOC / DOCX / ZIP (for abstract submissions)
app.post('/api/upload-file', uploadFile.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.filename, originalName: req.file.originalname });
});

// ── Site Content (Hero, About, Stats, Pricing, Sessions, Venue, etc.)
app.get('/api/content', async (req, res) => {
    try {
        const all = await SiteContent.find({});
        const result = {};
        all.forEach(item => { result[item.key] = item.data; });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/content/:key', async (req, res) => {
    try {
        const item = await SiteContent.findOne({ key: req.params.key });
        if (!item) return res.status(404).json({ error: 'Content not found' });
        res.json(item.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/content/:key', async (req, res) => {
    try {
        // Build a dot-notation patch so partial saves from the dashboard
        // never wipe fields that weren't included in this request
        const patch = {};
        for (const [field, value] of Object.entries(req.body)) {
            patch[`data.${field}`] = value;
        }
        const result = await SiteContent.findOneAndUpdate(
            { key: req.params.key },
            { $set: patch },
            { upsert: true, new: true }
        );
        res.json({ success: true, data: result.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Speakers
app.get('/api/speakers', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { visible: true };
        if (category) filter.category = category;
        const speakers = await Speaker.find(filter).sort({ order: 1, createdAt: 1 });
        res.json(speakers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/speakers/all', async (req, res) => {
    try {
        const speakers = await Speaker.find({}).sort({ order: 1, createdAt: 1 });
        res.json(speakers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/speakers', async (req, res) => {
    try {
        const speaker = new Speaker(req.body);
        await speaker.save();
        res.status(201).json(speaker);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/speakers/:id', async (req, res) => {
    try {
        const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!speaker) return res.status(404).json({ error: 'Speaker not found' });
        res.json(speaker);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/speakers/:id', async (req, res) => {
    try {
        await Speaker.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Sponsors / Media Partners
app.get('/api/sponsors', async (req, res) => {
    try {
        const { type } = req.query;
        const filter = { visible: true };
        if (type) filter.type = type;
        const sponsors = await Sponsor.find(filter).sort({ order: 1 });
        res.json(sponsors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/sponsors/all', async (req, res) => {
    try {
        const sponsors = await Sponsor.find({}).sort({ order: 1 });
        res.json(sponsors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sponsors', async (req, res) => {
    try {
        const sponsor = new Sponsor(req.body);
        await sponsor.save();
        res.status(201).json(sponsor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/sponsors/:id', async (req, res) => {
    try {
        const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sponsor) return res.status(404).json({ error: 'Sponsor not found' });
        res.json(sponsor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/sponsors/:id', async (req, res) => {
    try {
        await Sponsor.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ─── Abstracts ────────────────────────────────────────────────
// PUBLIC — website abstract form submits here
app.post('/api/abstracts', async (req, res) => {
    try {
        const abs = new Abstract(req.body);
        await abs.save();
        res.status(201).json(abs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — dashboard reads all abstracts
app.get('/api/abstracts', async (req, res) => {
    try {
        const abstracts = await Abstract.find().sort({ createdAt: -1 });
        res.json(abstracts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — update status from dashboard
app.patch('/api/abstracts/:id', async (req, res) => {
    try {
        const abs = await Abstract.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!abs) return res.status(404).json({ error: 'Not found' });
        res.json(abs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── Registrations ────────────────────────────────────────────
// PUBLIC — website form submits here (no auth required)
app.post('/api/registrations', async (req, res) => {
    try {
        const reg = new Registration(req.body);
        await reg.save();
        res.status(201).json(reg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — dashboard reads all registrations
app.get('/api/registrations', async (req, res) => {
    try {
        const regs = await Registration.find().sort({ createdAt: -1 });
        res.json(regs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — update status / txnId from dashboard
app.patch('/api/registrations/:id', async (req, res) => {
    try {
        const reg = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reg) return res.status(404).json({ error: 'Not found' });
        res.json(reg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
