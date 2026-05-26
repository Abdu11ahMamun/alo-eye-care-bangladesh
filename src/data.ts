import { Doctor, ServiceItem, BranchLocation } from './types';

export const BRANCHES: BranchLocation[] = [
  {
    id: 'dhanmondi',
    name: 'Dhaka - Dhanmondi (HQ)',
    address: 'Level 4, Navana Tower, Rd 8/A (Near Satmasjid Road), Dhanmondi R/A, Dhaka - 1209',
    phone: '+880 1789-900800',
    hours: 'Sat - Thu: 9:00 AM - 9:00 PM | Fri: Closed',
  },
  {
    id: 'uttara',
    name: 'Dhaka - Uttara Branch',
    address: 'House 42, Road 18, Sector 11, Uttara, Dhaka - 1230',
    phone: '+880 1789-900801',
    hours: 'Sat - Thu: 10:00 AM - 8:00 PM | Fri: 3:00 PM - 8:00 PM',
  },
  {
    id: 'chattogram',
    name: 'Chattogram - GEC Care Center',
    address: 'Equity Garden, GEC Circle, O.R. Nizam Road, Chattogram',
    phone: '+880 1845-667788',
    hours: 'Sat - Thu: 10:00 AM - 8:00 PM | Fri: Closed',
  },
  {
    id: 'sylhet',
    name: 'Sylhet - Zindabazar Center',
    address: 'Mahanagar Mansion, Level 3, East Zindabazar, Sylhet',
    phone: '+880 1922-334455',
    hours: 'Sat - Thu: 11:00 AM - 7:00 PM | Fri: Evening emergency services only',
  }
];

export const DIRECT_HELPLINE = '+880 9613-800800';

export const SERVICES: ServiceItem[] = [
  {
    id: 'cataract',
    title: 'Advanced Phaco Surgery',
    description: 'Micro-incision cataract surgery with ultra-modern premium intraocular lens (IOL) implants.',
    details: [
      'Stitchless, injection-less, and painless 10-minute procedure',
      'Wide selection of Premium Multifocal and Toric IOLs',
      'Rapid visually responsive recovery within 24 hours',
      'Equipped with state-of-the-art Centurion Vision System'
    ],
    icon: 'Eye',
    priceRange: '৳45,000 - ৳1,20,000',
    duration: '15 mins',
    is3DHighlight: true
  },
  {
    id: 'lasik',
    title: 'LASIK & Refractive Suite',
    description: 'Get freedom from glasses and contact lenses with high-precision computer-guided laser correction.',
    details: [
      'Advanced Wavefront-Guided Custom LASIK treatment',
      'Blade-free Femto-LASIK options for ultimate safety',
      'Painless corneal reshaping with high-accuracy results',
      'Suitable for myopia, hyperopia, and astigmatism correction'
    ],
    icon: 'Sparkles',
    priceRange: '৳60,000 - ৳95,000',
    duration: '20 mins',
    is3DHighlight: true
  },
  {
    id: 'pediatric',
    title: 'Pediatric & Strabismus Unit',
    description: 'Specialized eye care and squint correction for infants, children, and school-going patients.',
    details: [
      'Friendly diagnostic environments tailored for children',
      'Amblyopia (lazy eye) therapy and tracking',
      'Non-surgical and surgical squint correction',
      'Myopia control clinic with specialized orthokeratology'
    ],
    icon: 'Users',
    priceRange: '৳1,500 - ৳25,000',
    duration: '30 mins'
  },
  {
    id: 'retina',
    title: 'Diabetic Retinal Care',
    description: 'Advanced diagnosis and expert therapy for diabetic retinopathy and macular disease.',
    details: [
      'High-resolution Optical Coherence Tomography (OCT)',
      'Digital fundus photography and fluorescein angiography',
      'Intravitreal injections and advanced pattern laser therapy',
      'Expert Vitreo-retinal surgeon consultation'
    ],
    icon: 'ShieldAlert',
    priceRange: '৳2,500 - ৳15,000',
    duration: '25 mins'
  },
  {
    id: 'glaucoma',
    title: 'Glaucoma Management',
    description: 'Early detection and comprehensive nerve pressure stabilization to preserve your visual field.',
    details: [
      'Non-contact Tonometry + Goldmann Applanation',
      'Humphrey Visual Field (HVF) analysis',
      'Laser Peripheral Iridotomy (LPI) therapy',
      'Customized long-term pressure stabilization'
    ],
    icon: 'Activity',
    priceRange: '৳2,000 - ৳8,000',
    duration: '20 mins'
  },
  {
    id: 'spectacles',
    title: 'Precision Sight & Optics',
    description: 'In-house optical suite for computerized eye screening and custom lens crafting.',
    details: [
      'Fully computerized auto-refractor ocular evaluation',
      'Subtle prescription pairing for digital eye-strain relief',
      'Wide brand range of anti-reflective, blue-cut, and transition lenses',
      'Guaranteed 1-hour delivery for primary single-vision prescriptions'
    ],
    icon: 'Glasses',
    priceRange: '৳800 - ৳12,000',
    duration: '10 mins'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr_mazhar',
    name: 'Prof. Dr. Mazharul Alam',
    specialty: 'Cataract, Cornea & Refractive Surgeon',
    degree: 'MBBS, FCPS (Ophth), MS (Ocular Micro-Surgery), Fellowship in Cornea (Inland/Overseas)',
    rating: 4.9,
    reviewsCount: 342,
    availableDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
    timeSlots: ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'],
    bdtFees: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'dr_nusrat',
    name: 'Dr. Nusrat Jahan Chowdhury',
    specialty: 'Pediatric Ophthalmology & Squint Specialist',
    degree: 'MBBS, DO, FCPS (Ophthalmology), Fellow- Pediatric Ophthalmology',
    rating: 4.8,
    reviewsCount: 194,
    availableDays: ['Sunday', 'Monday', 'Wednesday', 'Thursday'],
    timeSlots: ['03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'],
    bdtFees: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'dr_shamsul',
    name: 'Dr. Shamsul Haque Manik',
    specialty: 'Vitreo-Retina & Laser Specialist',
    degree: 'MBBS, MS (Ophthalmology), Trained in Vitreo-Retina (India)',
    rating: 4.9,
    reviewsCount: 228,
    availableDays: ['Saturday', 'Monday', 'Tuesday', 'Wednesday'],
    timeSlots: ['04:30 PM', '05:30 PM', '06:30 PM', '07:30 PM'],
    bdtFees: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'dr_shamim',
    name: 'Dr. Shamim Ara Chowdhury',
    specialty: 'Glaucoma Specialist & General Consultant',
    degree: 'MBBS, FCPS (Ophthalmology), Fellow Glaucoma (Isfahan)',
    rating: 4.7,
    reviewsCount: 156,
    availableDays: ['Saturday', 'Sunday', 'Tuesday', 'Thursday'],
    timeSlots: ['05:00 PM', '06:00 PM', '07:00 PM'],
    bdtFees: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200'
  }
];
