import React, { useState, useEffect } from 'react';
import { BRANCHES, SERVICES, DOCTORS, DIRECT_HELPLINE } from '../data';
import { Doctor, ServiceItem, BranchLocation, Appointment } from '../types';
import { Calendar, Phone, Mail, User, Clock, CheckCircle2, AlertCircle, Trash2, MapPin, Sparkles, HelpCircle } from 'lucide-react';

interface BookingFormProps {
  preSelectedDoctor: Doctor | null;
  preSelectedServiceId: string | null;
  onClearPreSelections: () => void;
}

export default function BookingForm({ 
  preSelectedDoctor, 
  preSelectedServiceId,
  onClearPreSelections
}: BookingFormProps) {
  // Wizard steps: 'fields' | 'success'
  const [step, setStep] = useState<'fields' | 'success'>('fields');
  
  // Guided state fields
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES[0].id);
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS[0].id);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Patient Contact
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');

  // Validation
  const [errorMsg, setErrorMsg] = useState('');
  
  // Local active appointment receipts history
  const [activeAppointments, setActiveAppointments] = useState<Appointment[]>([]);
  const [lastBookedTicket, setLastBookedTicket] = useState<Appointment | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('alo_eyecare_bookings');
      if (stored) {
        setActiveAppointments(JSON.parse(stored));
      }
    } catch (e) {
      // Graceful fallback
    }
  }, []);

  // Update selected service and doctor when parent triggers pre-selections
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
      // Try to select a doctor matching that service
      const matchingDoc = DOCTORS.find(d => {
        if (preSelectedServiceId === 'cataract') return d.specialty.includes('Cataract');
        if (preSelectedServiceId === 'lasik') return d.specialty.includes('Refractive') || d.specialty.includes('LASIK');
        if (preSelectedServiceId === 'pediatric') return d.specialty.includes('Pediatric');
        if (preSelectedServiceId === 'retina') return d.specialty.includes('Retina');
        if (preSelectedServiceId === 'glaucoma') return d.specialty.includes('Glaucoma');
        return false;
      });
      if (matchingDoc) {
        setSelectedDoctorId(matchingDoc.id);
        if (matchingDoc.timeSlots.length > 0) {
          setSelectedSlot(matchingDoc.timeSlots[0]);
        }
      }
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (preSelectedDoctor) {
      setSelectedDoctorId(preSelectedDoctor.id);
      if (preSelectedDoctor.timeSlots.length > 0) {
        setSelectedSlot(preSelectedDoctor.timeSlots[0]);
      }
      // Check if doctor matches specialty
      const matchedService = SERVICES.find(s => {
        if (s.id === 'cataract' && preSelectedDoctor.specialty.includes('Cataract')) return true;
        if (s.id === 'lasik' && preSelectedDoctor.specialty.includes('Refractive')) return true;
        if (s.id === 'pediatric' && preSelectedDoctor.specialty.includes('Pediatric')) return true;
        if (s.id === 'retina' && preSelectedDoctor.specialty.includes('Retina')) return true;
        if (s.id === 'glaucoma' && preSelectedDoctor.specialty.includes('Glaucoma')) return true;
        return false;
      });
      if (matchedService) {
        setSelectedServiceId(matchedService.id);
      }
    }
  }, [preSelectedDoctor]);

  // Adjust pre-selected doctor slot matching
  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];
  useEffect(() => {
    if (currentDoctor && !currentDoctor.timeSlots.includes(selectedSlot)) {
      setSelectedSlot(currentDoctor.timeSlots[0] || '');
    }
  }, [selectedDoctorId, currentDoctor, selectedSlot]);

  // Handle appointment scheduling reservation
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field audits
    if (!patientName.trim()) {
      setErrorMsg('Please input patient name for the digital pass.');
      return;
    }

    // BD Phone standard validation
    const cleanPhone = patientPhone.replace(/\s+/g, '');
    const bdPhoneRegex = /^(?:\+88|01)?\d{11}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setErrorMsg('Please provide a valid 11-digit Bangladeshi contact phone number (e.g., 01712345678).');
      return;
    }

    if (!selectedDate) {
      setErrorMsg('Please select a calendar date for the clinical chamber check.');
      return;
    }

    if (!selectedSlot) {
      setErrorMsg('Please select a convenient time slot.');
      return;
    }

    // Compose receipt payload
    const newBooking: Appointment = {
      id: 'ALO-' + Math.floor(100000 + Math.random() * 900000),
      patientName: patientName.trim(),
      patientPhone: cleanPhone,
      patientEmail: patientEmail.trim() || 'not_provided@aloeyecarebd.com',
      doctorId: selectedDoctorId,
      serviceId: selectedServiceId,
      branchId: selectedBranchId,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: patientNotes.trim(),
      createdAt: new Date().toLocaleDateString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    const updatedAppts = [newBooking, ...activeAppointments];
    setActiveAppointments(updatedAppts);
    setLastBookedTicket(newBooking);
    
    try {
      localStorage.setItem('alo_eyecare_bookings', JSON.stringify(updatedAppts));
    } catch (err) {
      // State bypass
    }

    setStep('success');
    onClearPreSelections();
  };

  const handleCancelAppointment = (id: string) => {
    const updated = activeAppointments.filter(app => app.id !== id);
    setActiveAppointments(updated);
    try {
      localStorage.setItem('alo_eyecare_bookings', JSON.stringify(updated));
    } catch (err) {
      // State bypass
    }
  };

  return (
    <section
      id="booking-section"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-teal-500/5 filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left Column: Form & Wizard UI inside a beautiful Bento Grid slot */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            
            {step === 'fields' ? (
              <form id="booking-wizard-form" onSubmit={handleBookingSubmit} className="space-y-6">
                
                <div className="border-b border-slate-100 pb-5">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-teal-600">Patient Area</span>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 mt-1">Book Chamber Appointment</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in the fields below. A digital visit ticket will be generated instantly for registration at the branch desks.
                  </p>
                  
                  {(preSelectedDoctor || preSelectedServiceId) && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between text-xs text-amber-950 font-bold">
                      <span>✓ Pre-selections applied from clinic database catalog</span>
                      <button 
                        type="button" 
                        onClick={() => {
                          onClearPreSelections();
                          setSelectedServiceId(SERVICES[0].id);
                          setSelectedDoctorId(DOCTORS[0].id);
                        }}
                        className="text-[10px] text-teal-700 underline hover:text-teal-900 cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Booking Alert:</strong> {errorMsg}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Select Branch */}
                  <div className="space-y-1.5 col-span-1">
                    <label id="branch-select-label" htmlFor="branch-picker" className="text-xs font-bold text-slate-700 block">Select Location Branch</label>
                    <select
                      id="branch-picker"
                      value={selectedBranchId}
                      onChange={(e) => setSelectedBranchId(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    >
                      {BRANCHES.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Service */}
                  <div className="space-y-1.5 col-span-1">
                    <label id="service-select-label" htmlFor="service-picker" className="text-xs font-bold text-slate-700 block">Ocular Service</label>
                    <select
                      id="service-picker"
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id}>{s.title} ({s.priceRange})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Doctor Specialist */}
                  <div className="space-y-1.5 col-span-1">
                    <label id="doctor-select-label" htmlFor="doctor-picker" className="text-xs font-bold text-slate-700 block">Consultant / Microsurgeon</label>
                    <select
                      id="doctor-picker"
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    >
                      {DOCTORS.map(d => (
                        <option key={d.id} value={d.id}>{d.name} — ({d.specialty})</option>
                      ))}
                    </select>
                  </div>

                  {/* Choose Calendar Date */}
                  <div className="space-y-1.5 col-span-1">
                    <label id="date-select-label" htmlFor="date-picker" className="text-xs font-bold text-slate-700 block">Date of Chamber Checkup</label>
                    <div className="relative">
                      <input
                        id="date-picker"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-mono"
                      />
                    </div>
                  </div>

                  {/* Choose Time Slot (Based on selected doctor's roster) */}
                  <div className="space-y-1.5 col-span-2">
                    <span className="text-xs font-bold text-slate-700 block">Select Available Chamber Slot</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentDoctor.timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          id={`timeslot-${slot.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold font-mono transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                              : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                <hr className="border-slate-100 my-4" />

                <div className="space-y-5">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-mono">Patient Contact Particulars</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Patient Name */}
                    <div className="col-span-1 space-y-1.5">
                      <label id="patient-name-label" htmlFor="patient-name-input" className="text-xs font-bold text-slate-700 block">Patient Legal Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          id="patient-name-input"
                          type="text"
                          required
                          placeholder="e.g. Tanvir Rahman"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    {/* Patient Phone */}
                    <div className="col-span-1 space-y-1.5">
                      <label id="patient-phone-label" htmlFor="patient-phone-input" className="text-xs font-bold text-slate-700 block">Mobile Phone (Bangladesh) *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          id="patient-phone-input"
                          type="tel"
                          required
                          placeholder="e.g. 01712345678"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                        />
                      </div>
                    </div>

                    {/* Patient Email */}
                    <div className="col-span-2 space-y-1.5">
                      <label id="patient-email-label" htmlFor="patient-email-input" className="text-xs font-bold text-slate-700 block">Email Address (Optional)</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          id="patient-email-input"
                          type="email"
                          placeholder="e.g. email@example.com"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    {/* Ocular Symptom Notes */}
                    <div className="col-span-2 space-y-1.5">
                      <label id="patient-notes-label" htmlFor="patient-notes-input" className="text-xs font-bold text-slate-700 block">Describe Symptoms (Optional)</label>
                      <textarea
                        id="patient-notes-input"
                        rows={3}
                        placeholder="e.g., Blur during night driving, eye pain, cataract history..."
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                  </div>
                </div>

                <div className="pt-4">
                  <button
                    id="submit-booking-action-btn"
                    type="submit"
                    className="three-d-button w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-white font-bold py-4 rounded-xl cursor-pointer"
                  >
                    Confirm Booking & Generate Pass
                  </button>
                  <p className="text-[10px] text-slate-400 font-sans text-center mt-3">
                    No credit card required. Consultation and surgery diagnostic billing is processed inside the diagnostic unit lobby relative to your BDT procedure.
                  </p>
                </div>

              </form>
            ) : (
              // Booking success confirmation panel (Styled as dynamic boarding pass)
              <div id="booking-success-display" className="space-y-6 text-center">
                
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Appointment Confirmed!
                </h3>
                
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                  Your registration ticket has been registered in the Alo Eye Care medical router system. Review the print ticket below:
                </p>

                {lastBookedTicket && (
                  // Gorgeous 10/10 3D Boarding Pass layout
                  <div 
                    id="optical-3d-pass-ticket"
                    className="lens-glass-convex border-2 border-emerald-500/30 p-6 rounded-2xl relative shadow-2xl text-left max-w-md mx-auto select-none"
                  >
                    {/* Micro alignment markings */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-xl"></div>
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 border-r border-slate-200"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 border-l border-slate-200"></div>

                    <div className="flex justify-between items-start border-b border-dashed border-slate-200 pb-4 mb-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">CHAMBER BOARDING PASS</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="font-display font-black text-lg text-slate-800 leading-none">ALOEYE</span>
                          <span className="text-[9px] border border-teal-500/20 text-teal-700 bg-teal-50 px-1 rounded font-bold">BD</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-slate-400 font-bold block">TICKET ID</span>
                        <span className="font-bold text-teal-700 font-mono leading-none tracking-wider">{lastBookedTicket.id}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">PATIENT NAME</span>
                        <span className="text-xs font-bold text-slate-800 tracking-wide font-sans block">{lastBookedTicket.patientName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">MOBILE PHONE</span>
                        <span className="text-xs font-mono font-bold text-slate-800 block">{lastBookedTicket.patientPhone}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">BRANCH LOCATION</span>
                        <span className="text-xs font-bold text-teal-800 block">
                          {BRANCHES.find(b => b.id === lastBookedTicket.branchId)?.name || 'Dhaka HQ'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">DOCTOR CONSULTANT</span>
                        <span className="text-xs font-bold text-slate-800 block">
                          {DOCTORS.find(d => d.id === lastBookedTicket.doctorId)?.name.split('. ').pop() || 'Specialist'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">DATE / SCHEDULE</span>
                        <span className="text-xs font-mono font-bold text-slate-800 block">{lastBookedTicket.date}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">CHAMBER SLOT</span>
                        <span className="text-xs font-mono font-bold text-teal-700 block">{lastBookedTicket.timeSlot}</span>
                      </div>
                    </div>

                    <div className="pt-4 text-center space-y-1">
                      <div className="inline-flex justify-center w-full">
                        {/* Simulated clinical vector bar code indicator */}
                        <div className="flex gap-[1.5px] items-stretch h-8 bg-slate-900 px-4 py-1.5 rounded max-w-[200px] opacity-80">
                          {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className="bg-white" style={{ width: `${(i % 3 === 0 ? 3 : (i % 4 === 0 ? 1 : 2))}px` }}></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-400 font-mono text-center">ALO-GEN-2026-CHAMBER-DESK</p>
                    </div>

                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
                  <button
                    id="new-slot-wizard-trigger"
                    onClick={() => {
                      setStep('fields');
                      setPatientName('');
                      setPatientPhone('');
                      setPatientNotes('');
                      setPatientEmail('');
                    }}
                    className="three-d-button w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 rounded-lg cursor-pointer"
                  >
                    Schedule Another Session
                  </button>
                  <button
                    id="ticket-directions-shortcut"
                    onClick={() => {
                      const element = document.getElementById('footer-map-container');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs py-3 rounded-lg"
                  >
                    Get Map Directions
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: Dynamic Booking Records History & Care helpline info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick contact card formatted as a high-contrast Bento block */}
            <div id="booking-helpline-card" className="bg-gradient-to-br from-teal-800 to-cyan-950 text-white p-8 sm:p-10 rounded-[2.5rem] text-left shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-8 -mt-8"></div>
              
              <div className="flex items-center gap-2 mb-4 bg-teal-700/50 px-3 py-1 rounded-full w-fit">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-cyan-200">Patient Helpline Desk</span>
              </div>

              <h4 className="font-display font-extrabold text-xl leading-snug">
                Need Immediate Ocular Guidance?
              </h4>
              <p className="text-slate-200 text-xs mt-2 leading-relaxed">
                Our ophthalmologists feature 24/7 tele-consulting loops for surgical complications and emergency cataract issues in Bangladesh.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                    <Phone className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-300 font-mono uppercase font-bold">Hotline (BD Toll-Free)</h5>
                    <a href={`tel:${DIRECT_HELPLINE}`} id="helpline-body-link" className="text-base font-black hover:underline text-white block">
                      {DIRECT_HELPLINE}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-300 font-mono uppercase font-bold">Surgical Desk Email</h5>
                    <a href="mailto:support@aloeyecarebd.com" className="text-xs font-bold text-cyan-200 hover:underline block">
                      support@aloeyecarebd.com
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Offline-First Local Booked Passes History Container matching Bento Grid specs */}
            <div id="booking-history-card" className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-left shadow-xl shadow-slate-200/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h4 className="font-display font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  Active Booking Passes ({activeAppointments.length})
                </h4>
              </div>

              {activeAppointments.length > 0 ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                  {activeAppointments.map((appt) => {
                    const docName = DOCTORS.find(d => d.id === appt.doctorId)?.name.split('. ').pop() || 'Specialist';
                    const branchName = BRANCHES.find(b => b.id === appt.branchId)?.name.split(' - ').pop() || 'Chamber';
                    const svcName = SERVICES.find(s => s.id === appt.serviceId)?.title || 'Treatment';
                    return (
                      <div 
                        key={appt.id} 
                        id={`ticket-item-${appt.id}`}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl relative group flex justify-between items-center text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono font-black text-slate-800 text-[11px]">{appt.id}</span>
                            <span className="text-[9px] bg-slate-200 px-1 py-0.5 rounded text-slate-600 font-medium">{branchName}</span>
                          </div>
                          <p className="font-semibold text-slate-900 mt-1 uppercase text-[10px]">{appt.patientName}</p>
                          <p className="text-slate-500 text-[10px] mt-0.5 leading-none">
                            <strong>{svcName}</strong> w/ Dr. {docName}
                          </p>
                          <p className="text-[10px] text-teal-700 font-mono mt-1">
                            {appt.date} @ {appt.timeSlot}
                          </p>
                        </div>
                        
                        <button
                          id={`delete-booking-btn-${appt.id}`}
                          onClick={() => handleCancelAppointment(appt.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer self-center"
                          title="Cancel Booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No scheduled bookings found in this browser state yet.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
