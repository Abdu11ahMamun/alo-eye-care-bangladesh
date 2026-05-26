import { useState, useEffect } from 'react';
import { Eye, CheckCircle2, ChevronRight, Activity, AlertCircle, Info, RefreshCw, Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function InteractiveTest() {
  const [activeTest, setActiveTest] = useState<'acuity' | 'astigmatism' | 'color' | 'timer'>('acuity');
  
  // Test states
  const [acuityLine, setAcuityLine] = useState<number | null>(null);
  const [astigmatismResult, setAstigmatismResult] = useState<boolean | null>(null);
  const [colorInput, setColorInput] = useState<string>('');
  const [colorChecked, setColorChecked] = useState<boolean>(false);
  const [colorSuccess, setColorSuccess] = useState<boolean | null>(null);
  
  // Fatigue Timer states
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 minutes in seconds
  const [fatigueCount, setFatigueCount] = useState<number>(0);
  const [showFatigueAlert, setShowFatigueAlert] = useState<boolean>(false);

  // Snellen letters data
  const SNELLEN_LINES = [
    { line: 1, text: 'E', acuity: '6/60 (Partially Sighted)', fontSize: 'text-6xl sm:text-7xl font-sans font-black tracking-widest' },
    { line: 2, text: 'F P', acuity: '6/36 (Low Vision Indicator)', fontSize: 'text-4xl sm:text-5xl font-sans font-bold tracking-[0.25em]' },
    { line: 3, text: 'T O Z', acuity: '6/24 (Mild Refractive Error)', fontSize: 'text-2xl sm:text-3xl font-sans font-bold tracking-[0.35em]' },
    { line: 4, text: 'L P E D', acuity: '6/18 (Slightly Blurry Distance)', fontSize: 'text-xl sm:text-2xl font-sans font-medium tracking-[0.4em]' },
    { line: 5, text: 'P E C F D', acuity: '6/12 (Standard Driver Requirement)', fontSize: 'text-base sm:text-lg font-sans font-medium tracking-[0.45em]' },
    { line: 6, text: 'E D F C Z P', acuity: '6/9 (Near Perfect Visual Acuity)', fontSize: 'text-xs sm:text-sm font-sans font-normal tracking-[0.5em]' },
    { line: 7, text: 'F E L O P Z D', acuity: '6/6 (100% Crisp Human Sight)', fontSize: 'text-[9px] sm:text-xs font-sans font-light tracking-[0.55em] opacity-85' },
  ];

  // Ishihara plate secret
  const ISHIHARA_SECRET = "74";

  // Screen break timer effects
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setShowFatigueAlert(true);
      setFatigueCount(c => c + 1);
      // Trigger a browser sound or notification if supported
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch (e) {
        // Fallback if audio blocked
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(20 * 60);
    setShowFatigueAlert(false);
  };

  const handleColorCheck = () => {
    setColorChecked(true);
    if (colorInput.trim() === ISHIHARA_SECRET) {
      setColorSuccess(true);
    } else {
      setColorSuccess(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="vision-playroom-section"
      className="py-24 bg-[#FFFBF0]/60 relative border-y border-teal-100"
    >
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-200/15 filter blur-[90px] focal-ray"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Playroom Header */}
        <div id="playroom-intro-header" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
            Home Optic Diagnostics Playroom
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Perform an Instant Interactive Vision Test
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            These self-guided visual tasks are engineered by ophthalmologists to check basic visual performance, screen fatigue levels, astigmatism indicators, and color perception.
          </p>
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl max-w-xl mx-auto text-left flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-[11.5px] text-teal-800 leading-normal">
              <strong>Patient Notice:</strong> These self-screenings are interactive mock simulations and do not replace official diagnostic evaluations inside an eye care facility. If you yield blurry markings, please book a comprehensive clinical check.
            </p>
          </div>
        </div>

        {/* Playroom Tabs Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Left Switchboard Column */}
          <div className="lg:col-span-4 flex flex-col gap-3 text-left">
            <h3 className="font-display font-extrabold text-slate-800 text-base mb-2 px-1">Choose a Test Simulator:</h3>
            
            <button
              id="test-tab-acuity"
              onClick={() => setActiveTest('acuity')}
              className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${
                activeTest === 'acuity'
                  ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/15'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeTest === 'acuity' ? 'bg-teal-500 text-white' : 'bg-white text-slate-500 shadow-xs'}`}>
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-950 text-sm">Visual Acuity Check</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Estimated Snellen acuity (6/6 to 6/60)</p>
              </div>
            </button>

            <button
              id="test-tab-astigmatism"
              onClick={() => setActiveTest('astigmatism')}
              className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${
                activeTest === 'astigmatism'
                  ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/15'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeTest === 'astigmatism' ? 'bg-teal-500 text-white' : 'bg-white text-slate-500 shadow-xs'}`}>
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-950 text-sm">Astigmatism Dial Test</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Check for corneal shape asymmetry</p>
              </div>
            </button>

            <button
              id="test-tab-color"
              onClick={() => setActiveTest('color')}
              className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${
                activeTest === 'color'
                  ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/15'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeTest === 'color' ? 'bg-teal-500 text-white' : 'bg-white text-slate-500 shadow-xs'}`}>
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-950 text-sm">Ishihara Color Matrix</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-sans">Simulated color blindness indicator</p>
              </div>
            </button>

            <button
              id="test-tab-timer"
              onClick={() => setActiveTest('timer')}
              className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${
                activeTest === 'timer'
                  ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/15'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeTest === 'timer' ? 'bg-teal-500 text-white' : 'bg-white text-slate-500 shadow-xs'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-950 text-sm">Digital Eye Strain Guard</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">20-20-20 active screen breaks timer</p>
              </div>
            </button>
          </div>

          {/* Right Workstation Screen (Simulating diagnostic screen with premium Bento styling) */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col justify-between text-left transition-all duration-300 hover:shadow-2xl">
            <div>
              {/* Acuity Snellen Test Section */}
              {activeTest === 'acuity' && (
                <div id="acuity-workstation" className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl">Acuity Checker (Snellen Simulation)</h3>
                    <p className="text-xs text-slate-500 font-sans mt-1">
                      Set your screen to comfortable brightness, sit 3 feet (1 meter) back, cover one eye at a time, and start reading down.
                    </p>
                  </div>

                  {/* Simulated Snellen Light Box Chart */}
                  <div className="bg-slate-950 text-white p-6 rounded-xl text-center space-y-4 shadow-inner max-w-lg mx-auto select-none border-4 border-slate-800">
                    <div className="w-full h-1 bg-teal-500/30"></div>
                    <div className="space-y-4 uppercase tracking-widest font-mono select-none">
                      {SNELLEN_LINES.map((line) => (
                        <div 
                          key={line.line} 
                          className={`hover:bg-slate-800/60 rounded py-1 transition-colors cursor-pointer ${
                            acuityLine === line.line ? 'bg-teal-900 text-teal-200 font-black' : ''
                          }`}
                          onClick={() => setAcuityLine(line.line)}
                          title="Click if you can recognize this line clearly"
                        >
                          <span className={line.fontSize}>{line.text}</span>
                          <span className="text-[9px] text-slate-500 font-mono ml-4 select-none opacity-60">Line {line.line}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-1 bg-teal-500/30"></div>
                  </div>

                  {/* Read line question */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-2">Select the SMALLEST row you read perfectly:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <button
                          key={num}
                          id={`acuity-select-${num}`}
                          onClick={() => setAcuityLine(num)}
                          className={`w-9 h-9 rounded-lg font-bold text-xs transition-all ${
                            acuityLine === num 
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    {acuityLine !== null && (
                      <div className="mt-4 p-3 bg-teal-50 border border-teal-100 rounded-lg flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-teal-900 font-sans">
                            <strong>Estimated Visual Acuity:</strong> <span className="font-bold underline text-teal-700">{SNELLEN_LINES[acuityLine - 1].acuity}</span>
                          </p>
                          <p className="text-[11px] text-teal-700 mt-1">
                            {acuityLine >= 6 
                              ? "Excellent vision score. Keep up visual muscle exercises and filter harmful blue screen light!" 
                              : "This indicates moderate blurring. Recommended: Book an appointment with Prof. Dr. Mazharul Alam for custom refract testing."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Astigmatism Dial Section */}
              {activeTest === 'astigmatism' && (
                <div id="astigmatism-workstation" className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl">Astigmatism Clock Analyzer</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Cover one eye at a time, stare at the center of the wheel pattern below, and observe if any lines form a darker or more distorted shape than other lines.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-8 items-center justify-center py-4 bg-slate-50 rounded-xl p-6">
                    {/* SVG Vector clock dial illustrating ophthalmology standard charts */}
                    <svg className="w-48 h-48 text-slate-800" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                      <circle cx="50" cy="50" r="3" fill="currentColor" />
                      {/* Generates radial spokes */}
                      <line x1="50" y1="2" x2="50" y2="98" />
                      <line x1="2" y1="50" x2="98" y2="50" />
                      
                      <line x1="16" y1="16" x2="84" y2="84" />
                      <line x1="16" y1="84" x2="84" y2="16" />
                      
                      <line x1="26.3" y1="6" x2="73.7" y2="94" strokeWidth="1" />
                      <line x1="6" y1="26.3" x2="94" y2="73.7" strokeWidth="1" />
                      
                      <line x1="73.7" y1="6" x2="26.3" y2="94" strokeWidth="1" />
                      <line x1="94" y1="26.3" x2="6" y2="73.7" strokeWidth="1" />
                    </svg>

                    <div className="text-left space-y-4 max-w-sm">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">Are any radial segments looking substantially darker, or have they lost contrast?</label>
                        <div className="flex gap-3">
                          <button
                            id="astigmatism-yes"
                            onClick={() => setAstigmatismResult(true)}
                            className={`px-5 py-2.5 rounded-lg border text-xs font-bold transition-all ${
                              astigmatismResult === true
                                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            Yes, some lines seem darker/blurred
                          </button>
                          <button
                            id="astigmatism-no"
                            onClick={() => setAstigmatismResult(false)}
                            className={`px-5 py-2.5 rounded-lg border text-xs font-bold transition-all ${
                              astigmatismResult === false
                                ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            No, all lines look uniform
                          </button>
                        </div>
                      </div>

                      {astigmatismResult !== null && (
                        <div className={`p-4 rounded-xl border text-xs ${astigmatismResult ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-teal-50 text-teal-900 border-teal-200'}`}>
                          {astigmatismResult ? (
                            <div className="flex items-start gap-2.5">
                              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                              <p>
                                <strong>Potential Astigmatism Symptom:</strong> Having some radial lines look significantly unequal can indicate an asymmetric curvature of your cornea. Please request a corneal topography assessment during your diagnostic visit.
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                              <p>
                                <strong>Excellent symmetry:</strong> All lines are refracting uniformly through your lens structure. Repeat checks every six months to sustain proper eye shape tracking.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Ishihara Color Matrix */}
              {activeTest === 'color' && (
                <div id="ishihara-workstation" className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl">Ishihara Color Matrix Simulation</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Do you see a distinct two-digit number hidden inside the colored granular bubble matrix? Put your answer below.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-8 items-center justify-center p-6 bg-slate-50 rounded-xl">
                    {/* Custom Vector-drawn Ishihara plate using colored SVG circles! Absolute pixel clinical masterpiece! */}
                    <div id="vector-ishihara-plate" className="relative w-44 h-44 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden p-2 select-none shadow-sm bg-radial-[circle_at_center,_#fafafa_0%,_#f1f5f9_100%]">
                      {/* Nested group of dot structures forming an authentic red-green color-blind test containing "74" */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Background dots - reddish/orange tones */}
                        <circle cx="15" cy="20" r="3" fill="#ef4444" opacity="0.8" />
                        <circle cx="25" cy="15" r="4" fill="#f87171" opacity="0.7" />
                        <circle cx="35" cy="25" r="3" fill="#fca5a5" opacity="0.9" />
                        <circle cx="20" cy="35" r="2.5" fill="#f87171" opacity="0.6" />
                        <circle cx="10" cy="45" r="4" fill="#ef4444" opacity="0.8" />
                        <circle cx="20" cy="55" r="3" fill="#f87171" opacity="0.8" />
                        <circle cx="15" cy="65" r="4.5" fill="#fca5a5" opacity="0.9" />
                        <circle cx="25" cy="75" r="3" fill="#ef4444" opacity="0.75" />
                        <circle cx="35" cy="85" r="3.5" fill="#f87171" opacity="0.8" />
                        <circle cx="10" cy="28" r="3.5" fill="#ef4444" opacity="0.8" />
                        <circle cx="48" cy="12" r="3" fill="#ef4444" opacity="0.7" />
                        <circle cx="60" cy="18" r="4" fill="#f87171" opacity="0.8" />
                        <circle cx="70" cy="22" r="2" fill="#ef4444" opacity="0.9" />
                        <circle cx="80" cy="18" r="3.5" fill="#fca5a5" opacity="0.6" />
                        <circle cx="90" cy="30" r="3" fill="#f87171" opacity="0.7" />
                        <circle cx="85" cy="42" r="4" fill="#ef4444" opacity="0.8" />
                        <circle cx="80" cy="55" r="2.5" fill="#f87171" opacity="0.5" />
                        <circle cx="88" cy="65" r="4.5" fill="#ef4444" opacity="0.95" />
                        <circle cx="82" cy="78" r="3" fill="#fca5a5" opacity="0.8" />
                        <circle cx="72" cy="85" r="3.5" fill="#f87171" opacity="0.7" />
                        <circle cx="60" cy="88" r="4" fill="#ef4444" opacity="0.8" />
                        
                        <circle cx="50" cy="92" r="3" fill="#ef4444" opacity="0.8" />
                        <circle cx="40" cy="70" r="3" fill="#f87171" opacity="0.7" />
                        <circle cx="30" cy="60" r="3.5" fill="#ef4444" opacity="0.85" />
                        <circle cx="68" cy="60" r="2.5" fill="#f87171" opacity="0.7" />
                        <circle cx="75" cy="48" r="4" fill="#ef4444" opacity="0.8" />
                        <circle cx="65" cy="42" r="3" fill="#fca5a5" opacity="0.9" />

                        {/* Hidden GREENISH DOTS forming number "7" */}
                        <circle cx="38" cy="18" r="3.5" fill="#10b981" opacity="0.95" />
                        <circle cx="45" cy="18" r="4.2" fill="#059669" opacity="0.9" />
                        <circle cx="52" cy="18" r="3" fill="#34d399" opacity="0.9" />
                        <circle cx="58" cy="22" r="3.8" fill="#10b981" opacity="0.95" />
                        <circle cx="58" cy="32" r="4" fill="#059669" opacity="0.9" />
                        <circle cx="54" cy="42" r="3.5" fill="#34d399" opacity="1" />
                        <circle cx="50" cy="52" r="4.5" fill="#10b981" opacity="0.95" />
                        <circle cx="46" cy="62" r="3.2" fill="#059669" opacity="0.9" />
                        <circle cx="42" cy="72" r="4" fill="#34d399" opacity="0.95" />
                        <circle cx="38" cy="82" r="3.5" fill="#10b981" opacity="0.9" />

                        {/* Hidden GREENISH DOTS forming number "4" */}
                        <circle cx="68" cy="28" r="3.5" fill="#10b981" opacity="0.9" />
                        <circle cx="66" cy="38" r="4.2" fill="#059669" opacity="0.95" />
                        <circle cx="64" cy="48" r="3" fill="#34d399" opacity="0.9" />
                        <circle cx="62" cy="58" r="3.8" fill="#10b981" opacity="1" />
                        
                        <circle cx="44" cy="58" r="4.2" fill="#059669" opacity="0.95" />
                        <circle cx="50" cy="58" r="3.8" fill="#34d399" opacity="0.9" />
                        
                        <circle cx="70" cy="58" r="4.5" fill="#10b981" opacity="0.9" />
                        <circle cx="76" cy="58" r="3.5" fill="#059669" opacity="0.95" />
                        <circle cx="72" cy="68" r="4" fill="#10b981" opacity="0.9" />
                        <circle cx="72" cy="78" r="3.8" fill="#34d399" opacity="0.9" />
                        <circle cx="72" cy="85" r="3.5" fill="#10b981" opacity="0.95" />
                      </svg>
                    </div>

                    <div className="text-left space-y-4 max-w-sm w-full">
                      <div className="space-y-2">
                        <label id="ishihara-input-label" htmlFor="ishihara-field" className="text-xs font-bold text-slate-700 block">
                          Enter the digits you discover above:
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="ishihara-field"
                            type="text"
                            maxLength={3}
                            placeholder="Type digits"
                            value={colorInput}
                            onChange={(e) => {
                              setColorInput(e.target.value.replace(/\D/g, ''));
                              setColorChecked(false);
                            }}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold tracking-wide"
                          />
                          <button
                            id="ishihara-submit"
                            onClick={handleColorCheck}
                            disabled={!colorInput}
                            className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                          >
                            Validate
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {colorChecked && (
                        <div className={`p-4 rounded-xl border text-xs leading-normal ${colorSuccess ? 'bg-teal-50 text-teal-950 border-teal-200' : 'bg-amber-50 text-amber-950 border-amber-200'}`}>
                          {colorSuccess ? (
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                              <p>
                                <strong>Perfect match (74)!</strong> Your retinal cone cells are distinguishing red-green wavelengths flawlessly in this standard scale.
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-start gap-2.5">
                              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                              <p>
                                <strong>Mismatched Perception:</strong> Correct reading is <span className="font-bold underline">74</span>. If this looks blurry or reads differently, it can signify mild color vision deficiency (deuteranomaly/protanomaly). Mention this to our retinal specialist.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Screen Break Timer (Digital Health) */}
              {activeTest === 'timer' && (
                <div id="break-timer-workstation" className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl">Screen Fatigue Break Monitor</h3>
                    <p className="text-xs text-slate-500 mt-1 pb-1">
                      Adopt the <strong>20-20-20 Rule</strong>: Every 20 minutes spent staring at a screen, look at an object 20 feet away for at least 20 seconds to prevent ciliary muscle eye strain.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    
                    {/* The Circular Countdown Timer Widget with clean 3D styling */}
                    <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 shadow-inner flex flex-col items-center justify-center space-y-4">
                      
                      <div className="relative w-36 h-36 rounded-full border-4 border-slate-200 flex items-center justify-center bg-white shadow-md">
                        {/* Interactive pulsing glow */}
                        {timerActive && (
                          <div className="absolute inset-2 rounded-full border-2 border-teal-400 border-dashed animate-spin-slow"></div>
                        )}
                        <span className="font-mono text-3xl font-black text-slate-800 tracking-tight select-none">
                          {formatTime(timeLeft)}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          id="timer-start-pause"
                          onClick={() => setTimerActive(!timerActive)}
                          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            timerActive 
                              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs' 
                              : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
                          }`}
                        >
                          {timerActive ? 'Pause Alarm' : 'Start Rules Tracking'}
                        </button>
                        
                        <button
                          id="timer-reset"
                          onClick={resetTimer}
                          className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* Advice card list */}
                    <div className="text-left space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-slate-900 text-xs">Relax Ciliary focus</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Staring closely locks your lens muscles. Looking away relaxes these fibers instantly.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600 shrink-0">
                          <Monitor className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-slate-900 text-xs">Prevent Tear Film Evaporation</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Humans blink 60% less when viewing pixels. Blinking lubricates corneal lipid shielding.</p>
                        </div>
                      </div>

                      <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex justify-between items-center text-xs text-slate-600 font-mono">
                        <span>Completed breaks today:</span>
                        <span className="font-black text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">{fatigueCount}</span>
                      </div>
                    </div>

                  </div>

                  {/* Fatigue Completion Alert */}
                  {showFatigueAlert && (
                    <div className="p-4 bg-teal-50 border-2 border-teal-500 rounded-xl flex items-center justify-between gap-4 animate-bounce">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-teal-600 text-white rounded-lg text-sm">🔔</span>
                        <div>
                          <h4 className="font-display font-bold text-teal-950 text-sm">Break Alert: Relax Your Lens!</h4>
                          <p className="text-xs text-teal-800 font-sans">Look at something 20 feet away for 20 seconds. Take 10 deep blinks.</p>
                        </div>
                      </div>
                      <button
                        id="dismiss-fatigue-alert"
                        onClick={resetTimer}
                        className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                      >
                        Start Next Cycle
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Support CTA link */}
            <div id="playroom-footer-advisor" className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[11px] text-slate-500 font-sans text-center sm:text-left">
                Experiencing blurred lines, eye floaters, or glare at night? Consult our Bangladesh specialists.
              </p>
              <button
                id="interactive-consultation-shortcut"
                onClick={() => {
                  const element = document.getElementById('booking-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                Schedule diagnostic checkup
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
