import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Activity, 
  Calendar,
  Send,
  Heart,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { Product, CartItem, CustomInquiry } from '../types';

interface ProductsProps {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  setActiveTab: (tab: string) => void;
  submitInquiry: (inquiry: Omit<CustomInquiry, 'id' | 'status' | 'createdAt'>) => void;
}

export default function Products({
  products,
  cart,
  addToCart,
  removeFromCart,
  wishlist,
  toggleWishlist,
  setActiveTab,
  submitInquiry
}: ProductsProps) {
  // Category variables
  const categories = ['All', 'Breads', 'Pastries', 'Desserts', 'Cakes'] as const;
  const [selectedCategory, setSelectedCategory] = React.useState<typeof categories[number]>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [priceRange, setPriceRange] = React.useState<number>(30000);
  const [sortBy, setSortBy] = React.useState<'popular' | 'priceAsc' | 'priceDesc'>('popular');
  const [showInquiryModal, setShowInquiryModal] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState('');

  // Service list from user request
  const services = [
    {
      id: 's1',
      title: 'Event Catering',
      desc: 'Elegant dessert towers, gourmet cupcake platters, and custom pastries sized for birthday celebrations, bridal showers, or family gatherings.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's2',
      title: 'Wedding Catering',
      desc: 'Tiered majestic masterpieces made with organic fillings, matching table designs, delivery handling, and custom sugar flower displays.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's3',
      title: 'Corporate Orders',
      desc: 'Branded edible logs, pastries, morning break croissant platters delivered warm daily to fuel your office meetings and team days.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's4',
      title: 'Custom Cake Design',
      desc: 'Bring us your creative concepts! Our master sugar sculptors draw, print, and structure customized dream shapes for every special celebration.',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's5',
      title: 'Bulk Bread Orders',
      desc: 'Wholesale solutions for local cafes, restaurants, and hotels. Daily early morning deliveries of freshly-proofed sourdough rolls.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Inquiry Form state
  const [inquiryName, setInquiryName] = React.useState('');
  const [inquiryPhone, setInquiryPhone] = React.useState('');
  const [inquiryEmail, setInquiryEmail] = React.useState('');
  const [inquiryDate, setInquiryDate] = React.useState('');
  const [inquiryGuests, setInquiryGuests] = React.useState(20);
  const [inquiryDetails, setInquiryDetails] = React.useState('');
  const [inquirySuccess, setInquirySuccess] = React.useState(false);

  // Filters logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = product.price <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.rating - a.rating;
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return 0;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryPhone) return;

    submitInquiry({
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      eventType: selectedService || 'Custom Order Inquiry',
      eventDate: inquiryDate,
      guestCount: Number(inquiryGuests),
      details: inquiryDetails
    });

    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setShowInquiryModal(false);
      // Reset form
      setInquiryName('');
      setInquiryPhone('');
      setInquiryEmail('');
      setInquiryDate('');
      setInquiryGuests(20);
      setInquiryDetails('');
    }, 2500);
  };

  const handleInquireClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setShowInquiryModal(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      
      {/* Search and Filters Header */}
      <section className="bg-white rounded-3xl border border-primary-200 p-6 shadow-sm space-y-6" id="filters-panel">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-black text-primary-900 tracking-tight">
              The Artisanal Breads & Pastries Catalog
            </h1>
            <p className="font-sans text-xs text-primary-900/60 mt-1">
              Filter by flour categories, price metrics, or write direct bakery search queries.
            </p>
          </div>

          {/* Search Field */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-primary-500">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search baguettes, golden croissants, authentic sourdough..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-primary-200 bg-primary-50 py-3 pl-11 pr-4 text-xs font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all placeholder:text-primary-950/45 text-primary-900"
              id="search-input"
            />
          </div>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-primary-100">
          <div className="flex flex-wrap gap-2" id="category-tabs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-primary-50 text-primary-900 hover:bg-primary-100 border border-primary-250'
                  }`}
                  id={`tab-category-${cat}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Optional Sorting & Price limit sliders */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Price Max slider */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-semibold text-stone-500 uppercase tracking-widest leading-none">
                Max Price:
              </span>
              <span className="font-mono text-sm font-bold text-stone-850">
                KSh {priceRange.toLocaleString()}
              </span>
              <input
                type="range"
                min="100"
                max="30000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="accent-primary-600 h-1.5 rounded-lg bg-stone-200 cursor-pointer w-24 sm:w-36"
                id="price-range-slider"
              />
            </div>

            {/* Sorter selection */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-stone-250 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 outline-none focus:border-primary-550"
              id="sort-select"
            >
              <option value="popular">Sort by Rating</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Catalog Display Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-stone-400">
            Showing {filteredProducts.length} items
          </span>
          {selectedCategory !== 'All' && (
            <span className="font-sans text-xs text-primary-600 font-semibold uppercase">
              Category Filters Active
            </span>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" id="products-catalog-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const cartItem = cart.find(item => item.product.id === product.id);
              const inCartCount = cartItem?.quantity || 0;
              const isWished = wishlist.includes(product.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm hover:shadow-md transition-shadow"
                  id={`product-card-${product.id}`}
                >
                  {/* Image Block */}
                  <div className="relative aspect-[4/3] bg-stone-50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />

                    {/* Wish button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors ${
                        isWished ? 'text-red-500' : 'text-stone-400 hover:text-red-400'
                      }`}
                      title={isWished ? "Remove from wishlist" : "Add to wishlist"}
                      id={`wish-btn-${product.id}`}
                    >
                      <Heart className={`h-4.5 w-4.5 ${isWished ? 'fill-current' : ''}`} />
                    </button>

                    {/* Category Overlay tag */}
                    <span className="absolute bottom-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-[9px] font-bold text-white uppercase tracking-wider">
                      {product.subCategory || product.category}
                    </span>
                  </div>

                  {/* Info Details and Controls */}
                  <div className="flex-1 flex flex-col justify-between p-4 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                          Stock: {product.inventory > 0 ? `${product.inventory} available` : 'Sold out!'}
                        </span>
                        <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-500">
                          <Star className="h-3 w-3 fill-current" />
                          {product.rating.toFixed(1)}
                        </div>
                      </div>

                      <h3 className="font-serif text-base font-bold text-stone-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed text-stone-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Interactive pricing & cart row */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <span className="font-sans text-lg font-black text-stone-900">
                        KSh {product.price.toLocaleString()}
                      </span>

                      {/* Direct inventory controller in place if active count > 0 */}
                      {inCartCount > 0 ? (
                        <div className="flex items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50 p-1" id={`cart-adjust-${product.id}`}>
                          <button
                            onClick={() => removeFromCart(product)}
                            className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-primary-700 shadow-sm hover:bg-stone-50"
                            id={`card-minus-${product.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-sans text-xs font-bold text-primary-850 px-1 pointer-events-none">
                            {inCartCount}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm hover:bg-primary-750"
                            id={`card-plus-${product.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="flex h-8 items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1 text-xs font-bold text-white hover:bg-stone-850 transition-colors"
                          id={`add-btn-${product.id}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Order now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="col-span-full rounded-2xl bg-stone-100 p-12 text-center text-stone-500">
              <span className="font-mono text-xs font-bold uppercase">No matching products found</span>
              <p className="mt-1 text-xs">Try clearing your filters or testing other spelling lookups!</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setPriceRange(300); }}
                className="mt-4 rounded-xl bg-primary-500 px-4 py-2 text-xs font-bold text-white hover:bg-primary-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Bespoke Catering Services Section */}
      <section className="bg-stone-55 border-t border-b border-stone-200 py-16" id="services-panel">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
            Bespoke Baking Artistry
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-stone-900">
            Professional Catering & Custom Services
          </h2>
          <p className="font-sans text-stone-500 text-sm leading-relaxed">
            From glorious wedding cascades to breakfast croissant crates for high-priority office events, make your exact baking desires a stunning reality.
          </p>
          <div className="mx-auto h-1 w-12 bg-primary-500 rounded-full" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white hover:shadow-md transition-shadow"
              id={`service-card-${svc.id}`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between p-5 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-stone-900 tracking-tight">
                    {svc.title}
                  </h3>
                  <p className="font-sans text-xs text-stone-500 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
                  <span className="font-sans text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                    Available to pre-order
                  </span>
                  
                  <button
                    onClick={() => handleInquireClick(svc.title)}
                    className="flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 transition"
                    id={`inquire-btn-${svc.id}`}
                  >
                    Submit Booking
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry wizard overlay modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInquiryModal(false)}
              className="fixed inset-0 z-50 bg-stone-950/65"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-x-4 top-10 md:top-20 z-50 mx-auto max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              id="inquiry-form-modal"
            >
              <form onSubmit={handleInquirySubmit} className="flex flex-col p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-950 flex items-center gap-2">
                      <Sparkle className="h-5 w-5 text-primary-500" />
                      Inquire: {selectedService}
                    </h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">Please share event metrics so we can craft customized quotes.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowInquiryModal(false)}
                    className="text-stone-400 hover:text-stone-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {inquirySuccess ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      ✓
                    </div>
                    <h4 className="font-serif text-lg font-bold text-stone-900">Inquiry Received Successfully!</h4>
                    <p className="font-sans text-xs text-stone-500 max-w-xs mx-auto">
                      Our master artisanal baking and pastry coordinator will call your phone number within 4 active business hours. Thanks for trusting your baking needs with us!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 font-sans text-xs">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Customer Full Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="Wanjiku Kamau"
                          className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-550 focus:outline-none"
                          id="inquiry-name"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="e.g. +254 700 000000"
                          className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-550 focus:outline-none"
                          id="inquiry-phone"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="wanjiku.k@gmail.com"
                        className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-550 focus:outline-none"
                        id="inquiry-email"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Preferred Event Date</label>
                        <input
                          type="date"
                          value={inquiryDate}
                          onChange={(e) => setInquiryDate(e.target.value)}
                          className="w-full rounded-lg border border-stone-250 p-2.5 focus:outline-none focus:border-primary-550 cursor-pointer"
                          id="inquiry-date"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Approximate Guest Count</label>
                        <select
                          value={inquiryGuests}
                          onChange={(e) => setInquiryGuests(Number(e.target.value))}
                          className="w-full rounded-lg border border-stone-250 p-2.5 focus:outline-none focus:border-primary-550 cursor-pointer"
                          id="inquiry-guests"
                        >
                          <option value="15">15 - 30 Guests</option>
                          <option value="50">31 - 100 Guests</option>
                          <option value="200">101 - 300 Guests</option>
                          <option value="500">300+ Corporate Guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Dietary preferences, theme colors, or specific requests</label>
                      <textarea
                        rows={3}
                        value={inquiryDetails}
                        onChange={(e) => setInquiryDetails(e.target.value)}
                        placeholder="Mention customized flavor profiles like chocolate orange, nut alerts, decorative writing expectations, or special address structures..."
                        className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-550 focus:outline-none placeholder:text-stone-400"
                        id="inquiry-details"
                      />
                    </div>

                    <div className="flex gap-3 justify-end pt-3 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setShowInquiryModal(false)}
                        className="rounded-xl border border-stone-200 px-4 py-2.5 font-bold text-stone-605 hover:bg-stone-50"
                      >
                        Cancel
                      </button>
                      
                      <button
                        type="submit"
                        className="rounded-xl bg-primary-600 px-5  py-2.5 text-center font-bold text-white hover:bg-primary-700 flex items-center gap-1.5"
                        id="inquiry-submit-btn"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Submit Request
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
