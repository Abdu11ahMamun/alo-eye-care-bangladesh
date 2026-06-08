import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../data';
import { Lang } from '../types';
import { useReveal } from '../hooks/useReveal';

interface ServicesProps { onSelectServiceForBooking: (id: string) => void; lang: Lang; }

export default function Services({ onSelectServiceForBooking, lang }: ServicesProps) {
  const [activeId, setActiveId] = useState('cataract');
  const ref = useReveal();
  const t = (en: string, bn: string) => lang === 'bn' ? bn : en;
  const selected = SERVICES.find(s => s.id === activeId) || SERVICES[0];
  const renderIcon = (name: string, size = 20) => { const I = (LucideIcons as any)[name] || LucideIcons.Eye; return <I size={size} />; };

  return (
    <section id="services-section" style={{ background: '#fff', padding: 'var(--section-py) 0' }}>
      <div className="container" ref={ref}>

        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <div className="section-label">{t('আমাদের সেবাসমূহ', 'Our Services')}</div>
          <h2 className="display-lg" style={{ maxWidth: 580 }}>
            <span className="bn">{t('মাইক্রোস্কোপিক সার্জারি ও ব্যাপক চক্ষু নিদান', 'Microscopic Surgery & Comprehensive Ophthalmic Diagnostics')}</span>
          </h2>
          <p style={{ color: 'var(--brand-text-muted)', marginTop: '0.875rem', lineHeight: 1.8, maxWidth: 560 }} className="bn">
            {t('অত্যাধুনিক সরঞ্জাম ও বিশেষজ্ঞ সার্জনদের দ্বারা চক্ষু চিকিৎসা। বিস্তারিত জানতে একটি সেবা নির্বাচন করুন।', 'State-of-the-art eye care by expert surgeons. Select a discipline to view clinical details.')}
          </p>
        </div>

        <div style={{ display: 'grid', gap: '2rem', alignItems: 'start' }} className="svc-grid">

          {/* Tab list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="reveal">
            <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }} className="bn">
              {t('বিভাগসমূহ', 'Disciplines')}
            </p>
            {SERVICES.map((svc, i) => {
              const active = activeId === svc.id;
              return (
                <button key={svc.id} onClick={() => setActiveId(svc.id)} className={`reveal reveal-delay-${Math.min(i+1,4)}`} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${active ? 'var(--brand-blue)' : 'var(--brand-border)'}`, background: active ? 'var(--brand-blue-pale)' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', position: 'relative', overflow: 'hidden' }}>
                  {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--brand-blue)', borderRadius: '3px 0 0 3px' }} />}
                  <div style={{ width: 38, height: 38, borderRadius: '0.5rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'var(--brand-blue)' : 'var(--brand-blue-pale)', color: active ? '#fff' : 'var(--brand-blue)', transition: 'all 0.22s' }}>
                    {renderIcon(svc.icon, 16)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: active ? 700 : 500, color: active ? 'var(--brand-blue)' : 'var(--brand-text)', lineHeight: 1.3 }} className="bn">
                      {lang === 'bn' ? svc.titleBn : svc.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: active ? 'var(--brand-blue-mid)' : 'var(--brand-text-muted)', marginTop: '1px' }}>{svc.priceRange}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="reveal reveal-delay-2" style={{ background: '#fff', border: '1.5px solid var(--brand-border)', borderRadius: '1.25rem', padding: '2.25rem', boxShadow: '0 8px 40px rgba(13,31,110,0.09)', display: 'flex', flexDirection: 'column', minHeight: 480, transition: 'all 0.3s ease' }}>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--brand-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: '0.875rem', background: 'linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-blue-mid) 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 20px rgba(26,58,143,0.3)' }}>
                  {renderIcon(selected.icon, 24)}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--brand-navy)', lineHeight: 1.2 }} className="bn">
                    {lang === 'bn' ? selected.titleBn : selected.title}
                  </h3>
                  <div style={{ fontSize: '0.68rem', color: 'var(--brand-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '3px', fontWeight: 600 }}>
                    {t('চক্ষু সেবা', 'Eye Care Service')} · {selected.duration}
                  </div>
                </div>
              </div>
              <div className="price-badge" style={{ fontSize: '0.95rem', padding: '0.3rem 0.875rem', whiteSpace: 'nowrap' }}>{selected.priceRange}</div>
            </div>

            <p style={{ color: 'var(--brand-text-muted)', lineHeight: 1.85, marginBottom: '1.75rem', fontSize: '0.95rem' }} className="bn">
              {lang === 'bn' ? selected.descriptionBn : selected.description}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-navy)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.875rem' }} className="bn">
                {t('অন্তর্ভুক্ত সেবাসমূহ:', 'What is included:')}
              </div>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', listStyle: 'none', padding: 0 }} className="svc-details">
                {(lang === 'bn' ? selected.detailsBn : selected.details).map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.85rem', color: 'var(--brand-text)', lineHeight: 1.6 }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--brand-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0, marginTop: '1px' }}>✓</span>
                    <span className="bn">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--brand-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <LucideIcons.Clock size={14} style={{ color: 'var(--brand-blue)' }} />
                  ~{selected.duration}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <LucideIcons.CheckCircle2 size={14} style={{ color: '#16A34A' }} />
                  <span className="bn">{t('দ্রুত সুস্থতা', 'Fast recovery')}</span>
                </span>
              </div>
              <button onClick={() => onSelectServiceForBooking(selected.id)} className="btn btn-primary">
                <LucideIcons.CalendarCheck size={15} />
                <span className="bn">{t('এই সেবা বুক করুন', 'Book This Service')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.svc-grid{grid-template-columns:300px 1fr!important}.svc-details{grid-template-columns:1fr 1fr!important}}@media(max-width:767px){.svc-details{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}