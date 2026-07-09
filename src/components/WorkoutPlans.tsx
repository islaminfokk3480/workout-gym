import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Calendar, Flame, ChevronRight, CheckSquare, Sparkles } from 'lucide-react';
import { WORKOUT_PLANS } from '../data';

export default function WorkoutPlans() {
  const [activeDifficulty, setActiveDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  const selectedPlan = WORKOUT_PLANS.find(p => p.difficulty === activeDifficulty) || WORKOUT_PLANS[0];

  const handleToggleExercise = (exercise: string) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exercise]: !prev[exercise]
    }));
  };

  const handleResetExercises = () => {
    setCompletedExercises({});
  };

  const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <section id="workouts" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-left">
            <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
              DYNAMIC PROTOCOLS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
              TRAINING <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">PLANS</span>
            </h2>
            <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
              Unlock targeted workout split structures. Track your direct active session progress using our integrated interactive checklist below.
            </p>
          </div>

          {/* Difficulty Selector Tabs */}
          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-full self-start md:self-end">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => {
                  setActiveDifficulty(diff);
                  handleResetExercises();
                }}
                id={`workout-difficulty-tab-${diff.toLowerCase()}`}
                className={`px-5 py-2 text-xs md:text-sm font-black uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                  activeDifficulty === diff
                    ? 'bg-gradient-to-r from-brand-orange to-[#ffaa00] text-black font-black shadow-lg shadow-brand-orange/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Plan Details Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
          
          {/* Card Left: Plan stats (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient subtle light */}
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

            <div className="space-y-6">
              {/* Plan difficulty badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Selected split program</span>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase font-mono ${
                  activeDifficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  activeDifficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {selectedPlan.difficulty}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedPlan.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  {selectedPlan.description}
                </p>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Macro Duration</span>
                  <div className="flex items-center gap-1.5 text-white font-display font-bold">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    <span>{selectedPlan.duration}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Weekly Frequency</span>
                  <div className="flex items-center gap-1.5 text-white font-display font-bold">
                    <Dumbbell className="w-4 h-4 text-brand-orange" />
                    <span>{selectedPlan.daysPerWeek} Days / Wk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action CTA */}
            <div className="pt-8">
              <a
                href={`https://wa.me/923313960054?text=Hi%2C%20I%20am%20interested%20in%20the%20${selectedPlan.difficulty}%20Workout%20Plan%20at%20Workout%20Gym%201st%20Branch!`}
                target="_blank"
                rel="noreferrer"
                id="workout-whatsapp-cta-btn"
                className="w-full py-4 bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black font-black uppercase tracking-widest text-xs skew-x-[-12deg] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <div className="skew-x-[12deg] flex items-center justify-center gap-2">
                  <span>Obtain Custom Workout PDF</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

          {/* Card Right: Interactive Exercise Checklist (7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between">
            <div className="space-y-6 w-full text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-display font-bold text-white text-lg">Interactive Exercise Log</h4>
                </div>
                <button
                  onClick={handleResetExercises}
                  id="reset-workout-log-btn"
                  className="text-[10px] font-mono text-gray-400 hover:text-brand-orange uppercase tracking-widest cursor-pointer"
                >
                  Reset Log
                </button>
              </div>

              {/* List of exercises with custom animations */}
              <div className="space-y-3">
                {selectedPlan.exercises.map((exercise, idx) => {
                  const isDone = !!completedExercises[exercise];
                  return (
                    <motion.div
                      key={exercise}
                      onClick={() => handleToggleExercise(exercise)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isDone 
                          ? 'bg-brand-orange/5 border-brand-orange/20 opacity-60' 
                          : 'bg-white/[0.02] border-white/5 hover:border-brand-orange/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isDone ? 'bg-brand-orange border-brand-orange text-black' : 'border-white/20'
                        }`}>
                          {isDone && <span className="text-[10px] font-black">✓</span>}
                        </div>
                        <span className={`text-sm font-sans font-medium tracking-wide ${
                          isDone ? 'text-gray-450 line-through' : 'text-gray-200'
                        }`}>
                          {exercise}
                        </span>
                      </div>
                      
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Completion Status progress bar */}
            <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between gap-4">
              <div className="w-full">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Active session completion</span>
                  <span className="text-xs font-mono font-bold text-brand-orange">
                    {Math.round((Object.values(completedExercises).filter(Boolean).length / selectedPlan.exercises.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(Object.values(completedExercises).filter(Boolean).length / selectedPlan.exercises.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-dark rounded-full transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
