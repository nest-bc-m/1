import React from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Compass, 
  HeartHandshake, 
  Award, 
  Target, 
  Eye, 
  Quote
} from 'lucide-react';
import { NestLogo } from './NestLogo';
import { useLanguage } from '../context/LanguageContext';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

export const AboutSection: React.FC = () => {
  const { currentLanguage, t } = useLanguage();

  // Multi-language Core Values
  const coreValues = [
    {
      icon: ShieldCheck,
      title: {
        en: 'Biblical Inerrancy',
        kn: 'ಸತ್ಯವೇದದ ದೋಷರಹಿತತೆ',
        hi: 'पवित्र शास्त्र की अचूकता',
        ta: 'வேதத்தின் தவறாமை',
        te: 'లేఖనాల నిర్దోషత్వం',
        ml: 'തിരുവചനത്തിന്റെ പരമാധികാരം',
      },
      desc: {
        en: 'Steadfast conviction in the full inspiration, inerrancy, and supreme authority of the Holy Scriptures in all matters of faith and practice.',
        kn: 'ದೇವರ ಪರಿಶುದ್ಧ ವಾಕ್ಯದ ಪರಮ ಅಧಿಕಾರ ಮತ್ತು ದೋಷರಹಿತತೆಯಲ್ಲಿ ಅಚಲ ನಂಬಿಕೆ.',
        hi: 'विश्वास और आचरण के सभी विषयों में पवित्र शास्त्र की पूर्ण प्रेरणा, अचूकता और सर्वोच्च अधिकार में दृढ़ विश्वास।',
        ta: 'விசுவாசம் மற்றும் வாழ்க்கையின் அனைத்து காரியங்களிலும் பரிசுத்த வேதத்தின் முழுமையான தேவ ஏவுதல் மற்றும் அதிகாரத்தில் அசைக்க முடியாத நம்பிக்கை.',
        te: 'విశ్వాసం మరియు ప్రవర్తనకు సంబంధించిన అన్ని విషయాలలో పరిశుద్ధ గ్రంథం యొక్క సంపూర్ణ దైవప్రేరణ మరియు సర్వోన్నత అధికారంలో దృఢ నిశ్చయం.',
        ml: 'വിശ്വാസത്തിലും പ്രവൃത്തിയിലും വിശുദ്ധ തിരുവചനത്തിന്റെ പൂർണ്ണ ദൈവശ്വാസീയതയിലും അപ്രമാദിത്വത്തിലും ഉള്ള ഉറച്ച ബോധ്യം.',
      },
    },
    {
      icon: Flame,
      title: {
        en: 'Christlike Character',
        kn: 'ಆತ್ಮೀಕ ರೂಪಾಂತರ',
        hi: 'मसीही चरित्र निर्माण',
        ta: 'கிறிஸ்துவைப்போன்ற சுபாவம்',
        te: 'క్రీస్తు స్వభావ నిర్మాణం',
        ml: 'ക്രിസ്തുതുല്യ സ്വഭാവം',
      },
      desc: {
        en: 'Cultivating personal holiness, humility, intercessory prayer, and integrity through the sanctifying work of the Holy Spirit.',
        kn: 'ದೈನಂದಿನ ಚಾಪೆಲ್ ಪ್ರಾರ್ಥನೆ, ಉಪವಾಸ ಮತ್ತು ಪರಿಶುದ್ಧತೆಯ ಶಿಸ್ತುಬದ್ಧ ಜೀವನ.',
        hi: 'पवित्र आत्मा की सामर्थ्य से व्यक्तिगत पवित्रता, नम्रता, मध्यस्थता की प्रार्थना और ईमानदारी का विकास।',
        ta: 'பரிசுத்த ஆவியானவரின் கிரியையினால் தனிப்பட்ட பரிசுத்தம், தாழ்மை, மன்றாட்டு ஜெபம் மற்றும் நற்குணங்களை வளர்த்தல்.',
        te: 'పరిశుద్ధాత్మ దేవుని కార్యం ద్వారా వ్యక్తిగత పరిశుద్ధత, వినయం, విజ్ఞాపన ప్రార్థన మరియు యథార్థతను అలవరచుకోవడం.',
        ml: 'പരിശുദ്ധാത്മാവിന്റെ ശുദ്ധീകരണത്താൽ വ്യക്തിപരമായ വിശുദ്ധി, വിനയം, മധ്യസ്ഥ പ്രാർത്ഥന, വിശ്വസ്തത എന്നിവ വളർത്തുന്നു.',
      },
    },
    {
      icon: Compass,
      title: {
        en: 'Native Leadership',
        kn: 'ಸ್ಥಳೀಯ ನಾಯಕತ್ವ',
        hi: 'स्वदेशी नेतृत्व',
        ta: 'உள்நாட்டு தலைமைத்துவம்',
        te: 'స్వదేశీ నాయకత్వం',
        ml: 'തദ്ദേശീയ നേതൃത്വം',
      },
      desc: {
        en: 'Equipping indigenous leaders fluent in local languages and deeply attuned to Indian societal realities and harvest fields.',
        kn: 'ಕರ್ನಾಟಕ ಮತ್ತು ಭಾರತೀಯ ಸ್ಥಳೀಯ ಭಾಷೆ, ಸಂಸ್ಕೃತಿಯ ಅರಿವುಳ್ಳ ಸಭಾಪಾಲಕರನ್ನು ಸಜ್ಜುಗೊಳಿಸುವುದು.',
        hi: 'स्थानीय भाषाओं में पारंगत और भारतीय सामाजिक वास्तविकताओं को समझने वाले स्वदेशी मसीही अगुओं को तैयार करना।',
        ta: 'உள்ளூர் மொழிகளில் திறமையான, இந்திய சமுதாய யதார்த்தங்களை உணர்ந்த உள்நாட்டு தலைவர்களை உருவாக்குதல்.',
        te: 'స్థానిక భాషలలో ప్రావీణ్యం మరియు భారతీయ సామాజిక పరిస్థితులను అర్థం చేసుకునే స్వదేశీ నాయకులను తీర్చిదిద్దడం.',
        ml: 'പ്രാദേശിക ഭാഷകളിൽ പ്രാവീണ്യവും ഇന്ത്യൻ സാമൂഹിക യാഥാർത്ഥ്യങ്ങളെ തിരിച്ചറിയുന്നതുമായ തദ്ദേശീയ നേതാക്കളെ ഒരുക്കുക.',
      },
    },
    {
      icon: HeartHandshake,
      title: {
        en: 'Practical Evangelism',
        kn: 'ಪ್ರಾಯೋಗಿಕ ಸುವಾರ್ತೆ',
        hi: 'व्यावहारिक सुसमाचार प्रचार',
        ta: 'நடைமுறை சுவிசேஷ ஊழியம்',
        te: 'ప్రాక్టికల్ సువార్త పరిచర్య',
        ml: 'പ്രായോഗിക സുവിശേഷീകരണം',
      },
      desc: {
        en: 'Connecting rigorous classroom scholarship directly to weekend rural outreach, church planting, and compassionate service.',
        kn: 'ವಾರಾಂತ್ಯದ ಗ್ರಾಮೀಣ ಭೇಟಿ, ಸುವಾರ್ತಾ ಪ್ರಚಾರ ಮತ್ತು ಸಭಾ ಸ್ಥಾಪನೆಯ ಕಾರ್ಯಾನುಭವ.',
        hi: 'कक्षा के गंभीर अध्ययन को सप्ताहांत के ग्रामीण सुसमाचार प्रचार, कलीसिया स्थापना और दया की सेवा से जोड़ना।',
        ta: 'வகுப்பறை இறையியல் கல்வியை வாராந்திர கிராமப்புற சுவிசேஷ பணி மற்றும் சபை ஸ்தாபித்தலுடன் இணைத்தல்.',
        te: 'తరగతి గది అధ్యయనాన్ని వారాంతపు గ్రామీణ సువార్త పరిచర్య, సంఘ స్థాపన మరియు సేవా కార్యక్రమాలతో అనుసంధానించడం.',
        ml: 'ക്ലാസ് റൂം പഠനത്തെ വാരാന്ത്യ ഗ്രാമീണ സുവിശേഷീകരണവുമായും സഭാ സ്ഥാപനവുമായും പ്രായോഗികമായി ബന്ധിപ്പിക്കുന്നു.',
      },
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F4F1EA] text-[#2D2D2D] border-b border-[#D1C7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. SECTION HEADER / INTRODUCTION */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('aboutBadge')}</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>Est. Mysore, Karnataka</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            {t('aboutHeading')}
          </h2>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans">
            {t('aboutIntro')}
          </p>
        </div>

        {/* 2. VISION & MISSION SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#D4AF37] shadow-md flex flex-col justify-between space-y-5 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1A365D] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow">
                  <Eye className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs font-sans font-bold text-[#D4AF37] tracking-widest uppercase block">Our Guiding North Star</span>
                  <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                    {t('visionTitle')}
                  </h3>
                </div>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                {t('visionDesc')}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E9E4DB] text-xs font-sans font-semibold text-[#1A365D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              <span>Rooted in John 15:5 — Bearing Fruit for the Nations</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#1A365D] shadow-md flex flex-col justify-between space-y-5 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37] text-[#1A365D] flex items-center justify-center flex-shrink-0 shadow">
                  <Target className="w-6 h-6 text-[#1A365D]" />
                </div>
                <div>
                  <span className="text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase block">Our Sacred Calling</span>
                  <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                    {t('missionTitle')}
                  </h3>
                </div>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                {t('missionDesc')}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E9E4DB] text-xs font-sans font-semibold text-[#1A365D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1A365D]"></span>
              <span>Rigorous Scholarship · Spiritual Formation · Practical Ministry</span>
            </div>
          </div>
        </div>

        {/* 3. CORE VALUES GRID */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">Pillars of Faith</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D]">
              Institutional Core Values
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Principles guiding our academic rigor, spiritual discipleship, and community life at Mysore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              const title = val.title[currentLanguage] || val.title.en;
              const desc = val.desc[currentLanguage] || val.desc.en;
              return (
                <div key={idx} className="bg-white rounded-xl p-6 border border-[#D1C7B7] hover:border-[#D4AF37] transition-all shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4F1EA] text-[#1A365D] flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1A365D]">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. LEADERSHIP MESSAGE FROM THE PRINCIPAL */}
        <div className="bg-[#1A365D] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Quote className="w-32 h-32 text-white" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Principal Photo */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-[#D4AF37] shadow-2xl bg-black">
                  <img
                    src={getAssetUrl('assets/aistudio/pricipal_7db520a9.webp', 'principal')}
                    alt={t('principalName')}
                    onError={(e) => handleImageError(e, 'principal')}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h4 className="font-serif text-xl font-bold text-white">{t('principalName')}</h4>
                  <p className="text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-wider">
                    {t('principalRole')}
                  </p>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                    {t('principalQualifications')}
                  </p>
                </div>
              </div>
            </div>

            {/* Principal Message Text */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-widest">
                <Quote className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('principalDeskHeading')}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Equipping Servant Leaders for the Harvest Field of India
              </h3>

              <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  “Native Evangelical School of Theology was birthed with a singular biblical vision: to prepare servant-leaders who abide faithfully in Jesus Christ, the True Vine, and produce fruit that endures. In a nation of immense cultural diversity and spiritual hunger, the church needs pastors and ministers who are both academically rigorous and spiritually aflame.”
                </p>
                <p>
                  “Accredited by the Asia Theological Association (ATA India), our academic programs—B.Th, M.Div, and Dip.Th—combine serious textual exegesis with deep pastoral empathy and weekly field outreach. We warmly invite young men and women called by God to join our residential community in Mysore.”
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-sans font-bold text-[#D4AF37]">
                <span>Contact Principal Desk: +91 88801 11763</span>
                <span className="text-white/40" aria-hidden="true">·</span>
                <span>Nagarthalli, Rayanakere Post, Mysore</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. THE EMBLEM & SYMBOLISM BREAKDOWN */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D1C7B7] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-[#F4F1EA] rounded-2xl border border-[#D1C7B7]">
                <NestLogo size="xl" variant="transparent" />
              </div>
              <div>
                <span className="text-xs font-sans font-bold text-[#1A365D] uppercase tracking-wider block">Official Crest</span>
                <p className="font-serif font-bold text-lg text-[#1A365D]">John 15:5 Institutional Emblem</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-widest block">Biblical Symbolism</span>
                <h3 className="font-serif text-2xl font-bold text-[#1A365D]">The Theology of the NEST Emblem</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-sans">
                <div className="p-3.5 bg-[#F4F1EA] rounded-xl border border-[#D1C7B7] space-y-1">
                  <h5 className="font-bold text-[#1A365D]">1. The Vine &amp; Branches</h5>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Christ is the True Vine. Only when ministers remain connected to Him do they bear lasting spiritual fruit.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F4F1EA] rounded-xl border border-[#D1C7B7] space-y-1">
                  <h5 className="font-bold text-[#1A365D]">2. The Central Cross</h5>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    The sacrificial atonement of Christ on the cross is the immovable center of our teaching and preaching.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F4F1EA] rounded-xl border border-[#D1C7B7] space-y-1">
                  <h5 className="font-bold text-[#1A365D]">3. The Worshipping Community</h5>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Indigenous believers lifting holy hands in unified worship and prayer across the native harvest fields.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F4F1EA] rounded-xl border border-[#D1C7B7] space-y-1">
                  <h5 className="font-bold text-[#1A365D]">4. The Nurturing &ldquo;NEST&rdquo;</h5>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    A safe, nurturing spiritual home where students are discipled, strengthened, and released into global harvest.
                  </p>
                </div>
              </div>

              <p className="italic font-serif text-xs sm:text-sm text-[#1A365D] border-l-2 border-[#D4AF37] pl-3">
                &ldquo;Rooted in the Vine, Bearing Fruit for the Nations&rdquo; — John 15:5
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
