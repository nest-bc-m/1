import React from 'react';
import { Phone, Mail, MapPin, Youtube, Facebook, ArrowUpRight, Lock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';

interface TopContactBarProps {
  onOpenAdminLogin: () => void;
  onOpenAdminPortal: () => void;
  onNavigate?: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
}

export const TopContactBar: React.FC<TopContactBarProps> = ({
  onOpenAdminLogin,
  onOpenAdminPortal,
  onNavigate,
}) => {
  const { currentLanguage } = useLanguage();
  const { institutionInfo, announcements, isAdminLoggedIn } = useAdminData();

  // Active announcement bulletin
  const activeAnnouncement = announcements.find((a) => a.isActive) || announcements[0];

  return (
    <div className="w-full">
      {/* Sleek Top Utility Strip */}
      <div className="bg-[#112440] text-slate-300 text-xs border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
          
          {/* Left side: Verified Contact Desk & Accreditations */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-slate-300">
            {/* Phone Hotline */}
            <a
              href={`tel:${institutionInfo.phone}`}
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors group"
              title="Call NEST Admissions Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="font-semibold tracking-wide font-sans">{institutionInfo.phoneFormatted}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${institutionInfo.email}?subject=Inquiry%20regarding%20Theological%20Studies%20at%20NEST`}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors group"
              title="Email NEST Admissions"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="font-sans">{institutionInfo.email}</span>
            </a>

            {/* Campus Location */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-white/20">•</span>
              <button
                onClick={() => onNavigate ? onNavigate('contact') : (window.location.hash = '#contact')}
                className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors group cursor-pointer"
                title="Campus Location & Directions"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Nagarthalli, Mysore, Karnataka</span>
              </button>
            </div>

            {/* ATA Accreditation Badge */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-white/20">•</span>
              <a
                href={institutionInfo.accreditation.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#D4AF37] hover:underline font-bold text-[11px]"
                title="Asia Theological Association (ATA India) Accreditation"
              >
                <span>ATA India Accredited</span>
                <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
              </a>
            </div>
          </div>

          {/* Right side: Social icons & Discreet Administrator Link (No duplicate loud buttons) */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Social Links */}
            <div className="flex items-center gap-2 text-slate-300">
              <a
                href={institutionInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-[#1A365D] hover:text-[#D4AF37] transition-colors"
                title="Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={institutionInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-[#1A365D] hover:text-[#D4AF37] transition-colors"
                title="YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>

            <span className="text-white/20">|</span>

            {/* Subtle Administrator Link */}
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminPortal}
                className="text-[11px] font-sans font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                title="Open Administrative CMS"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Portal</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="text-[11px] font-sans text-slate-400 hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer transition-colors"
                title="Staff & Administrator Login"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Admin</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Institutional Theme & Motto Ribbon */}
      <div className="bg-[#0c192c] text-white text-[10.5px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-[#D4AF37]/30 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap max-w-full">
            <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-[#1A365D] font-bold uppercase tracking-wider text-[9.5px] sm:text-[10px] shrink-0">
              {currentLanguage === 'kn' ? 'ಧ್ಯೇಯವಾಕ್ಯ' : 'Official Theme'}
            </span>
            <span className="text-slate-100 font-serif font-semibold tracking-wide break-words">
              &ldquo;{currentLanguage === 'kn' ? institutionInfo.mottoKn : institutionInfo.motto}&rdquo;
            </span>
            <span className="text-[#D4AF37] font-semibold text-[10.5px] sm:text-[11px] shrink-0">
              ({currentLanguage === 'kn' ? institutionInfo.mottoScriptureKn : institutionInfo.mottoScripture})
            </span>
          </div>

          {activeAnnouncement && (
            <div className="hidden md:flex items-center gap-3 text-slate-300">
              <span className="text-slate-300 text-[11px]">
                {currentLanguage === 'kn' ? activeAnnouncement.titleKn : activeAnnouncement.titleEn}
              </span>
              <button
                onClick={() => onNavigate ? onNavigate('admissions') : (window.location.hash = '#admissions')}
                className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
              >
                <span>{currentLanguage === 'kn' ? 'ಪ್ರವೇಶಾತಿ ಮಾಹಿತಿ' : 'Admissions 2026–27'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
