import React from 'react';
import { motion } from 'motion/react';
import { 
  Dumbbell, 
  Flame, 
  Sparkles, 
  Activity, 
  Apple, 
  UserCheck, 
  Layers, 
  Zap 
} from 'lucide-react';
import { SERVICES } from '../data';

// Map icon strings to component classes
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell: Dumbbell,
  Flame: Flame,
  Sparkles: Sparkles,
  Activity: Activity,
  Apple: Apple,
  UserCheck: UserCheck,
  Layers: Layers,
  Zap: Zap,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            PROFESSIONAL FACILITIES
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
            OUR <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">SERVICES</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
            Explore Karachi's most complete fitness offerings designed to challenge your limits and fast-track your visual body recomposition.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16">
          {SERVICES.map((service, index) => {
            const IconComponent = IconMap[service.iconName] || Dumbbell;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ 
                  y: -8,
                  borderColor: 'rgba(255, 123, 0, 0.4)',
                  boxShadow: '0 10px 30px rgba(255, 123, 0, 0.15)'
                }}
                className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col items-start text-left relative group transition-all duration-300 cursor-default"
              >
                {/* Background decorative index number */}
                <span className="absolute top-6 right-8 text-6xl font-display font-black text-white/[0.02] group-hover:text-brand-orange/[0.04] select-none transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Glowing icon container */}
                <div className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,123,0,0.15)] group-hover:rotate-6">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-orange transition-colors duration-200">
                  {service.title}
                </h3>

                <p className="text-gray-400 font-sans text-sm mt-3 leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Arrow detail */}
                <div className="mt-6 flex items-center gap-1.5 text-xs text-brand-orange font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore Program</span>
                  <span className="text-sm font-semibold">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
