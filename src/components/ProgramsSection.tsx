import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Globe, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  FileText, 
  Languages,
  X,
  GraduationCap,
  Building2,
  Laptop,
  Users,
  Compass,
  Calendar,
  Check,
  HelpCircle,
  PhoneCall,
  Info
} from 'lucide-react';
import { AcademicProgram } from '../types';
import { OfficialLanguagesCard } from './OfficialLanguagesCard';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';

interface ProgramsSectionProps {
  onSelectProgramToApply: (programId: string) => void;
}

type CategoryFilter = 'All' | 'Regular' | 'Distance';
type LevelFilter = 'All' | 'Bachelor' | 'Master' | 'Diploma' | 'Certificate';

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgramToApply }) => {
  const { programsList, institutionInfo } = useAdminData();
  const { currentLanguage, t } = useLanguage();
  const INSTITUTION_INFO = institutionInfo;

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Regular');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [selectedProgramModal, setSelectedProgramModal] = useState<AcademicProgram | null>(null);

  // Filter programs based on both Category (Regular / Distance) and Level (Bachelor / Master / Diploma / Certificate)
  const filteredPrograms = programsList.filter((program) => {
    const matchesCategory = 
      categoryFilter === 'All' 
        ? true 
        : program.programCategory === categoryFilter;

    const matchesLevel = 
      levelFilter === 'All' 
        ? true 
        : program.degreeLevel === levelFilter;

    return matchesCategory && matchesLevel;
  });

  const regularCount = programsList.filter(p => p.programCategory === 'Regular').length;
  const distanceCount = programsList.filter(p => p.programCategory === 'Distance').length;

  return (
    <section id="programs" className="py-20 sm:py-28 bg-[#F4F1EA] text-[#2D2D2D] border-b border-[#D1C7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('programsBadge')}</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>ATA India Accredited</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            {t('programsHeading')}
          </h2>

          <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
            {t('programsSub')}
          </p>

          {/* Primary Distinction: Regular vs Distance Education Selector */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <div className="inline-flex p-1.5 bg-[#E9E4DB] rounded-2xl border-2 border-[#D1C7B7] shadow-inner max-w-full overflow-x-auto">
              <button
                onClick={() => setCategoryFilter('Regular')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
                  categoryFilter === 'Regular'
                    ? 'bg-[#1A365D] text-[#D4AF37] shadow-md border border-[#D4AF37]'
                    : 'text-slate-700 hover:text-[#1A365D] hover:bg-white/60'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t('regularClassesTab')}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  categoryFilter === 'Regular' ? 'bg-[#D4AF37] text-[#1A365D]' : 'bg-[#D1C7B7] text-slate-700'
                }`}>
                  {regularCount}
                </span>
              </button>

              <button
                onClick={() => setCategoryFilter('Distance')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
                  categoryFilter === 'Distance'
                    ? 'bg-emerald-900 text-emerald-200 shadow-md border border-emerald-400'
                    : 'text-slate-700 hover:text-emerald-900 hover:bg-white/60'
                }`}
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>{t('distanceEduTab')}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  categoryFilter === 'Distance' ? 'bg-emerald-400 text-emerald-950' : 'bg-[#D1C7B7] text-slate-700'
                }`}>
                  {distanceCount}
                </span>
              </button>

              <button
                onClick={() => setCategoryFilter('All')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                  categoryFilter === 'All'
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{t('allProgramsTab')}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-300 text-slate-800">
                  {programsList.length}
                </span>
              </button>
            </div>

            {/* Secondary Degree Level Filter */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-1 font-sans">
              {(['All', 'Bachelor', 'Master', 'Diploma', 'Certificate'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-[#1A365D] text-white shadow-sm'
                      : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-[#D1C7B7]'
                  }`}
                >
                  {lvl === 'All' ? 'All Degree Levels' : lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Regular vs Distance Overview Comparison Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D1C7B7] shadow-sm">
          
          {/* Regular Pathway Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            categoryFilter === 'Regular'
              ? 'border-2 border-[#1A365D] bg-[#1A365D]/5 ring-1 ring-[#1A365D]/20'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A365D] text-[#D4AF37] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1A365D]">
                  Regular Classes (Residential On-Campus)
                </h3>
                <p className="text-xs text-[#D4AF37] font-bold font-sans uppercase tracking-wider">
                  Full-Time Ministry Preparation · Mysore Campus
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans mb-4">
              Immersive 2 to 3-year full-time theological formation in Mysore. Combines in-depth classroom lectures with daily 8:00 AM chapel devotions, library research, Greek/Hebrew study, dining fellowship, and supervised weekend field evangelism.
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
              <div className="p-2.5 rounded-lg bg-white border border-[#D1C7B7]">
                <span className="font-bold text-[#1A365D] block">Study Schedule</span>
                <span className="text-slate-700">Mon–Fri Daily Classes + Weekend Fieldwork</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#D1C7B7]">
                <span className="font-bold text-[#1A365D] block">Accommodation</span>
                <span className="text-slate-700">Residential Hostel & Dining Provided</span>
              </div>
            </div>
          </div>

          {/* Distance Pathway Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            categoryFilter === 'Distance'
              ? 'border-2 border-emerald-700 bg-emerald-50 ring-1 ring-emerald-500/20'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Distance Education (External / Flexible TEE)
                </h3>
                <p className="text-xs text-emerald-700 font-bold font-sans uppercase tracking-wider">
                  Home Study for Pastors &amp; Working Leaders
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans mb-4">
              Structured correspondence &amp; modular courses for working pastors, evangelists, church elders, and professionals who cannot relocate to Mysore. Complete study materials, assignments, online lectures, and periodic contact seminars.
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
              <div className="p-2.5 rounded-lg bg-white border border-[#D1C7B7]">
                <span className="font-bold text-emerald-900 block">Study Format</span>
                <span className="text-slate-700">Self-Paced Modular Packs &amp; Assignments</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#D1C7B7]">
                <span className="font-bold text-emerald-900 block">Contact Seminars</span>
                <span className="text-slate-700">Annual Intensive Seminars &amp; Webinars</span>
              </div>
            </div>
          </div>

        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => {
            const isRegular = program.programCategory === 'Regular';

            return (
              <div
                key={program.id}
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-xl ${
                  program.featured
                    ? isRegular 
                      ? 'border-2 border-[#D4AF37] ring-1 ring-[#D4AF37]/40'
                      : 'border-2 border-emerald-500 ring-1 ring-emerald-400/40'
                    : 'border-[#D1C7B7] hover:border-[#1A365D]'
                }`}
              >
                {/* Top Distinct Ribbon */}
                <div className={`px-4 py-1.5 text-[10px] font-sans font-bold uppercase tracking-widest text-center flex items-center justify-between border-b ${
                  isRegular
                    ? 'bg-[#1A365D] text-[#D4AF37] border-[#D4AF37]/40'
                    : 'bg-emerald-900 text-emerald-200 border-emerald-700/60'
                }`}>
                  <span className="inline-flex items-center gap-1.5">
                    {isRegular ? <Building2 className="w-3 h-3 text-[#D4AF37]" /> : <Globe className="w-3 h-3 text-emerald-300" />}
                    <span>{isRegular ? 'Regular On-Campus' : 'Distance Education'}</span>
                  </span>
                  <span>{program.degreeLevel} Level</span>
                </div>

                <div className="p-6 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    {/* Code & Duration Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-[#E9E4DB] pb-3">
                      <div>
                        <span className={`text-xl font-serif font-extrabold ${isRegular ? 'text-[#1A365D]' : 'text-emerald-950'}`}>
                          {program.code}
                        </span>
                        <span className="text-slate-400 mx-1.5">·</span>
                        <span className="text-xs font-sans font-bold text-slate-700">
                          {currentLanguage === 'kn' ? (program.durationKn || program.duration) : program.duration}
                        </span>
                      </div>
                      <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-[#F4F1EA] text-[#D4AF37] border border-[#D1C7B7]">
                        ATA India
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className={`font-serif text-xl sm:text-2xl font-bold mb-2 leading-snug ${
                        isRegular ? 'text-[#1A365D]' : 'text-emerald-950'
                      }`}>
                        {currentLanguage === 'kn' ? (program.titleKn || program.title) : program.title}
                      </h3>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                        {currentLanguage === 'kn' ? (program.descriptionKn || program.description) : program.description}
                      </p>
                    </div>

                    {/* Key Course Specifications Matrix */}
                    <div className="space-y-2.5 pt-3 border-t border-[#E9E4DB] text-xs font-sans">
                      
                      {/* Eligibility */}
                      <div className="p-2.5 rounded-lg bg-[#F4F1EA]/80 border border-[#D1C7B7]/60">
                        <span className="font-bold text-[#1A365D] block text-[11px] uppercase tracking-wider mb-0.5">
                          {t('eligibilityLabel')}
                        </span>
                        <span className="text-slate-800 text-[11px] leading-relaxed line-clamp-2">
                          {currentLanguage === 'kn' ? (program.eligibilityKn || program.eligibility) : program.eligibility}
                        </span>
                      </div>

                      {/* Study Mode & Delivery */}
                      <div className="flex items-start gap-2 text-slate-700">
                        <span className="font-bold text-[#1A365D] min-w-[70px]">Mode:</span>
                        <span className="text-slate-800 font-medium">
                          {currentLanguage === 'kn' ? (program.modeKn || program.mode) : program.mode}
                        </span>
                      </div>

                      {/* Medium */}
                      <div className="flex items-start gap-2 text-slate-700">
                        <span className="font-bold text-[#1A365D] min-w-[70px]">Medium:</span>
                        <span className="text-slate-800 font-medium">
                          {currentLanguage === 'kn' ? (program.languageKn || program.language) : program.language}
                        </span>
                      </div>

                      {/* Contact / Delivery Note */}
                      {program.contactClasses && (
                        <div className="flex items-start gap-2 text-slate-700">
                          <span className="font-bold text-[#1A365D] min-w-[70px]">Classes:</span>
                          <span className="text-slate-800 text-[11px] line-clamp-2">
                            {currentLanguage === 'kn' ? (program.contactClassesKn || program.contactClasses) : program.contactClasses}
                          </span>
                        </div>
                      )}

                      {/* Curriculum Preview if available */}
                      {program.curriculumTopics && program.curriculumTopics.length > 0 && (
                        <div className="pt-2 border-t border-[#E9E4DB]">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            Core Modules Preview ({program.curriculumTopics.length} Subjects):
                          </span>
                          <ul className="space-y-1 text-[11px] text-slate-700">
                            {(currentLanguage === 'kn' && program.curriculumTopicsKn ? program.curriculumTopicsKn : program.curriculumTopics)
                              .slice(0, 2)
                              .map((topic, idx) => (
                                <li key={idx} className="flex items-center gap-1.5 truncate">
                                  <Check className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                                  <span className="truncate">{topic}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                    </div>

                  </div>

                  {/* View Details Modal Trigger */}
                  <div className="pt-4 border-t border-[#E9E4DB]">
                    <button
                      onClick={() => setSelectedProgramModal(program)}
                      className="w-full py-2.5 rounded-xl bg-[#F4F1EA] hover:bg-[#E9E4DB] text-[#1A365D] font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#D1C7B7]"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{t('viewSyllabusBtn')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className={`p-4 border-t flex items-center justify-between font-sans ${
                  isRegular 
                    ? 'bg-[#1A365D] border-[#D4AF37]/50 text-white' 
                    : 'bg-emerald-950 border-emerald-500/50 text-white'
                }`}>
                  <span className={`text-xs font-bold ${isRegular ? 'text-[#D4AF37]' : 'text-emerald-300'}`}>
                    July 2026 Intake
                  </span>

                  <button
                    onClick={() => onSelectProgramToApply(program.id)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1A365D] bg-[#D4AF37] hover:bg-white rounded transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Languages Policy Card */}
        <OfficialLanguagesCard />

        {/* Admissions Counseling Callout */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Personal Guidance on Program Selection</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
              Uncertain Between Regular Classes &amp; Distance Education?
            </h4>
            <p className="text-sm text-slate-700 font-sans max-w-2xl leading-relaxed">
              Principal Rev. Santhosh K. Chacko and the Admissions Committee are happy to counsel you on course eligibility, study mode flexibility, and residential hostel reservations.
            </p>
          </div>

          <a
            href={`tel:${INSTITUTION_INFO.phone}`}
            className="px-6 py-3.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1A365D] bg-[#D4AF37] hover:bg-[#1A365D] hover:text-white rounded-xl transition-all whitespace-nowrap flex-shrink-0 inline-flex items-center gap-2 shadow-md cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Admissions Desk: {INSTITUTION_INFO.phoneFormatted}</span>
          </a>
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgramModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112440]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProgramModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 space-y-6 text-[#2D2D2D]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E9E4DB] pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    selectedProgramModal.programCategory === 'Regular'
                      ? 'bg-[#1A365D] text-[#D4AF37]'
                      : 'bg-emerald-800 text-emerald-200'
                  }`}>
                    {selectedProgramModal.programCategory === 'Regular' ? '🏛️ Regular On-Campus Class' : '🌐 Distance Education / External'}
                  </span>
                  <span className="text-xs font-sans font-bold text-[#D4AF37]">
                    ATA India Accredited · {selectedProgramModal.degreeLevel} Level
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
                  {currentLanguage === 'kn' ? (selectedProgramModal.titleKn || selectedProgramModal.title) : selectedProgramModal.title} ({selectedProgramModal.code})
                </h3>
              </div>

              <button
                onClick={() => setSelectedProgramModal(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="space-y-6 text-sm text-slate-700 font-sans">
              
              {/* Overview */}
              <div>
                <h5 className="font-bold text-[#1A365D] uppercase tracking-wider text-xs mb-1.5">
                  Program Overview:
                </h5>
                <p className="leading-relaxed text-slate-800">
                  {currentLanguage === 'kn' ? (selectedProgramModal.descriptionKn || selectedProgramModal.description) : selectedProgramModal.description}
                </p>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-5 bg-[#F4F1EA] rounded-2xl border border-[#D1C7B7] text-xs">
                <div>
                  <span className="font-bold text-[#1A365D] block uppercase tracking-wider mb-0.5">Duration:</span>
                  <span className="text-slate-800 font-medium">
                    {currentLanguage === 'kn' ? (selectedProgramModal.durationKn || selectedProgramModal.duration) : selectedProgramModal.duration}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#1A365D] block uppercase tracking-wider mb-0.5">Study Mode:</span>
                  <span className="text-slate-800 font-medium">
                    {currentLanguage === 'kn' ? (selectedProgramModal.modeKn || selectedProgramModal.mode) : selectedProgramModal.mode}
                  </span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-[#D1C7B7]">
                  <span className="font-bold text-[#1A365D] block uppercase tracking-wider mb-0.5">Instruction Medium:</span>
                  <span className="text-slate-800 font-medium">
                    {currentLanguage === 'kn' ? (selectedProgramModal.languageKn || selectedProgramModal.language) : selectedProgramModal.language}
                  </span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-[#D1C7B7]">
                  <span className="font-bold text-[#1A365D] block uppercase tracking-wider mb-0.5">Eligibility Requirements:</span>
                  <span className="text-slate-800 font-medium leading-relaxed">
                    {currentLanguage === 'kn' ? (selectedProgramModal.eligibilityKn || selectedProgramModal.eligibility) : selectedProgramModal.eligibility}
                  </span>
                </div>
                {selectedProgramModal.contactClasses && (
                  <div className="sm:col-span-2 pt-2 border-t border-[#D1C7B7]">
                    <span className="font-bold text-[#1A365D] block uppercase tracking-wider mb-0.5">Class Schedule &amp; Contact:</span>
                    <span className="text-slate-800 font-medium leading-relaxed">
                      {currentLanguage === 'kn' ? (selectedProgramModal.contactClassesKn || selectedProgramModal.contactClasses) : selectedProgramModal.contactClasses}
                    </span>
                  </div>
                )}
                {selectedProgramModal.targetAudience && (
                  <div className="sm:col-span-2 pt-2 border-t border-[#D1C7B7]">
                    <span className="font-bold text-[#1A365D] block uppercase tracking-wider mb-0.5">Ideal Candidates:</span>
                    <span className="text-slate-800 font-medium leading-relaxed">
                      {currentLanguage === 'kn' ? (selectedProgramModal.targetAudienceKn || selectedProgramModal.targetAudience) : selectedProgramModal.targetAudience}
                    </span>
                  </div>
                )}
                <div className="sm:col-span-2 pt-2 border-t border-[#D1C7B7]">
                  <span className="font-bold text-[#1A365D] block uppercase tracking-wider mb-0.5">Accreditation:</span>
                  <span className="text-[#D4AF37] font-bold">Asia Theological Association India (ATA India)</span>
                </div>
              </div>

              {/* Distance Learning Process Guidance (If Distance) */}
              {selectedProgramModal.programCategory === 'Distance' && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    <Info className="w-4 h-4 text-emerald-700" />
                    <span>How Distance Education Works at NEST:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                      <span><strong>Course Modules:</strong> Comprehensive study packages and reading material dispatched directly to your location.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                      <span><strong>Assignments &amp; Mentoring:</strong> Periodic module questionnaires submitted for faculty evaluation and telephone/WhatsApp support.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                      <span><strong>Contact Seminars:</strong> Annual intensive contact seminars at Mysore campus or live virtual webinar workshops.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Curriculum Breakdown */}
              {selectedProgramModal.curriculumTopics && selectedProgramModal.curriculumTopics.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-[#1A365D] uppercase tracking-wider text-xs">
                      Curriculum &amp; Course Syllabus ({selectedProgramModal.curriculumTopics.length} Units):
                    </h5>
                    <span className="text-[11px] text-slate-500 font-sans">Structured Syllabus</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {(currentLanguage === 'kn' && selectedProgramModal.curriculumTopicsKn ? selectedProgramModal.curriculumTopicsKn : selectedProgramModal.curriculumTopics).map((topic, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <span className="w-5 h-5 rounded-full bg-[#1A365D] text-[#D4AF37] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-slate-800 font-medium leading-relaxed">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#E9E4DB] flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
              <button
                onClick={() => setSelectedProgramModal(null)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  const progId = selectedProgramModal.id;
                  setSelectedProgramModal(null);
                  onSelectProgramToApply(progId);
                }}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1A365D] bg-[#D4AF37] hover:bg-[#1A365D] hover:text-white rounded-xl shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <span>Proceed to Apply for {selectedProgramModal.code}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
