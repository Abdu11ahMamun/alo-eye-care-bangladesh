import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import opticsImg from '../assets/images/eye_optics_3d_1779739528351.png';

interface ServicesProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function Services({ onSelectServiceForBooking }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>('cataract');

  // Helper to map icon names from string to actual Lucide component dynamically
  const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Eye;
    return <IconComponent className={className} />;
  };

  const selectedService = SERVICES.find(s => s.id === activeTab) || SERVICES[0];

  return (
    <section
      id="services-section"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Dynamic graphic backdrops */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-slate-50 border-4 border-dashed border-teal-100/40 -z-10 animate-spin-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-gradient-radial from-teal-500/5 to-cyan-500/5 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section focusing on ophthalmologist specialty credentials */}
        <div id="services-header" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider">
            <LucideIcons.Tv className="w-3.5 h-3.5 text-teal-600" />
            Specialized Vision Care Unit
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-4xl text-slate-900 tracking-tight">
            Microscopic Surgery & Comprehensive Ophthalmic Diagnostics
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We feature state-of-the-art diagnostics and micro-surgical laser apparatus sourced from leading medical builders. Select an eye care discipline below to view clinical details in Bangladesh BDT:
          </p>
        </div>

        {/* 3D Focus Segment: Cataract & LASIK Refraction Highlight formatted as a premium Bento block */}
        <div 
          id="diagnostics-spotlight" 
          className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F4F9F9]/80 p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
          
          <div className="absolute top-4 right-4 bg-teal-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
            Clinical Focus
          </div>

          {/* Left Column: Glass refractive model generated image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full aspect-square rounded-[2rem] overflow-hidden shadow-lg border-2 border-white bg-slate-100 group">
              <img
                src={opticsImg}
                alt="3D Glass Optic Refraction and Ocular Focusing Lens Illustration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 text-left">
                <span className="font-display font-bold text-slate-800 text-xs block">Ophthalmic Lens Focus Mode</span>
                <p className="text-[10px] text-slate-500 mt-0.5">High-fidelity 3D modeling simulating visual refraction paths through intraocular lenses (IOL).</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Tab Descriptions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Why Optical Refraction Technology Matters
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every cataract and refractor correction surgery at Alo Eye Care integrates strict wave-shape lens screening. By mapping corneal topography, we fit precise implants and custom lasers, avoiding generic approximations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-800 text-xs">Phaco Laser Precision</h4>
                  <p className="text-[10px] text-slate-500">Stitchless 2.2mm incisions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-800 text-xs">Premium Lens Fitting</h4>
                  <p className="text-[10px] text-slate-500">Multifocal & Toric implants</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Service Grid and Tab System inside Bento frame */}
        <div id="service-navigator-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Tabs Navigation (Left side on desktop, top on mobile) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="font-display font-bold text-slate-900 text-base mb-2 px-1">Ophthalmology Disciplines:</h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-3 lg:pb-0 scrollbar-none">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  id={`service-tab-btn-${service.id}`}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center gap-3 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all text-left whitespace-nowrap lg:whitespace-normal shrink-0 ${
                    activeTab === service.id
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/10'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  <span className={`p-1.5 rounded-lg ${activeTab === service.id ? 'bg-white/20 text-white' : 'bg-[#EBF7F7] text-teal-600'}`}>
                    {renderIcon(service.icon, "w-4 h-4")}
                  </span>
                  <span className="truncate">{service.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Panel Visualizing Service Specifics inside beautiful Bento card */}
          <div 
            id={`service-pane-${selectedService.id}`} 
            className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 relative min-h-[420px] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
          >
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100/60 text-teal-800 flex items-center justify-center">
                    {renderIcon(selectedService.icon, "w-6 h-6")}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl text-slate-800">{selectedService.title}</h3>
                    <p className="text-xs text-teal-600 font-bold font-mono">EYE DISCIPLINE: {selectedService.id.toUpperCase()}</p>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/40 text-right">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Estimated Fee</span>
                  <span className="text-sm font-black text-teal-700">{selectedService.priceRange}</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {selectedService.description}
              </p>

              <h4 className="font-display font-black text-slate-900 text-sm tracking-wider uppercase mb-3">Clinical Procedure Assets Included:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {selectedService.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-600 gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                    <span className="leading-normal">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 align-middle">
                  <LucideIcons.Clock className="w-4 h-4 text-slate-400" />
                  Duration: ~{selectedService.duration}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 align-middle">
                  <LucideIcons.Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold/20" />
                  Fast recovery
                </span>
              </div>

              <button
                id={`service-book-cta-${selectedService.id}`}
                onClick={() => onSelectServiceForBooking(selectedService.id)}
                className="three-d-button w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-xs font-bold px-6 py-3.5 rounded-xl cursor-pointer"
              >
                <LucideIcons.CalendarCheck className="w-4 h-4" />
                Book Specialized {selectedService.title}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
