import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  UserCheck,
  Maximize2,
  X,
  QrCode,
  Download,
  Share2,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';
import { AdmissionRegistrationData } from '../types';
import { formatReceiptDate, formatDOB, buildWhatsAppForwardMessage } from '../utils/admissionRegistration';
import { INSTITUTION_INFO } from '../data/nestData';
import { useLanguage } from '../context/LanguageContext';

interface AdmissionReceiptA4Props {
  data: AdmissionRegistrationData;
  autoPrint?: boolean;
  onBackToForm?: () => void;
  onNewRegistration?: () => void;
}

export const AdmissionReceiptA4: React.FC<AdmissionReceiptA4Props> = ({
  data,
  autoPrint = false,
  onBackToForm,
  onNewRegistration,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isFullscreenModal, setIsFullscreenModal] = useState(false);

  // Auto scroll smoothly to receipt with plenty of clearance below the sticky navbar
  useEffect(() => {
    const el = document.getElementById('nest-receipt-top');
    if (el) {
      const yOffset = -90; // generous clearance beneath sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }, []);

  // If autoPrint is requested upon submission, automatically trigger window.print()
  useEffect(() => {
    if (autoPrint) {
      const printTimer = setTimeout(() => {
        window.print();
      }, 700);
      return () => clearTimeout(printTimer);
    }
  }, [autoPrint]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(data.applicationNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsAppText = encodeURIComponent(
    buildWhatsAppForwardMessage(data, INSTITUTION_INFO.phone)
  );
  const whatsAppUrl = `https://wa.me/${INSTITUTION_INFO.phone}?text=${whatsAppText}`;

  // Reusable A4 Document Content
  const renderA4Document = () => (
    <div 
      id="nest-printable-receipt"
      className="a4-printable-receipt bg-white text-slate-900 border-2 border-[#1A365D] shadow-2xl p-5 sm:p-8 font-sans relative overflow-hidden"
    >
      {/* Subtle Watermark Stamp */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
        <div className="text-center transform -rotate-12">
          <span className="font-serif text-8xl font-black text-[#1A365D]">NEST MYSORE</span>
          <p className="text-4xl font-bold tracking-widest mt-4">ATA INDIA ACCREDITED</p>
        </div>
      </div>

      {/* 1. Official Letterhead & Institutional Header */}
      <div className="border-b-2 border-[#1A365D] pb-3.5 relative z-10">
        <div className="flex items-start justify-between gap-3">
          
          {/* Institution Emblem & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] bg-[#1A365D] flex items-center justify-center p-1.5 shadow-sm flex-shrink-0">
              <img
                src="/assets/aistudio/logo_9f1d35a7.jpg"
                alt="NEST Official Crest"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div>
              <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                REG. UNDER TRUST ACT · ATA ACCREDITED THEOLOGICAL SEMINARY
              </span>
              <h1 className="font-serif text-lg sm:text-2xl font-extrabold text-[#1A365D] tracking-tight leading-tight">
                NATIVE EVANGELICAL SCHOOL OF THEOLOGY
              </h1>
              <p className="text-xs sm:text-[13px] font-serif font-bold text-slate-800">
                (NEST MYSORE) · Accredited by Asia Theological Association (ATA India)
              </p>
              <p className="text-[10.5px] sm:text-xs text-slate-600 mt-0.5">
                Nagarthalli Post, Mysore – 570003, Karnataka, India | Desk: +91 88801 11763 | nestmysore@gmail.com
              </p>
            </div>
          </div>

          {/* ATA Stamp Badge */}
          <div className="hidden sm:flex flex-col items-center justify-center border border-[#D4AF37] bg-[#F4F1EA] px-3 py-1.5 rounded text-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#1A365D]" />
            <span className="text-[9px] font-black text-[#1A365D] uppercase mt-0.5 tracking-wider">ATA INDIA</span>
            <span className="text-[8.5px] text-slate-600 font-semibold">Accredited Member</span>
          </div>

        </div>

        {/* Form Header Title Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="inline-block bg-[#1A365D] text-white px-2.5 py-0.5 rounded text-[10.5px] font-bold tracking-wider uppercase">
              STUDENT ADMISSION REGISTRATION RECEIPT
            </span>
            <span className="ml-2 text-[11.5px] font-bold text-slate-700">
              Academic Year {data.academicYear}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10.5px] text-slate-500">Date of Registration: </span>
            <span className="text-[10.5px] font-bold text-[#1A365D] font-mono">
              {formatReceiptDate(data.submissionDate)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Application Registration Bar & Photo Space */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-3.5 items-stretch relative z-10 page-break-inside-avoid">
        
        {/* Reference Details Box */}
        <div className="sm:col-span-9 bg-[#F4F1EA] border border-[#D1C7B7] rounded-lg p-3 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D1C7B7] pb-2">
            <div>
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-widest block">
                Application Reference Number
              </span>
              <span className="font-mono text-lg sm:text-xl font-black text-[#1A365D] tracking-wider">
                {data.applicationNo}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold uppercase tracking-wider ${
                data.programCategory === 'Regular'
                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {data.programCategory === 'Regular' ? '🏛️ Regular (Residential)' : '🌐 Distance Education'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold border flex items-center gap-1 ${
                (data.status?.includes('Approved') || data.status === 'Approved')
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : data.status === 'Rejected'
                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                  : data.status === 'Interview Scheduled'
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {(data.status?.includes('Approved') || data.status === 'Approved') ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>Approved / Admission Granted</span>
                  </>
                ) : data.status === 'Rejected' ? (
                  <>
                    <AlertCircle className="w-3 h-3 text-rose-700" />
                    <span>Application Rejected</span>
                  </>
                ) : data.status === 'Interview Scheduled' ? (
                  <>
                    <Clock className="w-3 h-3 text-purple-700" />
                    <span>Interview Scheduled</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>Pending Verification / Under Review</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-0.5">
            <div>
              <span className="text-slate-500 block text-[9.5px] uppercase font-semibold">Degree Program:</span>
              <strong className="text-[#1A365D] text-[11px] leading-tight block">{data.programName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9.5px] uppercase font-semibold">Medium Track:</span>
              <strong className="text-slate-900 text-[11px] block">{data.languageTrack}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9.5px] uppercase font-semibold">Hostel in Mysore:</span>
              <strong className={`text-[11px] block ${data.hostelNeeded ? 'text-emerald-700' : 'text-slate-700'}`}>
                {data.hostelNeeded ? 'Yes, Requested' : 'No / External'}
              </strong>
            </div>
          </div>
        </div>

        {/* Passport Photo Stamp Box */}
        <div className="sm:col-span-3 border-2 border-dashed border-[#1A365D]/40 rounded-lg p-2 flex flex-col items-center justify-center text-center bg-slate-50 min-h-[110px]">
          {data.photoUrl ? (
            <div className="relative w-20 h-24 rounded border border-slate-300 overflow-hidden shadow-sm">
              <img
                src={data.photoUrl}
                alt={data.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mb-1">
                <UserCheck className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 leading-tight">
                Affix Recent Passport Size Photograph
              </span>
              <span className="text-[8px] text-slate-500 mt-0.5">
                (3.5 cm × 4.5 cm / Self-Attested)
              </span>
            </>
          )}
        </div>

      </div>

      {/* 3. Section A: Candidate Particulars */}
      <div className="mb-3 page-break-inside-avoid relative z-10">
        <div className="bg-[#1A365D] text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-t flex items-center justify-between">
          <span>A. Candidate Personal &amp; Contact Details</span>
          <span className="text-[9px] opacity-80 font-normal">Section 1</span>
        </div>
        <table className="w-full text-[11px] border border-slate-300 border-t-0">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="w-1/4 py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Full Name:</td>
              <td className="w-1/4 py-1.5 px-2.5 font-bold text-[#1A365D] border-r border-slate-200">{data.fullName}</td>
              <td className="w-1/4 py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Gender &amp; DOB:</td>
              <td className="w-1/4 py-1.5 px-2.5 font-medium">{data.gender} · {formatDOB(data.dob)}</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Mobile / WhatsApp:</td>
              <td className="py-1.5 px-2.5 font-medium border-r border-slate-200">{data.phone}</td>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Email Address:</td>
              <td className="py-1.5 px-2.5 font-medium">{data.email}</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Permanent Address:</td>
              <td colSpan={3} className="py-1.5 px-2.5 font-medium">
                {data.permanentAddress}, {data.city}, {data.state} – {data.pincode}
              </td>
            </tr>
            <tr>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Parent / Guardian:</td>
              <td className="py-1.5 px-2.5 font-medium border-r border-slate-200">{data.guardianName || '—'}</td>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Guardian Contact:</td>
              <td className="py-1.5 px-2.5 font-medium">{data.guardianPhone || '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Section B: Academic Background */}
      <div className="mb-3 page-break-inside-avoid relative z-10">
        <div className="bg-[#1A365D] text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-t flex items-center justify-between">
          <span>B. Educational Background &amp; Qualifying Examinations</span>
          <span className="text-[9px] opacity-80 font-normal">Section 2</span>
        </div>
        <table className="w-full text-[11px] border border-slate-300 border-t-0">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="w-1/4 py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Highest Qualification:</td>
              <td className="w-1/4 py-1.5 px-2.5 font-bold text-[#1A365D] border-r border-slate-200">{data.qualification}</td>
              <td className="w-1/4 py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Passing Year &amp; Marks:</td>
              <td className="w-1/4 py-1.5 px-2.5 font-medium">{data.passingYear || '—'} · {data.percentageGrade || '—'}</td>
            </tr>
            <tr>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Institution / College:</td>
              <td className="py-1.5 px-2.5 font-medium border-r border-slate-200">{data.institutionName || '—'}</td>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Board / University:</td>
              <td className="py-1.5 px-2.5 font-medium">{data.boardOrUniversity || '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 5. Section C: Church & Ministry Calling */}
      <div className="mb-3 page-break-inside-avoid relative z-10">
        <div className="bg-[#1A365D] text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-t flex items-center justify-between">
          <span>C. Church Endorsement, Faith &amp; Ministry Calling</span>
          <span className="text-[9px] opacity-80 font-normal">Section 3</span>
        </div>
        <table className="w-full text-[11px] border border-slate-300 border-t-0">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="w-1/4 py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Local Church:</td>
              <td className="w-1/4 py-1.5 px-2.5 font-bold text-[#1A365D] border-r border-slate-200">{data.churchName}</td>
              <td className="w-1/4 py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Denomination:</td>
              <td className="w-1/4 py-1.5 px-2.5 font-medium">{data.denomination || 'Evangelical / Independent'}</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Pastor&apos;s Name:</td>
              <td className="py-1.5 px-2.5 font-medium border-r border-slate-200">{data.pastorName}</td>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Pastor&apos;s Phone:</td>
              <td className="py-1.5 px-2.5 font-medium">{data.pastorPhone || '—'}</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Water Baptism:</td>
              <td className="py-1.5 px-2.5 font-medium border-r border-slate-200">{data.waterBaptism} (Born Again in {data.salvationYear || '—'})</td>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Church Address:</td>
              <td className="py-1.5 px-2.5 font-medium">{data.churchAddress || `${data.city}, ${data.state}`}</td>
            </tr>
            <tr>
              <td className="py-1.5 px-2.5 font-semibold bg-slate-50 text-slate-600 border-r border-slate-200">Ministry Calling / Goal:</td>
              <td colSpan={3} className="py-1.5 px-2.5 font-medium text-slate-800">
                {data.ministryCalling || 'Equipping for pastoral ministry, church planting, and evangelical leadership in native harvest fields.'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Section D: Candidate Declaration */}
      <div className="mb-3 bg-slate-50 border border-slate-200 p-2.5 rounded text-[10px] text-slate-700 space-y-1 page-break-inside-avoid relative z-10">
        <strong className="text-[#1A365D] uppercase text-[9.5px] tracking-wider block">Candidate Electronic Declaration:</strong>
        <p className="leading-relaxed">
          I hereby declare that the particulars furnished in this application are true, complete, and correct to the best of my knowledge and faith. I understand that admission to the Native Evangelical School of Theology is governed by ATA India standards and seminary discipline. If admitted, I pledge to submit myself to the spiritual guidance, doctrinal guidelines, and community regulations of the seminary.
        </p>
        <div className="pt-0.5 flex items-center justify-between text-[9.5px] text-slate-500 font-medium border-t border-slate-200">
          <span>Electronic Acceptance: <strong className="text-emerald-700 font-bold">Confirmed (Yes)</strong></span>
          <span>Timestamp: <strong className="text-[#1A365D] font-mono">{formatReceiptDate(data.submissionDate)}</strong></span>
        </div>
      </div>

      {/* 7. Section E: Signatures & Verification Stamp Box */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2.5 border-t-2 border-[#1A365D] text-center text-xs page-break-inside-avoid relative z-10">
        
        {/* Candidate Signature */}
        <div className="sm:col-span-4 border border-slate-300 rounded p-2.5 flex flex-col justify-between min-h-[80px] bg-white">
          <span className="text-[9.5px] text-slate-500 uppercase font-semibold">Candidate&apos;s Signature</span>
          <div className="border-b border-dashed border-slate-400 my-1.5"></div>
          <span className="text-[11px] font-bold text-[#1A365D]">{data.fullName}</span>
        </div>

        {/* Sponsoring Pastor Recommendation Seal */}
        <div className="sm:col-span-4 border border-slate-300 rounded p-2.5 flex flex-col justify-between min-h-[80px] bg-white">
          <span className="text-[9.5px] text-slate-500 uppercase font-semibold">Pastor Recommendation &amp; Seal</span>
          <div className="border-b border-dashed border-slate-400 my-1.5"></div>
          <span className="text-[10.5px] font-medium text-slate-700">{data.pastorName}</span>
        </div>

        {/* Principal & Registrar Seal */}
        <div className="sm:col-span-4 border-2 border-[#D4AF37] rounded p-2.5 flex flex-col justify-between min-h-[80px] bg-[#F4F1EA]">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-[#1A365D] uppercase font-bold">Seminary Principal Desk</span>
            <span className="text-[8.5px] px-1.5 py-0.2 bg-[#D4AF37]/30 text-[#1A365D] font-bold rounded">OFFICIAL</span>
          </div>
          <div className="text-[9px] text-slate-500 italic">Office Verification &amp; Seal</div>
          <div>
            <span className="text-[11px] font-serif font-black text-[#1A365D] block">Rev. Santhosh K. Chacko</span>
            <span className="text-[8.5px] text-slate-600 block">Principal, NEST Mysore</span>
          </div>
        </div>

      </div>

      {/* 8. Crucial Instructions for the Applicant */}
      <div className="mt-3 pt-2.5 border-t border-slate-200 text-[9.5px] text-slate-600 space-y-1 page-break-inside-avoid relative z-10">
        <strong className="text-[#1A365D] uppercase text-[9px] tracking-wider block">Important Enrollment Instructions:</strong>
        <ol className="list-decimal list-inside space-y-0.5">
          <li>Print this A4 receipt and keep two physical copies for your personal records and interview verification.</li>
          <li>Submit attested photocopies of your academic mark sheets (10th / 12th / Degree) and pastoral recommendation letter to the Admissions Office.</li>
          <li>Forward a digital copy or reference number (<strong className="font-mono text-[#1A365D]">{data.applicationNo}</strong>) to Principal Rev. Santhosh K. Chacko on WhatsApp: <strong>+91 88801 11763</strong> for instant interview scheduling.</li>
          <li>Campus Address: Native Evangelical School of Theology (NEST), Nagarthalli Post, Mysore – 570003, Karnataka, India.</li>
        </ol>
      </div>

      {/* Micro Footer Bar */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[8.5px] text-slate-400 relative z-10">
        <span>Generated by NEST Mysore Online Academic Admissions Portal</span>
        <span>ATA Accredited · System Ref: {data.applicationNo} · Page 1 of 1 (A4)</span>
      </div>

    </div>
  );

  return (
    <>
      <div id="nest-receipt-top" className="a4-receipt-wrapper max-w-4xl mx-auto py-4 px-3 sm:px-6 scroll-mt-32">
        
        {/* Non-printable Action Toolbar - Elevated and Styled */}
        <div className="no-print bg-[#1A365D] text-white p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-[#D4AF37] mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                  {(data.status?.includes('Approved') || data.status === 'Approved')
                    ? 'Admission Officially Granted!'
                    : data.status === 'Rejected'
                    ? 'Application Status: Not Accepted'
                    : data.status === 'Interview Scheduled'
                    ? 'Interview Scheduled'
                    : 'Application Registered · Pending Verification'}
                </h4>
                <span className={`hidden sm:inline-block px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider rounded ${
                  (data.status?.includes('Approved') || data.status === 'Approved')
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                    : data.status === 'Rejected'
                    ? 'bg-rose-500/20 border-rose-400/40 text-rose-300'
                    : 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                }`}>
                  {data.status || 'Under Review'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Reference: <span className="font-mono font-bold text-[#D4AF37] text-sm tracking-wide">{data.applicationNo}</span> · Candidate: <strong className="text-white">{data.fullName}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#b5952f] text-[#1A365D] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="Print official single-page A4 document or save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>{t('printReceiptBtn')}</span>
            </button>

            {/* Direct Save as PDF action (triggers print dialog with instruction) */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 border border-white/20"
              title="Save as PDF via browser print destination"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('savePdfBtn')}</span>
            </button>

            {/* WhatsApp Direct Forward */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="Direct message Principal on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('sendWhatsAppPrincipal')}</span>
            </a>

            {/* Clean Fullscreen Document View */}
            <button
              onClick={() => setIsFullscreenModal(true)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              title="Open full page distraction-free document viewer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t('cleanViewBtn')}</span>
            </button>

            {/* Copy Ref Button */}
            <button
              onClick={handleCopyRef}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              title="Copy registration reference code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t('refCopied') : t('copyRefBtn')}</span>
            </button>

            {/* Back to Edit Form */}
            {onBackToForm && (
              <button
                onClick={onBackToForm}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                title="Edit form details"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('editFormBtn')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Render Document Inline */}
        {renderA4Document()}

        {/* Post-print helpful action bar */}
        <div className="no-print mt-6 bg-[#F4F1EA] border border-[#D1C7B7] rounded-2xl p-5 text-center space-y-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#1A365D] hover:bg-[#112440] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('printReceiptBtn')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#b5952f] text-[#1A365D] font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('savePdfBtn')}</span>
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('sendWhatsAppPrincipal')} ({INSTITUTION_INFO.phoneFormatted})</span>
            </a>

            <button
              onClick={() => setIsFullscreenModal(true)}
              className="px-4 py-2.5 bg-white border border-[#D1C7B7] hover:border-[#1A365D] text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('cleanViewBtn')}</span>
            </button>

            {onNewRegistration && (
              <button
                onClick={onNewRegistration}
                className="px-4 py-2.5 bg-white border border-[#D1C7B7] hover:border-[#D4AF37] text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#1A365D]" />
                <span>{t('registerAnotherStudentBtn')}</span>
              </button>
            )}
          </div>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            💡 <strong>Digital Copy Tip:</strong> Choose <strong>&quot;Save as PDF&quot;</strong> in your browser&apos;s Print destination dropdown to save a permanent digital copy on your computer or mobile device.
          </p>
        </div>

      </div>

      {/* ============================================================== */}
      {/* CLEAN FULLSCREEN DOCUMENT READER MODAL */}
      {/* ============================================================== */}
      {isFullscreenModal && (
        <div className="no-print fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex flex-col items-center animate-in fade-in duration-200">
          
          {/* Top Modal Controls Bar */}
          <div className="w-full max-w-4xl bg-[#1A365D] text-white p-3.5 px-5 rounded-2xl shadow-2xl border-2 border-[#D4AF37] flex flex-wrap items-center justify-between gap-3 mb-4 sticky top-2 z-20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="font-serif font-bold text-sm text-white">
                Official A4 Document View · Ref: <strong className="font-mono text-[#D4AF37]">{data.applicationNo}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-[#D4AF37] text-[#1A365D] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-white transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print (A4)</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <button
                onClick={() => setIsFullscreenModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Fullscreen View"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Centered Document Paper */}
          <div className="w-full max-w-4xl pb-10">
            {renderA4Document()}
          </div>
        </div>
      )}
    </>
  );
};
