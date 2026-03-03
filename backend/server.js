import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import crypto from 'crypto';
import Razorpay from 'razorpay';
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
import Discount from './models/Discount.js';
import OTP from './models/OTP.js';
import { RealEmailSender } from './emailSender.js';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow any localhost origin (any port) or no origin (curl/Postman)
//         if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('CORS: Not allowed - ' + origin));
//         }
//     },
//     credentials: true
// }));
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);

        // Allow all localhost origins (any port)
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
            return callback(null, true);
        }

        // Allow ALL Vercel deployments (any subdomain) — covers all conference websites
        if (/^https:\/\/[^.]+\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }

        // Allow ALL Render deployments (any subdomain) — covers the backend itself and previews
        if (/^https:\/\/[^.]+\.onrender\.com$/.test(origin)) {
            return callback(null, true);
        }

        // Allow any custom conference domains (e.g. sciengasummits.com subdomains)
        if (/^https:\/\/[^.]+\.sciengasummits\.com$/.test(origin) || origin === 'https://sciengasummits.com') {
            return callback(null, true);
        }

        // Reject others (but don't throw error)
        callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options("*", cors()); // Handle preflight


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
    // ─── LIUTEX Conference Data ───────────────────────────────────
    const liutexDefaults = [
        {
            key: 'hero',
            data: {
                subtitle: 'INTERNATIONAL CONFERENCE ON',
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
                paragraph1: 'The International Conference on Liutex Theory and Applications in Vortex Identification and Vortex Dynamics is a premier international platform dedicated to advancing the understanding of Liutex theory and its transformative applications in vortex identification and vortex dynamics.',
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
                    { number: '100+', label: 'Events' },
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
        }
    ];

    // ─── FLUID Conference Data ────────────────────────────────────
    const fluidDefaults = [
        {
            key: 'hero',
            data: {
                subtitle: 'INTERNATIONAL CONFERENCE ON',
                title: 'FLUID MECHANICS & TURBOMACHINERY',
                description: 'International Conference on Fluid Mechanics & Turbomachinery, where global experts unite to shape the future of engineering dynamics. Discover ground-breaking innovations in fluid systems, connect with top mechanical engineers, and explore solutions transforming industrial efficiency.',
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
                subtitle: 'Fluid Mechanics & Turbomachinery Engineering',
                title: 'About The Conference',
                paragraph1: 'The International Conference on Fluid Mechanics & Turbomachinery is a premier international platform dedicated to advancing the understanding of fluid dynamics, turbomachinery systems, and their transformative applications in engineering.',
                paragraph2: 'This conference brings together leading researchers, academicians, mechanical engineers, and industry professionals to explore recent developments, innovative technologies, and real-world applications in fluid mechanics and turbomachinery design.',
                objectives: [
                    'Global Collaboration: Facilitate networking among researchers, engineers, and industry leaders',
                    'Innovation Showcase: Highlight cutting-edge research and advanced technologies in turbomachinery',
                    'Bridge Academia & Industry: Create platform for translational research and industrial applications',
                    'Sustainability Focus: Explore energy-efficient solutions and green technologies',
                    'Empower Future Leaders: Provide mentorship and presentation opportunities for students',
                    'Knowledge Dissemination: Publish high-quality findings and foster engineering discussions'
                ],
                keyThemes: [
                    'Computational Fluid Dynamics (CFD): Advanced simulations and turbulence modeling',
                    'Aerodynamics & Hydrodynamics: Flow analysis and propulsion systems',
                    'Turbomachinery Design: Gas turbines, compressors, pumps, and wind turbines',
                    'Heat & Mass Transfer: Thermal management and multiphase flows',
                    'Renewable Energy Systems: Hydropower, tidal energy, and wind energy conversion',
                    'Fluid-Structure Interaction: Vibration analysis and aeroelasticity'
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
                title: 'FLUID MECHANICS & TURBOMACHINERY CONFERENCES APPROACH',
                items: [
                    { number: '15+', label: 'Years Experience' },
                    { number: '100+', label: 'Events' },
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
                    'Computational Fluid Dynamics (CFD)',
                    'Aerodynamics & Hydrodynamics',
                    'Turbomachinery Design & Analysis',
                    'Heat & Mass Transfer',
                    'Renewable Energy Systems',
                    'Fluid-Structure Interaction',
                    'Multiphase Flow Systems',
                    'Combustion & Propulsion',
                    'Flow Control & Optimization',
                    'Experimental Fluid Mechanics',
                    'Turbulence Modeling',
                    'Pump & Compressor Technology',
                    'Wind Energy Aerodynamics',
                    'Marine Propulsion Systems',
                    'Gas Turbine Technology',
                    'Hydraulic Machinery',
                    'Flow Measurement Techniques',
                    'Energy Conversion Systems',
                    'Industrial Fluid Applications',
                    'Sustainable Engineering Solutions'
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
                description: 'A world-class conference venue in the heart of Singapore, offering state-of-the-art facilities for an international engineering conference.',
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
                email: 'info@fluidmechsummit.com',
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
                    'MIT',
                    'Stanford University',
                    'ETH Zurich',
                    'Imperial College London',
                    'Caltech',
                    'University of Cambridge',
                    'National University of Singapore',
                    'Technical University of Munich',
                    'Georgia Institute of Technology',
                    'University of Michigan'
                ]
            }
        }
    ];

    // ─── Seed Data for Both Conferences ──────────────────────────
    const conferences = [
        { name: 'liutex', defaults: liutexDefaults },
        { name: 'fluid', defaults: fluidDefaults }
    ];

    // Keys whose DEFAULT fields should be merged in if missing
    const mergeDefaults = ['hero', 'about'];

    for (const { name: confName, defaults } of conferences) {
        for (const item of defaults) {
            if (mergeDefaults.includes(item.key)) {
                // Build a $set that only fills in missing fields using dot-notation
                const existing = await SiteContent.findOne({ conference: confName, key: item.key });
                if (!existing) {
                    await SiteContent.create({ conference: confName, key: item.key, data: item.data });
                } else {
                    // Only fill in fields that are undefined/null/missing in the stored data
                    const patch = {};
                    for (const [field, value] of Object.entries(item.data)) {
                        if (existing.data[field] === undefined || existing.data[field] === null || existing.data[field] === '') {
                            patch[`data.${field}`] = value;
                        }
                    }
                    if (Object.keys(patch).length > 0) {
                        await SiteContent.updateOne({ conference: confName, key: item.key }, { $set: patch });
                        console.log(`🔧 Patched missing fields for '${confName}.${item.key}':`, Object.keys(patch));
                    }
                }
            } else {
                // Insert-only: don't overwrite user edits for other sections
                await SiteContent.findOneAndUpdate(
                    { conference: confName, key: item.key },
                    { $setOnInsert: { conference: confName, key: item.key, data: item.data } },
                    { upsert: true, new: true }
                );
            }
        }
        console.log(`✅ Default data seeded (${confName})`);
    }
}

// ─── ROUTES ──────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'LIUTEX Dashboard API running' });
});

// ── SMTP Diagnostic Test (GET /api/test-email?to=your@email.com) ─────────────
app.get('/api/test-email', async (req, res) => {
    const to = req.query.to || process.env.LIUTEX_EMAIL || 'liutex@sciengasummits.com';
    const smtpConfig = {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || '587',
        user: process.env.SMTP_USER || '(not set)',
        passSet: !!(process.env.SMTP_PASS),
        passLength: (process.env.SMTP_PASS || '').trim().replace(/\s/g, '').length,
    };
    console.log(`🧪 TEST EMAIL REQUEST → sending to: ${to}`);
    console.log(`🧪 SMTP CONFIG:`, smtpConfig);
    try {
        const result = await realEmailSender.sendEmail(
            to,
            '✅ SMTP Test - Conference Dashboard',
            `<div style="font-family:Arial;padding:20px;"><h2>SMTP Test Successful!</h2><p>Your email configuration is working correctly on Render.</p><p><strong>SMTP:</strong> ${smtpConfig.host}:${smtpConfig.port}</p><p><strong>User:</strong> ${smtpConfig.user}</p></div>`,
            'TEST'
        );
        res.json({ success: result.success, smtpConfig, result, sentTo: to });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message, smtpConfig, sentTo: to });
    }
});

// ── Authentication
// Supported conference accounts with email mapping
const CONFERENCE_ACCOUNTS = [
    {
        username: 'LIUTEXSUMMIT2026',
        email: process.env.LIUTEX_EMAIL || 'liutex@sciengasummits.com',
        conferenceId: 'liutex',
        displayName: 'LIUTEX SUMMIT 2026',
    },
    {
        username: 'FOODAGRISUMMIT2026',
        email: process.env.FOODAGRI_EMAIL || 'foodagri@sciengasummits.com',
        conferenceId: 'foodagri',
        displayName: 'FOOD AGRI SUMMIT 2026',
    },
    {
        username: 'FLUIDMECHSUMMIT2026',
        email: process.env.FLUID_EMAIL || 'fluid@sciengasummits.com',
        conferenceId: 'fluid',
        displayName: 'FLUID MECHANICS & TURBOMACHINERY 2026',
    },
];

const realEmailSender = new RealEmailSender();

// Real email service with fallback
const sendRealEmail = async (to, subject, htmlContent, otp) => {
    try {
        console.log(`📧 ATTEMPTING EMAIL SEND TO: ${to}`);
        console.log(`📧 OTP: ${otp}`);

        // Set a timeout for email sending to prevent hanging
        const emailPromise = realEmailSender.sendEmail(to, subject, htmlContent, otp);
        const timeoutPromise = new Promise((resolve) => {
            setTimeout(() => {
                console.log(`⏰ EMAIL SENDING TIMEOUT - PROCEEDING WITH OTP`);
                resolve({ success: false, error: 'Email timeout' });
            }, 25000); // 25 second timeout (nodemailer needs time on cloud platforms)
        });

        const result = await Promise.race([emailPromise, timeoutPromise]);

        if (result.success) {
            console.log(`✅ EMAIL SENT SUCCESSFULLY TO: ${to}`);
        } else {
            console.log(`⚠️ EMAIL FAILED, BUT OTP IS STILL VALID: ${otp}`);
            console.log(`📧 ERROR: ${result.error}`);
            console.log(`📧 USER CAN STILL LOGIN WITH OTP: ${otp}`);
        }

        // Always return success so OTP generation continues
        return { success: true, messageId: `otp-${Date.now()}`, otp: otp };

    } catch (error) {
        console.error(`❌ EMAIL ERROR (NON-BLOCKING):`, error.message);
        console.log(`📧 OTP IS STILL VALID: ${otp}`);
        // Return success even if email fails
        return { success: true, messageId: `fallback-${Date.now()}`, otp: otp };
    }
};

// Simple email service using fetch (alternative to nodemailer)
const sendEmailViaAPI = async (to, subject, htmlContent, otp) => {
    return await sendRealEmail(to, subject, htmlContent, otp);
};

// Simple OTP generation function
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, username) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Conference Management System</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">LIUTEX SUMMIT 2026</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
                <h2 style="color: #1e293b; margin: 0 0 20px 0;">Your Login OTP</h2>
                <p style="color: #64748b; margin: 0 0 20px 0;">
                    Hello! You've requested to login to the Conference Management System with username: <strong>${username}</strong>
                </p>
                
                <div style="background: white; border: 2px solid #6366f1; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                    <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">Your 4-digit OTP is:</p>
                    <div style="font-size: 32px; font-weight: bold; color: #6366f1; letter-spacing: 8px; font-family: monospace;">${otp}</div>
                </div>
                
                <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
                    <p style="color: #92400e; margin: 0; font-size: 14px;">
                        <strong>⚠️ Important:</strong> This OTP is valid for <strong>10 minutes</strong> only. 
                        Do not share this code with anyone.
                    </p>
                </div>
                
                <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
                    If you didn't request this OTP, please ignore this email or contact support.
                </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 20px;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                    © 2026 LIUTEX SUMMIT. All rights reserved.
                </p>
            </div>
        </div>
    `;

    return await sendEmailViaAPI(email, 'Your Login OTP - Conference Management System', htmlContent, otp);
};

// Generate and send OTP
app.post('/api/auth/generate-otp', async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ success: false, message: 'Username is required.' });
        }

        // Find the account
        const account = CONFERENCE_ACCOUNTS.find(acc => acc.username.toLowerCase() === username.toLowerCase());
        if (!account) {
            return res.status(401).json({ success: false, message: 'Username not found. Please check and try again.' });
        }

        // Generate new OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Save OTP to database (remove any existing OTPs for this username)
        await OTP.deleteMany({ username: account.username });
        await OTP.create({
            username: account.username,
            otp: otp,
            email: account.email,
            expiresAt: expiresAt,
            used: false
        });

        // Send response immediately, then send email in background
        res.json({
            success: true,
            message: `OTP sent to ${account.email}`,
            email: account.email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Mask email for security
            // For testing purposes, include the OTP in response (remove in production)
            testOTP: otp
        });

        // Send OTP email in background (non-blocking)
        sendOTPEmail(account.email, otp, account.username).then(emailResult => {
            if (emailResult.success) {
                console.log(`✅ EMAIL SENT SUCCESSFULLY TO: ${account.email} with OTP: ${otp}`);
            } else {
                console.log(`⚠️ EMAIL FAILED, BUT OTP IS STILL VALID: ${otp}`);
                console.log(`📧 ERROR: ${emailResult.error}`);
            }
        }).catch(error => {
            console.error(`❌ EMAIL ERROR (NON-BLOCKING):`, error.message);
            console.log(`📧 OTP IS STILL VALID: ${otp}`);
        });

    } catch (error) {
        console.error('Generate OTP error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
});

// Verify OTP and login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, otp } = req.body;

        if (!username || !otp) {
            return res.status(400).json({ success: false, message: 'Username and OTP are required.' });
        }

        // Find the account
        const account = CONFERENCE_ACCOUNTS.find(acc => acc.username.toLowerCase() === username.toLowerCase());
        if (!account) {
            return res.status(401).json({ success: false, message: 'Username not found. Please check and try again.' });
        }

        // Check if this is a dummy OTP request (from frontend to validate username)
        if (otp === '____') {
            return res.status(401).json({ success: false, message: 'Invalid OTP. Please try again.' });
        }

        // Find valid OTP in database
        const otpRecord = await OTP.findOne({
            username: account.username,
            otp: otp,
            used: false,
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(401).json({ success: false, message: 'Invalid or expired OTP. Please try again.' });
        }

        // Mark OTP as used
        otpRecord.used = true;
        await otpRecord.save();

        // Successful login
        res.json({
            success: true,
            message: 'Login successful.',
            username: account.username,
            conferenceId: account.conferenceId,
            displayName: account.displayName,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
});

// Helper: build a fully-qualified URL for an uploaded file that works in both dev and production
function buildFileUrl(req, filename) {
    // In production on Render the server is behind HTTPS — use the request's host
    const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
    return `${proto}://${host}/uploads/${filename}`;
}

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
        const url = buildFileUrl(req, req.file.filename);
        res.json({ url, filename: req.file.filename });
    });
});

// Upload document — PDF / DOC / DOCX / ZIP (for abstract submissions)
app.post('/api/upload-file', uploadFile.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = buildFileUrl(req, req.file.filename);
    res.json({ url, filename: req.file.filename, originalName: req.file.originalname });
});

// ── Site Content (Hero, About, Stats, Pricing, Sessions, Venue, etc.)
// ?conference=liutex|foodagri  (defaults to 'liutex' if omitted)
app.get('/api/content', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';
        const all = await SiteContent.find({ conference: conf });
        const result = {};
        all.forEach(item => { result[item.key] = item.data; });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/content/:key', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';
        const item = await SiteContent.findOne({ conference: conf, key: req.params.key });
        if (!item) return res.status(404).json({ error: 'Content not found' });
        res.json(item.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/content/:key', async (req, res) => {
    try {
        const { conference: conf = 'liutex', ...bodyData } = req.body;
        // Build a dot-notation patch so partial saves from the dashboard
        // never wipe fields that weren't included in this request
        const patch = {};
        for (const [field, value] of Object.entries(bodyData)) {
            patch[`data.${field}`] = value;
        }
        const result = await SiteContent.findOneAndUpdate(
            { conference: conf, key: req.params.key },
            { $set: { ...patch, conference: conf } },
            { upsert: true, new: true }
        );
        res.json({ success: true, data: result.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Speakers
// ?conference=liutex|foodagri  (defaults to 'liutex')
app.get('/api/speakers', async (req, res) => {
    try {
        const { category, conference: conf = 'liutex' } = req.query;
        const filter = { visible: true, conference: conf };
        if (category) filter.category = category;
        const speakers = await Speaker.find(filter).sort({ order: 1, createdAt: 1 });
        res.json(speakers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/speakers/all', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';
        const speakers = await Speaker.find({ conference: conf }).sort({ order: 1, createdAt: 1 });
        res.json(speakers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/speakers', async (req, res) => {
    try {
        const speaker = new Speaker(req.body); // conference comes from body
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
// ?conference=liutex|foodagri  (defaults to 'liutex')
app.get('/api/sponsors', async (req, res) => {
    try {
        const { type, conference: conf = 'liutex' } = req.query;
        const filter = { visible: true, conference: conf };
        if (type) filter.type = type;
        const sponsors = await Sponsor.find(filter).sort({ order: 1 });
        res.json(sponsors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/sponsors/all', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';
        const sponsors = await Sponsor.find({ conference: conf }).sort({ order: 1 });
        res.json(sponsors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sponsors', async (req, res) => {
    try {
        const sponsor = new Sponsor(req.body); // conference comes from body
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
// PUBLIC — website abstract form submits here (conference in body)
app.post('/api/abstracts', async (req, res) => {
    try {
        const abs = new Abstract(req.body); // conference comes from body
        await abs.save();
        res.status(201).json(abs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — dashboard reads all abstracts for a conference
// ?conference=liutex|foodagri  (defaults to 'liutex')
app.get('/api/abstracts', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';
        const abstracts = await Abstract.find({ conference: conf }).sort({ createdAt: -1 });
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
// PUBLIC — website form submits here (conference in body)
app.post('/api/registrations', async (req, res) => {
    try {
        const reg = new Registration(req.body); // conference comes from body
        await reg.save();
        res.status(201).json(reg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — dashboard reads registrations for a conference
// ?conference=liutex|foodagri  (defaults to 'liutex')
app.get('/api/registrations', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';
        const regs = await Registration.find({ conference: conf }).sort({ createdAt: -1 });
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

// ──────────────────────────────────────────────────────────────
// ─── Discounts (Admin CRUD + Public Validate) ─────────────────
// ──────────────────────────────────────────────────────────────

// ADMIN — create a discount code
app.post('/api/discounts', async (req, res) => {
    try {
        const { conference = 'liutex', coupon, category, percentage } = req.body;
        if (!coupon || !percentage) {
            return res.status(400).json({ error: 'coupon and percentage are required' });
        }
        const discount = await Discount.findOneAndUpdate(
            { conference, coupon: coupon.trim().toUpperCase() },
            { conference, coupon: coupon.trim().toUpperCase(), category: category || 'registration', percentage, active: true },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(201).json(discount);
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Coupon code already exists for this conference.' });
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — list all discount codes for a conference
// ?conference=liutex|foodagri  (defaults to 'liutex')
app.get('/api/discounts', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';
        const discounts = await Discount.find({ conference: conf }).sort({ createdAt: -1 });
        res.json(discounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — delete a discount
app.delete('/api/discounts/:id', async (req, res) => {
    try {
        await Discount.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUBLIC — validate a discount code (used by the website registration form)
// POST /api/discounts/validate  { conference, coupon }
// Returns: { valid: true, percentage, category, coupon } or { valid: false, message }
app.post('/api/discounts/validate', async (req, res) => {
    try {
        const { conference = 'liutex', coupon } = req.body;
        if (!coupon) return res.json({ valid: false, message: 'No coupon provided.' });
        const discount = await Discount.findOne({
            conference,
            coupon: coupon.trim().toUpperCase(),
            active: true,
        });
        if (!discount) return res.json({ valid: false, message: 'Invalid or expired discount code.' });
        res.json({
            valid: true,
            percentage: discount.percentage,
            category: discount.category,
            coupon: discount.coupon,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN — get dashboard statistics for a conference
// GET /api/stats?conference=liutex|foodagri|fluid (defaults to 'liutex')
// Returns: { abstracts, registrations, speakers: { total, committee, plenary, keynote, featured, invited, poster, student, delegate }, sessions }
app.get('/api/stats', async (req, res) => {
    try {
        const conf = req.query.conference || 'liutex';

        // Count abstracts
        const abstractsCount = await Abstract.countDocuments({ conference: conf });

        // Count registrations
        const registrationsCount = await Registration.countDocuments({ conference: conf });

        // Count speakers by category
        const allSpeakers = await Speaker.find({ conference: conf });
        const speakerStats = {
            total: allSpeakers.length,
            committee: allSpeakers.filter(s => s.category === 'Committee').length,
            plenary: allSpeakers.filter(s => s.category === 'Plenary').length,
            keynote: allSpeakers.filter(s => s.category === 'Keynote').length,
            featured: allSpeakers.filter(s => s.category === 'Featured').length,
            invited: allSpeakers.filter(s => s.category === 'Invited').length,
            poster: allSpeakers.filter(s => s.category === 'Poster Presenter').length,
            student: allSpeakers.filter(s => s.category === 'Student').length,
            delegate: allSpeakers.filter(s => s.category === 'Delegate').length,
        };

        // Get sessions count from site content
        let sessionsCount = 0;
        try {
            const sessionsContent = await SiteContent.findOne({
                conference: conf,
                key: 'sessions'
            });
            if (sessionsContent && sessionsContent.data && sessionsContent.data.sessions) {
                sessionsCount = sessionsContent.data.sessions.length;
            }
        } catch (err) {
            console.warn('Could not fetch sessions count:', err.message);
        }

        // Scientific programme count (could be based on sessions or a separate collection)
        const scientificProgrammeCount = sessionsCount; // For now, use sessions count

        res.json({
            abstracts: abstractsCount,
            registrations: registrationsCount,
            scientificProgramme: scientificProgrammeCount,
            speakers: speakerStats,
            sessions: sessionsCount,
        });
    } catch (err) {
        console.error('Stats API error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ──────────────────────────────────────────────────────────────
// ─── Razorpay Payment Gateway ─────────────────────────────────
// ──────────────────────────────────────────────────────────────

// Initialize Razorpay instance (only if keys are configured)
let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    && process.env.RAZORPAY_KEY_ID !== 'rzp_test_YOUR_KEY_ID') {
    razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log('💳 Razorpay payment gateway initialized');
} else {
    console.warn('⚠️  Razorpay keys not configured — payment routes will return errors. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env');
}

// GET /api/payment/key — returns the Razorpay public key (safe to expose to frontend)
app.get('/api/payment/key', (req, res) => {
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'rzp_test_YOUR_KEY_ID') {
        return res.status(503).json({ error: 'Razorpay is not configured. Please set RAZORPAY_KEY_ID in .env' });
    }
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// POST /api/payment/create-order — creates a Razorpay order
// Body: { amount (in USD), currency?, registrationId?, conference, description }
// Returns: { success, order: { id, amount, currency, ... } }
app.post('/api/payment/create-order', async (req, res) => {
    try {
        if (!razorpayInstance) {
            return res.status(503).json({ success: false, error: 'Razorpay is not configured on the server.' });
        }

        const { amount, currency = 'USD', registrationId, conference = 'liutex', description = 'Conference Registration' } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, error: 'Invalid amount. Must be greater than 0.' });
        }

        // Razorpay expects amount in smallest currency unit (cents for USD, paise for INR)
        const amountInSmallestUnit = Math.round(amount * 100);

        const options = {
            amount: amountInSmallestUnit,
            currency: currency.toUpperCase(),
            receipt: `rcpt_${conference}_${Date.now()}`,
            notes: {
                conference,
                registrationId: registrationId || '',
                description,
            },
        };

        const order = await razorpayInstance.orders.create(options);
        console.log(`💳 Razorpay order created: ${order.id} for $${amount} (${conference})`);

        res.json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
            },
        });
    } catch (err) {
        console.error('❌ Razorpay create-order error:', err.message);
        res.status(500).json({ success: false, error: err.message || 'Failed to create payment order.' });
    }
});

// POST /api/payment/verify — verifies the Razorpay payment signature
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId? }
// Returns: { success, message, paymentId }
app.post('/api/payment/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Missing payment verification parameters.' });
        }

        // Verify signature using HMAC SHA256
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            console.warn(`⚠️ Payment signature verification FAILED for order ${razorpay_order_id}`);
            return res.status(400).json({ success: false, message: 'Payment verification failed. Invalid signature.' });
        }

        console.log(`✅ Payment verified: ${razorpay_payment_id} for order ${razorpay_order_id}`);

        // If a registrationId was provided, update the registration status and txnId
        if (registrationId) {
            try {
                await Registration.findByIdAndUpdate(registrationId, {
                    status: 'Paid',
                    txnId: razorpay_payment_id,
                });
                console.log(`✅ Registration ${registrationId} marked as Paid (txn: ${razorpay_payment_id})`);
            } catch (dbErr) {
                console.warn(`⚠️ Payment verified but failed to update registration: ${dbErr.message}`);
            }
        }

        res.json({
            success: true,
            message: 'Payment verified successfully.',
            paymentId: razorpay_payment_id,
        });
    } catch (err) {
        console.error('❌ Payment verification error:', err.message);
        res.status(500).json({ success: false, message: 'Payment verification failed.' });
    }
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
