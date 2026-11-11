import React, { useRef, useState } from 'react';
import { ZoomIn, MapPin } from 'lucide-react';
import { GalleryPhotoItem } from '../types';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import { useLanguage } from '../context/LanguageContext';

interface Gallery3DTiltCardProps {
  photo: GalleryPhotoItem;
  index: number;
  onSelect: (index: number) => void;
}

export const Gallery3DTiltCard: React.FC<Gallery3DTiltCardProps> = ({
  photo,
  index,
  onSelect,
}) => {
  const { currentLanguage } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing between -1 and 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Subtle, elegant 3D tilt angles (max ~8 degrees for dignified academic aesthetic)
    setTilt({
      x: -normY * 8,
      y: normX * 8,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(index)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className="group relative cursor-pointer select-none perspective-[1000px] transition-transform duration-300 ease-out will-change-transform"
      style={{ perspective: '1000px' }}
    >
      <div
        className="w-full bg-white rounded-2xl overflow-hidden border-2 border-[#D1C7B7] group-hover:border-[#D4AF37] flex flex-col justify-between transition-all duration-200 ease-out preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
          boxShadow: isHovered
            ? '0 25px 45px -12px rgba(26, 54, 93, 0.28), 0 10px 20px -5px rgba(212, 175, 55, 0.15)'
            : '0 4px 15px -3px rgba(0, 0, 0, 0.07)',
        }}
      >
        {/* Photo Image Frame with 3D Depth */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-[#D1C7B7]">
          
          {/* Original Campus Image */}
          <img
            src={getAssetUrl(photo.imageUrl, 'campus')}
            alt={currentLanguage === 'kn' ? photo.titleKn : photo.titleEn}
            onError={(e) => handleImageError(e, 'campus')}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Dynamic 3D Glare Light Sheen on Hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 220px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, rgba(212,175,55,0.3) 40%, transparent 80%)`,
            }}
          />

          {/* Ambient Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

          {/* Top Floating Kicker Badge */}
          <div
            className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none transition-transform duration-200"
            style={{
              transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
            }}
          >
            <span className="px-2.5 py-1 rounded-md bg-[#112440]/80 backdrop-blur-md text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
              {currentLanguage === 'kn' ? photo.tagKn : photo.tagEn}
            </span>

            <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all border border-white/20 shadow">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Title on Image */}
          <div
            className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none transition-transform duration-200"
            style={{
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            }}
          >
            <h3 className="font-serif font-bold text-white text-base sm:text-lg leading-snug drop-shadow-md">
              {currentLanguage === 'kn' ? photo.titleKn : photo.titleEn}
            </h3>
            <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-sans font-medium mt-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{currentLanguage === 'kn' ? photo.locationKn : photo.locationEn}</span>
            </div>
          </div>

        </div>

        {/* Card Body & Description with Elevated 3D Plane */}
        <div
          className="p-4 sm:p-5 space-y-2.5 bg-white flex-grow flex flex-col justify-between transition-transform duration-200"
          style={{
            transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
          }}
        >
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans line-clamp-2">
            {currentLanguage === 'kn' ? photo.descKn : photo.descEn}
          </p>

          <div className="pt-2.5 border-t border-[#E5DFD3] flex items-center justify-between text-[11px] font-sans text-slate-500">
            <span className="font-semibold text-[#1A365D]">Native Evangelical School</span>
            <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>{currentLanguage === 'kn' ? 'ದೊಡ್ಡದಾಗಿ ನೋಡಿ' : 'View Full Image'}</span>
              <span>→</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
