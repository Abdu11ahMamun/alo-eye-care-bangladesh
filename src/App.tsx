import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import InteractiveTest from './components/InteractiveTest';
import DoctorRoster from './components/DoctorRoster';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Doctor, Lang } from './types';

export default function App() {
  const [activeSection,        setActiveSection]        = useState('home');
  const [preSelectedDoctor,    setPreSelectedDoctor]    = useState<Doctor | null>(null);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  const [lang,                 setLang]                 = useState<Lang>('bn'); // বাংলা primary

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const idMap: Record<string, string> = {
      home:          'hero-section',
      services:      'services-section',
      'vision-test': 'vision-playroom-section',
      doctors:       'doctors-section',
      booking:       'booking-section',
      branches:      'footer-section',
    };
    const el = document.getElementById(idMap[sectionId] ?? sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setPreSelectedDoctor(doctor);
    setPreSelectedServiceId(null);
    handleNavigate('booking');
  };

  const handleSelectService = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedDoctor(null);
    handleNavigate('booking');
  };

  return (
    <div id="alo-eyecare-root" style={{ minHeight: '100vh', background: 'var(--brand-off-white)', color: 'var(--brand-text)' }}>
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} lang={lang} setLang={setLang} />
      <main>
        <Hero       onNavigate={handleNavigate} lang={lang} />
        <Services   onSelectServiceForBooking={handleSelectService} lang={lang} />
        <InteractiveTest lang={lang} />
        <DoctorRoster onSelectDoctor={handleSelectDoctor} lang={lang} />
        <BookingForm
          preSelectedDoctor={preSelectedDoctor}
          preSelectedServiceId={preSelectedServiceId}
          onClearPreSelections={() => { setPreSelectedDoctor(null); setPreSelectedServiceId(null); }}
          lang={lang}
        />
        <Testimonials lang={lang} />
      </main>
      <Footer onNavigate={handleNavigate} lang={lang} />
    </div>
  );
}