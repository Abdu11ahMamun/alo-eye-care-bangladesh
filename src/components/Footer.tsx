import { useState } from 'react';
import { Phone, MapPin, Mail, Clock, ShieldCheck, Eye } from 'lucide-react';
import { BRANCHES, DIRECT_HELPLINE, DIRECT_HELPLINE_2, EMAIL, WEBSITE } from '../data';
import { Lang } from '../types';

interface FooterProps { onNavigate: (s: string) => void; lang: Lang; }

export default function Footer({ onNavigate, lang }: FooterProps) {
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0].id);
  const selected = BRANCHES.find(b => b.id === activeBranch) || BRANCHES[0];
  const t = (bn: string, en: string) => lang === 'bn' ? bn : en;

  const linkStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: 'rgba(255,255,255,0.58)', textDecoration: 'none', marginBottom: '0.5rem', transition: 'color 0.18s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)', textAlign: 'left' as const };

  return (
    <footer id="footer-section" style={{ background: 'var(--brand-navy)', color: 'rgba(255,255,255,0.75)', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background geometry */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 60, left: -60, width: 280, height: 280, borderRadius: '50%', border: '1px dashed rgba(244,123,32,0.07)', pointerEvents: 'none' }} />

      {/* ── Branch Finder ─────────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '4rem 0', position: 'relative', zIndex: 1 }} id="footer-map-container">
        <div className="container">
          <div style={{ display: 'grid', gap: '2.5rem', alignItems: 'start' }} className="footer-map-grid">

            <div>
              <div className="section-label" style={{ color: 'var(--brand-orange)' }}><span className="bn">{t('আমাদের চেম্বার খুঁজুন', 'Find Our Chambers')}</span></div>
              <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', lineHeight: 1.2 }} className="bn">
                {t('চেম্বার ঠিকানা নির্দেশিকা', 'Chamber Floor Finder & Address Guide')}
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.5rem' }} className="bn">
                {t('শাখা নির্বাচন করুন এবং বিস্তারিত তথ্য দেখুন।', 'Select a branch to see floor details and direct contact.')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {BRANCHES.map(b => (
                  <button key={b.id} onClick={() => setActiveBranch(b.id)} style={{ padding: '0.875rem 1.125rem', borderRadius: '0.75rem', border: activeBranch === b.id ? '1.5px solid var(--brand-cyan)' : '1px solid rgba(255,255,255,0.1)', background: activeBranch === b.id ? 'rgba(73,184,229,0.1)' : 'rgba(255,255,255,0.03)', color: activeBranch === b.id ? '#fff' : 'rgba(255,255,255,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.875rem', fontWeight: activeBranch === b.id ? 700 : 400, fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => { if (b.id !== activeBranch) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'; }}
                    onMouseLeave={e => { if (b.id !== activeBranch) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}>
                    <span className="bn">{lang === 'bn' ? b.nameBn : b.name}</span>
                    <MapPin size={14} style={{ color: activeBranch === b.id ? 'var(--brand-cyan)' : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.25rem', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '0.75rem', background: 'rgba(73,184,229,0.15)', border: '1px solid rgba(73,184,229,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} style={{ color: 'var(--brand-cyan)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }} className="bn">{lang === 'bn' ? selected.nameBn : selected.name}</h4>
                    <div style={{ fontSize: '0.65rem', color: 'var(--brand-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '2px' }}>{t('শাখা অবস্থান', 'Branch Location')}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>{t('সরাসরি লাইন', 'Direct Line')}</div>
                  <a href={`tel:${selected.phone}`} style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>{selected.phone}</a>
                </div>
              </div>
              {[
                { Icon: MapPin, label: t('ঠিকানা', 'Address'), val: lang === 'bn' ? selected.addressBn : selected.address },
                { Icon: Clock,  label: t('সময়', 'Hours'),   val: lang === 'bn' ? selected.hoursBn   : selected.hours },
              ].map(({ Icon, label, val }, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.875rem', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <Icon size={15} style={{ color: 'var(--brand-cyan)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.07em' }} className="bn">{label}: </span>
                    <span style={{ color: 'rgba(255,255,255,0.82)' }} className="bn">{val}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.72rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.38)' }} className="bn">{t('জরুরি অ্যাক্সেস: লবি প্রতিদিন খোলা', 'Emergency access: Lobby open daily')}</span>
                <a href={`tel:${DIRECT_HELPLINE}`} style={{ color: 'var(--brand-cyan)', fontWeight: 700, textDecoration: 'none' }}>{DIRECT_HELPLINE}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Links grid ────────────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.125rem' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(26,58,143,0.4)' }}>
                <Eye size={20} style={{ color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#fff' }}>আলো EYE CARE</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>For your Eyes only</div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, marginBottom: '1.125rem' }} className="bn">
              {t('বাংলাদেশের চট্টগ্রাম ও ফেনীতে আধুনিক চক্ষু বিশেষজ্ঞ-পরিচালিত চক্ষু সেবা কেন্দ্র।', 'A modern ophthalmologist-led eye care network in Chattogram & Feni, Bangladesh.')}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem 0.875rem', fontSize: '0.7rem', color: 'var(--brand-cyan)' }}>
              <ShieldCheck size={13} />
              <span className="bn">{t('স্বাস্থ্য মন্ত্রণালয় অনুমোদিত', 'Ministry of Health Approved')}</span>
            </div>
          </div>

          <div>
            <div className="footer-heading bn">{t('সেবাসমূহ', 'Services')}</div>
            {[
              { en: 'Phaco Cataract Surgery', bn: 'ফ্যাকো ছানি সার্জারি' },
              { en: 'Squint (Strabismus)',    bn: 'বাঁকা চোখ সংশোধন' },
              { en: 'Glaucoma Management',    bn: 'গ্লুকোমা ব্যবস্থাপনা' },
              { en: 'DCR / DCT Surgery',      bn: 'নেত্রনালী অপারেশন' },
              { en: 'Pterygium Excision',     bn: 'টেরিজিয়াম অপসারণ' },
              { en: 'Refraction & Optics',    bn: 'চশমার পাওয়ার ও অপটিক্স' },
            ].map(s => (
              <button key={s.en} onClick={() => onNavigate('services')} style={linkStyle} className="bn"
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.58)'}>
                {lang === 'bn' ? s.bn : s.en}
              </button>
            ))}
          </div>

          <div>
            <div className="footer-heading bn">{t('দৃষ্টি পরীক্ষা', 'Vision Tools')}</div>
            {[
              { en: 'Visual Acuity Test',    bn: 'দৃষ্টি তীক্ষ্ণতা পরীক্ষা' },
              { en: 'Astigmatism Check',     bn: 'দৃষ্টিবিভ্রম পরীক্ষা' },
              { en: 'Color Vision Test',     bn: 'বর্ণ দৃষ্টি পরীক্ষা' },
              { en: 'Screen Fatigue Guard',  bn: 'স্ক্রিন ক্লান্তি গার্ড' },
            ].map(s => (
              <button key={s.en} onClick={() => onNavigate('vision-test')} style={linkStyle} className="bn"
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.58)'}>
                {lang === 'bn' ? s.bn : s.en}
              </button>
            ))}
          </div>

          <div>
            <div className="footer-heading bn">{t('যোগাযোগ', 'Contact')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { href: `tel:${DIRECT_HELPLINE}`,   Icon: Phone, text: DIRECT_HELPLINE },
                { href: `tel:${DIRECT_HELPLINE_2}`, Icon: Phone, text: DIRECT_HELPLINE_2 },
                { href: `mailto:${EMAIL}`,           Icon: Mail,  text: EMAIL },
                { href: `https://${WEBSITE}`,        Icon: Eye,   text: WEBSITE, external: true },
              ].map(item => (
                <a key={item.text} href={item.href} target={item.external ? '_blank' : undefined} rel="noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.58)'}>
                  <item.Icon size={13} style={{ color: 'var(--brand-cyan)', flexShrink: 0 }} />{item.text}
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>
                <MapPin size={13} style={{ color: 'var(--brand-cyan)', flexShrink: 0, marginTop: '2px' }} />
                <span className="bn">{lang === 'bn' ? BRANCHES[0].addressBn : BRANCHES[0].address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.32)' }}>
          <p>© {new Date().getFullYear()} আলো আই কেয়ার বাংলাদেশ ({WEBSITE}). <span className="bn">{t('সর্বস্বত্ব সংরক্ষিত।', 'All rights reserved.')}</span></p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span className="bn" style={{ cursor: 'default' }}>{t('গোপনীয়তা নীতি', 'Privacy Policy')}</span>
            <span className="bn" style={{ cursor: 'default' }}>{t('ক্লিনিক্যাল শর্তাবলী', 'Clinical Terms')}</span>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.footer-map-grid{grid-template-columns:300px 1fr!important}.footer-brand-col{grid-column:span 2!important}}@media(min-width:1024px){.footer-brand-col{grid-column:span 1!important}}`}</style>
    </footer>
  );
}