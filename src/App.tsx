import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import InteractiveTest from './components/InteractiveTest';
import DoctorRoster from './components/DoctorRoster';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Doctor } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [preSelectedDoctor, setPreSelectedDoctor] = useState<Doctor | null>(null);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);

  // Smooth scroll handler to target section boundaries
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    // Identify target section HTML container
    let elementId = '';
    if (sectionId === 'home') elementId = 'hero-section';
    else if (sectionId === 'services') elementId = 'services-section';
    else if (sectionId === 'vision-test') elementId = 'vision-playroom-section';
    else if (sectionId === 'doctors') elementId = 'doctors-section';
    else if (sectionId === 'booking') elementId = 'booking-section';

    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-selection binders for doctor cards
  const handleSelectDoctorFromRoster = (doctor: Doctor) => {
    setPreSelectedDoctor(doctor);
    setPreSelectedServiceId(null);
    handleNavigate('booking');
  };

  // Pre-selection binders for specialized service items
  const handleSelectService = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedDoctor(null);
    handleNavigate('booking');
  };

  const clearPreSelections = () => {
    setPreSelectedDoctor(null);
    setPreSelectedServiceId(null);
  };

  return (
    <div id="alo-eyecare-root-layout" className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Sticky Ophthalmic Header */}
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
      />

      <main id="main-content-flow" className="relative">
        
        {/* Hero Section */}
        <Hero 
          onNavigate={handleNavigate} 
        />

        {/* Clinical Services and Refraction spotlight */}
        <Services 
          onSelectServiceForBooking={handleSelectService} 
        />

        {/* Visual Test Playroom (Acuity/Astigmatism/Ishihara Color checks) */}
        <InteractiveTest />

        {/* Professional Doctor Specialists List */}
        <DoctorRoster 
          onSelectDoctor={handleSelectDoctorFromRoster} 
        />

        {/* Stateful booking wizard flow */}
        <BookingForm 
          preSelectedDoctor={preSelectedDoctor}
          preSelectedServiceId={preSelectedServiceId}
          onClearPreSelections={clearPreSelections}
        />

        {/* Patient reviews and certifications */}
        <Testimonials />

      </main>

      {/* Footer and Map guide */}
      <Footer 
        onNavigate={handleNavigate} 
      />

    </div>
  );
}
