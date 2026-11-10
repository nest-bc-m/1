import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  Send,  
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Church, 
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Printer,
  Upload,
  Camera,
  Trash2,
  Calendar,
  Building,
  Check
} from 'lucide-react';
import { AdmissionRegistrationData } from '../types';
import { useAdminData } from '../context/AdminDataContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  generateApplicationNumber, 
  validateRegistrationData 
} from '../utils/admissionRegistration';
import { AdmissionReceiptA4 } from './AdmissionReceiptA4';

interface OnlineAdmissionFormProps {
  initialProgramId?: string;
  onReceiptGenerated?: (receipt: AdmissionRegistrationData) => void;
}

export const OnlineAdmissionForm: React.FC<OnlineAdmissionFormProps> = ({
  initialProgramId = 'b-th',
  onReceiptGenerated,
}) => {
  const { programsList, institutionInfo, submitAdmissionInquiry } = useAdminData();
  const { t, currentLanguage } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initial Form State
  const [formData, setFormData] = useState<Partial<AdmissionRegistrationData>>({
    fullName: '',
    gender: 'Male',
    dob: '',
    phone: '',
    whatsapp: '',
    email: '',
    permanentAddress: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    guardianName: '',
    guardianPhone: '',
    programCategory: 'Regular',
    programId: initialProgramId,
    languageTrack: 'English Medium (Official)',
    academicYear: '2026–2027 (July Intake)',
    hostelNeeded: true,
    qualification: 'Pre-University Certificate (10+2 / PUC)',
    institutionName: '',
    boardOrUniversity: '',
    passingYear: '2023',
    percentageGrade: '',
    salvationYear: '',
    waterBaptism: 'Yes',
    churchName: '',
    denomination: 'Independent / Evangelical',
    pastorName: '',
    pastorPhone: '',
    churchAddress: '',
    ministryCalling: '',
    declarationAccepted: false,
    photoUrl: undefined,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<AdmissionRegistrationData | null>(() => {
    try {
      const saved = localStorage.getItem('nest_latest_admission_receipt');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialProgramId when changed externally (e.g. from course card click)
  useEffect(() => {
    if (initialProgramId) {
      const selected = programsList.find(p => p.id === initialProgramId);
      setFormData(prev => ({
        ...prev,
        programId: initialProgramId,
        programCategory: selected?.programCategory || prev.programCategory || 'Regular',
      }));
    }
  }, [initialProgramId, programsList]);

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          photo: 'File size exceeds 4MB. Please select a smaller photo image (under 4MB).',
        }));
        return;
      }
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next.photo;
        return next;
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photoUrl: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Sync category when program changes
  const handleProgramChange = (progId: string) => {
    const selected = programsList.find(p => p.id === progId);
    setFormData(prev => ({
      ...prev,
      programId: progId,
      programCategory: selected?.programCategory || 'Regular',
    }));
  };

  // Switch category filter and dynamically update primary course
  const handleCategorySwitch = (category: 'Regular' | 'Distance') => {
    const isRegular = category === 'Regular';
    setFormData(prev => ({
      ...prev,
      programCategory: category,
      programId: isRegular ? 'b-th' : 'b-th-distance',
    }));
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateRegistrationData(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsSubmitting(false);

      // Scroll to the first error
      const firstErrorKey = Object.keys(validation.errors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setValidationErrors({});

    const selectedProgram = programsList.find(p => p.id === formData.programId) || programsList[0];
    const programName = `${selectedProgram.code} — ${selectedProgram.title} (${selectedProgram.duration})`;
    const appNumber = generateApplicationNumber(2026);

    const initialStatus = 'Pending Verification / Under Review';
    const completeRegistrationData: AdmissionRegistrationData = {
      ...(formData as AdmissionRegistrationData),
      applicationNo: appNumber,
      submissionDate: new Date().toISOString(),
      programCategory: selectedProgram.programCategory,
      programName: programName,
      status: initialStatus,
    };

    // Store in Admin CMS with initial status: Pending Verification / Under Review (DO NOT auto-grant admission)
    submitAdmissionInquiry({
      fullName: completeRegistrationData.fullName,
      phone: completeRegistrationData.phone,
      email: completeRegistrationData.email,
      cityState: `${completeRegistrationData.city}, ${completeRegistrationData.state}`,
      programId: completeRegistrationData.programId,
      programName: completeRegistrationData.programName,
      languageTrack: completeRegistrationData.languageTrack,
      qualification: completeRegistrationData.qualification,
      churchName: completeRegistrationData.churchName,
      callingBrief: completeRegistrationData.ministryCalling,
      housingNeeded: completeRegistrationData.hostelNeeded,
      status: initialStatus,
      notes: `Registered through Online Form. Ref: ${appNumber}. Status: Pending Verification / Under Review. Passing Year: ${completeRegistrationData.passingYear}. Pastor: ${completeRegistrationData.pastorName} (${completeRegistrationData.pastorPhone})`,
      registrationDetails: completeRegistrationData,
    });

    // Save in LocalStorage for student convenience
    localStorage.setItem('nest_latest_admission_receipt', JSON.stringify(completeRegistrationData));

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedReceipt(completeRegistrationData);
      setJustSubmitted(true);
      if (onReceiptGenerated) onReceiptGenerated(completeRegistrationData);

      // Scroll receipt into view smoothly below navbar
      setTimeout(() => {
        const el = document.getElementById('nest-receipt-top');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 100);
    }, 400);
  };

  // If receipt is already generated, render the clean A4 printable receipt!
  if (submittedReceipt) {
    return (
      <AdmissionReceiptA4
        data={submittedReceipt}
        autoPrint={justSubmitted}
        onBackToForm={() => {
          setJustSubmitted(false);
          setSubmittedReceipt(null);
        }}
        onNewRegistration={() => {
          localStorage.removeItem('nest_latest_admission_receipt');
          setJustSubmitted(false);
          setSubmittedReceipt(null);
          setFormData({
            fullName: '',
            gender: 'Male',
            dob: '',
            phone: '',
            whatsapp: '',
            email: '',
            permanentAddress: '',
            city: '',
            state: 'Karnataka',
            pincode: '',
            guardianName: '',
            guardianPhone: '',
            programCategory: 'Regular',
            programId: 'b-th',
            languageTrack: 'English Medium (Official)',
            academicYear: '2026–2027 (July Intake)',
            hostelNeeded: true,
            qualification: 'Pre-University Certificate (10+2 / PUC)',
            institutionName: '',
            boardOrUniversity: '',
            passingYear: '2023',
            percentageGrade: '',
            salvationYear: '',
            waterBaptism: 'Yes',
            churchName: '',
            denomination: 'Independent / Evangelical',
            pastorName: '',
            pastorPhone: '',
            churchAddress: '',
            ministryCalling: '',
            declarationAccepted: false,
            photoUrl: undefined,
          });
        }}
      />
    );
  }

  const selectedProgramObj = programsList.find(p => p.id === formData.programId) || programsList[0];

  return (
    <div className="bg-[#F4F1EA] border-2 border-[#D1C7B7] rounded-2xl shadow-xl overflow-hidden font-sans">
      
      {/* Form Top Banner */}
      <div className="bg-[#1A365D] text-white p-6 sm:p-8 border-b-4 border-[#D4AF37]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-2 border border-[#D4AF37]/40">
              <GraduationCap className="w-4 h-4" />
              <span>{t('formBannerTag')}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t('formTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t('formSubtitle')}
            </p>
          </div>
        </div>

        {/* 5-Step Progress Guide */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {[
            { num: '1', label: t('stepPersonalContact') },
            { num: '2', label: t('stepProgramTrack') },
            { num: '3', label: t('stepQualifications') },
            { num: '4', label: t('stepChurchCalling') },
            { num: '5', label: t('stepDeclarationA4') },
          ].map((s, idx) => (
            <div key={idx} className={`bg-white/5 rounded-lg py-2 px-2 border border-white/10 flex items-center justify-center gap-1.5 ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#1A365D] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                {s.num}
              </span>
              <span className="text-slate-200 text-[11px] font-medium truncate">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6 text-xs sm:text-sm">
        
        {/* Error notification banner if any */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-800 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>Please resolve the following required fields to generate your receipt:</span>
            </div>
            <ul className="list-disc list-inside text-xs space-y-0.5 text-red-700 pl-6">
              {Object.values(validationErrors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ============================================================== */}
        {/* SECTION 1: PERSONAL & CONTACT INFORMATION */}
        {/* ============================================================== */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#D1C7B7] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D1C7B7] text-[#1A365D]">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-lg">{t('sectionPersonalHeader')}</h4>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">Step 1 of 5</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Full Name */}
            <div className="sm:col-span-8" id="field-fullName">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelFullName')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName || ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Jonathan David Samuel"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  validationErrors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D1C7B7]'
                } focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none`}
              />
              {validationErrors.fullName && (
                <p className="text-[11px] text-red-600 mt-1">{validationErrors.fullName}</p>
              )}
            </div>

            {/* Gender */}
            <div className="sm:col-span-4">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelGender')} <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.gender || 'Male'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white font-medium text-slate-900 outline-none"
              >
                <option value="Male">{t('genderMale')}</option>
                <option value="Female">{t('genderFemale')}</option>
                <option value="Other">{t('genderOther')}</option>
              </select>
            </div>
          </div>

          {/* Optional Student Passport Photo Upload */}
          <div className="bg-[#F4F1EA] p-4 rounded-xl border border-[#D1C7B7] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {formData.photoUrl ? (
                <div className="w-16 h-20 rounded border-2 border-[#1A365D] overflow-hidden shadow-sm flex-shrink-0 bg-white">
                  <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-20 rounded border-2 border-dashed border-[#D1C7B7] bg-white flex flex-col items-center justify-center text-slate-400 flex-shrink-0">
                  <Camera className="w-6 h-6 mb-1 text-slate-400" />
                  <span className="text-[8px] font-bold">3.5 × 4.5 cm</span>
                </div>
              )}
              <div>
                <p className="font-bold text-[#1A365D] text-xs sm:text-sm">
                  {t('candidatePhotoLabel')} <span className="text-slate-500 font-normal">{t('candidatePhotoOptional')}</span>
                </p>
                <p className="text-[11px] text-slate-600">
                  {t('candidatePhotoHelp')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="candidatePhotoInput"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 bg-white border border-[#D1C7B7] hover:border-[#1A365D] text-[#1A365D] font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{formData.photoUrl ? t('changePhotoBtn') : t('uploadPhotoBtn')}</span>
              </button>
              {formData.photoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* DOB */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelDOB')}
              </label>
              <input
                type="date"
                value={formData.dob || ''}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>

            {/* Mobile / Phone */}
            <div id="field-phone">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelPhone')} <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98451 23456"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  validationErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D1C7B7]'
                } focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none`}
              />
              {validationErrors.phone && (
                <p className="text-[11px] text-red-600 mt-1">{validationErrors.phone}</p>
              )}
            </div>

            {/* Email Address */}
            <div id="field-email">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelEmail')} <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="candidate@gmail.com"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  validationErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D1C7B7]'
                } focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none`}
              />
              {validationErrors.email && (
                <p className="text-[11px] text-red-600 mt-1">{validationErrors.email}</p>
              )}
            </div>
          </div>

          {/* Permanent Address */}
          <div>
            <label className="block font-bold text-[#1A365D] mb-1">
              {t('labelAddress')} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.permanentAddress || ''}
              onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
              placeholder="Door No, Street name, Locality / Landmark"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City */}
            <div id="field-city">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelCity')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Mysuru"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  validationErrors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D1C7B7]'
                } focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none`}
              />
            </div>

            {/* State */}
            <div id="field-state">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelState')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.state || ''}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Karnataka"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelPincode')}
              </label>
              <input
                type="text"
                value={formData.pincode || ''}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="e.g. 570003"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>
          </div>

          {/* Guardian Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelGuardianName')}
              </label>
              <input
                type="text"
                value={formData.guardianName || ''}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                placeholder="e.g. Rev. Samuel David (Father)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelGuardianPhone')}
              </label>
              <input
                type="tel"
                value={formData.guardianPhone || ''}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                placeholder="e.g. +91 94481 92837"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 2: ACADEMIC PROGRAM & STUDY TRACK */}
        {/* ============================================================== */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#D1C7B7] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D1C7B7] text-[#1A365D]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-lg">{t('sectionProgramHeader')}</h4>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">Step 2 of 5</span>
          </div>

          {/* Category Switcher Tabs */}
          <div>
            <label className="block font-bold text-[#1A365D] mb-2">
              {t('labelSelectTrack')} <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              <button
                type="button"
                onClick={() => handleCategorySwitch('Regular')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border-2 text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.programCategory === 'Regular'
                    ? 'bg-[#1A365D] text-white border-[#1A365D] shadow-md'
                    : 'bg-[#F4F1EA] text-slate-700 border-[#D1C7B7] hover:border-[#1A365D]'
                }`}
              >
                <span>🏛️ {t('trackRegularTab')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySwitch('Distance')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border-2 text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.programCategory === 'Distance'
                    ? 'bg-[#1A365D] text-white border-[#1A365D] shadow-md'
                    : 'bg-[#F4F1EA] text-slate-700 border-[#D1C7B7] hover:border-[#1A365D]'
                }`}
              >
                <span>🌐 {t('trackDistanceTab')}</span>
              </button>
            </div>
          </div>

          {/* Program Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="field-programId">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelSelectedProgram')} <span className="text-red-600">*</span>
              </label>
              <select
                id="field-programId-select"
                value={formData.programId || (formData.programCategory === 'Distance' ? 'b-th-distance' : 'b-th')}
                onChange={(e) => handleProgramChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white font-medium text-slate-900 outline-none cursor-pointer"
              >
                {formData.programCategory === 'Distance' ? (
                  <optgroup label="🌐 Distance Education Programs">
                    <option value="b-th-distance">B.Th (Distance) — Bachelor of Theology (3–4 Years)</option>
                    <option value="m-div-distance">M.Div (Distance) — Master of Divinity (3–4 Years)</option>
                    <option value="dip-th-distance">Dip.Th (Distance) — Diploma in Theology (2 Years)</option>
                  </optgroup>
                ) : (
                  <optgroup label="🏛️ Regular On-Campus Residential Programs">
                    <option value="b-th">B.Th (Residential) — Bachelor of Theology (3 Years)</option>
                    <option value="m-div">M.Div (Residential) — Master of Divinity (2–3 Years)</option>
                    <option value="dip-th">Dip.Th (Residential) — Diploma in Theology (2 Years)</option>
                  </optgroup>
                )}
              </select>
            </div>

            {/* Medium of Instruction */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelMediumInstruction')} <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.languageTrack || 'English Medium (Official)'}
                onChange={(e) => setFormData({ ...formData, languageTrack: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white font-medium text-slate-900 outline-none cursor-pointer"
              >
                <option value="English Medium (Official)">{t('optionEnglishMedium')}</option>
                <option value="Kannada & English Combined (Dip.Th Only)">{t('optionCombinedMedium')}</option>
              </select>
            </div>
          </div>

          {/* Program Snapshot Card */}
          {selectedProgramObj && (
            <div className="bg-[#F4F1EA] p-3.5 rounded-xl border border-[#D1C7B7] text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="font-bold text-[#1A365D]">{selectedProgramObj.title} ({selectedProgramObj.code})</span>
                <p className="text-slate-600">{selectedProgramObj.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#1A365D] text-white rounded font-bold text-[10px] uppercase">
                  Duration: {selectedProgramObj.duration}
                </span>
                {selectedProgramObj.ataAccredited && (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold text-[10px] uppercase">
                    ATA Accredited
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Academic Year Term */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelAdmissionTerm')}
              </label>
              <input
                type="text"
                readOnly
                value={formData.academicYear || '2026–2027 (July Intake)'}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] bg-slate-100 font-semibold text-slate-800 outline-none"
              />
            </div>

            {/* Hostel accommodation toggle */}
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="formHostel"
                checked={formData.hostelNeeded}
                onChange={(e) => setFormData({ ...formData, hostelNeeded: e.target.checked })}
                className="w-5 h-5 text-[#1A365D] rounded border-[#D1C7B7] focus:ring-[#1A365D] cursor-pointer"
              />
              <label htmlFor="formHostel" className="text-slate-800 font-semibold cursor-pointer">
                {t('labelHostelCheck')}
              </label>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 3: EDUCATIONAL QUALIFICATIONS */}
        {/* ============================================================== */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#D1C7B7] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D1C7B7] text-[#1A365D]">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-lg">{t('sectionEduHeader')}</h4>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">Step 3 of 5</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Highest Qualification */}
            <div id="field-qualification">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelHighestQual')} <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.qualification || 'Pre-University Certificate (10+2 / PUC)'}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white font-medium text-slate-900 outline-none"
              >
                <option value="Pre-University Certificate (10+2 / PUC)">10+2 / Pre-University Certificate (PUC / HSC)</option>
                <option value="Secondary School Leaving Certificate (SSLC / 10th)">SSLC / 10th Standard (Dip.Th Eligibility)</option>
                <option value="Bachelor of Theology (ATA B.Th)">Bachelor of Theology (ATA Accredited B.Th)</option>
                <option value="Bachelor Degree (BA / B.Com / B.Sc / B.Tech)">Secular Graduate Degree (BA / B.Com / B.Sc / B.Tech)</option>
                <option value="Master Degree (MA / M.Sc / M.Com)">Master's Degree (Post-Graduate)</option>
              </select>
            </div>

            {/* Institution / College Name */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelInstitutionName')}
              </label>
              <input
                type="text"
                value={formData.institutionName || ''}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                placeholder="e.g. St. Philomena College / Government PU College"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Board / University */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelBoardUniv')}
              </label>
              <input
                type="text"
                value={formData.boardOrUniversity || ''}
                onChange={(e) => setFormData({ ...formData, boardOrUniversity: e.target.value })}
                placeholder="e.g. Karnataka PU Board / University of Mysore"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>

            {/* Year of Passing */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelPassingYear')}
              </label>
              <input
                type="text"
                value={formData.passingYear || ''}
                onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                placeholder="e.g. 2022"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>

            {/* Marks / Percentage */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelMarksGrade')}
              </label>
              <input
                type="text"
                value={formData.percentageGrade || ''}
                onChange={(e) => setFormData({ ...formData, percentageGrade: e.target.value })}
                placeholder="e.g. 74% (First Class)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 4: CHURCH, PASTOR & MINISTRY CALLING */}
        {/* ============================================================== */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#D1C7B7] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D1C7B7] text-[#1A365D]">
            <div className="flex items-center gap-2">
              <Church className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-lg">{t('sectionChurchHeader')}</h4>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">Step 4 of 5</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Church Name */}
            <div id="field-churchName">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelChurchName')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.churchName || ''}
                onChange={(e) => setFormData({ ...formData, churchName: e.target.value })}
                placeholder="e.g. Bethel Assembly Church, Mysuru"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  validationErrors.churchName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D1C7B7]'
                } focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none`}
              />
            </div>

            {/* Denomination */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelDenomination')}
              </label>
              <input
                type="text"
                value={formData.denomination || ''}
                onChange={(e) => setFormData({ ...formData, denomination: e.target.value })}
                placeholder="e.g. Evangelical / Pentecostal / Baptist / Independent"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Pastor Name */}
            <div id="field-pastorName">
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelPastorName')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.pastorName || ''}
                onChange={(e) => setFormData({ ...formData, pastorName: e.target.value })}
                placeholder="e.g. Rev. Daniel K. Abraham"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  validationErrors.pastorName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D1C7B7]'
                } focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none`}
              />
            </div>

            {/* Pastor Phone */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelPastorPhone')} <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.pastorPhone || ''}
                onChange={(e) => setFormData({ ...formData, pastorPhone: e.target.value })}
                placeholder="e.g. +91 98801 44552"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
              />
            </div>

            {/* Water Baptism */}
            <div>
              <label className="block font-bold text-[#1A365D] mb-1">
                {t('labelWaterBaptism')}
              </label>
              <select
                value={formData.waterBaptism || 'Yes'}
                onChange={(e) => setFormData({ ...formData, waterBaptism: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white font-medium text-slate-900 outline-none"
              >
                <option value="Yes">{t('optionBaptismYes')}</option>
                <option value="No">{t('optionBaptismNo')}</option>
              </select>
            </div>
          </div>

          {/* Ministry Calling */}
          <div>
            <label className="block font-bold text-[#1A365D] mb-1">
              {t('labelMinistryCalling')}
            </label>
            <textarea
              rows={3}
              value={formData.ministryCalling || ''}
              onChange={(e) => setFormData({ ...formData, ministryCalling: e.target.value })}
              placeholder="Briefly describe your ministry goal (e.g. Pastoral ministry, church planting, youth mentorship, cross-cultural evangelism, theological teaching)..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1C7B7] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] bg-white text-slate-900 outline-none"
            ></textarea>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 5: DECLARATION & SUBMISSION */}
        {/* ============================================================== */}
        <div className="bg-[#F4F1EA] rounded-xl p-5 sm:p-6 border-2 border-[#D4AF37] space-y-4">
          <div className="flex items-center justify-between text-[#1A365D] font-serif font-bold text-base">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <span>{t('sectionDeclHeader')}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-sans font-semibold">Final Step</span>
          </div>

          <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#D1C7B7]" id="field-declarationAccepted">
            <input
              type="checkbox"
              id="declAccepted"
              required
              checked={formData.declarationAccepted || false}
              onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
              className="w-5 h-5 mt-0.5 text-[#1A365D] rounded border-[#D1C7B7] focus:ring-[#1A365D] cursor-pointer flex-shrink-0"
            />
            <label htmlFor="declAccepted" className="text-slate-800 text-xs sm:text-sm cursor-pointer leading-relaxed">
              {t('declarationStatement')}
            </label>
          </div>
          {validationErrors.declarationAccepted && (
            <p className="text-[11px] text-red-600 font-bold">{validationErrors.declarationAccepted}</p>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex-1 py-4 px-8 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider cursor-pointer disabled:opacity-50 border-2 border-emerald-500 hover:shadow-xl active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span>Generating Official A4 Receipt...</span>
              ) : (
                <>
                  <Printer className="w-5 h-5 text-[#D4AF37]" />
                  <span>{t('submitGenerateReceiptBtn')}</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-600 pt-1">
            Official Principal Desk: <strong className="text-[#1A365D]">{institutionInfo.phoneFormatted}</strong> · Nagarthalli Campus, Mysore · ATA Accredited
          </div>
        </div>

      </form>

    </div>
  );
};
