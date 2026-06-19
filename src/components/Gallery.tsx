import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles,
  Camera
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function Gallery() {
  const categories = ['all', 'cakes', 'pastries', 'bread', 'events', 'scenes'] as const;
  const [selectedCat, setSelectedCat] = React.useState<typeof categories[number]>('all');
  const [activeLightbox, setActiveLightbox] = React.useState<GalleryItem | null>(null);
  const [zoomScale, setZoomScale] = React.useState(1);

  // Filters loop
  const filteredItems = selectedCat === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(it => it.category === selectedCat);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeLightbox) return;
    const currentIdx = filteredItems.findIndex(it => it.id === activeLightbox.id);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setActiveLightbox(filteredItems[nextIdx]);
    setZoomScale(1); // reset zoom scale
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeLightbox) return;
    const currentIdx = filteredItems.findIndex(it => it.id === activeLightbox.id);
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightbox(filteredItems[prevIdx]);
    setZoomScale(1); // reset zoom scale
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header and Filter tabs */}
      <section className="text-center space-y-3">
        <span className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase flex items-center justify-center gap-1.5">
          <Camera className="h-4 w-4 text-primary-500" />
          The Artisanal Lens
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-stone-900 sm:text-4xl">
          Visual Photo Gallery & Baking Crafts
        </h1>
        <p className="font-sans text-stone-500 text-sm max-w-xl mx-auto">
          Take an authentic visual stroll across our pastry rolling tables, wood-fired hearth ovens, hand-laminated golden croissants, and beautiful celebratory catering moments.
        </p>
        <div className="mx-auto h-1 w-12 bg-primary-500 rounded-full" />

        {/* Tab filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6" id="gallery-filters">
          {categories.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive 
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200/80 hover:border-stone-300'
                }`}
                id={`gallery-filter-${cat}`}
              >
                {cat === 'scenes' ? 'Behind the scenes' : cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid displays */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="gallery-display-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => { setActiveLightbox(item); setZoomScale(1); }}
              className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 aspect-[4/3] shadow-sm hover:shadow-md"
              id={`gallery-card-${item.id}`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-104"
                referrerPolicy="no-referrer"
              />

              {/* Hover Details Panel overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-primary-400">
                  {item.category === 'scenes' ? 'Behind the Scenes' : item.category}
                </span>
                <h3 className="font-serif text-base font-bold mt-1 tracking-wide">{item.title}</h3>
                <p className="font-sans text-[11px] text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-semibold pt-3 mt-3 border-t border-white/20">
                  <ZoomIn className="h-4 w-4 text-primary-450" />
                  Trigger Lightbox & Zoom
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Lightbox zoom modal framework */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95" id="gallery-lightbox-modal">
            
            {/* Header / Dismiss controls */}
            <div className="absolute top-4 inset-x-0 px-6 flex justify-between items-center text-white z-10 select-none">
              <div>
                <h3 className="font-serif text-lg font-bold">{activeLightbox.title}</h3>
                <p className="text-xs text-stone-400 capitalize">{activeLightbox.category === 'scenes' ? 'Behind the Scenes' : activeLightbox.category}</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Zoom handlers */}
                <button
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 2.5))}
                  className="rounded-full bg-white/10 p-2.5 hover:bg-white/20 transition text-white"
                  title="Zoom In"
                  id="lightbox-zoom-in"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.75))}
                  className="rounded-full bg-white/10 p-2.5 hover:bg-white/20 transition text-white"
                  title="Zoom Out"
                  id="lightbox-zoom-out"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20 text-xs font-bold"
                  title="Reset Scale"
                  id="lightbox-zoom-reset"
                >
                  Reset zoom ({Math.round(zoomScale * 100)}%)
                </button>
                
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="rounded-full bg-primary-600 p-2.5 hover:bg-primary-700 transition"
                  id="lightbox-close-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Slider Navigation arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 text-white z-10 transition-all hover:scale-110"
              id="lightbox-prev-arrow"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 text-white z-10 transition-all hover:scale-110"
              id="lightbox-next-arrow"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Zoom Content Area */}
            <div 
              className="relative max-w-4xl w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl"
              onClick={() => setActiveLightbox(null)}
            >
              <motion.img
                key={activeLightbox.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: zoomScale }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-transform ease-out pointer-events-auto"
                style={{ transform: `scale(${zoomScale})` }}
                onClick={(e) => e.stopPropagation()}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Caption bar */}
            <div className="absolute bottom-6 inset-x-6 text-center text-white max-w-xl mx-auto space-y-1 pointer-events-none">
              <p className="font-sans text-stone-200 text-sm leading-relaxed">
                {activeLightbox.description}
              </p>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">
                Item {filteredItems.findIndex(it => it.id === activeLightbox.id) + 1} of {filteredItems.length}
              </span>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
