import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string; title?: string }[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}: ImageLightboxProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        id="lightbox-container"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="font-display font-semibold tracking-wide text-sm md:text-base">
            {currentImage.title || currentImage.alt}
            <span className="ml-2 text-xs text-gray-400 font-mono">
              ({currentIndex + 1} / {images.length})
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = currentImage.src;
                link.download = currentImage.alt;
                link.target = '_blank';
                link.click();
              }}
              title="Open full size"
              id="lightbox-download-btn"
              className="p-2 text-gray-400 hover:text-brand-orange transition-colors cursor-pointer"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              id="lightbox-close-btn"
              className="p-2 text-gray-400 hover:text-brand-orange transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          id="lightbox-prev-btn"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-brand-orange/20 border border-white/10 rounded-full text-white hover:text-brand-orange transition-all cursor-pointer z-50 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Image Container with AnimatePresence */}
        <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
          <motion.img
            key={currentIndex}
            src={currentImage.src}
            alt={currentImage.alt}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl neon-glow-orange"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          id="lightbox-next-btn"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-brand-orange/20 border border-white/10 rounded-full text-white hover:text-brand-orange transition-all cursor-pointer z-50 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Thumbnail Selector (Bottom Bar) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 py-2 scrollbar-none max-w-md mx-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                idx === currentIndex ? 'border-brand-orange scale-110' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
