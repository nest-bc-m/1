import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Eye, 
  Target, 
  Quote, 
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { NestLogo } from './NestLogo';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface OfficialHomePageProps {
  onNavigate: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
  onOpenApplyModal: () => void;
  onSelectProgram?: (programId: string) => void;
}

export const OfficialHomePage: React.FC<OfficialHomePageProps> = ({
  onNavigate,
  onOpenApplyModal,
  onSelectProgram,
}) => {
  const { currentLanguage, t } = useLanguage();
  const { institutionInfo } = useAdminData();

  // Curated campus preview photographs (authentic institutional facilities)
  const campusPreviews = [
    {
      img: getAssetUrl('assets/aistudio/college_48f40f17.webp', 'college'),
      title: currentLanguage === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಸಂಕೀರ್ಣ ಮತ್ತು ಮುಖ್ಯ ಕಟ್ಟಡ' : 'Academic Complex & Main Building',
      caption: currentLanguage === 'kn' ? 'ನಾಗರಹಳ್ಳಿ, ಮೈಸೂರು' : 'Nagarthalli Campus, Mysore',
    },
    {
      img: getAssetUrl('assets/aistudio/chapel_d7e08b0f.webp', 'chapel'),
      title: currentLanguage === 'kn' ? 'ಚಾಪೆಲ್ ಪ್ರಾರ್ಥನಾ ಮಂದಿರ' : 'Chapel of Prayer & Daily Worship',
      caption: currentLanguage === 'kn' ? 'ದೈನಂದಿನ ಆರಾಧನೆ ಮತ್ತು ಉಪವಾಸ ಪ್ರಾರ್ಥನೆ' : 'Daily Devotions, Preaching & Intercession',
    },
    {
      img: getAssetUrl('assets/aistudio/classroom_3ee27e65.webp', 'classroom'),
      title: currentLanguage === 'kn' ? 'ದೇವತಾಶಾಸ್ತ್ರ ಉಪನ್ಯಾಸ ಕೊಠಡಿಗಳು' : 'Theological Lecture Halls',
      caption: currentLanguage === 'kn' ? 'ಗ್ರೀಕ್, ಹೀಬ್ರೂ ಮತ್ತು ಬೈಬಲ್ ವ್ಯಾಖ್ಯಾನ' : 'Exegetical & Systematic Instruction',
    },
    {
      img: getAssetUrl('assets/aistudio/dinig_hall_3a8b4555.webp', 'dining'),
      title: currentLanguage === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ ಭೋಜನಾಲಯ ಮತ್ತು ಸಹಭಾಗಿತ್ವ' : 'Dining Hall & Student Fellowship',
      caption: currentLanguage === 'kn' ? 'ವಸತಿಯುತ ವಿದ್ಯಾರ್ಥಿ ಸಮುದಾಯ' : 'Residential Student Cohort Community',
    },
  ];

  // Core representative degree programs for homepage preview
  const previewPrograms = [
    {
      code: 'M.Div',
      title: 'Master of Divinity',
      titleKn: 'ಮಾಸ್ಟರ್ ಆಫ್ ಡಿವಿನಿಟಿ',
      level: 'Postgraduate / Master',
      duration: '2–3 Years',
      mode: 'Residential On-Campus & Distance Education',
      medium: 'English Medium',
      eligibility: 'Recognized Bachelor Degree (B.Th / B.A / B.Sc / B.Com / B.Tech)',
      description: 'An accredited graduate theological curriculum providing advanced biblical exegesis, Hebrew and Greek research, and pastoral leadership training.',
      id: 'm-div',
    },
    {
      code: 'B.Th',
      title: 'Bachelor of Theology',
      titleKn: 'ಬ್ಯಾಚುಲರ್ ಆಫ್ ಥಿಯಾಲಜಿ',
      level: 'Undergraduate / Bachelor',
      duration: '3 Years (6 Semesters)',
      mode: 'Residential On-Campus & Distance Education',
      medium: 'English Medium',
      eligibility: '10+2 / Pre-University Course (PUC) or equivalent passed',
      description: 'A foundational undergraduate theological degree emphasizing systematic theology, New Testament Greek, church history, and supervised ministry.',
      id: 'b-th',
    },
    {
      code: 'Dip.Th',
      title: 'Diploma in Theology',
      titleKn: 'ಡಿಪ್ಲೊಮಾ ಇನ್ ಥಿಯಾಲಜಿ',
      level: 'Diploma',
      duration: '2 Years',
      mode: 'Residential & Distance Education',
      medium: 'Bilingual Track (Kannada & English)',
      eligibility: '10th Standard (SSLC) / High School completed',
      description: 'Tailored for native evangelists, church workers, and vernacular pastors seeking structured biblical grounding in local languages.',
      id: 'dip-th',
    },
    {
      code: 'B.Th (Distance)',
      title: 'Bachelor of Theology — Distance',
      titleKn: 'ಬ್ಯಾಚುಲರ್ ಆಫ್ ಥಿಯಾಲಜಿ (ದೂರಶಿಕ್ಷಣ)',
      level: 'Distance Degree',
      duration: '3 Years (Flexible)',
      mode: 'Distance Education / External',
      medium: 'English & Kannada Medium',
      eligibility: '10+2 / PUC passed, Christian believers & ministry workers',
      description: 'Accredited undergraduate theological education designed for working pastors, evangelists, and church leaders through external study.',
      id: 'b-th-distance',
    },
  ];

  return (
    <div className="space-y-0 text-slate-800">

      {/* ========================================================================= */}
      {/* 0. ACADEMIC HERO BANNER: DIGNIFIED, SCRIPTURAL, OFFICIAL                   */}
      {/* ========================================================================= */}
      <section className="relative bg-[#1A365D] text-white border-b-4 border-[#C5A059]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Academic Standing & Mission */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-slate-300">
                <span className="font-bold text-[#D4AF37] tracking-wider uppercase">Accredited Member</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span>Asia Theological Association India (ATA India)</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span>Mysore, Karnataka</span>
              </div>

              {/* Dignified Institutional Headline */}
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  {t('heroHeadline')}
                </h1>
                <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed max-w-3xl">
                  {t('heroSub')}
                </p>
              </div>

              {/* Institutional Scripture Foundation (2 Peter 1:3-4) */}
              <div className="bg-[#112440]/90 border-l-4 border-[#C5A059] p-5 rounded-r-lg max-w-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#D4AF37] tracking-wider uppercase">
                  <span>{t('heroMotto')}</span>
                </div>
                <p className="font-serif italic text-sm sm:text-base text-slate-100 leading-relaxed">
                  &ldquo;{t('heroVerseQuote')}&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs font-sans text-[#D4AF37] font-semibold pt-1">
                  <span>{t('heroMottoScripture')}</span>
                  <span className="text-slate-300 font-normal">{t('heroVerseFootnote')}</span>
                </div>
              </div>

              {/* Dual Action Affordances */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-5 py-3 bg-[#D4AF37] text-[#1A365D] hover:bg-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer shadow"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{t('navAdmissions')} 2026–2027</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('programs')}
                  className="px-5 py-3 border border-white/40 hover:bg-white/10 text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t('navPrograms')}</span>
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-4 py-3 text-slate-200 hover:text-white text-xs sm:text-sm font-sans font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('navAbout')}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>

            </div>

            {/* Right Column: Institutional Seal & Operational Summary */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-sm bg-[#112440]/90 border border-white/15 rounded-xl p-6 shadow-xl space-y-5 text-center">
                <div className="flex justify-center">
                  <NestLogo size="xl" variant="badge" />
                </div>
                
                <div className="space-y-1 border-t border-white/10 pt-4">
                  <p className="font-serif font-bold text-white text-sm">
                    {institutionInfo.name}
                  </p>
                  <p className="text-xs text-[#D4AF37] font-sans">
                    Nagarthalli, Rayanakere P. O, Mysore - 570008
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2 text-left text-xs font-sans text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Affiliation:</span>
                    <span className="font-semibold text-slate-100">ATA India Accredited</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Academic Year:</span>
                    <span className="font-semibold text-slate-100">2026–2027 Intake</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Degrees Offered:</span>
                    <span className="font-semibold text-slate-100">M.Div, B.Th, Dip.Th (Regular &amp; Distance)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Medium:</span>
                    <span className="font-semibold text-slate-100">English &amp; Bilingual Track</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`tel:${institutionInfo.phone}`}
                    className="w-full py-2.5 px-3 bg-[#1A365D] hover:bg-[#204373] text-[#D4AF37] border border-[#D4AF37]/50 rounded text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Office: {institutionInfo.phoneFormatted}</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 1. COLLEGE INTRODUCTION                                                   */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-[#FBF9F5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left 7 Columns: Introduction Prose */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#1A365D] uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>{t('introBadge')}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A365D] leading-tight text-balance">
                {t('introHeading')}
              </h2>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
                <p>
                  {t('introParagraph1')}
                </p>
                <p>
                  {t('introParagraph2')}
                </p>
              </div>

              {/* Unboxed Institutional Key Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-200">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-[#1A365D] text-sm">{t('introPoint1Title')}</h4>
                  <p className="text-xs text-stone-600 leading-normal">
                    {t('introPoint1Desc')}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-[#1A365D] text-sm">{t('introPoint2Title')}</h4>
                  <p className="text-xs text-stone-600 leading-normal">
                    {t('introPoint2Desc')}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-sans font-bold text-[#1A365D] hover:text-[#C5A059] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{t('readHistoryBtn')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right 5 Columns: Campus Complex Overview Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-stone-300 shadow-md bg-stone-100">
                <img
                  src={getAssetUrl('assets/aistudio/college_48f40f17.webp', 'college')}
                  alt="Native Evangelical School of Theology Campus Mysore"
                  onError={(e) => handleImageError(e, 'college')}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4 bg-white border-t border-stone-200 space-y-1">
                  <p className="font-serif font-bold text-stone-900 text-sm">
                    {currentLanguage === 'kn' ? 'ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್, ಮೈಸೂರು' : 'Nagarthalli Campus, Mysore'}
                  </p>
                  <p className="text-xs text-stone-500 font-sans">
                    {currentLanguage === 'kn'
                      ? 'ನಂ. 133, ನಾಗರಹಳ್ಳಿ, ರಾಯನಕೆರೆ ಅಂಚೆ, ಜಯಪುರ ಹೋಬಳಿ, ಮೈಸೂರು 570008, ಕರ್ನಾಟಕ'
                      : 'No. 133, Nagarthalli, Rayanakere Post, Jayapura Hobli, Mysore 570008, Karnataka'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. VISION AND MISSION                                                     */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] uppercase tracking-widest">
              <Target className="w-4 h-4 text-[#C5A059]" />
              <span>{t('ethosBadge')}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A365D]">
              {t('visionTitle')} &amp; {t('missionTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              {t('ethosSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision Box */}
            <div className="p-8 bg-[#FBF9F5] border border-stone-200 rounded-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#1A365D] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-bold text-[#C5A059] uppercase tracking-wider block">{t('visionTitle')}</span>
                    <h3 className="font-serif text-xl font-bold text-[#1A365D]">
                      {t('visionTitle')}
                    </h3>
                  </div>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed font-sans pt-2">
                  {t('visionDesc')}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 text-xs font-sans text-stone-500">
                <span>{t('visionMandate')}</span>
              </div>
            </div>

            {/* Mission Box */}
            <div className="p-8 bg-[#FBF9F5] border border-stone-200 rounded-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#1A365D] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-bold text-[#C5A059] uppercase tracking-wider block">{t('missionTitle')}</span>
                    <h3 className="font-serif text-xl font-bold text-[#1A365D]">
                      {t('missionTitle')}
                    </h3>
                  </div>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed font-sans pt-2">
                  {t('missionDesc')}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 text-xs font-sans text-stone-500">
                <span>{t('missionMandate')}</span>
              </div>
            </div>

          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('about')}
              className="text-xs font-sans font-bold text-[#1A365D] hover:text-[#C5A059] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('statementOfFaithLink')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. ACADEMIC PROGRAMS PREVIEW                                              */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F4F1EA] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#1A365D] uppercase tracking-widest">
                <BookOpen className="w-4 h-4 text-[#C5A059]" />
                <span>{t('programsBadge')}</span>
                <span aria-hidden="true" className="text-stone-400">/</span>
                <span>Asia Theological Association Accredited</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A365D]">
                {t('programsHeading')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-2xl">
                {t('programsPreviewSub')}
              </p>
            </div>

            <button
              onClick={() => onNavigate('programs')}
              className="px-4 py-2.5 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-sans font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>{t('navPrograms')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid of Preview Programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewPrograms.map((prog) => (
              <div
                key={prog.code}
                className="bg-white border border-stone-300 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-[#C5A059] transition-colors"
              >
                <div className="space-y-3">
                  {/* Top degree code & level */}
                  <div className="border-b border-stone-100 pb-3">
                    <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider block">
                      {prog.level}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1A365D] mt-0.5 leading-snug">
                      {currentLanguage === 'kn' ? (prog.titleKn || prog.title) : prog.title}
                    </h3>
                    <span className="font-mono text-xs text-stone-500 font-semibold">({prog.code})</span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {prog.description}
                  </p>

                  <div className="pt-2 space-y-1.5 text-[11px] font-sans text-stone-600 border-t border-stone-100">
                    <div>
                      <strong className="text-stone-800 font-semibold">{t('programDurationLabel')}:</strong> {prog.duration}
                    </div>
                    <div>
                      <strong className="text-stone-800 font-semibold">{t('programStudyFormatLabel')}:</strong> {prog.mode}
                    </div>
                    <div>
                      <strong className="text-stone-800 font-semibold">{t('programMediumLabel')}:</strong> {prog.medium}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onSelectProgram) {
                        onSelectProgram(prog.id);
                      }
                      onNavigate('programs');
                    }}
                    className="text-xs font-sans font-bold text-[#1A365D] hover:text-[#C5A059] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t('viewProgramDetailsBtn')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectProgram) {
                        onSelectProgram(prog.id);
                      } else {
                        onNavigate('admissions');
                      }
                    }}
                    className="text-xs font-sans font-bold text-[#C5A059] hover:underline cursor-pointer"
                  >
                    {t('navApplyNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border border-stone-300 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-600">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-bold text-stone-800">{t('distanceBoxTitle')}</span>
              <p className="text-stone-600">
                {t('distanceBoxDesc')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('programs')}
              className="text-xs font-bold text-[#1A365D] hover:text-[#C5A059] whitespace-nowrap cursor-pointer underline"
            >
              {t('distanceBoxLink')}
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. CAMPUS GALLERY PREVIEW                                                 */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#1A365D] uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>{t('galleryBadge')}</span>
                <span aria-hidden="true" className="text-stone-300">/</span>
                <span>Nagarthalli, Mysore</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A365D]">
                {t('galleryHeading')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-xl">
                {t('galleryPreviewSub')}
              </p>
            </div>

            <button
              onClick={() => onNavigate('campus')}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs font-sans font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>{t('viewFullGalleryBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1A365D]" />
            </button>
          </div>

          {/* 4 Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {campusPreviews.map((facility, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('campus')}
                className="group bg-stone-50 border border-stone-300 rounded-lg overflow-hidden hover:border-[#C5A059] transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                  <img
                    src={facility.img}
                    alt={facility.title}
                    onError={(e) => handleImageError(e, 'campus')}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="font-serif font-bold text-stone-900 text-sm leading-snug group-hover:text-[#1A365D] transition-colors">
                    {facility.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-sans leading-tight">
                    {facility.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('campus')}
              className="text-xs font-sans font-bold text-[#1A365D] hover:text-[#C5A059] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('viewFullGalleryBtn')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. PRINCIPAL MESSAGE PREVIEW                                              */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-[#FBF9F5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-5xl mx-auto bg-white border border-stone-300 rounded-xl p-6 sm:p-10 shadow-sm space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#1A365D] uppercase tracking-widest">
              <Quote className="w-4 h-4 text-[#C5A059]" />
              <span>{t('principalWelcomeBadge')}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Principal Photo & Details (4 cols) */}
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg overflow-hidden border-2 border-stone-300 shadow bg-stone-100">
                  <img
                    src={getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal')}
                    alt="Rev. Santhosh K. Chacko, Principal"
                    onError={(e) => handleImageError(e, 'principal')}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif font-bold text-lg text-[#1A365D]">
                    {currentLanguage === 'kn' ? institutionInfo.principalKn : institutionInfo.principal}
                  </h3>
                  <p className="text-xs text-[#C5A059] font-sans font-bold">
                    {currentLanguage === 'kn' ? 'ಪ್ರಾಂಶುಪಾಲರು & ಸಂಸ್ಥಾಪಕರು' : 'Principal & Founder'}
                  </p>
                  <p className="font-mono text-[11px] text-stone-500">
                    M.Th (New Testament), B.D, B.Th
                  </p>
                </div>
              </div>

              {/* Principal Excerpt Prose (8 cols) */}
              <div className="md:col-span-8 space-y-4 text-stone-700 font-sans text-sm sm:text-base leading-relaxed">
                <p className="italic font-serif text-stone-800 text-base sm:text-lg">
                  {t('principalQuote')}
                </p>
                <p>
                  {t('principalPara2')}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate('faculty')}
                    className="px-4 py-2 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-sans font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t('readFacultyRosterBtn')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${institutionInfo.phone}?text=Hello%20Principal%20Rev.%20Santhosh%20Chacko%2C%20I%20am%20inquiring%20about%20theological%20studies%20at%20NEST%20Mysore.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    <span>{t('whatsappPrincipalDeskBtn')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. ADMISSIONS AND CONTACT                                                 */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] uppercase tracking-widest">
              <GraduationCap className="w-4 h-4 text-[#C5A059]" />
              <span>{t('academicCalendarBadge')}</span>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <span>Intake Open</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A365D]">
              {t('campusContactDeskTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Applications are reviewed on a rolling basis. Both regular on-campus residential enrollment and distance education registrations are accepted.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 6 Columns: Admission Procedure Overview */}
            <div className="lg:col-span-6 bg-[#FBF9F5] border border-stone-200 rounded-lg p-6 sm:p-8 space-y-5">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A365D]">
                {t('admProcTitle')}
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm font-sans text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#1A365D] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('admProcStep1Title')}</strong>
                    <span className="text-stone-600">
                      {t('admProcStep1Desc')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#1A365D] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('admProcStep2Title')}</strong>
                    <span className="text-stone-600">
                      {t('admProcStep2Desc')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#1A365D] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('admProcStep3Title')}</strong>
                    <span className="text-stone-600">
                      {t('admProcStep3Desc')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#1A365D] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('admProcStep4Title')}</strong>
                    <span className="text-stone-600">
                      {t('admProcStep4Desc')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-5 py-2.5 bg-[#D4AF37] text-[#1A365D] hover:bg-stone-900 hover:text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{t('registerOnlineNowBtn')}</span>
                </button>

                <button
                  onClick={onOpenApplyModal}
                  className="px-4 py-2.5 border border-stone-300 hover:bg-white text-stone-800 font-sans font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  {t('quickInquiryBtn')}
                </button>
              </div>

            </div>

            {/* Right 6 Columns: Contact Details & Office Hours */}
            <div className="lg:col-span-6 bg-white border border-stone-300 rounded-lg p-6 sm:p-8 space-y-5">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A365D]">
                {t('campusContactDeskTitle')}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('campusAddressLabel')}</strong>
                    <span>No. 133, Nagarthalli, Rayanakere P. O, Jayapura Hobli, Mysore 570008, Karnataka, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('admissionsHotlineLabel')}</strong>
                    <a href={`tel:${institutionInfo.phone}`} className="text-[#1A365D] font-mono font-bold hover:underline">
                      {institutionInfo.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('officialEmailLabel')}</strong>
                    <a href={`mailto:${institutionInfo.email}`} className="text-[#1A365D] hover:underline">
                      {institutionInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('officeHoursLabel')}</strong>
                    <span>{t('officeHoursValue')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 bg-[#1A365D] hover:bg-[#204373] text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t('viewDirectionsBtn')}</span>
                </button>

                <a
                  href={`tel:${institutionInfo.phone}`}
                  className="px-4 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-800 font-sans font-semibold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{t('contactBtnDirectCall')}</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
