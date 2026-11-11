import React, { useState, useEffect } from 'react';
import { TopContactBar } from './components/TopContactBar';
import { Navbar, PageId } from './components/Navbar';
import { OfficialHomePage } from './components/OfficialHomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { FacultyPage } from './components/pages/FacultyPage';
import { CampusPage } from './components/pages/CampusPage';
import { AdmissionsPage } from './components/pages/AdmissionsPage';
import { ContactPage } from './components/pages/ContactPage';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { AdminFloatingBar } from './components/AdminFloatingBar';
import { MessageSquare } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';

function MainAppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [adminPortalTab, setAdminPortalTab] = useState<'overview' | 'general' | 'announcements' | 'faculty' | 'programs' | 'gallery' | 'admissions' | 'settings'>('overview');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('b-th');
  
  const { t } = useLanguage();
  const { isAdminLoggedIn, institutionInfo } = useAdminData();

  const handleOpenAdminPortal = (tab: any = 'overview') => {
    setAdminPortalTab(tab);
    if (!isAdminLoggedIn) {
      setIsAdminLoginOpen(true);
    } else {
      setIsAdminPortalOpen(true);
    }
  };

  // Hash-based routing synchronization
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'about', 'programs', 'faculty', 'campus', 'admissions', 'contact'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      } else if (hash === 'top' || hash === '') {
        setCurrentPage('home');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle program selection
  const handleSelectProgramToApply = (programId: string) => {
    setSelectedProgramId(programId);
    handleNavigate('admissions');
  };

  const handleOpenGeneralApply = () => {
    setSelectedProgramId('b-th');
    handleNavigate('admissions');
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#FBF9F5] text-slate-800 flex flex-col antialiased selection:bg-[#1A365D] selection:text-[#D4AF37] ${isAdminLoggedIn ? 'pt-8' : ''}`}>
      
      {/* Admin Floating Control Bar when Logged In */}
      <AdminFloatingBar 
        onOpenPortal={() => handleOpenAdminPortal('overview')} 
        onOpenAdmissions={() => handleOpenAdminPortal('admissions')}
      />

      {/* Top Utility Contact Bar */}
      <TopContactBar
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPortal={() => handleOpenAdminPortal('overview')}
        onNavigate={handleNavigate}
      />

      {/* Main Responsive Sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenApplyModal={handleOpenGeneralApply}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPortal={() => handleOpenAdminPortal('overview')}
      />

      {/* Dedicated Separate Menu Pages Routing */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <OfficialHomePage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenGeneralApply}
            onSelectProgram={handleSelectProgramToApply}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenGeneralApply}
          />
        )}

        {currentPage === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onSelectProgramToApply={handleSelectProgramToApply}
            selectedProgramId={selectedProgramId}
          />
        )}

        {currentPage === 'faculty' && (
          <FacultyPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenGeneralApply}
          />
        )}

        {currentPage === 'campus' && (
          <CampusPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenGeneralApply}
          />
        )}

        {currentPage === 'admissions' && (
          <AdmissionsPage
            onNavigate={handleNavigate}
            selectedProgramId={selectedProgramId}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPortal={() => handleOpenAdminPortal('overview')}
      />

      {/* Quick Application Modal for Students (Secondary) */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialProgramId={selectedProgramId}
      />

      {/* Administrator Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => handleOpenAdminPortal('admissions')}
      />

      {/* Master Administrator CMS Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        initialTab={adminPortalTab}
      />

      {/* Floating Quick WhatsApp Action Button */}
      <div className="fixed bottom-5 right-5 z-30">
        <a
          href={`https://wa.me/${institutionInfo.phone}?text=Hello%20Principal%20Rev.%20Santhosh%20Chacko%2C%20I%20am%20inquiring%20about%20admissions%20at%20NEST%20Mysore.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white"
          title="WhatsApp Principal Rev. Santhosh Chacko"
          aria-label="WhatsApp Principal"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#112440] text-white text-[11px] font-sans font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-[#D4AF37]/40">
            {t('whatsappPrincipal')}
          </span>
        </a>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminDataProvider>
        <MainAppContent />
      </AdminDataProvider>
    </LanguageProvider>
  );
}
