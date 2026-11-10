import React from 'react';
import { Award, ShieldCheck, CheckCircle2, ExternalLink, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface AccreditationSectionProps {
  onOpenApplyModal: () => void;
}

export const AccreditationSection: React.FC<AccreditationSectionProps> = ({ onOpenApplyModal }) => {
  const { currentLanguage, t } = useLanguage();
  const { institutionInfo } = useAdminData();
  const INSTITUTION_INFO = institutionInfo;

  const degrees = [
    {
      code: 'B.Th',
      title: {
        en: 'Bachelor of Theology',
        kn: 'ಬ್ಯಾಚುಲರ್ ಆಫ್ ಥಿಯಾಲಜಿ',
        hi: 'बैचलर ऑफ थियोलॉजी',
        ta: 'பேச்சிலர் ஆஃப் தியாலஜி',
        te: 'బ్యాచిలర్ ఆఫ్ థియాలజీ',
        ml: 'ബാച്ചിലർ ഓഫ് തിയോളജി',
      },
      duration: {
        en: '3 Years · English Medium',
        kn: '3 ವರ್ಷಗಳು · ಇಂಗ್ಲಿಷ್',
        hi: '3 वर्ष · अंग्रेजी माध्यम',
        ta: '3 ஆண்டுகள் · ஆங்கில வழி',
        te: '3 సంవత్సరాలు · ఇంగ్లీష్',
        ml: '3 വർഷം · ഇംഗ്ലീഷ് മാധ്യമം',
      },
    },
    {
      code: 'M.Div',
      title: {
        en: 'Master of Divinity',
        kn: 'ಮಾಸ್ಟರ್ ಆಫ್ ಡಿವಿನಿಟಿ',
        hi: 'मास्टर ऑफ डिविनिटी',
        ta: 'மாஸ்டர் ஆஃப் டிவினிட்டி',
        te: 'మాస్టర్ ఆఫ్ డివినిటీ',
        ml: 'മാസ്റ്റർ ഓഫ് ഡിവിനിറ്റി',
      },
      duration: {
        en: '2–3 Years · English Medium',
        kn: '2-3 ವರ್ಷಗಳು · ಇಂಗ್ಲಿಷ್',
        hi: '2–3 वर्ष · अंग्रेजी माध्यम',
        ta: '2–3 ஆண்டுகள் · ஆங்கில வழி',
        te: '2–3 సంవత్సరాలు · ఇంగ్లీష్',
        ml: '2–3 വർഷം · ഇംഗ്ലീഷ് മാധ്യമം',
      },
    },
    {
      code: 'Dip.Th',
      title: {
        en: 'Diploma in Theology',
        kn: 'ಡಿಪ್ಲೊಮಾ ಇನ್ ಥಿಯಾಲಜಿ',
        hi: 'डिप्लोमा इन थियोलॉजी',
        ta: 'டிப்ளமோ இன் தியாலஜி',
        te: 'డిప్లొమా ఇన్ థియాలజీ',
        ml: 'ഡിപ്ലോമ ഇൻ തിയോളജി',
      },
      duration: {
        en: '2 Years · Kannada & English',
        kn: '2 ವರ್ಷಗಳು · ಕನ್ನಡ & Eng',
        hi: '2 वर्ष · कन्नड़ व अंग्रेजी',
        ta: '2 ஆண்டுகள் · கன்னடம் & Eng',
        te: '2 సంవత్సరాలు · కన్నడ & Eng',
        ml: '2 വർഷം · കന്നഡ & Eng',
      },
    },
  ];

  return (
    <section id="accreditation" className="py-16 sm:py-24 bg-[#E9E4DB] text-[#2D2D2D] border-b-2 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('accreditationBadge')}</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>Asia Theological Association</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            {t('accreditationHeading')}
          </h2>
          
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            {t('accreditationSummary')}
          </p>
        </div>

        {/* Master Accreditation & Governance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Official ATA India Accreditation Verification (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              {/* Header with ATA Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#D1C7B7]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Accreditation Verification</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                    Asia Theological Association India
                  </h3>
                  <p className="text-xs text-slate-600 font-sans">
                    Regional Evangelical Accrediting Agency for Theological Institutions across Asia
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] text-xs font-bold font-sans uppercase tracking-widest text-center self-start sm:self-center">
                  Accredited Member
                </div>
              </div>

              {/* Accredited Degrees List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1A365D] uppercase tracking-wider block font-sans">
                  ATA India Accredited Theological Degree Programs:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {degrees.map((deg) => (
                    <div key={deg.code} className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#D1C7B7] text-center space-y-1">
                      <span className="font-bold text-sm text-[#1A365D] block">{deg.code}</span>
                      <span className="text-[11px] text-slate-700 font-medium block">
                        {deg.title[currentLanguage] || deg.title.en}
                      </span>
                      <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block font-sans">
                        {deg.duration[currentLanguage] || deg.duration.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Standards Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-[#D1C7B7] text-xs text-slate-700 font-sans">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1A365D] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-[#1A365D]">Evangelical Doctrinal Integrity:</strong> Adherence to sound biblical exposition, historical orthodoxy, and Christ-centered hermeneutics.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1A365D] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-[#1A365D]">Qualified Resident Faculty:</strong> Highly trained theological educators holding postgraduate and research credentials.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1A365D] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-[#1A365D]">Theological Research Library:</strong> Biblical commentaries, languages reference resources, and historical texts.
                  </span>
                </div>
              </div>
            </div>

            {/* Official Directory Link Button */}
            <div className="pt-4 border-t border-[#D1C7B7] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-600 font-sans">
                Official Directory Listing ID:{' '}
                <code className="font-mono font-bold text-[#1A365D]">native-evangelical-school-of-theology-2</code>
              </span>
              
              <a
                href={INSTITUTION_INFO.accreditation.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#1A365D] hover:bg-[#112440] text-[#D4AF37] font-sans font-bold text-xs uppercase tracking-wider rounded border border-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t('viewAtaDirectory')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Card 2: Principal's Office & Institutional Leadership (5 Cols) */}
          <div className="lg:col-span-5 bg-[#1A365D] text-white rounded-2xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              
              {/* Principal Lockup with Authentic Photo */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-white/20">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37] flex-shrink-0 shadow-md bg-black">
                  <img
                    src={getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal')}
                    alt={t('principalName')}
                    onError={(e) => handleImageError(e, 'principal')}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider block font-sans">
                    Institutional Leadership
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                    {t('principalName')}
                  </h3>
                  <span className="text-xs text-slate-300 font-sans">
                    Head of Institution · NEST Mysore
                  </span>
                </div>
              </div>

              {/* Verified Principal Qualifications & Office Information */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#112440]/80 p-4 rounded-xl border border-white/10">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                    Academic Credentials
                  </span>
                  <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded text-xs">
                    M.Th, B.D, B.Th
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rev. Santhosh K. Chacko oversees institutional governance, ATA accreditation compliance, faculty appointments, and theological student mentorship in Mysore.
                </p>
              </div>

              {/* Direct Official Contact Registry */}
              <div className="space-y-2.5 text-xs text-slate-200 font-sans">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{t('campusAddress')}</span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <a href={`tel:${INSTITUTION_INFO.phone}`} className="font-mono text-[#D4AF37] font-bold hover:underline">
                    {INSTITUTION_INFO.phoneFormatted}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <a href={`mailto:${INSTITUTION_INFO.email}`} className="font-mono text-slate-200 hover:text-[#D4AF37] hover:underline">
                    {INSTITUTION_INFO.email}
                  </a>
                </div>
              </div>

            </div>

            {/* Application CTA */}
            <div className="pt-4 border-t border-white/20">
              <button
                onClick={onOpenApplyModal}
                className="w-full py-3 rounded bg-[#D4AF37] hover:bg-white text-[#1A365D] font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t('navApplyNow')} 2026–2027</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
