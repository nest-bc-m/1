import React, { useState } from 'react';
import { 
  Camera, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Upload, 
  Plus, 
  Image as ImageIcon,
  Check,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { GalleryPhotoItem } from '../types';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

export const CampusGallery: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { galleryPhotos, addPhoto, isAdminLoggedIn } = useAdminData();

  // Upload Form State for Future Photos
  const [newPhoto, setNewPhoto] = useState({
    titleEn: '',
    titleKn: '',
    category: 'grounds' as GalleryPhotoItem['category'],
    locationEn: 'Nagarthalli Campus, Mysore',
    locationKn: 'ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್, ಮೈಸೂರು',
    imageUrl: '',
    descEn: '',
    descKn: '',
    tagEn: 'Campus Life',
    tagKn: 'ಕ್ಯಾಂಪಸ್ ಜೀವನ',
  });

  const categories = [
    { 
      id: 'all', 
      label: { en: 'All Photos', kn: 'ಎಲ್ಲ ಫೋಟೋಗಳು', hi: 'सभी तस्वीरें', ta: 'அனைத்து படங்கள்', te: 'అన్ని ఫోటోలు', ml: 'എല്ലാ ചിത്രങ്ങളും' } 
    },
    { 
      id: 'grounds', 
      label: { en: 'Campus & Architecture', kn: 'ಕ್ಯಾಂಪಸ್ & ಕಟ್ಟಡಗಳು', hi: 'परिसर और भवन', ta: 'வளாகம் மற்றும் கட்டிடங்கள்', te: 'క్యాంపస్ & భవనాలు', ml: 'കാമ്പസും കെട്ടിടങ്ങളും' } 
    },
    { 
      id: 'classroom', 
      label: { en: 'Classrooms & Academics', kn: 'ತರಗತಿ ಕೊಠಡಿಗಳು', hi: 'कक्षाएं और अध्ययन', ta: 'வகுப்பறைகள்', te: 'తరగతి గదులు', ml: 'ക്ലാസ് മുറികൾ' } 
    },
    { 
      id: 'chapel', 
      label: { en: 'Chapel & Sanctuary', kn: 'ಚಾಪೆಲ್ & ಆರಾಧನೆ', hi: 'चैपल आराधना', ta: 'சாப்பல் ஆராதனை', te: 'చాపెల్ ఆరాధన', ml: 'ചാപ്പൽ ആരാധന' } 
    },
    { 
      id: 'faculty', 
      label: { en: 'Faculty & Mentorship', kn: 'ಬೋಧಕರು & ನಾಯಕತ್ವ', hi: 'अध्यापक व नेतृत्व', ta: 'ஆசிரியர்கள்', te: 'అధ్యాపకులు', ml: 'അധ്യാപകർ' } 
    },
    { 
      id: 'convocation', 
      label: { en: 'Graduation Convocation', kn: 'ಪದವಿ ಪ್ರದಾನ', hi: 'दीक्षांत समारोह', ta: 'பட்டமளிப்பு விழா', te: 'పట్టభద్రుల వేడుక', ml: 'ബിരുദദാന ചടങ്ങ്' } 
    },
    { 
      id: 'student-life', 
      label: { en: 'Student Life & Dining', kn: 'ವಿದ್ಯಾರ್ಥಿ ಜೀವನ & ಭೋಜನ', hi: 'छात्र जीवन व भोजन', ta: 'மாணவர் வாழ்க்கை', te: 'విద్యార్థి జీవనం', ml: 'വിദ്യാർത്ഥി ജീവിതം' } 
    },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((item) => item.category === activeCategory);

  const selectedPhoto =
    selectedPhotoIndex !== null && selectedPhotoIndex >= 0 && selectedPhotoIndex < filteredPhotos.length
      ? filteredPhotos[selectedPhotoIndex]
      : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    } else {
      setSelectedPhotoIndex(filteredPhotos.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex < filteredPhotos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    } else {
      setSelectedPhotoIndex(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.imageUrl || !newPhoto.titleEn) {
      return;
    }

    addPhoto({
      category: newPhoto.category,
      titleEn: newPhoto.titleEn,
      titleKn: newPhoto.titleKn || newPhoto.titleEn,
      descEn: newPhoto.descEn || newPhoto.titleEn,
      descKn: newPhoto.descKn || newPhoto.descEn || newPhoto.titleEn,
      locationEn: newPhoto.locationEn,
      locationKn: newPhoto.locationKn,
      imageUrl: newPhoto.imageUrl,
      tagEn: newPhoto.tagEn,
      tagKn: newPhoto.tagKn,
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      // Reset
      setNewPhoto({
        titleEn: '',
        titleKn: '',
        category: 'grounds',
        locationEn: 'Nagarthalli Campus, Mysore',
        locationKn: 'ನಾಗರಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್, ಮೈಸೂರು',
        imageUrl: '',
        descEn: '',
        descKn: '',
        tagEn: 'Campus Life',
        tagKn: 'ಕ್ಯಾಂಪಸ್ ಜೀವನ',
      });
    }, 1200);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#EFECE4] text-[#2D2D2D] border-b-2 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A365D] tracking-widest uppercase">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLanguage === 'kn' ? 'ನಮ್ಮ ಅಧಿಕೃತ ಕ್ಯಾಂಪಸ್ ಗ್ಯಾಲರಿ' : 'Official Campus Photo Gallery'}</span>
            <span className="text-[#D4AF37]" aria-hidden="true">·</span>
            <span>100% Authentic Photos</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A365D] tracking-tight">
            {currentLanguage === 'kn'
              ? 'NEST ಮೈಸೂರು ಕ್ಯಾಂಪಸ್ ಚಿತ್ರ ಸಂಪುಟ'
              : 'Authentic Campus & Student Life at NEST'}
          </h2>

          <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
            {currentLanguage === 'kn'
              ? 'ನಮ್ಮ ಮೈಸೂರು ಕ್ಯಾಂಪಸ್‌ನ ನೈಜ ಕಟ್ಟಡಗಳು, ಚಾಪೆಲ್ ಆರಾಧನೆ, ತರಗತಿ ಬೋಧನೆ, ಪದವಿ ಪ್ರದಾನ ಮಹೋತ್ಸವ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳ ಸಹೋದರತ್ವ ಜೀವನದ ಅಧಿಕೃತ ಛಾಯಾಚಿತ್ರಗಳು.'
              : 'Explore genuine photographs of our peaceful Mysore residential campus, daily chapel worship, rigorous lectures, graduation convocation, and student fellowship.'}
          </p>
        </div>

        {/* Quality Bar & Future Photo Upload Trigger */}
        <div className="bg-[#1A365D] text-white rounded-2xl p-5 sm:p-6 border-2 border-[#D4AF37] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-[#112440] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-sans font-bold text-xs sm:text-sm text-[#D4AF37] uppercase tracking-wider">
                {currentLanguage === 'kn' ? '100% ಅಧಿಕೃತ ಹಾಗೂ ನೈಜ ಕ್ಯಾಂಪಸ್ ಛಾಯಾಚಿತ್ರಗಳು' : '100% Authentic Institutional Photographs'}
              </p>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Native Evangelical School of Theology, Nagarthalli, Rayanakere Post, Mysore · ATA India Accredited
              </p>
            </div>
          </div>

          {/* Action Button: Future Photo Upload Option */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-shrink-0">
            <span className="text-xs text-slate-300 font-sans hidden md:inline">
              {galleryPhotos.length} {currentLanguage === 'kn' ? 'ಫೋಟೋಗಳು' : 'Photos'}
            </span>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-white text-[#1A365D] text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
              title="Add or Upload Campus Photos"
            >
              <Upload className="w-4 h-4" />
              <span>{currentLanguage === 'kn' ? 'ಹೊಸ ಫೋಟೋ ಸೇರಿಸಿ' : 'Upload / Add Photo'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#1A365D] text-[#D4AF37] border-2 border-[#D4AF37] shadow-md'
                    : 'bg-white text-slate-700 hover:text-[#1A365D] hover:bg-slate-50 border border-[#D1C7B7]'
                }`}
              >
                <span>{cat.label[currentLanguage] || cat.label.en}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Photo Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-[#D1C7B7] hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl flex flex-col justify-between cursor-pointer"
            >
              {/* Photo Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-[#D1C7B7]">
                
                <img
                  src={getAssetUrl(photo.imageUrl, 'campus')}
                  alt={currentLanguage === 'kn' ? photo.titleKn : photo.titleEn}
                  onError={(e) => handleImageError(e, 'campus')}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity"></div>

                {/* Top Overlay Kicker */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D4AF37] drop-shadow">
                    {currentLanguage === 'kn' ? photo.tagKn : photo.tagEn}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all border border-white/20">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
                  <h3 className="font-serif font-bold text-white text-base sm:text-lg leading-snug drop-shadow-md">
                    {currentLanguage === 'kn' ? photo.titleKn : photo.titleEn}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-sans font-medium mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{currentLanguage === 'kn' ? photo.locationKn : photo.locationEn}</span>
                  </div>
                </div>

              </div>

              {/* Card Body & Description */}
              <div className="p-4 sm:p-5 space-y-2.5 bg-white flex-grow flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans line-clamp-2">
                  {currentLanguage === 'kn' ? photo.descKn : photo.descEn}
                </p>

                <div className="pt-2.5 border-t border-[#E5DFD3] flex items-center justify-between text-[11px] font-sans text-slate-500">
                  <span className="font-semibold text-[#1A365D]">Native Evangelical School</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>{currentLanguage === 'kn' ? 'ದೊಡ್ಡದಾಗಿ ನೋಡಿ' : 'View Full Image'}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Institutional Campus Address Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#D1C7B7] text-center max-w-3xl mx-auto space-y-2 shadow-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider font-sans">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Native Evangelical School of Theology (NEST)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-sans">
            Nagarthalli, Rayanakere Post, H.D. Kote Road, Mysore – 570008, Karnataka, India
          </p>
          <div className="text-[11px] text-[#D4AF37] font-sans font-bold pt-1">
            {currentLanguage === 'kn'
              ? 'ಮಾನ್ಯತೆ: ಏಷ್ಯಾ ಥಿಯಾಲಾಜಿಕಲ್ ಅಸೋಸಿಯೇಷನ್ (ATA India)'
              : 'Accreditation: Asia Theological Association (ATA India)'}
          </div>
        </div>

      </div>

      {/* Interactive Lightbox / High Resolution Photo Modal */}
      {selectedPhoto && selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div 
            className="relative bg-[#1A365D] text-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl border-2 border-[#D4AF37] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#112440] border-b border-[#D4AF37]/40 flex items-center justify-between flex-shrink-0">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-[#D4AF37]">
                  {currentLanguage === 'kn' ? selectedPhoto.tagKn : selectedPhoto.tagEn} · Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {currentLanguage === 'kn' ? selectedPhoto.titleKn : selectedPhoto.titleEn}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#1A365D] flex items-center justify-center transition-colors cursor-pointer"
                  title="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Area with Navigation Buttons */}
            <div className="relative bg-black flex items-center justify-center flex-grow overflow-hidden min-h-[300px] max-h-[62vh]">
              <img
                src={getAssetUrl(selectedPhoto.imageUrl, 'campus')}
                alt={currentLanguage === 'kn' ? selectedPhoto.titleKn : selectedPhoto.titleEn}
                onError={(e) => handleImageError(e, 'campus')}
                className="max-h-full max-w-full object-contain mx-auto"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#1A365D] flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#1A365D] flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Description Footer */}
            <div className="p-4 sm:p-6 bg-[#112440] border-t border-white/10 space-y-3 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-sans font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentLanguage === 'kn' ? selectedPhoto.locationKn : selectedPhoto.locationEn}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {currentLanguage === 'kn' ? selectedPhoto.descKn : selectedPhoto.descEn}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                  <button
                    onClick={handlePrev}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-sans text-slate-200 cursor-pointer"
                  >
                    ← {currentLanguage === 'kn' ? 'ಹಿಂದಿನದು' : 'Prev'}
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#1A365D] hover:bg-white text-xs font-sans font-bold cursor-pointer transition-colors"
                  >
                    {currentLanguage === 'kn' ? 'ಮುಂದಿನದು' : 'Next'} →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FUTURE PHOTO UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112440]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 space-y-6 text-[#2D2D2D]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E9E4DB] pb-4">
              <div>
                <span className="text-xs font-sans font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Campus Photo Archive
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A365D]">
                  {currentLanguage === 'kn' ? 'ಹೊಸ ಕ್ಯಾಂಪಸ್ ಫೋಟೋ ಸೇರಿಸಿ' : 'Upload Future Campus Photo'}
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {uploadSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#1A365D]">Photo Added to Gallery Successfully!</h4>
                <p className="text-xs text-slate-600 font-sans">The photo has been placed into the institutional campus archive.</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                
                {/* Image File or URL Selection */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#1A365D] block">
                    Select Image File or Enter Path / URL:
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="p-2 border border-[#D1C7B7] rounded-xl text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#1A365D] file:text-[#D4AF37] file:font-bold file:text-xs file:cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">or URL:</span>
                      <input
                        type="text"
                        placeholder="e.g. /assets/aistudio/campus_new.webp"
                        value={newPhoto.imageUrl}
                        onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                        className="flex-grow p-2 border border-[#D1C7B7] rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                  {newPhoto.imageUrl && (
                    <div className="mt-2 w-full h-32 rounded-xl overflow-hidden border border-[#D4AF37] bg-black">
                      <img 
                        src={getAssetUrl(newPhoto.imageUrl, 'campus')} 
                        alt="Preview" 
                        onError={(e) => handleImageError(e, 'campus')}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>

                {/* Photo Title */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#1A365D] block">
                    Photo Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Theological Library Section"
                    value={newPhoto.titleEn}
                    onChange={(e) => setNewPhoto({ ...newPhoto, titleEn: e.target.value })}
                    className="w-full p-2.5 border border-[#D1C7B7] rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#1A365D] block">
                    Photo Title (Kannada / ಕನ್ನಡ)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ಹೊಸ ದೇವತಾಶಾಸ್ತ್ರ ಗ್ರಂಥಾಲಯ ವಿಭಾಗ"
                    value={newPhoto.titleKn}
                    onChange={(e) => setNewPhoto({ ...newPhoto, titleKn: e.target.value })}
                    className="w-full p-2.5 border border-[#D1C7B7] rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#1A365D] block">Category:</label>
                    <select
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as any })}
                      className="w-full p-2.5 border border-[#D1C7B7] rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] focus:outline-none bg-white"
                    >
                      <option value="grounds">Campus & Grounds</option>
                      <option value="classroom">Classroom & Academics</option>
                      <option value="chapel">Chapel & Devotion</option>
                      <option value="faculty">Faculty & Mentorship</option>
                      <option value="convocation">Graduation Convocation</option>
                      <option value="student-life">Student Life & Dining</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#1A365D] block">Campus Location:</label>
                    <input
                      type="text"
                      value={newPhoto.locationEn}
                      onChange={(e) => setNewPhoto({ ...newPhoto, locationEn: e.target.value })}
                      className="w-full p-2.5 border border-[#D1C7B7] rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#1A365D] block">Photo Description:</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of the event or location..."
                    value={newPhoto.descEn}
                    onChange={(e) => setNewPhoto({ ...newPhoto, descEn: e.target.value })}
                    className="w-full p-2.5 border border-[#D1C7B7] rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-3 border-t border-[#E9E4DB] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newPhoto.imageUrl || !newPhoto.titleEn}
                    className="px-6 py-2.5 rounded-xl bg-[#1A365D] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1A365D] font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Confirm &amp; Add Photo</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
