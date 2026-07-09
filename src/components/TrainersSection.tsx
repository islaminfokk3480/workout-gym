import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Award, Sparkles, UserCheck } from 'lucide-react';
import { TRAINERS } from '../data';

export default function TrainersSection() {
  return (
    <section id="trainers" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            ELITE INSTRUCTION
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
            OUR CERTIFIED <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">TRAINERS</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
            Our elite training staff is certified globally to help you program, execute, and monitor raw progress with flawless athletic precision.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto items-stretch">
          {TRAINERS.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 relative group cursor-default flex flex-col justify-between"
            >
              {/* Photo Area with overlay */}
              <div className="relative w-full aspect-[3/4] bg-zinc-950 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Hover social menu */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <a
                    href={trainer.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/60 hover:bg-brand-orange border border-white/10 hover:border-brand-orange hover:text-black text-white cursor-pointer transition-all duration-200 backdrop-blur-md shadow-md"
                    title="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={trainer.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/60 hover:bg-brand-orange border border-white/10 hover:border-brand-orange hover:text-black text-white cursor-pointer transition-all duration-200 backdrop-blur-md shadow-md"
                    title="Facebook Profile"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={trainer.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/60 hover:bg-brand-orange border border-white/10 hover:border-brand-orange hover:text-black text-white cursor-pointer transition-all duration-200 backdrop-blur-md shadow-md"
                    title="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>

                {/* Overlay details badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 backdrop-blur-sm font-black font-mono text-[9px] tracking-widest uppercase mb-2">
                    <Award className="w-3 h-3 text-brand-orange" />
                    CERTIFIED COACH
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors duration-200">
                    {trainer.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-sans mt-1.5 leading-relaxed">
                    {trainer.specialization}
                  </p>
                </div>
              </div>

              {/* Action Button at bottom of card */}
              <div className="p-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                <span>Direct consultation</span>
                <a
                  href={`https://wa.me/923313960054?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20session%20with%20${trainer.name}%20at%20Workout%20Gym%201st%20Branch!`}
                  target="_blank"
                  rel="noreferrer"
                  id={`trainer-consult-cta-${trainer.id}`}
                  className="text-brand-orange hover:text-white transition-colors cursor-pointer font-bold"
                >
                  Book Session →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
