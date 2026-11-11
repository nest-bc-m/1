import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';
import { getAssetUrl, handleLogoError } from '../utils/assetHelper';
import { useLanguage } from '../context/LanguageContext';

interface HeroLogo3DProps {
  className?: string;
  badgeTitle?: string;
  subTitle?: string;
}

const OFFICIAL_LOGO_SRC = getAssetUrl('assets/aistudio/logo_9f1d35a7.jpg');

export const HeroLogo3D: React.FC<HeroLogo3DProps> = ({
  className = '',
  badgeTitle,
  subTitle,
}) => {
  const { currentLanguage } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Rotation State in degrees
  const [rotation, setRotation] = useState({ x: 4, y: -6 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [lightPos, setLightPos] = useState({ x: 50, y: 30 });

  // Touch & Mouse Drag Tracking
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const autoFloatAngleRef = useRef<number>(0);

  // Smooth ambient floating oscillation when not dragging
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!isInteracting && !isHovered && active) {
        autoFloatAngleRef.current += 0.02;
        const subtleX = Math.sin(autoFloatAngleRef.current * 0.7) * 4;
        const subtleY = Math.cos(autoFloatAngleRef.current * 0.9) * 7;
        setRotation({ x: subtleX, y: subtleY });
        setLightPos({
          x: 50 + Math.sin(autoFloatAngleRef.current) * 20,
          y: 40 + Math.cos(autoFloatAngleRef.current) * 15,
        });
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInteracting, isHovered]);

  // Pointer Move (Mouse hover perspective)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    if (dragStartRef.current) {
      // Dragging mode
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      setRotation({
        x: Math.max(-25, Math.min(25, dragStartRef.current.rotX - deltaY * 0.15)),
        y: Math.max(-30, Math.min(30, dragStartRef.current.rotY + deltaX * 0.15)),
      });
    } else {
      // Hover tilt mode
      setRotation({
        x: -normY * 12,
        y: normX * 15,
      });
    }

    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsInteracting(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsInteracting(false);
    dragStartRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation({ x: 0, y: 0 });
    setLightPos({ x: 50, y: 40 });
  };

  return (
    <div className={`relative flex flex-col items-center select-none font-sans ${className}`}>
      
      {/* 3D Viewport Box */}
      <div
        ref={cardRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setIsInteracting(false);
          dragStartRef.current = null;
        }}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="w-full max-w-[340px] sm:max-w-[360px] aspect-[1/1.08] relative rounded-3xl cursor-grab active:cursor-grabbing touch-none perspective-[1200px]"
        style={{ perspective: '1200px' }}
      >
        {/* 3D Multi-Layered Seal Medallion */}
        <div
          className="w-full h-full relative transition-transform duration-100 ease-out preserve-3d"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* Layer 1: Ambient Drop Shadow Behind Object */}
          <div
            className="absolute inset-4 rounded-full bg-[#0a1526]/80 blur-2xl -z-10 pointer-events-none transition-opacity duration-300"
            style={{
              transform: `translateZ(-40px) translate(${rotation.y * 1.2}px, ${-rotation.x * 1.2}px)`,
            }}
          />

          {/* Layer 2: Main Medallion Chassis (Deep Navy & Dual Gold Rim) */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#162e52] via-[#0e1d35] to-[#081224] border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center justify-between p-4 sm:p-5"
            style={{
              transform: 'translateZ(10px)',
            }}
          >
            {/* Dynamic Gold Specular Glare / Sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 transition-opacity"
              style={{
                background: `radial-gradient(circle 180px at ${lightPos.x}% ${lightPos.y}%, rgba(212,175,55,0.45) 0%, rgba(212,175,55,0.08) 50%, transparent 80%)`,
              }}
            />

            {/* Subtle Guilloche Circular Background Lines */}
            <div className="absolute inset-2 rounded-2xl border border-white/10 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-[#D4AF37]/20 pointer-events-none" />

            {/* Top Kicker Label */}
            <div
              className="w-full flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] border-b border-white/10 pb-2 z-10"
              style={{ transform: 'translateZ(15px)' }}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>{badgeTitle || (currentLanguage === 'kn' ? 'ಅಧಿಕೃತ ಸಂಸ್ಥೆಯ ಮುದ್ರೆ' : 'Official Seminary Seal')}</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                title="Reset Orientation"
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Layer 3: Central 3D Embossed Seal Art & Official Logo Image */}
            <div
              className="relative my-auto flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-white/95 to-[#FAF8F5] border-2 border-[#D4AF37] shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-transform duration-100"
              style={{
                transform: 'translateZ(35px)',
              }}
            >
              {/* Inner Decorative Golden Inset Frame */}
              <div className="absolute inset-1 rounded-xl border border-[#D4AF37]/40 pointer-events-none" />

              {/* Official NEST Logo Image Asset */}
              <img
                src={OFFICIAL_LOGO_SRC}
                alt="Native Evangelical School of Theology Official 3D Emblem"
                width={160}
                height={195}
                onError={handleLogoError}
                className="w-32 sm:w-36 md:w-40 h-auto object-contain select-none drop-shadow-md"
                style={{
                  filter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.25))',
                }}
              />
            </div>

            {/* Layer 4: Floating Bottom Institutional Pillar & Touch Hint */}
            <div
              className="w-full text-center space-y-1 pt-2 border-t border-white/10 z-10"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-white tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Native Evangelical School of Theology</span>
              </div>
              <p className="text-[10px] text-slate-300 font-sans">
                {subTitle || (currentLanguage === 'kn' ? '3D ಸ್ಪರ್ಶಿಸಿ ತಿರುಗಿಸಿ · ATA India ಮಾನ್ಯತೆ' : 'Drag to Rotate 3D Seal · ATA India Accredited')}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Guidance Badge */}
      <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-sans">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>
          {currentLanguage === 'kn'
            ? 'ಸಂಸ್ಥೆಯ ಅಧಿಕೃತ ಲೋಗೋ · ನೈಜ 3D ಇಂಟರ್ಯಾಕ್ಟಿವ್'
            : 'Official Seminary 3D Seal · Interactive'}
        </span>
      </div>

    </div>
  );
};
