import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  ExternalLink,
  Navigation,
  Train,
  Bus,
  CheckCircle2
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';

interface ContactPageProps {
  onNavigate: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { institutionInfo } = useAdminData();
  const { currentLanguage, t } = useLanguage();

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    program: 'b-th',
    message: '',
  });
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `Hello Principal Rev. Santhosh Chacko,\nName: ${inquiryForm.name}\nPhone: ${inquiryForm.phone}\nEmail: ${inquiryForm.email}\nProgram: ${inquiryForm.program}\nMessage: ${inquiryForm.message}`
    );
    const url = `https://wa.me/${institutionInfo.phone}?text=${encoded}`;
    setWhatsAppUrl(url);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Ignored
    }
    setIsSent(true);
  };

  return (
    <div className="bg-[#FBF9F5] text-stone-800 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#1A365D] text-white border-b-4 border-[#C5A059] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">{t('navContact')}</span>
            <span aria-hidden="true">·</span>
            <span>Nagarthalli Post, Mysore - 570008</span>
            <span aria-hidden="true">·</span>
            <span>Administrative Office</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t('campusContactDeskTitle')}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {currentLanguage === 'kn'
              ? 'ಪ್ರವೇಶ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ, ಪ್ರವೇಶ ಮಾಹಿತಿ ಪಡೆಯಿರಿ ಅಥವಾ ಮೈಸೂರಿನಲ್ಲಿರುವ ನಮ್ಮ ವಸತಿಯುತ ಕ್ಯಾಂಪಸ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.'
              : 'Reach the admissions office, request prospectus materials, or visit our residential campus in Mysore, Karnataka.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Contact Information & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Institutional Directory */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-300 rounded-lg p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
                {t('campusContactDeskTitle')}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('campusAddressLabel')}</strong>
                    <span>No. 133, Nagarthalli, Rayanakere P. O, Jayapura Hobli, Mysore 570008, Karnataka, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('admissionsHotlineLabel')}</strong>
                    <a href={`tel:${institutionInfo.phone}`} className="font-mono font-bold text-[#1A365D] hover:underline">
                      {institutionInfo.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('officialEmailLabel')}</strong>
                    <a href={`mailto:${institutionInfo.email}`} className="text-[#1A365D] hover:underline">
                      {institutionInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{t('officeHoursLabel')}</strong>
                    <span>{t('officeHoursValue')}</span>
                    <span className="block text-stone-500 text-xs mt-0.5">{currentLanguage === 'kn' ? 'ಸಭಾ ಸೇವೆಗಾಗಿ ಭಾನುವಾರ ರಜೆ ಇರುತ್ತದೆ' : 'Closed on Sundays for church ministry'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-col gap-2">
                <a
                  href={institutionInfo.socialLinks.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#D4AF37]" />
                  <span>{currentLanguage === 'kn' ? 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                </a>

                <a
                  href={`https://wa.me/${institutionInfo.phone}?text=Hello%20Principal%20Rev.%20Santhosh%20Chacko%2C%20I%20am%20inquiring%20about%20NEST%20Mysore.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('whatsappPrincipalDeskBtn')}</span>
                </a>
              </div>
            </div>

            {/* Public Transit Guide */}
            <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-4 shadow-sm text-xs text-stone-700">
              <h3 className="font-serif font-bold text-base text-[#1A365D]">
                Transit &amp; Directions from Mysore
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">From Mysore City Railway Station (MYS):</strong>
                    <span>Approximately 15 km via HD Kote / Hunsur Road. Auto-rickshaws and cabs operate directly to Rayanakere Post / Nagarthalli.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bus className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">From Mysore City Suburban Bus Stand:</strong>
                    <span>Regular city buses ply towards Jayapura Hobli / Rayanakere. Alight at Nagarthalli bus stop.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Campus Inquiry Desk Form */}
          <div className="lg:col-span-7 bg-white border border-stone-300 rounded-lg p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider block">
                Direct Inquiry Desk
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
                Send an Admissions Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Complete this brief inquiry to receive prompt guidance directly from our Admissions Office.
              </p>
            </div>

            {isSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif font-bold text-lg text-emerald-900">Inquiry Dispatched</h3>
                <p className="text-xs text-emerald-800 font-sans max-w-md mx-auto">
                  Your inquiry message was prepared for Principal Rev. Santhosh K. Chacko. If WhatsApp did not open automatically, tap the button below.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {whatsAppUrl && (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5 shadow"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open in WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-4 py-2 border border-emerald-600 text-emerald-800 hover:bg-emerald-100 text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700 block">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="e.g. John Thomas"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A365D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700 block">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A365D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700 block">Email Address</label>
                    <input
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="e.g. applicant@example.com"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A365D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700 block">Program of Interest</label>
                    <select
                      value={inquiryForm.program}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, program: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A365D] bg-white"
                    >
                      <option value="m-div">Master of Divinity (M.Div - Residential)</option>
                      <option value="b-th">Bachelor of Theology (B.Th - Residential)</option>
                      <option value="dip-th">Diploma in Theology (Dip.Th - Residential)</option>
                      <option value="b-th-distance">B.Th (Distance Education)</option>
                      <option value="m-div-distance">M.Div (Distance Education)</option>
                      <option value="dip-th-distance">Dip.Th (Distance Education)</option>
                      <option value="c-min-distance">C.Min (Distance Certificate)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Your Inquiry / Questions *</label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    placeholder="Inquire regarding eligibility, hostel boarding, distance education modules, or schedule a campus visit..."
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A365D]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Admissions Desk</span>
                  </button>
                </div>
              </form>
            )}

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-sans">
              <span>Ready for formal application?</span>
              <button
                onClick={() => onNavigate('admissions')}
                className="font-bold text-[#1A365D] hover:underline cursor-pointer"
              >
                Go to Online Admission Registration →
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
