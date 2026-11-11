import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AcademicProgram, 
  FacultyMember, 
  AnnouncementItem, 
  AdmissionSubmission, 
  GalleryPhotoItem, 
  AdminUser 
} from '../types';
import { INSTITUTION_INFO, FACULTY_MEMBERS, ACADEMIC_PROGRAMS } from '../data/nestData';
import { getAssetUrl } from '../utils/assetHelper';
import { 
  db, 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseSignOut,
  doc, 
  collection, 
  onSnapshot, 
  setDoc, 
  deleteDoc, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';

// Initial Gallery Photos (18 authentic photos uploaded by user)
export const INITIAL_GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'photo-college-building',
    category: 'grounds',
    titleEn: 'Main Academic Building & Administrative Wing',
    titleKn: 'ಮುಖ್ಯ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಆಡಳಿತ ಸೌಧ',
    descEn: 'The modern multi-storey academic complex at Nagarthalli featuring state-of-the-art theological lecture halls, administrative offices, and library.',
    descKn: 'ನಾಗರಹಳ್ಳಿಯ ಸುಸಜ್ಜಿತ ಬಹುಮಹಡಿ ಶೈಕ್ಷಣಿಕ ಸಂಕೀರ್ಣ, ಆಧುನಿಕ ತರಗತಿ ಕೊಠಡಿಗಳು, ಗ್ರಂಥಾಲಯ ಮತ್ತು ಆಡಳಿತ ಕಚೇರಿಗಳು.',
    locationEn: 'Nagarthalli Campus, Mysore',
    locationKn: 'ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್, ಮೈಸೂರು',
    imageUrl: getAssetUrl('assets/aistudio/college_48f40f17.webp', 'college'),
    tagEn: 'Academic Complex',
    tagKn: 'ಶೈಕ್ಷಣಿಕ ಸಂಕೀರ್ಣ',
  },
  {
    id: 'photo-chapel-service',
    category: 'chapel',
    titleEn: 'Seminary Chapel Worship & Word Exposition',
    titleKn: 'ಸೆಮಿನರಿ ಚಾಪೆಲ್ ಆರಾಧನೆ ಮತ್ತು ಸತ್ಯವೇದ ಬೋಧನೆ',
    descEn: 'Faculty and residential candidates gathered inside the seminary chapel for fervent morning devotion, praise, and sound biblical preaching.',
    descKn: 'ಮುಂಜಾನೆಯ ಆರಾಧನೆ, ಸ್ತುತಿ ಗೀತೆಗಳು ಮತ್ತು ಸತ್ಯವೇದ ವಾಕ್ಯ ಸಂದೇಶಕ್ಕಾಗಿ ಸೆಮಿನರಿ ಚಾಪೆಲ್‌ನಲ್ಲಿ ಒಟ್ಟಾಗಿ ಸೇರಿದ ಬೋಧಕರು ಹಾಗೂ ವಿದ್ಯಾರ್ಥಿಗಳು.',
    locationEn: 'Main Seminary Chapel Hall',
    locationKn: 'ಮುಖ್ಯ ಸೆಮಿನರಿ ಚಾಪೆಲ್ ಸಭಾಂಗಣ',
    imageUrl: getAssetUrl('assets/aistudio/chapel_d7e08b0f.webp', 'chapel'),
    tagEn: 'Daily Worship',
    tagKn: 'ದೈನಂದಿನ ಆರಾಧನೆ',
  },
  {
    id: 'photo-teachers-faculty',
    category: 'faculty',
    titleEn: 'Resident Faculty & Academic Leadership',
    titleKn: 'ಪೂರ್ಣಕಾಲಿಕ ಅಧ್ಯಾಪಕ ವರ್ಗ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ನಾಯಕರು',
    descEn: 'Our esteemed theological professors and mentors gathered on the campus lawn, dedicated to training native leaders in sound biblical doctrine.',
    descKn: 'ಸ್ಥಳೀಯ ನಾಯಕರನ್ನು ದೇವರ ವಾಕ್ಯದಲ್ಲಿ ದೃಢಪಡಿಸಲು ಸಮರ್ಪಿತರಾದ ನಮ್ಮ ಗೌರವಾನ್ವಿತ ದೇವತಾಶಾಸ್ತ್ರ ಪ್ರಾಧ್ಯಾಪಕರು ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರ ಸಮೂಹ.',
    locationEn: 'Central Campus Lawn',
    locationKn: 'ಕೇಂದ್ರ ಕ್ಯಾಂಪಸ್ ಹುಲ್ಲುಹಾಸು',
    imageUrl: getAssetUrl('assets/aistudio/techers_e3355ac8.webp', 'faculty'),
    tagEn: 'Faculty Body',
    tagKn: 'ಅಧ್ಯಾಪಕ ವೃಂದ',
  },
  {
    id: 'photo-principal-desk',
    category: 'faculty',
    titleEn: 'Rev. Santhosh K. Chacko at the Principal Desk',
    titleKn: 'ರೆವ. ಸಂತೋಷ್ ಕೆ. ಚಾಕೊ, ಪ್ರಿನ್ಸಿಪಾಲ್ ಕಚೇರಿಯಲ್ಲಿ',
    descEn: 'Seminary Principal Rev. Santhosh K. Chacko oversees institutional governance, ATA accreditation standards, and pastoral student mentorship.',
    descKn: 'ಸಂಸ್ಥೆಯ ಪ್ರಿನ್ಸಿಪಾಲ್ ರೆವ. ಸಂತೋಷ್ ಕೆ. ಚಾಕೊ ಅವರು ಸಂಸ್ಥೆಯ ಆಡಳಿತ, ATA ಮಾನ್ಯತಾ ಶಿಸ್ತು ಹಾಗೂ ವಿದ್ಯಾರ್ಥಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ಮುನ್ನಡೆಸುತ್ತಿದ್ದಾರೆ.',
    locationEn: 'Principal Executive Office',
    locationKn: 'ಪ್ರಿನ್ಸಿಪಾಲ್ ಆಡಳಿತ ಕಚೇರಿ',
    imageUrl: getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal'),
    tagEn: 'Principal & Director',
    tagKn: 'ಪ್ರಿನ್ಸಿಪಾಲ್ & ನಿರ್ದೇಶಕರು',
  },
  {
    id: 'photo-classroom-lecture',
    category: 'classroom',
    titleEn: 'Biblical Exegesis & Theological Lecture',
    titleKn: 'ದೇವತಾಶಾಸ್ತ್ರ ತರಗತಿ & ಸತ್ಯವೇದ ವ್ಯಾಖ್ಯಾನ',
    descEn: 'Seminary students actively engaging with lecture notes, textbooks, and interactive theological discussion in the lecture room.',
    descKn: 'ತರಗತಿಯಲ್ಲಿ ಸತ್ಯವೇದ ಪಠ್ಯಗಳು, ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ದೇವತಾಶಾಸ್ತ್ರ ಚರ್ಚೆಯಲ್ಲಿ ತಲ್ಲೀನರಾಗಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು.',
    locationEn: 'Academic Lecture Hall 1',
    locationKn: 'ಶೈಕ್ಷಣಿಕ ಉಪನ್ಯಾಸ ಕೊಠಡಿ 1',
    imageUrl: getAssetUrl('assets/aistudio/classroom_3ee27e65.webp', 'classroom'),
    tagEn: 'Classroom Lecture',
    tagKn: 'ತರಗತಿ ಬೋಧನೆ',
  },
  {
    id: 'photo-classroom-teaching',
    category: 'classroom',
    titleEn: 'Whiteboard Exposition & Faculty Teaching',
    titleKn: 'ವೈಟ್‌ಬೋರ್ಡ್ ಬೋಧನೆ & ಸಭಾ ಇತಿಹಾಸ ಉಪನ್ಯಾಸ',
    descEn: 'Faculty member delivering an in-depth biblical study on systematic doctrine and Christian ministry strategy.',
    descKn: 'ವ್ಯವಸ್ಥಿತ ಸಿದ್ಧಾಂತ ಮತ್ತು ಕ್ರೈಸ್ತ ಸೇವಾ ತಂತ್ರಗಾರಿಕೆಯ ಕುರಿತು ಆಳವಾದ ಸತ್ಯವೇದ ಬೋಧನೆ ನೀಡುತ್ತಿರುವ ಅಧ್ಯಾಪಕರು.',
    locationEn: 'Seminar Room 2',
    locationKn: 'ಸೆಮಿನಾರ್ ಕೊಠಡಿ 2',
    imageUrl: getAssetUrl('assets/aistudio/classroom2_00d3372c.webp', 'classroom'),
    tagEn: 'Theological Teaching',
    tagKn: 'ಧರ್ಮಶಾಸ್ತ್ರ ಬೋಧನೆ',
  },
  {
    id: 'photo-dining-fellowship',
    category: 'student-life',
    titleEn: 'Student Community & Dining Hall Fellowship',
    titleKn: 'ವಿದ್ಯಾರ್ಥಿ ಭೋಜನಾಲಯ ಮತ್ತು ಸಹೋದರತ್ವ ಕೂಟ',
    descEn: 'Residential candidates sharing wholesome meals together in the spacious campus refectory, building lifelong fraternal bonds.',
    descKn: 'ಕ್ಯಾಂಪಸ್‌ನ ವಿಶಾಲ ಭೋಜನಾಲಯದಲ್ಲಿ ಊಟ ಸೇವಿಸುತ್ತಾ ಪರಸ್ಪರ ಆತ್ಮೀಕ ಸಹವಾಸ ಹಾಗೂ ಪ್ರೋತ್ಸಾಹವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು.',
    locationEn: 'Seminary Dining Complex',
    locationKn: 'ಸೆಮಿನರಿ ಭೋಜನಾಲಯ ಸಂಕೀರ್ಣ',
    imageUrl: getAssetUrl('assets/aistudio/dinig_hall_3a8b4555.webp', 'dining'),
    tagEn: 'Dining Fellowship',
    tagKn: 'ಭೋಜನ ಸಹವಾಸ',
  },
  {
    id: 'photo-graduation-stage',
    category: 'convocation',
    titleEn: '7th Graduation Ceremony Stage & Choir',
    titleKn: '7ನೇ ಪದವಿ ಪ್ರದಾನ ಸಮಾರಂಭದ ವೇದಿಕೆ ಮತ್ತು ಗಾಯನ',
    descEn: 'The celebratory stage of the 7th Graduation Ceremony with choir and keyboard worship.',
    descKn: '7ನೇ ಪದವಿ ಪ್ರದಾನ ಸಮಾರಂಭದ ಗಾಯನ ಮತ್ತು ಆರಾಧನಾ ವೇದಿಕೆ.',
    locationEn: 'Graduation Pavilion',
    locationKn: 'ಪದವಿ ಪ್ರದಾನ ಸಭಾಂಗಣ',
    imageUrl: getAssetUrl('assets/aistudio/5_81316861.webp', 'campus'),
    tagEn: '7th Convocation',
    tagKn: '7ನೇ ಘಟಿಕೋತ್ಸವ',
  },
  {
    id: 'photo-graduates-robes',
    category: 'convocation',
    titleEn: 'Conferral of ATA Theological Degrees',
    titleKn: 'ಗೌರವ ಅತಿಥಿಗಳ ಸಮ್ಮುಖದಲ್ಲಿ ಪದವಿ ಪ್ರದಾನ',
    descEn: 'Graduating ministerial candidates in ceremonial academic robes and mortarboards seated for the conferral of B.Th and M.Div degrees.',
    descKn: 'ಬಿ.ಟಿ.ಎಚ್ ಮತ್ತು ಎಂ.ಡಿವ್ ಪದವಿಗಳನ್ನು ಸ್ವೀಕರಿಸಲು ಕಪ್ಪು ನಿಲುವಂಗಿ ಧರಿಸಿ ಸಿದ್ಧರಾಗಿ ಕುಳಿತಿರುವ ಸಮರ್ಪಿತ ಪದವೀಧರರು.',
    locationEn: 'Convocation Amphitheater',
    locationKn: 'ಘಟಿಕೋತ್ಸವ ರಂಗಮಂದಿರ',
    imageUrl: getAssetUrl('assets/aistudio/2_6692ddea.webp', 'campus'),
    tagEn: 'Degree Conferral',
    tagKn: 'ಪದವಿ ಸಮರ್ಪಣೆ',
  },
  {
    id: 'photo-wide-convocation',
    category: 'convocation',
    titleEn: 'Outdoor Convocation Amphitheater Celebration',
    titleKn: 'ಹೊರಾಂಗಣ ಪದವಿ ಪ್ರದಾನ ಮಹೋತ್ಸವ ಸಭೆ',
    descEn: 'A joyful evening convocation service attended by faculty, families, church leaders, and students celebrating God\'s faithfulness.',
    descKn: 'ಅಧ್ಯಾಪಕರು, ಪಾಲಕರು ಮತ್ತು ಸಭಾ ನಾಯಕರ ಸಮ್ಮುಖದಲ್ಲಿ ನಡೆದ ಸಂಭ್ರಮದ ಘಟಿಕೋತ್ಸವ ಸಭೆ.',
    locationEn: 'Open-Air Amphitheater',
    locationKn: 'ಮುಕ್ತ ರಂಗಮಂದಿರ',
    imageUrl: getAssetUrl('assets/aistudio/1_dae411ee.webp', 'campus'),
    tagEn: 'Convocation Service',
    tagKn: 'ಘಟಿಕೋತ್ಸವ ಕೂಟ',
  },
  {
    id: 'photo-large-group-photo',
    category: 'faculty',
    titleEn: 'Grand Institutional Convocation Cohort',
    titleKn: 'NEST ಕುಟುಂಬದ ಸಂಪೂರ್ಣ ವಿದ್ಯಾರ್ಥಿ & ಅಧ್ಯಾಪಕ ವೃಂದ',
    descEn: 'Full panoramic group portrait of all graduated ministers, current students, teaching faculty, and administrative staff.',
    descKn: 'ಪದವೀಧರ ಸೇವಕರು, ವಿದ್ಯಾರ್ಥಿಗಳು, ಪ್ರಾಧ್ಯಾಪಕರು ಮತ್ತು ಆಡಳಿತ ಸಿಬ್ಬಂದಿಯ ಭವ್ಯ ಸಮೂಹ ಚಿತ್ರ.',
    locationEn: 'Campus Convocation Stage',
    locationKn: 'ಕ್ಯಾಂಪಸ್ ವೇದಿಕೆ',
    imageUrl: getAssetUrl('assets/aistudio/6_b1fc66d8.webp', 'faculty'),
    tagEn: 'NEST Family',
    tagKn: 'ಸಂಪೂರ್ಣ ವೃಂದ',
  },
  {
    id: 'photo-campus-cottages',
    category: 'grounds',
    titleEn: 'Lush Campus Lawns & Residential Cottages',
    titleKn: 'ಹಸಿರು ಹುಲ್ಲುಹಾಸು & ವಿದ್ಯಾರ್ಥಿ ವಸತಿ ಕಾಟೇಜ್‌ಗಳು',
    descEn: 'Tranquil student residential cottages nestled among trees, flowering plant pots, and red stone paved walking paths at Nagarthalli.',
    descKn: 'ನಾಗರಹಳ್ಳಿಯ ಪ್ರಶಾಂತ ಪರಿಸರದಲ್ಲಿ ಗಿಡಮರಗಳು, ಹೂವಿನ ಕುಂಡಗಳು ಮತ್ತು ಕೆಂಪು ಹಾಸುಗಲ್ಲಿನ ಹಾದಿಗಳಿಂದ ಕೂಡಿದ ವಸತಿ ಕಾಟೇಜ್‌ಗಳು.',
    locationEn: 'Residential Courtyard',
    locationKn: 'ವಸತಿ ಪ್ರಾಂಗಣ',
    imageUrl: getAssetUrl('assets/aistudio/campas2_f33241ae.webp', 'campus'),
    tagEn: 'Campus Grounds',
    tagKn: 'ಕ್ಯಾಂಪಸ್ ಪರಿಸರ',
  },
  {
    id: 'photo-entrance-gate',
    category: 'grounds',
    titleEn: 'Main Entrance Security Gate & Palm Trees',
    titleKn: 'ಮುಖ್ಯ ಪ್ರವೇಶ ದ್ವಾರ & ತಾಳೆ ಮರಗಳ ಸುಂದರ ದೃಶ್ಯ',
    descEn: 'The gated entrance and security sentry post of NEST Mysore, surrounded by lush coconut palms and clear blue skies.',
    descKn: 'ಎತ್ತರದ ತಾಳೆ ಮರಗಳು ಮತ್ತು ನೀಲಿ ಆಕಾಶದ ನಡುವೆ ಕಂಗೊಳಿಸುವ NEST ಮೈಸೂರು ಮುಖ್ಯ ಪ್ರವೇಶ ದ್ವಾರ ಹಾಗೂ ಭದ್ರತಾ ಗೋಪುರ.',
    locationEn: 'Campus Security Gate',
    locationKn: 'ಕ್ಯಾಂಪಸ್ ಪ್ರವೇಶ ದ್ವಾರ',
    imageUrl: getAssetUrl('assets/aistudio/campas3_49c79e1d.webp', 'campus'),
    tagEn: 'Campus Gate',
    tagKn: 'ಪ್ರವೇಶ ದ್ವಾರ',
  },
  {
    id: 'photo-stone-boundary',
    category: 'grounds',
    titleEn: 'Stone Arch Boundary Gate & Botanical Surroundings',
    titleKn: 'ಕಲ್ಲಿನ ಕಮಾನು ದ್ವಾರ & ಹಳದಿ ಹೂವುಗಳ ತೋಟ',
    descEn: 'Secure stone compound wall, wrought iron gates, and vibrant flowering trees welcoming visitors to the seminary grounds.',
    descKn: 'ಭದ್ರ ಕಲ್ಲಿನ ಕಾಂಪೌಂಡ್, ಹಳದಿ ಹೂವಿನ ಮರಗಳು ಮತ್ತು ಹಸಿರಿನಿಂದ ಆವೃತವಾದ ಆಹ್ಲಾದಕರ ಕ್ಯಾಂಪಸ್ ಪ್ರವೇಶ.',
    locationEn: 'Nagarthalli Campus Boundary',
    locationKn: 'ಕ್ಯಾಂಪಸ್ ಗಡಿ ಗೋಡೆ',
    imageUrl: getAssetUrl('assets/aistudio/campas4_e0178398.png', 'campus'),
    tagEn: 'Campus Boundary',
    tagKn: 'ಕ್ಯಾಂಪಸ್ ಆವರಣ',
  },
  {
    id: 'photo-misty-gardens',
    category: 'grounds',
    titleEn: 'Serene Garden Walkways & Prayer Benches',
    titleKn: 'ಧ್ಯಾನಕ್ಕೆ ಪ್ರಶಸ್ತವಾದ ತೋಟದ ಹಾದಿ ಮತ್ತು ಆಸನಗಳು',
    descEn: 'Cool, shaded garden pathways and benches ideal for quiet personal prayer walks, Bible reading, and reflection.',
    descKn: 'ವೈಯಕ್ತಿಕ ಪ್ರಾರ್ಥನಾ ನಡಿಗೆ, ಸತ್ಯವೇದ ಧ್ಯಾನ ಮತ್ತು ಚಿಂತನೆಗೆ ನೆರವಾಗುವ ತಂಪಾದ ತೋಟದ ಹಾದಿ ಹಾಗೂ ಆಸನಗಳು.',
    locationEn: 'Seminary Gardens',
    locationKn: 'ಸೆಮಿನರಿ ಉದ್ಯಾನವನ',
    imageUrl: getAssetUrl('assets/aistudio/campas1_cd942b74.webp', 'campus'),
    tagEn: 'Prayer Gardens',
    tagKn: 'ಪ್ರಾರ್ಥನಾ ಉದ್ಯಾನ',
  },
  {
    id: 'photo-residential-ground',
    category: 'grounds',
    titleEn: 'Scenic Residential Campus Living Quarters',
    titleKn: 'ಶಾಂತಿಯುತ ವಸತಿ ನಿಲಯ ಪರಿಸರ',
    descEn: 'Well-ventilated, hygienic living quarters ensuring a peaceful, comfortable residential atmosphere for all students.',
    descKn: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಅಧ್ಯಯನ ಮತ್ತು ಪ್ರಾರ್ಥನೆಗೆ ಪೂರಕವಾದ ಶುದ್ಧ, ಶಾಂತ ಹಾಗೂ ಗಾಳಿ-ಬೆಳಕಿನಿಂದ ಕೂಡಿದ ವಸತಿ ಕೊಠಡಿಗಳು.',
    locationEn: 'Hostel Grounds',
    locationKn: 'ಹಾಸ್ಟೆಲ್ ಆವರಣ',
    imageUrl: getAssetUrl('assets/aistudio/compas_f33241ae.webp', 'campus'),
    tagEn: 'Living Quarters',
    tagKn: 'ವಸತಿ ನಿಲಯ',
  },
  {
    id: 'photo-student-cohort-path',
    category: 'student-life',
    titleEn: 'Seminary Brothers in Mutual Fellowship',
    titleKn: 'ವಿದ್ಯಾರ್ಥಿ ಸಹೋದರರ ನಿಕಟ ಸಹವಾಸ',
    descEn: 'Students from various regions of India walking together between lecture sessions, sharing ministry dreams and prayers.',
    descKn: 'ತರಗತಿಗಳ ವಿರಾಮದಲ್ಲಿ ಒಟ್ಟಾಗಿ ಸಾಗುತ್ತಾ ಸೇವಾ ಕನಸುಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಿರುವ ಭಾರತದ ವಿವಿಧ ರಾಜ್ಯಗಳ ವಿದ್ಯಾರ್ಥಿಗಳು.',
    locationEn: 'Campus Walkway',
    locationKn: 'ಕ್ಯಾಂಪಸ್ ಪಾದಚಾರಿ ಮಾರ್ಗ',
    imageUrl: getAssetUrl('assets/aistudio/3_e50ff7c9.webp', 'student'),
    tagEn: 'Student Fellowship',
    tagKn: 'ವಿದ್ಯಾರ್ಥಿ ಸಹವಾಸ',
  },
  {
    id: 'photo-student-sports-day',
    category: 'student-life',
    titleEn: 'Recreation, Outdoor Sports & Friendship Day',
    titleKn: 'ದೈಹಿಕ ವ್ಯಾಯಾಮ, ಕ್ರೀಡೆ & ಸ್ನೇಹ ದಿನಾಚರಣೆ',
    descEn: 'Physical wellness, badminton, volleyball, and festive student community sports fostering brotherly unity and health.',
    descKn: 'ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ ದೈಹಿಕ ಶಕ್ತಿ, ಸೌಹಾರ್ದತೆ ಮತ್ತು ಸಹೋದರತ್ವವನ್ನು ಬೆಳೆಸುವ ಹೊರಾಂಗಣ ಕ್ರೀಡೆ ಹಾಗೂ ಸ್ನೇಹ ದಿನಾಚರಣೆ.',
    locationEn: 'Sports & Activity Grounds',
    locationKn: 'ಕ್ರೀಡಾಂಗಣ',
    imageUrl: getAssetUrl('assets/aistudio/spots_00f2ae6c.webp', 'campus'),
    tagEn: 'Sports & Community',
    tagKn: 'ಕ್ರೀಡೆ & ಸಮುದಾಯ',
  },
];

// Initial Announcements
export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    badgeEn: 'Admissions 2026–27',
    badgeKn: 'ಪ್ರವೇಶಾತಿ 2026–27',
    titleEn: 'Academic Year 2026–2027 Admissions Open',
    titleKn: '2026–2027 ಶೈಕ್ಷಣಿಕ ಸಾಲಿನ ಪ್ರವೇಶಾತಿಗಳು ಆರಂಭವಾಗಿವೆ',
    subEn: 'B.Th (3 Yrs), M.Div (2-3 Yrs), and Dip.Th (2 Yrs) Residential Theological Degrees Accredited by ATA India.',
    subKn: 'ATA India ಮಾನ್ಯತೆ ಪಡೆದ ಬಿ.ಟಿ.ಎಚ್, ಎಂ.ಡಿವ್ ಮತ್ತು ಡಿಪ್ಲೊಮಾ ವಸತಿಯುತ ಪದವಿ ಕೋರ್ಸ್‌ಗಳಿಗೆ ಅರ್ಜಿ ಆಹ್ವಾನ.',
    linkTextEn: 'Verify on ATA India Directory',
    linkTextKn: 'ATA ಅಧಿಕೃತ ಪಟ್ಟಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ',
    linkUrl: 'https://ataindia.org/institution/native-evangelical-school-of-theology-2/',
    isActive: true,
  },
  {
    id: 'ann-2',
    badgeEn: 'Residential Campus',
    badgeKn: 'ವಸತಿಯುತ ಕ್ಯಾಂಪಸ್',
    titleEn: 'Spacious Hostels & Dedicated Library at Nagarthalli, Mysore',
    titleKn: 'ನಾಗರಹಳ್ಳಿಯ ಪ್ರಶಾಂತ ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ವಸತಿ ನಿಲಯ ಮತ್ತು ಗ್ರಂಥಾಲಯ ಸೌಲಭ್ಯ',
    subEn: 'Nutritious dining fellowship, quiet study gardens, and daily chapel devotion in Mysore.',
    subKn: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪೌಷ್ಟಿಕ ಆಹಾರ, ಪ್ರಶಾಂತ ಅಧ್ಯಯನ ತೋಟ ಮತ್ತು ದೈನಂದಿನ ಚಾಪೆಲ್ ಆರಾಧನೆ.',
    linkTextEn: 'View Campus Gallery',
    linkTextKn: 'ಕ್ಯಾಂಪಸ್ ಗ್ಯಾಲರಿ ನೋಡಿ',
    linkUrl: '#gallery',
    isActive: true,
  },
];

// Initial Sample Admissions Inquiries with full Registration Data
export const INITIAL_ADMISSIONS: AdmissionSubmission[] = [
  {
    id: 'adm-demo-1',
    fullName: 'Jonathan David Samuel',
    phone: '+91 98451 72635',
    email: 'jonathan.samuel@example.com',
    cityState: 'Mysuru, Karnataka',
    programId: 'b-th',
    programName: 'B.Th — Bachelor of Theology (3 Years Residential)',
    languageTrack: 'English Medium (Official)',
    qualification: 'Pre-University Certificate (10+2 / PUC Science)',
    churchName: 'Bethel Assembly of God Church, Mysuru',
    callingBrief: 'Pastoral ministry, youth discipleship, and cross-cultural church planting in native Karnataka villages.',
    housingNeeded: true,
    status: 'Approved',
    notes: 'Candidate interviewed by Principal Rev. Santhosh K. Chacko. Full marks cards and pastoral recommendation verified.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    registrationDetails: {
      applicationNo: 'NEST-2026-8447',
      submissionDate: new Date(Date.now() - 86400000 * 3).toISOString(),
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
    },
  },
  {
    id: 'adm-demo-2',
    fullName: 'David K. Mathew',
    phone: '+91 94812 76543',
    email: 'david.mathew@example.com',
    cityState: 'Bengaluru, Karnataka',
    programId: 'm-div',
    programName: 'M.Div — Master of Divinity (3 Years Residential)',
    languageTrack: 'English Medium (Official)',
    qualification: 'Bachelor Degree (BA / B.Com / B.Sc / B.Tech)',
    churchName: 'Evangelical Church of India, Bengaluru',
    callingBrief: 'Theological instruction, systematic theology lecturing, and urban missionary leadership.',
    housingNeeded: true,
    status: 'Interview Scheduled',
    notes: 'Online interview scheduled with Academic Dean for July admissions.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    registrationDetails: {
      applicationNo: 'NEST-2026-3912',
      submissionDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      fullName: 'David K. Mathew',
      gender: 'Male',
      dob: '1996-08-22',
      phone: '+91 94812 76543',
      whatsapp: '+91 94812 76543',
      email: 'david.mathew@example.com',
      permanentAddress: '15/B, Cross Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      guardianName: 'Dr. Mathew Thomas (Father)',
      guardianPhone: '+91 98450 11223',
      programCategory: 'Regular',
      programId: 'm-div',
      programName: 'M.Div — Master of Divinity (3 Years Residential)',
      languageTrack: 'English Medium (Official)',
      academicYear: '2026–2027 (July Intake)',
      hostelNeeded: true,
      qualification: 'Bachelor Degree (BA / B.Com / B.Sc / B.Tech)',
      institutionName: 'Christ University, Bengaluru',
      boardOrUniversity: 'Bangalore University',
      passingYear: '2019',
      percentageGrade: '72% (First Class)',
      salvationYear: '2015',
      waterBaptism: 'Yes',
      churchName: 'Evangelical Church of India, Bengaluru',
      denomination: 'Evangelical Church of India',
      pastorName: 'Rev. Dr. Philip Cherian',
      pastorPhone: '+91 94480 33445',
      churchAddress: 'Richmond Town, Bengaluru',
      ministryCalling: 'Theological instruction, systematic theology lecturing, and urban missionary leadership.',
      declarationAccepted: true,
    },
  },
  {
    id: 'adm-demo-3',
    fullName: 'Grace Rebecca Thomas',
    phone: '+91 97410 88991',
    email: 'grace.thomas@example.com',
    cityState: 'Mangaluru, Karnataka',
    programId: 'dip-th-distance',
    programName: 'Dip.Th — Diploma in Theology (Distance / Modular)',
    languageTrack: 'Kannada & English Combined (Dip.Th Only)',
    qualification: 'Secondary School Leaving Certificate (SSLC / 10th)',
    churchName: 'New Life Christian Fellowship, Mangaluru',
    callingBrief: 'Women mentorship, village Sunday school evangelism, and community outreach.',
    housingNeeded: false,
    status: 'New',
    notes: 'Submitted application for Distance Education mode. Course materials to be dispatched.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    registrationDetails: {
      applicationNo: 'NEST-2026-6154',
      submissionDate: new Date(Date.now() - 86400000).toISOString(),
      fullName: 'Grace Rebecca Thomas',
      gender: 'Female',
      dob: '2001-11-04',
      phone: '+91 97410 88991',
      whatsapp: '+91 97410 88991',
      email: 'grace.thomas@example.com',
      permanentAddress: 'Kulshekar Post, Maryhill Road',
      city: 'Mangaluru',
      state: 'Karnataka',
      pincode: '575005',
      guardianName: 'Thomas Kurien (Spouse)',
      guardianPhone: '+91 97410 99882',
      programCategory: 'Distance',
      programId: 'dip-th-distance',
      programName: 'Dip.Th — Diploma in Theology (Distance / Modular)',
      languageTrack: 'Kannada & English Combined (Dip.Th Only)',
      academicYear: '2026–2027 (July Intake)',
      hostelNeeded: false,
      qualification: 'Secondary School Leaving Certificate (SSLC / 10th)',
      institutionName: 'St. Ann High School',
      boardOrUniversity: 'Karnataka Secondary Education Examination Board',
      passingYear: '2018',
      percentageGrade: '81% (Distinction)',
      salvationYear: '2019',
      waterBaptism: 'Yes',
      churchName: 'New Life Christian Fellowship, Mangaluru',
      denomination: 'Independent / Evangelical',
      pastorName: 'Pastor Joel Prakash',
      pastorPhone: '+91 99801 77665',
      churchAddress: 'Kadri, Mangaluru, Karnataka',
      ministryCalling: 'Women mentorship, village Sunday school evangelism, and community outreach.',
      declarationAccepted: true,
    },
  },
];

// Default IT Admin User and Password (Customizable)
export const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'Ajesh@nestmysore.org',
  alternativeUsername: 'Ajesh',
  password: 'Ajesh@nestmysore@123',
  name: 'IT Admin (Ajesh)',
  role: 'IT Administrator' as const,
};

interface AdminDataContextType {
  // Institutional Information
  institutionInfo: typeof INSTITUTION_INFO;
  updateInstitutionInfo: (updates: Partial<typeof INSTITUTION_INFO>) => void;

  // Announcements
  announcements: AnnouncementItem[];
  addAnnouncement: (item: Omit<AnnouncementItem, 'id'>) => void;
  updateAnnouncement: (id: string, updates: Partial<AnnouncementItem>) => void;
  deleteAnnouncement: (id: string) => void;

  // Faculty
  facultyList: FacultyMember[];
  addFaculty: (member: Omit<FacultyMember, 'id'>) => void;
  updateFaculty: (id: string, updates: Partial<FacultyMember>) => void;
  deleteFaculty: (id: string) => void;

  // Programs
  programsList: AcademicProgram[];
  addProgram: (program: Omit<AcademicProgram, 'id'>) => void;
  updateProgram: (id: string, updates: Partial<AcademicProgram>) => void;
  deleteProgram: (id: string) => void;

  // Gallery
  galleryPhotos: GalleryPhotoItem[];
  addPhoto: (photo: Omit<GalleryPhotoItem, 'id'>) => void;
  updatePhoto: (id: string, updates: Partial<GalleryPhotoItem>) => void;
  deletePhoto: (id: string) => void;

  // Admissions
  admissionsList: AdmissionSubmission[];
  submitAdmissionInquiry: (data: Omit<AdmissionSubmission, 'id' | 'createdAt' | 'status'> & { status?: AdmissionSubmission['status'] }) => void;
  updateAdmissionStatus: (id: string, status: AdmissionSubmission['status'], notes?: string) => void;
  deleteAdmissionInquiry: (id: string) => void;

  // Authentication
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  adminEmail: string;
  login: (idOrEmail: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  updateAdminCredentials: (newEmail: string, oldPass?: string, newPass?: string) => { success: boolean; error?: string };
  currentPasswordHint: string;

  // Global actions
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => { success: boolean; error?: string };
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Institutional Info State
  const [institutionInfo, setInstitutionInfo] = useState<typeof INSTITUTION_INFO>(() => {
    try {
      const saved = localStorage.getItem('nest_cms_institution_v1');
      if (saved) return { ...INSTITUTION_INFO, ...JSON.parse(saved) };
    } catch (e) {
      console.error(e);
    }
    return INSTITUTION_INFO;
  });

  // 2. Announcements State
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    try {
      const saved = localStorage.getItem('nest_cms_announcements_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // 3. Faculty State
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(() => {
    try {
      const saved = localStorage.getItem('nest_cms_faculty_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return FACULTY_MEMBERS;
  });

  // 4. Programs State (Regular & Distance)
  const [programsList, setProgramsList] = useState<AcademicProgram[]>(() => {
    try {
      const saved = localStorage.getItem('nest_cms_programs_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ACADEMIC_PROGRAMS;
  });

  // 5. Gallery Photos State
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem('nest_cms_gallery_v2');
      if (saved) {
        const parsed: GalleryPhotoItem[] = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          imageUrl: item.imageUrl && !item.imageUrl.includes('unsplash.com')
            ? item.imageUrl
            : getAssetUrl(item.imageUrl, 'campus')
        }));
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_GALLERY_PHOTOS;
  });

  // 6. Admissions Submissions State
  const [admissionsList, setAdmissionsList] = useState<AdmissionSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('nest_cms_admissions_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ADMISSIONS;
  });

  // 7. Admin Auth State (Strict & Customizable for IT Admin)
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('nest_admin_email_v2') || DEFAULT_ADMIN_CREDENTIALS.username;
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('nest_admin_password_v2') || DEFAULT_ADMIN_CREDENTIALS.password;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('nest_admin_session_v2') === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    if (localStorage.getItem('nest_admin_session_v2') === 'true') {
      const email = localStorage.getItem('nest_admin_email_v2') || DEFAULT_ADMIN_CREDENTIALS.username;
      return {
        id: 'it-admin-ajesh',
        username: email,
        email: email,
        name: DEFAULT_ADMIN_CREDENTIALS.name,
        role: DEFAULT_ADMIN_CREDENTIALS.role,
        lastLogin: new Date().toLocaleTimeString(),
      };
    }
    return null;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('nest_cms_institution_v1', JSON.stringify(institutionInfo));
  }, [institutionInfo]);

  useEffect(() => {
    localStorage.setItem('nest_cms_announcements_v1', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('nest_cms_faculty_v2', JSON.stringify(facultyList));
  }, [facultyList]);

  useEffect(() => {
    localStorage.setItem('nest_cms_programs_v2', JSON.stringify(programsList));
  }, [programsList]);

  useEffect(() => {
    localStorage.setItem('nest_cms_gallery_v2', JSON.stringify(galleryPhotos));
  }, [galleryPhotos]);

  useEffect(() => {
    localStorage.setItem('nest_cms_admissions_v1', JSON.stringify(admissionsList));
  }, [admissionsList]);

  useEffect(() => {
    localStorage.setItem('nest_admin_email_v2', adminEmail);
  }, [adminEmail]);

  useEffect(() => {
    localStorage.setItem('nest_admin_password_v2', adminPassword);
  }, [adminPassword]);

  // Real-time Firestore Sync: Programs (Courses)
  useEffect(() => {
    try {
      const unsub = onSnapshot(
        collection(db, 'programs'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: AcademicProgram[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as AcademicProgram);
            });
            setProgramsList(list);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, 'programs');
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Firestore programs listener fallback to local state:', e);
    }
  }, []);

  // Real-time Firestore Sync: Announcements (Updates)
  useEffect(() => {
    try {
      const unsub = onSnapshot(
        collection(db, 'announcements'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: AnnouncementItem[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as AnnouncementItem);
            });
            setAnnouncements(list);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, 'announcements');
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Firestore announcements listener fallback to local state:', e);
    }
  }, []);

  // Real-time Firestore Sync: Candidate Admissions
  useEffect(() => {
    if (!isAdminLoggedIn) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'admissions'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: AdmissionSubmission[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as AdmissionSubmission);
            });
            setAdmissionsList(list);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, 'admissions');
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Firestore admissions listener fallback to local state:', e);
    }
  }, [isAdminLoggedIn]);

  // Auth Functions
  const login = (idOrEmail: string, pass: string) => {
    const cleanId = idOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();
    const currentAdminEmail = adminEmail.trim().toLowerCase();

    // Check if entered email matches current admin email or 'ajesh'
    const isEmailValid =
      cleanId === currentAdminEmail ||
      cleanId === 'ajesh@nestmysore.org' ||
      cleanId === 'ajesh';

    // Support both exact password and bracketed format [Ajesh@nestmysore@123]
    const isPassValid =
      cleanPass === adminPassword ||
      cleanPass === `[${adminPassword}]` ||
      (adminPassword === 'Ajesh@nestmysore@123' && cleanPass === '[Ajesh@nestmysore@123]');

    if (isEmailValid && isPassValid) {
      setIsAdminLoggedIn(true);
      const user: AdminUser = {
        id: 'it-admin-ajesh',
        username: adminEmail,
        email: adminEmail,
        name: DEFAULT_ADMIN_CREDENTIALS.name,
        role: DEFAULT_ADMIN_CREDENTIALS.role,
        lastLogin: new Date().toLocaleString(),
      };
      setAdminUser(user);
      localStorage.setItem('nest_admin_session_v2', 'true');

      // Authenticate with Firebase Auth asynchronously
      signInWithEmailAndPassword(auth, adminEmail, adminPassword)
        .catch(async () => {
          try {
            await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
          } catch {
            // Offline or credentials maintained locally
          }
        });

      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid Administrator Email or Password. Access denied.' 
    };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem('nest_admin_session_v2');
    localStorage.removeItem('nest_admin_session_v1');
    firebaseSignOut(auth).catch(() => {});
  };

  const updateAdminCredentials = (newEmail: string, oldPass?: string, newPass?: string) => {
    const cleanEmail = newEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid administrator email address.' };
    }

    if (newPass) {
      const isOldMatch = oldPass === adminPassword || oldPass === `[${adminPassword}]`;
      if (!isOldMatch) {
        return { success: false, error: 'Current password does not match.' };
      }
      if (newPass.length < 6) {
        return { success: false, error: 'New password must be at least 6 characters long.' };
      }
      setAdminPassword(newPass);
    }

    setAdminEmail(cleanEmail);
    return { success: true };
  };

  const changePassword = (oldPass: string, newPass: string) => {
    const isOldMatch = oldPass === adminPassword || oldPass === `[${adminPassword}]`;
    if (!isOldMatch) {
      return { success: false, error: 'Current password does not match.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    setAdminPassword(newPass);
    return { success: true };
  };

  // Content Management Handlers
  const updateInstitutionInfo = (updates: Partial<typeof INSTITUTION_INFO>) => {
    setInstitutionInfo((prev) => ({ ...prev, ...updates }));
  };

  const addAnnouncement = (item: Omit<AnnouncementItem, 'id'>) => {
    const newItem: AnnouncementItem = {
      ...item,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [newItem, ...prev]);
    setDoc(doc(db, 'announcements', newItem.id), newItem).catch((err) => {
      handleFirestoreError(err, OperationType.CREATE, `announcements/${newItem.id}`);
    });
  };

  const updateAnnouncement = (id: string, updates: Partial<AnnouncementItem>) => {
    let updatedItem: AnnouncementItem | undefined;
    setAnnouncements((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          updatedItem = { ...a, ...updates };
          return updatedItem;
        }
        return a;
      })
    );
    if (updatedItem) {
      setDoc(doc(db, 'announcements', id), updatedItem, { merge: true }).catch((err) => {
        handleFirestoreError(err, OperationType.UPDATE, `announcements/${id}`);
      });
    }
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    deleteDoc(doc(db, 'announcements', id)).catch((err) => {
      handleFirestoreError(err, OperationType.DELETE, `announcements/${id}`);
    });
  };

  const addFaculty = (member: Omit<FacultyMember, 'id'>) => {
    const newMember: FacultyMember = {
      ...member,
      id: `faculty-${Date.now()}`,
    };
    setFacultyList((prev) => [newMember, ...prev]);
  };

  const updateFaculty = (id: string, updates: Partial<FacultyMember>) => {
    setFacultyList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const deleteFaculty = (id: string) => {
    setFacultyList((prev) => prev.filter((f) => f.id !== id));
  };

  const addProgram = (program: Omit<AcademicProgram, 'id'>) => {
    const newProgram: AcademicProgram = {
      ...program,
      id: `prog-${Date.now()}`,
    };
    setProgramsList((prev) => [...prev, newProgram]);
    setDoc(doc(db, 'programs', newProgram.id), newProgram).catch((err) => {
      handleFirestoreError(err, OperationType.CREATE, `programs/${newProgram.id}`);
    });
  };

  const updateProgram = (id: string, updates: Partial<AcademicProgram>) => {
    let updatedProgram: AcademicProgram | undefined;
    setProgramsList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updatedProgram = { ...p, ...updates };
          return updatedProgram;
        }
        return p;
      })
    );
    if (updatedProgram) {
      setDoc(doc(db, 'programs', id), updatedProgram, { merge: true }).catch((err) => {
        handleFirestoreError(err, OperationType.UPDATE, `programs/${id}`);
      });
    }
  };

  const deleteProgram = (id: string) => {
    setProgramsList((prev) => prev.filter((p) => p.id !== id));
    deleteDoc(doc(db, 'programs', id)).catch((err) => {
      handleFirestoreError(err, OperationType.DELETE, `programs/${id}`);
    });
  };

  const addPhoto = (photo: Omit<GalleryPhotoItem, 'id'>) => {
    const newPhoto: GalleryPhotoItem = {
      ...photo,
      id: `photo-${Date.now()}`,
    };
    setGalleryPhotos((prev) => [newPhoto, ...prev]);
  };

  const updatePhoto = (id: string, updates: Partial<GalleryPhotoItem>) => {
    setGalleryPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePhoto = (id: string) => {
    setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const submitAdmissionInquiry = (data: Omit<AdmissionSubmission, 'id' | 'createdAt' | 'status'> & { status?: AdmissionSubmission['status'] }) => {
    const initialStatus = data.status || 'Pending Verification / Under Review';
    const regDetails = data.registrationDetails 
      ? { ...data.registrationDetails, status: initialStatus }
      : undefined;

    const newSubmission: AdmissionSubmission = {
      ...data,
      id: `adm-${Date.now()}`,
      status: initialStatus,
      registrationDetails: regDetails,
      createdAt: new Date().toISOString(),
    };
    setAdmissionsList((prev) => [newSubmission, ...prev]);
    setDoc(doc(db, 'admissions', newSubmission.id), newSubmission).catch((err) => {
      handleFirestoreError(err, OperationType.CREATE, `admissions/${newSubmission.id}`);
    });
  };

  const updateAdmissionStatus = (id: string, status: AdmissionSubmission['status'], notes?: string) => {
    setAdmissionsList((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updatedRegDetails = a.registrationDetails 
            ? { ...a.registrationDetails, status }
            : undefined;

          // Also sync to localStorage latest receipt if this application matches
          try {
            const savedReceipt = localStorage.getItem('nest_latest_admission_receipt');
            if (savedReceipt) {
              const parsed = JSON.parse(savedReceipt);
              if (parsed.applicationNo === a.registrationDetails?.applicationNo) {
                localStorage.setItem('nest_latest_admission_receipt', JSON.stringify({
                  ...parsed,
                  status,
                }));
              }
            }
          } catch {
            // ignore
          }

          return { 
            ...a, 
            status, 
            registrationDetails: updatedRegDetails,
            ...(notes !== undefined ? { notes } : {}) 
          };
        }
        return a;
      })
    );
  };

  const deleteAdmissionInquiry = (id: string) => {
    setAdmissionsList((prev) => prev.filter((a) => a.id !== id));
  };

  const resetToDefaults = () => {
    setInstitutionInfo(INSTITUTION_INFO);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setFacultyList(FACULTY_MEMBERS);
    setProgramsList(ACADEMIC_PROGRAMS);
    setGalleryPhotos(INITIAL_GALLERY_PHOTOS);
    setAdmissionsList(INITIAL_ADMISSIONS);
    setAdminPassword(DEFAULT_ADMIN_CREDENTIALS.password);
    localStorage.removeItem('nest_cms_institution_v1');
    localStorage.removeItem('nest_cms_announcements_v1');
    localStorage.removeItem('nest_cms_faculty_v1');
    localStorage.removeItem('nest_cms_faculty_v2');
    localStorage.removeItem('nest_cms_programs_v1');
    localStorage.removeItem('nest_cms_programs_v2');
    localStorage.removeItem('nest_cms_gallery_v1');
    localStorage.removeItem('nest_cms_gallery_v2');
    localStorage.removeItem('nest_cms_admissions_v1');
    localStorage.removeItem('nest_admin_password_v1');
  };

  const exportDataJson = () => {
    const data = {
      institutionInfo,
      announcements,
      facultyList,
      programsList,
      galleryPhotos,
      admissionsList,
      exportedAt: new Date().toISOString(),
      institution: 'Native Evangelical School of Theology, Mysore',
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.institutionInfo) setInstitutionInfo(data.institutionInfo);
      if (data.announcements) setAnnouncements(data.announcements);
      if (data.facultyList) setFacultyList(data.facultyList);
      if (data.programsList) setProgramsList(data.programsList);
      if (data.galleryPhotos) setGalleryPhotos(data.galleryPhotos);
      if (data.admissionsList) setAdmissionsList(data.admissionsList);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Invalid JSON format' };
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
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
        submitAdmissionInquiry,
        updateAdmissionStatus,
        deleteAdmissionInquiry,
        isAdminLoggedIn,
        adminUser,
        adminEmail,
        login,
        logout,
        changePassword,
        updateAdminCredentials,
        currentPasswordHint: adminPassword,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
