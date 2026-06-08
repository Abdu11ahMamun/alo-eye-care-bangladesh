import { useState, useEffect } from 'react';
import { Eye, CheckCircle2, ChevronRight, Activity, AlertCircle, Info, RefreshCw, Monitor, Smartphone } from 'lucide-react';
import { Lang } from '../types';
import { useReveal } from '../hooks/useReveal';

interface InteractiveTestProps { lang: Lang; }

const SNELLEN = [
  { line: 1, text: 'E',             acuity: '6/60', labelBn: 'আংশিক দৃষ্টিশক্তি',          labelEn: 'Partially Sighted',       size: 62 },
  { line: 2, text: 'F P',           acuity: '6/36', labelBn: 'কম দৃষ্টিশক্তির লক্ষণ',      labelEn: 'Low Vision Indicator',    size: 48 },
  { line: 3, text: 'T O Z',         acuity: '6/24', labelBn: 'মৃদু প্রতিসরণ ত্রুটি',        labelEn: 'Mild Refractive Error',   size: 36 },
  { line: 4, text: 'L P E D',       acuity: '6/18', labelBn: 'সামান্য অস্পষ্ট দূরত্ব',     labelEn: 'Slightly Blurry',         size: 27 },
  { line: 5, text: 'P E C F D',     acuity: '6/12', labelBn: 'স্ট্যান্ডার্ড ড্রাইভার দৃষ্টি', labelEn: 'Standard Driver Vision',  size: 19 },
  { line: 6, text: 'E D F C Z P',   acuity: '6/9',  labelBn: 'প্রায় নিখুঁত দৃষ্টি',         labelEn: 'Near Perfect Acuity',     size: 13 },
  { line: 7, text: 'F E L O P Z D', acuity: '6/6',  labelBn: '১০০% স্বচ্ছ মানব দৃষ্টি',    labelEn: '100% Perfect Sight',      size: 10 },
];

const TABS = [
  { id: 'acuity',      iconEl: Eye,      en: 'Visual Acuity',  bn: 'দৃষ্টি তীক্ষ্ণতা'  },
  { id: 'astigmatism', iconEl: Activity, en: 'Astigmatism',    bn: 'দৃষ্টিবিভ্রম'       },
  { id: 'color',       iconEl: Info,     en: 'Color Vision',   bn: 'বর্ণ দৃষ্টি'        },
  { id: 'timer',       iconEl: Monitor,  en: 'Screen Guard',   bn: 'স্ক্রিন গার্ড'       },
];

export default function InteractiveTest({ lang }: InteractiveTestProps) {
  const [tab,          setTab]          = useState('acuity');
  const [acuityLine,   setAcuityLine]   = useState<number|null>(null);
  const [astigResult,  setAstigResult]  = useState<boolean|null>(null);
  const [colorInput,   setColorInput]   = useState('');
  const [colorChecked, setColorChecked] = useState(false);
  const [colorOk,      setColorOk]      = useState<boolean|null>(null);
  const [timerActive,  setTimerActive]  = useState(false);
  const [timeLeft,     setTimeLeft]     = useState(20 * 60);
  const [breaksDone,   setBreaksDone]   = useState(0);
  const [alert,        setAlert]        = useState(false);
  const ref = useReveal();

  const t = (en: string, bn: string) => lang === 'bn' ? bn : en;

  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    if (timerActive && timeLeft > 0) id = setInterval(() => setTimeLeft(p => p - 1), 1000);
    if (timeLeft === 0) { setTimerActive(false); setAlert(true); setBreaksDone(c => c + 1); }
    return () => clearInterval(id);
  }, [timerActive, timeLeft]);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const panelBg   = '#fff';
  const panelBdr  = '1.5px solid var(--brand-border)';
  const panelShdw = '0 8px 40px rgba(13,31,110,0.09)';

  const infoBox = (ok: boolean, text: string) => (
    <div style={{ display: 'flex', gap: '0.625rem', padding: '0.875rem 1rem', background: ok ? '#ECFDF5' : '#FEF3C7', border: `1px solid ${ok ? '#A7F3D0' : '#FCD34D'}`, borderRadius: '0.625rem', fontSize: '0.83rem', lineHeight: 1.6, color: ok ? '#065F46' : '#92400E' }}>
      {ok ? <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '1px', color: '#059669' }} /> : <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px', color: '#D97706' }} />}
      <span className="bn">{text}</span>
    </div>
  );

  return (
    <section id="vision-playroom-section" style={{ background: 'var(--brand-blue-pale)', borderTop: '1px solid var(--brand-blue-light)', borderBottom: '1px solid var(--brand-blue-light)', padding: 'var(--section-py) 0' }}>
      <div className="container" ref={ref}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}><span className="bn">{t('ইন্টারেক্টিভ দৃষ্টি পরীক্ষা', 'Interactive Vision Tests')}</span></div>
          <h2 className="display-lg"><span className="bn">{t('তাৎক্ষণিক ইন্টারেক্টিভ দৃষ্টি পরীক্ষা করুন', 'Perform an Instant Interactive Vision Test')}</span></h2>
          <p style={{ color: 'var(--brand-text-muted)', marginTop: '0.875rem', lineHeight: 1.8, fontSize: '0.95rem' }} className="bn">
            {t('চক্ষুবিশেষজ্ঞ-পরিকল্পিত স্ব-পরিচালিত পরীক্ষা। ক্লিনিক্যাল মূল্যায়নের বিকল্প নয়।', 'Self-guided visual checks designed by ophthalmologists. Not a replacement for clinical evaluation.')}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '0.625rem', background: '#EFF6FF', border: '1px solid var(--brand-blue-light)', borderRadius: '0.75rem', padding: '0.75rem 1.125rem', marginTop: '1.25rem', textAlign: 'left', maxWidth: 520 }}>
            <Info size={15} style={{ color: 'var(--brand-blue)', flexShrink: 0, marginTop: '1px' }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--brand-blue)', lineHeight: 1.6 }} className="bn">
              {t('এগুলো সিমুলেটেড স্ক্রিনিং। ঝাপসা ফলাফল হলে ক্লিনিক্যাল পরীক্ষা বুক করুন।', 'These are simulated screenings only. If you notice blurred results, book a clinical check.')}
            </p>
          </div>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gap: '1.5rem', alignItems: 'start' }} className="test-grid">

          {/* Tab list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }} className="reveal">
            {TABS.map(item => {
              const Icon = item.iconEl;
              const active = tab === item.id;
              return (
                <button key={item.id} onClick={() => setTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.125rem', borderRadius: '0.875rem', border: `1.5px solid ${active ? 'var(--brand-blue)' : 'var(--brand-border)'}`, background: active ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', boxShadow: active ? '0 4px 20px rgba(13,31,110,0.12)' : 'none', fontFamily: 'var(--font-body)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '0.625rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-mid))' : 'var(--brand-blue-pale)', color: active ? '#fff' : 'var(--brand-blue)', transition: 'all 0.22s', boxShadow: active ? '0 4px 12px rgba(26,58,143,0.3)' : 'none' }}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: active ? 700 : 500, color: active ? 'var(--brand-blue)' : 'var(--brand-text)', lineHeight: 1.2 }} className="bn">
                      {lang === 'bn' ? item.bn : item.en}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--brand-text-muted)', marginTop: '1px' }}>
                      {active ? t('সক্রিয়', 'Active') : t('ট্যাপ করুন', 'Tap to start')}
                    </div>
                  </div>
                  {active && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-blue)', flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="reveal reveal-delay-2" style={{ background: panelBg, border: panelBdr, borderRadius: '1.25rem', padding: '2.25rem', boxShadow: panelShdw, minHeight: 480, display: 'flex', flexDirection: 'column' }}>

            {/* ── Acuity ─────────────────────────────────────────────── */}
            {tab === 'acuity' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.35rem', fontWeight: 700, color: 'var(--brand-navy)', marginBottom: '0.375rem' }} className="bn">
                    {t('দৃষ্টি তীক্ষ্ণতা পরীক্ষা (স্নেলেন)', 'Acuity Checker (Snellen)')}
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--brand-text-muted)', lineHeight: 1.7 }} className="bn">
                    {t('১ মিটার দূরে বসুন, এক চোখ ঢাকুন এবং যত নিচে পারেন পড়ুন।', 'Sit 1 metre back, cover one eye, and read down as far as you can clearly.')}
                  </p>
                </div>

                {/* Snellen chart */}
                <div style={{ background: '#0B1D5E', borderRadius: '1rem', padding: '1.75rem 1.5rem', textAlign: 'center', border: '3px solid #1A3A8F', userSelect: 'none', boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', marginBottom: '1.25rem', borderRadius: 2 }} />
                  {SNELLEN.map(row => (
                    <div key={row.line} onClick={() => setAcuityLine(row.line)} style={{ padding: '0.375rem 0.5rem', cursor: 'pointer', borderRadius: '0.375rem', background: acuityLine === row.line ? 'rgba(73,184,229,0.15)' : 'transparent', transition: 'background 0.15s', border: acuityLine === row.line ? '1px solid rgba(73,184,229,0.4)' : '1px solid transparent', marginBottom: '0.25rem' }}>
                      <span style={{ display: 'block', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: `${row.size}px`, color: acuityLine === row.line ? '#49B8E5' : '#fff', fontWeight: 700, letterSpacing: '0.25em', lineHeight: 1.1 }}>{row.text}</span>
                      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>Line {row.line} · {row.acuity}</span>
                    </div>
                  ))}
                  <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', marginTop: '1.25rem', borderRadius: 2 }} />
                </div>

                <div style={{ background: 'var(--brand-blue-pale)', borderRadius: '0.875rem', padding: '1.125rem', border: '1px solid var(--brand-blue-light)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-text-muted)', marginBottom: '0.75rem' }} className="bn">{t('সবচেয়ে ছোট লাইন নির্বাচন করুন যা স্পষ্ট পড়েছেন:', 'Select the smallest line you read perfectly:')}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[1,2,3,4,5,6,7].map(n => (
                      <button key={n} onClick={() => setAcuityLine(n)} style={{ width: 38, height: 38, borderRadius: '0.5rem', border: `1.5px solid ${acuityLine===n?'var(--brand-blue)':'var(--brand-border)'}`, background: acuityLine===n?'var(--brand-blue)':'#fff', color: acuityLine===n?'#fff':'var(--brand-text)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}>{n}</button>
                    ))}
                  </div>
                  {acuityLine !== null && (
                    <div style={{ marginTop: '0.875rem' }}>
                      {infoBox(acuityLine >= 5,
                        acuityLine >= 5
                          ? t(`চমৎকার! আপনার দৃষ্টি: ${SNELLEN[acuityLine-1].acuity} (${SNELLEN[acuityLine-1].labelBn})`, `Excellent! Your acuity: ${SNELLEN[acuityLine-1].acuity} (${SNELLEN[acuityLine-1].labelEn})`)
                          : t(`দৃষ্টি: ${SNELLEN[acuityLine-1].acuity} — ${SNELLEN[acuityLine-1].labelBn}। একটি ক্লিনিক্যাল রিফ্র্যাকশন পরীক্ষা বুক করুন।`, `Acuity: ${SNELLEN[acuityLine-1].acuity} — ${SNELLEN[acuityLine-1].labelEn}. We recommend booking a clinical refraction test.`)
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Astigmatism ────────────────────────────────────────── */}
            {tab === 'astigmatism' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.35rem', fontWeight: 700, color: 'var(--brand-navy)', marginBottom: '0.375rem' }} className="bn">
                    {t('দৃষ্টিবিভ্রম ক্লক পরীক্ষা', 'Astigmatism Clock Test')}
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--brand-text-muted)', lineHeight: 1.7 }} className="bn">
                    {t('এক চোখ ঢাকুন, কেন্দ্রের দিকে তাকান। কোনো রেখা কি অন্যদের চেয়ে বেশি গাঢ় বা ঝাপসা দেখাচ্ছে?', 'Cover one eye, stare at the centre. Do any lines look darker or more distorted than others?')}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', padding: '2rem', background: 'var(--brand-blue-pale)', borderRadius: '1rem', border: '1px solid var(--brand-blue-light)' }}>
                  <div style={{ flex: '0 0 auto' }}>
                    <svg width="180" height="180" viewBox="0 0 100 100" stroke="var(--brand-navy)" strokeWidth="1.2" fill="none">
                      <circle cx="50" cy="50" r="48" stroke="var(--brand-border)" strokeWidth="0.8" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="3" fill="var(--brand-navy)" />
                      <line x1="50" y1="2"  x2="50" y2="98" />
                      <line x1="2"  y1="50" x2="98" y2="50" />
                      <line x1="16" y1="16" x2="84" y2="84" />
                      <line x1="84" y1="16" x2="16" y2="84" />
                      <line x1="26" y1="6"  x2="74" y2="94" strokeWidth="1" />
                      <line x1="6"  y1="26" x2="94" y2="74" strokeWidth="1" />
                      <line x1="74" y1="6"  x2="26" y2="94" strokeWidth="1" />
                      <line x1="94" y1="26" x2="6"  y2="74" strokeWidth="1" />
                    </svg>
                  </div>

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--brand-navy)', marginBottom: '1rem' }} className="bn">
                      {t('কোনো রেখা কি বেশি গাঢ় বা ঝাপসা?', 'Are any lines darker or blurry?')}
                    </div>
                    <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <button onClick={() => setAstigResult(true)} className="bn" style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', border: `1.5px solid ${astigResult===true?'#F59E0B':'var(--brand-border)'}`, background: astigResult===true?'#FEF3C7':'#fff', color: astigResult===true?'#92400E':'var(--brand-text)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}>
                        {t('হ্যাঁ, গাঢ়/ঝাপসা দেখাচ্ছে', 'Yes, some lines differ')}
                      </button>
                      <button onClick={() => setAstigResult(false)} className="bn" style={{ padding: '0.625rem 1.25rem', borderRadius: '0.625rem', border: `1.5px solid ${astigResult===false?'var(--brand-blue)':'var(--brand-border)'}`, background: astigResult===false?'var(--brand-blue-pale)':'#fff', color: astigResult===false?'var(--brand-blue)':'var(--brand-text)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}>
                        {t('না, সব একসমান', 'No, all uniform')}
                      </button>
                    </div>
                    {astigResult !== null && infoBox(!astigResult,
                      astigResult
                        ? t('সম্ভাব্য দৃষ্টিবিভ্রমের লক্ষণ। কর্নিয়াল টপোগ্রাফি পরীক্ষা বুক করুন।', 'Possible astigmatism. Book a corneal topography check.')
                        : t('ভালো সাম্য — সব রেখা সমানভাবে প্রতিসৃত।', 'Good symmetry — all lines refracting uniformly.')
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Color ──────────────────────────────────────────────── */}
            {tab === 'color' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.35rem', fontWeight: 700, color: 'var(--brand-navy)', marginBottom: '0.375rem' }} className="bn">
                    {t('ইশিহারা বর্ণ মেট্রিক্স', 'Ishihara Color Matrix')}
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--brand-text-muted)', lineHeight: 1.7 }} className="bn">
                    {t('নিচের প্যাটার্নে লুকানো দুই-সংখ্যার সংখ্যাটি দেখুন।', 'Can you see a two-digit number hidden inside the pattern below?')}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start', padding: '1.75rem', background: 'var(--brand-blue-pale)', borderRadius: '1rem', border: '1px solid var(--brand-blue-light)' }}>
                  <div style={{ width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--brand-border)', background: '#f1f5f9', userSelect: 'none' }}>
                    <svg viewBox="0 0 100 100" width="160" height="160">
                      {[[15,20,3,'#ef4444'],[25,15,4,'#f87171'],[35,25,3,'#fca5a5'],[10,45,4,'#ef4444'],[20,55,3,'#f87171'],[15,65,4,'#fca5a5'],[25,75,3,'#ef4444'],[10,28,3.5,'#ef4444'],[60,18,4,'#f87171'],[80,18,3.5,'#fca5a5'],[90,30,3,'#f87171'],[85,42,4,'#ef4444'],[88,65,4.5,'#ef4444'],[82,78,3,'#fca5a5'],[50,92,3,'#ef4444'],[75,48,4,'#ef4444'],[65,42,3,'#fca5a5']].map(([cx,cy,r,fill],i)=>(
                        <circle key={i} cx={cx as number} cy={cy as number} r={r as number} fill={fill as string} opacity="0.85" />
                      ))}
                      {[[38,18,3.5],[45,18,4],[52,18,3],[58,22,3.8],[58,32,4],[54,42,3.5],[50,52,4.5],[46,62,3.2],[42,72,4],[38,82,3.5]].map(([cx,cy,r],i)=>(
                        <circle key={'g'+i} cx={cx} cy={cy} r={r} fill="#10b981" opacity="0.95" />
                      ))}
                      {[[68,28,3.5],[66,38,4],[64,48,3],[62,58,3.8],[44,58,4],[50,58,3.5],[70,58,4.5],[76,58,3.5],[72,68,4],[72,78,3.8],[72,85,3.5]].map(([cx,cy,r],i)=>(
                        <circle key={'h'+i} cx={cx} cy={cy} r={r} fill="#059669" opacity="0.95" />
                      ))}
                    </svg>
                  </div>

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label className="form-label bn">{t('আপনি যে সংখ্যাটি দেখছেন তা লিখুন:', 'Enter the number you see:')}</label>
                    <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}>
                      <input type="text" maxLength={3} placeholder={t('সংখ্যা', 'digits')} value={colorInput} onChange={e => { setColorInput(e.target.value.replace(/\D/g,'')); setColorChecked(false); }} className="form-input bn" style={{ width: 100 }} />
                      <button onClick={() => { setColorChecked(true); setColorOk(colorInput.trim()==='74'); }} disabled={!colorInput} className="btn btn-primary bn">{t('পরীক্ষা', 'Check')} <ChevronRight size={14} /></button>
                    </div>
                    {colorChecked && colorOk !== null && infoBox(colorOk,
                      colorOk
                        ? t('সঠিক! (৭৪) — স্বাভাবিক বর্ণ দৃষ্টি।', 'Correct! (74) — Normal colour vision.')
                        : t('ভুল। সংখ্যাটি ৭৪। বর্ণ দৃষ্টির সমস্যা হতে পারে — রেটিনা বিশেষজ্ঞের সাথে পরামর্শ করুন।', 'Incorrect. The number is 74. This may indicate colour vision deficiency — please consult our retinal specialist.')
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Screen Guard ───────────────────────────────────────── */}
            {tab === 'timer' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, Hind Siliguri, serif', fontSize: '1.35rem', fontWeight: 700, color: 'var(--brand-navy)', marginBottom: '0.375rem' }} className="bn">
                    {t('স্ক্রিন ক্লান্তি গার্ড (২০-২০-২০)', 'Screen Fatigue Guard (20-20-20)')}
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--brand-text-muted)', lineHeight: 1.7 }} className="bn">
                    {t('প্রতি ২০ মিনিটে ২০ ফুট দূরে ২০ সেকেন্ড তাকান।', 'Every 20 minutes, look 20 feet away for 20 seconds.')}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
                    <div style={{ width: 148, height: 148, borderRadius: '50%', border: `4px solid ${timerActive ? 'var(--brand-blue)' : 'var(--brand-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', background: '#fff', boxShadow: timerActive ? '0 0 0 6px var(--brand-blue-light)' : 'none', transition: 'all 0.4s ease', position: 'relative' }}>
                      {timerActive && <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px dashed var(--brand-blue-light)', animation: 'rotateGlow 8s linear infinite', opacity: 0.6 }} />}
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.25rem', fontWeight: 800, color: 'var(--brand-navy)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{fmt(timeLeft)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={() => setTimerActive(p => !p)} className={`btn ${timerActive?'btn-orange':'btn-primary'} btn-sm bn`}>{timerActive ? t('বিরতি','Pause') : t('শুরু','Start')}</button>
                      <button onClick={() => { setTimerActive(false); setTimeLeft(20*60); setAlert(false); }} className="btn btn-ghost btn-sm"><RefreshCw size={13} /></button>
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { Icon: Smartphone, en: 'Relax ciliary muscles',     bn: 'সিলিয়ারি পেশী শিথিল',     sub_en: 'Looking away releases eye muscle tension.',       sub_bn: 'দূরে তাকালে চোখের পেশীর চাপ কমে।' },
                      { Icon: Monitor,   en: 'Prevent dry eye',            bn: 'শুষ্ক চোখ প্রতিরোধ',       sub_en: 'Blink more often to lubricate your cornea.',      sub_bn: 'কর্নিয়া লুব্রিকেট করতে বেশি পলক ফেলুন।' },
                    ].map(({ Icon, en, bn, sub_en, sub_bn }, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem 1rem', background: 'var(--brand-blue-pale)', borderRadius: '0.75rem', border: '1px solid var(--brand-blue-light)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '0.5rem', background: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={16} style={{ color: '#fff' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--brand-navy)' }} className="bn">{lang==='bn'?bn:en}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--brand-text-muted)', lineHeight: 1.5 }} className="bn">{lang==='bn'?sub_bn:sub_en}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#fff', borderRadius: '0.625rem', border: '1px solid var(--brand-border)', fontSize: '0.83rem' }}>
                      <span style={{ color: 'var(--brand-text-muted)' }} className="bn">{t('সম্পন্ন বিরতি:', 'Completed breaks:')}</span>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, color: 'var(--brand-blue)', fontSize: '1.1rem' }}>{breaksDone}</span>
                    </div>
                    {alert && (
                      <div style={{ padding: '0.875rem 1rem', background: '#ECFDF5', border: '1.5px solid #6EE7B7', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ fontSize: '0.83rem', color: '#065F46', fontWeight: 600 }} className="bn">{t('🔔 বিরতির সময়! ২০ সেকেন্ড দূরে তাকান।', '🔔 Break time! Look 20 feet away for 20 seconds.')}</div>
                        <button onClick={() => { setTimeLeft(20*60); setAlert(false); }} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'var(--font-body)' }} className="bn">{t('পরের চক্র', 'Next cycle')}</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Panel footer */}
            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--brand-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--brand-text-muted)' }} className="bn">
                {t('চোখে সমস্যা অনুভব করছেন?', 'Experiencing eye strain or blurred vision?')}
              </p>
              <button onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-sm">
                <span className="bn">{t('ক্লিনিক্যাল চেক বুক করুন', 'Book Clinical Check')}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.test-grid{grid-template-columns:240px 1fr!important}}`}</style>
    </section>
  );
}