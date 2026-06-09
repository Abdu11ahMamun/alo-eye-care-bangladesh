import { useState } from 'react';
import { Star, Calendar, Search, ArrowRight, Award } from 'lucide-react';
import { DOCTORS } from '../data';
import { Doctor, Lang } from '../types';
import { useReveal } from '../hooks/useReveal';

interface DoctorRosterProps { onSelectDoctor: (d: Doctor) => void; lang: Lang; }

const FILTERS = [
  { en: 'All', bn: 'সকল', key: 'All' },
  { en: 'Cataract', bn: 'ছানি', key: 'Cataract' },
  { en: 'Pediatric', bn: 'শিশু', key: 'Pediatric' },
  { en: 'Retina', bn: 'রেটিনা', key: 'Retina' },
  { en: 'Glaucoma', bn: 'গ্লুকোমা', key: 'Glaucoma' },
];

export default function DoctorRoster({ onSelectDoctor, lang }: DoctorRosterProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const ref = useReveal();
  const t = (bn: string, en: string) => lang === 'bn' ? bn : en;

  const filtered = DOCTORS.filter(doc => {
    const s = search.toLowerCase();
    const matchSearch = !s || doc.name.toLowerCase().includes(s) || doc.specialty.toLowerCase().includes(s);
    const matchFilter = filter === 'All' ||
      (filter === 'Cataract' && (doc.specialty.includes('Cataract') || doc.specialty.includes('Cornea'))) ||
      (filter === 'Pediatric' && (doc.specialty.includes('Pediatric') || doc.specialty.includes('Squint'))) ||
      (filter === 'Retina' && (doc.specialty.includes('Retina') || doc.specialty.includes('Vitreo'))) ||
      (filter === 'Glaucoma' && doc.specialty.includes('Glaucoma'));
    return matchSearch && matchFilter;
  });

  return (
    <section id="doctors-section" style={{ background: 'var(--brand-blue-pale)', padding: 'var(--section-py) 0' }}>
      <div className="container" ref={ref}>

        <div className="reveal" style={{ marginBottom: '2.5rem' }}>
          <div className="section-label"><Award size={12} /><span className="bn">{t('আমাদের বিশেষজ্ঞগণ', 'Our Specialists')}</span></div>
          <h2 className="display-lg"><span className="bn">{t('আমাদের জ্যেষ্ঠ চক্ষু মাইক্রোসার্জনগণ', 'Consult Our Senior Ophthalmic Microsurgeons')}</span></h2>
          <p style={{ color: 'var(--brand-text-muted)', marginTop: '0.75rem', lineHeight: 1.8, maxWidth: 560 }} className="bn">
            {t('প্রতিটি বিশেষজ্ঞ BMDC নিবন্ধিত এবং আন্তর্জাতিক প্রতিষ্ঠান থেকে ফেলোশিপপ্রাপ্ত।', 'Every specialist is BMDC registered with fellowships from internationally acclaimed institutions.')}
          </p>
        </div>

        {/* Filter bar */}
        <div className="reveal reveal-delay-1" style={{ background: '#fff', border: '1px solid var(--brand-border)', borderRadius: '0.875rem', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brand-text-muted)' }} />
            <input type="text" placeholder={t('নাম বা বিশেষত্ব দিয়ে খুঁজুন…', 'Search by name or specialty…')} value={search} onChange={e => setSearch(e.target.value)} className="form-input bn" style={{ paddingLeft: '2.25rem' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} className="bn" style={{ padding: '0.4rem 1rem', borderRadius: '999px', border: `1.5px solid ${filter === f.key ? 'var(--brand-blue)' : 'var(--brand-border)'}`, background: filter === f.key ? 'var(--brand-blue)' : '#fff', color: filter === f.key ? '#fff' : 'var(--brand-text-muted)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--font-body)' }}>
                {lang === 'bn' ? f.bn : f.en}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((doc, i) => (
            <div key={doc.id} className={`reveal reveal-delay-${Math.min(i+1,4)}`} style={{ background: '#fff', border: '1.5px solid var(--brand-border)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)', boxShadow: 'var(--shadow-card)', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = 'var(--shadow-card-hover)'; el.style.borderColor = 'rgba(26,58,143,0.3)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'var(--shadow-card)'; el.style.borderColor = 'var(--brand-border)'; }}>

              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--brand-blue), var(--brand-cyan))', borderRadius: '1.25rem 1.25rem 0 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={doc.imageUrl} alt={doc.name} referrerPolicy="no-referrer" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--brand-blue-light)', display: 'block' }} />
                  <span style={{ position: 'absolute', bottom: 1, right: 1, width: 14, height: 14, borderRadius: '50%', background: '#22C55E', border: '2.5px solid #fff', boxShadow: '0 0 0 2px rgba(34,197,94,0.2)' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '3px' }}>
                    <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--brand-text)' }}>{doc.rating}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--brand-text-muted)' }}>({doc.reviewsCount})</span>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-navy)', lineHeight: 1.3 }} className="bn">
                    {lang === 'bn' ? doc.nameBn : doc.name}
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-blue)', marginBottom: '0.375rem', lineHeight: 1.4 }} className="bn">
                {lang === 'bn' ? doc.specialtyBn : doc.specialty}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--brand-text-muted)', lineHeight: 1.55, marginBottom: '1rem' }}>{doc.degree}</p>

              <div style={{ height: 1, background: 'var(--brand-border)', margin: '0 0 1rem' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-text-muted)' }}>
                  <Calendar size={13} style={{ color: 'var(--brand-blue)', flexShrink: 0 }} />
                  <span className="bn">{doc.availableDays.slice(0,3).join(', ')}…</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-navy)' }}>৳{doc.bdtFees.toLocaleString()}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--brand-text-muted)' }} className="bn">{t('পরামর্শ ফি', 'consultation fee')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
                {doc.timeSlots.slice(0,3).map(slot => (
                  <span key={slot} className="availability-chip">{slot}</span>
                ))}
              </div>

              <button onClick={() => onSelectDoctor(doc)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--brand-blue-pale)', color: 'var(--brand-blue)', border: '1.5px solid var(--brand-blue-light)', borderRadius: '0.625rem', padding: '0.65rem 1rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.18s', marginTop: 'auto', fontFamily: 'var(--font-body)', width: '100%' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'var(--brand-blue)'; b.style.color = '#fff'; b.style.borderColor = 'var(--brand-blue)'; b.style.boxShadow = 'var(--shadow-btn)'; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'var(--brand-blue-pale)'; b.style.color = 'var(--brand-blue)'; b.style.borderColor = 'var(--brand-blue-light)'; b.style.boxShadow = 'none'; }}>
                <span className="bn">{t('অ্যাপয়েন্টমেন্ট বুক করুন', 'Book This Doctor')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3.5rem', color: 'var(--brand-text-muted)', border: '1.5px dashed var(--brand-border)', borderRadius: '1rem', background: '#fff' }}>
              <Search size={36} style={{ margin: '0 auto 0.875rem', opacity: 0.25 }} />
              <p style={{ fontWeight: 600 }} className="bn">{t('কোনো বিশেষজ্ঞ পাওয়া যায়নি।', 'No specialists match your search.')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}