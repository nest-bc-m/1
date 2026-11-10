import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { OnlineAdmissionForm } from '../OnlineAdmissionForm';
import { StudentApplicationTracker } from '../StudentApplicationTracker';
import { FileText, Search } from 'lucide-react';

interface AdmissionsPageProps {
  onNavigate: (page: 'home' | 'about' | 'programs' | 'faculty' | 'campus' | 'admissions' | 'contact') => void;
  selectedProgramId?: string;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  onNavigate,
  selectedProgramId = 'b-th',
}) => {
  const { institutionInfo } = useAdminData();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'form' | 'tracker'>('form');

  return (
    <div className="bg-[#FBF9F5] text-stone-800 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#1A365D] text-white border-b-4 border-[#C5A059] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">{t('admissionsBadge')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('admRollingBanner')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t('formTitle')} &amp; {t('stepDeclarationA4')}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {t('formSubtitle')}
          </p>

          {/* Interactive Navigation Tabs for Form vs Status Tracker */}
          <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <button
              onClick={() => setActiveTab('form')}
              className={`w-full sm:w-auto min-h-[44px] justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#D4AF37] text-[#1A365D] shadow-lg scale-102'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>📝 Online Admission Form</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`w-full sm:w-auto min-h-[44px] justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'tracker'
                  ? 'bg-[#D4AF37] text-[#1A365D] shadow-lg scale-102'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>🔍 Track Application Status</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {activeTab === 'tracker' ? (
          /* Dedicated Student Application Status Tracker View */
          <section className="space-y-4">
            <StudentApplicationTracker />
          </section>
        ) : (
          <>
            {/* Admission Journey & Criteria Strip */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-2">
                <span className="font-mono text-xs font-bold text-[#C5A059] uppercase block">Step 01</span>
                <h3 className="font-serif font-bold text-base text-[#1A365D]">{t('admJourneyStep1Title')}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {t('admJourneyStep1Desc')}
                </p>
              </div>

              <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-2">
                <span className="font-mono text-xs font-bold text-[#C5A059] uppercase block">Step 02</span>
                <h3 className="font-serif font-bold text-base text-[#1A365D]">{t('admJourneyStep2Title')}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {t('admJourneyStep2Desc')}
                </p>
              </div>

              <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-2">
                <span className="font-mono text-xs font-bold text-[#C5A059] uppercase block">Step 03</span>
                <h3 className="font-serif font-bold text-base text-[#1A365D]">{t('admJourneyStep3Title')}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {t('admJourneyStep3Desc')}
                </p>
              </div>
            </section>

            {/* Embedded Full Online Admission Form Component */}
            <section className="space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="font-serif text-2xl font-bold text-[#1A365D]">
                  {t('admFormHeading')}
                </h2>
                <p className="text-xs text-stone-500 font-sans mt-0.5">
                  {t('admFormSub')}
                </p>
              </div>

              {/* Form wrapper */}
              <div className="bg-white border border-stone-300 rounded-lg p-3 sm:p-8 lg:p-10 shadow-sm">
                <OnlineAdmissionForm initialProgramId={selectedProgramId} />
              </div>
            </section>
          </>
        )}

        {/* Financial & Hostel Guidelines */}
        <section className="bg-white border border-stone-300 rounded-lg p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
          <h3 className="font-serif text-lg font-bold text-[#1A365D]">
            {t('admPolicyHeading')}
          </h3>
          <p>
            {t('admPolicyDesc1')}
          </p>
          <p>
            {t('admPolicyDesc2')} <a href={`tel:${institutionInfo.phone}`} className="font-bold text-[#1A365D] hover:underline font-mono">{institutionInfo.phoneFormatted}</a>.
          </p>
        </section>

      </div>

    </div>
  );
};
