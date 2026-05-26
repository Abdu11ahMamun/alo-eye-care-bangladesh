import { useState, useEffect } from 'react';
import { Eye, Phone, MapPin, Calendar, Clock, Menu, X } from 'lucide-react';
import { DIRECT_HELPLINE } from '../data';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', section: 'home' },
    { label: 'Eye Care Services', section: 'services' },
    { label: 'Interactive Vision Check', section: 'vision-test' },
    { label: 'Our Specialists', section: 'doctors' },
  ];

  const handleItemClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-teal-100 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      {/* Top emergency micro-bar */}
      <div id="top-announcement-bar" className="bg-gradient-to-r from-teal-800 to-cyan-800 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 font-sans">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-300" />
              Hours: Sat - Thu: 9:00 AM - 9:00 PM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-300" />
              Dhaka, Chattogram, Sylhet
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-teal-200">Registered with Bangladesh Medical & Dental Council (BMDC)</span>
            <a href={`tel:${DIRECT_HELPLINE}`} id="topbar-phone-link" className="flex items-center gap-1 hover:text-cyan-300 transition-colors font-medium">
              <Phone className="w-3 h-3 text-cyan-300 animate-pulse" />
              Emergency Optic Line: {DIRECT_HELPLINE}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand with Ophthalmic Icon Geometry */}
          <div 
            id="brand-logo-container"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleItemClick('home')}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
              <Eye className="w-6 h-6" />
              <div className="absolute inset-0.5 rounded-full border border-white/30 animate-spin-slow"></div>
              {/* Pulsing light aura representing "Alo" */}
              <span className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-sm group-hover:scale-110 transition-all"></span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-2xl tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                  ALO
                </span>
                <span className="font-display font-medium text-xs text-teal-600 tracking-wider">
                  EYE CARE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 tracking-widest font-mono font-bold leading-none uppercase">
                aloeyecarebd.com
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-routing-nav" className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.section}
                id={`nav-link-${item.section}`}
                onClick={() => handleItemClick(item.section)}
                className={`text-sm font-semibold tracking-wide transition-all py-1.5 border-b-2 ${
                  activeSection === item.section
                    ? 'text-teal-600 border-teal-500 font-bold'
                    : 'text-slate-600 border-transparent hover:text-teal-500 hover:border-teal-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Touch-safe Book Button with 3D tactile styling */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-booking-btn"
              onClick={() => handleItemClick('booking')}
              className="three-d-button flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-white font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-cyan-100" />
              Book Appointment
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href={`tel:${DIRECT_HELPLINE}`}
              id="mobile-phone-shortcut-btn"
              className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg flex items-center justify-center"
              title="Call Helpline"
            >
              <Phone className="w-5 h-5 animate-pulse" />
            </a>
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-overlay" className="md:hidden bg-white/95 backdrop-blur-md border-b border-teal-100 fixed inset-x-0 top-[calc(100%-1px)] z-40 py-6 px-4 shadow-xl transition-all">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.section}
                id={`mobile-nav-link-${item.section}`}
                onClick={() => handleItemClick(item.section)}
                className={`text-left text-base font-semibold py-2.5 px-4 rounded-xl transition-all ${
                  activeSection === item.section
                    ? 'text-teal-700 bg-teal-50/80 border-l-4 border-teal-500'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <hr className="border-teal-50 my-2" />
            
            <div className="px-4 py-2 bg-slate-50 rounded-xl space-y-1">
              <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Helpdesk Helpline</p>
              <a href={`tel:${DIRECT_HELPLINE}`} id="mobile-drawer-hotline" className="flex items-center gap-2 text-teal-600 font-bold text-sm">
                <Phone className="w-4 h-4" />
                {DIRECT_HELPLINE}
              </a>
            </div>

            <button
              id="mobile-drawer-booking-btn"
              onClick={() => handleItemClick('booking')}
              className="three-d-button w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-semibold py-3 rounded-xl"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
