import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Dumbbell, ShieldCheck, Flame, Star } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data';

export default function MembershipPlans() {
  const [selectedBilling, setSelectedBilling] = useState<'Monthly' | 'Quarterly'>('Monthly');

  // Interactive Pricing multiplier for billing toggle (adds some premium interaction)
  const getCalculatedPrice = (basePriceStr: string) => {
    const rawVal = parseInt(basePriceStr.replace(/,/g, ''));
    if (selectedBilling === 'Quarterly') {
      // 15% discount for 3 months
      const quarterlyRate = Math.floor((rawVal * 3) * 0.85);
      return quarterlyRate.toLocaleString();
    }
    return basePriceStr;
  };

  const getPeriodLabel = () => {
    return selectedBilling === 'Quarterly' ? '3 months' : 'month';
  };

  return (
    <section id="membership" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-[30%] left-[-15%] w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[250px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            UNCOMPROMISING GAINS
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
            MEMBERSHIP <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">PLANS</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block mx-auto">
            Choose a level of entry that aligns with your active goals. No sign-up fees or complex hidden parameters.
          </p>

          {/* Interactive Toggle for billing cycle */}
          <div className="flex bg-white/5 border border-white/10 p-1 mt-6 rounded-full relative z-10">
            <button
              onClick={() => setSelectedBilling('Monthly')}
              id="billing-monthly-btn"
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedBilling === 'Monthly'
                  ? 'bg-gradient-to-r from-brand-orange to-[#ffaa00] text-black font-black shadow-lg shadow-brand-orange/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Cycle
            </button>
            <button
              onClick={() => setSelectedBilling('Quarterly')}
              id="billing-quarterly-btn"
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                selectedBilling === 'Quarterly'
                  ? 'bg-gradient-to-r from-brand-orange to-[#ffaa00] text-black font-black shadow-lg shadow-brand-orange/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Quarterly (Save 15%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto items-stretch">
          {MEMBERSHIP_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                borderColor: plan.isPopular ? 'rgba(255, 123, 0, 0.7)' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: plan.isPopular ? '0 15px 40px rgba(255, 123, 0, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}
              className={`glass-card p-8 rounded-3xl border flex flex-col relative overflow-hidden transition-all duration-300 ${
                plan.isPopular 
                  ? 'border-brand-orange/50 shadow-[0_0_30px_rgba(255,123,0,0.1)]' 
                  : 'border-white/5'
              }`}
            >
              {/* Popular Badge decoration */}
              {plan.isPopular && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-brand-orange text-black font-extrabold font-mono text-[10px] tracking-widest uppercase rounded-full shadow-lg neon-glow-orange animate-pulse">
                  <Star className="w-3 h-3 fill-black text-black" />
                  MOST POPULAR
                </div>
              )}

              {/* Card Header */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                  {plan.isPopular ? 'Active Athlete Option' : 'Training Entrance'}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-xs font-sans min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Pricing Tag */}
              <div className="my-6 border-y border-white/5 py-4">
                <span className="text-gray-400 text-xs font-mono font-bold">PKR</span>
                <span className="font-display font-black text-4xl sm:text-5xl text-white ml-1.5 tracking-tight">
                  {getCalculatedPrice(plan.price)}
                </span>
                <span className="text-gray-500 text-xs font-mono lowercase block mt-1">
                  / {getPeriodLabel()}
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 flex-grow mb-8 text-left">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-brand-orange rotate-45 mt-2 flex-shrink-0 shadow-[0_0_8px_#ff7b00]" />
                    <span className="text-sm text-gray-300 font-sans tracking-wide">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Plan Action CTA */}
              <a
                href={`https://wa.me/923313960054?text=Hi%2C%20I%20am%20interested%20in%20the%20${plan.name}%20Membership%20Plan%20(${selectedBilling}%20Cycle)%20at%20Workout%20Gym%201st%20Branch!`}
                target="_blank"
                rel="noreferrer"
                id={`membership-cta-${plan.name.toLowerCase()}`}
                className={`w-full py-4 text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-brand-orange via-brand-orange-light to-[#ffaa00] text-black shadow-lg shadow-brand-orange/20 neon-glow-orange hover:scale-[1.03]'
                    : 'bg-white/5 border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange text-white hover:scale-[1.03]'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                Select {plan.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
