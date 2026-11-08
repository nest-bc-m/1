import { AdmissionRegistrationData } from '../types';

/**
 * Generates an authentic seminary application registration number.
 * Format: NEST-YYYY-XXXX (e.g. NEST-2026-4819)
 */
export function generateApplicationNumber(year = 2026): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `NEST-${year}-${randomSuffix}`;
}

/**
 * Formats ISO date string into readable receipt display date.
 */
export function formatReceiptDate(dateInput: string | Date = new Date()): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return new Date().toLocaleDateString('en-IN');

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return d.toLocaleString('en-IN', options);
}

/**
 * Formats DOB into Indian standard DD/MM/YYYY
 */
export function formatDOB(dateStr: string): string {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

/**
 * Validates registration form inputs.
 */
export function validateRegistrationData(
  data: Partial<AdmissionRegistrationData>
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Full Name is required (minimum 3 characters)';
  }

  if (!data.phone || data.phone.trim().length < 8) {
    errors.phone = 'Valid phone number is required';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email address is required';
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!data.state || data.state.trim().length < 2) {
    errors.state = 'State is required';
  }

  if (!data.programId) {
    errors.programId = 'Please select an academic degree program';
  }

  if (!data.qualification || data.qualification.trim().length < 2) {
    errors.qualification = 'Highest educational qualification is required';
  }

  if (!data.churchName || data.churchName.trim().length < 3) {
    errors.churchName = 'Local church name is required';
  }

  if (!data.pastorName || data.pastorName.trim().length < 3) {
    errors.pastorName = "Pastor's name is required";
  }

  if (!data.declarationAccepted) {
    errors.declarationAccepted = 'You must accept the applicant declaration';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Provides authentic, pre-filled sample data for testing and demonstrations.
 */
export function getSampleRegistrationData(): AdmissionRegistrationData {
  return {
    applicationNo: 'NEST-2026-5821',
    submissionDate: new Date().toISOString(),
    fullName: 'Jonathan David Samuel',
    gender: 'Male',
    dob: '1999-05-18',
    phone: '+91 98451 72635',
    whatsapp: '+91 98451 72635',
    email: 'jonathan.samuel@example.com',
    permanentAddress: '#42, Grace Villa, St. Thomas Church Road, Nagarthalli Post',
    city: 'Mysuru',
    state: 'Karnataka',
    pincode: '570003',
    guardianName: 'Rev. Samuel David (Father)',
    guardianPhone: '+91 94481 92837',
    programCategory: 'Regular',
    programId: 'b-th',
    programName: 'B.Th — Bachelor of Theology (3 Years Residential)',
    languageTrack: 'English Medium (Official)',
    academicYear: '2026–2027 (July Intake)',
    hostelNeeded: true,
    qualification: 'Pre-University Certificate (10+2 / PUC Science)',
    institutionName: 'St. Philomena Pre-University College',
    boardOrUniversity: 'Department of Pre-University Education Karnataka',
    passingYear: '2021',
    percentageGrade: '78.5% (First Class with Distinction)',
    salvationYear: '2018',
    waterBaptism: 'Yes',
    churchName: 'Bethel Assembly of God Church, Mysuru',
    denomination: 'Pentecostal / Assembly of God',
    pastorName: 'Rev. Daniel K. Abraham',
    pastorPhone: '+91 98801 44552',
    churchAddress: 'Near Suburb Bus Stand, Bengaluru Road, Mysuru',
    ministryCalling: 'Pastoral ministry, youth discipleship, and cross-cultural church planting in native Karnataka villages.',
    declarationAccepted: true,
  };
}

/**
 * Constructs the WhatsApp message sent to Principal Rev. Santhosh K. Chacko.
 */
export function buildWhatsAppForwardMessage(
  data: AdmissionRegistrationData,
  principalPhone = '8880111763'
): string {
  const lines = [
    `🎓 *OFFICIAL ADMISSION REGISTRATION RECEIPT*`,
    `*Native Evangelical School of Theology (NEST), Mysore*`,
    `Accredited by Asia Theological Association (ATA India)`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 *Application Ref No:* ${data.applicationNo}`,
    `📅 *Registered On:* ${formatReceiptDate(data.submissionDate)}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *CANDIDATE DETAILS*`,
    `• *Full Name:* ${data.fullName}`,
    `• *Gender & DOB:* ${data.gender} | ${formatDOB(data.dob)}`,
    `• *Mobile / WhatsApp:* ${data.phone}`,
    `• *Email:* ${data.email}`,
    `• *Location:* ${data.city}, ${data.state} (${data.pincode})`,
    `• *Guardian / Contact:* ${data.guardianName} (${data.guardianPhone})`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📚 *PROGRAM & STUDY MODE*`,
    `• *Degree Program:* ${data.programName}`,
    `• *Study Pathway:* ${data.programCategory} Classes`,
    `• *Language Medium:* ${data.languageTrack}`,
    `• *Academic Term:* ${data.academicYear}`,
    `• *Hostel in Mysore:* ${data.hostelNeeded ? 'Yes (Requested)' : 'No (Day Scholar / External)'}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🎓 *ACADEMIC BACKGROUND*`,
    `• *Highest Qualification:* ${data.qualification}`,
    `• *Institution / Board:* ${data.institutionName} (${data.boardOrUniversity})`,
    `• *Passing Year & Score:* ${data.passingYear} | ${data.percentageGrade}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `⛪ *CHURCH & MINISTRY CALLING*`,
    `• *Church:* ${data.churchName} (${data.denomination})`,
    `• *Recommending Pastor:* ${data.pastorName} (${data.pastorPhone})`,
    `• *Water Baptism:* ${data.waterBaptism}`,
    `• *Calling / Goal:* ${data.ministryCalling}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `_Forwarded directly to Principal Rev. Santhosh K. Chacko (+91 ${principalPhone}) for document verification and interview scheduling._`,
  ];

  return lines.join('\n');
}
