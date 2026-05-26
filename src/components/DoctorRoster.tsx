import { useState } from 'react';
import { DOCTORS } from '../data';
import { Doctor } from '../types';
import { Star, Award, Calendar, Search, DollarSign, ArrowRight } from 'lucide-react';

interface DoctorRosterProps {
  onSelectDoctor: (doctor: Doctor) => void;
}

export default function DoctorRoster({ onSelectDoctor }: DoctorRosterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Cataract & Cornea', 'Pediatric & Squint', 'Vitreo-Retina', 'Glaucoma'];

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Quick classification mapping
    let fitsSpecialty = true;
    if (selectedSpecialty !== 'All') {
      if (selectedSpecialty === 'Cataract & Cornea') {
        fitsSpecialty = doc.specialty.includes('Cataract') || doc.specialty.includes('Cornea') || doc.specialty.includes('Refractive');
      } else if (selectedSpecialty === 'Pediatric & Squint') {
        fitsSpecialty = doc.specialty.includes('Pediatric') || doc.specialty.includes('Squint');
      } else if (selectedSpecialty === 'Vitreo-Retina') {
        fitsSpecialty = doc.specialty.includes('Retina') || doc.specialty.includes('Laser');
      } else if (selectedSpecialty === 'Glaucoma') {
        fitsSpecialty = doc.specialty.includes('Glaucoma');
      }
    }
    return matchesSearch && fitsSpecialty;
  });

  return (
    <section
      id="doctors-section"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-teal-200/10 filter blur-[90px] focal-ray"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Roster Header */}
        <div id="doctors-intro-header" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-cyan-600" />
            Leading Cornea & Refractive Authority
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Consult Our Senior Ophthalmic Microsurgeons
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every specialist at Alo Eye Care is registered with the Bangladesh Medical & Dental Council (BMDC) with substantial fellowships from internationally acclaimed visual clinics.
          </p>
        </div>

        {/* Searching & Filter Switchbox - Stylized as a beautiful Bento filter row */}
        <div id="roster-query-workspace" className="mb-12 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 text-left">
          
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="doctor-search-input"
              type="text"
              placeholder="Search surgeon name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 tracking-wide font-sans shadow-inner"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {specialties.map((spec) => (
              <button
                key={spec}
                id={`specialty-filter-btn-${spec.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedSpecialty(spec)}
                className={`py-2 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  selectedSpecialty === spec
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

        </div>

        {/* Doctors Layout Grid structured as responsive bento slots */}
        <div id="doctors-roster-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              id={`doctor-card-${doc.id}`}
              className="bg-white rounded-[2rem] p-6 border border-slate-200/80 hover:border-teal-500/30 flex flex-col justify-between text-left h-full group shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                
                {/* Doctor Avatar with styled frames */}
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-white bg-[#E6F3F3] shadow-md mb-5 mx-auto lg:mx-0">
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Small availability green circle */}
                  <span className="absolute bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" title="Active in surgery chamber"></span>
                </div>

                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="flex items-center gap-0.5 text-amber-500 text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    {doc.rating}
                  </span>
                  <span className="text-[11px] text-slate-400">({doc.reviewsCount} reviews)</span>
                </div>

                <h3 className="font-display font-extrabold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
                  {doc.name}
                </h3>
                
                <p className="text-[11px] font-mono text-teal-600 font-bold uppercase tracking-wider mt-1 mb-2">
                  {doc.specialty}
                </p>

                <p className="text-[11px] text-slate-500 leading-normal mb-4 font-sans line-clamp-3">
                  {doc.degree}
                </p>

                <hr className="border-slate-100 my-4" />

                <div className="space-y-2">
                  <div className="flex items-center text-[11px] text-slate-600 gap-2">
                    <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate leading-none">Days: {doc.availableDays.slice(0, 3).join(', ')}...</span>
                  </div>
                  <div className="flex items-center text-[11px] text-slate-600 gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="font-black text-slate-800 leading-none">Consultation Fee: ৳{doc.bdtFees}</span>
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-2">
                <button
                  id={`doctor-book-btn-${doc.id}`}
                  onClick={() => onSelectDoctor(doc)}
                  className="w-full bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-100 text-teal-700 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 group-hover:border-teal-500/20"
                >
                  Request Slot
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <div className="col-span-full bg-slate-50 p-12 text-center rounded-2xl border border-dashed border-slate-200">
              <span className="text-3xl block mb-2">🔍</span>
              <h4 className="font-display font-bold text-slate-800 text-sm">No specialists match your filter criteria</h4>
              <p className="text-xs text-slate-500 mt-1">Try searching for other tags like Cataract, Cornea, Retina, or Glaucoma.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
