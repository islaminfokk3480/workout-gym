export interface ServiceItem {
  id: string;
  title: string;
  iconName: string; // Used to resolve Lucide icon dynamically
  description: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  image: string;
  category: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  image: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category?: string;
  isUserUploaded?: boolean;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  daysPerWeek: number;
  description: string;
  exercises: string[];
}
