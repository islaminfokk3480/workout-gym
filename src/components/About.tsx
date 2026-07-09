import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Star, 
  Clock, 
  Shield, 
  Cpu, 
  Award, 
  Heart, 
  Flame, 
  Smile, 
  Dumbbell, 
  Zap 
} from 'lucide-react';

// A lightweight custom animated counter hook or component
function AnimatedCounter({ value, duration = 2000, suffix = '', precision = 0 }: { value: number; duration?: number; suffix?: string; precision?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.min(Math.abs(Math.floor(totalMiliseconds / end)), 50);
    const step = (end / totalMiliseconds) * incrementTime;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(parseFloat(start.toFixed(precision)));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView, precision]);

  return (
    <span ref={elementRef} className="font-display font-black text-4xl sm:text-5xl text-brand-orange neon-text-orange">
      {count.toFixed(precision)}{suffix}
    </span>
  );
}

export default function About() {
  const whyChooseUsData = [
    {
      title: 'Modern Equipment',
      icon: Cpu,
      description: 'Pristine biomechanically flawless machines and multi-rack barbell units.',
      glowColor: 'rgba(255, 123, 0, 0.2)',
    },
    {
      title: 'Certified Trainers',
      icon: Award,
      description: 'Karachi’s elite fitness coaches providing highly customized scientific instruction.',
      glowColor: 'rgba(255, 123, 0, 0.2)',
    },
    {
      title: 'Affordable Membership',
      icon: Shield,
      description: 'Value-oriented, direct, upfront pricing plans with no hidden initiation costs.',
      glowColor: 'rgba(255, 123, 0, 0.2)',
    },
    {
      title: 'Clean Environment',
      icon: Heart,
      description: 'Daily sanitization schedules, ventilation systems, and spotless changing facilities.',
      glowColor: 'rgba(255, 123, 0, 0.2)',
    },
    {
      title: 'Cardio Zone',
      icon: Zap,
      description: 'Row of commercial treadmills and ellipticals for deep metabolic output.',
      glowColor: 'rgba(255, 123, 0, 0.2)',
    },
    {
      title: 'Weight Training',
      icon: Dumbbell,
      description: 'Heavy standard power racks, dedicated Olympic platforms, and high dumbbell range.',
      glowColor: 'rgba(255, 123, 0, 0.2)',
    },
    {
      title: 'Friendly Community',
      icon: Smile,
      description: 'Supportive, high-energy environment built on shared success and direct focus.',
      glowColor: 'rgba(255, 123, 0, 0.2)',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
              THE WORKOUT LEGACY
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
              ABOUT <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange drop-shadow-[0_0_10px_rgba(255,123,0,0.25)]">WORKOUT GYM</span>
            </h2>

            <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed tracking-wide border-l border-white/10 pl-6">
              Workout Gym is one of Karachi’s most trusted premium fitness centers, offering professional heavy-duty equipment, experienced dedicated trainers, an isolated intensive cardio zone, specialized strength training modules, and an ultra-motivating gym floor environment designed for absolute beginners and seasonal professionals.
            </p>

            {/* Grid of counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(255,123,0,0.3)' }}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/5 transition-all duration-300"
              >
                <Users className="w-5 h-5 text-gray-500 mb-2" />
                <AnimatedCounter value={500} suffix="+" />
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider mt-1">Active Members</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(255,123,0,0.3)' }}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/5 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 text-gray-500 mb-2" />
                <AnimatedCounter value={86} suffix="+" />
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider mt-1">Google Reviews</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(255,123,0,0.3)' }}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/5 transition-all duration-300"
              >
                <Star className="w-5 h-5 text-brand-orange mb-2 fill-brand-orange/20" />
                <AnimatedCounter value={4.6} precision={1} suffix="★" />
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider mt-1">Google Rating</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(255,123,0,0.3)' }}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/5 transition-all duration-300"
              >
                <Clock className="w-5 h-5 text-gray-500 mb-2" />
                <AnimatedCounter value={5} suffix="+" />
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider mt-1">Years Running</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Visual block */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
                alt="Intense workout"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl glass-card border border-white/10 shadow-2xl">
                <Flame className="w-8 h-8 text-brand-orange mb-3" />
                <div className="font-display font-bold text-lg text-white">ESTABLISHED IN KARACHI</div>
                <div className="text-xs text-gray-400 mt-1 leading-relaxed font-sans">
                  Located in the heart of Scheme 33, Malik Co-Operative Housing Society. Serving the community since 2021.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us Header */}
        <div className="mt-28 space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            THE HIGHER STANDARD
          </div>
          <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white block uppercase italic">
            WHY <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">CHOOSE US</span>
          </h3>
          <p className="text-gray-400 font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
            Every element of Workout Gym is structured to provide an unparalleled training standard, keeping your safety and progress at the center.
          </p>
        </div>

        {/* Why Choose Us Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {whyChooseUsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, borderColor: 'rgba(255, 123, 0, 0.4)' }}
                className="glass-card p-6 rounded-2xl border border-white/5 relative group overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  boxShadow: `0 0 0 rgba(255, 123, 0, 0)`,
                }}
              >
                {/* Glow Backdrop */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: 'rgba(255, 123, 0, 0.15)' }}
                />

                <div className="inline-flex p-3 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mb-4 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,123,0,0.15)]">
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="font-display font-bold text-lg text-white group-hover:text-brand-orange transition-colors duration-200">
                  {item.title}
                </h4>

                <p className="text-gray-400 font-sans text-xs mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Neon Accent Bar */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-brand-orange/10 group-hover:bg-brand-orange transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
