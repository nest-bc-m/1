import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  ArrowRight 
} from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../../data/nestData';
import { useLanguage } from '../../context/LanguageContext';

interface ProgramsPageProps {
  onNavigate: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
  onSelectProgramToApply: (programId: string) => void;
  selectedProgramId?: string;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onSelectProgramToApply,
  selectedProgramId,
}) => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'regular' | 'distance'>('all');
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(selectedProgramId || 'm-div');

  // Auto-switch tab and expand if a specific program was selected
  React.useEffect(() => {
    if (selectedProgramId) {
      setExpandedProgramId(selectedProgramId);
      if (selectedProgramId.includes('distance')) {
        setActiveTab('distance');
      }
    }
  }, [selectedProgramId]);

  const filteredPrograms = ACADEMIC_PROGRAMS.filter((prog) => {
    if (activeTab === 'regular') return prog.programCategory === 'Regular';
    if (activeTab === 'distance') return prog.programCategory === 'Distance';
    return true;
  });

  return (
    <div className="bg-[#FBF9F5] text-stone-800 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#1A365D] text-white border-b-4 border-[#C5A059] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">Academic Catalog</span>
            <span aria-hidden="true">·</span>
            <span>Asia Theological Association India (ATA India) Accredited</span>
            <span aria-hidden="true">·</span>
            <span>Academic Year 2026–2027</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Academic Programs &amp; Theological Curriculum
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Rigorous undergraduate, graduate, and modular distance theological curricula structured around original biblical languages, systematic theology, church history, and supervised pastoral ministry.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Category Selector Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
              Degree Offerings Directory
            </h2>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Select study category to view curriculum, admission eligibility, and course duration.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Programs ({ACADEMIC_PROGRAMS.length})
            </button>
            <button
              onClick={() => setActiveTab('regular')}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded transition-colors cursor-pointer ${
                activeTab === 'regular'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Residential On-Campus
            </button>
            <button
              onClick={() => setActiveTab('distance')}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded transition-colors cursor-pointer ${
                activeTab === 'distance'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Distance Education
            </button>
          </div>
        </div>

        {/* Program Cards Listing */}
        <div className="space-y-8">
          {filteredPrograms.map((program) => {
            const isExpanded = expandedProgramId === program.id;
            return (
              <div
                key={program.id}
                id={`program-${program.id}`}
                className="bg-white border border-stone-300 rounded-lg shadow-sm hover:border-[#C5A059] transition-all overflow-hidden"
              >
                {/* Header Strip */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#C5A059] uppercase tracking-wider">
                        <span className="font-bold">{program.degreeLevel} Degree</span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span>{program.programCategory === 'Regular' ? 'Residential Campus' : 'External Distance'}</span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span>{program.ataAccredited ? 'ATA India Accredited' : 'Seminary Certificate'}</span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
                        {program.title} <span className="font-mono text-lg font-normal text-stone-500">({program.code})</span>
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-3xl pt-1">
                        {program.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => onSelectProgramToApply(program.id)}
                        className="px-4 py-2 bg-[#D4AF37] hover:bg-stone-900 hover:text-white text-[#1A365D] text-xs font-sans font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Apply</span>
                      </button>
                    </div>
                  </div>

                  {/* Academic Key Metric Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-stone-100 text-xs font-sans text-stone-700">
                    <div className="space-y-1">
                      <span className="text-stone-400 font-medium block">Duration:</span>
                      <span className="font-semibold text-stone-900">{program.duration}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-stone-400 font-medium block">Study Format:</span>
                      <span className="font-semibold text-stone-900">{program.mode}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-stone-400 font-medium block">Medium of Instruction:</span>
                      <span className="font-semibold text-stone-900">{program.language}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-stone-400 font-medium block">Eligibility:</span>
                      <span className="font-semibold text-stone-900 line-clamp-2" title={program.eligibility}>
                        {program.eligibility}
                      </span>
                    </div>
                  </div>

                  {/* Syllabus / Topics Section */}
                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-[#1A365D] flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#C5A059]" />
                        <span>Curriculum &amp; Course Topics</span>
                      </h4>

                      <button
                        onClick={() => setExpandedProgramId(isExpanded ? null : program.id)}
                        className="text-xs font-sans text-stone-500 hover:text-[#1A365D] underline cursor-pointer"
                      >
                        {isExpanded ? 'Hide Syllabus Topics' : 'Show All Topics'}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="bg-[#FBF9F5] border border-stone-200 rounded p-4 sm:p-6 mt-3 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(program.curriculumTopics || []).map((topic, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2.5 text-xs text-stone-700">
                              <span className="font-mono text-[#C5A059] font-bold text-[11px] shrink-0 mt-0.5">
                                {String(tIdx + 1).padStart(2, '0')}.
                              </span>
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>

                        {program.contactClasses && (
                          <div className="pt-3 border-t border-stone-200 text-xs text-stone-600">
                            <strong className="text-stone-800">Class &amp; Practical Structure:</strong> {program.contactClasses}
                          </div>
                        )}

                        {program.targetAudience && (
                          <div className="text-xs text-stone-600">
                            <strong className="text-stone-800">Target Candidate:</strong> {program.targetAudience}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Academic Regulations & Standards Notice */}
        <section className="bg-white border border-stone-300 rounded-lg p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
          <h3 className="font-serif text-lg font-bold text-[#1A365D]">
            Academic Regulations &amp; Degree Conferral
          </h3>
          <p>
            All academic programs adhere to Asia Theological Association India (ATA India) credit guidelines. Degree conferral requires satisfactory completion of all lecture credits, passing written comprehensive examinations, submission of academic theses or capstone ministry portfolios, and full attendance in daily chapel devotions and supervised weekend church placements.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('admissions')}
              className="px-5 py-2.5 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-sans font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Proceed to Admission Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-4 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-sans uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Review ATA Accreditation
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};
