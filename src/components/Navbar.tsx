import { useState, useEffect } from 'react';
import { Menu, X, Phone, Dumbbell, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('workout_gym_theme');
      if (saved === 'light') return 'light';
    } catch (e) {
      console.error('Error reading theme:', e);
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('workout_gym_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Facilities', id: 'services' },
    { name: 'Equipment', id: 'equipment' },
    { name: 'Membership', id: 'membership' },
    { name: 'Tracker', id: 'tracker' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav border-b border-white/10 py-3 shadow-lg' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            id="nav-logo-btn"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-brand-orange rounded-sm flex items-center justify-center rotate-45 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110 neon-glow-orange flex-shrink-0">
              <div className="-rotate-45 font-black text-black text-lg italic">W</div>
            </div>
            <div className="text-left ml-1">
              <span className="font-display font-black tracking-tighter text-lg md:text-xl text-white block leading-none italic underline underline-offset-4 decoration-brand-orange">
                WORKOUT GYM
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mt-1.5">
                1st Branch Scheme 33
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                id={`nav-link-${link.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer relative ${
                  activeSection === link.id
                    ? 'text-brand-orange font-semibold bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-orange"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA Phone and Burger Button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              aria-label="Toggle Theme"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-brand-orange/40 transition-all cursor-pointer flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-brand-orange animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            <a
              href="tel:03313960054"
              id="nav-call-btn"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-black text-xs font-black uppercase tracking-widest hover:bg-brand-orange-light transition-all rounded-full shadow-[0_0_15px_rgba(255,123,0,0.4)] cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-black" />
              Call Now
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            id="mobile-menu-drawer"
            className="fixed inset-x-0 top-[60px] z-30 lg:hidden glass-nav border-b border-white/10 px-4 py-6 shadow-2xl flex flex-col gap-2 max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                id={`mobile-nav-link-${link.id}`}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="h-[1px] bg-white/10 my-2" />
            
            {/* Mobile Theme Switcher option */}
            <button
              onClick={toggleTheme}
              id="mobile-theme-toggle"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-5 h-5 text-brand-orange" /> : <Moon className="w-5 h-5 text-indigo-500" />}
                Theme: <span className="font-bold uppercase text-xs">{theme} Mode</span>
              </span>
              <span className="text-xs text-gray-500 uppercase font-mono">Toggle</span>
            </button>

            <div className="h-[1px] bg-white/10 my-2" />
            
            <a
              href="tel:03313960054"
              id="mobile-nav-call-btn"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-dark text-black font-bold tracking-widest text-sm neon-glow-orange cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-black" />
              0331-3960054
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
