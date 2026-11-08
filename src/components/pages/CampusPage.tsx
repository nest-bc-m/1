import React, { useState } from 'react';
import { 
  Camera, 
  BookOpen, 
  Flame, 
  Users, 
  Compass, 
  Maximize2, 
  X, 
  GraduationCap
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminData } from '../../context/AdminDataContext';

interface CampusPageProps {
  onNavigate: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
  onOpenApplyModal: () => void;
}

export const CampusPage: React.FC<CampusPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const { currentLanguage } = useLanguage();
  const { galleryPhotos } = useAdminData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Campus Facilities' },
    { id: 'grounds', label: 'Grounds & Buildings' },
    { id: 'classroom', label: 'Classrooms & Lectures' },
    { id: 'chapel', label: 'Chapel & Sanctuary' },
    { id: 'student-life', label: 'Refectory & Dining' },
    { id: 'convocation', label: 'Graduation Convocation' },
    { id: 'faculty', label: 'Faculty Cohort' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === activeCategory);

  const selectedPhoto =
    selectedPhotoIndex !== null && selectedPhotoIndex >= 0 && selectedPhotoIndex < filteredPhotos.length
      ? filteredPhotos[selectedPhotoIndex]
      : null;

  return (
    <div className="bg-[#FBF9F5] text-stone-800 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#1A365D] text-white border-b-4 border-[#C5A059] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">Campus Life &amp; Facilities</span>
            <span aria-hidden="true">·</span>
            <span>Nagarthalli Post, Mysore - 570008</span>
            <span aria-hidden="true">·</span>
            <span>Residential Theological Community</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Campus Environment &amp; Student Life
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            A quiet, peaceful setting in Mysore providing residential students with academic lecture halls, chapel of daily prayer, theological library, student refectory, and sports grounds.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* 1. Life at NEST Overview Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-stone-300 rounded-lg p-5 space-y-2">
            <div className="w-10 h-10 rounded bg-[#1A365D] text-[#D4AF37] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A365D]">Daily Chapel Worship</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Every morning begins with congregational singing, pastoral expository devotion, and intercessory prayer for churches and nations.
            </p>
          </div>

          <div className="bg-white border border-stone-300 rounded-lg p-5 space-y-2">
            <div className="w-10 h-10 rounded bg-[#1A365D] text-[#D4AF37] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A365D]">Theological Library</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Holdings covering commentaries, Greek/Hebrew lexical aids, church history, systematic theology, and Indian contextual studies.
            </p>
          </div>

          <div className="bg-white border border-stone-300 rounded-lg p-5 space-y-2">
            <div className="w-10 h-10 rounded bg-[#1A365D] text-[#D4AF37] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A365D]">Residential Hostels</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Separate residential accommodations providing a secure, quiet, and disciplined atmosphere for focused study and prayer.
            </p>
          </div>

          <div className="bg-white border border-stone-300 rounded-lg p-5 space-y-2">
            <div className="w-10 h-10 rounded bg-[#1A365D] text-[#D4AF37] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A365D]">Weekend Field Ministry</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Students travel to rural villages and local congregations across Mysore and Karnataka for practical church ministry and preaching.
            </p>
          </div>
        </section>

        {/* 2. Full Photographic Campus Gallery */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider">
                <Camera className="w-4 h-4 text-[#C5A059]" />
                <span>Campus Visual Directory</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A365D] mt-1">
                Facilities &amp; Campus Gallery
              </h2>
            </div>

            {/* Category Segmented Control */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/80 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-sans font-semibold rounded transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className="group bg-white border border-stone-300 rounded-lg overflow-hidden hover:border-[#C5A059] transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.titleEn}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute top-2 right-2 bg-stone-900/60 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-sans text-stone-500">
                    <span className="font-mono text-[#C5A059] uppercase">{currentLanguage === 'kn' ? photo.tagKn : photo.tagEn}</span>
                    <span>{currentLanguage === 'kn' ? photo.locationKn : photo.locationEn}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#1A365D] transition-colors leading-snug">
                    {currentLanguage === 'kn' ? photo.titleKn : photo.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans line-clamp-2">
                    {currentLanguage === 'kn' ? photo.descKn : photo.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Daily Campus Schedule & Routine */}
        <section className="bg-white border border-stone-300 rounded-lg p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D]">
            Daily Seminary Rhythm (Residential Schedule)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans text-stone-700">
            <div className="p-4 bg-[#FBF9F5] border border-stone-200 rounded space-y-1">
              <span className="font-mono font-bold text-[#C5A059] block">06:00 – 07:30 AM</span>
              <strong className="text-stone-900 block text-sm">Morning Devotion &amp; Chapel</strong>
              <p className="text-stone-600">Personal prayer, communal intercession, Scripture devotion in chapel.</p>
            </div>

            <div className="p-4 bg-[#FBF9F5] border border-stone-200 rounded space-y-1">
              <span className="font-mono font-bold text-[#C5A059] block">08:30 AM – 01:00 PM</span>
              <strong className="text-stone-900 block text-sm">Academic Lectures</strong>
              <p className="text-stone-600">Exegesis, systematic theology, church history, and original languages.</p>
            </div>

            <div className="p-4 bg-[#FBF9F5] border border-stone-200 rounded space-y-1">
              <span className="font-mono font-bold text-[#C5A059] block">02:00 – 04:30 PM</span>
              <strong className="text-stone-900 block text-sm">Library Research &amp; Study</strong>
              <p className="text-stone-600">Guided reading, research paper writing, Greek translation workshops.</p>
            </div>

            <div className="p-4 bg-[#FBF9F5] border border-stone-200 rounded space-y-1">
              <span className="font-mono font-bold text-[#C5A059] block">Friday – Sunday</span>
              <strong className="text-stone-900 block text-sm">Weekend Supervised Ministry</strong>
              <p className="text-stone-600">Village outreach, pulpit ministry, Sunday school teaching across Karnataka.</p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('admissions')}
            className="px-6 py-3 bg-[#1A365D] hover:bg-[#204373] text-white text-xs font-sans font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
            <span>Apply for Residential Admission in Mysore</span>
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl space-y-0"
          >
            <div className="relative bg-black aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.titleEn}
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 bg-white space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{currentLanguage === 'kn' ? selectedPhoto.tagKn : selectedPhoto.tagEn}</span>
                <span>{currentLanguage === 'kn' ? selectedPhoto.locationKn : selectedPhoto.locationEn}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {currentLanguage === 'kn' ? selectedPhoto.titleKn : selectedPhoto.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                {currentLanguage === 'kn' ? selectedPhoto.descKn : selectedPhoto.descEn}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
