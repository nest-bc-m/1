import React from 'react';
import { BookOpen, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OfficialLanguagesCard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#1A365D] text-white rounded-2xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D4AF37] block">
              Medium of Instruction Policy
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Official Academic Medium &amp; Language Policy
            </h3>
          </div>
        </div>

        <div className="px-3 py-1 rounded bg-[#112440] border border-[#D4AF37]/40 text-xs font-sans text-[#D4AF37] font-bold uppercase tracking-wider self-start sm:self-center">
          ATA India Standard
        </div>
      </div>

      {/* Grid of the 2 Academic Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Track 1: English Medium (Official) */}
        <div className="p-5 rounded-xl bg-[#112440] border-2 border-[#D4AF37] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇬🇧</span>
              <div>
                <h4 className="font-serif font-bold text-lg text-white">English Medium</h4>
                <span className="text-xs text-[#D4AF37] font-sans font-bold uppercase tracking-wider">
                  Primary Official Medium
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-[#D4AF37] text-[#1A365D] font-bold text-[10px] uppercase tracking-wider">
              B.Th &amp; M.Div
            </span>
          </div>

          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            All primary theological coursework, lectures, reference libraries, original Greek &amp; Hebrew exegesis, and academic degree dissertations are conducted in <strong>English</strong>.
          </p>

          <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs font-sans text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span><strong>B.Th (Bachelor of Theology):</strong> 3 Years · English Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span><strong>M.Div (Master of Divinity):</strong> 2–3 Years · English Medium</span>
            </div>
          </div>
        </div>

        {/* Track 2: Diploma in Theology (English & Kannada Combined) */}
        <div className="p-5 rounded-xl bg-[#112440] border border-[#D4AF37]/70 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇮🇳</span>
              <div>
                <h4 className="font-serif font-bold text-lg text-white">ಕನ್ನಡ &amp; English (Combined)</h4>
                <span className="text-xs text-[#D4AF37] font-sans font-bold uppercase tracking-wider">
                  Diploma in Theology (Dip.Th)
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-white/10 text-slate-200 font-bold text-[10px] uppercase tracking-wider">
              Bilingual Track
            </span>
          </div>

          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            For grassroots church planters, evangelists, and pastoral workers in Karnataka, the <strong>Diploma in Theology (Dip.Th)</strong> is taught in a combined <strong>English &amp; Kannada</strong> medium for immediate regional field application.
          </p>

          <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs font-sans text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span><strong>Dip.Th (Diploma in Theology):</strong> 2 Years · Bilingual</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span>Practical rural evangelism and church ministry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Clarification Notice */}
      <div className="p-4 rounded-xl bg-[#112440] border border-[#D4AF37]/40 flex items-center gap-3 text-xs font-sans text-slate-300">
        <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
        <p>
          <strong className="text-white">Institutional Notice:</strong> Core ATA-accredited degree programs (B.Th, M.Div) are conducted in <strong>English Medium</strong>. The <strong>Diploma in Theology (Dip.Th)</strong> is offered in <strong>Combined Kannada &amp; English</strong> to empower native ministers in South India.
        </p>
      </div>
    </div>
  );
};
