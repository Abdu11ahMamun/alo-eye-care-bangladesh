import { useEffect, useRef } from 'react';
import { ArrowRight, Phone, Calendar, ShieldCheck, Award, Eye, Star } from 'lucide-react';
import heroImg from '../assets/images/alo_eyecare_hero_1779739508863.png';
import { STATS, DIRECT_HELPLINE } from '../data';
import { Lang } from '../types';

interface HeroProps { onNavigate: (s: string) => void; lang: Lang; }

/* Bengali letter pattern — matches brochure exactly */
function BnPattern() {
  const chars = [
    { ch: 'অ',  x: 73, y: 8,  s: 7.5, r: -15, o: 0.07 },
    { ch: 'আ',  x: 88, y: 22, s: 5.5, r: 20,  o: 0.06 },
    { ch: 'ক',  x: 79, y: 42, s: 9,   r: -8,  o: 0.09 },
    { ch: 'চ',  x: 93, y: 65, s: 6.5, r: 12,  o: 0.07 },
    { ch: 'ড',  x: 83, y: 82, s: 4.5, r: -20, o: 0.05 },
    { ch: 'ব',  x: 67, y: 14, s: 7,   r: 5,   o: 0.06 },
    { ch: 'ম',  x: 59, y: 36, s: 10,  r: -10, o: 0.08 },
    { ch: 'র',  x: 76, y: 58, s: 5.5, r: 18,  o: 0.06 },
    { ch: 'স',  x: 65, y: 75, s: 8,   r: -5,  o: 0.08 },
    { ch: 'হ',  x: 86, y: 93, s: 6,   r: 15,  o: 0.05 },
    { ch: 'ন',  x: 96, y: 10, s: 8.5, r: -25, o: 0.07 },
    { ch: 'ত',  x: 56, y: 52, s: 5,   r: 8,   o: 0.05 },
    { ch: 'প',  x: 71, y: 28, s: 11,  r: -12, o: 0.09 },
    { ch: 'দ',  x: 91, y: 48, s: 6,   r: 22,  o: 0.06 },
    { ch: 'ল',  x: 61, y: 88, s: 7.5, r: -18, o: 0.07 },
    { ch: 'ই',  x: 81, y: 70, s: 4,   r: 10,  o: 0.05 },
    { ch: 'ো', x: 54, y: 5,  s: 6.5, r: -8,  o: 0.06 },
    { ch: 'ঘ',  x: 98, y: 35, s: 5,   r: 14,  o: 0.05 },
    { ch: 'জ',  x: 62, y: 65, s: 8,   r: -6,  o: 0.07 },
    { ch: 'ঠ',  x: 77, y: 93, s: 6,   r: 20,  o: 0.05 },
  ];
  return (
    <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {chars.map((c, i) => (
        <text key={i} x={c.x} y={c.y} fontSize={c.s} fill="#fff" fillOpacity={c.o}
          fontFamily="Hind Siliguri, sans-serif" fontWeight="700"
          transform={`rotate(${c.r} ${c.x} ${c.y})`}
          textAnchor="middle" dominantBaseline="middle" style={{ userSelect: 'none' }}>
          {c.ch}
        </text>
      ))}
    </svg>
  );
}

export default function Hero({ onNavigate, lang }: HeroProps) {
  const t = (bn: string, en: string) => lang === 'bn' ? bn : en;
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const fn = () => { el.style.transform = `translateY(${window.scrollY * 0.16}px)`; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section id="hero-section" style={{ background: 'var(--brand-navy)', position: 'relative', overflow: 'hidden' }}>

      {/* ── Bengali letter pattern (brochure-style) ──────────────────── */}
      <BnPattern />

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '52px 52px' }} />

      {/* Glow blobs */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '4.5rem' }}>
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'center' }} className="hero-inner-grid">

          {/* LEFT */}
          <div>
            {/* Trust pill */}
            <div className="anim-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(244,123,32,0.15)', border: '1px solid rgba(244,123,32,0.4)', borderRadius: '999px', padding: '0.35rem 1.1rem', marginBottom: '2rem' }}>
              <Star size={11} style={{ color: 'var(--brand-orange)', fill: 'var(--brand-orange)' }} />
              <span className="bn" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-orange)' }}>
                {t('BMDC নিবন্ধিত · চট্টগ্রাম ও ফেনী', 'BMDC Registered · Chattogram & Feni')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="anim-fade-up-2" style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: 'clamp(2.5rem, 5.5vw, 4rem)', fontWeight: 800, lineHeight: 1.08, color: '#fff', marginBottom: '1.375rem', letterSpacing: '-0.025em' }}>
              <span className="bn">{t('আপনার দৃষ্টিশক্তিই', 'Your Vision Is Our')}</span>
              <br />
              <em style={{ color: 'var(--brand-orange)', fontStyle: 'italic', display: 'block', marginTop: '0.1em' }}>
                <span className="bn">{t('আমাদের সর্বোচ্চ অগ্রাধিকার।', 'Brightest Priority.')}</span>
              </em>
            </h1>

            <p className="anim-fade-up-3 bn" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '520px' }}>
              {t('চট্টগ্রাম ও ফেনীতে বিশেষজ্ঞ চক্ষু চিকিৎসা কেন্দ্র — ছানি অপারেশন, বাঁকা চোখ, গ্লুকোমা, নেত্রনালী অপারেশন ও আরও সেবা।', 'Expert ophthalmologist-led eye care in Chattogram & Feni — cataract surgery, squint correction, glaucoma, DCR & more.')}
            </p>

            {/* CTAs */}
            <div className="anim-fade-up-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '3rem', animationDelay: '0.35s' }}>
              <button onClick={() => onNavigate('booking')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-orange)', color: '#fff', border: 'none', borderRadius: 'var(--radius-btn)', padding: '0.95rem 1.875rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(244,123,32,0.45)', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 28px rgba(244,123,32,0.55)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(0)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 4px 20px rgba(244,123,32,0.45)';}}>
                <Calendar size={18} />
                <span className="bn">{t('অ্যাপয়েন্টমেন্ট বুক করুন', 'Book Appointment')}</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => onNavigate('vision-test')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 'var(--radius-btn)', padding: '0.95rem 1.75rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.16)'}
                onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.1)'}>
                <Eye size={18} />
                <span className="bn">{t('বিনামূল্যে দৃষ্টি পরীক্ষা', 'Free Vision Test')}</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="anim-fade-up-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', animationDelay: '0.45s' }}>
              {[
                { Icon: ShieldCheck, en: 'ISO Sterile OT',    bn: 'ISO জীবাণুমুক্ত OT' },
                { Icon: Award,       en: '45,000+ Patients',  bn: '৪৫,০০০+ রোগী চিকিৎসা' },
                { Icon: Eye,         en: '10+ Years Service', bn: '১০+ বছর অভিজ্ঞতা' },
              ].map(({ Icon, en, bn: bnText }) => (
                <div key={en} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', padding: '0.3rem 0.875rem', fontSize: '0.73rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
                  <Icon size={12} style={{ color: 'var(--brand-cyan)' }} />
                  <span className="bn">{t(bnText, en)}</span>
                </div>
              ))}
            </div>

            <a href={`tel:${DIRECT_HELPLINE}`} className="anim-fade-up-3" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.58)', marginTop: '1.5rem', fontSize: '0.9rem', fontWeight: 500, animationDelay: '0.5s' }}>
              <Phone size={14} style={{ color: 'var(--brand-cyan)' }} />
              {DIRECT_HELPLINE}
            </a>
          </div>

          {/* RIGHT — image with depth */}
          <div className="anim-fade-up-2" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: '110%', height: '110%', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.07)', zIndex: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -40, right: -40, width: '125%', height: '125%', borderRadius: '2rem', border: '1px dashed rgba(255,255,255,0.04)', zIndex: 0, pointerEvents: 'none' }} />

            <div style={{ borderRadius: '1.25rem', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', zIndex: 1 }}>
              <div ref={imgRef} style={{ overflow: 'hidden' }}>
                <img src={heroImg} alt={t('আলো আই কেয়ার ক্লিনিক','Alo Eye Care clinic')} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block', transition: 'transform 0.1s linear' }} />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,29,94,0.82) 0%, rgba(11,29,94,0.15) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.52)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }} className="bn">{t('প্রধান কার্যালয়','Head Office')}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }} className="bn">{t('চট্টগ্রাম','Chattogram')}</div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '999px', padding: '0.35rem 0.875rem', fontSize: '0.72rem', fontWeight: 600, color: '#fff' }}>
                  <span className="pulse-dot" />
                  <span className="bn">{t('এখন খোলা','Open Now')}</span>
                </div>
              </div>
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }} className="bn">
                {t('১০+ বছর অভিজ্ঞতা','10+ Years')}
              </div>
            </div>

            {/* Stat mini cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginTop: '1rem', position: 'relative', zIndex: 1 }}>
              {[
                { val: '৬+', valEn: '6+', label: 'বিশেষায়িত সেবা',  labelEn: 'Specialised Services' },
                { val: '৪',  valEn: '4',  label: 'বিশেষজ্ঞ সার্জন', labelEn: 'Expert Surgeons' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '0.875rem', padding: '1.125rem 1.25rem', transition: 'background 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background='rgba(255,255,255,0.14)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background='rgba(255,255,255,0.08)'}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.75rem,3vw,2.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1 }} className="bn">{lang === 'bn' ? s.val : s.valEn}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.72)', marginTop: '0.25rem', fontWeight: 500 }} className="bn">{lang === 'bn' ? s.label : s.labelEn}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.22)', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STATS.length},1fr)` }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ padding: '1.5rem 1rem', textAlign: 'center', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', transition: 'background 0.2s' }}
                onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background='transparent'}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1 }} className="bn">{lang === 'bn' ? s.valueBn : s.value}</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.35rem', fontWeight: 500 }} className="bn">{lang === 'bn' ? s.labelBn : s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(min-width:900px){.hero-inner-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}