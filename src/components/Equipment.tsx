import { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Dumbbell } from 'lucide-react';
import { EQUIPMENTS } from '../data';
import ImageLightbox from './ImageLightbox';

export default function Equipment() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  // Extract unique categories for filtering
  const categories = ['All', 'Strength', 'Cardio', 'Free Weights'];

  const filteredEquipment = selectedCategory === 'All'
    ? EQUIPMENTS
    : EQUIPMENTS.filter(eq => eq.category.includes(selectedCategory) || (selectedCategory === 'Strength' && eq.category.includes('Cable')));

  // Map equipment list to the format expected by the Lightbox
  const lightboxImages = filteredEquipment.map(eq => ({
    src: eq.image,
    alt: eq.name,
    title: `${eq.name} - Professional Gym Equipment`
  }));

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <section id="equipment" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-left">
            <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
              HEAVY DUTY ASSETS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
              OUR <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">EQUIPMENT</span>
            </h2>
            <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
              Equipped with elite biomechanically superior machines from leading global fitness brands. Experience pure muscle recruitment.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 bg-white/5 border border-white/10 p-1.5 rounded-full self-start md:self-end">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                id={`filter-eq-${category.replace(/\s+/g, '-').toLowerCase()}`}
                className={`px-5 py-2 text-xs md:text-sm font-black uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-brand-orange to-[#ffaa00] text-black shadow-lg shadow-brand-orange/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
          {filteredEquipment.map((eq, index) => (
            <motion.div
              key={eq.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer shadow-lg"
              onClick={() => handleOpenLightbox(index)}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-zinc-950">
                <img
                  src={eq.image}
                  alt={eq.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Magnify Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 rounded-full bg-brand-orange text-black font-bold shadow-lg neon-glow-orange scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-base tracking-wide group-hover:text-brand-orange transition-colors">
                    {eq.name}
                  </h3>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1 block">
                    {eq.category} Zone
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Lightbox */}
      <ImageLightbox
        isOpen={lightboxIndex > -1}
        onClose={() => setLightboxIndex(-1)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </section>
  );
}
