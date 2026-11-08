export interface AcademicProgram {
  id: string;
  code: string;
  title: string;
  titleKn?: string;
  programCategory: 'Regular' | 'Distance';
  programCategoryKn?: string;
  degreeLevel: 'Certificate' | 'Diploma' | 'Bachelor' | 'Master' | 'Special';
  duration: string;
  durationKn?: string;
  mode: string;
  modeKn?: string;
  language: string;
  languageKn?: string;
  eligibility: string;
  eligibilityKn?: string;
  description: string;
  descriptionKn?: string;
  keySubjects?: string[];
  keySubjectsKn?: string[];
  curriculumTopics?: string[];
  curriculumTopicsKn?: string[];
  careerPaths?: string[];
  careerPathsKn?: string[];
  contactClasses?: string;
  contactClassesKn?: string;
  targetAudience?: string;
  targetAudienceKn?: string;
  featured?: boolean;
  ataAccredited?: boolean;
}

export interface AccreditationInfo {
  title: string;
  shortTitle: string;
  body: string;
  directoryUrl: string;
  status: string;
  coursesOffered: string[];
  summary: string;
}

export interface StatementOfFaithArticle {
  id: string;
  title: string;
  titleKn?: string;
  scriptureReferences: string[];
  summary: string;
  summaryKn?: string;
  fullDescription: string;
  fullDescriptionKn?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  nameKn?: string;
  title: string;
  titleKn?: string;
  role?: string;
  roleKn?: string;
  qualification: string;
  qualificationKn?: string;
  specialization?: string;
  specializationKn?: string;
  department?: string;
  departmentKn?: string;
  bio?: string;
  bioKn?: string;
  experienceYears?: number;
  coursesTaught?: string[];
  coursesTaughtKn?: string[];
  photo?: string;
}

export interface VideoMessage {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  category: 'Chapel Sermon' | 'Bible Lecture' | 'Campus Life' | 'Testimony';
}

export interface AdmissionInquiry {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  programInterest: string;
  christianTestimony: string;
  churchAffiliation: string;
  preferredStartTerm: string;
  housingNeeded: boolean;
}

export interface AnnouncementItem {
  id: string;
  badgeEn: string;
  badgeKn: string;
  titleEn: string;
  titleKn: string;
  subEn: string;
  subKn: string;
  linkTextEn?: string;
  linkTextKn?: string;
  linkUrl?: string;
  isActive: boolean;
}

export type AdmissionReviewStatus = 
  | 'Pending Verification / Under Review' 
  | 'Approved / Admission Granted' 
  | 'Interview Scheduled' 
  | 'Rejected'
  | 'New'
  | 'Under Review'
  | 'Approved';

export interface AdmissionRegistrationData {
  applicationNo: string;
  submissionDate: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  phone: string;
  whatsapp: string;
  email: string;
  permanentAddress: string;
  city: string;
  state: string;
  pincode: string;
  guardianName: string;
  guardianPhone: string;
  programCategory: 'Regular' | 'Distance';
  programId: string;
  programName: string;
  languageTrack: string;
  academicYear: string;
  hostelNeeded: boolean;
  qualification: string;
  institutionName: string;
  boardOrUniversity: string;
  passingYear: string;
  percentageGrade: string;
  salvationYear: string;
  waterBaptism: 'Yes' | 'No';
  churchName: string;
  denomination: string;
  pastorName: string;
  pastorPhone: string;
  churchAddress: string;
  ministryCalling: string;
  declarationAccepted: boolean;
  photoUrl?: string;
  status?: AdmissionReviewStatus;
}

export interface AdmissionSubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  cityState: string;
  programId: string;
  programName: string;
  languageTrack: string;
  qualification: string;
  churchName: string;
  callingBrief?: string;
  housingNeeded: boolean;
  status: AdmissionReviewStatus;
  notes?: string;
  createdAt: string;
  registrationDetails?: AdmissionRegistrationData;
}

export interface GalleryPhotoItem {
  id: string;
  category: 'chapel' | 'classroom' | 'student-life' | 'faculty' | 'convocation' | 'grounds';
  titleEn: string;
  titleKn: string;
  descEn: string;
  descKn: string;
  locationEn: string;
  locationKn: string;
  imageUrl: string;
  tagEn: string;
  tagKn: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'Super Admin' | 'Principal' | 'Academic Dean';
  lastLogin?: string;
}

