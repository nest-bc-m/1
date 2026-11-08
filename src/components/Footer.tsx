import React from 'react';
import { Phone, Mail, MapPin, Youtube, Facebook, ArrowUp, Lock, ShieldCheck } from 'lucide-react';
import { NestLogo } from './NestLogo';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
  onOpenAdminLogin?: () => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate,
  onOpenAdminLogin, 
  onOpenAdminPortal 
}) => {
  const { currentLanguage, t } = useLanguage();
  const { institutionInfo, isAdminLoggedIn } = useAdminData();
  const INSTITUTION_INFO = institutionInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = `#${page}`;
    }
    scrollToTop();
  };

  return (
    <footer className="bg-[#E9E4DB] text-slate-800 text-xs border-t-2 border-[#D4AF37]">
      
      {/* Top Banner with Scripture */}
      <div className="bg-[#1A365D] py-6 border-b border-[#D4AF37]/40 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1.5">
          <p className="font-serif italic text-base sm:text-lg text-white">
            {t('heroMotto')}
          </p>
          <p className="text-xs text-[#D4AF37] font-sans font-bold uppercase tracking-widest">
            {t('heroMottoScripture')} — {t('institutionName')}
          </p>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Institutional Lockup */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <NestLogo size="md" variant="badge" />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A365D] leading-tight">
                  {t('institutionName')}
                </h3>
                <p className="text-xs text-[#D4AF37] font-bold mt-0.5 uppercase tracking-wider">
                  {currentLanguage === 'kn' ? 'ಮಾನ್ಯತೆ ಪಡೆದ ದೇವತಾಶಾಸ್ತ್ರ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆ · ಮೈಸೂರು' : 'Theological Institution · Mysore, Karnataka'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {currentLanguage === 'kn'
                ? 'ಕರ್ನಾಟಕ, ಭಾರತ ಮತ್ತು ರಾಷ್ಟ್ರಗಳಿಗಾಗಿ ಸತ್ಯವೇದಾಧಾರಿತ ಶಿಕ್ಷಣ, ಆತ್ಮೀಕ ನಾಯಕತ್ವ ಮತ್ತು ಸ್ಥಳೀಯ ಸಭೆಗಳ ಸ್ಥಾಪನೆಗೆ ಸಮರ್ಪಿತ ಸಂಸ್ಥೆ.'
                : 'Dedicated to faithful evangelical theological education, pastoral formation, and native church planting across Karnataka, India, and the nations.'}
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={INSTITUTION_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white hover:bg-[#1A365D] text-[#1A365D] hover:text-white border border-[#D1C7B7] hover:border-[#1A365D] flex items-center justify-center transition-colors"
                title="Official Facebook Page"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={INSTITUTION_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white hover:bg-red-700 text-[#1A365D] hover:text-white border border-[#D1C7B7] hover:border-red-700 flex items-center justify-center transition-colors"
                title="YouTube Channel"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={INSTITUTION_INFO.socialLinks.location}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white hover:bg-[#D4AF37] text-[#1A365D] hover:text-[#1A365D] border border-[#D1C7B7] hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                title="Google Maps Location"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Separate Menu Pages Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-[#1A365D] text-sm uppercase tracking-wider">
              {currentLanguage === 'kn' ? 'ಮೆನು ಪುಟಗಳು' : 'Menu Pages'}
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="text-slate-700 hover:text-[#1A365D] hover:underline transition-colors text-left cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="text-slate-700 hover:text-[#1A365D] hover:underline transition-colors text-left cursor-pointer"
                >
                  About NEST &amp; Faith
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('programs')}
                  className="text-slate-700 hover:text-[#1A365D] hover:underline transition-colors text-left cursor-pointer"
                >
                  Academic Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('faculty')}
                  className="text-slate-700 hover:text-[#1A365D] hover:underline transition-colors text-left cursor-pointer"
                >
                  Faculty &amp; Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('campus')}
                  className="text-slate-700 hover:text-[#1A365D] hover:underline transition-colors text-left cursor-pointer"
                >
                  Campus &amp; Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('admissions')}
                  className="text-slate-700 hover:text-[#1A365D] hover:underline transition-colors text-left cursor-pointer font-semibold text-[#1A365D]"
                >
                  Admissions &amp; Receipt
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="text-slate-700 hover:text-[#1A365D] hover:underline transition-colors text-left cursor-pointer"
                >
                  Contact &amp; Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Programs & ATA */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-[#1A365D] text-sm uppercase tracking-wider">
              {currentLanguage === 'kn' ? 'ಪದವಿ ಕೋರ್ಸ್‌ಗಳು (ATA India)' : 'Academic Degrees (ATA Accredited)'}
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li className="text-slate-700">
                <span className="font-bold text-[#1A365D]">M.Div</span> — Master of Divinity (2–3 Yrs)
              </li>
              <li className="text-slate-700">
                <span className="font-bold text-[#1A365D]">B.Th</span> — Bachelor of Theology (3 Yrs)
              </li>
              <li className="text-slate-700">
                <span className="font-bold text-[#1A365D]">Dip.Th</span> — Diploma in Theology (2 Yrs)
              </li>
              <li className="text-slate-700">
                <span className="font-bold text-[#1A365D]">C.Min</span> — Christian Ministry Certificate
              </li>
            </ul>

            <div className="pt-2 border-t border-[#D1C7B7]">
              <a
                href={INSTITUTION_INFO.accreditation.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#1A365D] hover:text-[#D4AF37] inline-flex items-center gap-1"
              >
                <span>ATA India Directory Record</span>
                <span className="text-[#D4AF37]">↗</span>
              </a>
            </div>
          </div>

          {/* Col 4: Campus Contact Card */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-[#1A365D] text-sm uppercase tracking-wider">
              {currentLanguage === 'kn' ? 'ಮೈಸೂರು ಕ್ಯಾಂಪಸ್ & ಸಂಪರ್ಕ' : 'Mysore Campus & Principal'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-700 font-sans">
              <div className="text-[11px] font-bold text-[#1A365D] bg-white p-2 rounded border border-[#D1C7B7]">
                {currentLanguage === 'kn' ? INSTITUTION_INFO.principalKn : INSTITUTION_INFO.principal}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>{t('campusAddress')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1A365D] flex-shrink-0" />
                <a href={`tel:${INSTITUTION_INFO.phone}`} className="font-mono font-bold text-[#1A365D] hover:underline">
                  {INSTITUTION_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1A365D] flex-shrink-0" />
                <a href={`mailto:${INSTITUTION_INFO.email}`} className="font-mono text-[#1A365D] hover:underline">
                  {INSTITUTION_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="mt-10 pt-6 border-t border-[#D1C7B7] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600 font-sans">
          <p>
            © {new Date().getFullYear()} Native Evangelical School of Theology (NEST), Mysore, Karnataka, India. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminPortal}
                className="text-[#1A365D] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admin Portal</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="text-slate-500 hover:text-[#1A365D] font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admin Login</span>
              </button>
            )}
            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded bg-white hover:bg-[#1A365D] text-[#1A365D] hover:text-white border border-[#D1C7B7] hover:border-[#1A365D] transition-colors inline-flex items-center gap-1 cursor-pointer font-bold"
              title="Scroll to Top"
            >
              <span>{currentLanguage === 'kn' ? 'ಮೇಲಕ್ಕೆ ಹೋಗಿ' : 'Back to Top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
