import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Printer, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  GraduationCap
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AdmissionRegistrationData } from '../types';
import { AdmissionReceiptA4 } from './AdmissionReceiptA4';
import { INSTITUTION_INFO } from '../data/nestData';
import { useLanguage } from '../context/LanguageContext';

export const StudentApplicationTracker: React.FC = () => {
  const { admissionsList } = useAdminData();
  const { t } = useLanguage();

  const [inputRefNumber, setInputRefNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [foundStudentData, setFoundStudentData] = useState<AdmissionRegistrationData | null>(null);
  const [showReceiptView, setShowReceiptView] = useState(false);

  // Check if there is a recently submitted application in local storage to offer 1-click test lookup
  const recentReceiptRaw = typeof window !== 'undefined' ? localStorage.getItem('nest_latest_admission_receipt') : null;
  const recentReceipt: AdmissionRegistrationData | null = recentReceiptRaw ? JSON.parse(recentReceiptRaw) : null;

  const handleTrackSubmit = (e?: React.FormEvent, directQuery?: string) => {
    if (e) e.preventDefault();
    const query = (directQuery ?? inputRefNumber).trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);

    // 1. Search in admissionsList
    const match = admissionsList.find(adm => {
      const appNo = adm.registrationDetails?.applicationNo?.toUpperCase();
      const idMatch = adm.id.toUpperCase();
      return (appNo && appNo === query) || idMatch.endsWith(query) || (adm.phone && adm.phone.replace(/[^0-9]/g, '') === query.replace(/[^0-9]/g, ''));
    });

    if (match && match.registrationDetails) {
      setFoundStudentData({
        ...match.registrationDetails,
        status: match.status
      });
      return;
    }

    if (match && !match.registrationDetails) {
      // Reconstruct student data
      setFoundStudentData({
        applicationNo: `NEST-2026-${match.id.slice(-4)}`,
        submissionDate: match.createdAt || new Date().toISOString(),
        fullName: match.fullName,
        gender: 'Male',
        dob: '2000-01-01',
        phone: match.phone,
        whatsapp: match.phone,
        email: match.email,
        permanentAddress: match.cityState,
        city: match.cityState.split(',')[0]?.trim() || 'Mysore',
        state: match.cityState.split(',')[1]?.trim() || 'Karnataka',
        pincode: '570001',
        guardianName: 'Guardian',
        guardianPhone: match.phone,
        programId: match.programId,
        programName: match.programName,
        programCategory: match.programId.includes('distance') ? 'Distance' : 'Regular',
        languageTrack: match.languageTrack,
        academicYear: '2026-2027',
        hostelNeeded: match.housingNeeded,
        qualification: match.qualification,
        institutionName: 'Recognized Institution',
        boardOrUniversity: 'State / University',
        passingYear: '2024',
        percentageGrade: 'First Class',
        salvationYear: '2018',
        waterBaptism: 'Yes',
        churchName: match.churchName,
        denomination: 'Evangelical / Independent',
        pastorName: 'Local Pastor',
        pastorPhone: match.phone,
        churchAddress: match.cityState,
        ministryCalling: match.callingBrief || 'Equipping for pastoral leadership.',
        declarationAccepted: true,
        status: match.status
      });
      return;
    }

    // 2. Check local storage receipt if not found in list
    if (recentReceipt && recentReceipt.applicationNo?.toUpperCase() === query) {
      setFoundStudentData(recentReceipt);
      return;
    }

    // Not found
    setFoundStudentData(null);
  };

  const getStatusBadge = (status?: string) => {
    const s = status || 'Pending Verification / Under Review';

    if (s.includes('Approved') || s === 'Approved') {
      return (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/50 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-400/40 mt-0.5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Official Decision</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/50">
                ADMISSION GRANTED
              </span>
            </div>
            <h4 className="text-lg font-serif font-bold text-white">Application Approved / Admission Confirmed</h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Congratulations! Your application has been reviewed and officially accepted by the Academic Council for the upcoming academic session. You are eligible to complete document enrollment and matriculation.
            </p>
          </div>
        </div>
      );
    }

    if (s === 'Rejected') {
      return (
        <div className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-500/50 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 border border-rose-400/40 mt-0.5">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Academic Review</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/30 text-rose-300 border border-rose-400/50">
                NOT ACCEPTED
              </span>
            </div>
            <h4 className="text-lg font-serif font-bold text-white">Application Not Approved</h4>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              After academic credential evaluation, we are unable to offer admission for this session. For clarification or re-application guidance, please contact the Principal&apos;s Admissions Desk.
            </p>
          </div>
        </div>
      );
    }

    if (s === 'Interview Scheduled') {
      return (
        <div className="p-4 rounded-2xl bg-purple-950/40 border-2 border-purple-500/50 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 border border-purple-400/40 mt-0.5">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Next Step</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/30 text-purple-300 border border-purple-400/50">
                INTERVIEW REQUIRED
              </span>
            </div>
            <h4 className="text-lg font-serif font-bold text-white">Personal Interview Scheduled</h4>
            <p className="text-xs text-purple-100/90 leading-relaxed">
              Your application dossier is shortlisted. The admissions team has reached out via phone and WhatsApp to schedule your theological vocation interview with faculty elders.
            </p>
          </div>
        </div>
      );
    }

    // Default: Pending Verification / Under Review
    return (
      <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/50 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-400/40 mt-0.5">
          <Clock className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Current Status</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/30 text-amber-300 border border-amber-400/50">
              PENDING VERIFICATION / UNDER REVIEW
            </span>
          </div>
          <h4 className="text-lg font-serif font-bold text-white">Application Received · Under Faculty Verification</h4>
          <p className="text-xs text-amber-100/90 leading-relaxed">
            Your application and pastoral endorsement details have been received and logged under review. The Registrar and Academic Council verify certificates in order of submission before granting formal admission.
          </p>
        </div>
      </div>
    );
  };

  if (showReceiptView && foundStudentData) {
    return (
      <div className="space-y-4">
        <div className="no-print max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setShowReceiptView(false)}
            className="px-4 py-2 rounded-xl bg-[#1A365D] hover:bg-[#254d84] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
          >
            ← Return to Status Tracker
          </button>
        </div>

        <AdmissionReceiptA4
          data={foundStudentData}
          onBackToForm={() => setShowReceiptView(false)}
          onNewRegistration={() => setShowReceiptView(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Search Header Card */}
      <div className="bg-[#112440] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Native Evangelical School of Theology · Mysore</span>
          </div>

          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Track Application &amp; Admission Status
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Enter your unique Application Reference Number (e.g. <span className="font-mono text-[#D4AF37] font-bold">NEST-2026-XXXX</span>) or registered mobile number to check real-time admission verification.
            </p>
          </div>

          {/* Quick-fill Recent Application helper */}
          {recentReceipt?.applicationNo && (
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-300">
                Recently submitted on this device: <strong className="font-mono text-[#D4AF37]">{recentReceipt.applicationNo}</strong> ({recentReceipt.fullName})
              </span>
              <button
                type="button"
                onClick={() => {
                  setInputRefNumber(recentReceipt.applicationNo);
                  handleTrackSubmit(undefined, recentReceipt.applicationNo);
                }}
                className="px-3 py-1 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Check My Status
              </button>
            </div>
          )}

          {/* Search Form */}
          <form onSubmit={handleTrackSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-grow">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter Application No. (e.g. NEST-2026-8447)"
                  value={inputRefNumber}
                  onChange={(e) => setInputRefNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0a1526] border-2 border-white/20 text-white font-mono placeholder:font-sans placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] text-sm uppercase tracking-wide"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#b5952f] text-[#1A365D] font-serif font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Track Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Result Section */}
      {hasSearched && (
        foundStudentData ? (
          <div className="bg-[#112440] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 animate-in fade-in duration-200">
            
            {/* Status Notification Banner */}
            {getStatusBadge(foundStudentData.status)}

            {/* Applicant Summary Dossier */}
            <div className="p-5 rounded-2xl bg-[#0c182b] border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">Application Reference</span>
                  <span className="text-xl font-mono font-black text-[#D4AF37]">{foundStudentData.applicationNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Submitted On</span>
                  <span className="text-xs font-mono text-slate-200">
                    {new Date(foundStudentData.submissionDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-[#D4AF37]" /> Candidate Name
                  </span>
                  <strong className="text-white text-sm block mt-0.5">{foundStudentData.fullName}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-[#D4AF37]" /> Program Track
                  </span>
                  <strong className="text-white block mt-0.5">{foundStudentData.programName}</strong>
                  <span className="text-[10px] text-[#D4AF37]">
                    {foundStudentData.programCategory === 'Regular' ? '🏛️ Residential Track' : '🌐 Distance Education'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Medium of Instruction</span>
                  <span className="text-white block mt-0.5">{foundStudentData.languageTrack}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Registered Mobile</span>
                  <span className="font-mono text-white block mt-0.5">{foundStudentData.phone}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#D4AF37]" /> Home Church
                  </span>
                  <span className="text-white block mt-0.5 truncate">{foundStudentData.churchName}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Hostel Requested</span>
                  <span className={`block mt-0.5 font-bold ${foundStudentData.hostelNeeded ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {foundStudentData.hostelNeeded ? 'Yes, Mysore Campus' : 'External / Day Scholar'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: View / Print A4 Receipt & Contact Admissions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReceiptView(true)}
                className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#b5952f] text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>View &amp; Print Official A4 Receipt</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/918880111763?text=Hello%20Principal%20Rev.%20Santhosh%20Chacko%2C%20I%20am%20checking%20the%20status%20of%20my%20application%20(${foundStudentData.applicationNo})%20for%20${encodeURIComponent(foundStudentData.programName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Principal</span>
                </a>

                <a
                  href="tel:+918880111763"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Call Admissions Helpline"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-[#112440] p-8 rounded-3xl border border-white/10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-lg text-white">Application Record Not Found</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              No registration record was found matching &quot;<strong className="text-white font-mono">{inputRefNumber}</strong>&quot;. Please verify the Application Reference Number printed on your confirmation receipt, or contact the Admissions Office directly.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/918880111763?text=Hello%20Admissions%20Office%2C%20I%20need%20help%20locating%20my%20application%20reference."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Admissions Desk via WhatsApp (+91 88801 11763)</span>
              </a>
            </div>
          </div>
        )
      )}

      {/* Official Verification Notice */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-1">
        <strong className="text-slate-300 block">Official Academic Note:</strong>
        <p className="leading-relaxed">
          Application submission does not guarantee admission. All candidates must complete document verification and interview review by the Academic Admissions Committee prior to formal matriculation.
        </p>
      </div>

    </div>
  );
};
