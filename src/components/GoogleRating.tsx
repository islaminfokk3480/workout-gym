import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function GoogleRating() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Auto slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Google review distribution data (mocked realistic percentages for 4.6 average with 86 reviews)
  const distribution = [
    { stars: 5, percentage: 76, count: 65 },
    { stars: 4, percentage: 14, count: 12 },
    { stars: 3, percentage: 5, count: 4 },
    { stars: 2, percentage: 2, count: 2 },
    { stars: 1, percentage: 3, count: 3 },
  ];

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            CLIENT SATISFACTION
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
            GOOGLE <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">REVIEWS</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
            See what our dedicated community says about their real body gains, training floor experiences, and our expert coaching staff.
          </p>
        </div>

        {/* Big Reviews Grid (Rating Card vs Testimonials Slider) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 items-stretch">
          
          {/* Column 1: Google Rating Card (4 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl glass-card border border-white/5 relative overflow-hidden group">
            {/* Ambient orange highlight */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

            <div className="space-y-6">
              {/* Rating Title Block */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-display font-black text-2xl text-brand-orange shadow-inner">
                  G
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">Google Business</h3>
                  <p className="text-xs text-gray-400 font-mono">Workout Gym 1st Branch</p>
                </div>
              </div>

              {/* Big Star and Number */}
              <div className="flex items-baseline gap-4 pt-2">
                <span className="font-display font-black text-6xl text-white leading-none">4.6</span>
                <div className="space-y-1">
                  <div className="flex items-center text-brand-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 fill-brand-orange ${i === 4 ? 'opacity-60 stroke-[1.5]' : ''}`} 
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">Based on 86 Verified Reviews</p>
                </div>
              </div>

              {/* Star Progress Bars */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {distribution.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400 w-3 text-right">{row.stars}</span>
                    <Star className="w-3.5 h-3.5 text-brand-orange fill-brand-orange flex-shrink-0" />
                    
                    {/* The Bar */}
                    <div className="h-2 flex-grow bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-dark rounded-full"
                      />
                    </div>

                    <span className="text-xs font-mono text-gray-500 w-8 text-right">{row.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Review Button */}
            <div className="pt-8">
              <a
                href="https://www.google.com/search?q=WORKOUT+GYM+1st+branch+karachi"
                target="_blank"
                rel="noreferrer"
                id="google-review-cta-btn"
                className="w-full py-4 bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black font-black text-xs tracking-widest uppercase skew-x-[-12deg] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <div className="skew-x-[12deg] flex items-center justify-center gap-2">
                  Review Us on Google
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Testimonials Auto Slider (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl glass-card border border-white/5 relative overflow-hidden">
            
            {/* Header / Quote icon decor */}
            <div className="flex items-center justify-between">
              <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-mono text-[10px] text-gray-400">
                <span>FEEDBACK LOOP</span>
              </div>
            </div>

            {/* Testimonial slider body with AnimatePresence */}
            <div className="my-8 min-h-[160px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center text-brand-orange gap-0.5">
                    {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>

                  <p className="font-display font-medium text-lg sm:text-xl md:text-2xl text-white italic leading-relaxed tracking-wide">
                    "{TESTIMONIALS[activeIndex].text}"
                  </p>

                  <div className="pt-2">
                    <span className="font-display font-bold text-white text-base block">
                      {TESTIMONIALS[activeIndex].name}
                    </span>
                    <span className="text-xs text-gray-400 font-mono uppercase tracking-widest block mt-0.5">
                      Verified Gym Member • {TESTIMONIALS[activeIndex].date}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex ? 'w-6 bg-brand-orange' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  id="testimonial-prev-btn"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-brand-orange hover:border-brand-orange/40 cursor-pointer transition-all"
                  title="Previous feedback"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  id="testimonial-next-btn"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-brand-orange hover:border-brand-orange/40 cursor-pointer transition-all"
                  title="Next feedback"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
