import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Check, 
  RotateCcw, 
  Activity, 
  Award, 
  Sparkles, 
  Dumbbell, 
  CheckSquare, 
  Square,
  Bookmark,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TodoTask {
  id: string;
  text: string;
  category: 'Strength' | 'Cardio' | 'Nutrition' | 'Recovery';
  completed: boolean;
  createdAt: string;
}

const PRESETS: { text: string; category: TodoTask['category'] }[] = [
  { text: '30 Min Cardio Session', category: 'Cardio' },
  { text: 'Drink 3 Liters Water', category: 'Nutrition' },
  { text: 'Heavy Chest & Triceps routine', category: 'Strength' },
  { text: 'Post-workout protein shake', category: 'Nutrition' },
  { text: '15 Mins stretching & mobility', category: 'Recovery' },
  { text: 'Core & Abs Circuit (4 sets)', category: 'Strength' },
];

export default function WorkoutTracker() {
  const [tasks, setTasks] = useState<TodoTask[]>(() => {
    try {
      const saved = localStorage.getItem('workout_gym_todos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading tasks from localStorage:', e);
    }
    // Seed default tasks for elegant presentation
    return [
      {
        id: '1',
        text: 'Warm-up stretching (10 mins)',
        category: 'Recovery',
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        text: 'Heavy bench press (5 sets x 8 reps)',
        category: 'Strength',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        text: '20 Min steady HIIT cardio run',
        category: 'Cardio',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        text: 'Consume pre-workout whey meal',
        category: 'Nutrition',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<TodoTask['category']>('Strength');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Persist tasks on change
  useEffect(() => {
    localStorage.setItem('workout_gym_todos', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: TodoTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      category: newTaskCategory,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskText('');
    triggerFeedback('Goal added successfully!');
  };

  const handleAddPreset = (preset: typeof PRESETS[0]) => {
    // Avoid exact duplicate active tasks to keep list clean
    if (tasks.some(t => t.text.toLowerCase() === preset.text.toLowerCase() && !t.completed)) {
      triggerFeedback('This goal is already active!');
      return;
    }

    const newTask: TodoTask = {
      id: Date.now().toString(),
      text: preset.text,
      category: preset.category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
    triggerFeedback('Preset loaded!');
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = !t.completed;
        if (nextStatus) {
          triggerFeedback('Awesome job! Daily target met!');
        }
        return { ...t, completed: nextStatus };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    triggerFeedback('Target deleted.');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your daily tracker goals?')) {
      setTasks([]);
      triggerFeedback('Tracker cleared.');
    }
  };

  const handleResetDefaults = () => {
    setTasks([
      {
        id: '1',
        text: 'Warm-up stretching (10 mins)',
        category: 'Recovery',
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        text: 'Heavy bench press (5 sets x 8 reps)',
        category: 'Strength',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        text: '20 Min steady HIIT cardio run',
        category: 'Cardio',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        text: 'Consume pre-workout whey meal',
        category: 'Nutrition',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    triggerFeedback('Reset to sample targets!');
  };

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(prev => prev === msg ? '' : prev);
    }, 2500);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter(t => {
    if (activeFilter === 'Pending') return !t.completed;
    if (activeFilter === 'Completed') return t.completed;
    return true;
  });

  const getCategoryColor = (cat: TodoTask['category']) => {
    switch (cat) {
      case 'Strength': return 'from-red-500/20 to-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Cardio': return 'from-blue-500/20 to-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Nutrition': return 'from-green-500/20 to-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Recovery': return 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/20';
    }
  };

  return (
    <section id="tracker" className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-zinc-950 border-t border-b border-white/5">
      {/* Absolute Ambient Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            DAILY FITNESS TRACKER
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
            CHALLENGE <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">YOURSELF</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed pl-4 border-l border-white/10 text-left sm:text-center inline-block">
            Define your personalized day targets, tick workouts as you conquer them, and track your daily performance ratios automatically.
          </p>
        </div>

        {/* Inner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Stats, Quick Presets, and Goal Creation */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Completion Status Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-white/5">
                <Activity className="w-24 h-24 stroke-[1]" />
              </div>
              
              <h3 className="font-display font-black text-lg text-white uppercase italic flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-orange" />
                Your Daily Progress
              </h3>

              <div className="mt-6 flex items-center gap-6">
                {/* Circular Percentage gauge visual */}
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center bg-black/40 rounded-full border border-white/10 shadow-inner">
                  <svg className="absolute w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      className="stroke-white/5 fill-transparent"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      className="stroke-brand-orange fill-transparent transition-all duration-700 ease-out"
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - completionPercentage / 100)}`}
                    />
                  </svg>
                  <span className="font-display font-black text-2xl text-white">
                    {completionPercentage}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Target Ratio</div>
                  <div className="text-xl font-bold text-white">
                    {completedTasks} <span className="text-gray-500 text-sm font-normal">of</span> {totalTasks} <span className="text-brand-orange text-sm font-bold">Goals</span>
                  </div>
                  <div className="text-xs text-gray-500 font-sans">
                    {completionPercentage === 100 && totalTasks > 0 ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Full day complete! Elite status!
                      </span>
                    ) : totalTasks === 0 ? (
                      'No daily targets configured'
                    ) : (
                      'Push forward to claim 100% completion!'
                    )}
                  </div>
                </div>
              </div>

              {/* Linear mini bar progress */}
              <div className="mt-5 w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full"
                />
              </div>
            </div>

            {/* Custom Goal Form Panel */}
            <div className="p-6 rounded-2xl glass-card border border-white/5">
              <h3 className="font-display font-black text-base text-white uppercase italic mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-orange" />
                Create Custom Target
              </h3>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label htmlFor="tracker-input-task" className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                    What is your target?
                  </label>
                  <input
                    type="text"
                    id="tracker-input-task"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="e.g. 50 pushups, Running 3km..."
                    maxLength={100}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 border-l-2 border-l-brand-orange text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                    Category Tag
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Strength', 'Cardio', 'Nutrition', 'Recovery'] as const).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewTaskCategory(cat)}
                        className={`py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                          newTaskCategory === cat
                            ? 'bg-brand-orange/20 border-brand-orange text-brand-orange'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!newTaskText.trim()}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-orange via-brand-orange-light to-[#ffaa00] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  Add to My Schedule
                </button>
              </form>
            </div>

            {/* Daily Presets panel */}
            <div className="p-6 rounded-2xl glass-card border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-black text-xs text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  Quick Workout Seeds
                </h3>
                <span className="text-[9px] font-mono text-gray-500">1-CLICK ADD</span>
              </div>
              <p className="text-gray-500 text-xs mb-4">
                Instantly populate your checklist with typical premium member routines:
              </p>
              
              <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddPreset(p)}
                    className="text-[11px] font-sans text-left px-3 py-1.5 bg-white/5 border border-white/10 hover:border-brand-orange/30 hover:bg-white/10 transition-all rounded-lg text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer max-w-full"
                  >
                    <Dumbbell className="w-3 h-3 text-brand-orange flex-shrink-0" />
                    <span className="truncate">{p.text}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Active checklist of goals */}
          <div className="lg:col-span-7 p-6 rounded-2xl glass-card border border-white/5 space-y-6">
            
            {/* Action Bar / Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
              
              {/* Filter Tabs */}
              <div className="flex bg-white/5 border border-white/10 p-1 rounded-full self-start">
                {(['All', 'Pending', 'Completed'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                      activeFilter === f
                        ? 'bg-gradient-to-r from-brand-orange to-[#ffaa00] text-black shadow-md shadow-brand-orange/10'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Maintenance triggers */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleResetDefaults}
                  title="Reload default sample list"
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-orange/40 text-gray-400 hover:text-white text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Load Sample
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={tasks.length === 0}
                  className="px-3 py-1.5 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/20 hover:text-red-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear All
                </button>
              </div>

            </div>

            {/* Task Checklist Items */}
            <div className="min-h-[300px]">
              
              {/* Alert Feedback Banner */}
              <AnimatePresence>
                {feedbackMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 mb-4 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange rounded-xl text-xs font-sans flex items-center gap-2 shadow-lg"
                  >
                    <Bookmark className="w-4 h-4 fill-brand-orange/20" />
                    <span>{feedbackMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                  <CalendarDays className="w-12 h-12 text-zinc-700 animate-pulse" />
                  <div className="text-sm font-display font-bold text-gray-400 uppercase tracking-wider">
                    {activeFilter === 'All' 
                      ? 'Goal roster is clean' 
                      : `No ${activeFilter.toLowerCase()} targets`}
                  </div>
                  <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                    Use custom form inputs or seed daily fitness tasks using 1-click buttons to structure your day!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {filteredTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                        className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                          task.completed 
                            ? 'bg-zinc-950/40 border-white/5 opacity-65' 
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Checkbox Trigger */}
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            id={`tracker-toggle-${task.id}`}
                            className="flex-shrink-0 cursor-pointer text-gray-400 hover:text-brand-orange transition-colors"
                          >
                            {task.completed ? (
                              <div className="w-6 h-6 rounded-md bg-brand-orange text-black flex items-center justify-center border border-brand-orange shadow-inner">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-md border-2 border-white/20 hover:border-brand-orange transition-all flex items-center justify-center bg-black/30" />
                            )}
                          </button>

                          {/* Task Text Details */}
                          <div className="min-w-0">
                            <span 
                              onClick={() => handleToggleTask(task.id)}
                              className={`text-sm font-sans block cursor-pointer transition-all truncate select-none ${
                                task.completed 
                                  ? 'text-gray-500 line-through' 
                                  : 'text-gray-100 hover:text-brand-orange'
                              }`}
                            >
                              {task.text}
                            </span>
                            
                            {/* Meta pill badges */}
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${getCategoryColor(task.category)}`}>
                                {task.category}
                              </span>
                              <span className="text-[9px] font-mono text-gray-600">
                                {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons (Delete) */}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          id={`tracker-delete-${task.id}`}
                          className="p-2 rounded-lg bg-transparent hover:bg-red-950/40 border border-transparent hover:border-red-900/20 text-gray-500 hover:text-red-400 transition-all cursor-pointer flex-shrink-0"
                          title="Delete goal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

            </div>

            {/* Motivating prompt quote */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>WORKOUT SQUAD PLATFORM</span>
              <span className="flex items-center gap-1 text-brand-orange/80">
                <CheckSquare className="w-3.5 h-3.5" /> CRUSH DAILY TASKS
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
