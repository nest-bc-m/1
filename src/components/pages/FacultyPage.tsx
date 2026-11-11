import React from 'react';
import { 
  GraduationCap, 
  Phone, 
  Quote 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminData } from '../../context/AdminDataContext';
import { getAssetUrl, handleImageError } from '../../utils/assetHelper';

interface FacultyPageProps {
  onNavigate: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
  onOpenApplyModal: () => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const { currentLanguage } = useLanguage();
  const { facultyList, institutionInfo } = useAdminData();

  return (
    <div className="bg-[#FBF9F5] text-stone-800 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#1A365D] text-white border-b-4 border-[#C5A059] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">{currentLanguage === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ನಾಯಕತ್ವ' : 'Academic Leadership'}</span>
            <span aria-hidden="true">·</span>
            <span>{currentLanguage === 'kn' ? 'ಬೋಧಕ ವೃಂದ & ಸಭಾಪಾಲನಾ ಮಾರ್ಗದರ್ಶಕರು' : 'Resident Faculty & Pastoral Mentors'}</span>
            <span aria-hidden="true">·</span>
            <span>ATA India Recognized Scholars</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {currentLanguage === 'kn' ? 'ಪ್ರಾಂಶುಪಾಲರ ಸಂದೇಶ & ಅಧ್ಯಾಪಕ ವೃಂದ' : 'Principal\'s Address & Faculty Leadership'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {currentLanguage === 'kn' 
              ? 'ದೇವತಾಶಾಸ್ತ್ರ ಶಿಕ್ಷಣ ತಜ್ಞರು ಮತ್ತು ಅನುಭವಿ ಸಭಾಪಾಲಕರು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಸತ್ಯವೇದ ವ್ಯಾಖ್ಯಾನ, ಸಿದ್ಧಾಂತದ ಶುದ್ಧತೆ ಮತ್ತು ಕ್ರೈಸ್ತ ನಾಯಕತ್ವದಲ್ಲಿ ರೂಪಿಸುತ್ತಾರೆ.'
              : 'Theological educators and experienced pastors committed to mentoring students in sound biblical exegesis, doctrinal fidelity, and authentic Christian character.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* 1. Full Principal's Message & Profile */}
        <section className="bg-white border border-stone-300 rounded-lg p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider">
            <Quote className="w-4 h-4 text-[#C5A059]" />
            <span>Principal&apos;s Official Welcome</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Portrait & Credentials */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg overflow-hidden border-2 border-stone-300 shadow bg-stone-100">
                <img
                  src={getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal')}
                  alt="Rev. Santhosh K. Chacko, Principal"
                  onError={(e) => handleImageError(e, 'principal')}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-serif font-bold text-xl text-[#1A365D]">
                  {currentLanguage === 'kn' ? institutionInfo.principalKn : 'Rev. Santhosh K. Chacko'}
                </h2>
                <p className="text-xs text-[#C5A059] font-bold font-sans">
                  {currentLanguage === 'kn' ? 'ಪ್ರಾಂಶುಪಾಲರು & ಸಂಸ್ಥಾಪಕರು' : 'Principal & Founder'}
                </p>
                <div className="pt-1">
                  <span className="font-mono text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded inline-block">
                    M.Th (Old Testament), B.D.
                  </span>
                </div>
              </div>

              <div className="w-full border-t border-stone-200 pt-3 text-xs text-stone-600 space-y-1.5 text-left">
                <div>
                  <strong className="text-stone-800">Specialization:</strong> Old Testament Exegesis &amp; Pauline Epistles
                </div>
                <div>
                  <strong className="text-stone-800">Ministry:</strong> Pastoral Leadership &amp; Native Church Planting
                </div>
                <div>
                  <strong className="text-stone-800">Seminary:</strong> Native Evangelical School of Theology, Mysore
                </div>
              </div>

              <div className="w-full pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${institutionInfo.phone}`}
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider rounded border border-stone-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call: {institutionInfo.phoneFormatted}</span>
                </a>
                <a
                  href={`https://wa.me/${institutionInfo.phone}?text=Hello%20Principal%20Rev.%20Santhosh%20Chacko%2C%20I%20am%20inquiring%20about%20theological%20studies%20at%20NEST%20Mysore.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>WhatsApp Principal Desk</span>
                </a>
              </div>

            </div>

            {/* Right Column: Full Pastoral Message */}
            <div className="lg:col-span-8 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
              <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                Rooted in the Vine, Bearing Fruit for the Nations
              </h3>

              <p className="italic font-serif text-stone-800 text-lg leading-relaxed border-l-2 border-[#C5A059] pl-4 my-2">
                &ldquo;Our task is not merely to confer degrees, but to cultivate minds that treasure truth and hearts that burn for the proclamation of Jesus Christ.&rdquo;
              </p>

              <p>
                Dear prospective students, pastors, and partners in Christ,
              </p>

              <p>
                I warmly welcome you to the Native Evangelical School of Theology (NEST) in the historic, peaceful city of Mysore, Karnataka. When the Lord led us to establish this theological institution, the calling was clear: to raise an altar of sound biblical scholarship, disciplined prayer, and evangelistic fervor that directly addresses the needs of local congregations across India.
              </p>

              <p>
                We live in an age marked by theological compromise, superficial teaching, and a famine of the Word of God. The church urgently requires pastors, evangelists, and teachers who have wrestled deeply with the Scriptures in their original grammatical and historical contexts, who hold fast to sound doctrine, and who model the humility and servant-heart of our Lord Jesus Christ.
              </p>

              <p>
                At NEST, residential students experience daily communal worship in our chapel, intensive classroom exegesis from accredited faculty, and structured weekend ministry in neighboring villages. Our Distance Education programs extend this same high biblical standard to working pastors and church elders who faithfully serve while continuing their livelihoods.
              </p>

              <p>
                If God has placed a burden upon your heart to study His Word deeply, I encourage you to apply for our upcoming academic intake. May the Lord guide your steps as you prepare for His harvest.
              </p>

              <div className="pt-4 border-t border-stone-200">
                <p className="font-serif font-bold text-stone-900">
                  Rev. Santhosh K. Chacko
                </p>
                <p className="text-xs text-stone-500 font-sans">
                  Principal, Native Evangelical School of Theology
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* 2. Teaching Faculty & Academic Roster */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#C5A059]" />
              <span>Teaching Faculty</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
              Resident &amp; Visiting Faculty Cohort
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Our faculty members possess recognized theological qualifications accredited through the Asia Theological Association and extensive practical pastoral experience in church planting across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Faculty Roster Card 1 */}
            <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded bg-stone-100 overflow-hidden border border-stone-300 shrink-0">
                  <img
                    src={getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal')}
                    alt="Rev. Santhosh K. Chacko"
                    onError={(e) => handleImageError(e, 'principal')}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#C5A059] uppercase">Department of Old Testament</span>
                  <h3 className="font-serif font-bold text-lg text-[#1A365D]">Rev. Santhosh K. Chacko</h3>
                  <p className="text-xs text-stone-600 font-sans">Principal &amp; Senior Lecturer in Old Testament</p>
                  <p className="font-mono text-xs text-stone-500">M.Th (Old Testament), B.D.</p>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-sans pt-2 border-t border-stone-100">
                Lectures on Pauline Epistles, New Testament Greek Exegesis, Pastoral Ministry Ethics, and Homiletics. Over two decades of church planting leadership and pastoral mentorship in Karnataka.
              </p>
            </div>

            {/* Faculty Roster Card 2 */}
            <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded bg-stone-100 overflow-hidden border border-stone-300 shrink-0">
                  <img
                    src={getAssetUrl('assets/aistudio/techers_e3355ac8.webp', 'faculty')}
                    alt="Resident Teaching Faculty"
                    onError={(e) => handleImageError(e, 'faculty')}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#C5A059] uppercase">Departments of Theology &amp; Old Testament</span>
                  <h3 className="font-serif font-bold text-lg text-[#1A365D]">Resident &amp; Adjunct Theological Faculty</h3>
                  <p className="text-xs text-stone-600 font-sans">Scholarly Faculty Body &amp; Visiting Lecturers</p>
                  <p className="font-mono text-xs text-stone-500">ATA Recognized Master&apos;s &amp; Doctoral Qualifications</p>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-sans pt-2 border-t border-stone-100">
                Instructing courses across Old Testament Hebrew, Systematic Theology, Church History, Christian Apologetics, World Religions, and Indian Contextual Missions.
              </p>
            </div>

          </div>

        </section>

        {/* 3. Mentorship & Spiritual Formation Pillars */}
        <section className="bg-white border border-stone-300 rounded-lg p-8 sm:p-10 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
            Faculty Mentorship &amp; Spiritual Formation Model
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-700 font-sans">
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Personal Discipleship</h4>
              <p className="text-stone-600 leading-relaxed">
                Faculty members meet regularly with assigned student cohorts for prayer, personal counsel, and character accountability.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Communal Dining &amp; Fellowship</h4>
              <p className="text-stone-600 leading-relaxed">
                Faculty and students dine together in the college refectory, cultivating natural fellowship and informal theological discussion.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Supervised Field Outreach</h4>
              <p className="text-stone-600 leading-relaxed">
                Faculty accompany students on weekend outreach assignments to observe, critique, and encourage their preaching and pastoral care.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('admissions')}
            className="px-6 py-3 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-sans font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
            <span>Apply to Study Under NEST Faculty</span>
          </button>
        </div>

      </div>

    </div>
  );
};
