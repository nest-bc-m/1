import React from 'react';
import { 
  Award, 
  BookOpen, 
  ExternalLink, 
  ChevronRight 
} from 'lucide-react';
import { INSTITUTION_INFO, STATEMENT_OF_FAITH } from '../../data/nestData';
import { useLanguage } from '../../context/LanguageContext';
import { NestLogo } from '../NestLogo';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
  onOpenApplyModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const { currentLanguage, t } = useLanguage();

  return (
    <div className="bg-[#FBF9F5] text-stone-800 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#1A365D] text-white border-b-4 border-[#C5A059] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">{t('navAbout')}</span>
            <span aria-hidden="true">·</span>
            <span>Est. Mysore, Karnataka</span>
            <span aria-hidden="true">·</span>
            <span>ATA India Accredited</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t('aboutHeading')}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {t('aboutSub')}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* 1. History & Foundation */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
              Institutional Foundation &amp; Ethos
            </h2>

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                Native Evangelical School of Theology was established in Mysore, Karnataka, to provide an academic and devotional sanctuary where God&apos;s called servants receive rigorous theological training. Rather than treating theology as an abstract philosophical discipline, the college grounds its instruction in the verbal inspiration and complete trustworthiness of the Old and New Testament Scriptures.
              </p>
              <p>
                The college is situated in Nagarthalli, Mysore, offering a peaceful, distraction-free environment conducive to focused biblical reflection, Hebrew and Greek linguistic exegesis, and communal prayer. Students from Karnataka, neighboring southern states, and diverse linguistic regions across India live and study together in a supportive residential fellowship.
              </p>
              <p>
                Under the leadership of Principal Rev. Santhosh K. Chacko, NEST combines scholarly lectures with mandatory weekend pastoral fieldwork, ensuring that academic study translates directly into active church ministry, discipleship, and evangelistic outreach in rural and urban communities.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-200 text-xs">
              <div className="p-4 bg-white border border-stone-200 rounded">
                <span className="font-mono font-bold text-[#C5A059] block text-sm">2012</span>
                <span className="font-semibold text-stone-900 block mt-1">Foundation</span>
                <span className="text-stone-500">Established to train native pastors in Karnataka.</span>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded">
                <span className="font-mono font-bold text-[#C5A059] block text-sm">ATA India</span>
                <span className="font-semibold text-stone-900 block mt-1">Accredited Member</span>
                <span className="text-stone-500">Asia Theological Association recognized degrees.</span>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded">
                <span className="font-mono font-bold text-[#C5A059] block text-sm">Residential</span>
                <span className="font-semibold text-stone-900 block mt-1">Nagarthalli Campus</span>
                <span className="text-stone-500">Hostels, chapel, library, and dining facilities.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-stone-300 rounded-lg p-6 space-y-4 shadow-sm">
            <div className="flex justify-center">
              <NestLogo size="lg" variant="badge" />
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Institution:</span>
                <span className="font-bold text-stone-900 text-right">Native Evangelical School of Theology</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Principal:</span>
                <span className="font-semibold text-stone-800">Rev. Santhosh K. Chacko</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Location:</span>
                <span className="text-stone-800">Mysore, Karnataka</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Postal Code:</span>
                <span className="font-mono text-stone-800">570008</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Medium:</span>
                <span className="text-stone-800">English / Bilingual (Kannada)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200">
              <a
                href={INSTITUTION_INFO.accreditation.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Verify on ATA Directory</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </div>
          </div>
        </section>

        {/* 2. Accreditation Detail */}
        <section className="bg-white border border-stone-300 rounded-lg p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider">
            <Award className="w-4 h-4 text-[#C5A059]" />
            <span>Official Recognition</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
            Accreditation by Asia Theological Association India (ATA India)
          </h2>

          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <p>
              Native Evangelical School of Theology is an accredited institutional member of the <strong>Asia Theological Association India (ATA India)</strong>. ATA accreditation validates that NEST satisfies rigorous standards of academic governance, curriculum design, faculty qualification, library resources, physical infrastructure, and spiritual accountability.
            </p>
            <p>
              Degrees conferred under ATA accreditation—including the <strong>Master of Divinity (M.Div)</strong>, <strong>Bachelor of Theology (B.Th)</strong>, and <strong>Diploma in Theology (Dip.Th)</strong>—are recognized by evangelical seminaries, mission agencies, and Christian denominations throughout Asia and internationally for further graduate studies and ordained ministry.
            </p>
          </div>

          <div className="bg-[#FBF9F5] border border-stone-200 rounded p-5 space-y-2 text-xs text-stone-700">
            <span className="font-bold text-[#1A365D] uppercase tracking-wider block">Official Directory Reference:</span>
            <p className="font-sans">
              Asia Theological Association (ATA) India Institutional Directory: 
              <a 
                href={INSTITUTION_INFO.accreditation.directoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1A365D] font-mono ml-1 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>ataindia.org/institution/native-evangelical-school-of-theology-2/</span>
                <ExternalLink className="w-3 h-3 text-[#C5A059]" />
              </a>
            </p>
          </div>
        </section>

        {/* 3. Statement of Faith / Doctrinal Basis */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
              <span>{t('faithBadge')}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
              {t('faithHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              {t('faithSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATEMENT_OF_FAITH.map((article, idx) => (
              <div 
                key={article.id} 
                className="bg-white border border-stone-300 rounded-lg p-6 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#C5A059] border-b border-stone-100 pb-2">
                    <span className="font-bold">{currentLanguage === 'kn' ? `ಪ್ರಮಾಣ ${idx + 1}` : `Article ${idx + 1}`}</span>
                    <span>{article.scriptureReferences[0]}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1A365D]">
                    {currentLanguage === 'kn' ? article.titleKn : article.title}
                  </h3>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {currentLanguage === 'kn' ? article.fullDescriptionKn : article.fullDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] font-sans text-stone-500 space-y-1">
                  <span className="font-semibold text-stone-700 block">{currentLanguage === 'kn' ? 'ಸತ್ಯವೇದ ಉಲ್ಲೇಖಗಳು:' : 'Scripture References:'}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {article.scriptureReferences.map((ref, rIdx) => (
                      <span key={rIdx} className="font-mono text-stone-600">
                        {ref}{rIdx < article.scriptureReferences.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Medium of Instruction & Language Policy */}
        <section className="bg-white border border-stone-300 rounded-lg p-8 sm:p-10 space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
            {currentLanguage === 'kn' ? 'ಬೋಧನಾ ಭಾಷೆಗಳು ಮತ್ತು ಪ್ರಾದೇಶಿಕ ನೀತಿ' : 'Languages of Instruction & Regional Policy'}
          </h2>
          <div className="space-y-3 text-stone-700 text-xs sm:text-sm leading-relaxed max-w-4xl">
            <p>
              <strong>{currentLanguage === 'kn' ? 'ಪದವಿ ಕೋರ್ಸ್‌ಗಳು (M.Div & B.Th):' : 'Degree Programs (M.Div & B.Th):'}</strong> {currentLanguage === 'kn' ? 'ಎಲ್ಲಾ ಉಪನ್ಯಾಸಗಳು, ಪರೀಕ್ಷೆಗಳು ಮತ್ತು ಪ್ರಬಂಧಗಳಿಗೆ ಇಂಗ್ಲಿಷ್ ಪ್ರಾಥಮಿಕ ಮಾಧ್ಯಮವಾಗಿದೆ. ಇದು ATA India ಮಾನದಂಡಗಳಿಗೆ ಅನುಗುಣವಾಗಿದ್ದು, ಅಂತಾರಾಷ್ಟ್ರೀಯ ದೇವತಾಶಾಸ್ತ್ರ ಸಾಹಿತ್ಯವನ್ನು ಅಧ್ಯಯನ ಮಾಡಲು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನೆರವಾಗುತ್ತದೆ.' : 'English is the primary official medium of instruction for all lectures, examinations, research papers, and academic theses. This ensures alignment with ATA India standards and enables students to engage international theological literature.'}
            </p>
            <p>
              <strong>{currentLanguage === 'kn' ? 'ಡಿಪ್ಲೊಮಾ ಇನ್ ಥಿಯಾಲಜಿ (Dip.Th):' : 'Diploma in Theology (Dip.Th):'}</strong> {currentLanguage === 'kn' ? 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ದ್ವಿಭಾಷಾ ರೂಪದಲ್ಲಿ ಬೋಧಿಸಲಾಗುತ್ತದೆ. ಗ್ರಾಮೀಣ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಲ್ಲಿ ಸೇವೆ ಮಾಡುವ ಸ್ಥಳೀಯ ಸೇವಕರು ಮತ್ತು ಸುವಾರ್ತಿಕರಿಗೆ ಇದು ಅತ್ಯಂತ ಸೂಕ್ತವಾಗಿದೆ.' : 'Taught in a bilingual format combining Kannada and English to equip native workers, evangelists, and village pastors who serve predominantly in regional vernacular contexts.'}
            </p>
            <p>
              <strong>{currentLanguage === 'kn' ? 'ಮೂಲ ಬೈಬಲ್ ಭಾಷೆಗಳು:' : 'Biblical Languages:'}</strong> {currentLanguage === 'kn' ? 'ವಸತಿಯುತ ಪದವಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಹೊಸ ಒಡಂಬಡಿಕೆಯ ಗ್ರೀಕ್ ಮತ್ತು ಹೀಬ್ರೂ ವ್ಯಾಕರಣವನ್ನು ಕಲಿಯುತ್ತಾರೆ, ಇದು ಮೂಲ ಸತ್ಯವೇದ ಪಠ್ಯಗಳನ್ನು ಆಳವಾಗಿ ವ್ಯಾಖ್ಯಾನಿಸಲು ನೆರವಾಗುತ್ತದೆ.' : 'All residential degree students receive instruction in Biblical Greek (New Testament) and Hebrew grammar (M.Div track) to develop independent exegesis skills from the original texts.'}
            </p>
          </div>
        </section>

        {/* Call to action */}
        <div className="p-8 bg-[#1A365D] text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold text-white">
              {currentLanguage === 'kn' ? 'NEST ಕಾಲೇಜಿನಲ್ಲಿ ದೇವತಾಶಾಸ್ತ್ರ ಕಲಿಯಲು ಸಿದ್ಧರಿದ್ದೀರಾ?' : 'Ready to pursue theological studies at NEST?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('admissionsOpen')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('admissions')}
              className="px-5 py-2.5 bg-[#D4AF37] text-[#1A365D] hover:bg-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer shadow"
            >
              {t('navApplyNow')}
            </button>
            <button
              onClick={() => onNavigate('programs')}
              className="px-4 py-2.5 border border-white/40 hover:bg-white/10 text-white font-sans text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('navPrograms')}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
