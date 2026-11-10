import { AcademicProgram, StatementOfFaithArticle, FacultyMember } from '../types';
import { getAssetUrl } from '../utils/assetHelper';

export const INSTITUTION_INFO = {
  name: "Native Evangelical School of Theology",
  nameKn: "ನೇಟಿವ್ ಇವಾಂಜೆಲಿಕಲ್ ಸ್ಕೂಲ್ ಆಫ್ ಥಿಯಾಲಜಿ",
  shortName: "NEST",
  tagline: "Theological Institution located at Mysore, Karnataka, India",
  taglineKn: "ಕರ್ನಾಟಕದ ಮೈಸೂರಿನಲ್ಲಿರುವ ಮಾನ್ಯತೆ ಪಡೆದ ದೇವತಾಶಾಸ್ತ್ರ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆ",
  motto: "Rooted in the Vine, Bearing Fruit for the Nations",
  mottoKn: "ಬಳ್ಳಿಯಲ್ಲಿ ನೆಲೆನಿಂತು, ರಾಷ್ಟ್ರಗಳಿಗಾಗಿ ಫಲಕೊಡುವ ಸೇವಕರು",
  mottoScripture: "John 15:5",
  mottoScriptureKn: "ಯೋಹಾನ 15:5",
  category: "Theological Higher Education / Evangelical Seminary",
  principal: "Rev. Santhosh K. Chacko, Principal",
  principalKn: "ರೆವ. ಸಂತೋಷ್ ಕೆ. ಚಾಕೊ, ಪ್ರಿನ್ಸಿಪಾಲ್",
  address: "No. 133, Nagarthalli, Rayanakere P. O, Jayapura Hobli, Mysore 570008, Karnataka, India",
  addressKn: "ನಂ. 133, ನಾಗರಹಳ್ಳಿ, ರಾಯನಕೆರೆ ಪೋಸ್ಟ್, ಜಯಪುರ ಹೋಬಳಿ, ಮೈಸೂರು 570008, ಕರ್ನಾಟಕ, ಭಾರತ",
  postalCode: "570008",
  city: "Mysore",
  state: "Karnataka",
  country: "India",
  phone: "918880111763",
  phoneFormatted: "+91 88801 11763",
  email: "nestmysore@gmail.com",
  accreditation: {
    title: "Accredited Member of Asia Theological Association India",
    titleKn: "ಏಷ್ಯಾ ಥಿಯಾಲಾಜಿಕಲ್ ಅಸೋಸಿಯೇಷನ್ (ATA India) ಅಧಿಕೃತ ಸದಸ್ಯ ಸಂಸ್ಥೆ",
    shortTitle: "ATA India Accredited",
    body: "Asia Theological Association (ATA) India",
    directoryUrl: "https://ataindia.org/institution/native-evangelical-school-of-theology-2/",
    status: "Accredited Member",
    coursesOffered: [
      "Bachelor of Theology (B.Th)",
      "Diploma in Theology (Dip.Th)",
      "Master of Divinity (M.Div)"
    ],
    summary: "Native Evangelical School of Theology is officially recognized and accredited by the Asia Theological Association India (ATA India), adhering to rigorous evangelical academic standards, spiritual formation, and ministerial excellence."
  },
  socialLinks: {
    facebook: "https://share.google/td3ZrSFMqffHNzANv",
    youtube: "https://youtube.com/@nativeevangelicalschooloftheol?si=ntbOSZr1CLfo8Wg6",
    location: "https://share.google/8iDVppGi60dwCFj45",
    ataDirectory: "https://ataindia.org/institution/native-evangelical-school-of-theology-2/",
  },
  establishedYear: 2012,
  affiliations: "Accredited Member of Asia Theological Association India (ATA India)",
  officeHours: "Monday - Saturday: 8:30 AM - 5:30 PM (IST)",
};

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  // ==========================================
  // REGULAR CLASSES (Residential / On-Campus)
  // ==========================================
  {
    id: "b-th",
    code: "B.Th",
    title: "Bachelor of Theology",
    titleKn: "ಬ್ಯಾಚುಲರ್ ಆಫ್ ಥಿಯಾಲಜಿ (B.Th - ರೆಗ್ಯುಲರ್)",
    programCategory: "Regular",
    programCategoryKn: "ರೆಗ್ಯುಲರ್ ತರಗತಿಗಳು (ವಸತಿಯುತ)",
    degreeLevel: "Bachelor",
    duration: "3 Years (6 Semesters Residential)",
    durationKn: "3 ವರ್ಷಗಳು (6 ಸೆಮಿಸ್ಟರ್‌ಗಳು - ವಸತಿಯುತ)",
    mode: "Regular Classes / Full-Time Residential at Mysore Campus",
    modeKn: "ರೆಗ್ಯುಲರ್ ತರಗತಿಗಳು / ಪೂರ್ಣಕಾಲಿಕ ವಸತಿಯುತ (ಮೈಸೂರು ಕ್ಯಾಂಪಸ್)",
    language: "English Medium Only (Official)",
    languageKn: "ಕೇವಲ ಇಂಗ್ಲಿಷ್ ಮಾಧ್ಯಮ (ಅಧಿಕೃತ)",
    eligibility: "10+2 / PUC (Pre-University Course) or recognized equivalent passed; Christian testimony and church pastor recommendation; Personal interview.",
    eligibilityKn: "10+2 / ಪಿಯುಸಿ ಅಥವಾ ತತ್ಸಮಾನ ತೇರ್ಗಡೆ; ಕ್ರೈಸ್ತ ಸಾಕ್ಷ್ಯ ಹಾಗೂ ಸಭಾಪಾಲಕರ ಶಿಫಾರಸು ಪತ್ರ; ವೈಯಕ್ತಿಕ ಸಂದರ್ಶನ.",
    description: "An Asia Theological Association (ATA India) accredited three-year residential undergraduate degree program delivering comprehensive exegetical, doctrinal, and pastoral training with daily chapel devotions and supervised weekend field ministry.",
    descriptionKn: "ಏಷ್ಯಾ ಥಿಯಾಲಾಜಿಕಲ್ ಅಸೋಸಿಯೇಷನ್ (ATA India) ಅಧಿಕೃತ ಮಾನ್ಯತೆ ಪಡೆದ 3 ವರ್ಷಗಳ ವಸತಿಯುತ ಪದವಿ ಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ. ಪ್ರತಿದಿನದ ಚಾಪೆಲ್ ಆರಾಧನೆ, ಗ್ರೀಕ್ ಭಾಷಾ ಅಧ್ಯಯನ ಮತ್ತು ವಾರಾಂತ್ಯದ ಪ್ರಾಯೋಗಿಕ ಸೇವೆ ಒಳಗೊಂಡಿದೆ.",
    contactClasses: "Full-time daily lectures (Monday–Friday) at Nagarthalli campus, morning chapel, and weekend church internship.",
    contactClassesKn: "ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ಸೋಮವಾರದಿಂದ ಶುಕ್ರವಾರದವರೆಗೆ ಪೂರ್ಣಕಾಲಿಕ ತರಗತಿಗಳು ಮತ್ತು ವಾರಾಂತ್ಯದ ಸಭಾ ಸೇವೆ.",
    targetAudience: "Full-time residential students called by God to pastoral ministry, church planting, and theological leadership.",
    targetAudienceKn: "ಸಭಾಪಾಲನೆ, ಸಭೆಗಳ ಸ್ಥಾಪನೆ ಮತ್ತು ದೇವತಾಶಾಸ್ತ್ರ ಸೇವೆಗೆ ಕರೆಯಲ್ಪಟ್ಟ ಯುವಕ-ಯುವತಿಯರು.",
    curriculumTopics: [
      "Old Testament Survey, Pentateuch, Historical Books, Prophets & Wisdom Literature",
      "New Testament Survey, Synoptic Gospels, Acts, Pauline & General Epistles, Revelation",
      "Biblical Greek Grammar, Syntax & Exegesis",
      "Systematic Theology: Bibliology, Theology Proper, Christology, Pneumatology, Soteriology, Ecclesiology & Eschatology",
      "General Church History & History of Christianity in India",
      "Biblical Hermeneutics & Expository Preaching",
      "Pastoral Care, Counseling & Local Church Administration",
      "Major World Religions, Indian Philosophy & Contemporary Cults",
      "Rural Church Planting Practicum & Supervised Weekend Ministry"
    ],
    curriculumTopicsKn: [
      "ಹಳೆಯ ಒಡಂಬಡಿಕೆಯ ಸಮಗ್ರ ಸಮೀಕ್ಷೆ, ಪಂಚಗ್ರಂಥಗಳು ಮತ್ತು ಪ್ರವಾದಿಗಳ ಗ್ರಂಥಗಳು",
      "ಹೊಸ ಒಡಂಬಡಿಕೆಯ ಸಮೀಕ್ಷೆ, ಸುವಾರ್ತೆಗಳು, ಅಪೋಸ್ತಲರ ಕೃತ್ಯಗಳು ಮತ್ತು ಪತ್ರಗಳು",
      "ಮೂಲ ಗ್ರೀಕ್ ವ್ಯಾಕರಣ, ವಾಕ್ಯರಚನೆ ಮತ್ತು ಸತ್ಯವೇದ ವ್ಯಾಖ್ಯಾನ",
      "ವ್ಯವಸ್ಥಿತ ಧರ್ಮಶಾಸ್ತ್ರ (ದೇವರು, ಕ್ರಿಸ್ತ, ಪವಿತ್ರಾತ್ಮ, ರಕ್ಷಣೆ ಮತ್ತು ಸಭೆ)",
      "ಸಭಾ ಇತಿಹಾಸ ಮತ್ತು ಭಾರತದಲ್ಲಿ ಕ್ರೈಸ್ತ ಧರ್ಮದ ಬೆಳವಣಿಗೆ",
      "ಸತ್ಯವೇದ ವ್ಯಾಖ್ಯಾನ ಶಾಸ್ತ್ರ ಮತ್ತು ಪ್ರಸಂಗ ರಚನಾ ಕಲೆ",
      "ಸಭಾಪಾಲನಾ ಆರೈಕೆ, ಆಪ್ತಸಮಾಲೋಚನೆ ಮತ್ತು ಸಭಾ ಆಡಳಿತ",
      "ವಿಶ್ವ ಧರ್ಮಗಳು, ಭಾರತೀಯ ತತ್ವಜ್ಞಾನ ಮತ್ತು ಸಮಕಾಲೀನ ಸಿದ್ಧಾಂತಗಳು",
      "ಗ್ರಾಮೀಣ ಸಭಾ ಸ್ಥಾಪನಾ ಕಾರ್ಯಾನುಭವ ಮತ್ತು ವಾರಾಂತ್ಯದ ಪ್ರಾಯೋಗಿಕ ಸೇವೆ"
    ],
    featured: true,
    ataAccredited: true
  },
  {
    id: "m-div",
    code: "M.Div",
    title: "Master of Divinity",
    titleKn: "ಮಾಸ್ಟರ್ ಆಫ್ ಡಿವಿನಿಟಿ (M.Div - ರೆಗ್ಯುಲರ್)",
    programCategory: "Regular",
    programCategoryKn: "ರೆಗ್ಯುಲರ್ ತರಗತಿಗಳು (ವಸತಿಯುತ)",
    degreeLevel: "Master",
    duration: "2–3 Years (Residential: 2 Yrs for B.Th / 3 Yrs for Graduates)",
    durationKn: "2 ರಿಂದ 3 ವರ್ಷಗಳು (B.Th ಹೊಂದಿದವರಿಗೆ 2 ವರ್ಷ / ಇತರ ಪದವೀಧರರಿಗೆ 3 ವರ್ಷ)",
    mode: "Regular Classes / Full-Time Residential at Mysore Campus",
    modeKn: "ರೆಗ್ಯುಲರ್ ತರಗತಿಗಳು / ಪೂರ್ಣಕಾಲಿಕ ವಸತಿಯುತ (ಮೈಸೂರು ಕ್ಯಾಂಪಸ್)",
    language: "English Medium Only (Official)",
    languageKn: "ಕೇವಲ ಇಂಗ್ಲಿಷ್ ಮಾಧ್ಯಮ (ಅಧಿಕೃತ)",
    eligibility: "Recognized Bachelor Degree: B.Th from an ATA/accredited seminary for 2-Year track; OR any Bachelor degree (B.A/B.Sc/B.Com/B.Tech) from a recognized university for 3-Year track; Christian calling to ministry and pastoral recommendation.",
    eligibilityKn: "ಮಾನ್ಯತೆ ಪಡೆದ ಪದವಿ (B.Th ಹೊಂದಿದವರಿಗೆ 2 ವರ್ಷ; ಸಾಮಾನ್ಯ ವಿವಿ ಪದವೀಧರರಿಗೆ 3 ವರ್ಷಗಳ ಕೋರ್ಸ್); ದೈವಿಕ ಕರೆ ಮತ್ತು ಸಭಾಪಾಲಕರ ಶಿಫಾರಸು ಪತ್ರ.",
    description: "An Asia Theological Association (ATA India) accredited residential graduate program preparing pastors, scholars, missionaries, and seminary educators with advanced biblical research and leadership competence.",
    descriptionKn: "ಏಷ್ಯಾ ಥಿಯಾಲಾಜಿಕಲ್ ಅಸೋಸಿಯೇಷನ್ (ATA India) ಅಧಿಕೃತ ಮಾನ್ಯತೆ ಪಡೆದ ವಸತಿಯುತ ಸ್ನಾತಕೋತ್ತರ ದೇವತಾಶಾಸ್ತ್ರ ಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ. ಆಳವಾದ ಸತ್ಯವೇದ ಸಂಶೋಧನೆ ಮತ್ತು ಉನ್ನತ ನಾಯಕತ್ವ ತರಬೇತಿ ನೀಡುತ್ತದೆ.",
    contactClasses: "Full-time on-campus seminars, interactive faculty tutorials, library research, and residential chapel life.",
    contactClassesKn: "ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ನಿತ್ಯದ ಉಪನ್ಯಾಸಗಳು, ಗ್ರಂಥಾಲಯ ಸಂಶೋಧನೆ ಹಾಗೂ ವಸತಿಯುತ ಚಾಪೆಲ್ ಪ್ರಾರ್ಥನಾ ಜೀವನ.",
    targetAudience: "Pastors, Bible teachers, mission directors, and graduates pursuing senior leadership and academic teaching.",
    targetAudienceKn: "ಹಿರಿಯ ಸಭಾಪಾಲಕರು, ಬೈಬಲ್ ಬೋಧಕರು, ಮಿಷನ್ ನಿರ್ದೇಶಕರು ಮತ್ತು ಉನ್ನತ ನಾಯಕತ್ವಕ್ಕೆ ಸಿದ್ಧರಾಗುವವರು.",
    curriculumTopics: [
      "Advanced Greek Exegesis & Biblical Hebrew Grammar",
      "Advanced Biblical Theology of the Old and New Testaments",
      "Advanced Systematic Theology & Contemporary Theological Currents",
      "Christian Apologetics in Multi-Religious & Pluralistic Contexts",
      "History of Christian Missions & Cross-Cultural Church Multiplication",
      "Advanced Expository Preaching Practicum & Homiletics",
      "Pastoral Leadership Dynamics, Counseling & Organizational Management",
      "Theological Research Methodology & Master Thesis / Capstone Project",
      "Supervised Advanced Pastoral Internship in Indian Ministry Context"
    ],
    curriculumTopicsKn: [
      "ಸುಧಾರಿತ ಗ್ರೀಕ್ ವ್ಯಾಖ್ಯಾನ ಮತ್ತು ಮೂಲ ಹೀಬ್ರೂ ಭಾಷಾ ವ್ಯಾಕರಣ",
      "ಹಳೆಯ ಮತ್ತು ಹೊಸ ಒಡಂಬಡಿಕೆಯ ಉನ್ನತ ದೇವತಾಶಾಸ್ತ್ರ",
      "ಸುಧಾರಿತ ವ್ಯವಸ್ಥಿತ ಧರ್ಮಶಾಸ್ತ್ರ ಮತ್ತು ಸಮಕಾಲೀನ ಸವಾಲುಗಳು",
      "ಭಾರತೀಯ ಸಾಂಸ್ಕೃತಿಕ ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಸತ್ಯ ಸಮರ್ಥನೆ (Apologetics)",
      "ಕ್ರೈಸ್ತ ಮಿಷನ್ ಇತಿಹಾಸ ಮತ್ತು ವಿವಿಧ ಸಂಸ್ಕೃತಿಗಳಲ್ಲಿ ಸಭಾ ಸ್ಥಾಪನೆ",
      "ಉನ್ನತ ಪ್ರಸಂಗ ಕಲೆ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಬೋಧನಾ ತರಬೇತಿ",
      "ಸಭಾ ನಾಯಕತ್ವದ ಶಿಸ್ತು, ಆಪ್ತಸಮಾಲೋಚನೆ ಮತ್ತು ಸಂಸ್ಥಾ ನಿರ್ವಹಣೆ",
      "ದೇವತಾಶಾಸ್ತ್ರ ಸಂಶೋಧನಾ ವಿಧಾನಗಳು ಮತ್ತು ಎಂ.ಡಿವ್ ಪ್ರಬಂಧ ರಚನೆ",
      "ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ ಉನ್ನತ ಸಭಾಪಾಲನಾ ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ"
    ],
    featured: true,
    ataAccredited: true
  },
  {
    id: "dip-th",
    code: "Dip.Th",
    title: "Diploma in Theology",
    titleKn: "ಡಿಪ್ಲೊಮಾ ಇನ್ ಥಿಯಾಲಜಿ (Dip.Th - ರೆಗ್ಯುಲರ್)",
    programCategory: "Regular",
    programCategoryKn: "ರೆಗ್ಯುಲರ್ ತರಗತಿಗಳು (ವಸತಿಯುತ)",
    degreeLevel: "Diploma",
    duration: "2 Years (4 Semesters Residential)",
    durationKn: "2 ವರ್ಷಗಳು (4 ಸೆಮಿಸ್ಟರ್‌ಗಳು - ವಸತಿಯುತ)",
    mode: "Regular Classes / Full-Time Residential at Mysore Campus",
    modeKn: "ರೆಗ್ಯುಲರ್ ತರಗತಿಗಳು / ಪೂರ್ಣಕಾಲಿಕ ವಸತಿಯುತ (ಮೈಸೂರು ಕ್ಯಾಂಪಸ್)",
    language: "Combined Kannada & English (Bilingual Track)",
    languageKn: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಸಂಯೋಜಿತ ಮಾಧ್ಯಮ",
    eligibility: "10th Standard (SSLC) / High School completed; Personal confession of faith in Jesus Christ and pastoral recommendation.",
    eligibilityKn: "ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ (10ನೇ ತರಗತಿ) ತೇರ್ಗಡೆ; ಯೇಸು ಕ್ರಿಸ್ತನಲ್ಲಿ ನಂಬಿಕೆ ಮತ್ತು ಸಭಾಪಾಲಕರ ಶಿಫಾರಸು ಪತ್ರ.",
    description: "An Asia Theological Association (ATA India) accredited two-year residential diploma program offered in English and Kannada, tailored for grassroots evangelists, church workers, and aspiring pastors.",
    descriptionKn: "ಏಷ್ಯಾ ಥಿಯಾಲಾಜಿಕಲ್ ಅಸೋಸಿಯೇಷನ್ (ATA India) ಅಧಿಕೃತ ಮಾನ್ಯತೆ ಪಡೆದ 2 ವರ್ಷಗಳ ಡಿಪ್ಲೊಮಾ ಕೋರ್ಸ್ (ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್). ಸ್ಥಳೀಯ ಸುವಾರ್ತಿಕರು ಮತ್ತು ಸೇವಾ ಆಸಕ್ತರಿಗಾಗಿ ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮ.",
    contactClasses: "Daily classroom lectures, hands-on Kannada & English ministry assignments, and weekend church placement.",
    contactClassesKn: "ದೈನಂದಿನ ತರಗತಿಗಳು, ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಪ್ರಾಯೋಗಿಕ ಕಾರ್ಯಗಳು ಹಾಗೂ ವಾರಾಂತ್ಯದ ಸಭಾ ಸೇವೆ.",
    targetAudience: "Grassroots evangelists, native church workers, and Christian youth seeking foundational ministerial training in their local language.",
    targetAudienceKn: "ಸ್ಥಳೀಯ ಸುವಾರ್ತಿಕರು, ಸಭಾ ಸೇವಕರು ಹಾಗೂ ಕನ್ನಡ-ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಕಲಿಯಬಯಸುವ ಯುವಕರು.",
    curriculumTopics: [
      "Old Testament Overview & Historical Highlights",
      "New Testament Overview & Life and Ministry of Jesus",
      "Essential Christian Doctrines & Confessions of Faith",
      "Survey of Church History & Evangelical Revivals",
      "Personal Evangelism, Village Outreach & Discipleship Methods",
      "Practical Homiletics: Sermon Preparation in Local Languages",
      "Worship Leading, Music Ministry & Prayer Gathering Leadership",
      "Practical Church Work, Pastoral Ethics & Community Compassion"
    ],
    curriculumTopicsKn: [
      "ಹಳೆಯ ಒಡಂಬಡಿಕೆಯ ಮುಖ್ಯ ಮುಖ್ಯಾಂಶಗಳು ಮತ್ತು ಇತಿಹಾಸ",
      "ಹೊಸ ಒಡಂಬಡಿಕೆ ಮತ್ತು ಯೇಸು ಕ್ರಿಸ್ತನ ಜೀವಿತ-ಬೋಧನೆಗಳು",
      "ಕ್ರೈಸ್ತ ಮೂಲ ಸಿದ್ಧಾಂತಗಳು ಮತ್ತು ವಿಶ್ವಾಸ ಪ್ರಮಾಣ",
      "ಸಭಾ ಇತಿಹಾಸ ಮತ್ತು ಪುನರುಜ್ಜೀವನಗಳ ಸಮೀಕ್ಷೆ",
      "ವೈಯಕ್ತಿಕ ಸುವಾರ್ತೆ, ಗ್ರಾಮೀಣ ಸೇವೆ ಮತ್ತು ಶಿಷ್ಯತ್ವ ವಿಧಾನಗಳು",
      "ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ವಾಕ್ಯ ಸಂದೇಶ ಸಿದ್ಧಪಡಿಸುವ ಕಲೆ",
      "ಆರಾಧನೆ ಮುನ್ನಡೆಸುವುದು, ಸಂಗೀತ ಸೇವೆ ಮತ್ತು ಪ್ರಾರ್ಥನಾ ಕೂಟಗಳು",
      "ಪ್ರಾಯೋಗಿಕ ಸಭಾ ಸೇವೆ, ಸೇವಕರ ನೀತಿಸಂಹಿತೆ ಮತ್ತು ಸಮಾಜ ಸೇವೆ"
    ],
    featured: false,
    ataAccredited: true
  },

  // ==========================================
  // DISTANCE EDUCATION (External / Flexible / TEE)
  // ==========================================
  {
    id: "b-th-distance",
    code: "B.Th (Distance)",
    title: "Bachelor of Theology — Distance Education",
    titleKn: "ಬ್ಯಾಚುಲರ್ ಆಫ್ ಥಿಯಾಲಜಿ (B.Th - ದೂರಶಿಕ್ಷಣ)",
    programCategory: "Distance",
    programCategoryKn: "ದೂರಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ (Distance Education)",
    degreeLevel: "Bachelor",
    duration: "3–4 Years (Flexible / Self-Paced Study Modules)",
    durationKn: "3 ರಿಂದ 4 ವರ್ಷಗಳು (ಹೊಂದಿಕೊಳ್ಳುವ ಸ್ವಯಂ ಅಧ್ಯಯನ)",
    mode: "Distance Education / External Study with Study Materials & Contact Seminars",
    modeKn: "ದೂರಶಿಕ್ಷಣ / ಮುದ್ರಿತ ಪಠ್ಯ ಸಾಮಗ್ರಿಗಳು & ಸಂಪರ್ಕ ತರಗತಿಗಳು",
    language: "English Medium Only (Official)",
    languageKn: "ಕೇವಲ ಇಂಗ್ಲಿಷ್ ಮಾಧ್ಯಮ (ಅಧಿಕೃತ)",
    eligibility: "10+2 / PUC passed, OR mature candidates (minimum age 25 years) with active church ministry experience; Pastoral recommendation letter.",
    eligibilityKn: "10+2 / ಪಿಯುಸಿ ತೇರ್ಗಡೆ, ಅಥವಾ 25 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಅನುಭವವುಳ್ಳ ಸಭಾ ಸೇವಕರು; ಸಭಾಪಾಲಕರ ಶಿಫಾರಸು ಪತ್ರ.",
    description: "A comprehensive external distance theological degree designed for active pastors, evangelists, church elders, and working professionals who cannot relocate to Mysore for residential study, providing guided modular textbooks, online tutorials, and periodic contact seminars.",
    descriptionKn: "ಸೇವೆಯಲ್ಲಿರುವ ಸಭಾಪಾಲಕರು, ಹಿರಿಯರು ಮತ್ತು ಉದ್ಯೋಗಸ್ಥರಿಗಾಗಿ ರೂಪಿಸಲಾದ ಅಧಿಕೃತ ದೂರಶಿಕ್ಷಣ ದೇವತಾಶಾಸ್ತ್ರ ಪದವಿ. ಸ್ವಯಂ ಅಧ್ಯಯನ ಸಾಮಗ್ರಿಗಳು, ಅಸೈನ್‌ಮೆಂಟ್‌ಗಳು ಮತ್ತು ಆವರ್ತಕ ಸಂಪರ್ಕ ಶಿಬಿರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
    contactClasses: "Self-paced study modules sent to your location, continuous tutor evaluation via assignments, and annual Mysore campus contact seminars / online webinar sessions.",
    contactClassesKn: "ಪಠ್ಯ ಸಾಮಗ್ರಿಗಳ ರವಾನೆ, ಲಿಖಿತ ಅಸೈನ್‌ಮೆಂಟ್‌ಗಳು ಮತ್ತು ವಾರ್ಷಿಕ ಕ್ಯಾಂಪಸ್ ಸಂಪರ್ಕ ಶಿಬಿರಗಳು / ಆನ್‌ಲೈನ್ ವೆಬಿನಾರ್‌ಗಳು.",
    targetAudience: "Working pastors, church elders, NGO workers, teachers, and Christian professionals seeking an accredited undergraduate theology degree while continuing their occupation.",
    targetAudienceKn: "ಕೆಲಸ ಮಾಡುತ್ತಿರುವ ಸಭಾಪಾಲಕರು, ಹಿರಿಯರು, ಉದ್ಯೋಗಸ್ಥರು ಮತ್ತು ಸೇವೆಯಲ್ಲಿ ಮುಂದುವರಿಯುತ್ತಿರುವ ನಾಯಕರು.",
    curriculumTopics: [
      "Module 1: Principles of Biblical Interpretation & Hermeneutics",
      "Module 2: Old Testament Survey & Major Prophetic Writings",
      "Module 3: New Testament Survey & Apostolic Epistles",
      "Module 4: Systematic Christian Theology & Historic Creeds",
      "Module 5: Church History & The Protestant Reformation",
      "Module 6: Christian Apologetics & Indian Worldviews",
      "Module 7: Pastoral Care, Family Life & Biblical Counseling",
      "Module 8: Church Planting Strategies & Community Ministry",
      "Module 9: Comprehensive Fieldwork Report & Ministry Portfolio"
    ],
    curriculumTopicsKn: [
      "ಮಾಡ್ಯೂಲ್ 1: ಸತ್ಯವೇದ ವ್ಯಾಖ್ಯಾನ ಶಾಸ್ತ್ರದ ಮೂಲತತ್ವಗಳು",
      "ಮಾಡ್ಯೂಲ್ 2: ಹಳೆಯ ಒಡಂಬಡಿಕೆಯ ಸಮೀಕ್ಷೆ ಮತ್ತು ಪ್ರವಾದನ ಸಾಹಿತ್ಯ",
      "ಮಾಡ್ಯೂಲ್ 3: ಹೊಸ ಒಡಂಬಡಿಕೆಯ ಸಮೀಕ್ಷೆ ಮತ್ತು ಅಪೋಸ್ತಲರ ಪತ್ರಗಳು",
      "ಮಾಡ್ಯೂಲ್ 4: ವ್ಯವಸ್ಥಿತ ಕ್ರೈಸ್ತ ಧರ್ಮಶಾಸ್ತ್ರ ಮತ್ತು ನಂಬಿಕೆಯ ಸತ್ಯಗಳು",
      "ಮಾಡ್ಯೂಲ್ 5: ಸಭಾ ಇತಿಹಾಸ ಮತ್ತು ಪ್ರೊಟೆಸ್ಟಂಟ್ ಸುಧಾರಣೆ",
      "ಮಾಡ್ಯೂಲ್ 6: ಸತ್ಯ ಸಮರ್ಥನೆ ಮತ್ತು ಭಾರತೀಯ ಸಮಾಜ",
      "ಮಾಡ್ಯೂಲ್ 7: ಸಭಾಪಾಲನಾ ಆರೈಕೆ, ಕುಟುಂಬ ಜೀವನ ಮತ್ತು ಕೌನ್ಸಿಲಿಂಗ್",
      "ಮಾಡ್ಯೂಲ್ 8: ಸಭಾ ಸ್ಥಾಪನಾ ತಂತ್ರಗಾರಿಕೆ ಮತ್ತು ಸಮುದಾಯ ಸೇವೆ",
      "ಮಾಡ್ಯೂಲ್ 9: ಸಮಗ್ರ ಪ್ರಾಯೋಗಿಕ ಸೇವಾ ವರದಿ ಮತ್ತು ಪರೀಕ್ಷೆ"
    ],
    featured: true,
    ataAccredited: true
  },
  {
    id: "m-div-distance",
    code: "M.Div (Distance)",
    title: "Master of Divinity — Distance Education",
    titleKn: "ಮಾಸ್ಟರ್ ಆಫ್ ಡಿವಿನಿಟಿ (M.Div - ದೂರಶಿಕ್ಷಣ)",
    programCategory: "Distance",
    programCategoryKn: "ದೂರಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ (Distance Education)",
    degreeLevel: "Master",
    duration: "3–4 Years (Modular External / Hybrid Study Format)",
    durationKn: "3 ರಿಂದ 4 ವರ್ಷಗಳು (ಮಾಡ್ಯುಲರ್ ದೂರಶಿಕ್ಷಣ / ಹೈಬ್ರಿಡ್)",
    mode: "Distance Education / Modular Hybrid (Self-Study + Virtual Mentoring + Contact Intensive)",
    modeKn: "ದೂರಶಿಕ್ಷಣ / ಹೈಬ್ರಿಡ್ (ಸ್ವಯಂ ಅಧ್ಯಯನ + ಆನ್‌ಲೈನ್ ಮಾರ್ಗದರ್ಶನ + ಸಂಪರ್ಕ ತರಗತಿ)",
    language: "English Medium Only (Official)",
    languageKn: "ಕೇವಲ ಇಂಗ್ಲಿಷ್ ಮಾಧ್ಯಮ (ಅಧಿಕೃತ)",
    eligibility: "Any recognized Bachelor's Degree (B.Th / B.A / B.Sc / B.Com / B.Tech or equivalent) from an accredited university or seminary; Active involvement in Christian church ministry; Pastoral recommendation letter.",
    eligibilityKn: "ಯಾವುದೇ ಮಾನ್ಯತೆ ಪಡೆದ ಪದವಿ (B.Th / B.A / B.Sc / B.Com / B.Tech ಇತ್ಯಾದಿ); ಸಕ್ರಿಯ ಕ್ರೈಸ್ತ ಸೇವಾ ಅನುಭವ ಮತ್ತು ಸಭಾಪಾಲಕರ ಶಿಫಾರಸು ಪತ್ರ.",
    description: "An advanced, rigorous postgraduate distance theology program tailored for practicing pastors, missionaries, and senior Christian professionals aiming to deepen their biblical research, exegesis, and strategic ministry leadership without relocating.",
    descriptionKn: "ಸೇವಾನಿರತ ಸಭಾಪಾಲಕರು, ಮಿಷನರಿಗಳು ಮತ್ತು ಹಿರಿಯ ಕ್ರೈಸ್ತ ವೃತ್ತಿಪರರಿಗಾಗಿ ರೂಪಿಸಲಾದ ಉನ್ನತ ಸ್ನಾತಕೋತ್ತರ ದೂರಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ. ಆಳವಾದ ಸತ್ಯವೇದ ಸಂಶೋಧನೆ ಮತ್ತು ನಾಯಕತ್ವಕ್ಕೆ ಒತ್ತು ನೀಡುತ್ತದೆ.",
    contactClasses: "Guided reading modules, monthly faculty webinar consultations, semester assignment evaluations, and annual intensive contact modular seminars at Mysore campus.",
    contactClassesKn: "ಸ್ವಯಂ ಅಧ್ಯಯನ ಪಠ್ಯಗಳು, ಮಾಸಿಕ ಅಧ್ಯಾಪಕರ ಆನ್‌ಲೈನ್ ಸಮಾಲೋಚನೆ ಹಾಗೂ ಮೈಸೂರಿನಲ್ಲಿ ವಾರ್ಷಿಕ ತೀವ್ರ ಸಂಪರ್ಕ ತರಗತಿಗಳು.",
    targetAudience: "Established pastors, mission directors, organizational executives, and Christian professionals desiring rigorous postgraduate theological education without interrupting their ministry.",
    targetAudienceKn: "ಸ್ಥಾಪಿತ ಸಭಾಪಾಲಕರು, ಮಿಷನ್ ಸಂಸ್ಥೆಗಳ ಮುಖ್ಯಸ್ಥರು ಮತ್ತು ಸೇವಾ ನಿರತರಾದ ವೃತ್ತಿಪರರು.",
    curriculumTopics: [
      "Unit 1: Exegetical Methods & Advanced Biblical Hermeneutics",
      "Unit 2: Old and New Testament Biblical Theology",
      "Unit 3: Advanced Systematic Theology & Contemporary Indian Issues",
      "Unit 4: Global Mission Trends & Indigenous Church Multiplication",
      "Unit 5: Pastoral Leadership, Administration & Organizational Ethics",
      "Unit 6: Mental Health, Trauma & Biblical Pastoral Counseling",
      "Unit 7: Theological Research Methodologies & Academic Writing",
      "Unit 8: Master Degree Capstone Research Project or Ministry Dissertation"
    ],
    curriculumTopicsKn: [
      "ಘಟಕ 1: ಸತ್ಯವೇದ ವ್ಯಾಖ್ಯಾನದ ಉನ್ನತ ವಿಧಾನಗಳು",
      "ಘಟಕ 2: ಹಳೆಯ ಮತ್ತು ಹೊಸ ಒಡಂಬಡಿಕೆಯ ದೇವತಾಶಾಸ್ತ್ರ",
      "ಘಟಕ 3: ಸುಧಾರಿತ ಧರ್ಮಶಾಸ್ತ್ರ ಮತ್ತು ಭಾರತೀಯ ಸಮಕಾಲೀನ ಸವಾಲುಗಳು",
      "ಘಟಕ 4: ಜಾಗತಿಕ ಮಿಷನ್ ಮತ್ತು ಸ್ಥಳೀಯ ಸಭೆಗಳ ವಿಸ್ತರಣೆ",
      "ಘಟಕ 5: ಸಭಾ ನಾಯಕತ್ವ, ಆಡಳಿತ ಮತ್ತು ನೈತಿಕ ಶಿಸ್ತು",
      "ಘಟಕ 6: ಮಾನಸಿಕ ಆರೋಗ್ಯ, ದುಃಖ ಮತ್ತು ಸತ್ಯವೇದಾಧಾರಿತ ಕೌನ್ಸಿಲಿಂಗ್",
      "ಘಟಕ 7: ದೇವತಾಶಾಸ್ತ್ರ ಸಂಶೋಧನಾ ವಿಧಾನಗಳು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಲೇಖನ",
      "ಘಟಕ 8: ಎಂ.ಡಿವ್ ಉನ್ನತ ಸಂಶೋಧನಾ ಪ್ರಬಂಧ ಅಥವಾ ಪ್ರಾಜೆಕ್ಟ್"
    ],
    featured: true,
    ataAccredited: true
  },
  {
    id: "dip-th-distance",
    code: "Dip.Th (Distance)",
    title: "Diploma in Theology — Distance Education",
    titleKn: "ಡಿಪ್ಲೊಮಾ ಇನ್ ಥಿಯಾಲಜಿ (Dip.Th - ದೂರಶಿಕ್ಷಣ)",
    programCategory: "Distance",
    programCategoryKn: "ದೂರಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ (Distance Education)",
    degreeLevel: "Diploma",
    duration: "2 Years (Flexible Self-Paced / Max 3 Years)",
    durationKn: "2 ವರ್ಷಗಳು (ಹೊಂದಿಕೊಳ್ಳುವ ಸ್ವಯಂ ಅಧ್ಯಯನ / ಗರಿಷ್ಠ 3 ವರ್ಷ)",
    mode: "Distance Education / External Home Study with Printed Lessons",
    modeKn: "ದೂರಶಿಕ್ಷಣ / ಮನೆಯಲ್ಲೇ ಅಧ್ಯಯನ ಮಾಡುವ ಮುದ್ರಿತ ಪಠ್ಯಗಳು",
    language: "Offered in Combined Kannada & English Tracks",
    languageKn: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಸಂಯೋಜಿತ ಮಾಧ್ಯಮ",
    eligibility: "10th Standard (SSLC) / High School completed; Pastoral recommendation from local church; Eagerness to grow in biblical knowledge.",
    eligibilityKn: "ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ (10ನೇ ತರಗತಿ) ತೇರ್ಗಡೆ; ಸಭಾಪಾಲಕರ ಶಿಫಾರಸು ಪತ್ರ; ಸತ್ಯವೇದ ಕಲಿಯುವ ಉತ್ಸಾಹ.",
    description: "An accessible home-study theological diploma offering foundational biblical knowledge and pastoral practicals in both English and Kannada for believers engaged in local churches.",
    descriptionKn: "ಸ್ಥಳೀಯ ಸಭೆಗಳಲ್ಲಿ ಸೇವೆ ಮಾಡುವ ವಿಶ್ವಾಸಿಗಳಿಗಾಗಿ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಸುಲಭ ಮನೆ ಅಧ್ಯಯನ ಡಿಪ್ಲೊಮಾ. ಮೂಲ ಬೈಬಲ್ ಜ್ಞಾನ ಮತ್ತು ಸುವಾರ್ತಾ ವಿಧಾನಗಳನ್ನು ಕಲಿಸುತ್ತದೆ.",
    contactClasses: "Dispatched study booklets, monthly questionnaire assessments, telephone/WhatsApp tutorial support, and regional contact classes.",
    contactClassesKn: "ಅಂಚೆ ಮೂಲಕ ಪಠ್ಯಗಳ ರವಾನೆ, ಮಾಸಿಕ ಪ್ರಶ್ನೋತ್ತರ ಪರೀಕ್ಷೆಗಳು, ಫೋನ್/ವಾಟ್ಸಾಪ್ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಸ್ಥಳೀಯ ಸಂಪರ್ಕ ತರಗತಿಗಳು.",
    targetAudience: "Grassroots pastors, evangelists, village church planters, Sunday school teachers, and cell group leaders.",
    targetAudienceKn: "ಹಳ್ಳಿಗಳ ಸಭಾಪಾಲಕರು, ಸುವಾರ್ತಿಕರು, ಸಂಡೇ ಸ್ಕೂಲ್ ಶಿಕ್ಷಕರು ಮತ್ತು ಸೆಲ್ ಗ್ರೂಪ್ ನಾಯಕರು.",
    curriculumTopics: [
      "Paper 1: Old Testament Biblical Foundations & Key Events",
      "Paper 2: New Testament Foundations & Life of Christ",
      "Paper 3: Fundamental Christian Doctrines & Bible Truths",
      "Paper 4: Survey of Church History & Great Awakenings",
      "Paper 5: Practical Evangelism & Discipleship Methods",
      "Paper 6: Biblical Principles of Family and Marriage",
      "Paper 7: Local Church Ministry & Sunday School Teaching",
      "Paper 8: Supervised Local Church Practical Ministry Report"
    ],
    curriculumTopicsKn: [
      "ಪತ್ರಿಕೆ 1: ಹಳೆಯ ಒಡಂಬಡಿಕೆಯ ಮೂಲಭೂತ ಸತ್ಯಗಳು",
      "ಪತ್ರಿಕೆ 2: ಹೊಸ ಒಡಂಬಡಿಕೆ ಮತ್ತು ಯೇಸು ಕ್ರಿಸ್ತನ ಜೀವಿತ",
      "ಪತ್ರಿಕೆ 3: ಮೂಲಭೂತ ಕ್ರೈಸ್ತ ಸಿದ್ಧಾಂತಗಳು ಮತ್ತು ನಂಬಿಕೆಗಳು",
      "ಪತ್ರಿಕೆ 4: ಸಭಾ ಇತಿಹಾಸ ಮತ್ತು ಮಹಾನ್ ಎಚ್ಚರಗಳು",
      "ಪತ್ರಿಕೆ 5: ಪ್ರಾಯೋಗಿಕ ಸುವಾರ್ತೆ ಸಾರುವುದು ಮತ್ತು ಶಿಷ್ಯತ್ವ",
      "ಪತ್ರಿಕೆ 6: ಕ್ರೈಸ್ತ ಕುಟುಂಬ ಮತ್ತು ವೈವಾಹಿಕ ತತ್ವಗಳು",
      "ಪತ್ರಿಕೆ 7: ಸಭಾ ಸೇವೆ ಮತ್ತು ಸಂಡೇ ಸ್ಕೂಲ್ ಬೋಧನೆ",
      "ಪತ್ರಿಕೆ 8: ಸ್ಥಳೀಯ ಸಭೆಯಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ಸೇವಾ ವರದಿ"
    ],
    featured: false,
    ataAccredited: true
  },
  {
    id: "c-min-distance",
    code: "C.Min (Distance)",
    title: "Certificate in Christian Ministry — Distance",
    titleKn: "ಕ್ರಿಶ್ಚಿಯನ್ ಮಿನಿಸ್ಟ್ರಿ ಸರ್ಟಿಫಿಕೇಟ್ (C.Min - ದೂರಶಿಕ್ಷಣ)",
    programCategory: "Distance",
    programCategoryKn: "ದೂರಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ (Distance Education)",
    degreeLevel: "Certificate",
    duration: "6 Months – 1 Year (Flexible / Short-Term)",
    durationKn: "6 ತಿಂಗಳಿಂದ 1 ವರ್ಷ (ಹೊಂದಿಕೊಳ್ಳುವ ಅಲ್ಪಾವಧಿ ಕೋರ್ಸ್)",
    mode: "Distance Education / Continuing Education Certificate",
    modeKn: "ದೂರಶಿಕ್ಷಣ / ನಿರಂತರ ಶಿಕ್ಷಣ ಪ್ರಮಾಣಪತ್ರ",
    language: "Available in English & Kannada Tracks",
    languageKn: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಮಾಧ್ಯಮದಲ್ಲಿ ಲಭ್ಯ",
    eligibility: "Open to all Christian believers, church members, and youth eager to study God's Word systematically; No formal theological prerequisites.",
    eligibilityKn: "ಸತ್ಯವೇದವನ್ನು ಕ್ರಮಬದ್ಧವಾಗಿ ಕಲಿಯಬಯಸುವ ಎಲ್ಲಾ ಕ್ರೈಸ್ತ ವಿಶ್ವಾಸಿಗಳು ಮತ್ತು ಯುವಜನರಿಗೆ ಮುಕ್ತ ಪ್ರವೇಶ.",
    description: "A practical, non-residential foundational certificate designed to enrich every believer's Bible knowledge, devotional discipline, and everyday Christian witness in church and society.",
    descriptionKn: "ಪ್ರತಿಯೊಬ್ಬ ಕ್ರೈಸ್ತ ವಿಶ್ವಾಸಿಯ ಸತ್ಯವೇದ ಜ್ಞಾನ, ಪ್ರಾರ್ಥನಾ ಶಿಸ್ತು ಮತ್ತು ದೈನಂದಿನ ಸಾಕ್ಷ್ಯವನ್ನು ಬಲಪಡಿಸಲು ರೂಪಿಸಲಾದ ಪ್ರಾಯೋಗಿಕ ಅಲ್ಪಾವಧಿ ದೂರಶಿಕ್ಷಣ ಕೋರ್ಸ್.",
    contactClasses: "Self-guided workbook modules, continuous assignment reviews, and certificate awarded upon satisfactory completion.",
    contactClassesKn: "ಸ್ವಯಂ ಅಧ್ಯಯನ ವರ್ಕ್‌ಬುಕ್‌ಗಳು, ನಿರಂತರ ಅಸೈನ್‌ಮೆಂಟ್ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಕೋರ್ಸ್ ಮುಗಿದ ನಂತರ ಪ್ರಮಾಣಪತ್ರ.",
    targetAudience: "Active church members, youth group leaders, worship leaders, and prospective theological candidates testing their ministry calling.",
    targetAudienceKn: "ಸಭಾ ಸದಸ್ಯರು, ಯುವ ಮುಖಂಡರು, ಆರಾಧಕರು ಮತ್ತು ಸೇವೆಯ ಕರೆಯನ್ನು ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳುತ್ತಿರುವವರು.",
    curriculumTopics: [
      "Lesson 1: How to Study, Understand and Apply the Holy Bible",
      "Lesson 2: The Gospel Message, Conversion & Biblical Salvation",
      "Lesson 3: The Person, Work & Fruit of the Holy Spirit",
      "Lesson 4: Personal Evangelism & Everyday Workplace Witnessing",
      "Lesson 5: Prayer Life, Spiritual Warfare & Christian Integrity",
      "Lesson 6: Biblical Stewardship, Family Life & Servant Leadership"
    ],
    curriculumTopicsKn: [
      "ಪಾಠ 1: ಸತ್ಯವೇದವನ್ನು ಅಧ್ಯಯನ ಮಾಡಿ ಅನ್ವಯಿಸುವುದು ಹೇಗೆ",
      "ಪಾಠ 2: ಸುವಾರ್ತೆ, ಮನಸ್ಸಾಕ್ಷಿ ಬದಲಾವಣೆ ಮತ್ತು ರಕ್ಷಣೆ",
      "ಪಾಠ 3: ಪವಿತ್ರಾತ್ಮನ ವ್ಯಕ್ತಿತ್ವ, ಕಾರ್ಯಗಳು ಮತ್ತು ಫಲಗಳು",
      "ಪಾಠ 4: ವೈಯಕ್ತಿಕ ಸುವಾರ್ತೆ ಮತ್ತು ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಸಾಕ್ಷಿ",
      "ಪಾಠ 5: ಪ್ರಾರ್ಥನಾ ಜೀವನ, ಆತ್ಮೀಕ ಯುದ್ಧ ಮತ್ತು ಪ್ರಾಮಾಣಿಕತೆ",
      "ಪಾಠ 6: ಸದ್ವಿಚಾರ ನಿರ್ವಹಣೆ, ಕುಟುಂಬ ಜೀವನ ಮತ್ತು ಸೇವಾ ಮನೋಭಾವ"
    ],
    featured: false,
    ataAccredited: true
  }
];

export const STATEMENT_OF_FAITH: StatementOfFaithArticle[] = [
  {
    id: "scriptures",
    title: "The Holy Scriptures",
    titleKn: "ಪವಿತ್ರ ಸತ್ಯವೇದವು ದೇವರ ವಾಕ್ಯ",
    scriptureReferences: ["2 Timothy 3:16-17", "2 Peter 1:20-21", "Psalm 119:105"],
    summary: "The 66 books of the Old and New Testaments are the verbally inspired, inerrant, and infallible Word of God.",
    summaryKn: "ಹಳೆಯ ಮತ್ತು ಹೊಸ ಒಡಂಬಡಿಕೆಯ 66 ಪುಸ್ತಕಗಳು ದೇವರ ಪವಿತ್ರಾತ್ಮನ ಪ್ರೇರಣೆಯಿಂದ ಬರೆಯಲ್ಪಟ್ಟ ದೋಷರಹಿತವಾದ ಸತ್ಯ ವಾಕ್ಯವಾಗಿದೆ.",
    fullDescription: "We believe that the Holy Bible is the inspired Word of God, written by human authors under the supernatural guidance of the Holy Spirit. It is the supreme and final standard of faith, doctrine, and Christian conduct for all believers and the church.",
    fullDescriptionKn: "ಪವಿತ್ರ ಸತ್ಯವೇದವು ದೇವರ ಜೀವಂತ ವಾಕ್ಯವಾಗಿದೆ. ಇದು ನಮ್ಮ ವಿಶ್ವಾಸ, ನಂಬಿಕೆ ಮತ್ತು ಕ್ರೈಸ್ತ ಜೀವನದ ಅಂತಿಮ ಅಧಿಕಾರವಾಗಿದೆ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ."
  },
  {
    id: "godhead",
    title: "The Triune God",
    titleKn: "ತ್ರಿತ್ವ ದೇವರು (ಪಿತ, ಪುತ್ರ ಮತ್ತು ಪವಿತ್ರಾತ್ಮ)",
    scriptureReferences: ["Genesis 1:1, 26", "Matthew 28:19", "2 Corinthians 13:14"],
    summary: "There is one living and true God, eternally existing in three distinct persons: the Father, the Son, and the Holy Spirit.",
    summaryKn: "ಒಬ್ಬನೇ ಜೀವಸ್ವರೂಪನಾದ ಸತ್ಯ ದೇವರು ಪಿತ, ಪುತ್ರ ಮತ್ತು ಪವಿತ್ರಾತ್ಮ ಎಂಬ ಮೂರು ವ್ಯಕ್ತಿತ್ವಗಳಲ್ಲಿ ನಿತ್ಯವೂ ಏಕತ್ವದಲ್ಲಿ ಇರುತ್ತಾರೆ.",
    fullDescription: "We believe in one God, Creator and Sustainer of all things, infinitely perfect and eternally co-existing in three persons: Father, Son, and Holy Spirit, each possessing all the divine attributes and equal in power and glory.",
    fullDescriptionKn: "ಸಮಸ್ತ ಸೃಷ್ಟಿಕರ್ತನೂ ಸಂರಕ್ಷಕನೂ ಆದ ದೇವರು ಪರಿಪೂರ್ಣನೂ, ಪಿತ, ಪುತ್ರ, ಪವಿತ್ರಾತ್ಮ ಎಂಬ ಮೂರು ವ್ಯಕ್ತಿಗಳಲ್ಲಿ ಸಮಾನ ಮಹಿಮೆ ಮತ್ತು ಅಧಿಕಾರ ಹೊಂದಿರುವ ಒಬ್ಬನೇ ದೇವರಾಗಿದ್ದಾರೆ."
  },
  {
    id: "jesus-christ",
    title: "The Lord Jesus Christ",
    titleKn: "ಕರ್ತನಾದ ಯೇಸು ಕ್ರಿಸ್ತ",
    scriptureReferences: ["John 1:1-14", "1 Corinthians 15:3-4", "Hebrews 4:14-16"],
    summary: "Jesus Christ is fully God and fully man, born of a virgin, lived a sinless life, died for our sins, rose bodily, and will return in glory.",
    summaryKn: "ಯೇಸು ಕ್ರಿಸ್ತನು ಪೂರ್ಣ ದೇವರೂ ಪೂರ್ಣ ಮಾನವರೂ ಆಗಿದ್ದು, ಕನ್ಯೆಯ ಗರ್ಭದಲ್ಲಿ ಜನಿಸಿ, ಪಾಪವಿಲ್ಲದೆ ಜೀವಿಸಿ, ಶಿಲುಬೆಯ ಮೇಲೆ ಮೃತನಾಗಿ, ಮೂರನೇ ದಿನ ಪುನರುತ್ಥಾನ ಹೊಂದಿದ ರಕ್ಷಕನು.",
    fullDescription: "We believe that Jesus Christ was conceived by the Holy Spirit and born of the Virgin Mary. He offered Himself as a substitutionary sacrifice on the cross for the sins of mankind. He arose bodily from the dead, ascended to Heaven, and sits at the right hand of the Father as our High Priest and Advocate.",
    fullDescriptionKn: "ಯೇಸು ಕ್ರಿಸ್ತನು ಮಾನವಕುಲದ ಪಾಪಗಳಿಗಾಗಿ ಶಿಲುಬೆಯಲ್ಲಿ ಪ್ರಾಯಶ್ಚಿತ್ತ ಯಜ್ಞವಾದನು. ಮರಣವನ್ನು ಜಯಿಸಿ ಎದ್ದು, ಪರಲೋಕಕ್ಕೆ ಏರಿ ತಂದೆಯ ಬಲಗಡೆಯಲ್ಲಿ ನಮ್ಮ ಪ್ರಧಾನ ಯಾಜಕನಾಗಿದ್ದಾನೆ."
  },
  {
    id: "holy-spirit",
    title: "The Holy Spirit",
    titleKn: "ಪವಿತ್ರಾತ್ಮ ದೇವರು",
    scriptureReferences: ["John 14:16-17, 26", "Acts 1:8", "Galatians 5:22-23"],
    summary: "The Holy Spirit convicts, regenerates, indwells, seals, and empowers believers for holy living and effective ministry.",
    summaryKn: "ಪವಿತ್ರಾತ್ಮನು ಪಾಪಿಗಳನ್ನು ಎಚ್ಚರಿಸಿ, ನಂಬಿದವರಲ್ಲಿ ವಾಸಮಾಡಿ, ಪವಿತ್ರ ಜೀವನಕ್ಕೆ ಮತ್ತು ಸುವಾರ್ತಾ ಸೇವೆಗೆ ಶಕ್ತಿ ನೀಡುತ್ತಾನೆ.",
    fullDescription: "We believe the Holy Spirit illuminates the minds of sinners, awakens them to repentance, regenerates them upon faith, indwells every believer from the moment of salvation, and imparts spiritual gifts for the building up of the body of Christ.",
    fullDescriptionKn: "ಪವಿತ್ರಾತ್ಮನು ಕ್ರಿಸ್ತನ ದೇಹವಾದ ಸಭೆಯನ್ನು ಕಟ್ಟಲು ವಿಶ್ವಾಸಿಗಳಿಗೆ ಆತ್ಮೀಕ ವರಗಳನ್ನು ಮತ್ತು ಬಲವನ್ನು ನೀಡುತ್ತಾನೆ."
  },
  {
    id: "salvation",
    title: "Salvation by Grace through Faith",
    titleKn: "ಕೃಪೆಯಿಂದ ನಂಬಿಕೆಯ ಮೂಲಕ ಉಚಿತ ರಕ್ಷಣೆ",
    scriptureReferences: ["Ephesians 2:8-10", "Romans 3:23-26", "Titus 3:5"],
    summary: "Salvation is a free gift of God's grace, received solely through repentance and faith in Jesus Christ, not by human works.",
    summaryKn: "ರಕ್ಷಣೆಯು ಮಾನವನ ಪುಣ್ಯ ಕಾರ್ಯಗಳಿಂದಲ್ಲ, ಕೇವಲ ದೇವರ ಉಚಿತ ಕೃಪೆಯಿಂದ ಮತ್ತು ಯೇಸು ಕ್ರಿಸ್ತನಲ್ಲಿನ ನಂಬಿಕೆಯ ಮೂಲಕ ಮಾತ್ರ ದೊರೆಯುತ್ತದೆ.",
    fullDescription: "We believe that all human beings are born with a sinful nature and are separated from God. Salvation cannot be earned through good deeds, rituals, or lineage, but is received exclusively through personal faith in the shed blood and resurrection of Jesus Christ.",
    fullDescriptionKn: "ಯೇಸು ಕ್ರಿಸ್ತನ ರಕ್ತ ಮತ್ತು ಆತನ ಪುನರುತ್ಥಾನದಲ್ಲಿ ನಂಬಿಕೆಯಿಡುವ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಪಾಪಕ್ಷಮೆಯೂ ನಿತ್ಯಜೀವವೂ ಉಚಿತವಾಗಿ ದೊರೆಯುತ್ತದೆ."
  },
  {
    id: "native-mission",
    title: "The Great Commission & Native Evangelism",
    titleKn: "ಸುವಾರ್ತಾ ಮಹಾ ಆಜ್ಞೆ ಮತ್ತು ಸ್ವದೇಶಿ ಸೇವೆ",
    scriptureReferences: ["Matthew 28:18-20", "Mark 16:15", "Romans 10:14-15"],
    summary: "Every believer is called to participate in the global mission of proclaiming the Gospel and planting indigenous, reproducing churches.",
    summaryKn: "ಲೋಕದ ಮೂಲೆಮೂಲೆಗೂ ಸುವಾರ್ತೆಯನ್ನು ಸಾರಿ, ಸ್ವದೇಶಿ ಕ್ರೈಸ್ತ ಸಭೆಗಳನ್ನು ಸ್ಥಾಪಿಸುವುದು ಪ್ರತಿ ವಿಶ್ವಾಸಿಯ ಪರಮ ಕರ್ತವ್ಯವಾಗಿದೆ.",
    fullDescription: "We believe that the church exists to glorify God and fulfill the Great Commission. Native Evangelical School of Theology is committed to raising up contextual, culturally sensitive native leaders equipped to bring the transformational love of Jesus to every community across Karnataka, India, and the nations.",
    fullDescriptionKn: "ಕರ್ನಾಟಕ, ಭಾರತ ಮತ್ತು ಸಮಸ್ತ ಜನಾಂಗಗಳಲ್ಲಿ ಯೇಸುವಿನ ಪ್ರೀತಿ ಮತ್ತು ಸುವಾರ್ತೆಯನ್ನು ಹರಡಲು ಸ್ಥಳೀಯ ಸಾಂಸ್ಕೃತಿಕ ಅರಿವುಳ್ಳ ಸೇವಕರನ್ನು ರೂಪಿಸಲು NEST ಬದ್ಧವಾಗಿದೆ."
  }
];

export const CAMPUS_PILLARS = [
  {
    title: "Biblical & Academic Rigor",
    subtitle: "Truth Rooted in God's Infallible Word",
    description: "Deep theological scholarship balanced with passionate devotional piety. Our students learn to interpret Scripture faithfully and engage contemporary culture thoughtfully.",
    icon: "BookOpen"
  },
  {
    title: "Vibrant Chapel & Prayer",
    subtitle: "Spiritual Formation at the Heart of NEST",
    description: "Daily corporate chapel services, morning intercession, and dedicated prayer vigils cultivating intimate communion with the Lord and spiritual vitality.",
    icon: "Flame"
  },
  {
    title: "Practical Village & Native Outreach",
    subtitle: "Fieldwork with Immediate Impact",
    description: "Every weekend, our faculty and students engage in practical village ministry, medical camps, open-air preaching, and church planting in rural Mysore & Karnataka districts.",
    icon: "Compass"
  },
  {
    title: "Caring Residential Community",
    subtitle: "One Family in the Lord",
    description: "A close-knit, supportive brotherhood and sisterhood where students from diverse states and linguistic backgrounds live, study, dine, and pray together in harmony.",
    icon: "Users"
  }
];

export const FAQ_ITEMS = [
  {
    question: "Where is Native Evangelical School of Theology located?",
    questionKn: "ನೇಟಿವ್ ಇವಾಂಜೆಲಿಕಲ್ ಸ್ಕೂಲ್ ಆಫ್ ಥಿಯಾಲಜಿ ಎಲ್ಲಿದೆ?",
    answer: "NEST is situated at No. 133, Nagarthalli, Rayanakere Post, Jayapura Hobli, Mysore, Karnataka, India. We are easily accessible from Mysore City via HD Kote / Hunsur Road and public transit.",
    answerKn: "NEST ಸಂಸ್ಥೆಯು ಕರ್ನಾಟಕದ ಮೈಸೂರಿನ ರಾಯನಕೆರೆ ಅಂಚೆಯ ನಾಗರಹಳ್ಳಿಯಲ್ಲಿದೆ (ನಂ. 133, ಜಯಪುರ ಹೋಬಳಿ, ಮೈಸೂರು 570008). ಮೈಸೂರು ನಗರದಿಂದ ಸುಲಭವಾಗಿ ಬಸ್ ಮತ್ತು ವಾಹನ ಸೌಲಭ್ಯವಿದೆ."
  },
  {
    question: "What qualifications are required to apply for the Bachelor of Theology (B.Th)?",
    questionKn: "ಬ್ಯಾಚುಲರ್ ಆಫ್ ಥಿಯಾಲಜಿ (B.Th) ಪ್ರವೇಶಕ್ಕೆ ಬೇಕಾದ ಅರ್ಹತೆಗಳೇನು?",
    answer: "Applicants for the B.Th program must have completed 10+2 / Pre-University Course (PUC) or its recognized equivalent. Candidates must also provide a personal testimony of faith in Jesus Christ, a letter of recommendation from their local church pastor, and be committed to ministry.",
    answerKn: "ಅರ್ಜಿದಾರರು 10+2 ಅಥವಾ ಪಿಯುಸಿ ತೇರ್ಗಡೆಯಾಗಿರಬೇಕು. ಜೊತೆಗೆ ಕ್ರಿಸ್ತನಲ್ಲಿನ ಸಾಕ್ಷ್ಯ, ಸ್ಥಳೀಯ ಸಭಾಪಾಲಕರ ಶಿಫಾರಸು ಪತ್ರ ಮತ್ತು ಸೇವೆ ಮಾಡುವ ಬದ್ಧತೆ ಹೊಂದಿರಬೇಕು."
  },
  {
    question: "What are the official languages and medium of instruction?",
    questionKn: "ಸಂಸ್ಥೆಯ ಅಧಿಕೃತ ಬೋಧನಾ ಮಾಧ್ಯಮ ಮತ್ತು ಭಾಷೆಗಳು ಯಾವುವು?",
    answer: "Our official medium of instruction for degree programs (B.Th & M.Div) is English. The Diploma in Theology (Dip.Th) is taught in combined Kannada and English to support regional pastors and church workers.",
    answerKn: "B.Th ಮತ್ತು M.Div ಪದವಿಗಳಿಗೆ ಅಧಿಕೃತ ಬೋಧನಾ ಮಾಧ್ಯಮ ಕೇವಲ ಇಂಗ್ಲಿಷ್ ಆಗಿದೆ. ಗ್ರಾಮೀಣ ಸೇವಕರ ಅನುಕೂಲಕ್ಕಾಗಿ Diploma in Theology (Dip.Th) ಕೋರ್ಸ್ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಸಂಯೋಜಿತ ಮಾಧ್ಯಮದಲ್ಲಿದೆ."
  },
  {
    question: "Is residential hostel accommodation available on campus?",
    questionKn: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ವಸತಿ ನಿಲಯ ಹಾಗೂ ಊಟದ ಸೌಲಭ್ಯವಿದೆಯೇ?",
    answer: "Yes, NEST is a residential institution providing separate hostel accommodation and dining facilities for enrolled students. For admissions and fee inquiries, please contact the Principal's office directly.",
    answerKn: "ಹೌದು, NEST ವಸತಿಯುತ ಸಂಸ್ಥೆಯಾಗಿದ್ದು, ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರತ್ಯೇಕ ವಸತಿ ನಿಲಯ ಹಾಗೂ ಭೋಜನಾಲಯ ಸೌಲಭ್ಯವಿದೆ. ಪ್ರವೇಶ ಮತ್ತು ಶುಲ್ಕದ ವಿವರಗಳಿಗೆ ಪ್ರಾಂಶುಪಾಲರ ಕಚೇರಿಯನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ."
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "santhosh-chacko",
    name: "Rev. Santhosh K. Chacko",
    nameKn: "ರೆವ. ಸಂತೋಷ್ ಕೆ. ಚಾಕೊ",
    title: "Principal",
    titleKn: "ಪ್ರಿನ್ಸಿಪಾಲ್",
    role: "Principal",
    roleKn: "ಪ್ರಾಂಶುಪಾಲರು",
    qualification: "M.Th, B.D, B.Th",
    qualificationKn: "ಎಂ.ಟಿ.ಎಚ್, ಬಿ.ಡಿ, ಬಿ.ಟಿ.ಎಚ್",
    department: "Executive Leadership",
    departmentKn: "ಆಡಳಿತ & ನಾಯಕತ್ವ",
    photo: getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal')
  },
  {
    id: "teaching-faculty",
    name: "Resident Teaching Faculty",
    nameKn: "ಸ್ಥಳೀಯ ಬೋಧಕ ವೃಂದ",
    title: "Faculty Members",
    titleKn: "ಅಧ್ಯಾಪಕ ವರ್ಗ",
    role: "Theological Faculty Cohort",
    roleKn: "ದೇವತಾಶಾಸ್ತ್ರ ಬೋಧಕ ಸಮೂಹ",
    qualification: "ATA Accredited Theological Qualifications",
    qualificationKn: "ATA ಮಾನ್ಯತೆ ಪಡೆದ ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆಗಳು",
    department: "Academic Faculty",
    departmentKn: "ಶೈಕ್ಷಣಿಕ ಅಧ್ಯಾಪಕ ವೃಂದ",
    photo: getAssetUrl('assets/aistudio/techers_e3355ac8.webp', 'faculty')
  }
];

