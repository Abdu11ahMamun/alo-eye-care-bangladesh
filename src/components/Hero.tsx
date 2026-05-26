import { ArrowRight, Eye, Sparkles, Award, ShieldCheck, Heart } from 'lucide-react';
import heroImg from '../assets/images/alo_eyecare_hero_1779739508863.png';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen bg-slate-50 pt-32 pb-16 overflow-hidden flex items-center medical-grid"
    >
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-300 to-teal-200 opacity-20 filter blur-[90px] focal-ray z-0"></div>
      <div className="absolute bottom-10 left-[5%] w-[350px] h-[350px] rounded-full bg-amber-200 opacity-25 filter blur-[100px] focal-ray z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main 12-column Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Pitches - Col Span 12 on mobile, 7 on desktop */}
          <div 
            id="hero-main-bento" 
            className="col-span-12 lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300"
          >
            {/* Background elements */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>

            <div className="space-y-6 z-10">
              {/* Trust badge with bento glass styling */}
              <div 
                id="trust-badge" 
                className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-100"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                <span className="font-display">
                  Top Rated Eye Care Network in BD
                </span>
              </div>

              {/* Powerful display heading */}
              <h1 id="hero-display-title" className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-5xl text-slate-900 leading-[1.1] tracking-tight text-left">
                Your Vision Is Our <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 underline decoration-teal-100/60">Brightest</span> Priority.
              </h1>

              {/* Clear medical description */}
              <p id="hero-description" className="text-sm sm:text-base text-slate-500 max-w-xl font-normal leading-relaxed text-left">
                Alo Eye Care is a pioneering, ophthalmologist-led diagnostic and microscopic surgical network. Experience world-class stitchless cataract Phacoemulsification and custom laser correction inside our sterile, high-precision clinics in Dhaka, Chattogram and Sylhet.
              </p>
            </div>

            {/* CTA Group with tactile bento buttons */}
            <div id="hero-cta-group" className="flex flex-col sm:flex-row gap-4 mt-8 z-10">
              <button
                id="hero-book-now-btn"
                onClick={() => onNavigate('booking')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5 text-teal-300 sm:animate-pulse" />
              </button>
              
              <button
                id="hero-test-now-btn"
                onClick={() => onNavigate('vision-test')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-8 py-4 rounded-2xl border border-slate-200 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-teal-500" />
                Test Vision Instantly
              </button>
            </div>
          </div>

          {/* Right Column Stack for Bento: Stats & Image suite - Col Span 12 on mobile, 5 on desktop */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Stats Bento Card: Colored block matching design template */}
            <div 
              id="hero-stats-bento" 
              className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative z-10 text-left">
                <h3 className="text-lg font-bold mb-1">Ready for your checkup?</h3>
                <p className="text-teal-100 text-xs">Average clinical wait time: <span className="font-bold text-white">12 minutes</span></p>
              </div>

              <div className="flex justify-between items-end relative z-10 mt-8">
                <div className="text-left">
                  <div className="text-4xl font-black">45k+</div>
                  <div className="text-[10px] text-teal-100 uppercase tracking-wider font-bold">Happy Patients Saved</div>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30 text-white shadow-inner">
                  <Heart className="w-6 h-6 fill-white/10" />
                </div>
              </div>

              {/* Decorative faint background eye graphic */}
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Eye className="w-32 h-32" />
              </div>
            </div>

            {/* Clinical Ocular suite card layout with image */}
            <div 
              id="hero-image-bento" 
              className="bg-white rounded-[2.5rem] border border-slate-200/80 p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
            >
              
              {/* Image suite with convex aesthetics */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-100 bg-teal-950">
                <img
                  src={heroImg}
                  alt="Alo Eye Care Diagnostic and Examination Suite, Dhaka"
                  className="w-full h-full object-cover brightness-[0.9]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 scan-line pointer-events-none mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Floating validation target indicator overlay */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold tracking-wider text-slate-800 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Dhaka Suite Room 402
                </div>
              </div>

              {/* Technical Certifications micro-indicators inside bento card footer */}
              <div id="hero-bento-card-footer" className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 mt-4 text-left">
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-800">ISO Labs</h4>
                  <p className="text-[9px] text-slate-400 font-mono">100% Sterile</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-800">10+ Surgeons</h4>
                  <p className="text-[9px] text-slate-400 font-mono">BMDC Reg.</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-teal-700">৳0 MOCK</h4>
                  <p className="text-[9px] text-slate-400 font-mono">Real Bookings</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
