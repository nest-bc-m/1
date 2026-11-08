import React, { useState } from 'react';
import { 
  BookOpen, 
  Flame, 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  Church,
  Users,
  Award,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CampusLifeSection: React.FC = () => {
  const { currentLanguage, t } = useLanguage();
  const [activePillar, setActivePillar] = useState<number>(0);

  // The 5 Requested Campus Life Pillars with 6-language support
  const pillars = [
    {
      id: 'chapel',
      title: {
        en: 'Chapel Prayer & Devotion',
        kn: 'ಚಾಪೆಲ್ ಪ್ರಾರ್ಥನೆ & ಆರಾಧನೆ',
        hi: 'चैपल प्रार्थना एवं आराधना',
        ta: 'சாப்பல் ஜெபம் மற்றும் ஆராதனை',
        te: 'చాపెల్ ప్రార్థన మరియు ఆరాధన',
        ml: 'ചാപ്പൽ പ്രാർത്ഥനയും ആരാധനയും',
      },
      subtitle: {
        en: 'Heartfelt Worship, Fasting & Preaching',
        kn: 'ದೈನಂದಿನ ಆರಾಧನೆ, ಉಪವಾಸ & ವಾಕ್ಯ ಬೋಧನೆ',
        hi: 'दैनिक आराधना, उपवास एवं वचन प्रचार',
        ta: 'தினசரி ஆராதனை, உபவாசம் & வேத போதனை',
        te: 'నిత్య ఆరాధన, ఉపవాసం & వాక్య బోధన',
        ml: 'ദൈനംദിന ആരാധന, ഉപവാസം, വചന പ്രസംഗം',
      },
      desc: {
        en: 'Every morning and evening, the entire seminary community gathers in the campus chapel for vibrant choral praise, fervent intercession for the nations, and expositional preaching of the Word of God.',
        kn: 'ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ಮತ್ತು ಸಂಜೆ, ಸಮಗ್ರ ಸೆಮಿನರಿ ಸಮುದಾಯವು ಚಾಪೆಲ್‌ನಲ್ಲಿ ಒಟ್ಟುಗೂಡಿ ರಾಷ್ಟ್ರಗಳಿಗಾಗಿ ಉಪವಾಸ ಪ್ರಾರ್ಥನೆ, ಆರಾಧನೆ ಮತ್ತು ಸತ್ಯವೇದ ಪ್ರಸಂಗವನ್ನು ಆಲಿಸುತ್ತದೆ.',
        hi: 'प्रतिदिन सुबह और शाम, सम्पूर्ण सेमिनरी समुदाय कैंपस चैपल में मिलकर भावपूर्ण स्तुति-प्रशंसा, राष्ट्रों के लिए मध्यस्थता प्रार्थना और परमेश्वर के वचन की गंभीर शिक्षा प्राप्त करता है।',
        ta: 'ஒவ்வொரு நாளும் காலையிலும் மாலையிலும், முழு செமினரி குடும்பமும் சாப்பலில் ஒன்று கூடி நாடுகளுக்காக உபவாச ஜெபம், ஆராதனை மற்றும் வேத போதனையைக் கேட்கிறது.',
        te: 'ప్రతి ఉదయం మరియు సాయంత్రం, సెమినరీ సమాజం అంతా చాపెల్‌లో సమావేశమై దేశాల కొరకు ప్రార్థన, ఆరాధన మరియు వాక్య సందేశాన్ని వింటుంది.',
        ml: 'എല്ലാ ദിവസവും രാവിലെയും വൈകുന്നേരവും മുഴുവൻ സെമിനാരി കുടുംബവും ചാപ്പലിൽ ഒത്തുചേർന്ന് പ്രാർത്ഥനയിലും തിരുവചന പ്രസംഗത്തിലും പങ്കെടുക്കുന്നു.',
      },
      image: '/assets/aistudio/chapel_d7e08b0f.webp',
      alt: 'Seminary Chapel Worship Service at NEST',
      highlights: ['Daily Corporate Prayer', 'Intercession for India', 'Evening Expository Sermons'],
    },
    {
      id: 'classroom',
      title: {
        en: 'Classroom Learning & Exegesis',
        kn: 'ತರಗತಿ ಬೋಧನೆ & ಭಾಷಾ ಅಧ್ಯಯನ',
        hi: 'कक्षा शिक्षण और भाषा अध्ययन',
        ta: 'வகுப்பறை கல்வி & மொழி ஆய்வு',
        te: 'తరగతి గది బోధన & భాషా అధ్యయనం',
        ml: 'ക്ലാസ് റൂം പഠനവും ഭാഷാ ഗവേഷണവും',
      },
      subtitle: {
        en: 'Rigorous Academics & Biblical Languages',
        kn: 'ಆಳವಾದ ದೇವತಾಶಾಸ್ತ್ರ ಮತ್ತು ಗ್ರೀಕ್-ಹೀಬ್ರೂ ಬೋಧನೆ',
        hi: 'गहन थियोलॉजिकल और ग्रीक-इब्रानी भाषा अध्ययन',
        ta: 'ஆழமான இறையியல் மற்றும் கிரேக்க-எபிரேய போதனை',
        te: 'లోతైన దైవశాస్త్రం మరియు గ్రీక్-హీబ్రూ బోధన',
        ml: 'ആഴമേറിയ ദൈവശാസ്ത്രവും ഗ്രീക്ക്-ഹീബ്രു ഭാഷാ പഠനവും',
      },
      desc: {
        en: 'Classroom lectures engage students in rigorous biblical exegesis, Systematic Theology, Church History, and original biblical languages (Hebrew and Greek) under qualified resident faculty.',
        kn: 'ಉನ್ನತ ದೇವತಾಶಾಸ್ತ್ರ ವಿದ್ವಾಂಸರಿಂದ ಸತ್ಯವೇದ ಗ್ರೀಕ್, ಹೀಬ್ರೂ, ಸಿಸ್ಟಮ್ಯಾಟಿಕ್ ಥಿಯಾಲಜಿ ಮತ್ತು ಸಭಾ ಇತಿಹಾಸದ ಆಳವಾದ ಬೋಧನೆ ತರಗತಿ ಕೊಠಡಿಗಳಲ್ಲಿ ನಡೆಯುತ್ತದೆ.',
        hi: 'कक्षाओं में सुयोग्य प्राध्यापकों द्वारा पवित्र शास्त्र की मूल भाषाओं (ग्रीक व इब्रानी), व्यवस्थित धर्मशास्त्र (Systematic Theology) और कलीसिया के इतिहास का गहन अध्ययन कराया जाता है।',
        ta: 'தகுதிவாய்ந்த ஆசிரியர்களால் மூல கிரேக்க, எபிரேய மொழிகள், முறையான இறையியல் (Systematic Theology) மற்றும் திருச்சபை வரலாறு வகுப்பறைகளில் கற்பிக்கப்படுகிறது.',
        te: 'అర్హత కలిగిన అధ్యాపకుల ఆధ్వర్యంలో పరిశుద్ధ లేఖన గ్రీక్, హీబ్రూ, సిస్టమాటిక్ థియాలజీ మరియు సంఘ చరిత్ర తరగతి గదులలో లోతుగా బోధించబడతాయి.',
        ml: 'യോഗ്യരായ അധ്യാപകരുടെ കീഴിൽ ഗ്രീക്ക്, ഹീബ്രു, സിസ്റ്റമാറ്റിക് തിയോളജി, സഭാ ചരിത്രം എന്നിവ ക്ലാസ് മുറികളിൽ ആഴത്തിൽ പഠിപ്പിക്കുന്നു.',
      },
      image: '/assets/aistudio/classroom_3ee27e65.webp',
      alt: 'Classroom Lecture at NEST Mysore',
      highlights: ['Greek & Hebrew Exegesis', 'Systematic Theology', 'Historical Orthodoxy'],
    },
    {
      id: 'fellowship',
      title: {
        en: 'Student Fellowship & Dining',
        kn: 'ವಿದ್ಯಾರ್ಥಿ ಭೋಜನ & ಸಹವಾಸ',
        hi: 'छात्र संगति और भोजन व्यवस्था',
        ta: 'மாணவர் ஐக்கியம் மற்றும் உணவுக்கூடம்',
        te: 'విద్యార్థి సహవాసం మరియు భోజన శాల',
        ml: 'വിദ്യാർത്ഥി കൂട്ടായ്മയും ഡൈനിംഗ് ഹാളും',
      },
      subtitle: {
        en: 'Community Life & Nutritious Fellowship',
        kn: 'ಭೋಜನಾಲಯ ಮತ್ತು ಸಹೋದರತ್ವದ ಒಡನಾಟ',
        hi: 'कैंपस भोजन और भ्रातृ प्रेम',
        ta: 'உணவகம் மற்றும் சகோதரத்துவ ஐக்கியம்',
        te: 'డైనింగ్ హాల్ మరియు సహోదరత్వం',
        ml: 'രുചികരമായ ഭക്ഷണവും സഹോദര കൂട്ടായ്മയും',
      },
      desc: {
        en: 'A welcoming residential community where students from diverse regional backgrounds share nutritious meals, spiritual testimonies, and lifelong fraternal bonds in the campus dining refectory.',
        kn: 'ವಿವಿಧ ರಾಜ್ಯಗಳಿಂದ ಬಂದ ವಿದ್ಯಾರ್ಥಿಗಳು ಒಟ್ಟಾಗಿ ಪೌಷ್ಟಿಕ ಆಹಾರ ಸೇವಿಸುತ್ತಾ, ವೈಯಕ್ತಿಕ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಸಹೋದರತ್ವದ ವಾತಾವರಣ.',
        hi: 'विभिन्न राज्यों और पृष्ठभूमियों से आए विद्यार्थी विशाल भोजनालय में पौष्टिक भोजन ग्रहण करते हुए जीवन भर की आत्मिक संगति और साक्ष्य साझा करते हैं।',
        ta: 'பல்வேறு மாநிலங்களைச் சேர்ந்த மாணவர்கள் விசாலமான உணவகத்தில் சத்தான உணவைப் பகிர்ந்துகொண்டு, சகோதரத்துவ அன்பையும் சாட்சிகளையும் பகிர்ந்துகொள்கின்றனர்.',
        te: 'వివిధ రాష్ట్రాల నుండి వచ్చిన విద్యార్థులు విశాలమైన భోజనశాలలో పౌష్టికాహారం తింటూ ఆత్మీయ సాక్ష్యాలు మరియు సహవాసాన్ని పంచుకుంటారు.',
        ml: 'വിവിധ സംസ്ഥാനങ്ങളിൽ നിന്നുള്ള വിദ്യാർത്ഥികൾ ഡൈനിംഗ് ഹാളിൽ ഒരുമിച്ചു ഭക്ഷണം കഴിക്കുകയും സഹോദര കൂട്ടായ്മ പങ്കിടുകയും ചെയ്യുന്നു.',
      },
      image: '/assets/aistudio/dinig_hall_3a8b4555.webp',
      alt: 'Seminary Dining Hall Community Fellowship',
      highlights: ['Spacious Dining Hall', 'Hostel Living in Mysore', 'Multilingual Brotherhood'],
    },
    {
      id: 'training',
      title: {
        en: 'Ministry Training & Leadership',
        kn: 'ಸೇವಾ ತರಬೇತಿ & ನಾಯಕತ್ವ',
        hi: 'सेवकाई प्रशिक्षण और नेतृत्व',
        ta: 'ஊழியப் பயிற்சி மற்றும் தலைமைத்துவம்',
        te: 'పరిచర్య శిక్షణ మరియు నాయకత్వం',
        ml: 'ശുശ്രൂഷാ പരിശീലനവും നേതൃത്വവും',
      },
      subtitle: {
        en: 'Homiletics, Mentorship & Pastoral Care',
        kn: 'ಪ್ರಸಂಗ ಕಲೆ, ಸಭಾಪಾಲನಾ ತರಬೇತಿ & ಪದವಿ ಪ್ರದಾನ',
        hi: 'उपदेश कला, देहाती मार्गदर्शन एवं दीक्षांत',
        ta: 'பிரசங்க கலை மற்றும் போதகர் பயிற்சி',
        te: 'ప్రసంగ కళ మరియు పాస్టరల్ కేర్',
        ml: 'പ്രസംഗ കലയും പാസ്റ്ററൽ പരിചരണവും',
      },
      desc: {
        en: 'Under the personal mentorship of Rev. Santhosh K. Chacko and senior faculty, students learn sermon delivery, biblical counseling, church administration, and pastoral resilience.',
        kn: 'ಪ್ರಿನ್ಸಿಪಾಲ್ ರೆವ. ಸಂತೋಷ್ ಕೆ. ಚಾಕೊ ಹಾಗೂ ಬೋಧಕರಿಂದ ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನ, ಪ್ರಸಂಗ ಕಲೆಯ ಅಭ್ಯಾಸ ಮತ್ತು ಸಭಾ ನಾಯಕತ್ವದ ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ.',
        hi: 'प्रधानाचार्य रेव. संतोष के. चाको और वरिष्ठ संकाय के व्यक्तिगत मार्गदर्शन में छात्र उपदेश देने, मसीही परामर्श और कलीसिया प्रशासन का व्यावहारिक प्रशिक्षण प्राप्त करते हैं।',
        ta: 'முதல்வர் ரெவ். சந்தோஷ் கே. சாக்கோ அவர்களின் வழிகாட்டுதலில் மாணவர்கள் பிரசங்கம் செய்தல், வேத ஆலோசனை மற்றும் சபை நிர்வாகப் பயிற்சி பெறுகின்றனர்.',
        te: 'ప్రిన్సిపాల్ రెవ. సంతోష్ కె. చాకో గారి ఆధ్వర్యంలో ప్రసంగాల తయారీ, కౌన్సెలింగ్ మరియు సంఘ పరిపాలనలో శిక్షణ పొందుతారు.',
        ml: 'പ്രിൻസിപ്പൽ റവ. സന്തോഷ് കെ. ചാക്കോയുടെ മാർഗനിർദേശത്തിൽ പ്രസംഗ കല, ബൈബിൾ കൗൺസിലിംഗ്, സഭാ ഭരണം എന്നിവ പരിശീലിക്കുന്നു.',
      },
      image: '/assets/aistudio/5_81316861.webp',
      alt: '7th Graduation Convocation of NEST',
      highlights: ['Homiletics Workshops', 'Pastoral Counseling Lab', 'ATA India Degree Convocation'],
    },
    {
      id: 'outreach',
      title: {
        en: 'Outreach & Campus Recreation',
        kn: 'ಕ್ಷೇತ್ರ ಸೇವೆ & ಕ್ರೀಡಾ ಚಟುವಟಿಕೆಗಳು',
        hi: 'क्षेत्रीय सेवकाई और खेलकूद',
        ta: 'கிராமப்புற பணி & விளையாட்டு',
        te: 'గ్రామీణ పరిచర్య & ఆటలు',
        ml: 'ഗ്രാമീണ ശുശ്രൂഷയും കായിക വിനോദങ്ങളും',
      },
      subtitle: {
        en: 'Weekend Village Evangelism & Healthy Body',
        kn: 'ವಾರಾಂತ್ಯದ ಹಳ್ಳಿ ಸುವಾರ್ತೆ & ಕ್ರೀಡೆಗಳು',
        hi: 'सप्ताहांत ग्रामीण सुसमाचार प्रचार व व्यायाम',
        ta: 'வாராந்திர கிராம நற்செய்தி பணி & நல்வாழ்வு',
        te: 'వారాంతపు గ్రామ సువార్త & వ్యాయామం',
        ml: 'വാരാന്ത്യ സുവിശേഷീകരണവും കായിക ആരോഗ്യവും',
      },
      desc: {
        en: 'Balancing spiritual zeal with physical well-being. Students engage in weekly weekend village gospel outreach while enjoying campus sports grounds, volleyball, and physical conditioning.',
        kn: 'ವಾರಾಂತ್ಯಗಳಲ್ಲಿ ಮೈಸೂರಿನ ಗ್ರಾಮೀಣ ಭಾಗಗಳಲ್ಲಿ ಮನೆ-ಮನೆ ಸುವಾರ್ತೆ ಸಾರುವುದರೊಂದಿಗೆ ಕ್ಯಾಂಪಸ್ ಕ್ರೀಡಾಂಗಣದಲ್ಲಿ ವಾಲಿಬಾಲ್ ಹಾಗೂ ಕ್ರೀಡೆಗಳಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳು ತೊಡಗಿಕೊಳ್ಳುತ್ತಾರೆ.',
        hi: 'आत्मिक उत्साह के साथ शारीरिक स्वास्थ्य का संतुलन। छात्र सप्ताहांत में मैसूर के गांवों में सुसमाचार प्रचार करते हैं और कैंपस में वॉलीबॉल व खेलों का आनंद लेते हैं।',
        ta: 'ஆவிக்குரிய வைராக்கியத்துடன் உடல் ஆரோக்கியத்தை பேணுதல். வார இறுதி நாட்களில் கிராமங்களில் சுவிசேஷம் அறிவிப்பதோடு, வளாக விளையாட்டுகளிலும் ஈடுபடுகின்றனர்.',
        te: 'ఆత్మీయ ఉత్సాహంతో పాటు శారీరక ఆరోగ్యం. వారాంతాల్లో గ్రామాల్లో సువార్త పరిచర్య చేస్తూ, క్యాంపస్‌లో వాలీబాల్ మరియు క్రీడల్లో పాల్గొంటారు.',
        ml: 'ആത്മീയ ഉന്മേഷത്തോടൊപ്പം കായിക ആരോഗ്യവും. വാരാന്ത്യങ്ങളിൽ ഗ്രാമങ്ങളിൽ സുവിശേഷം പ്രസംഗിക്കുകയും കാമ്പസ് മൈതാനങ്ങളിൽ കളികളിൽ ഏർപ്പെടുകയും ചെയ്യുന്നു.',
      },
      image: '/assets/aistudio/spots_00f2ae6c.webp',
      alt: 'Students sports and outreach recreation at NEST',
      highlights: ['Weekend Village Outreach', 'Campus Sports Ground', 'Healthy Mind & Body'],
    },
  ];

  return (
    <section id="campus-life" className="py-16 sm:py-24 bg-[#F4F1EA] text-[#2D2D2D] border-b border-[#D1C7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('campusLifeBadge')}</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>Holistic Formation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            {t('campusLifeHeading')}
          </h2>

          <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
            At NEST Mysore, theological education is not confined to textbooks. Daily chapel worship, rigorous lectures, nutritious fellowship, and weekend village outreach nurture heart, mind, and hands for Christ.
          </p>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {pillars.map((pillar, idx) => {
            const isSelected = activePillar === idx;
            const title = pillar.title[currentLanguage] || pillar.title.en;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1A365D] text-[#D4AF37] border-2 border-[#D4AF37] shadow-md'
                    : 'bg-white text-slate-700 hover:bg-[#EAE4D7] border border-[#D1C7B7]'
                }`}
              >
                <span>0{idx + 1}.</span>
                <span>{title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Featured Showcase */}
        {(() => {
          const current = pillars[activePillar];
          const title = current.title[currentLanguage] || current.title.en;
          const subtitle = current.subtitle[currentLanguage] || current.subtitle.en;
          const desc = current.desc[currentLanguage] || current.desc.en;

          return (
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#D1C7B7] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Photo on left (7 cols) */}
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] bg-slate-900 overflow-hidden">
                <img
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-wider block">
                    Authentic Campus Glimpse
                  </span>
                  <p className="font-serif font-bold text-lg sm:text-xl drop-shadow">
                    {title}
                  </p>
                </div>
              </div>

              {/* Text Content on right (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-widest block">
                      Seminary Distinctive 0{activePillar + 1}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
                      {title}
                    </h3>
                    <p className="text-xs font-sans font-semibold text-slate-500">
                      {subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                    {desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#E5DFD3]">
                    <span className="text-xs font-sans font-bold text-[#1A365D] uppercase tracking-wider block">
                      Core Highlights:
                    </span>
                    {current.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between text-xs font-sans font-semibold text-[#1A365D]">
                  <span>Residential Mysore Campus</span>
                  <a href="#gallery" className="text-[#D4AF37] hover:underline flex items-center gap-1">
                    <span>View in Gallery</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};
