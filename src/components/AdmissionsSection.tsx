import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Users, 
  HelpCircle, 
  Phone, 
  Mail, 
  Send, 
  Award, 
  Sparkles, 
  MessageSquare,
  Printer,
  FileCheck2
} from 'lucide-react';
import { INSTITUTION_INFO, ACADEMIC_PROGRAMS } from '../data/nestData';
import { AdmissionInquiry } from '../types';
import { OnlineAdmissionForm } from './OnlineAdmissionForm';
import { AdmissionReceiptA4 } from './AdmissionReceiptA4';

export const AdmissionsSection: React.FC = () => {
  const [admissionMode, setAdmissionMode] = useState<'online-form' | 'quick-whatsapp'>('online-form');
  const [formData, setFormData] = useState<AdmissionInquiry>({
    fullName: '',
    email: '',
    phone: '',
    cityState: '',
    programInterest: 'b-th',
    christianTestimony: '',
    churchAffiliation: '',
    preferredStartTerm: 'Academic Year 2026-2027 (July Intake)',
    housingNeeded: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedProgram = ACADEMIC_PROGRAMS.find(p => p.id === formData.programInterest) || ACADEMIC_PROGRAMS[0];
    const programName = `${selectedProgram.code} — ${selectedProgram.title} (${selectedProgram.duration})`;

    const messageLines = [
      `🎓 *NEW ADMISSION APPLICATION - NEST MYSORE*`,
      `━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Full Name:* ${formData.fullName}`,
      `*Phone / WhatsApp:* ${formData.phone}`,
      `*Email:* ${formData.email}`,
      `*City & State:* ${formData.cityState}`,
      `*Degree Program:* ${programName}`,
      `*Preferred Term:* ${formData.preferredStartTerm}`,
      `*Church & Pastor:* ${formData.churchAffiliation}`,
      formData.christianTestimony ? `*Testimony / Calling:* ${formData.christianTestimony}` : null,
      `*Hostel & Dining in Mysore:* ${formData.housingNeeded ? 'Yes, Required' : 'No / Not needed'}`,
      `━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Submitted directly to Principal Rev. Santhosh K. Chacko (+91 88801 11763)_`
    ].filter(Boolean);

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    const targetUrl = `https://wa.me/918880111763?text=${encodedText}`;
    setWhatsAppUrl(targetUrl);

    // Open WhatsApp directly
    window.open(targetUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      cityState: '',
      programInterest: 'b-th',
      christianTestimony: '',
      churchAffiliation: '',
      preferredStartTerm: 'Academic Year 2026-2027 (July Intake)',
      housingNeeded: true,
    });
  };

  return (
    <section id="admissions" className="py-16 sm:py-24 bg-white text-[#2D2D2D] border-b border-[#D1C7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
            <span>Admission Journey 2026–2027</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>Join Our Seminary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            Admissions &amp; Application Journey
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
            We welcome dedicated men and women called by God to be equipped for pastoral ministry, cross-cultural evangelism, and native leadership in Mysore.
          </p>

          {/* Registration Mode Selector */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setAdmissionMode('online-form')}
              className={`py-3 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                admissionMode === 'online-form'
                  ? 'bg-[#1A365D] text-white border-2 border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/30'
                  : 'bg-[#F4F1EA] text-slate-700 border-2 border-[#D1C7B7] hover:border-[#1A365D]'
              }`}
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Online Registration (Generates A4 Printable Receipt)</span>
            </button>

            <button
              onClick={() => setAdmissionMode('quick-whatsapp')}
              className={`py-3 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                admissionMode === 'quick-whatsapp'
                  ? 'bg-[#1A365D] text-white border-2 border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/30'
                  : 'bg-[#F4F1EA] text-slate-700 border-2 border-[#D1C7B7] hover:border-[#1A365D]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Quick WhatsApp Inquiry Desk</span>
            </button>
          </div>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              step: '01',
              title: 'Online Registration',
              desc: 'Submit your online registration form and instantly print your official A4 receipt with application number.',
            },
            {
              step: '02',
              title: 'Pastoral Reference',
              desc: 'Provide a recommendation letter from your local church pastor endorsing your Christian character.',
            },
            {
              step: '03',
              title: 'Faculty Interview',
              desc: 'Participate in a personal interview (in-person at Mysore campus or via telephone / video call).',
            },
            {
              step: '04',
              title: 'Enrollment & Arrival',
              desc: 'Receive your formal acceptance letter, secure your hostel room, and join the orientation week.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F4F1EA] border border-[#D1C7B7] rounded-2xl p-6 relative overflow-hidden group hover:border-[#D4AF37] transition-all hover:shadow-md"
            >
              <span className="text-4xl font-serif font-black text-[#D1C7B7]/50 group-hover:text-[#D4AF37]/30 transition-colors absolute top-4 right-4">
                {item.step}
              </span>
              <div className="relative z-10 space-y-2 font-sans">
                <span className="text-xs font-bold text-[#1A365D] uppercase tracking-widest">Step {item.step}</span>
                <h3 className="font-serif text-lg font-bold text-[#1A365D]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CONDITIONAL DISPLAY: MODE 1 (FULL REGISTRATION WITH A4 RECEIPT) vs MODE 2 (QUICK INQUIRY) */}
        {admissionMode === 'online-form' ? (
          <div className="space-y-12 mb-16">
            <OnlineAdmissionForm />

            {/* Application Requirements and Guidance Cards below the form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Required Documents Checklist */}
              <div className="bg-[#F4F1EA] border border-[#D1C7B7] rounded-2xl p-6 space-y-4 font-sans">
                <div className="flex items-center gap-2 text-[#1A365D] font-serif font-bold text-lg">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  <h4>Document Checklist</h4>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>Duly printed A4 Application Receipt generated by this portal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>Attested photocopies of SSLC / PUC / Degree marksheets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>Confidential recommendation letter from local church pastor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>Two passport-size photographs &amp; Government ID (Aadhaar).</span>
                  </li>
                </ul>
              </div>

              {/* Official Admissions & Academic Office Guidance */}
              <div className="bg-[#1A365D] text-white rounded-2xl p-6 space-y-4 shadow-md border-2 border-[#D4AF37]">
                <div className="flex items-center gap-2 font-serif font-bold text-lg text-white">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  <h4>ATA India Accreditation</h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  Native Evangelical School of Theology operates under the official accreditation of Asia Theological Association India (ATA India).
                </p>
                <div className="space-y-2 text-xs text-slate-200 border-t border-white/20 pt-3 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                    <span><strong>Accredited Degrees:</strong> B.Th (3 Yrs), M.Div (2-3 Yrs), Dip.Th (2 Yrs).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                    <span><strong>Residential Campus:</strong> Mysore, Karnataka, India.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                    <span><strong>Direct Desk:</strong> Principal (+91 88801 11763).</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="p-6 bg-[#F4F1EA] border border-[#D1C7B7] rounded-2xl space-y-3 text-xs sm:text-sm font-sans flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#1A365D] flex items-center gap-2 text-base font-serif mb-2">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>Direct Admissions Helpline</span>
                  </h4>
                  <p className="text-slate-700 text-xs">
                    Need guidance regarding degree choice, hostel rooms, or distance seminars? Contact our admissions desk directly:
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <a
                    href={`tel:${INSTITUTION_INFO.phone}`}
                    className="w-full py-2.5 px-4 bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call: {INSTITUTION_INFO.phoneFormatted}</span>
                  </a>
                  <a
                    href={`mailto:${INSTITUTION_INFO.email}?subject=Admission%20Question`}
                    className="w-full py-2.5 px-4 bg-white border border-[#D1C7B7] text-[#1A365D] hover:border-[#D4AF37] font-semibold text-xs rounded hover:bg-white transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{INSTITUTION_INFO.email}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Main Grid: Quick WhatsApp Inquiry Form on Left, Requirements on Right */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Quick Application / Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#F4F1EA] border border-[#D1C7B7] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b border-[#D1C7B7]">
                  <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                    Quick WhatsApp Inquiry Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                    Send your inquiry directly to the Principal&apos;s WhatsApp desk, or use the Online Registration tab above to generate an official printable A4 receipt.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-10 space-y-5 bg-white rounded-xl p-8 border-2 border-[#D4AF37] shadow-sm animate-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl font-bold text-[#1A365D]">Inquiry Sent to Principal&apos;s WhatsApp!</h4>
                      <p className="text-slate-700 text-sm max-w-md mx-auto font-sans">
                        Thank you, <strong className="text-[#1A365D]">{formData.fullName}</strong>. Your inquiry for <strong className="text-[#1A365D] underline decoration-[#D4AF37]">{formData.programInterest.toUpperCase()}</strong> has been prepared and sent to <strong>Rev. Santhosh K. Chacko (Principal)</strong>.
                      </p>
                    </div>
                    
                    {whatsAppUrl && (
                      <div className="pt-2 max-w-md mx-auto">
                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-md cursor-pointer uppercase tracking-wider"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>Open WhatsApp Chat with Principal (8880111763)</span>
                        </a>
                      </div>
                    )}

                    <div className="p-4 bg-[#F4F1EA] rounded-lg text-xs text-slate-700 max-w-md mx-auto text-left space-y-1 font-sans border border-[#D1C7B7]">
                      <p><strong>Principal Desk / Direct Phone:</strong> <span className="font-mono font-bold text-[#1A365D]">{INSTITUTION_INFO.phoneFormatted}</span></p>
                      <p><strong>Official Email:</strong> <span className="font-mono font-bold text-[#1A365D]">{INSTITUTION_INFO.email}</span></p>
                      <p className="text-slate-600">Address: {INSTITUTION_INFO.address}</p>
                    </div>
                    
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm font-sans">
                  
                  {/* WhatsApp Info Notice */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-emerald-900 text-xs">
                    <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      Application details will be forwarded directly to <strong>Rev. Santhosh K. Chacko (Principal)</strong> on WhatsApp (<strong>8880111763</strong>).
                    </span>
                  </div>
                  
                  {/* Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1A365D] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. John Samuel"
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1A365D] mb-1">
                        Contact Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      />
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1A365D] mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. pastor.john@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1A365D] mb-1">
                        City &amp; State of Residence <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cityState"
                        required
                        value={formData.cityState}
                        onChange={handleChange}
                        placeholder="e.g. Mysore, Karnataka"
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      />
                    </div>
                  </div>

                  {/* Program of Interest & Term */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1A365D] mb-1">
                        Program of Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="programInterest"
                        value={formData.programInterest}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      >
                        {ACADEMIC_PROGRAMS.map((prog) => (
                          <option key={prog.id} value={prog.id}>
                            {prog.code} - {prog.title} ({prog.duration})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1A365D] mb-1">
                        Preferred Intake Term
                      </label>
                      <select
                        name="preferredStartTerm"
                        value={formData.preferredStartTerm}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      >
                        <option value="Academic Year 2026-2027 (July Intake)">July 2026 Intake (Regular)</option>
                        <option value="Winter Semester (January Intake)">January 2027 Intake</option>
                        <option value="Modular / Certificate Track">Modular / Intensive</option>
                      </select>
                    </div>
                  </div>

                  {/* Church Affiliation */}
                  <div>
                    <label className="block font-semibold text-[#1A365D] mb-1">
                      Local Church Affiliation &amp; Pastor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="churchAffiliation"
                      required
                      value={formData.churchAffiliation}
                      onChange={handleChange}
                      placeholder="e.g. Evangelical Church Mysore / Pastor Paul"
                      className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    />
                  </div>

                  {/* Testimony / Calling */}
                  <div>
                    <label className="block font-semibold text-[#1A365D] mb-1">
                      Brief Christian Testimony &amp; Calling to Ministry
                    </label>
                    <textarea
                      name="christianTestimony"
                      rows={3}
                      value={formData.christianTestimony}
                      onChange={handleChange}
                      placeholder="Briefly describe when you came to faith in Christ and why you wish to study theology at NEST..."
                      className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    ></textarea>
                  </div>

                  {/* Housing Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="housingNeeded"
                      name="housingNeeded"
                      checked={formData.housingNeeded}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#1A365D] rounded border-[#D1C7B7] focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="housingNeeded" className="text-slate-700 cursor-pointer">
                      I require on-campus residential hostel &amp; dining accommodation
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider cursor-pointer disabled:opacity-50 border border-emerald-500"
                    >
                      {isSubmitting ? (
                        <span>Opening WhatsApp...</span>
                      ) : (
                        <>
                          <MessageSquare className="w-5 h-5 text-emerald-200" />
                          <span>Send Application to Principal on WhatsApp (8880111763)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    By submitting this form, you authorize NEST Mysore to contact you regarding admissions and enrollment.
                  </p>

                </form>
              )}
            </div>
          </div>

          {/* Right: Requirements & Scholarship Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Required Documents Checklist */}
            <div className="bg-[#F4F1EA] border border-[#D1C7B7] rounded-2xl p-6 space-y-4 font-sans">
              <div className="flex items-center gap-2 text-[#1A365D] font-serif font-bold text-lg">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <h4>Application Checklist</h4>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span>Duly completed Application Form (Online or Physical)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span>Original academic certificates &amp; mark sheets (SSLC / PUC / Degree)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span>Personal written Christian Testimony of Salvation and Ministry Calling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span>Confidential recommendation letter from local church pastor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span>Two passport-size photographs &amp; Government ID (Aadhaar / Passport)</span>
                </li>
              </ul>
            </div>

            {/* Official Admissions & Academic Office Guidance */}
            <div className="bg-[#1A365D] text-white rounded-2xl p-6 space-y-4 shadow-md border-2 border-[#D4AF37]">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-white">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <h4>Admissions Office &amp; Verification</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                Native Evangelical School of Theology operates under the official accreditation of Asia Theological Association India (ATA India).
              </p>
              <div className="space-y-2 text-xs text-slate-200 border-t border-white/20 pt-3 font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span><strong>Accredited Degrees:</strong> B.Th (3 Yrs), M.Div (2-3 Yrs), Dip.Th (2 Yrs).</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span><strong>Residential Campus:</strong> Mysore, Karnataka, India.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span><strong>Direct Verification:</strong> Principal Rev. Santhosh K. Chacko (+91 88801 11763).</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="p-5 bg-[#F4F1EA] border border-[#D1C7B7] rounded-2xl space-y-3 text-xs sm:text-sm font-sans">
              <h4 className="font-bold text-[#1A365D] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Direct Admissions Office</span>
              </h4>
              <p className="text-slate-700">
                Have questions about program eligibility or hostel fees? Call or WhatsApp our admissions counselor directly:
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${INSTITUTION_INFO.phone}`}
                  className="px-4 py-2 bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{INSTITUTION_INFO.phone}</span>
                </a>
                <a
                  href={`mailto:${INSTITUTION_INFO.email}?subject=Admission%20Question`}
                  className="px-4 py-2 bg-white border border-[#D1C7B7] text-[#1A365D] hover:border-[#D4AF37] font-semibold text-xs rounded hover:bg-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{INSTITUTION_INFO.email}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      )}

      </div>
    </section>
  );
};

