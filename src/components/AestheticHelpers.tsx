import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell } from 'lucide-react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] bg-white/[0.05] z-50 overflow-hidden pointer-events-none">
      <div
        style={{ width: `${scrollProgress}%` }}
        className="h-full bg-gradient-to-r from-brand-orange via-brand-orange-light to-white transition-all duration-100 shadow-[0_0_8px_#ff7b00]"
      />
    </div>
  );
}

export function PremiumPreloader() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const totalTime = 1600; // 1.6s
    const step = 20; // 20ms update interval
    const increment = 100 / (totalTime / step);

    const timer = setInterval(() => {
      setLoadingPercent((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Wait a bit then set isDone
          setTimeout(() => setIsDone(true), 250);
          return 100;
        }
        return next;
      });
    }, step);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          id="premium-preloader-overlay"
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Subtle glowing spot behind logo */}
          <div className="absolute w-[300px] h-[300px] bg-brand-orange/10 rounded-full blur-[100px] animate-pulse" />

          <div className="relative text-center space-y-6 flex flex-col items-center">
            {/* Dumbbell scale-up glow animation */}
            <motion.div
              animate={{ 
                scale: [0.9, 1.1, 0.9],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="p-5 rounded-2xl bg-brand-orange text-black shadow-2xl neon-glow-orange-lg"
            >
              <Dumbbell className="w-10 h-10 fill-black stroke-[2.5]" />
            </motion.div>

            {/* App name reveal */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-2xl sm:text-3xl tracking-widest text-white uppercase block leading-none">
                WORKOUT <span className="text-brand-orange">GYM</span>
              </h1>
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mt-1">
                1st Branch Scheme 33 Karachi
              </span>
            </div>

            {/* Percentage loader counting */}
            <div className="pt-4 space-y-2 w-48 mx-auto">
              <div className="flex justify-between items-baseline font-mono text-[10px] text-gray-400 tracking-wider">
                <span>SYSTEM CALIBRATION</span>
                <span className="text-brand-orange font-bold">{Math.floor(loadingPercent)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${loadingPercent}%` }}
                  className="h-full bg-brand-orange rounded-full shadow-[0_0_10px_rgba(255,123,0,0.5)] transition-all duration-75"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        transform: `translate3d(${position.x - 175}px, ${position.y - 175}px, 0)`,
      }}
      className="fixed inset-0 w-[350px] h-[350px] bg-brand-orange/4 rounded-full blur-[100px] pointer-events-none z-30 transition-transform duration-100 ease-out"
    />
  );
}
