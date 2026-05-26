export interface Doctor {
  id: string;
  name: string;
  specialty: string;
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
  description: string;
  details: string[];
  icon: string; // Lucide icon name
  priceRange: string;
  duration: string;
  is3DHighlight?: boolean;
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
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
