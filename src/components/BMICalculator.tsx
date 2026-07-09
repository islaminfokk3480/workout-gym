import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, HelpCircle, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export default function BMICalculator() {
  const [weight, setWeight] = useState<number>(70); // in kg
  const [height, setHeight] = useState<number>(170); // in cm
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiStatus, setBmiStatus] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('text-brand-orange');

  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
      setBmiResult(bmi);

      // Determine status
      if (bmi < 18.5) {
        setBmiStatus('Underweight');
        setStatusColor('text-blue-400');
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setBmiStatus('Normal Weight (Healthy)');
        setStatusColor('text-green-400');
      } else if (bmi >= 25 && bmi <= 29.9) {
        setBmiStatus('Overweight');
        setStatusColor('text-yellow-400');
      } else {
        setBmiStatus('Obese');
        setStatusColor('text-red-500');
      }
    }
  };

  // Convert BMI to angle for gauge pointer (-90deg to +90deg)
  const getGaugeRotationAngle = () => {
    if (!bmiResult) return -90;
    // Map BMI range [15 - 40] to [-90 - 90] degrees
    const minBmi = 15;
    const maxBmi = 40;
    const clampedBmi = Math.min(Math.max(bmiResult, minBmi), maxBmi);
    const percentage = (clampedBmi - minBmi) / (maxBmi - minBmi);
    return -90 + (percentage * 180);
  };

  return (
    <section id="bmi" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            BIOMETRIC TRACKING
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
            BMI <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">CALCULATOR</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
            Quickly monitor your Body Mass Index metric and understand where your physical body proportions lean.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 max-w-5xl mx-auto items-stretch">
          
          {/* Column 1: Controls Panel (6 cols) */}
          <div className="lg:col-span-6 p-8 rounded-2xl glass-card border border-white/5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange shadow-md">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Calculate Your Metrics</h3>
              </div>

              {/* Weight Slider */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Weight (kg)</label>
                  <span className="font-display font-bold text-lg text-white font-mono">{weight} <span className="text-xs text-gray-500 font-sans font-normal">kg</span></span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  id="bmi-weight-range"
                  className="w-full accent-brand-orange h-1.5 bg-white/10 rounded-full cursor-pointer"
                />
              </div>

              {/* Height Slider */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Height (cm)</label>
                  <span className="font-display font-bold text-lg text-white font-mono">{height} <span className="text-xs text-gray-500 font-sans font-normal">cm</span></span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  id="bmi-height-range"
                  className="w-full accent-brand-orange h-1.5 bg-white/10 rounded-full cursor-pointer"
                />
              </div>

              {/* Range Reference Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Healthy range</span>
                  <span className="block font-display font-bold text-sm text-green-400 mt-1">18.5 – 24.9</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Overweight range</span>
                  <span className="block font-display font-bold text-sm text-yellow-400 mt-1">25.0 – 29.9</span>
                </div>
              </div>
            </div>

            <button
              onClick={calculateBMI}
              id="bmi-calculate-btn"
              className="w-full py-4 mt-6 bg-gradient-to-r from-brand-orange via-brand-orange-light to-[#ffaa00] text-black font-black uppercase tracking-widest text-xs rounded-full cursor-pointer shadow-lg shadow-brand-orange/20 neon-glow-orange transition-all duration-300 hover:scale-[1.02]"
            >
              Calculate BMI Result
            </button>
          </div>

          {/* Column 2: visual Gauge & Advice (6 cols) */}
          <div className="lg:col-span-6 p-8 rounded-2xl glass-card border border-white/5 flex flex-col items-center justify-between text-center relative overflow-hidden group">
            
            {/* Visual Gauge */}
            <div className="relative w-full max-w-[280px] aspect-[2/1] overflow-hidden flex flex-col justify-end items-center pt-8">
              {/* Semi-circle Gauge track */}
              <div className="absolute bottom-0 w-full h-[280px] rounded-full border-[18px] border-white/5" />
              
              {/* Colored Segments Overlay (Subtle) */}
              <div className="absolute bottom-0 w-full h-[280px] rounded-full border-[18px] border-transparent border-t-blue-400/10 border-r-green-400/10 pointer-events-none" />

              {/* Gauge Hand / Needle */}
              <motion.div
                className="absolute bottom-0 w-2 h-28 bg-brand-orange origin-bottom rounded-t-full shadow-lg"
                style={{ rotate: getGaugeRotationAngle() }}
                animate={{ rotate: getGaugeRotationAngle() }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              />

              {/* Center point pin */}
              <div className="absolute bottom-0 w-8 h-8 rounded-full bg-brand-orange border-4 border-black z-10 shadow-md" />
              
              {/* Label below needle pin */}
              <div className="absolute bottom-2 font-mono text-[9px] text-gray-400 tracking-widest uppercase">
                Gauge Dial
              </div>
            </div>

            {/* BMI Output area */}
            {bmiResult !== null ? (
              <div className="space-y-4 w-full mt-6">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Your Calculated BMI</span>
                  <motion.span 
                    key={bmiResult}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display font-black text-6xl text-white block mt-1 neon-text-orange"
                  >
                    {bmiResult}
                  </motion.span>
                  <span className={`font-display font-extrabold text-lg uppercase tracking-wider block mt-2 ${statusColor}`}>
                    {bmiStatus}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left text-xs font-sans text-gray-400 leading-relaxed flex gap-3">
                  <Activity className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Physical Guideline:</span>
                    {bmiResult < 18.5 && 'Focus on a structured caloric surplus combined with heavy lifting to pack on dense lean muscle mass safely.'}
                    {bmiResult >= 18.5 && bmiResult <= 24.9 && 'Exceptional! Your physical proportion is perfectly balanced. Maintain progressive overload and solid recovery logs.'}
                    {bmiResult >= 25 && bmiResult <= 29.9 && 'We suggest introducing targeted metabolic conditioning or active cardio zones 3x a week alongside calorie deficits.'}
                    {bmiResult >= 30 && 'Please consult our certified personal trainers for safe, customized heavy hypertrophy setups and dietary guidelines.'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <HelpCircle className="w-12 h-12 text-gray-600 animate-pulse" />
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-gray-400 text-sm">Waiting for Calculation</h4>
                  <p className="text-gray-500 text-xs font-sans max-w-xs leading-relaxed">
                    Set your weight and height values on the left panel and click calculate to view dynamic diagnostic tracking.
                  </p>
                </div>
              </div>
            )}

            {/* Tiny branding text at bottom */}
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-6">
              Workout Gym 1st Branch کراچی
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
