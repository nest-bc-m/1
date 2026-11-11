import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Users, 
  BookOpen, 
  Camera, 
  Bell, 
  GraduationCap, 
  ShieldCheck, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  LogOut, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  Upload, 
  RotateCcw, 
  Key, 
  ExternalLink,
  MessageSquare,
  Search,
  Filter,
  Check,
  Building,
  Calendar
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useLanguage } from '../context/LanguageContext';
import { FacultyMember, AcademicProgram, GalleryPhotoItem, AnnouncementItem, AdmissionSubmission } from '../types';
import { StudentRegistrationsDashboard } from './StudentRegistrationsDashboard';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: TabType;
}

type TabType = 'overview' | 'general' | 'announcements' | 'faculty' | 'programs' | 'gallery' | 'admissions' | 'settings';

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose, initialTab = 'overview' }) => {
  const {
    isAdminLoggedIn,
    adminEmail,
    updateAdminCredentials,
    institutionInfo,
    updateInstitutionInfo,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    facultyList,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    programsList,
    addProgram,
    updateProgram,
    deleteProgram,
    galleryPhotos,
    addPhoto,
    updatePhoto,
    deletePhoto,
    admissionsList,
    updateAdmissionStatus,
    deleteAdmissionInquiry,
    logout,
    changePassword,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = useAdminData();

  const { currentLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // General Info Form State
  const [generalForm, setGeneralForm] = useState({
    principal: institutionInfo.principal,
    principalKn: institutionInfo.principalKn,
    phone: institutionInfo.phone,
    phoneFormatted: institutionInfo.phoneFormatted,
    email: institutionInfo.email,
    address: institutionInfo.address,
    addressKn: institutionInfo.addressKn,
    motto: institutionInfo.motto,
    mottoKn: institutionInfo.mottoKn,
    mottoScripture: institutionInfo.mottoScripture,
    facebookUrl: institutionInfo.socialLinks.facebook,
    youtubeUrl: institutionInfo.socialLinks.youtube,
    locationUrl: institutionInfo.socialLinks.location,
    ataDirectoryUrl: institutionInfo.accreditation.directoryUrl,
  });

  // Modals inside Admin
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);
  const [facultyForm, setFacultyForm] = useState<Partial<FacultyMember>>({
    name: '',
    nameKn: '',
    title: '',
    titleKn: '',
    role: 'Faculty',
    qualification: '',
    specialization: '',
    department: 'Theology & Ethics',
    bio: '',
    bioKn: '',
    experienceYears: 5,
    coursesTaught: [],
  });

  const [editingProgram, setEditingProgram] = useState<AcademicProgram | null>(null);
  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [programForm, setProgramForm] = useState<Partial<AcademicProgram>>({
    code: '',
    title: '',
    titleKn: '',
    programCategory: 'Regular',
    degreeLevel: 'Bachelor',
    duration: '3 Years (Residential)',
    durationKn: '3 ವರ್ಷಗಳು (ವಸತಿಯುತ)',
    mode: 'Regular Classes / Full-Time Residential',
    language: 'English Medium Only (Official)',
    eligibility: '',
    description: '',
    keySubjects: [],
    ataAccredited: true,
  });

  const [editingPhoto, setEditingPhoto] = useState<GalleryPhotoItem | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [photoForm, setPhotoForm] = useState<Partial<GalleryPhotoItem>>({
    category: 'grounds',
    titleEn: '',
    titleKn: '',
    descEn: '',
    descKn: '',
    locationEn: 'Nagarthalli Campus, Mysore',
    locationKn: 'ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್, ಮೈಸೂರು',
    imageUrl: '',
    tagEn: 'Campus View',
    tagKn: 'ಕ್ಯಾಂಪಸ್ ನೋಟ',
  });

  const [newAnnouncementTitleEn, setNewAnnouncementTitleEn] = useState('');
  const [newAnnouncementTitleKn, setNewAnnouncementTitleKn] = useState('');
  const [newAnnouncementBadgeEn, setNewAnnouncementBadgeEn] = useState('Notice');
  const [newAnnouncementBadgeKn, setNewAnnouncementBadgeKn] = useState('ಸೂಚನೆ');

  // Admin Credentials State
  const [editAdminEmail, setEditAdminEmail] = useState(adminEmail || 'Ajesh@nestmysore.org');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passError, setPassError] = useState<string | null>(null);

  React.useEffect(() => {
    if (adminEmail) {
      setEditAdminEmail(adminEmail);
    }
  }, [adminEmail]);

  // Admissions Filter
  const [admissionsSearch, setAdmissionsSearch] = useState('');
  const [admissionsStatusFilter, setAdmissionsStatusFilter] = useState<string>('all');

  // Strict Authorization Guard: unauthorized users cannot view or render the portal
  if (!isOpen || !isAdminLoggedIn) return null;

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstitutionInfo({
      principal: generalForm.principal,
      principalKn: generalForm.principalKn,
      phone: generalForm.phone,
      phoneFormatted: generalForm.phoneFormatted,
      email: generalForm.email,
      address: generalForm.address,
      addressKn: generalForm.addressKn,
      motto: generalForm.motto,
      mottoKn: generalForm.mottoKn,
      mottoScripture: generalForm.mottoScripture,
      socialLinks: {
        ...institutionInfo.socialLinks,
        facebook: generalForm.facebookUrl,
        youtube: generalForm.youtubeUrl,
        location: generalForm.locationUrl,
        ataDirectory: generalForm.ataDirectoryUrl,
      },
      accreditation: {
        ...institutionInfo.accreditation,
        directoryUrl: generalForm.ataDirectoryUrl,
      },
    });
    showToast('Institutional information updated successfully / ವಿವರಗಳನ್ನು ಉಳಿಸಲಾಗಿದೆ!');
  };

  const handleSaveFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaculty) {
      updateFaculty(editingFaculty.id, facultyForm);
      showToast('Faculty member updated / ಅಧ್ಯಾಪಕರ ವಿವರ ನವೀಕರಿಸಲಾಗಿದೆ!');
      setEditingFaculty(null);
    } else {
      addFaculty({
        name: facultyForm.name || 'New Faculty',
        nameKn: facultyForm.nameKn || facultyForm.name || 'ಅಧ್ಯಾಪಕರು',
        title: facultyForm.title || 'Lecturer in Theology',
        titleKn: facultyForm.titleKn || 'ಉಪನ್ಯಾಸಕರು',
        role: facultyForm.role || 'Faculty',
        qualification: facultyForm.qualification || 'M.Th / M.Div',
        specialization: facultyForm.specialization || 'Theological Studies',
        department: (facultyForm.department as any) || 'Theology & Ethics',
        bio: facultyForm.bio || '',
        bioKn: facultyForm.bioKn || '',
        experienceYears: Number(facultyForm.experienceYears) || 5,
        coursesTaught: facultyForm.coursesTaught || [],
      });
      showToast('New faculty member added / ಹೊಸ ಅಧ್ಯಾಪಕರನ್ನು ಸೇರಿಸಲಾಗಿದೆ!');
      setIsAddingFaculty(false);
    }
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProgram) {
      updateProgram(editingProgram.id, programForm);
      showToast('Academic program updated / ಕೋರ್ಸ್ ವಿವರ ನವೀಕರಿಸಲಾಗಿದೆ!');
      setEditingProgram(null);
    } else {
      addProgram({
        code: programForm.code || 'DEGREE',
        title: programForm.title || 'New Program',
        titleKn: programForm.titleKn || programForm.title || 'ಹೊಸ ಕೋರ್ಸ್',
        programCategory: programForm.programCategory || 'Regular',
        programCategoryKn: programForm.programCategory === 'Distance' ? 'ದೂರಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ' : 'ರೆಗ್ಯುಲರ್ ತರಗತಿಗಳು',
        degreeLevel: programForm.degreeLevel || 'Bachelor',
        duration: programForm.duration || '3 Years',
        durationKn: programForm.durationKn || '3 ವರ್ಷಗಳು',
        mode: programForm.mode || 'Regular Classes / Full-Time Residential',
        language: programForm.language || 'English Medium Only (Official)',
        eligibility: programForm.eligibility || 'PUC / 10+2',
        description: programForm.description || '',
        keySubjects: programForm.keySubjects || [],
        ataAccredited: Boolean(programForm.ataAccredited),
        careerPaths: ['Pastor', 'Evangelist', 'Teacher'],
      });
      showToast('New academic program added / ಹೊಸ ಕೋರ್ಸ್ ಸೇರಿಸಲಾಗಿದೆ!');
      setIsAddingProgram(false);
    }
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhoto) {
      updatePhoto(editingPhoto.id, photoForm);
      showToast('Photo metadata updated / ಫೋಟೋ ವಿವರ ನವೀಕರಿಸಲಾಗಿದೆ!');
      setEditingPhoto(null);
    } else {
      addPhoto({
        category: (photoForm.category as any) || 'grounds',
        titleEn: photoForm.titleEn || 'Campus Photo',
        titleKn: photoForm.titleKn || 'ಕ್ಯಾಂಪಸ್ ಫೋಟೋ',
        descEn: photoForm.descEn || '',
        descKn: photoForm.descKn || '',
        locationEn: photoForm.locationEn || 'Nagarthalli Campus, Mysore',
        locationKn: photoForm.locationKn || 'ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್, ಮೈಸೂರು',
        imageUrl: photoForm.imageUrl ? getAssetUrl(photoForm.imageUrl, 'college') : getAssetUrl('assets/aistudio/college_48f40f17.webp', 'college'),
        tagEn: photoForm.tagEn || 'Campus View',
        tagKn: photoForm.tagKn || 'ಕ್ಯಾಂಪಸ್ ನೋಟ',
      });
      showToast('New photo added to gallery / ಗ್ಯಾಲರಿಗೆ ಹೊಸ ಫೋಟೋ ಸೇರಿಸಲಾಗಿದೆ!');
      setIsAddingPhoto(false);
    }
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementTitleEn) return;
    addAnnouncement({
      badgeEn: newAnnouncementBadgeEn,
      badgeKn: newAnnouncementBadgeKn,
      titleEn: newAnnouncementTitleEn,
      titleKn: newAnnouncementTitleKn || newAnnouncementTitleEn,
      subEn: 'Native Evangelical School of Theology, Mysore',
      subKn: 'ನೇಟಿವ್ ಇವಾಂಜೆಲಿಕಲ್ ಸ್ಕೂಲ್ ಆಫ್ ಥಿಯಾಲಜಿ, ಮೈಸೂರು',
      linkTextEn: 'View Details',
      linkTextKn: 'ವಿವರ ನೋಡಿ',
      linkUrl: '#admissions',
      isActive: true,
    });
    setNewAnnouncementTitleEn('');
    setNewAnnouncementTitleKn('');
    showToast('New announcement published / ಹೊಸ ಸೂಚನೆ ಪ್ರಕಟಿಸಲಾಗಿದೆ!');
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    const res = updateAdminCredentials(editAdminEmail, oldPass ? oldPass : undefined, newPass ? newPass : undefined);
    if (res.success) {
      showToast(currentLanguage === 'kn' ? 'ಅಡ್ಮಿನ್ ರುಜುವಾತುಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!' : 'Admin credentials updated successfully!');
      setOldPass('');
      setNewPass('');
    } else {
      setPassError(res.error || 'Failed to update credentials');
    }
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nest-mysore-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Website backup downloaded / ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importDataJson(content);
      if (res.success) {
        showToast('Backup restored successfully / ಡೇಟಾ ಮರುಸ್ಥಾಪಿಸಲಾಗಿದೆ!');
      } else {
        showToast('Failed to import: ' + (res.error || 'Invalid file format'));
      }
    };
    reader.readAsText(file);
  };

  const filteredAdmissions = admissionsList.filter((a) => {
    const matchesStatus = admissionsStatusFilter === 'all' || a.status === admissionsStatusFilter;
    const matchesSearch =
      a.fullName.toLowerCase().includes(admissionsSearch.toLowerCase()) ||
      a.phone.includes(admissionsSearch) ||
      a.cityState.toLowerCase().includes(admissionsSearch.toLowerCase()) ||
      a.programName.toLowerCase().includes(admissionsSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#112440] text-white rounded-3xl max-w-6xl w-full h-[94vh] flex flex-col overflow-hidden border-2 border-[#D4AF37] shadow-2xl relative">
        
        {/* Top Master Admin Bar */}
        <div className="p-4 sm:p-5 bg-[#1A365D] border-b border-[#D4AF37]/50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#112440] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow font-bold text-sm">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D4AF37]">
                  NEST MYSORE · MASTER CMS CONTROL
                </span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-400/30">
                  Full Rights Active
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-white">
                {currentLanguage === 'kn' ? 'ವೆಬ್‌ಸೈಟ್ ಸಂಪೂರ್ಣ ಆಡಳಿತ ಪೋರ್ಟಲ್' : 'Institutional Content Management System'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#1A365D] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast Alert */}
        {successMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-sans font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top duration-150 flex-shrink-0 shadow-md">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Body with Sidebar Navigation */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          
          {/* Sidebar Nav Tabs */}
          <div className="w-full md:w-64 bg-[#0d1a2d] border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto flex-shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLanguage === 'kn' ? 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅವಲೋಕನ' : 'Dashboard Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'general'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLanguage === 'kn' ? 'ಸಾಮಾನ್ಯ & ಸಂಪರ್ಕ ವಿವರ' : 'General & Contact Info'}</span>
            </button>

            <button
              onClick={() => setActiveTab('admissions')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center justify-between transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'admissions'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLanguage === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ ನೋಂದಣಿಗಳು' : 'Student Registrations'}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1A365D] text-[10px] font-bold">
                {admissionsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center justify-between transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'announcements'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLanguage === 'kn' ? 'ಸೂಚನಾ ಫಲಕ (Ticker)' : 'Notice Bulletins'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">({announcements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('faculty')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center justify-between transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'faculty'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLanguage === 'kn' ? 'ಬೋಧಕ ವೃಂದ' : 'Faculty & Leadership'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">({facultyList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('programs')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center justify-between transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'programs'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLanguage === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಕೋರ್ಸ್‌ಗಳು' : 'Academic Programs'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">({programsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center justify-between transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLanguage === 'kn' ? 'ಕ್ಯಾಂಪಸ್ ಫೋಟೋಗಳು' : 'Campus Photo Gallery'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">({galleryPhotos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-sans font-bold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-[#1A365D] text-[#D4AF37] border border-[#D4AF37] shadow'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLanguage === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ & ಬ್ಯಾಕಪ್' : 'Settings & Backup'}</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#0a1526]">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {currentLanguage === 'kn' ? 'ಆಡಳಿತ ಮಂಡಳಿ ಅವಲೋಕನ' : 'Administrative Control Overview'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                    Native Evangelical School of Theology, Nagarthalli, Mysore · ATA India Accredited
                  </p>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div 
                    onClick={() => setActiveTab('admissions')}
                    className="p-4 rounded-2xl bg-[#112440] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all cursor-pointer space-y-2 shadow"
                  >
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span>Admissions Inquiries</span>
                      <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {admissionsList.length}
                    </div>
                    <span className="text-[11px] text-[#D4AF37] font-semibold block">Click to view inquiries →</span>
                  </div>

                  <div 
                    onClick={() => setActiveTab('faculty')}
                    className="p-4 rounded-2xl bg-[#112440] border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer space-y-2 shadow"
                  >
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span>Resident Faculty</span>
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {facultyList.length}
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold block">ATA Certified Mentors</span>
                  </div>

                  <div 
                    onClick={() => setActiveTab('programs')}
                    className="p-4 rounded-2xl bg-[#112440] border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer space-y-2 shadow"
                  >
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span>Degrees & Programs</span>
                      <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {programsList.length}
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold block">B.Th, M.Div, Dip.Th</span>
                  </div>

                  <div 
                    onClick={() => setActiveTab('gallery')}
                    className="p-4 rounded-2xl bg-[#112440] border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer space-y-2 shadow"
                  >
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span>Campus Photos</span>
                      <Camera className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {galleryPhotos.length}
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold block">100% Original Photos</span>
                  </div>
                </div>

                {/* Quick Authority Actions */}
                <div className="p-6 rounded-2xl bg-[#112440] border border-white/15 space-y-4">
                  <h4 className="font-serif text-lg font-bold text-[#D4AF37]">
                    {currentLanguage === 'kn' ? 'ತ್ವರಿತ ಸಂಪಾದನೆ ಅಧಿಕಾರಗಳು (Quick Actions)' : 'Quick Administrative Actions'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                    <button
                      onClick={() => setActiveTab('general')}
                      className="p-3 rounded-xl bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] border border-[#D4AF37]/50 font-bold text-left transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>ಸಂಪರ್ಕ & ಪ್ರಿನ್ಸಿಪಾಲ್ ವಿವರ ಬದಲಾಯಿಸಿ</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('faculty');
                        setIsAddingFaculty(true);
                      }}
                      className="p-3 rounded-xl bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] border border-[#D4AF37]/50 font-bold text-left transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>ಹೊಸ ಅಧ್ಯಾಪಕರನ್ನು ಸೇರಿಸಿ (Add Faculty)</span>
                      <span>+</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('gallery');
                        setIsAddingPhoto(true);
                      }}
                      className="p-3 rounded-xl bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] border border-[#D4AF37]/50 font-bold text-left transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>ಹೊಸ ಫೋಟೋ ಸೇರಿಸಿ (Add Photo)</span>
                      <span>+</span>
                    </button>
                  </div>
                </div>

                {/* Institutional Info Card */}
                <div className="p-5 rounded-2xl bg-[#112440] border border-[#D4AF37]/30 flex items-center justify-between text-xs text-slate-300 font-sans">
                  <div>
                    <span className="font-bold text-[#D4AF37] block">Current Head of Institution:</span>
                    <span>{institutionInfo.principal} · {institutionInfo.phoneFormatted}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('general')}
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[#D4AF37] font-bold cursor-pointer"
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: GENERAL & CONTACT INFO */}
            {activeTab === 'general' && (
              <form onSubmit={handleSaveGeneral} className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {currentLanguage === 'kn' ? 'ಸಂಸ್ಥೆಯ ಸಾಮಾನ್ಯ ಮತ್ತು ಸಂಪರ್ಕ ವಿವರಗಳು' : 'Institutional Information & Contacts'}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Make changes here and click "Save All Changes". The website updates instantly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Principal Name English */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Principal Name (English)</label>
                    <input
                      type="text"
                      value={generalForm.principal}
                      onChange={(e) => setGeneralForm({ ...generalForm, principal: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                    />
                  </div>

                  {/* Principal Name Kannada */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Principal Name (ಕನ್ನಡ)</label>
                    <input
                      type="text"
                      value={generalForm.principalKn}
                      onChange={(e) => setGeneralForm({ ...generalForm, principalKn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Official Phone (Numbers only)</label>
                    <input
                      type="text"
                      value={generalForm.phone}
                      onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                    />
                  </div>

                  {/* Phone Formatted */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Formatted Phone Display</label>
                    <input
                      type="text"
                      value={generalForm.phoneFormatted}
                      onChange={(e) => setGeneralForm({ ...generalForm, phoneFormatted: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Official Email Address</label>
                    <input
                      type="email"
                      value={generalForm.email}
                      onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                    />
                  </div>

                  {/* Motto Scripture */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Foundational Scripture Reference</label>
                    <input
                      type="text"
                      value={generalForm.mottoScripture}
                      onChange={(e) => setGeneralForm({ ...generalForm, mottoScripture: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Address English */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-[#D4AF37]">Full Campus Address (English)</label>
                  <textarea
                    rows={2}
                    value={generalForm.address}
                    onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                  />
                </div>

                {/* Address Kannada */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-[#D4AF37]">ಕ್ಯಾಂಪಸ್ ವಿಳಾಸ (ಕನ್ನಡ)</label>
                  <textarea
                    rows={2}
                    value={generalForm.addressKn}
                    onChange={(e) => setGeneralForm({ ...generalForm, addressKn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#112440] border border-white/20 focus:border-[#D4AF37] text-white text-xs sm:text-sm font-sans"
                  />
                </div>

                {/* Social & Directory Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">ATA India Directory Link</label>
                    <input
                      type="text"
                      value={generalForm.ataDirectoryUrl}
                      onChange={(e) => setGeneralForm({ ...generalForm, ataDirectoryUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#112440] border border-white/20 text-xs font-mono text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Official Facebook Page Link</label>
                    <input
                      type="text"
                      value={generalForm.facebookUrl}
                      onChange={(e) => setGeneralForm({ ...generalForm, facebookUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#112440] border border-white/20 text-xs font-mono text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Official YouTube Channel Link</label>
                    <input
                      type="text"
                      value={generalForm.youtubeUrl}
                      onChange={(e) => setGeneralForm({ ...generalForm, youtubeUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#112440] border border-white/20 text-xs font-mono text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-[#D4AF37]">Google Maps Campus Location Link</label>
                    <input
                      type="text"
                      value={generalForm.locationUrl}
                      onChange={(e) => setGeneralForm({ ...generalForm, locationUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#112440] border border-white/20 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-white text-[#1A365D] font-sans font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{currentLanguage === 'kn' ? 'ಎಲ್ಲಾ ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ' : 'Save Institutional Changes'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: STUDENT REGISTRATIONS & ADMISSIONS DASHBOARD */}
            {activeTab === 'admissions' && (
              <StudentRegistrationsDashboard />
            )}

            {/* TAB 4: ANNOUNCEMENTS */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {currentLanguage === 'kn' ? 'ಸೂಚನಾ ಫಲಕ ಮತ್ತು ಪ್ರಕಟಣೆಗಳು' : 'Institutional Bulletin Ribbon & Announcements'}
                    </h3>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">
                      These announcements scroll across the top bar of the website.
                    </p>
                  </div>
                </div>

                {/* Create New Announcement Form */}
                <form onSubmit={handleCreateAnnouncement} className="p-4 rounded-2xl bg-[#112440] border border-[#D4AF37]/40 space-y-3">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block font-sans">
                    + Add New Top Announcement
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Badge English (e.g. Admissions 2026)"
                      value={newAnnouncementBadgeEn}
                      onChange={(e) => setNewAnnouncementBadgeEn(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Badge Kannada (e.g. ಪ್ರವೇಶಾತಿ 2026)"
                      value={newAnnouncementBadgeKn}
                      onChange={(e) => setNewAnnouncementBadgeKn(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Announcement Text English"
                      required
                      value={newAnnouncementTitleEn}
                      onChange={(e) => setNewAnnouncementTitleEn(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Announcement Text Kannada (ಪ್ರಕಟಣೆ ವಿವರ)"
                      value={newAnnouncementTitleKn}
                      onChange={(e) => setNewAnnouncementTitleKn(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Announcement</span>
                  </button>
                </form>

                {/* Existing Announcements List */}
                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-4 rounded-xl bg-[#112440] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-[#1A365D] font-bold text-[10px] uppercase">
                            {ann.badgeEn}
                          </span>
                          <span className={`text-[10px] font-bold ${ann.isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {ann.isActive ? '● Live on Site' : '○ Disabled'}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white font-sans">{ann.titleEn}</p>
                        <p className="text-xs text-slate-300 font-sans">{ann.titleKn}</p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            updateAnnouncement(ann.id, { isActive: !ann.isActive });
                            showToast(ann.isActive ? 'Announcement disabled' : 'Announcement activated');
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            ann.isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {ann.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => {
                            deleteAnnouncement(ann.id);
                            showToast('Announcement deleted');
                          }}
                          className="p-1.5 rounded bg-red-950/60 text-red-300 hover:bg-red-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: FACULTY & LEADERSHIP */}
            {activeTab === 'faculty' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {currentLanguage === 'kn' ? 'ಬೋಧಕ ವೃಂದ ಮತ್ತು ನಾಯಕತ್ವ' : 'Faculty & Institutional Leadership'}
                    </h3>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">
                      Full authority to add new professors, update credentials, or delete members.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingFaculty(null);
                      setFacultyForm({
                        name: '',
                        nameKn: '',
                        title: '',
                        titleKn: '',
                        role: 'Faculty',
                        qualification: 'M.Th / M.Div',
                        specialization: '',
                        department: 'Biblical Studies',
                        bio: '',
                        bioKn: '',
                        experienceYears: 5,
                        coursesTaught: [],
                      });
                      setIsAddingFaculty(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{currentLanguage === 'kn' ? 'ಹೊಸ ಅಧ್ಯಾಪಕರನ್ನು ಸೇರಿಸಿ' : 'Add New Faculty Member'}</span>
                  </button>
                </div>

                {/* Add / Edit Faculty Form Modal or Accordion */}
                {(isAddingFaculty || editingFaculty) && (
                  <form onSubmit={handleSaveFaculty} className="p-5 rounded-2xl bg-[#112440] border-2 border-[#D4AF37] space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-serif font-bold text-base text-[#D4AF37]">
                        {editingFaculty ? 'Edit Faculty Details' : 'Add New Faculty Member'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingFaculty(false);
                          setEditingFaculty(null);
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Name (English)</label>
                        <input
                          type="text"
                          required
                          value={facultyForm.name || ''}
                          onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">ಹೆಸರು (ಕನ್ನಡ)</label>
                        <input
                          type="text"
                          value={facultyForm.nameKn || ''}
                          onChange={(e) => setFacultyForm({ ...facultyForm, nameKn: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Academic Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Professor of Systematic Theology"
                          value={facultyForm.title || ''}
                          onChange={(e) => setFacultyForm({ ...facultyForm, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Degrees & Qualifications</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. M.Th (New Testament), B.D, B.Th"
                          value={facultyForm.qualification || ''}
                          onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Specialization</label>
                        <input
                          type="text"
                          value={facultyForm.specialization || ''}
                          onChange={(e) => setFacultyForm({ ...facultyForm, specialization: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Department</label>
                        <select
                          value={facultyForm.department || 'Biblical Studies'}
                          onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        >
                          <option value="Biblical Studies">Biblical Studies (OT & NT)</option>
                          <option value="Theology & Ethics">Theology & Apologetics</option>
                          <option value="Pastoral Ministry">Pastoral & Practical Ministry</option>
                          <option value="Missiology & History">Missions & Church History</option>
                          <option value="Administration">Administration & Governance</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Academic Bio / Ministerial Experience</label>
                      <textarea
                        rows={2}
                        value={facultyForm.bio || ''}
                        onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        {editingFaculty ? 'Save Faculty Updates' : 'Add Member to Faculty List'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingFaculty(false);
                          setEditingFaculty(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-white/10 text-xs text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Faculty List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {facultyList.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 rounded-xl bg-[#112440] border border-white/10 hover:border-[#D4AF37]/50 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-[#D4AF37]">
                          <span className="font-bold">{member.department}</span>
                          <span className="text-slate-400 font-mono">{member.experienceYears || 5}+ Yrs</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-white">{member.name}</h4>
                        <p className="text-xs text-slate-300 font-sans">{member.title}</p>
                        <p className="text-[11px] text-[#D4AF37] font-mono">{member.qualification}</p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            setEditingFaculty(member);
                            setFacultyForm(member);
                            setIsAddingFaculty(false);
                          }}
                          className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete ${member.name} from faculty?`)) {
                              deleteFaculty(member.id);
                              showToast(`${member.name} removed from faculty`);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: ACADEMIC PROGRAMS */}
            {activeTab === 'programs' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {currentLanguage === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಕೋರ್ಸ್‌ಗಳು & ಪದವಿಗಳು' : 'Academic Programs & Degrees'}
                    </h3>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">
                      Configure B.Th, M.Div, Dip.Th curriculum, duration, and eligibility criteria.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingProgram(null);
                      setProgramForm({
                        code: 'CERT',
                        title: '',
                        titleKn: '',
                        degreeLevel: 'Certificate',
                        duration: '1 Year',
                        durationKn: '1 ವರ್ಷ',
                        mode: 'Residential / Full-Time',
                        language: 'English Medium Only (Official)',
                        eligibility: 'Christian Testimony',
                        description: '',
                        keySubjects: [],
                        ataAccredited: true,
                      });
                      setIsAddingProgram(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{currentLanguage === 'kn' ? 'ಹೊಸ ಕೋರ್ಸ್ ಸೇರಿಸಿ' : 'Add New Program'}</span>
                  </button>
                </div>

                {/* Edit / Add Program Form */}
                {(isAddingProgram || editingProgram) && (
                  <form onSubmit={handleSaveProgram} className="p-5 rounded-2xl bg-[#112440] border-2 border-[#D4AF37] space-y-4">
                    <span className="font-serif font-bold text-base text-[#D4AF37] block">
                      {editingProgram ? 'Edit Academic Program' : 'Add New Degree Program'}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Degree Code (e.g. B.Th)</label>
                        <input
                          type="text"
                          required
                          value={programForm.code || ''}
                          onChange={(e) => setProgramForm({ ...programForm, code: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Program Title (English)</label>
                        <input
                          type="text"
                          required
                          value={programForm.title || ''}
                          onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Duration (e.g. 3 Years Residential)</label>
                        <input
                          type="text"
                          required
                          value={programForm.duration || ''}
                          onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Medium / Language</label>
                        <input
                          type="text"
                          required
                          value={programForm.language || ''}
                          onChange={(e) => setProgramForm({ ...programForm, language: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Eligibility Requirements</label>
                      <input
                        type="text"
                        value={programForm.eligibility || ''}
                        onChange={(e) => setProgramForm({ ...programForm, eligibility: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Description</label>
                      <textarea
                        rows={2}
                        value={programForm.description || ''}
                        onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        {editingProgram ? 'Save Program Changes' : 'Add Program'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProgram(false);
                          setEditingProgram(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-white/10 text-xs text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Programs List */}
                <div className="space-y-3">
                  {programsList.map((prog) => (
                    <div
                      key={prog.id}
                      className="p-5 rounded-2xl bg-[#112440] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-[#D4AF37] text-[#1A365D] font-bold text-xs">
                            {prog.code}
                          </span>
                          <span className="text-xs text-[#D4AF37] font-semibold">{prog.duration}</span>
                          <span className="text-xs text-slate-400">• {prog.language}</span>
                        </div>
                        <h4 className="font-serif font-bold text-lg text-white">{prog.title}</h4>
                        <p className="text-xs text-slate-300 max-w-2xl">{prog.description}</p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setEditingProgram(prog);
                            setProgramForm(prog);
                            setIsAddingProgram(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#1A365D] text-xs font-bold transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete program ${prog.title}?`)) {
                              deleteProgram(prog.id);
                              showToast('Program deleted');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: CAMPUS PHOTO GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {currentLanguage === 'kn' ? 'ಕ್ಯಾಂಪಸ್ ಫೋಟೋ ಗ್ಯಾಲರಿ ನಿರ್ವಹಣೆ' : 'Campus Photo Gallery Management'}
                    </h3>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">
                      Manage all 18 authentic campus photos. Add new photos, update titles, or delete.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingPhoto(null);
                      setPhotoForm({
                        category: 'grounds',
                        titleEn: '',
                        titleKn: '',
                        descEn: '',
                        descKn: '',
                        locationEn: 'Nagarthalli Campus, Mysore',
                        locationKn: 'ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್, ಮೈಸೂರು',
                        imageUrl: '',
                        tagEn: 'Campus View',
                        tagKn: 'ಕ್ಯಾಂಪಸ್ ನೋಟ',
                      });
                      setIsAddingPhoto(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{currentLanguage === 'kn' ? 'ಹೊಸ ಫೋಟೋ ಸೇರಿಸಿ' : 'Add New Photo'}</span>
                  </button>
                </div>

                {/* Add / Edit Photo Form */}
                {(isAddingPhoto || editingPhoto) && (
                  <form onSubmit={handleSavePhoto} className="p-5 rounded-2xl bg-[#112440] border-2 border-[#D4AF37] space-y-4">
                    <span className="font-serif font-bold text-base text-[#D4AF37] block">
                      {editingPhoto ? 'Edit Photo Information' : 'Add New Photograph to Gallery'}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Photo URL / File Path</label>
                        <input
                          type="text"
                          required
                          placeholder="/assets/aistudio/... or web URL"
                          value={photoForm.imageUrl || ''}
                          onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Category</label>
                        <select
                          value={photoForm.category || 'grounds'}
                          onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        >
                          <option value="grounds">Campus & Grounds</option>
                          <option value="classroom">Classrooms & Academics</option>
                          <option value="chapel">Chapel & Sanctuary</option>
                          <option value="faculty">Faculty & Mentors</option>
                          <option value="convocation">Graduation Convocation</option>
                          <option value="student-life">Student Life & Dining</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Title (English)</label>
                        <input
                          type="text"
                          required
                          value={photoForm.titleEn || ''}
                          onChange={(e) => setPhotoForm({ ...photoForm, titleEn: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">ಶೀರ್ಷಿಕೆ (ಕನ್ನಡ)</label>
                        <input
                          type="text"
                          value={photoForm.titleKn || ''}
                          onChange={(e) => setPhotoForm({ ...photoForm, titleKn: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Description</label>
                      <textarea
                        rows={2}
                        value={photoForm.descEn || ''}
                        onChange={(e) => setPhotoForm({ ...photoForm, descEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        {editingPhoto ? 'Save Photo Changes' : 'Add to Gallery'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingPhoto(false);
                          setEditingPhoto(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-white/10 text-xs text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Photos Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group bg-[#112440] rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37] flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-black overflow-hidden">
                        <img
                          src={getAssetUrl(photo.imageUrl, 'campus')}
                          alt={photo.titleEn}
                          onError={(e) => handleImageError(e, 'campus')}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[9px] font-bold text-[#D4AF37] uppercase">
                          {photo.category}
                        </span>
                      </div>

                      <div className="p-3 space-y-2">
                        <p className="font-serif text-xs font-bold text-white line-clamp-1">{photo.titleEn}</p>
                        
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                          <button
                            onClick={() => {
                              setEditingPhoto(photo);
                              setPhotoForm(photo);
                              setIsAddingPhoto(false);
                            }}
                            className="text-[#D4AF37] hover:underline text-[11px] font-bold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove photo "${photo.titleEn}"?`)) {
                                deletePhoto(photo.id);
                                showToast('Photo deleted');
                              }
                            }}
                            className="text-red-400 hover:text-red-300 text-[11px]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: SETTINGS & BACKUP */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {currentLanguage === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ & ಬ್ಯಾಕಪ್ ನಿರ್ವಹಣೆ' : 'Security, Passwords & Backups'}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Update your administrator password, export all institutional data as a backup JSON file, or restore.
                  </p>
                </div>

                {/* IT Administrator Credentials & Security Box */}
                <form onSubmit={handleUpdateCredentials} className="p-5 rounded-2xl bg-[#112440] border border-white/15 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
                    <Key className="w-4 h-4" />
                    <span>
                      {currentLanguage === 'kn' ? 'ಐಟಿ ಅಡ್ಮಿನ್ ರುಜುವಾತುಗಳು & ಪಾಸ್‌ವರ್ಡ್ ನಿರ್ವಹಣೆ' : 'IT Administrator Credentials & Security'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans">
                    {currentLanguage === 'kn'
                      ? 'ಐಟಿ ಅಡ್ಮಿನಿಸ್ಟ್ರೇಟರ್ ಇಮೇಲ್ ಮತ್ತು ಲಾಗಿನ್ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಇಲ್ಲಿ ಕಾನ್ಫಿಗರ್ ಮಾಡಿ.'
                      : 'Configure the authorized IT Administrator login email and secure access password.'}
                  </p>

                  {passError && (
                    <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
                      {passError}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{currentLanguage === 'kn' ? 'ಅಡ್ಮಿನ್ ಇಮೇಲ್ ವಿಳಾಸ' : 'Admin Login Email'}</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={editAdminEmail}
                        onChange={(e) => setEditAdminEmail(e.target.value)}
                        placeholder="Ajesh@nestmysore.org"
                        className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300">
                          {currentLanguage === 'kn' ? 'ಪ್ರಸ್ತುತ ಪಾಸ್‌ವರ್ಡ್' : 'Current Password (to verify)'}
                        </label>
                        <input
                          type="password"
                          value={oldPass}
                          onChange={(e) => setOldPass(e.target.value)}
                          placeholder="Current password"
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-300">
                          {currentLanguage === 'kn' ? 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ (ಐಚ್ಛಿಕ)' : 'New Password (leave blank to keep current)'}
                        </label>
                        <input
                          type="password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="New strong password"
                          className="w-full px-3 py-2 rounded-lg bg-[#0c182b] border border-white/20 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-md flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{currentLanguage === 'kn' ? 'ರುಜುವಾತುಗಳನ್ನು ನವೀಕರಿಸಿ' : 'Save Admin Credentials'}</span>
                    </button>
                  </div>
                </form>

                {/* Export / Backup Box */}
                <div className="p-5 rounded-2xl bg-[#112440] border border-white/15 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
                    <Download className="w-4 h-4" />
                    <span>{currentLanguage === 'kn' ? 'ವೆಬ್‌ಸೈಟ್ ಡೇಟಾ ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್' : 'Download Complete Website Backup'}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    Export all announcements, faculty, programs, photos, and admission inquiries into a portable JSON backup file.
                  </p>
                  <button
                    onClick={handleDownloadBackup}
                    className="px-4 py-2.5 rounded-xl bg-[#1A365D] hover:bg-[#D4AF37] hover:text-[#1A365D] border border-[#D4AF37] text-[#D4AF37] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup File</span>
                  </button>
                </div>

                {/* Import / Restore Box */}
                <div className="p-5 rounded-2xl bg-[#112440] border border-white/15 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                    <span>{currentLanguage === 'kn' ? 'ಬ್ಯಾಕಪ್ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮರುಸ್ಥಾಪಿಸಿ' : 'Restore from Backup File'}</span>
                  </div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#1A365D] file:text-[#D4AF37] file:font-bold file:text-xs cursor-pointer"
                  />
                </div>

                {/* Reset to Factory Defaults */}
                <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-red-300">
                    <RotateCcw className="w-4 h-4" />
                    <span>{currentLanguage === 'kn' ? 'ಮೂಲ ಸ್ಥಿತಿಗೆ ಮರುಹೊಂದಿಸಿ (Reset to Initial Defaults)' : 'Reset All Content to Initial Defaults'}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Warning: This will reset all edited faculty, programs, photos, and announcements back to the factory institutional defaults.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all content back to original defaults?')) {
                        resetToDefaults();
                        showToast('Website reset to original institutional defaults');
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-red-900/60 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Reset Everything to Defaults
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
