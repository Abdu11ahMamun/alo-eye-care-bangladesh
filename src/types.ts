export interface Doctor {
  id: string;
  name: string;
  nameBn: string;
  specialty: string;
  specialtyBn: string;
  degree: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
  timeSlots: string[];
  bdtFees: number;
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  details: string[];
  detailsBn: string[];
  icon: string;
  priceRange: string;
  duration: string;
  is3DHighlight?: boolean;
}

export interface BranchLocation {
  id: string;
  name: string;
  nameBn: string;
  address: string;
  addressBn: string;
  phone: string;
  hours: string;
  hoursBn: string;
  mapEmbed?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  serviceId: string;
  branchId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
}

export interface TestResult {
  acuityScore: string;
  astigmatismStatus: string;
  colorBlindnessAnswers: number;
  overallRating: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameBn: string;
  location: string;
  rating: number;
  text: string;
  textBn: string;
  service: string;
}

export interface Stat {
  value: string;
  valueBn: string;
  label: string;
  labelBn: string;
}

/* Language toggle context type */
export type Lang = 'en' | 'bn';