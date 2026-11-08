import React from 'react';

export interface NestLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero' | 'custom';
  showText?: boolean;
  textColor?: 'light' | 'dark' | 'auto';
  customWidth?: number;
  customHeight?: number;
  variant?: 'transparent' | 'badge' | 'card' | 'seal';
}

// Exact official logo asset provided by user (/public/assets/aistudio/logo_9f1d35a7.jpg)
const OFFICIAL_LOGO_SRC = '/assets/aistudio/logo_9f1d35a7.jpg';

export const NestLogo: React.FC<NestLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  textColor = 'dark',
  customWidth,
  customHeight,
  variant = 'transparent',
}) => {
  // Proportional dimensions for the official logo artwork (approx 1 : 1.22 aspect ratio)
  const sizeDimensions = {
    xs: { w: 34, h: 42 },
    sm: { w: 46, h: 56 },
    md: { w: 72, h: 88 },
    lg: { w: 110, h: 135 },
    xl: { w: 150, h: 185 },
    '2xl': { w: 220, h: 270 },
    hero: { w: 280, h: 345 },
    custom: { w: customWidth || 100, h: customHeight || 122 },
  };

  const currentSize = sizeDimensions[size] || sizeDimensions.md;

  const textClasses =
    textColor === 'light'
      ? 'text-white'
      : textColor === 'dark'
      ? 'text-[#1A365D]'
      : 'text-[#1A365D]';

  const subTextClasses =
    textColor === 'light' ? 'text-[#D4AF37]' : 'text-[#1A365D]/80';

  // Base Logo Image Element using the exact user-uploaded file format
  const logoImage = (
    <img
      src={OFFICIAL_LOGO_SRC}
      alt="Native Evangelical School of Theology Official Logo"
      width={currentSize.w}
      height={currentSize.h}
      className="object-contain flex-shrink-0 select-none"
      style={{
        width: `${currentSize.w}px`,
        height: `${currentSize.h}px`,
        maxWidth: '100%',
      }}
      loading="eager"
      decoding="async"
    />
  );

  // Variant: Badge (Protective white plaque with refined gold border for dark navbars and headers)
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div className="bg-white rounded-xl p-1.5 shadow-md border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-105">
          {logoImage}
        </div>
        {showText && (
          <div className="flex flex-col">
            <span
              className={`font-serif text-base sm:text-lg font-bold tracking-tight leading-tight ${textClasses}`}
            >
              Native Evangelical School of Theology
            </span>
            <span className={`text-[11px] font-sans font-medium tracking-wide ${subTextClasses}`}>
              Theological Institution · Mysore
            </span>
          </div>
        )}
      </div>
    );
  }

  // Variant: Card / Seal (For Hero section and Accreditation showcases)
  if (variant === 'card' || variant === 'seal') {
    return (
      <div
        className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#D4AF37] flex flex-col items-center text-center ${className}`}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]"></div>
        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]"></div>
        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]"></div>
        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]"></div>

        <div className="flex justify-center items-center py-2">
          {logoImage}
        </div>

        <div className="mt-4 pt-3 border-t border-[#D1C7B7] w-full space-y-1">
          <p className="font-serif font-bold text-sm sm:text-base text-[#1A365D] tracking-wide uppercase">
            Official Institutional Logo
          </p>
          <p className="text-[11px] text-slate-600 font-sans">
            Native Evangelical School of Theology · Mysore
          </p>
          <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
            John 15:5 • ATA India Member
          </p>
        </div>
      </div>
    );
  }

  // Default Transparent / Direct View
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {logoImage}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-none ${textClasses}`}
          >
            Native Evangelical School of Theology
          </span>
          <span className={`text-xs sm:text-sm font-sans font-medium tracking-wide mt-1 ${subTextClasses}`}>
            Theological Institution · Mysore, Karnataka, India
          </span>
        </div>
      )}
    </div>
  );
};
