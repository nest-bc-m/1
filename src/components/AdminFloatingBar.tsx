import React from 'react';
import { ShieldCheck, Settings, LogOut, ExternalLink, Sparkles, GraduationCap } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useLanguage } from '../context/LanguageContext';

interface AdminFloatingBarProps {
  onOpenPortal: () => void;
  onOpenAdmissions?: () => void;
}

export const AdminFloatingBar: React.FC<AdminFloatingBarProps> = ({ onOpenPortal, onOpenAdmissions }) => {
  const { isAdminLoggedIn, adminUser, logout, admissionsList } = useAdminData();
  const { currentLanguage } = useLanguage();

  if (!isAdminLoggedIn) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0c182b] text-white border-b-2 border-[#D4AF37] px-3 py-1.5 shadow-2xl flex flex-wrap items-center justify-between gap-2 text-xs font-sans animate-in slide-in-from-top duration-200">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <div className="flex items-center gap-1.5 font-bold text-[#D4AF37]">
          <span>👑</span>
          <span className="uppercase tracking-wider">
            {currentLanguage === 'kn' ? 'ಆಡಳಿತ ಅಧಿಕಾರ ಸಕ್ರಿಯವಾಗಿದೆ:' : 'Administrator Mode Active:'}
          </span>
        </div>
        <span className="hidden sm:inline text-slate-200 font-semibold">
          {adminUser?.name || 'Rev. Santhosh K. Chacko'} ({adminUser?.role || 'Super Admin'})
        </span>
        <button
          onClick={onOpenAdmissions || onOpenPortal}
          className="px-2 py-0.5 rounded-full bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] border border-[#D4AF37]/50 text-[10px] text-[#D4AF37] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1"
          title="Open Student Registrations Dashboard"
        >
          <GraduationCap className="w-3 h-3" />
          <span>{admissionsList.length} Registrations</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAdmissions || onOpenPortal}
          className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow"
          title="View Student Registrations Dashboard"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Registrations</span>
        </button>

        <button
          onClick={onOpenPortal}
          className="px-3 py-1 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{currentLanguage === 'kn' ? 'ಆಡಳಿತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ' : 'CMS Portal'}</span>
        </button>

        <button
          onClick={logout}
          className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-800 text-red-200 border border-red-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
          title="Exit Admin Mode"
        >
          <LogOut className="w-3 h-3" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};
