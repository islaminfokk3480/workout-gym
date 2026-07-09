import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Lock, Image as ImageIcon, Check, AlertTriangle, Trash2, X, Upload } from 'lucide-react';
import { DEFAULT_GALLERY } from '../data';
import { GalleryItem } from '../types';
import ImageLightbox from './ImageLightbox';

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize gallery from LocalStorage or Default
  useEffect(() => {
    const saved = localStorage.getItem('workout_gym_gallery_images');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        setImages(DEFAULT_GALLERY);
      }
    } else {
      setImages(DEFAULT_GALLERY);
    }
  }, []);

  const saveImages = (updated: GalleryItem[]) => {
    setImages(updated);
    localStorage.setItem('workout_gym_gallery_images', JSON.stringify(updated));
  };

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '7860') {
      setIsAdminLoggedIn(true);
      setShowPasswordModal(false);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Invalid Admin Password. Access Denied.');
    }
  };

  // Convert uploaded file to base64 and save to gallery
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        const newItem: GalleryItem = {
          id: `uploaded_${Date.now()}`,
          src: base64,
          alt: file.name.split('.')[0] || 'Uploaded Gym Photo',
          category: 'Uploaded',
          isUserUploaded: true
        };
        const updated = [newItem, ...images];
        saveImages(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this image from the gallery?')) {
      const updated = images.filter(img => img.id !== id);
      saveImages(updated);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Categories list
  const categories = ['All', 'Interior', 'Equipment', 'Cardio', 'Training', 'Uploaded'];
  const hasUploaded = images.some(img => img.category === 'Uploaded');
  const actualCategories = categories.filter(cat => cat !== 'Uploaded' || hasUploaded);

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  // Map gallery images to lightbox images
  const lightboxImages = filteredImages.map(img => ({
    src: img.src,
    alt: img.alt,
    title: img.alt
  }));

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-white/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] border-l-2 border-brand-orange">
              THE INSTINCTIVE ATMOSPHERE
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none block uppercase italic">
              WORKOUT <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange">GALLERY</span>
            </h2>
            <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base leading-relaxed border-l border-white/10 pl-6 text-left block">
              Explore authentic glimpses from our training floors, heavy duty equipment clusters, cardio setups, and premium member logs.
            </p>
          </div>

          {/* Admin Management controls */}
          <div className="flex items-center gap-3">
            {!isAdminLoggedIn ? (
              <button
                onClick={() => setShowPasswordModal(true)}
                id="gallery-admin-login-btn"
                className="px-5 py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-brand-orange/40 text-xs font-black tracking-wider uppercase cursor-pointer flex items-center gap-2 skew-x-[-12deg] transition-all duration-300"
              >
                <div className="skew-x-[12deg] flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-brand-orange" />
                  Admin Panel
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-white/5 border border-brand-orange/30 p-1.5 rounded-xl">
                <span className="text-xs text-brand-orange font-mono font-bold px-2 uppercase">
                  ✓ Admin Mode
                </span>
                <button
                  onClick={handleTriggerUpload}
                  id="gallery-admin-upload-btn"
                  className="px-4 py-2 bg-brand-orange text-black font-bold text-xs rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  Add New Image
                </button>
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  id="gallery-admin-logout-btn"
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg cursor-pointer"
                  title="Logout Admin"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="gallery-file-input"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 bg-white/5 border border-white/10 p-1.5 rounded-full max-w-max">
          {actualCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              id={`gallery-filter-${cat.toLowerCase()}`}
              className={`px-5 py-2 text-xs md:text-sm font-black uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-brand-orange to-[#ffaa00] text-black font-black shadow-lg shadow-brand-orange/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Admin Drag and Drop Zone if Logged In */}
        {isAdminLoggedIn && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            id="gallery-dropzone"
            onClick={handleTriggerUpload}
            className={`mt-8 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-brand-orange bg-brand-orange/10 scale-[0.99]'
                : 'border-white/15 bg-white/[0.02] hover:border-brand-orange/45'
            }`}
          >
            <Upload className="w-10 h-10 text-brand-orange mx-auto mb-3 animate-pulse" />
            <h3 className="font-display font-bold text-white text-base">Drag and drop your gym photos here</h3>
            <p className="text-gray-400 text-xs mt-1">Or click to browse files from your device. Converts automatically to fast permanent LocalStorage.</p>
          </div>
        )}

        {/* Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mt-12 [column-fill:_balance] box-border">
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid mb-6 glass-card rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer shadow-lg"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[500px]"
                  loading="lazy"
                />

                {/* Dark Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Info and Admin Deletion Button overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="self-end flex items-center gap-2">
                    {/* Delete button if admin is logged in */}
                    {isAdminLoggedIn && (
                      <button
                        onClick={(e) => handleDeleteImage(img.id, e)}
                        id={`gallery-delete-btn-${img.id}`}
                        className="p-2 rounded-lg bg-red-600/90 text-white hover:bg-red-500 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                        title="Delete this image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="text-left">
                    <h3 className="font-display font-bold text-white text-lg leading-tight">
                      {img.alt}
                    </h3>
                    <span className="text-[10px] font-mono text-brand-orange uppercase tracking-wider block mt-1">
                      {img.category || 'Uploaded'} Floor
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 border border-white/5 rounded-2xl bg-white/[0.01]">
            <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 font-sans text-sm">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Password Verification Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="admin-password-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-8 rounded-2xl border border-white/10 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError('');
                  setPasswordInput('');
                }}
                id="close-admin-modal-btn"
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white">Owner Authorization</h3>
                <p className="text-gray-400 text-xs font-sans">
                  Please enter the Admin security password to toggle owner privileges and upload custom photos.
                </p>
              </div>

              <form onSubmit={handleAdminVerify} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                    Security PIN / Password
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter owner password (7860)"
                    id="admin-password-input"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors font-mono tracking-widest text-center"
                  />
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-900/30 text-red-400 text-xs font-sans">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  id="admin-auth-submit-btn"
                  className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-light text-black font-black tracking-widest uppercase transition-colors text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-lg neon-glow-orange skew-x-[-12deg]"
                >
                  <div className="skew-x-[12deg] flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    Verify Access
                  </div>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
