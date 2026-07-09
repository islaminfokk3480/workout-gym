import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  ChevronUp, 
  Instagram, 
  Facebook, 
  Twitter, 
  Dumbbell 
} from 'lucide-react';

interface FooterAndContactProps {
  onNavClick: (sectionId: string) => void;
}

export default function FooterAndContact({ onNavClick }: FooterAndContactProps) {
  // Contact Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Floating button visible on scroll
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloating(true);
      } else {
        setShowFloating(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setPhone('');
      setMessage('');
      
      // Auto clear success state
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section id="contact" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[220px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
            START YOUR JOURNEY
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
            CONTACT & <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">LOCATION</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
            Reach out directly for membership questions, trainers schedules, or simply come down to see the floor yourself.
          </p>
        </div>

          {/* Quick Contact Info Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {/* Phone Card */}
            <a
              href="tel:03313960054"
              id="contact-phone-card"
              className="p-6 rounded-2xl glass-card border border-white/5 flex items-center gap-4 hover:border-brand-orange/30 transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="p-3.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl group-hover:bg-brand-orange group-hover:text-black transition-all">
                <Phone className="w-5 h-5 fill-brand-orange/20 group-hover:fill-transparent" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Direct Hotline</span>
                <span className="font-display font-bold text-lg text-white group-hover:text-brand-orange transition-colors">0331-3960054</span>
              </div>
            </a>

            {/* Location Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/5 flex items-center gap-4 hover:border-brand-orange/30 transition-all duration-300 group text-left cursor-default">
              <div className="p-3.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl group-hover:bg-brand-orange group-hover:text-black transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Locality Scheme 33</span>
                <span className="font-display font-bold text-xs sm:text-sm text-white block mt-0.5 leading-tight">Malik Society, Gulzar E Hijri, Karachi</span>
              </div>
            </div>

            {/* Timing Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/5 flex items-center gap-4 hover:border-brand-orange/30 transition-all duration-300 group text-left cursor-default">
              <div className="p-3.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl group-hover:bg-brand-orange group-hover:text-black transition-all">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Opening Schedule</span>
                <span className="font-display font-bold text-xs sm:text-sm text-white block mt-0.5 leading-tight">Mon – Sat: 4:00 PM – 1:00 AM • Sun: Closed</span>
              </div>
            </div>
          </div>

          {/* Interactive Layout: Form vs Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 max-w-5xl mx-auto items-stretch">
            
            {/* Form Panel (6 cols) */}
            <div className="lg:col-span-6 p-8 glass-card border border-white/5 flex flex-col justify-between">
              <div className="w-full text-left">
                <h3 className="font-display font-black text-2xl text-white uppercase italic">Send Us a Message</h3>
                <p className="text-gray-400 text-xs mt-1.5 leading-relaxed font-sans">
                  Have any queries about trainers hours or pricing? Fill out this rapid response form and our floor desk will contact you.
                </p>

                <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bilal Ahmed"
                      required
                      id="contact-form-name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 border-l-2 border-l-brand-orange text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors font-sans text-sm"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0331-3960054"
                      required
                      id="contact-form-phone"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 border-l-2 border-l-brand-orange text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors font-sans text-sm"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                      Message details
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about memberships, diet guidelines, or scheduling..."
                      rows={4}
                      required
                      id="contact-form-message"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 border-l-2 border-l-brand-orange text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors font-sans text-sm resize-none"
                    />
                  </div>

                  {/* Form Submission result visual feedback */}
                  {isSubmitted && (
                    <div className="flex items-center gap-2.5 p-3 bg-green-950/40 border border-green-900/30 text-green-400 text-xs font-sans">
                      <CheckCircle className="w-4.5 h-4.5 flex-shrink-0" />
                      <span>Message received successfully! We will call you soon.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-form-submit-btn"
                    className="w-full py-4 mt-6 bg-gradient-to-r from-brand-orange via-brand-orange-light to-[#ffaa00] disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg shadow-brand-orange/20 neon-glow-orange hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-black" />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Direction Panel (6 cols) */}
            <div className="lg:col-span-6 p-8 glass-card border border-white/5 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 text-left w-full">
                <h3 className="font-display font-black text-2xl text-white uppercase italic">Our Gym Map</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  Malik Co-Operative Housing Society, Malik CHS Gulzar E Hijri, Scheme 33, Karachi. Find your way effortlessly.
                </p>

                {/* Styled Map frame */}
                <div className="w-full h-64 sm:h-72 overflow-hidden border border-white/10 shadow-lg relative bg-zinc-950">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.4820849303517!2d67.11470557597143!3d24.983758340316474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3412b1d3d622f%3A0xe54ef40cf7269ee0!2sWORKOUT%20GYM%201st%20branch!5e0!3m2!1sen!2spk!4v1710000000000!5m2!1sen!2spk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="WORKOUT GYM 1st Branch location map"
                    referrerPolicy="no-referrer"
                    id="map-iframe"
                    className="filter invert-[90%] hue-rotate-180 brightness-95"
                  />
                </div>
              </div>

              {/* Get directions button */}
              <div className="pt-6">
                <a
                  href="https://maps.app.goo.gl/3D2bEsk88h6b5f4y9"
                  target="_blank"
                  rel="noreferrer"
                  id="map-directions-cta-btn"
                  className="w-full py-4 bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black font-black uppercase tracking-widest text-xs rounded-full transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  Get Google Maps Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tighter text-white uppercase">
                <span className="inline-block bg-brand-orange text-black px-2 py-0.5 skew-x-[-12deg] font-black mr-1">W</span>ORKOUT <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange italic font-black">GYM</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              Karachi’s premiere, elite heavy bodybuilding and powerlifting center equipped with commercial biomechanic units. Build your raw physique safely.
            </p>
            {/* Social media icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-brand-orange hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-brand-orange hover:bg-white/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-brand-orange hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {['home', 'about', 'services', 'equipment', 'membership', 'gallery', 'reviews'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => onNavClick(sec)}
                  className="text-xs text-gray-450 hover:text-brand-orange cursor-pointer self-start transition-colors uppercase font-mono tracking-wider"
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase">Contact Info</h4>
            <div className="space-y-3">
              <a href="tel:03313960054" className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-orange transition-colors">
                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                <span>0331-3960054</span>
              </a>
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Malik Co-Operative Housing Society, Malik CHS Gulzar E Hijri, Scheme 33, Karachi.
                </span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase">Opening Hours</h4>
            <div className="space-y-1.5 text-xs text-gray-400 font-mono">
              {[
                { day: 'Monday', time: '4:00 PM – 1:00 AM' },
                { day: 'Tuesday', time: '4:00 PM – 1:00 AM' },
                { day: 'Wednesday', time: '4:00 PM – 1:00 AM' },
                { day: 'Thursday', time: '4:00 PM – 1:00 AM' },
                { day: 'Friday', time: '4:00 PM – 1:00 AM' },
                { day: 'Saturday', time: '4:00 PM – 1:00 AM' },
                { day: 'Sunday', time: 'Closed', closed: true },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-white/5 pb-1 last:border-0 last:pb-0">
                  <span className="text-gray-300">{item.day}</span>
                  <span className={item.closed ? 'text-red-500 font-bold' : 'text-brand-orange font-bold'}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-sans">
            © 2026 WORKOUT GYM 1st Branch. All Rights Reserved.
          </p>
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            Crafted with Professional Polish
          </p>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      {showFloating && (
        <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
          {/* Scroll to Top */}
          <button
            onClick={handleScrollToTop}
            id="floating-scroll-top"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-brand-orange hover:text-brand-orange text-white transition-all cursor-pointer shadow-lg backdrop-blur-md scale-90 hover:scale-100"
            title="Scroll to Top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          {/* Direct Phone Call */}
          <a
            href="tel:03313960054"
            id="floating-call"
            className="p-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-dark text-black transition-all cursor-pointer shadow-lg hover:scale-115"
            title="Call Gym Desk"
          >
            <Phone className="w-5 h-5 fill-black" />
          </a>

          {/* Direct WhatsApp */}
          <a
            href="https://wa.me/923313960054?text=Hi%2C%20I%20am%20interested%20in%20Workout%20Gym%201st%20Branch%20memberships!"
            target="_blank"
            rel="noreferrer"
            id="floating-whatsapp"
            className="p-3.5 rounded-xl bg-green-500 hover:bg-green-400 text-white transition-all cursor-pointer shadow-lg hover:scale-115 pulse-glow-orange"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
          </a>
        </div>
      )}
    </>
  );
}
