import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send, ExternalLink, Facebook, Youtube, CheckCircle2, MessageSquare, Car, Bus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/nestData';
import { useAdminData } from '../context/AdminDataContext';

export const LocationAndContact: React.FC = () => {
  const { institutionInfo } = useAdminData();
  const INSTITUTION_INFO = institutionInfo;
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMessageSent(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F4F1EA] text-[#2D2D2D] border-b border-[#D1C7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Visit &amp; Connect</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>Mysore Campus, Karnataka</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            Contact &amp; Campus Location in Mysore
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-sans">
            We welcome prospective students, pastors, church leaders, and visitors to our serene campus in Mysore, Karnataka.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 font-sans">
          
          {/* Card 1: Address */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D1C7B7] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F4F1EA] text-[#1A365D] border border-[#D4AF37] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A365D]">Campus Location</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#1A365D]">Native Evangelical School of Theology</strong><br />
                {INSTITUTION_INFO.address}
              </p>
            </div>
            <a
              href={INSTITUTION_INFO.socialLinks.location}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1A365D] bg-[#F4F1EA] hover:bg-[#D4AF37]/20 border border-[#D4AF37] rounded transition-colors inline-flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#D4AF37]" />
              <span>Open on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 2: Phone / WhatsApp */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D1C7B7] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F4F1EA] text-[#1A365D] border border-[#D4AF37] flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A365D]">Direct Phone &amp; Principal Desk</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#1A365D]">{INSTITUTION_INFO.principal}</strong><br />
                Admissions desk &amp; theological inquiry hotline:
              </p>
              <p className="text-lg font-mono font-bold text-[#1A365D]">
                {INSTITUTION_INFO.phoneFormatted}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${INSTITUTION_INFO.phone}`}
                className="flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1A365D] hover:bg-[#254B82] rounded transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/918880111763?text=Hello%20NEST%20Mysore%20Team%2C%20I%20would%20like%20more%20information%20about%20theological%20courses.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1A365D] bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 border border-[#D4AF37] rounded transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#1A365D]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email & Social */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D1C7B7] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F4F1EA] text-[#1A365D] border border-[#D4AF37] flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A365D]">Email &amp; Social Links</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Send us your official applications, sponsorship inquiries, or prayer requests:
              </p>
              <p className="text-sm font-semibold text-[#1A365D] font-mono">
                {INSTITUTION_INFO.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${INSTITUTION_INFO.email}`}
                className="flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1A365D] bg-[#F4F1EA] hover:bg-[#D4AF37]/20 border border-[#D4AF37] rounded transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Send Email</span>
              </a>
              <a
                href={INSTITUTION_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#F4F1EA] hover:bg-[#D4AF37]/20 text-[#1A365D] border border-[#D1C7B7] rounded transition-colors"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={INSTITUTION_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#F4F1EA] hover:bg-[#D4AF37]/20 text-red-700 border border-[#D1C7B7] rounded transition-colors"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Main Grid: Interactive Map & Travel Guide + Quick Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 font-sans">
          
          {/* Left: Travel Guide & Directions to Mysore Campus */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D1C7B7] shadow-sm space-y-6">
              
              <div className="border-b border-[#D1C7B7] pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                  How to Reach NEST Campus
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Travel directions from major transit hubs in Mysore, Karnataka.
                </p>
              </div>

              {/* Transit Options */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F1EA] border border-[#D1C7B7]">
                  <Bus className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#1A365D]">From Mysore Suburban / City Bus Stand</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Board buses heading toward Jayapura / Rayanakere / HD Kote Road. Alight at <strong>Nagarthalli Stop</strong> or Rayanakere Post. Auto-rickshaws and local taxis are readily available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F1EA] border border-[#D1C7B7]">
                  <Car className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#1A365D]">From Mysore Junction Railway Station</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Approximately 14-16 km from the railway station. Direct cab / auto service takes approximately 25-35 minutes via Ring Road / Jayapura Hobli route.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F1EA] border border-[#D1C7B7]">
                  <Clock className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#1A365D]">Visiting Hours &amp; Appointments</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Administrative office operates Monday through Saturday, 8:30 AM to 5:30 PM. We recommend calling ahead at <strong className="text-[#1A365D]">088801 11763</strong> to schedule a guided campus tour.
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map Link Card */}
              <div className="p-5 rounded-xl bg-[#1A365D] text-white border-2 border-[#D4AF37] flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-bold text-sm text-[#D4AF37]">Google Maps Coordinates</p>
                  <p className="text-xs text-slate-200">Open exact navigation pins on your phone</p>
                </div>
                <a
                  href={INSTITUTION_INFO.socialLinks.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Launch Map</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right: Quick Direct Message Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D1C7B7] shadow-sm space-y-6">
              
              <div className="border-b border-[#D1C7B7] pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Have a question or prayer request? Fill out the details below.
                </p>
              </div>

              {messageSent ? (
                <div className="py-10 text-center space-y-4 bg-[#F4F1EA] rounded-xl p-6 border border-[#D4AF37]">
                  <CheckCircle2 className="w-12 h-12 text-[#1A365D] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#1A365D]">Message Received</h4>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-sm mx-auto">
                    Thank you for reaching out to Native Evangelical School of Theology. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setMessageSent(false);
                      setContactForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="px-5 py-2.5 bg-[#1A365D] text-[#D4AF37] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#254B82] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs sm:text-sm">
                  
                  <div>
                    <label className="block font-bold text-[#1A365D] mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Pastor David"
                      className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-[#F4F1EA]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#1A365D] mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="yourname@domain.com"
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-[#F4F1EA]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#1A365D] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="e.g. +91 9876543210"
                        className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-[#F4F1EA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#1A365D] mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-[#F4F1EA]"
                    >
                      <option value="Admission Question">Admission &amp; Course Eligibility</option>
                      <option value="Campus Visit">Plan a Campus Visit to Mysore</option>
                      <option value="Hostel & Facilities">Hostel &amp; Campus Facilities</option>
                      <option value="Prayer Request">Prayer Request / Church Fellowship</option>
                      <option value="General Inquiry">General Institutional Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#1A365D] mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your inquiry or message here..."
                      className="w-full px-3.5 py-2.5 rounded border border-[#D1C7B7] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-[#F4F1EA]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 bg-[#1A365D] hover:bg-[#254B82] text-[#D4AF37] font-bold uppercase tracking-wider rounded border border-[#D4AF37] shadow transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSending ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#D4AF37]" />
                        <span>Send Message to NEST Mysore</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto space-y-6 font-sans">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">
              Quick answers regarding admission criteria, accommodation, and location.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#D1C7B7] overflow-hidden shadow-sm hover:border-[#D4AF37] transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-bold text-[#1A365D] text-sm flex items-center justify-between gap-4 hover:bg-[#F4F1EA]/50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#D4AF37] font-bold text-lg">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 border-t border-[#D1C7B7] leading-relaxed bg-[#F4F1EA]/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

