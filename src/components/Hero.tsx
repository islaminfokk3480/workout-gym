import { motion } from 'motion/react';
import { ChevronDown, Dumbbell, Phone, Flame } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  onJoinClick: () => void;
  onCallClick: () => void;
  onScrollDownClick: () => void;
}

export default function Hero({ onJoinClick, onCallClick, onScrollDownClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-24"
    >
      {/* Premium Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Premium Gym Interior Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_8s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/95 z-1" />
      </div>

      {/* Orange Radial Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-orange/10 rounded-full blur-[100px] md:blur-[180px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-brand-orange/15 rounded-full blur-[80px] md:blur-[150px] pointer-events-none z-1" />

      {/* Animated Floating Particles (Aesthetic decoration) */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-brand-orange/40 particle-animation-1" />
        <div className="absolute top-[60%] left-[25%] w-3 h-3 rounded-full bg-brand-orange/30 particle-animation-2" />
        <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-brand-orange/50 particle-animation-3" />
        <div className="absolute bottom-[20%] left-[45%] w-2 h-2 rounded-full bg-brand-orange/40 particle-animation-2" />
        <div className="absolute top-[80%] right-[30%] w-3 h-3 rounded-full bg-brand-orange/20 particle-animation-1" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Giant backdrop background text */}
        <div className="absolute top-0 left-6 opacity-[0.03] pointer-events-none select-none hidden lg:block">
          <span className="text-[240px] font-black leading-none italic block">GYM</span>
        </div>

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.25em] mb-8 border-l-2 border-brand-orange backdrop-blur-sm"
        >
          1st Branch — Scheme 33, Karachi, Pakistan
        </motion.div>

        {/* Big Display Headings */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] text-white block uppercase italic mb-6"
        >
          BUILD YOUR<br/>
          <span className="text-brand-orange drop-shadow-[0_0_15px_rgba(255,123,0,0.35)] block mt-1">
            BEST BODY
          </span>
        </motion.h1>

        {/* Subtitle description with left border */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xl text-sm sm:text-base md:text-lg text-white/70 font-sans leading-relaxed border-l-2 border-brand-orange/40 pl-6 text-left mx-auto"
        >
          Transform your fitness journey at Malik Society, Scheme 33. Experience elite-level bodybuilding and powerlifting training with specialized commercial biomechanic gear and expert coaching.
        </motion.p>

        {/* Dynamic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <motion.button
            onClick={onJoinClick}
            id="hero-join-btn"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,123,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-brand-orange via-brand-orange-light to-[#ffaa00] text-black font-black uppercase tracking-widest text-sm rounded-full shadow-lg shadow-brand-orange/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 group"
          >
            <Flame className="w-5 h-5 fill-black group-hover:animate-bounce" />
            JOIN THE TRIBE
          </motion.button>

          <motion.a
            href="tel:03313960054"
            id="hero-call-btn"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,123,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-brand-orange text-brand-orange font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 group"
          >
            <Phone className="w-4.5 h-4.5 fill-transparent group-hover:rotate-12 transition-transform duration-300" />
            CALL PHONE
          </motion.a>
        </motion.div>

        {/* Scroll Down Animation */}
        <motion.button
          onClick={onScrollDownClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          id="hero-scroll-btn"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-brand-orange/40 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(255,123,0,0.2)]">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <Dumbbell className="w-5 h-5 text-brand-orange group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors">
            SCROLL DOWN
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-brand-orange transition-colors" />
        </motion.button>
      </div>
    </section>
  );
}
