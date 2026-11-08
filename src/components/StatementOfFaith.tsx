import React, { useState } from 'react';
import { BookOpen, ShieldCheck, ChevronDown, ChevronUp, Check, BookMarked, Sparkles } from 'lucide-react';
import { STATEMENT_OF_FAITH } from '../data/nestData';
import { useLanguage } from '../context/LanguageContext';

export const StatementOfFaith: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('scriptures');
  const { currentLanguage, t } = useLanguage();

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faith" className="py-16 sm:py-24 bg-white text-[#2D2D2D] border-b border-[#D1C7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#1A365D] text-xs font-sans font-bold uppercase tracking-widest border border-[#D4AF37]">
            {t('faithBadge')}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            {t('faithHeading')}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
            {t('faithSub')}
          </p>
        </div>

        {/* Doctrine Cards Accordion */}
        <div className="max-w-4xl mx-auto space-y-4 font-sans">
          {STATEMENT_OF_FAITH.map((article, index) => {
            const isExpanded = expandedId === article.id;
            const title = currentLanguage === 'kn' && article.titleKn ? article.titleKn : article.title;
            const summary = currentLanguage === 'kn' && article.summaryKn ? article.summaryKn : article.summary;
            const fullDesc = currentLanguage === 'kn' && article.fullDescriptionKn ? article.fullDescriptionKn : article.fullDescription;

            return (
              <div
                key={article.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-2 border-[#D4AF37] bg-[#F4F1EA] shadow-md ring-1 ring-[#D4AF37]/30'
                    : 'border-[#D1C7B7] bg-white hover:border-[#D4AF37]'
                }`}
              >
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A365D]">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {summary}
                      </p>
                    </div>
                  </div>
                  <div className="p-1 rounded text-slate-400 hover:text-slate-600 flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#1A365D]" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#D1C7B7] space-y-4 text-xs sm:text-sm text-slate-700 bg-white/70">
                    <div className="p-4 bg-white rounded-xl border border-[#D1C7B7] space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A365D]">
                        {currentLanguage === 'kn' ? 'ಸಂಪೂರ್ಣ ಸಿದ್ಧಾಂತದ ವಿವರಣೆ:' : 'Full Doctrinal Affirmation:'}
                      </h4>
                      <p className="leading-relaxed text-slate-700">{fullDesc}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-bold text-[#1A365D] flex items-center gap-1">
                        <BookMarked className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{currentLanguage === 'kn' ? 'ಸತ್ಯವೇದದ ವಚನ ಆಧಾರ:' : 'Scripture References:'}</span>
                      </span>
                      {article.scriptureReferences.map((ref, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-[#F4F1EA] text-[#1A365D] font-semibold text-xs border border-[#D1C7B7]"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
