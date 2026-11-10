import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, GraduationCap, Lock, ShieldCheck } from 'lucide-react';
import { NestLogo } from './NestLogo';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { useAdminData } from '../context/AdminDataContext';

export type PageId = 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenApplyModal: () => void;
  onOpenAdminLogin: () => void;
  onOpenAdminPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage,
  onNavigate,
  onOpenApplyModal, 
  onOpenAdminLogin,
  onOpenAdminPortal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { institutionInfo, isAdminLoggedIn } = useAdminData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t('navHome') || 'Home' },
    { id: 'about', label: t('navAbout') || 'About NEST' },
    { id: 'programs', label: t('navPrograms') || 'Programs' },
    { id: 'faculty', label: t('navFaculty') || 'Faculty' },
    { id: 'campus', label: t('navCampusLife') || 'Campus Life' },
    { id: 'admissions', label: t('navAdmissions') || 'Admissions' },
    { id: 'contact', label: t('navContact') || 'Contact' },
  ];

  const handlePageClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-[#1A365D] text-white border-b-2 border-[#C5A059] ${
        isScrolled ? 'shadow-md py-2.5 bg-[#1A365D]/98 backdrop-blur-sm' : 'py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Zone 1: Brand Wordmark (Single element) */}
          <button
            onClick={() => handlePageClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded p-0.5 cursor-pointer shrink-0 min-w-0"
            title="Native Evangelical School of Theology - Home"
          >
            <div className="flex-shrink-0">
              <NestLogo size="sm" variant="badge" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-xs xs:text-sm sm:text-base font-bold tracking-tight text-white leading-tight uppercase truncate">
                {institutionInfo.shortName} Mysore
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-slate-300 font-sans tracking-wider uppercase truncate">
                ATA India Accredited
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-sans font-semibold tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer relative ${
                    isActive
                      ? 'text-[#D4AF37] font-bold bg-white/10'
                      : 'text-slate-200 hover:text-[#D4AF37] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#D4AF37] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action & Utilities */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Multi-Language Selector Dropdown */}
            <LanguageSelector variant="navbar" />

            {/* Admin Quick Icon */}
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminPortal}
                className="p-1.5 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1A365D] border border-[#D4AF37]/40 transition-colors cursor-pointer"
                title="Admin Registrations Dashboard"
                aria-label="Admin Portal"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-1.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#D4AF37] border border-white/10 transition-colors cursor-pointer"
                title="Staff Login"
                aria-label="Staff Login"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => handlePageClick('admissions')}
              className="bg-[#D4AF37] text-[#1A365D] hover:bg-white hover:text-[#1A365D] px-4 py-2 font-sans font-bold uppercase tracking-wider text-xs rounded transition-all shadow-sm inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t('navApplyNow') || 'Apply Online'}</span>
            </button>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <LanguageSelector variant="navbar" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-white hover:text-[#D4AF37] hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#C5A059]/40 bg-[#1A365D] text-white px-3 sm:px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          
          {/* Quick Desk Contact */}
          <div className="px-3.5 py-2.5 bg-[#112440] rounded-xl border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#D4AF37] uppercase tracking-wider block text-[10.5px]">Admissions Desk</span>
              <span className="font-mono text-slate-200 text-xs sm:text-sm">{institutionInfo.phoneFormatted}</span>
            </div>
            <a
              href={`tel:${institutionInfo.phone}`}
              className="px-3 py-1.5 bg-[#D4AF37] text-[#1A365D] text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>

          {/* Navigation Links Grid - Clean full-width list on phones with touch targets >= 44px */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans font-semibold tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`min-h-[44px] px-3.5 py-2.5 rounded-xl transition-all text-left flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#1A365D] font-bold border-[#D4AF37] shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-slate-100 border-white/10 active:bg-white/20'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{item.label}</span>
                  <span className="text-xs opacity-70">→</span>
                </button>
              );
            })}
          </nav>

          {/* Multi-Language in Mobile Drawer */}
          <div className="pt-2 border-t border-white/10">
            <LanguageSelector variant="mobile" />
          </div>

          {/* Primary Mobile Action */}
          <button
            onClick={() => handlePageClick('admissions')}
            className="w-full min-h-[48px] py-3 px-4 bg-[#D4AF37] hover:bg-white text-[#1A365D] font-sans font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
          >
            <GraduationCap className="w-5 h-5" />
            <span>{t('navApplyNow') || 'Online Admission Form'}</span>
          </button>

          {/* Admin Login shortcut */}
          <div className="pt-2 border-t border-white/10 text-center text-xs">
            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPortal();
                }}
                className="text-[#D4AF37] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1.5 py-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Portal &amp; Registrations</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="text-slate-400 hover:text-slate-200 cursor-pointer inline-flex items-center gap-1.5 py-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Staff &amp; Administrator Login</span>
              </button>
            )}
          </div>

        </div>
      )}
    </header>
  );
};
