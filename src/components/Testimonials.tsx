import { Star, ShieldCheck, Building2, Award } from 'lucide-react';
import { TESTIMONIALS, STATS } from '../data';
import { Lang } from '../types';
import { useReveal } from '../hooks/useReveal';

interface TestimonialsProps { lang: Lang; }

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = (en: string, bn: string) => lang === 'bn' ? bn : en;
  const ref = useReveal();

  return (
    <section id="testimonials-section" style={{ background: 'var(--brand-navy)', padding: 'var(--section-py) 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(244,123,32,0.08)', pointerEvents: 'none' }} />

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>

        <div className="reveal" style={{ maxWidth: 620, marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ color: 'var(--brand-orange)' }}>
            <span className="bn">{t('রোগীদের অভিজ্ঞতা', 'Patient Stories')}</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '0.875rem' }} className="bn">
            {lang === 'bn' ? 'বাংলাদেশে ৪৫,০০০+ রোগীর বিশ্বাস' : 'Loved By 45,000+ Patients In Bangladesh'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.8, fontSize: '0.95rem' }} className="bn">
            {t('চট্টগ্রাম ও ফেনী জুড়ে আমাদের রোগীদের সত্যিকারের অভিজ্ঞতা।', 'Authentic experiences from our patients across Chattogram and Feni.')}
          </p>
        </div>

        {/* Reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {TESTIMONIALS.map((rev, i) => (
            <div key={rev.id} className={`reveal reveal-delay-${Math.min(i+1,4)}`} style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden', transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-6px) scale(1.01)'; el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.35)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0) scale(1)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; }}>

              {/* Big quote mark */}
              <div style={{ position: 'absolute', top: '0.875rem', right: '1.25rem', fontFamily: 'Georgia, serif', fontSize: '5rem', lineHeight: 1, color: 'var(--brand-blue-light)', pointerEvents: 'none', userSelect: 'none', opacity: 0.7 }}>"</div>

              {/* Orange top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--brand-orange), var(--brand-blue))' }} />

              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem', marginTop: '0.25rem' }}>
                {Array.from({ length: rev.rating }).map((_, j) => <Star key={j} size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />)}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--brand-text)', lineHeight: 1.8, marginBottom: '1.25rem', fontStyle: 'italic', position: 'relative', zIndex: 1 }} className="bn">
                "{lang === 'bn' ? rev.textBn : rev.text}"
              </p>
              <div style={{ height: 1, background: 'var(--brand-border)', margin: '0 0 1rem' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-navy)', fontFamily: 'Playfair Display, Hind Siliguri, serif' }} className="bn">{lang === 'bn' ? rev.nameBn : rev.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--brand-text-muted)', marginTop: '1px' }}>{rev.location}</div>
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-orange)', background: 'var(--brand-orange-lt)', padding: '0.2rem 0.6rem', borderRadius: '0.375rem' }}>{rev.service.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: `repeat(${STATS.length}, 1fr)`, gap: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '1rem', overflow: 'hidden', marginBottom: '4rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '1.75rem 1.25rem', background: 'rgba(255,255,255,0.04)', textAlign: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1 }} className="bn">{lang === 'bn' ? s.valueBn : s.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.4rem', fontWeight: 500 }} className="bn">{lang === 'bn' ? s.labelBn : s.label}</div>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="reveal" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          {[
            { Icon: Building2,   en: 'BMDC Certified',            bn: 'BMDC সার্টিফাইড',      sub_en: 'Fully registered operations',    sub_bn: 'সম্পূর্ণ নিবন্ধিত কার্যক্রম' },
            { Icon: ShieldCheck, en: 'Sterile OT Class 10,000',   bn: 'জীবাণুমুক্ত OT',        sub_en: 'Advanced air filtration',         sub_bn: 'উন্নত বায়ু পরিস্রাবণ' },
            { Icon: Award,       en: 'ISO 9001 Aligned',           bn: 'ISO 9001 সারিবদ্ধ',     sub_en: 'Strict safety in all procedures', sub_bn: 'কঠোর নিরাপত্তা মান' },
          ].map(({ Icon, en, bn, sub_en, sub_bn }, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.875rem', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(73,184,229,0.15)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)'}>
                <Icon size={22} style={{ color: 'var(--brand-cyan)' }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '3px' }} className="bn">{lang === 'bn' ? bn : en}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }} className="bn">{lang === 'bn' ? sub_bn : sub_en}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}