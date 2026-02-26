import { useState, useEffect } from 'react';
import Login from './pages/Login';
import { Info } from 'lucide-react';
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

const VALID_USERNAME = 'LIUTEXSUMMIT2026';
const VALID_OTP = '1234';

/* ── Simple page router ── */
function PageContent({ activeNav, setActiveNav }) {
  switch (activeNav) {
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Listen for programmatic nav events fired from within pages
  useEffect(() => {
    const handler = (e) => setActiveNav(e.detail);
    window.addEventListener('nav-to', handler);
    return () => window.removeEventListener('nav-to', handler);
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} validUsername={VALID_USERNAME} validOtp={VALID_OTP} />;
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        activeNav={activeNav}
        onNavClick={setActiveNav}
      />

      {/* Main */}
      <div className="main-wrapper">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={() => setCollapsed(c => !c)}
          eventName="LIUTEXSUMMIT2026"
          username={VALID_USERNAME}
          onLogout={() => setIsAuthenticated(false)}
        />

        {/* Page content */}
        <main className="page-content">
          <PageContent activeNav={activeNav} setActiveNav={setActiveNav} />
        </main>

        {/* Footer */}
        <footer className="page-footer">
          <span>© Copyright 2026 <a href="#">LIUTEX SUMMIT.</a></span>
        </footer>
      </div>
    </div>
  );
}
