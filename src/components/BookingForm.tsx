import React, { useState, useEffect } from 'react';
import { BRANCHES, SERVICES, DOCTORS, DIRECT_HELPLINE, DIRECT_HELPLINE_2, EMAIL } from '../data';
import { Doctor, Lang, Appointment } from '../types';
import { Calendar, Phone, Mail, User, CheckCircle2, AlertCircle, Trash2, Clock, MapPin } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface BookingFormProps {
  preSelectedDoctor: Doctor | null;
  preSelectedServiceId: string | null;
  onClearPreSelections: () => void;
  lang: Lang;
}

export default function BookingForm({ preSelectedDoctor, preSelectedServiceId, onClearPreSelections, lang }: BookingFormProps) {
  const t = (en: string, bn: string) => lang === 'bn' ? bn : en;
  const ref = useReveal();
  const [step,        setStep]        = useState<'form'|'success'>('form');
  const [branchId,    setBranchId]    = useState(BRANCHES[0].id);
  const [serviceId,   setServiceId]   = useState(SERVICES[0].id);
  const [doctorId,    setDoctorId]    = useState(DOCTORS[0].id);
  const [date,        setDate]        = useState('');
  const [slot,        setSlot]        = useState('');
  const [name,        setName]        = useState('');
  const [phone,       setPhone]       = useState('');
  const [email,       setEmail]       = useState('');
  const [notes,       setNotes]       = useState('');
  const [error,       setError]       = useState('');
  const [appointments,setAppointments]= useState<Appointment[]>([]);
  const [lastTicket,  setLastTicket]  = useState<Appointment|null>(null);

  const currentDoctor = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];

  useEffect(() => { try { const s = localStorage.getItem('alo_bookings'); if (s) setAppointments(JSON.parse(s)); } catch {} }, []);
  useEffect(() => {
    if (preSelectedServiceId) {
      setServiceId(preSelectedServiceId);
      const m = DOCTORS.find(d => {
        if (preSelectedServiceId==='cataract') return d.specialty.includes('Cataract');
        if (preSelectedServiceId==='glaucoma') return d.specialty.includes('Glaucoma');
        if (preSelectedServiceId==='squint')   return d.specialty.includes('Pediatric');
        return false;
      });
      if (m) { setDoctorId(m.id); setSlot(m.timeSlots[0]||''); }
    }
  }, [preSelectedServiceId]);
  useEffect(() => { if (preSelectedDoctor) { setDoctorId(preSelectedDoctor.id); setSlot(preSelectedDoctor.timeSlots[0]||''); } }, [preSelectedDoctor]);
  useEffect(() => { if (!currentDoctor.timeSlots.includes(slot)) setSlot(currentDoctor.timeSlots[0]||''); }, [doctorId]);

  const save = (a: Appointment[]) => { setAppointments(a); try { localStorage.setItem('alo_bookings', JSON.stringify(a)); } catch {} };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!name.trim()) return setError(t('রোগীর নাম লিখুন।', 'Please enter patient name.'));
    if (!/^(?:\+88|01)?\d{9,11}$/.test(phone.replace(/\s/g,''))) return setError(t('সঠিক বাংলাদেশি ফোন নম্বর দিন।', 'Enter a valid BD phone number.'));
    if (!date) return setError(t('তারিখ বেছে নিন।', 'Please select a date.'));
    if (!slot) return setError(t('সময় স্লট বেছে নিন।', 'Please select a time slot.'));
    const ticket: Appointment = {
      id: 'ALO-'+Math.floor(100000+Math.random()*900000),
      patientName: name.trim(), patientPhone: phone.trim(), patientEmail: email.trim()||'',
      doctorId, serviceId, branchId, date, timeSlot: slot, notes: notes.trim(), createdAt: new Date().toISOString()
    };
    save([ticket,...appointments]); setLastTicket(ticket); setStep('success'); onClearPreSelections();
  };

  const inp: React.CSSProperties = { width: '100%', border: '1.5px solid var(--brand-border)', borderRadius: '0.5rem', padding: '0.7rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--brand-text)', background: '#fff', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' };
  const sel: React.CSSProperties = { ...inp, appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235A6A8A' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', paddingRight: '2.25rem' };
  const focus = { onFocus: (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => { (e.target as HTMLElement).style.borderColor='var(--brand-blue)'; (e.target as HTMLElement).style.boxShadow='0 0 0 3px rgba(26,58,143,0.1)'; }, onBlur: (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => { (e.target as HTMLElement).style.borderColor='var(--brand-border)'; (e.target as HTMLElement).style.boxShadow='none'; }};
  const lbl: React.CSSProperties = { display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-navy)', marginBottom: '0.375rem' };

  return (
    <section id="booking-section" style={{ background: 'var(--brand-off-white)', padding: 'var(--section-py) 0' }}>
      <div className="container" ref={ref}>

        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-label"><span className="bn">{t('অ্যাপয়েন্টমেন্ট', 'Book Appointment')}</span></div>
          <h2 className="display-lg"><span className="bn">{t('চেম্বার অ্যাপয়েন্টমেন্ট বুক করুন', 'Book a Chamber Appointment')}</span></h2>
          <p style={{ color: 'var(--brand-text-muted)', marginTop: '0.75rem', lineHeight: 1.8, maxWidth: 520 }} className="bn">
            {t('নিচের ফর্মটি পূরণ করুন। রিসেপশনে দেখানোর জন্য একটি ডিজিটাল টিকিট তৈরি হবে।', 'Fill in the form below. A digital ticket will be generated for registration at the branch.')}
          </p>
        </div>

        <div style={{ display: 'grid', gap: '2rem', alignItems: 'start' }} className="booking-grid">

          {/* ── Form card ──────────────────────────────────────────── */}
          <div className="reveal" style={{ background: '#fff', border: '1.5px solid var(--brand-border)', borderRadius: '1.25rem', padding: '2.25rem', boxShadow: '0 8px 40px rgba(13,31,110,0.09)' }}>

            {step === 'form' ? (
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--brand-border)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '0.875rem', background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(26,58,143,0.3)', flexShrink: 0 }}>
                    <Calendar size={22} style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-navy)', lineHeight: 1.2 }} className="bn">{t('চেম্বার অ্যাপয়েন্টমেন্ট', 'Chamber Appointment')}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--brand-text-muted)', marginTop: '1px' }} className="bn">{t('পেমেন্ট প্রয়োজন নেই। ক্লিনিকে বিল প্রদান করুন।', 'No payment required. Billing handled at the clinic.')}</p>
                  </div>
                </div>

                {(preSelectedDoctor||preSelectedServiceId) && (
                  <div style={{ background: 'var(--brand-blue-pale)', border: '1px solid var(--brand-blue-light)', borderRadius: '0.625rem', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.8rem', color: 'var(--brand-blue)', fontWeight: 600 }}>
                    <span className="bn">✓ {t('পূর্ব-নির্বাচন প্রয়োগ হয়েছে', 'Pre-selections applied')}</span>
                    <button type="button" onClick={() => { onClearPreSelections(); setServiceId(SERVICES[0].id); setDoctorId(DOCTORS[0].id); }} style={{ fontSize: '0.72rem', color: 'var(--brand-text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'var(--font-body)' }} className="bn">{t('রিসেট', 'Reset')}</button>
                  </div>
                )}

                {error && (
                  <div style={{ display: 'flex', gap: '0.625rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#991B1B' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span className="bn">{error}</span>
                  </div>
                )}

                {/* Appointment fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }} className="form-2col">
                  <div>
                    <label style={lbl} className="bn">{t('শাখা', 'Branch')}</label>
                    <select value={branchId} onChange={e=>setBranchId(e.target.value)} style={sel} {...focus}>
                      {BRANCHES.map(b=><option key={b.id} value={b.id}>{lang==='bn'?b.nameBn:b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl} className="bn">{t('সেবা', 'Service')}</label>
                    <select value={serviceId} onChange={e=>setServiceId(e.target.value)} style={sel} {...focus}>
                      {SERVICES.map(s=><option key={s.id} value={s.id}>{lang==='bn'?s.titleBn:s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl} className="bn">{t('ডাক্তার', 'Doctor')}</label>
                    <select value={doctorId} onChange={e=>setDoctorId(e.target.value)} style={sel} {...focus}>
                      {DOCTORS.map(d=><option key={d.id} value={d.id}>{lang==='bn'?d.nameBn:d.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl} className="bn">{t('তারিখ', 'Date')}</label>
                    <input type="date" min={new Date().toISOString().split('T')[0]} value={date} onChange={e=>setDate(e.target.value)} style={inp} {...focus} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={lbl} className="bn">{t('সময় স্লট', 'Time Slot')}</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {currentDoctor.timeSlots.map(s=>(
                      <button key={s} type="button" onClick={()=>setSlot(s)} style={{ padding: '0.5rem 1.125rem', borderRadius: '0.5rem', border: `1.5px solid ${slot===s?'var(--brand-blue)':'var(--brand-border)'}`, background: slot===s?'var(--brand-blue)':'#fff', color: slot===s?'#fff':'var(--brand-text)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'monospace' }}>{s}</button>
                    ))}
                  </div>
                </div>

                <div style={{ height: 1, background: 'var(--brand-border)', marginBottom: '1.375rem' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.125rem' }}>
                  <div style={{ width: 4, height: 16, background: 'var(--brand-orange)', borderRadius: 2 }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-navy)', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="bn">{t('রোগীর তথ্য', 'Patient Details')}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-2col">
                  <div>
                    <label style={lbl} className="bn">{t('রোগীর নাম', 'Patient Name')} *</label>
                    <div style={{ position: 'relative' }}>
                      <User size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brand-text-muted)' }} />
                      <input type="text" placeholder={t('পূর্ণ নাম', 'Full name')} value={name} onChange={e=>setName(e.target.value)} style={{ ...inp, paddingLeft: '2.25rem' }} {...focus} required />
                    </div>
                  </div>
                  <div>
                    <label style={lbl} className="bn">{t('ফোন', 'Phone')} *</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brand-text-muted)' }} />
                      <input type="tel" placeholder="01XXXXXXXXX" value={phone} onChange={e=>setPhone(e.target.value)} style={{ ...inp, paddingLeft: '2.25rem', fontFamily: 'monospace' }} {...focus} required />
                    </div>
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={lbl} className="bn">{t('ইমেইল', 'Email')} ({t('ঐচ্ছিক', 'optional')})</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brand-text-muted)' }} />
                      <input type="email" placeholder="email@example.com" value={email} onChange={e=>setEmail(e.target.value)} style={{ ...inp, paddingLeft: '2.25rem' }} {...focus} />
                    </div>
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={lbl} className="bn">{t('লক্ষণ / নোট', 'Symptoms / Notes')} ({t('ঐচ্ছিক', 'optional')})</label>
                    <textarea placeholder={t('আপনার লক্ষণ বর্ণনা করুন…', 'Describe your symptoms…')} value={notes} onChange={e=>setNotes(e.target.value)} style={{ ...inp, resize: 'vertical', minHeight: 80 }}
                      onFocus={e => { e.target.style.borderColor='var(--brand-blue)'; e.target.style.boxShadow='0 0 0 3px rgba(26,58,143,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor='var(--brand-border)'; e.target.style.boxShadow='none'; }} rows={3} />
                  </div>
                </div>

                <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', width: '100%', background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-mid))', color: '#fff', border: 'none', borderRadius: '0.75rem', padding: '1rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '1.75rem', transition: 'all 0.22s', boxShadow: '0 6px 20px rgba(26,58,143,0.35)', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 12px 32px rgba(26,58,143,0.45)';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translateY(0)';(e.currentTarget as HTMLButtonElement).style.boxShadow='0 6px 20px rgba(26,58,143,0.35)';}}>
                  <Calendar size={18} />
                  <span className="bn">{t('অ্যাপয়েন্টমেন্ট নিশ্চিত করুন', 'Confirm Appointment')}</span>
                </button>
              </form>

            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #DCFCE7, #A7F3D0)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 24px rgba(34,197,94,0.2)' }}>
                  <CheckCircle2 size={38} style={{ color: '#16A34A' }} />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-navy)', marginBottom: '0.5rem' }} className="bn">{t('অ্যাপয়েন্টমেন্ট নিশ্চিত!', 'Appointment Confirmed!')}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--brand-text-muted)', marginBottom: '2rem' }} className="bn">{t('রিসেপশনে এই রেফারেন্স দেখান।', 'Present this reference at the reception desk.')}</p>
                {lastTicket && (
                  <div style={{ border: '1.5px solid var(--brand-blue-light)', borderRadius: '1rem', padding: '1.75rem', background: 'var(--brand-blue-pale)', textAlign: 'left', maxWidth: 440, margin: '0 auto 1.75rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ height: 4, background: 'linear-gradient(90deg, var(--brand-blue), var(--brand-cyan))', position: 'absolute', top: 0, left: 0, right: 0 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.125rem', paddingBottom: '1.125rem', borderBottom: '1px dashed var(--brand-border)' }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--brand-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="bn">{t('বুকিং রেফারেন্স', 'Booking Reference')}</div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-navy)', fontVariantNumeric: 'tabular-nums' }}>{lastTicket.id}</div>
                      </div>
                      <div style={{ background: 'var(--brand-blue)', color: '#fff', padding: '0.3rem 0.875rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700 }} className="bn">{t('নিশ্চিত', 'CONFIRMED')}</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', fontSize: '0.82rem' }}>
                      {[
                        { label: t('রোগী','Patient'),    val: lastTicket.patientName },
                        { label: t('ফোন','Phone'),       val: lastTicket.patientPhone },
                        { label: t('ডাক্তার','Doctor'),  val: DOCTORS.find(d=>d.id===lastTicket.doctorId)?.[lang==='bn'?'nameBn':'name'] || '' },
                        { label: t('শাখা','Branch'),     val: BRANCHES.find(b=>b.id===lastTicket.branchId)?.[lang==='bn'?'nameBn':'name'] || '' },
                        { label: t('তারিখ','Date'),      val: lastTicket.date },
                        { label: t('সময়','Time'),        val: lastTicket.timeSlot },
                      ].map(row=>(
                        <div key={row.label}>
                          <div style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--brand-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1px' }} className="bn">{row.label}</div>
                          <div style={{ fontWeight: 600, color: 'var(--brand-navy)' }} className="bn">{row.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={()=>{setStep('form');setName('');setPhone('');setEmail('');setNotes('');setDate('');setSlot('');}} className="btn btn-primary bn">{t('আরেকটি বুক করুন','Book Another')}</button>
              </div>
            )}
          </div>

          {/* ── Right column ───────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Helpline card */}
            <div className="reveal reveal-delay-1" style={{ background: 'var(--brand-navy)', borderRadius: '1.25rem', padding: '2rem', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 16px 48px rgba(11,29,94,0.25)' }}>
              <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', border: '1px dashed rgba(244,123,32,0.2)' }} />
              <div style={{ height: 3, background: 'linear-gradient(90deg, var(--brand-orange), var(--brand-cyan))', borderRadius: '3px', marginBottom: '1.5rem' }} />
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.625rem' }} className="bn">{t('তাৎক্ষণিক সাহায্য?','Need Immediate Help?')}</div>
              <h4 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.625rem', lineHeight: 1.3 }} className="bn">{t('তাৎক্ষণিক চক্ষু পরামর্শ দরকার?','Need Immediate Ocular Guidance?')}</h4>
              <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.58)', marginBottom: '1.5rem', lineHeight: 1.7 }} className="bn">{t('জরুরি চক্ষু সেবার জন্য কল করুন।','Call our helpline for emergency eye care.')}</p>
              {[DIRECT_HELPLINE, DIRECT_HELPLINE_2].map(num=>(
                <a key={num} href={`tel:${num}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.875rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(73,184,229,0.15)', border: '1px solid rgba(73,184,229,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={16} style={{ color: 'var(--brand-cyan)' }} />
                  </div>
                  {num}
                </a>
              ))}
              <a href={`mailto:${EMAIL}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.62)', textDecoration: 'none', fontSize: '0.85rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(73,184,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={15} style={{ color: 'var(--brand-cyan)' }} />
                </div>
                {EMAIL}
              </a>
            </div>

            {/* Appointment history */}
            <div className="reveal reveal-delay-2" style={{ background: '#fff', border: '1.5px solid var(--brand-border)', borderRadius: '1.25rem', padding: '1.625rem', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.875rem', borderBottom: '1px solid var(--brand-border)' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-blue)', display: 'inline-block' }} />
                  <span className="bn">{t('আমার অ্যাপয়েন্টমেন্ট','My Appointments')} ({appointments.length})</span>
                </h4>
              </div>
              {appointments.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', maxHeight: 280, overflowY: 'auto' }}>
                  {appointments.map(appt=>{
                    const doc = DOCTORS.find(d=>d.id===appt.doctorId);
                    const svc = SERVICES.find(s=>s.id===appt.serviceId);
                    return (
                      <div key={appt.id} style={{ background: 'var(--brand-blue-pale)', border: '1px solid var(--brand-blue-light)', borderRadius: '0.75rem', padding: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div style={{ fontSize: '0.78rem' }}>
                          <div style={{ fontWeight: 800, color: 'var(--brand-navy)', fontFamily: 'monospace', marginBottom: '2px' }}>{appt.id}</div>
                          <div style={{ color: 'var(--brand-text)', fontWeight: 600 }} className="bn">{appt.patientName}</div>
                          <div style={{ color: 'var(--brand-text-muted)', marginTop: '1px' }} className="bn">{lang==='bn'?svc?.titleBn:svc?.title} · {lang==='bn'?doc?.nameBn:doc?.name}</div>
                          <div style={{ color: 'var(--brand-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '4px' }}>
                            <Clock size={11} />{appt.date} @ {appt.timeSlot}
                          </div>
                        </div>
                        <button onClick={()=>save(appointments.filter(a=>a.id!==appt.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-text-muted)', padding: '0.25rem', borderRadius: '0.375rem', flexShrink: 0, transition: 'color 0.15s' }}
                          onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.color='#DC2626'}
                          onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.color='var(--brand-text-muted)'}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--brand-text-muted)' }}>
                  <Calendar size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.2 }} />
                  <p style={{ fontSize: '0.83rem' }} className="bn">{t('এখনো কোনো অ্যাপয়েন্টমেন্ট নেই।','No appointments yet.')}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.booking-grid{grid-template-columns:1fr 380px!important}.form-2col{grid-template-columns:1fr 1fr!important}}@media(max-width:767px){.form-2col{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}