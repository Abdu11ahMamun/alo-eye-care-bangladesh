import { useState, useEffect } from 'react';
import { Phone, Clock, Menu, X, Calendar, ChevronDown } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { DIRECT_HELPLINE, BRANCHES } from '../data';
import { Lang } from '../types';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const NAV = [
  { en: 'সেবাসমূহ',    enFull: 'Services',    section: 'services'    },
  { en: 'দৃষ্টি পরীক্ষা', enFull: 'Vision Test', section: 'vision-test' },
  { en: 'বিশেষজ্ঞ',     enFull: 'Specialists', section: 'doctors'     },
  { en: 'শাখা',         enFull: 'Branches',    section: 'branches',  hasDrop: true },
];

export default function Navbar({ onNavigate, activeSection, lang, setLang }: NavbarProps) {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [dropOpen,   setDropOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (s: string) => { onNavigate(s); setMenuOpen(false); setDropOpen(false); };
  const label = (bn: string, en: string) => lang === 'bn' ? bn : en;

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────────────────── */}
      <div style={{ background: 'var(--brand-navy)', color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', height: 32, display: 'flex', alignItems: 'center' }} className="hidden-mobile">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Clock size={12} style={{ color: 'var(--brand-cyan)' }} />
              <span className="bn">{label('শনি – বৃহস্পতি: সকাল ৯টা – রাত ৯টা', 'Sat – Thu: 9 AM – 9 PM')}</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>
            <span className="bn">{label('চট্টগ্রাম · ফেনী', 'Chattogram · Feni')}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>{label('BMDC নিবন্ধিত', 'BMDC Registered')}</span>
            <a href={`tel:${DIRECT_HELPLINE}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--brand-cyan)', fontWeight: 700, textDecoration: 'none', fontSize: '0.72rem' }}>
              <Phone size={11} />{DIRECT_HELPLINE}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main header ──────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        borderBottom: '1px solid var(--brand-border)',
        boxShadow: scrolled ? '0 4px 24px rgba(13,31,110,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        {/* announcement bar spacer on desktop */}
        <div className="hidden-mobile" style={{ height: 32 }} />

        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

            {/* Logo */}
            <button onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} aria-label="আলো আই কেয়ার">
              <img src={logoImg} alt="Alo Eye Care Logo" style={{ height: 44, width: 'auto', display: 'block' }} />
              <div style={{ lineHeight: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                  <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: 700, fontSize: '1.35rem', color: 'var(--brand-navy)', letterSpacing: '-0.01em' }}>আলো</span>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--brand-blue)', letterSpacing: '0.05em' }}>EYE CARE</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--brand-text-muted)', fontStyle: 'italic', marginTop: '1px', letterSpacing: '0.02em' }}>
                  For your Eyes only
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }} className="desk-nav">
              {NAV.map(item => {
                const active = activeSection === item.section || (item.section === 'branches' && activeSection === 'branches');
                if (item.hasDrop) return (
                  <div key={item.section} style={{ position: 'relative' }}>
                    <button onClick={() => setDropOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', background: active ? 'var(--brand-blue-pale)' : 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: active ? 600 : 500, color: active ? 'var(--brand-blue)' : 'var(--brand-text)', borderRadius: '0.375rem', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                      <span className="bn">{label(item.en, item.enFull)}</span>
                      <ChevronDown size={13} style={{ transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                    </button>
                    {dropOpen && (
                      <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#fff', border: '1px solid var(--brand-border)', borderRadius: '0.75rem', padding: '0.5rem', boxShadow: 'var(--shadow-card-hover)', minWidth: 260, zIndex: 60 }}>
                        {BRANCHES.map(b => (
                          <button key={b.id} onClick={() => { go('branches'); setDropOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.625rem 0.875rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.5rem', transition: 'background 0.15s', fontFamily: 'var(--font-body)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-blue-pale)'}
                            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'none'}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-navy)' }} className="bn">{lang === 'bn' ? b.nameBn : b.name}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--brand-text-muted)', marginTop: '1px' }} className="bn">{lang === 'bn' ? b.addressBn : b.address}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
                return (
                  <button key={item.section} onClick={() => go(item.section)} style={{ padding: '0.4rem 0.75rem', background: active ? 'var(--brand-blue-pale)' : 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: active ? 600 : 500, color: active ? 'var(--brand-blue)' : 'var(--brand-text)', borderRadius: '0.375rem', borderBottom: active ? '2px solid var(--brand-blue)' : '2px solid transparent', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                    <span className="bn">{label(item.en, item.enFull)}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.35rem 0.75rem', border: '1.5px solid var(--brand-border)', borderRadius: '999px', background: '#fff', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue)', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--brand-blue)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-blue-pale)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--brand-border)'; (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}>
                <span className="bn" style={{ opacity: lang === 'bn' ? 1 : 0.4 }}>বাং</span>
                <span style={{ color: 'var(--brand-border)' }}>|</span>
                <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
              </button>

              <button onClick={() => go('booking')} className="desk-nav" style={{ display: 'none', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-blue)', color: '#fff', border: 'none', borderRadius: '0.625rem', padding: '0.625rem 1.25rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'var(--shadow-btn)', fontFamily: 'var(--font-body)' }}>
                <Calendar size={15} />
                <span className="bn">{label('অ্যাপয়েন্টমেন্ট', 'Book Now')}</span>
              </button>

              <button onClick={() => setMenuOpen(v => !v)} className="mob-menu-btn" style={{ display: 'none', padding: '0.5rem', background: 'none', border: '1.5px solid var(--brand-border)', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--brand-navy)' }}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--brand-border)', background: '#fff', padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
              {NAV.map(item => (
                <button key={item.section} onClick={() => go(item.section)} style={{ textAlign: 'left', padding: '0.75rem 1rem', background: activeSection === item.section ? 'var(--brand-blue-pale)' : 'none', border: 'none', cursor: 'pointer', borderRadius: '0.5rem', fontSize: '0.95rem', fontWeight: activeSection === item.section ? 600 : 500, color: activeSection === item.section ? 'var(--brand-blue)' : 'var(--brand-text)', borderLeft: activeSection === item.section ? '3px solid var(--brand-blue)' : '3px solid transparent', fontFamily: 'var(--font-body)' }}>
                  <span className="bn">{label(item.en, item.enFull)}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: '0.875rem', background: 'var(--brand-blue-pale)', borderRadius: '0.625rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }} className="bn">{label('জরুরি হেল্পলাইন', 'Emergency Helpline')}</div>
              <a href={`tel:${DIRECT_HELPLINE}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-blue)', fontWeight: 700, textDecoration: 'none' }}><Phone size={16} />{DIRECT_HELPLINE}</a>
            </div>
            <button onClick={() => go('booking')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'var(--brand-blue)', color: '#fff', border: 'none', borderRadius: '0.625rem', padding: '0.875rem', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              <Calendar size={16} />
              <span className="bn">{label('অ্যাপয়েন্টমেন্ট বুক করুন', 'Book Appointment')}</span>
            </button>
          </div>
        )}
      </header>

      {/* Spacers */}
      <div style={{ height: 100 }} className="hidden-mobile" />
      <div style={{ height: 68 }} className="show-mobile-only" />

      <style>{`
        @media(min-width:768px){.desk-nav{display:flex!important}.mob-menu-btn{display:none!important}.hidden-mobile{display:flex!important}.show-mobile-only{display:none!important}}
        @media(max-width:767px){.desk-nav{display:none!important}.mob-menu-btn{display:flex!important}.hidden-mobile{display:none!important}.show-mobile-only{display:block!important}}
      `}</style>
    </>
  );
}