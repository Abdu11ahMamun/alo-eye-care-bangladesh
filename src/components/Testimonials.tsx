import { Star, ShieldCheck, Heart, Sparkles, Building2 } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      author: 'Afsana Rahman',
      city: 'Dhanmondi, Dhaka',
      treatment: 'Advanced Phaco Cataract Surgery',
      doctor: 'Prof. Dr. Mazharul Alam',
      quote: "My elderly father had severe visual blurring from 80% opacity cataract lenses cataloged. The stitchless Phaco surgery inside the Dhanmondi suite was painless & finished in 15 minutes! He reads the newspaper now without glasses.",
      rating: 5,
    },
    {
      id: 2,
      author: 'Tanvir Hasan',
      city: 'GEC, Chattogram',
      treatment: 'Blade-Free FemtoLASIK',
      doctor: 'Dr. Shamsul Haque Manik',
      quote: "I had spectacles -5.0 diopters power since school. Restored my vision to 100% crisp 6/6 acuity within 24 hours of laser exposure. Standard driver vision test approved instantly. Excellent 10/10 care!",
      rating: 5,
    },
    {
      id: 3,
      author: 'Dr. Farhana Chowdhury (Parent)',
      city: 'Zindabazar, Sylhet',
      treatment: 'Pediatric Squint Orthokeratology',
      doctor: 'Dr. Nusrat Jahan Chowdhury',
      quote: "As a doctor myself, I was highly searching for specialized pediatric squint correction for our 5-year-old daughter. Dr. Nusrat's child-friendly chamber was wonderful. No fear, excellent diagnosis and non-surgical tracking loops.",
      rating: 5,
    }
  ];

  return (
    <section id="testimonials-section" className="py-24 bg-white relative overflow-hidden">
      {/* 3D background visual glow representing Alo (light) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-500/5 filter blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div id="testimonials-header" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            Visions Restored: Patient Stories
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Loved By 45,000+ Pacified Patients In Bangladesh
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We judge our craft solely based on clinical results and returned visual clarity. Read authentic experiences from our three major surgical chambers:
          </p>
        </div>

        {/* Reviews Grid Layout structured as aligned bento containers */}
        <div id="reviews-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16 text-left">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 shadow-md flex flex-col justify-between h-full hover:shadow-xl hover:border-teal-500/10 transition-all duration-300 hover:scale-[1.01]"
            >
              <div>
                
                <div className="flex gap-1 mb-4 select-none">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{rev.quote}"
                </p>

              </div>

              <div>
                <hr className="border-slate-200/60 my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-slate-950 text-xs sm:text-sm">{rev.author}</h4>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wide">{rev.city}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-1 rounded font-bold font-mono">
                      {rev.treatment.split(' ').shift()} Unit
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Accreditation Logos with beautiful grid border */}
        <div id="clinic-credentials" className="pt-12 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-8 items-center text-center">
          
          <div className="flex flex-col items-center space-y-1">
            <Building2 className="w-6 h-6 text-slate-400" />
            <h4 className="font-display font-bold text-xs text-slate-800">BMDC Certified Clinics</h4>
            <p className="text-[10px] text-slate-500">Fully recognized medical operations</p>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-teal-600" />
            <h4 className="font-display font-bold text-xs text-slate-800">100% Sterile OT Class 10,000</h4>
            <p className="text-[10px] text-slate-500">Advanced microbial air filtration filters</p>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <Sparkles className="w-6 h-6 text-brand-gold fill-brand-gold/15" />
            <h4 className="font-display font-bold text-xs text-slate-800">ISO 9001 Alignment</h4>
            <p className="text-[10px] text-slate-500">Strict safety parameters in eye operations</p>
          </div>

        </div>

      </div>
    </section>
  );
}
