import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Phone, 
  Mail, 
  School,
  Building,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { FacultyMember } from '../types';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface FacultySectionProps {
  onOpenApplyModal?: () => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ onOpenApplyModal }) => {
  const { currentLanguage, t } = useLanguage();
  const { facultyList, institutionInfo } = useAdminData();
  const INSTITUTION_INFO = institutionInfo;

  return (
    <section id="faculty" className="py-20 bg-[#F4F1EA] text-slate-900 border-t-2 border-[#D4AF37]/50 relative overflow-hidden">
      
      {/* Decorative background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A365D_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLanguage === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ನಾಯಕತ್ವ' : 'Institutional Leadership'}</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>Resident Faculty Body</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            {currentLanguage === 'kn' ? 'ಪ್ರಿನ್ಸಿಪಾಲ್ ಮತ್ತು ಬೋಧಕ ವೃಂದ' : 'Principal & Teaching Faculty'}
          </h2>

          <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
            {currentLanguage === 'kn'
              ? 'ಏಷ್ಯಾ ಥಿಯಾಲಾಜಿಕಲ್ ಅಸೋಸಿಯೇಷನ್ (ATA India) ಮಾನ್ಯತೆ ಪಡೆದ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಾಗಿ, ಅಧಿಕೃತ ದೇವತಾಶಾಸ್ತ್ರ ವಿದ್ವಾಂಸರು ಮತ್ತು ಅನುಭವಿ ಸಭಾಪಾಲಕರು ನಮ್ಮ ಬೋಧಕ ವೃಂದವನ್ನು ಮುನ್ನಡೆಸುತ್ತಿದ್ದಾರೆ.'
              : 'Native Evangelical School of Theology is guided by accredited theological educators and experienced ministers, maintaining academic standards recognized by Asia Theological Association (ATA India).'}
          </p>
        </div>

        {/* Principal Official Profile Card */}
        <div className="bg-[#1A365D] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Principal Photo */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-[#D4AF37] shadow-2xl bg-black">
                  <img
                    src={getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal')}
                    alt="Rev. Santhosh K. Chacko, Principal"
                    onError={(e) => handleImageError(e, 'principal')}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#112440] border border-[#D4AF37] text-[10px] font-sans font-bold text-[#D4AF37] uppercase tracking-wider shadow">
                  Principal
                </div>
              </div>
            </div>

            {/* Principal Verified Details */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <div className="space-y-1.5">
                <span className="text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-widest block">
                  Official Institutional Principal
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  {t('principalName')}
                </h3>
                <p className="text-[#D4AF37] font-sans font-semibold text-sm sm:text-base">
                  {t('principalRole')}
                </p>
              </div>

              {/* Verified Qualification Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 border border-[#D4AF37]/40 text-xs sm:text-sm font-mono text-[#D4AF37] font-bold">
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                <span>M.Th (New Testament) • B.D • B.Th</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-slate-400 font-bold block">
                    {currentLanguage === 'kn' ? 'ಸಂಸ್ಥೆ ಮತ್ತು ವಿಳಾಸ:' : 'Institution & Location:'}
                  </span>
                  <span className="text-slate-200 block">NEST, No. 133, Nagarthalli, Rayanakere P. O, Mysore 570008</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-slate-400 font-bold block">
                    {currentLanguage === 'kn' ? 'ಮಾನ್ಯತೆ:' : 'Accreditation:'}
                  </span>
                  <span className="text-slate-200 block">Asia Theological Association India (ATA India)</span>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href={`https://wa.me/${INSTITUTION_INFO.phone}?text=Hello%20Principal%20Rev.%20Santhosh%20Chacko%2C%20I%20am%20inquiring%20about%20NEST%20Mysore.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded bg-[#128C7E] hover:bg-[#075E54] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow transition-colors cursor-pointer"
                >
                  <span>Principal Desk (WhatsApp)</span>
                </a>

                <a
                  href={`tel:${INSTITUTION_INFO.phone}`}
                  className="px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37] font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{INSTITUTION_INFO.phoneFormatted}</span>
                </a>

                <a
                  href={`mailto:${INSTITUTION_INFO.email}`}
                  className="px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white border border-white/30 font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{INSTITUTION_INFO.email}</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Clean Faculty Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#D1C7B7] pb-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
              {currentLanguage === 'kn' ? 'ಅಧಿಕೃತ ಬೋಧಕ ಸದಸ್ಯರು' : 'Resident Teaching Faculty'}
            </h3>
            <span className="text-xs font-sans font-bold text-slate-600">
              ATA India Accredited Institution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {facultyList.filter((m: FacultyMember) => m.id !== 'santhosh-chacko').map((member: FacultyMember) => {
              const name = currentLanguage === 'kn' ? (member.nameKn || member.name) : member.name;
              const title = currentLanguage === 'kn' ? (member.titleKn || member.title) : member.title;
              const qualification = currentLanguage === 'kn' ? (member.qualificationKn || member.qualification) : member.qualification;
              const rawPhoto = member.photo || (member.id === 'santhosh-chacko' ? 'assets/aistudio/pricipal_7db520a9.webp' : 'assets/aistudio/techers_e3355ac8.webp');
              const photoUrl = getAssetUrl(rawPhoto, 'faculty');

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl p-6 border-2 border-[#D1C7B7] hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-center sm:items-start"
                >
                  {/* Photo */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-[#D4AF37] flex-shrink-0 bg-slate-100 shadow">
                    <img
                      src={photoUrl}
                      alt={name}
                      onError={(e) => handleImageError(e, 'faculty')}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-center sm:text-left flex-grow">
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1A365D]">
                        {name}
                      </h4>
                      <p className="text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-wide">
                        {title}
                      </p>
                    </div>

                    <div className="inline-block px-3 py-1 rounded bg-[#F4F1EA] border border-[#D1C7B7] text-xs font-mono font-semibold text-slate-800">
                      {qualification}
                    </div>

                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-600 font-sans">
                      <School className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Native Evangelical School of Theology, Mysore</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Academic Notice Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D1C7B7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#1A365D]">
              {currentLanguage === 'kn'
                ? 'ಶೈಕ್ಷಣಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ನವೀಕರಣಗಳು'
                : 'Academic Verification & Faculty Records'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
              {currentLanguage === 'kn'
                ? 'NEST ಸಂಸ್ಥೆಯ ಎಲ್ಲಾ ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಬೋಧಕ ವಿವರಗಳು ಏಷ್ಯಾ ಥಿಯಾಲಾಜಿಕಲ್ ಅಸೋಸಿಯೇಷನ್ (ATA India) ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿವೆ.'
                : 'All faculty appointments and academic qualifications conform to Asia Theological Association (ATA India) accreditation criteria. For administrative inquiries, contact the Principal\'s Office.'}
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3">
            <a
              href={INSTITUTION_INFO.accreditation.directoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded bg-[#1A365D] hover:bg-[#112440] text-[#D4AF37] border border-[#D4AF37] text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow transition-colors"
            >
              <span>ATA Directory Listing</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
