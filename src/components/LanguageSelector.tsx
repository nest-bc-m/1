import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../context/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'topbar' | 'mobile';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // If mobile drawer layout, render clean interactive grid buttons
  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5" />
          <span>Select Website Language</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#1A365D] shadow-md border-2 border-[#D4AF37]'
                    : 'bg-[#112440] text-slate-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flagEmoji}</span>
                  <span className="font-semibold">{lang.scriptLabel}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#1A365D]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-2 transition-all cursor-pointer border ${
          isOpen
            ? 'bg-[#D4AF37] text-[#1A365D] border-[#D4AF37] shadow-md'
            : 'bg-[#112440] hover:bg-[#0c192c] text-white border-[#D4AF37]/50 hover:border-[#D4AF37]'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Select website language"
      >
        <Globe className={`w-3.5 h-3.5 ${isOpen ? 'text-[#1A365D]' : 'text-[#D4AF37]'}`} />
        <span className="flex items-center gap-1.5">
          <span className="text-xs">{currentOption.flagEmoji}</span>
          <span className="tracking-wide">{currentOption.scriptLabel}</span>
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1A365D]' : 'text-slate-300'}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#112440] border-2 border-[#D4AF37] shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-sans font-bold text-[#D4AF37] uppercase tracking-wider flex items-center justify-between">
            <span>Website Language</span>
            <span className="text-slate-400 font-normal">6 Languages</span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A365D] text-[#D4AF37] font-bold border-l-4 border-[#D4AF37]'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flagEmoji}</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-white">
                        {lang.scriptLabel}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {lang.name}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 bg-[#0c192c] border-t border-white/10 text-[10px] text-slate-400 font-sans">
            Instant translation across all sections
          </div>
        </div>
      )}
    </div>
  );
};
