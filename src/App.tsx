import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Equipment from './components/Equipment';
import MembershipPlans from './components/MembershipPlans';
import BMICalculator from './components/BMICalculator';
import WorkoutPlans from './components/WorkoutPlans';
import WorkoutTracker from './components/WorkoutTracker';
import Gallery from './components/Gallery';
import TrainersSection from './components/TrainersSection';
import GoogleRating from './components/GoogleRating';
import FooterAndContact from './components/FooterAndContact';
import { 
  ScrollProgressBar, 
  PremiumPreloader, 
  CursorGlow 
} from './components/AestheticHelpers';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for fixed navbar
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Detect which section is currently active/visible in viewport
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'equipment', 'membership', 'tracker', 'gallery', 'reviews', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // trigger highlight when section takes up centered viewport block
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303] text-gray-100 overflow-x-hidden selection:bg-brand-orange selection:text-black">
      {/* 1. Premium Loader Overlay (counts up to 100%) */}
      <PremiumPreloader />

      {/* 2. Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 3. Subtle Desktop Cursor Ambient Glow */}
      <CursorGlow />

      {/* 4. Sticky Glassmorphic Header */}
      <Navbar onNavClick={handleScrollToSection} activeSection={activeSection} />

      {/* 5. Hero Presentation Layer */}
      <Hero 
        onJoinClick={() => handleScrollToSection('membership')}
        onCallClick={() => {
          window.location.href = 'tel:03313960054';
        }}
        onScrollDownClick={() => handleScrollToSection('about')}
      />

      {/* 6. Brand Story & Statistics Counter */}
      <About />

      {/* 7. Detailed Specialized Services Grid */}
      <Services />

      {/* 8. Categorized High-End Equipment Cards */}
      <Equipment />

      {/* 9. Interactive Value Pricing Plans */}
      <MembershipPlans />

      {/* 10. Interactive Body Mass Index Dial */}
      <BMICalculator />

      {/* 11. Interactive Exercise Log Protocols */}
      <WorkoutPlans />

      {/* 12. Personalized Daily Fitness Goals & Tracker */}
      <WorkoutTracker />

      {/* 13. Dynamic Atmosphere Workout Gallery */}
      <Gallery />

      {/* 14. Certified Expert Personal Trainers */}
      <TrainersSection />

      {/* 13. Verified Google Rating and Reviews */}
      <GoogleRating />

      {/* 14. Integrated Map, Form, Quick Action Buttons and Legal Footer */}
      <FooterAndContact onNavClick={handleScrollToSection} />
    </div>
  );
}
