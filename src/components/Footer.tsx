import { useState } from 'react';
import { BRANCHES, DIRECT_HELPLINE } from '../data';
import { Eye, Phone, MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [activeBranchId, setActiveBranchId] = useState(BRANCHES[0].id);

  const selectedBranch = BRANCHES.find(b => b.id === activeBranchId) || BRANCHES[0];

  return (
    <footer id="main-app-footer" className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800">
      
      {/* Interactive Floor Finder & Campus Map Directions */}
      <div id="footer-map-container" className="bg-slate-950 border-b border-slate-800 py-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-teal-400">FIND OUR NEAREST CHamber</span>
              <h3 className="font-display font-extrabold text-2xl text-white">Chamber Floor Finder & Address Guide</h3>
              <p className="text-xs text-slate-400">
                Alo Eye Care spans four premium clinic nodes in Bangladesh. Select a workspace node to view exact floor instructions, parking options, and contact dials:
              </p>
              
              <div className="flex flex-col gap-2.5 pt-2">
                {BRANCHES.map(branch => (
                  <button
                    key={branch.id}
                    id={`map-branch-tab-${branch.id}`}
                    onClick={() => setActiveBranchId(branch.id)}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all text-left flex items-center justify-between ${
                      activeBranchId === branch.id
                        ? 'bg-teal-500/10 text-teal-300 border-teal-500/40 shadow-sm'
                        : 'border-slate-800 hover:bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span>{branch.name}</span>
                    <MapPin className={`w-3.5 h-3.5 ${activeBranchId === branch.id ? 'text-teal-400 animate-bounce' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Floor locator card simulating clinical floor map */}
            <div className="lg:col-span-8 bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[290px]">
              
              <div className="absolute top-0 right-0 w-44 h-44 bg-teal-505 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12 rounded-full border-4 border-dashed border-teal-400"></div>

              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white text-base leading-snug">{selectedBranch.name}</h4>
                      <p className="text-[10px] text-teal-400 font-mono uppercase font-bold tracking-wider">CHAMBER STATION NODE</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Direct Line</span>
                    <a href={`tel:${selectedBranch.phone}`} className="text-sm font-bold text-white hover:underline">{selectedBranch.phone}</a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5"></span>
                    <p><strong>Physical Address:</strong> {selectedBranch.address}</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5"></span>
                    <p><strong>Operating Schedule:</strong> {selectedBranch.hours}</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5"></span>
                    <p><strong>Transit/Parking Notice:</strong> Lift access and parking is available on basement floor level -1 and -2. Escalators operate to level 4.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500 flex-wrap gap-2">
                <span>Emergency clinical access: 24/7 lobby open</span>
                <a href={`tel:${DIRECT_HELPLINE}`} className="text-teal-400 font-bold hover:underline">Direct Helpline Dial: {DIRECT_HELPLINE}</a>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Main Footer Links & Brand info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Logo brand & about */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-teal-500 text-white flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-white text-xl tracking-wide">ALO EYE CARE</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Alo Eye Care Bangladesh (aloeyecarebd.com) is a private, modern eye diagnostics and ophthalmic surgical network. Experience microscopic stitchless Phaco surgery, Femto-LASIK vision freedom, and expert pediatric eye squint procedures in Dhaka, Chattogram & Sylhet.
            </p>

            <div className="flex items-center gap-2.5 text-[11px] text-teal-400 bg-slate-800/40 p-3 rounded-lg w-fit border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Approved by Ministry of Health, Bangladesh</span>
            </div>
          </div>

          {/* Quick links navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide">Service Sections</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('services')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Phaco Cataract Surgery</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Laser FemtoLASIK Correction</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Pediatric Strabismus Squint Clinic</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Diabetic OCT Retinal Evaluation</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Glaucoma Nerve Tension Fitting</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide">Wellness Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('vision-test')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Visual Acuity Simulator</button></li>
              <li><button onClick={() => onNavigate('vision-test')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Astigmatism Dial Clock</button></li>
              <li><button onClick={() => onNavigate('vision-test')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Ishihara Color Matrix Test</button></li>
              <li><button onClick={() => onNavigate('vision-test')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">20-20-20 Fatigue Tracker</button></li>
            </ul>
          </div>

          {/* Contact lines */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide">Corporate Office</h4>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Level 4, Navana Tower, Rd 8/A, Dhanmondi R/A, Dhaka-1209, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${DIRECT_HELPLINE}`} className="hover:text-teal-400 font-bold">{DIRECT_HELPLINE} (BD Care)</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:office@aloeyecarebd.com" className="hover:text-teal-400">office@aloeyecarebd.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Daily 9:00 AM - 9:00 PM (Except Friday)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Digital Copyright details */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Alo Eye Care Bangladesh (aloeyecarebd.com). All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors pointer-default">Clinical terms compliance</span>
            <span className="hover:text-slate-400 transition-colors pointer-default">Privacy policy</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
