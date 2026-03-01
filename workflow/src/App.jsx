import { useState, useEffect } from 'react';
import Login from './pages/Login';
import { Info } from 'lucide-react';
import { setConference } from './api.js';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatsGrid from './components/StatsGrid';
import ImportantDates from './pages/ImportantDates';
import OrganizingCommittee from './pages/OrganizingCommittee';
import CommitteeSpeakers from './pages/CommitteeSpeakers';
import Speakers from './pages/Speakers';
import PostersSpeakers from './pages/PostersSpeakers';
import StudentsSpeakers from './pages/StudentsSpeakers';
import DelegatesSpeakers from './pages/DelegatesSpeakers';
import PlenarySpeakers from './pages/PlenarySpeakers';
import KeynoteSpeakers from './pages/KeynoteSpeakers';
import FeaturedSpeakers from './pages/FeaturedSpeakers';
import InvitedSpeakers from './pages/InvitedSpeakers';
import MetaTags from './pages/MetaTags';
import UploadPdfs from './pages/UploadPdfs';
import DailyUpdate from './pages/DailyUpdate';
import Sponsors from './pages/Sponsors';
import MediaPartners from './pages/MediaPartners';
import VenueHospitality from './pages/VenueHospitality';
import Accommodation from './pages/Accommodation';
import PreviousGlimpses from './pages/PreviousGlimpses';
import ViewRegistrations from './pages/ViewRegistrations';
import ViewAbstracts from './pages/ViewAbstracts';
import GeneratePaymentLink from './pages/GeneratePaymentLink';
import Discount from './pages/Discount';
import Invoices from './pages/Invoices';
import Receipts from './pages/Receipts';
import WorkReports from './pages/WorkReports';
import Positives from './pages/Positives';
import WebsiteSections from './pages/WebsiteSections';
import Sessions from './pages/Sessions';
import ConferenceSchedule from './pages/ConferenceSchedule';

/* ── Conference config map ── */
const CONFERENCE_CONFIG = {
  liutex: {
    conferenceId: 'liutex',
    displayName: 'LIUTEX VORTEX SUMMIT 2026',
    shortName: 'LIUTEX SUMMIT',
    logoText: 'LV',
    logoSub: 'Summit',
    brandTop: 'LIUTEX',
    brandSub: 'VORTEX SUMMIT',
    footerText: '© Copyright 2026 LIUTEX SUMMIT.',
    accentColor: '#6366f1',   // indigo
    accentGlow: 'rgba(99,102,241,0.35)',
  },
  foodagri: {
    conferenceId: 'foodagri',
    displayName: 'FOOD AGRI SUMMIT 2026',
    shortName: 'FOOD AGRI SUMMIT',
    logoText: 'FA',
    logoSub: 'Summit',
    brandTop: 'FOOD AGRI',
    brandSub: 'SUMMIT 2026',
    footerText: '© Copyright 2026 FOOD AGRI SUMMIT.',
    accentColor: '#16a34a',   // green
    accentGlow: 'rgba(22,163,74,0.35)',
  },
  fluid: {
    conferenceId: 'fluid',
    displayName: 'FLUID MECHANICS & TURBOMACHINERY 2026',
    shortName: 'FLUID SUMMIT',
    logoText: 'FM',
    logoSub: 'Summit',
    brandTop: 'FLUID MECHANICS',
    brandSub: '& TURBOMACHINERY',
    footerText: '© Copyright 2026 FLUID MECHANICS & TURBOMACHINERY SUMMIT.',
    accentColor: '#0891b2',   // cyan-600
    accentGlow: 'rgba(8,145,178,0.35)',
  },
};

/* ── Simple page router ── */
function PageContent({ activeNav, setActiveNav }) {
  switch (activeNav) {
    // Existing mappings
    case 'committee': return <OrganizingCommittee />;
    case 'committee-speakers': return <CommitteeSpeakers />;
    case 'speakers-list': return <Speakers />;
    case 'posters-speakers': return <PostersSpeakers />;
    case 'students-speakers': return <StudentsSpeakers />;
    case 'delegates-speakers': return <DelegatesSpeakers />;
    case 'important-dates': return <ImportantDates />;
    case 'sessions': return <Sessions />;
    case 'conference-schedule': return <ConferenceSchedule />;
    case 'metatags': return <MetaTags />;
    case 'uploadpdf': return <UploadPdfs />;
    case 'dailyupdate': return <DailyUpdate />;
    case 'sponsors': return <Sponsors />;
    case 'mediapartners': return <MediaPartners />;
    case 'venue-hospitality': return <VenueHospitality />;
    case 'accommodation': return <Accommodation />;
    case 'prev-glimpses': return <PreviousGlimpses />;
    case 'view-registrations': return <ViewRegistrations />;
    case 'view-abstracts': return <ViewAbstracts />;
    case 'payment-link': return <GeneratePaymentLink />;
    case 'discount': return <Discount />;
    case 'invoices': return <Invoices />;
    case 'receipts': return <Receipts />;
    case 'work-reports': return <WorkReports />;
    case 'positives': return <Positives />;
    case 'website-sections': return <WebsiteSections />;
    case 'ws-hero': return <WebsiteSections section="hero" />;
    case 'ws-about': return <WebsiteSections section="about" />;
    case 'ws-marquee': return <WebsiteSections section="marquee" />;
    case 'ws-pricing': return <WebsiteSections section="pricing" />;
    case 'ws-partners': return <WebsiteSections section="partners" />;
    
    // Dashboard card navigation mappings
    case 'abstracts': return <ViewAbstracts />;
    case 'registrations': return <ViewRegistrations />;
    case 'scientific': return <Sessions />;
    case 'committee': return <CommitteeSpeakers />;
    case 'speakers-list': return <Speakers />;
    case 'plenary': return <PlenarySpeakers />;
    case 'keynote': return <KeynoteSpeakers />;
    case 'featured': return <FeaturedSpeakers />;
    case 'invited': return <InvitedSpeakers />;
    case 'poster': return <PostersSpeakers />;
    case 'student': return <StudentsSpeakers />;
    case 'delegate': return <DelegatesSpeakers />;
    case 'tracks': return <Sessions />;

    // Dashboard (default)
    default:
      return (
        <>
          <StatsGrid onCardClick={(id) => setActiveNav(id)} />
          <div className="note-banner">
            <Info size={20} className="note-icon" />
            <p>
              <strong>Note:</strong>
              {' Session will be Logged out automatically after '}
              <strong>30 minutes</strong>
              {' of inactivity'}
            </p>
          </div>
        </>
      );
  }
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [session, setSession] = useState(null); // null = not logged in

  const conf = session ? (CONFERENCE_CONFIG[session.conferenceId] || CONFERENCE_CONFIG.liutex) : null;

  // Listen for programmatic nav events fired from within pages
  useEffect(() => {
    const handler = (e) => setActiveNav(e.detail);
    window.addEventListener('nav-to', handler);
    return () => window.removeEventListener('nav-to', handler);
  }, []);

  // Apply accent colour as CSS variable when conference changes
  useEffect(() => {
    if (conf) {
      document.documentElement.style.setProperty('--accent', conf.accentColor);
      document.documentElement.style.setProperty('--accent-glow', conf.accentGlow);
    }
  }, [conf]);

  if (!session) {
    return (
      <Login
        onLogin={(info) => {
          setConference(info.conferenceId); // ← tells api.js which conference to query
          setSession(info);
          setActiveNav('dashboard');
        }}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        activeNav={activeNav}
        onNavClick={setActiveNav}
        conf={conf}
      />

      {/* Main */}
      <div className="main-wrapper">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={() => setCollapsed(c => !c)}
          eventName={conf.displayName}
          username={session.username}
          onLogout={() => { setSession(null); setActiveNav('dashboard'); }}
          conf={conf}
        />

        {/* Page content */}
        <main className="page-content">
          <PageContent activeNav={activeNav} setActiveNav={setActiveNav} />
        </main>

        {/* Footer */}
        <footer className="page-footer">
          <span>{conf.footerText}</span>
        </footer>
      </div>
    </div>
  );
}
