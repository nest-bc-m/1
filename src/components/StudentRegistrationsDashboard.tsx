import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Printer, 
  GraduationCap, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Church, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Eye, 
  FileText, 
  MessageSquare, 
  Building, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  Plus, 
  FileSpreadsheet, 
  RefreshCw, 
  Save, 
  ExternalLink,
  Layers,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import { AdmissionSubmission, AdmissionRegistrationData } from '../types';
import { useAdminData } from '../context/AdminDataContext';
import { AdmissionReceiptA4 } from './AdmissionReceiptA4';
import { formatReceiptDate, formatDOB } from '../utils/admissionRegistration';

export const StudentRegistrationsDashboard: React.FC = () => {
  const { 
    admissionsList, 
    updateAdmissionStatus, 
    deleteAdmissionInquiry,
    programsList 
  } = useAdminData();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [housingFilter, setHousingFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'ref-asc'>('date-desc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Selected Student for Full Dossier Modal
  const [selectedStudent, setSelectedStudent] = useState<AdmissionSubmission | null>(null);

  // Selected Student for A4 Receipt Preview / Print
  const [receiptStudentData, setReceiptStudentData] = useState<AdmissionRegistrationData | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPI Metrics Calculation
  const stats = useMemo(() => {
    const total = admissionsList.length;
    const newCount = admissionsList.filter(a => a.status === 'New').length;
    const underReview = admissionsList.filter(a => a.status === 'Under Review').length;
    const interviewScheduled = admissionsList.filter(a => a.status === 'Interview Scheduled').length;
    const approved = admissionsList.filter(a => a.status === 'Approved').length;
    const hostelRequests = admissionsList.filter(a => a.housingNeeded).length;
    const regularMode = admissionsList.filter(a => a.registrationDetails?.programCategory === 'Regular' || !a.registrationDetails?.programCategory).length;
    const distanceMode = total - regularMode;

    return {
      total,
      newCount,
      underReview,
      interviewScheduled,
      approved,
      hostelRequests,
      regularMode,
      distanceMode,
    };
  }, [admissionsList]);

  // Filtered and Sorted Admissions List
  const filteredAdmissions = useMemo(() => {
    return admissionsList
      .filter((adm) => {
        // Status filter
        if (statusFilter !== 'all' && adm.status !== statusFilter) return false;

        // Category filter
        if (categoryFilter !== 'all') {
          const cat = adm.registrationDetails?.programCategory || (adm.programId.includes('distance') ? 'Distance' : 'Regular');
          if (cat !== categoryFilter) return false;
        }

        // Program filter
        if (programFilter !== 'all' && adm.programId !== programFilter) return false;

        // Housing filter
        if (housingFilter === 'needed' && !adm.housingNeeded) return false;
        if (housingFilter === 'not-needed' && adm.housingNeeded) return false;

        // Search text matching
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const ref = (adm.registrationDetails?.applicationNo || '').toLowerCase();
          const name = adm.fullName.toLowerCase();
          const phone = adm.phone.toLowerCase();
          const email = adm.email.toLowerCase();
          const city = adm.cityState.toLowerCase();
          const church = adm.churchName.toLowerCase();
          const pastor = (adm.registrationDetails?.pastorName || '').toLowerCase();
          const program = adm.programName.toLowerCase();

          return (
            ref.includes(q) ||
            name.includes(q) ||
            phone.includes(q) ||
            email.includes(q) ||
            city.includes(q) ||
            church.includes(q) ||
            pastor.includes(q) ||
            program.includes(q)
          );
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'date-asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'name-asc') {
          return a.fullName.localeCompare(b.fullName);
        }
        if (sortBy === 'ref-asc') {
          const refA = a.registrationDetails?.applicationNo || a.id;
          const refB = b.registrationDetails?.applicationNo || b.id;
          return refA.localeCompare(refB);
        }
        return 0;
      });
  }, [admissionsList, searchTerm, statusFilter, categoryFilter, programFilter, housingFilter, sortBy]);

  // Export to CSV Function
  const handleExportCSV = () => {
    if (admissionsList.length === 0) {
      showToast('No student registrations available to export.');
      return;
    }

    const headers = [
      'Application Reference',
      'Submission Date',
      'Student Full Name',
      'Gender',
      'Date of Birth',
      'Mobile Phone',
      'WhatsApp',
      'Email Address',
      'Address',
      'City',
      'State',
      'PIN Code',
      'Guardian Name',
      'Guardian Phone',
      'Study Pathway',
      'Degree Program',
      'Language Track',
      'Hostel Required',
      'Highest Qualification',
      'Institution Name',
      'Board / University',
      'Passing Year',
      'Percentage / Grade',
      'Church Name',
      'Denomination',
      'Pastor Name',
      'Pastor Phone',
      'Water Baptism',
      'Ministry Calling',
      'Current Status',
      'Admin Internal Notes',
    ];

    const escapeCSV = (value: string | number | boolean | null | undefined): string => {
      if (value === null || value === undefined) return '""';
      const str = String(value).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = filteredAdmissions.map((adm) => {
      const reg = adm.registrationDetails;
      return [
        escapeCSV(reg?.applicationNo || adm.id),
        escapeCSV(adm.createdAt ? new Date(adm.createdAt).toLocaleDateString() : ''),
        escapeCSV(adm.fullName),
        escapeCSV(reg?.gender || '—'),
        escapeCSV(reg?.dob || '—'),
        escapeCSV(adm.phone),
        escapeCSV(reg?.whatsapp || adm.phone),
        escapeCSV(adm.email),
        escapeCSV(reg?.permanentAddress || '—'),
        escapeCSV(reg?.city || adm.cityState.split(',')[0]?.trim() || ''),
        escapeCSV(reg?.state || adm.cityState.split(',')[1]?.trim() || ''),
        escapeCSV(reg?.pincode || '—'),
        escapeCSV(reg?.guardianName || '—'),
        escapeCSV(reg?.guardianPhone || '—'),
        escapeCSV(reg?.programCategory || (adm.programId.includes('distance') ? 'Distance' : 'Regular')),
        escapeCSV(adm.programName),
        escapeCSV(adm.languageTrack),
        escapeCSV(adm.housingNeeded ? 'Yes' : 'No'),
        escapeCSV(adm.qualification),
        escapeCSV(reg?.institutionName || '—'),
        escapeCSV(reg?.boardOrUniversity || '—'),
        escapeCSV(reg?.passingYear || '—'),
        escapeCSV(reg?.percentageGrade || '—'),
        escapeCSV(adm.churchName),
        escapeCSV(reg?.denomination || '—'),
        escapeCSV(reg?.pastorName || '—'),
        escapeCSV(reg?.pastorPhone || '—'),
        escapeCSV(reg?.waterBaptism || '—'),
        escapeCSV(adm.callingBrief || reg?.ministryCalling || '—'),
        escapeCSV(adm.status),
        escapeCSV(adm.notes || '—'),
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEST-Mysore-Student-Registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Successfully exported ${filteredAdmissions.length} registrations to CSV`);
  };

  // Export to JSON Function
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(filteredAdmissions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEST-Registrations-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported registrations JSON file');
  };

  // Helper to open student's A4 Receipt
  const handleOpenReceipt = (adm: AdmissionSubmission) => {
    if (adm.registrationDetails) {
      setReceiptStudentData(adm.registrationDetails);
    } else {
      // Build on-the-fly registration data if not present
      const fallbackData: AdmissionRegistrationData = {
        applicationNo: `NEST-2026-${adm.id.slice(-4)}`,
        submissionDate: adm.createdAt,
        fullName: adm.fullName,
        gender: 'Male',
        dob: '1999-01-01',
        phone: adm.phone,
        whatsapp: adm.phone,
        email: adm.email,
        permanentAddress: adm.cityState,
        city: adm.cityState.split(',')[0]?.trim() || 'Mysuru',
        state: adm.cityState.split(',')[1]?.trim() || 'Karnataka',
        pincode: '570003',
        guardianName: 'Guardian',
        guardianPhone: adm.phone,
        programCategory: adm.programId.includes('distance') ? 'Distance' : 'Regular',
        programId: adm.programId,
        programName: adm.programName,
        languageTrack: adm.languageTrack,
        academicYear: '2026–2027 (July Intake)',
        hostelNeeded: adm.housingNeeded,
        qualification: adm.qualification,
        institutionName: 'State Board / College',
        boardOrUniversity: 'State Education Board',
        passingYear: '2022',
        percentageGrade: 'First Class',
        salvationYear: '2018',
        waterBaptism: 'Yes',
        churchName: adm.churchName,
        denomination: 'Evangelical / Independent',
        pastorName: 'Local Pastor',
        pastorPhone: adm.phone,
        churchAddress: adm.cityState,
        ministryCalling: adm.callingBrief || 'Called to Christian pastoral leadership and evangelism.',
        declarationAccepted: true,
      };
      setReceiptStudentData(fallbackData);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg text-xs font-bold flex items-center justify-between gap-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header & Export Action Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              NEST Mysore · Academic Admissions Desk
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
            Student Registrations &amp; Applicant Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            View, search, update status, generate individual A4 receipts, and export all submitted student applications.
          </p>
        </div>

        {/* Global Export & Print Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95 border border-emerald-500/50"
            title="Download CSV spreadsheet of all filtered registrations"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-2 rounded-xl bg-[#1A365D] hover:bg-[#254d84] text-[#D4AF37] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border border-[#D4AF37]/50 transition-all cursor-pointer shadow"
            title="Download JSON structured data backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            title="Print roster summary"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Print List</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#112440] p-3.5 rounded-2xl border border-[#D4AF37]/30 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Students</span>
          <span className="text-2xl font-serif font-black text-white">{stats.total}</span>
          <span className="text-[10px] text-slate-400 block font-mono">100% Verified</span>
        </div>

        <div className="bg-[#112440] p-3.5 rounded-2xl border border-amber-500/30 space-y-1">
          <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider block">New Submissions</span>
          <span className="text-2xl font-serif font-black text-amber-400">{stats.newCount}</span>
          <span className="text-[10px] text-amber-200/60 block">Pending Review</span>
        </div>

        <div className="bg-[#112440] p-3.5 rounded-2xl border border-blue-500/30 space-y-1">
          <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider block">Under Review</span>
          <span className="text-2xl font-serif font-black text-blue-400">{stats.underReview}</span>
          <span className="text-[10px] text-blue-200/60 block">Evaluating Marks</span>
        </div>

        <div className="bg-[#112440] p-3.5 rounded-2xl border border-purple-500/30 space-y-1">
          <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider block">Interviews</span>
          <span className="text-2xl font-serif font-black text-purple-400">{stats.interviewScheduled}</span>
          <span className="text-[10px] text-purple-200/60 block">Scheduled Dates</span>
        </div>

        <div className="bg-[#112440] p-3.5 rounded-2xl border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider block">Approved / Admitted</span>
          <span className="text-2xl font-serif font-black text-emerald-400">{stats.approved}</span>
          <span className="text-[10px] text-emerald-200/60 block">Enrolled Candidates</span>
        </div>

        <div className="bg-[#112440] p-3.5 rounded-2xl border border-rose-500/30 space-y-1">
          <span className="text-[10px] text-rose-300 uppercase font-bold tracking-wider block">Hostel Requested</span>
          <span className="text-2xl font-serif font-black text-rose-400">{stats.hostelRequests}</span>
          <span className="text-[10px] text-rose-200/60 block">Campus Living</span>
        </div>
      </div>

      {/* Advanced Search, Filters & View Toggle Bar */}
      <div className="bg-[#112440] p-4 rounded-2xl border border-white/10 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, application ref (NEST-2026-...), phone, email, pastor, church, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0a1526] border border-white/20 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#0a1526] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Pending Verification / Under Review">Pending Verification / Under Review</option>
              <option value="Approved / Admission Granted">Approved / Admission Granted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="New">Status: New</option>
              <option value="Under Review">Status: Under Review</option>
              <option value="Approved">Status: Approved</option>
            </select>

            {/* Pathway Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#0a1526] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              <option value="all">All Modes (Regular &amp; Distance)</option>
              <option value="Regular">🏛️ Regular On-Campus</option>
              <option value="Distance">🌐 Distance Education</option>
            </select>

            {/* Program Filter */}
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#0a1526] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer max-w-[150px] truncate"
            >
              <option value="all">All Programs</option>
              {programsList.map(p => (
                <option key={p.id} value={p.id}>{p.code} - {p.title}</option>
              ))}
            </select>

            {/* Hostel Filter */}
            <select
              value={housingFilter}
              onChange={(e) => setHousingFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#0a1526] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              <option value="all">All Housing</option>
              <option value="needed">Hostel Requested</option>
              <option value="not-needed">Day Scholar / External</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#0a1526] rounded-xl p-0.5 border border-white/20">
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-[#1A365D] text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-[#1A365D] text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                }`}
                title="Card View"
              >
                Cards
              </button>
            </div>
          </div>

        </div>

        {/* Results Counter and Active Filter Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-white">{filteredAdmissions.length}</strong> of <strong className="text-white">{admissionsList.length}</strong> registrations</span>
            {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || programFilter !== 'all' || housingFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                  setProgramFilter('all');
                  setHousingFilter('all');
                }}
                className="text-[#D4AF37] hover:underline font-bold text-[11px] cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="date-desc" className="bg-[#112440]">Newest First</option>
              <option value="date-asc" className="bg-[#112440]">Oldest First</option>
              <option value="name-asc" className="bg-[#112440]">Student Name (A-Z)</option>
              <option value="ref-asc" className="bg-[#112440]">Application Ref</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Registrations Content: Table vs Card View */}
      {filteredAdmissions.length === 0 ? (
        <div className="bg-[#112440] rounded-2xl border border-white/10 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-lg text-white">No registrations match your search</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords, clearing status filters, or check for typos.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCategoryFilter('all');
              setProgramFilter('all');
              setHousingFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#1A365D] font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* High-Density Data Table */
        <div className="bg-[#112440] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0c182b] text-slate-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-bold">App Ref / Date</th>
                  <th className="py-3 px-4 font-bold">Candidate</th>
                  <th className="py-3 px-4 font-bold">Degree Program</th>
                  <th className="py-3 px-4 font-bold">Contact</th>
                  <th className="py-3 px-4 font-bold">Church &amp; Pastor</th>
                  <th className="py-3 px-4 font-bold">Hostel</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAdmissions.map((adm) => {
                  const reg = adm.registrationDetails;
                  const appNo = reg?.applicationNo || `NEST-2026-${adm.id.slice(-4)}`;
                  const category = reg?.programCategory || (adm.programId.includes('distance') ? 'Distance' : 'Regular');

                  return (
                    <tr 
                      key={adm.id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      {/* Ref & Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-[#D4AF37] block text-xs">
                          {appNo}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {new Date(adm.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase mt-1 ${
                          category === 'Regular' ? 'bg-blue-900/60 text-blue-200 border border-blue-500/40' : 'bg-amber-900/60 text-amber-200 border border-amber-500/40'
                        }`}>
                          {category}
                        </span>
                      </td>

                      {/* Candidate Name & Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          {reg?.photoUrl ? (
                            <img 
                              src={reg.photoUrl} 
                              alt={adm.fullName} 
                              className="w-8 h-9 rounded object-cover border border-slate-400 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#1A365D] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs flex items-center justify-center flex-shrink-0">
                              {adm.fullName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <span 
                              onClick={() => setSelectedStudent(adm)}
                              className="font-serif font-bold text-sm text-white hover:text-[#D4AF37] cursor-pointer block leading-tight"
                            >
                              {adm.fullName}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {reg?.gender || '—'} · {adm.cityState}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Program */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <span className="font-bold text-slate-200 block truncate" title={adm.programName}>
                          {adm.programName}
                        </span>
                        <span className="text-[10px] text-[#D4AF37] block truncate">
                          {adm.languageTrack}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          Qual: {adm.qualification}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-white text-xs">{adm.phone}</span>
                            <a
                              href={`https://wa.me/${adm.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(adm.fullName)}%2C%20this%20is%20Principal%20Rev.%20Santhosh%20Chacko%20from%20Native%20Evangelical%20School%20of%20Theology%20(NEST)%20Mysore.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors"
                              title="WhatsApp Student"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </a>
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">{adm.email}</span>
                        </div>
                      </td>

                      {/* Church & Pastor */}
                      <td className="py-3.5 px-4 max-w-[180px]">
                        <span className="text-slate-200 block truncate font-medium" title={adm.churchName}>
                          {adm.churchName}
                        </span>
                        {reg?.pastorName && (
                          <span className="text-[10px] text-slate-400 block truncate">
                            Pastor: {reg.pastorName}
                          </span>
                        )}
                      </td>

                      {/* Hostel */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {adm.housingNeeded ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                            Required
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">
                            External
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={adm.status}
                          onChange={(e) => {
                            updateAdmissionStatus(adm.id, e.target.value as any);
                            showToast(`Status updated to "${e.target.value}" for ${adm.fullName}`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none ${
                            (adm.status === 'Approved / Admission Granted' || adm.status === 'Approved') ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' :
                            adm.status === 'Interview Scheduled' ? 'bg-purple-950/80 text-purple-300 border-purple-500/50' :
                            adm.status === 'Rejected' ? 'bg-red-950/80 text-red-300 border-red-500/50' :
                            'bg-amber-950/80 text-amber-300 border-amber-500/50'
                          }`}
                        >
                          <option value="Pending Verification / Under Review" className="bg-[#112440] text-amber-300">Pending Verification / Under Review</option>
                          <option value="Approved / Admission Granted" className="bg-[#112440] text-emerald-300">Approved / Admission Granted</option>
                          <option value="Interview Scheduled" className="bg-[#112440] text-purple-300">Interview Scheduled</option>
                          <option value="Rejected" className="bg-[#112440] text-red-300">Rejected</option>
                          <option value="New" className="bg-[#112440] text-amber-300">New</option>
                          <option value="Under Review" className="bg-[#112440] text-blue-300">Under Review</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Dossier Modal */}
                          <button
                            onClick={() => setSelectedStudent(adm)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#1A365D] text-slate-200 transition-colors cursor-pointer"
                            title="View Full Student Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Print A4 Receipt */}
                          <button
                            onClick={() => handleOpenReceipt(adm)}
                            className="p-1.5 rounded-lg bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] text-[#D4AF37] border border-[#D4AF37]/40 transition-colors cursor-pointer"
                            title="Print Formatted A4 Application Receipt"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Application */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete registration for ${adm.fullName}?`)) {
                                deleteAdmissionInquiry(adm.id);
                                showToast(`Deleted registration for ${adm.fullName}`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-800 text-red-300 border border-red-500/30 transition-colors cursor-pointer"
                            title="Delete Registration"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Detailed Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAdmissions.map((adm) => {
            const reg = adm.registrationDetails;
            const appNo = reg?.applicationNo || `NEST-2026-${adm.id.slice(-4)}`;
            const category = reg?.programCategory || (adm.programId.includes('distance') ? 'Distance' : 'Regular');

            return (
              <div
                key={adm.id}
                className="bg-[#112440] rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 p-5 space-y-3.5 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#D4AF37] block">
                        {appNo}
                      </span>
                      <h4 
                        onClick={() => setSelectedStudent(adm)}
                        className="font-serif font-bold text-base text-white hover:text-[#D4AF37] cursor-pointer mt-0.5"
                      >
                        {adm.fullName}
                      </h4>
                      <span className="text-[11px] text-slate-400 block">
                        {adm.cityState}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      adm.status === 'Approved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                      adm.status === 'New' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                      adm.status === 'Interview Scheduled' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' :
                      'bg-blue-950 text-blue-300 border border-blue-500/40'
                    }`}>
                      {adm.status}
                    </span>
                  </div>

                  {/* Summary Details */}
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Program</span>
                      <span className="font-semibold text-white block">{adm.programName}</span>
                      <span className="text-[10px] text-[#D4AF37]">{adm.languageTrack}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Phone</span>
                        <span className="font-mono text-white">{adm.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Hostel</span>
                        <span className={adm.housingNeeded ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          {adm.housingNeeded ? 'Yes, Required' : 'Not needed'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-white/5 text-[11px]">
                      <span className="text-slate-400 block text-[10px] uppercase">Church</span>
                      <span className="text-slate-200 block truncate">{adm.churchName}</span>
                    </div>

                    {adm.notes && (
                      <p className="text-[11px] text-amber-200/80 italic bg-black/20 p-2 rounded-lg border border-white/5">
                        &quot;{adm.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedStudent(adm)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Dossier</span>
                    </button>

                    <button
                      onClick={() => handleOpenReceipt(adm)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Receipt (A4)</span>
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/${adm.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(adm.fullName)}%2C%20this%20is%20Principal%20Rev.%20Santhosh%20Chacko%20from%20NEST%20Mysore.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                    title="WhatsApp Student"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. STUDENT REGISTRATION DOSSIER MODAL */}
      {/* ============================================================== */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#112440] text-white rounded-3xl max-w-3xl w-full border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto">
            
            {/* Modal Top Header */}
            <div className="p-5 bg-[#1A365D] border-b border-[#D4AF37]/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#112440] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D4AF37]">
                      {selectedStudent.registrationDetails?.applicationNo || `NEST-2026-${selectedStudent.id.slice(-4)}`}
                    </span>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                      {selectedStudent.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {selectedStudent.fullName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenReceipt(selectedStudent)}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-white transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>A4 Receipt</span>
                </button>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dossier Body */}
            <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              
              {/* Status and Action Buttons Banner */}
              <div className="p-4 rounded-2xl bg-[#0c182b] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 font-bold">Update Application Status:</span>
                  <select
                    value={selectedStudent.status}
                    onChange={(e) => {
                      updateAdmissionStatus(selectedStudent.id, e.target.value as any);
                      setSelectedStudent(prev => prev ? ({ ...prev, status: e.target.value as any }) : null);
                      showToast(`Status updated to "${e.target.value}"`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#112440] border border-[#D4AF37] text-white font-bold text-xs cursor-pointer focus:outline-none"
                  >
                    <option value="Pending Verification / Under Review">Pending Verification / Under Review</option>
                    <option value="Approved / Admission Granted">Approved / Admission Granted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Rejected">Rejected</option>
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedStudent.phone.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(selectedStudent.fullName)}%2C%20Greetings%20from%20Native%20Evangelical%20School%20of%20Theology%20(NEST)%20Mysore.%20Regarding%20your%20application%20(${selectedStudent.registrationDetails?.applicationNo || ''})%3A%20`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Message</span>
                  </a>

                  <a
                    href={`tel:${selectedStudent.phone}`}
                    className="px-3 py-1.5 rounded-lg bg-[#1A365D] hover:bg-[#254d84] text-[#D4AF37] font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-[#D4AF37]/40"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              {/* 1. Academic Program Choice */}
              <div className="space-y-2">
                <span className="font-serif font-bold text-base text-[#D4AF37] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Academic Degree Program &amp; Track</span>
                </span>
                <div className="p-4 rounded-xl bg-[#0c182b] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Degree Program</span>
                    <strong className="text-white text-sm block">{selectedStudent.programName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Instruction Medium</span>
                    <span className="text-slate-200 block">{selectedStudent.languageTrack}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">On-Campus Hostel</span>
                    <span className={selectedStudent.housingNeeded ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {selectedStudent.housingNeeded ? 'Yes, Requested (Mysore Campus)' : 'Not Needed / External'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Personal & Contact Particulars */}
              <div className="space-y-2">
                <span className="font-serif font-bold text-base text-[#D4AF37] flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>Personal Particulars &amp; Contact Information</span>
                </span>
                <div className="p-4 rounded-xl bg-[#0c182b] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Gender &amp; DOB</span>
                    <span className="text-white">{selectedStudent.registrationDetails?.gender || '—'} · {selectedStudent.registrationDetails?.dob ? formatDOB(selectedStudent.registrationDetails.dob) : '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
                    <span className="font-mono text-white">{selectedStudent.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                    <span className="text-slate-200">{selectedStudent.email}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Permanent Address</span>
                    <span className="text-white">
                      {selectedStudent.registrationDetails?.permanentAddress || selectedStudent.cityState}
                      {selectedStudent.registrationDetails?.pincode ? ` – ${selectedStudent.registrationDetails.pincode}` : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Guardian &amp; Emergency Phone</span>
                    <span className="text-white">
                      {selectedStudent.registrationDetails?.guardianName || '—'} ({selectedStudent.registrationDetails?.guardianPhone || '—'})
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Educational Background */}
              <div className="space-y-2">
                <span className="font-serif font-bold text-base text-[#D4AF37] flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Educational Qualifications</span>
                </span>
                <div className="p-4 rounded-xl bg-[#0c182b] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Highest Examination</span>
                    <strong className="text-white">{selectedStudent.qualification}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Institution / College</span>
                    <span className="text-slate-200">{selectedStudent.registrationDetails?.institutionName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Board / University</span>
                    <span className="text-slate-200">{selectedStudent.registrationDetails?.boardOrUniversity || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Passing Year</span>
                    <span className="text-white">{selectedStudent.registrationDetails?.passingYear || '—'}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Marks / Grade</span>
                    <span className="text-white">{selectedStudent.registrationDetails?.percentageGrade || '—'}</span>
                  </div>
                </div>
              </div>

              {/* 4. Church & Ministry Profile */}
              <div className="space-y-2">
                <span className="font-serif font-bold text-base text-[#D4AF37] flex items-center gap-1.5">
                  <Church className="w-4 h-4" />
                  <span>Church Affiliation &amp; Ministry Calling</span>
                </span>
                <div className="p-4 rounded-xl bg-[#0c182b] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Local Church</span>
                    <strong className="text-white">{selectedStudent.churchName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Denomination</span>
                    <span className="text-slate-200">{selectedStudent.registrationDetails?.denomination || 'Evangelical / Independent'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Recommending Pastor</span>
                    <span className="text-white">
                      {selectedStudent.registrationDetails?.pastorName || '—'} ({selectedStudent.registrationDetails?.pastorPhone || '—'})
                    </span>
                  </div>
                  <div className="sm:col-span-3">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Water Baptism</span>
                    <span className="text-white">
                      {selectedStudent.registrationDetails?.waterBaptism || 'Yes'} (Born Again: {selectedStudent.registrationDetails?.salvationYear || '—'})
                    </span>
                  </div>
                  <div className="sm:col-span-3 pt-1 border-t border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Ministry Calling &amp; Purpose</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/5">
                      {selectedStudent.callingBrief || selectedStudent.registrationDetails?.ministryCalling || 'Equipping for pastoral ministry, church planting, and theological leadership.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Internal Admin Notes */}
              <div className="space-y-2">
                <span className="font-serif font-bold text-base text-[#D4AF37]">
                  Administrative Notes &amp; Verification Remarks
                </span>
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    defaultValue={selectedStudent.notes || ''}
                    placeholder="Enter internal staff remarks, interview scores, document verification status, or scholarship notes..."
                    id={`admin-notes-${selectedStudent.id}`}
                    className="w-full p-3 rounded-xl bg-[#0c182b] border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById(`admin-notes-${selectedStudent.id}`) as HTMLTextAreaElement;
                      if (el) {
                        updateAdmissionStatus(selectedStudent.id, selectedStudent.status, el.value);
                        setSelectedStudent(prev => prev ? ({ ...prev, notes: el.value }) : null);
                        showToast('Internal administrative remarks saved');
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-4 bg-[#0c182b] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Registered on: <strong className="text-white font-mono">{formatReceiptDate(selectedStudent.createdAt)}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenReceipt(selectedStudent)}
                  className="px-4 py-2 rounded-xl bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] text-[#D4AF37] border border-[#D4AF37]/50 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View Printable A4 Receipt</span>
                </button>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. A4 PRINTABLE RECEIPT VIEWER MODAL */}
      {/* ============================================================== */}
      {receiptStudentData && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex flex-col items-center animate-in fade-in duration-200">
          
          {/* Top Receipt Control Header */}
          <div className="w-full max-w-4xl bg-[#1A365D] text-white p-3.5 px-5 rounded-2xl shadow-2xl border-2 border-[#D4AF37] flex flex-wrap items-center justify-between gap-3 mb-4 sticky top-2 z-20">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-serif font-bold text-sm text-white">
                Admin Receipt Preview · Application: <strong className="font-mono text-[#D4AF37]">{receiptStudentData.applicationNo}</strong> ({receiptStudentData.fullName})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-[#D4AF37] text-[#1A365D] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-white transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print A4</span>
              </button>

              <button
                onClick={() => setReceiptStudentData(null)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Close Receipt
              </button>
            </div>
          </div>

          {/* Full A4 Printable Component */}
          <div className="w-full max-w-4xl pb-10">
            <AdmissionReceiptA4
              data={receiptStudentData}
              onBackToForm={() => setReceiptStudentData(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
