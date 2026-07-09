import { 
  ServiceItem, 
  EquipmentItem, 
  Trainer, 
  MembershipPlan, 
  Testimonial, 
  GalleryItem, 
  WorkoutPlan 
} from './types';

// Let's reference the real generated images from our build asset pipeline
export const IMAGES = {
  hero: '/src/assets/images/hero_background_1783598592640.jpg',
  dumbbells: '/src/assets/images/gym_gallery_1_1783598612346.jpg',
  treadmills: '/src/assets/images/gym_gallery_2_1783598629322.jpg',
  trainerMale: '/src/assets/images/gym_trainer_1_1783598647727.jpg',
  trainerFemale: '/src/assets/images/gym_trainer_2_1783598662773.jpg',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Weight Training',
    iconName: 'Dumbbell',
    description: 'Build robust raw power with high-quality free weights, barbells, dumbbells, and plates designed for heavy lifters.'
  },
  {
    id: 's2',
    title: 'Fat Loss Programs',
    iconName: 'Flame',
    description: 'High-intensity conditioning, metabolic circuits, and cardio-intensive routines tailored for fast fat burning.'
  },
  {
    id: 's3',
    title: 'Muscle Building',
    iconName: 'Sparkles',
    description: 'Hypertrophy-focused training programs designed with science-backed principles to pack on dense muscle mass.'
  },
  {
    id: 's4',
    title: 'Cardio Training',
    iconName: 'Activity',
    description: 'Boost endurance with our modern zone of treadmills, ellipticals, spin cycles, and rowing equipment.'
  },
  {
    id: 's5',
    title: 'Diet Guidance',
    iconName: 'Apple',
    description: 'Personalized meal guidelines and nutrient breakdowns to fuel workouts and accelerate body transformation.'
  },
  {
    id: 's6',
    title: 'Personal Training',
    iconName: 'UserCheck',
    description: 'Work 1-on-1 with Karachi’s most elite personal trainers for tailored planning and flawless lifting form.'
  },
  {
    id: 's7',
    title: 'Stretching Area',
    iconName: 'Layers',
    description: 'Dedicated post-workout active recovery zones, flexibility mats, foam rollers, and resistance bands.'
  },
  {
    id: 's8',
    title: 'Functional Training',
    iconName: 'Zap',
    description: 'Athletic agility ladders, kettlebell zones, medicine ball walls, and battle ropes for explosive movement.'
  }
];

export const EQUIPMENTS: EquipmentItem[] = [
  {
    id: 'eq1',
    name: 'Bench Press',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
    category: 'Strength'
  },
  {
    id: 'eq2',
    name: 'Smith Machine',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    category: 'Strength'
  },
  {
    id: 'eq3',
    name: 'Cable Machine',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
    category: 'Strength/Cable'
  },
  {
    id: 'eq4',
    name: 'Leg Press',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop',
    category: 'Legs'
  },
  {
    id: 'eq5',
    name: 'Squat Rack',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    category: 'Strength'
  },
  {
    id: 'eq6',
    name: 'Treadmills',
    image: IMAGES.treadmills, // Our high-quality generated cardio asset
    category: 'Cardio'
  },
  {
    id: 'eq7',
    name: 'Elliptical',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
    category: 'Cardio'
  },
  {
    id: 'eq8',
    name: 'Dumbbells Set',
    image: IMAGES.dumbbells, // Our high-quality generated free weights asset
    category: 'Free Weights'
  },
  {
    id: 'eq9',
    name: 'Barbells Station',
    image: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=600&auto=format&fit=crop',
    category: 'Free Weights'
  },
  {
    id: 'eq10',
    name: 'Cardio Machines',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop',
    category: 'Cardio'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Coach Hamza Malik',
    specialization: 'Strength Training & Hypertrophy Specialist',
    image: IMAGES.trainerMale,
    instagram: '#',
    facebook: '#',
    twitter: '#'
  },
  {
    id: 't2',
    name: 'Coach Zara Shah',
    specialization: 'HIIT Conditioning & Fat Loss Coach',
    image: IMAGES.trainerFemale,
    instagram: '#',
    facebook: '#',
    twitter: '#'
  },
  {
    id: 't3',
    name: 'Coach Bilal Afridi',
    specialization: 'Functional Agility & Kettlebell Coach',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop',
    instagram: '#',
    facebook: '#',
    twitter: '#'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'p1',
    name: 'Starter',
    price: '3,000',
    period: 'month',
    description: 'Perfect for beginners focused strictly on structural strength training.',
    features: [
      'Basic Gym Floor Access',
      'Free Weight & Machine Zones',
      'Locker & Shower Access',
      '1x Form Orientation Session',
      'Open Daily (Closing 1:00 AM)',
    ],
    isPopular: false
  },
  {
    id: 'p2',
    name: 'Standard',
    price: '4,500',
    period: 'month',
    description: 'Our most highly recommended plan for active daily gym goers.',
    features: [
      'Gym floor + Full Cardio Access',
      'Dedicated Treadmill Zone',
      'Stretching & recovery area access',
      'Custom Diet Guide Blueprint',
      '2x Personal Training Consults',
      'Open Daily (Closing 1:00 AM)',
    ],
    isPopular: true
  },
  {
    id: 'p3',
    name: 'Premium',
    price: '9,500',
    period: 'month',
    description: 'Unleash elite gains with a dedicated personal trainer and customized tracking.',
    features: [
      'All-Access Gym & Cardio Zones',
      '1-on-1 Certified Personal Trainer',
      'Weekly Diet & Bio-signature analysis',
      'Exclusive Functional Agility access',
      'Complimentary pre-workout hydration',
      'Open Daily (Closing 1:00 AM)',
    ],
    isPopular: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'tm1',
    name: 'Haris Khan',
    rating: 5,
    text: 'Amazing gym environment! The equipment is in top-notch shape, and the coaches are exceptionally welcoming. Best gym in Scheme 33!',
    date: '1 week ago'
  },
  {
    id: 'tm2',
    name: 'Sana Fatima',
    rating: 5,
    text: 'Best trainers in Karachi. Coach Zara helped me design my diet and cardio program. Highly structured and perfect for women.',
    date: '3 weeks ago'
  },
  {
    id: 'tm3',
    name: 'Adnan Siddiqui',
    rating: 5,
    text: 'Affordable membership compared to the premium level of machines they have. Open till 1:00 AM, which is perfect for my night schedule.',
    date: '1 month ago'
  },
  {
    id: 'tm4',
    name: 'Zainab Jamil',
    rating: 5,
    text: 'Excellent equipment, and very clean environment. I highly recommend Workout Gym 1st Branch to all fitness lovers.',
    date: '2 months ago'
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    src: IMAGES.hero,
    alt: 'Luxury Gym Floor',
    category: 'Interior'
  },
  {
    id: 'g2',
    src: IMAGES.dumbbells,
    alt: 'Premium Dumbbells Set',
    category: 'Equipment'
  },
  {
    id: 'g3',
    src: IMAGES.treadmills,
    alt: 'Cardio Zone Treadmills',
    category: 'Cardio'
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    alt: 'Squat Rack and Free Weights',
    category: 'Interior'
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop',
    alt: 'Lifting Session',
    category: 'Training'
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    alt: 'Lifting Bench Stations',
    category: 'Equipment'
  }
];

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'wp1',
    title: 'Beginner Foundation',
    difficulty: 'Beginner',
    duration: '4 Weeks',
    daysPerWeek: 3,
    description: 'Establish correct motor patterns, build standard strength baseline, and master lifting form safely.',
    exercises: [
      'Goblet Squats (3 sets x 10 reps)',
      'Incline Dumbbell Bench Press (3 sets x 10 reps)',
      'Seated Cable Rows (3 sets x 12 reps)',
      'Lying Dumbbell Leg Curls (3 sets x 12 reps)',
      'Standing Dumbbell Shoulder Press (3 sets x 10 reps)',
      'Plank Holds (3 sets x 45 seconds)'
    ]
  },
  {
    id: 'wp2',
    title: 'Hypertrophy Split',
    difficulty: 'Intermediate',
    duration: '8 Weeks',
    daysPerWeek: 4,
    description: 'Designed for optimal muscle growth using standard Upper/Lower split structure with progressive overload.',
    exercises: [
      'Barbell Squats (4 sets x 8 reps)',
      'Flat Barbell Bench Press (4 sets x 8 reps)',
      'Romanian Deadlifts (4 sets x 10 reps)',
      'Lat Pulldowns (4 sets x 10 reps)',
      'Lateral Raises (3 sets x 15 reps)',
      'Cable Tricep Pushdowns (3 sets x 12 reps)',
      'Incline Alternating Bicep Curls (3 sets x 12 reps)'
    ]
  },
  {
    id: 'wp3',
    title: 'Elite Power & Agility',
    difficulty: 'Advanced',
    duration: '12 Weeks',
    daysPerWeek: 5,
    description: 'Intense strength-building block focusing on the Big Three lifts, accompanied by high-powered functional conditioning.',
    exercises: [
      'Deadlifts (5 sets x 5 reps - 85% 1RM)',
      'Overhead Barbell Press (5 sets x 5 reps)',
      'Weighted Pull-ups (4 sets x 6 reps)',
      'Smith Machine Bulgarian Split Squats (4 sets x 8 reps)',
      'Hanging Knee-to-Elbow Raises (4 sets x 15 reps)',
      '10-Min Kettlebell HIIT Finisher'
    ]
  }
];
