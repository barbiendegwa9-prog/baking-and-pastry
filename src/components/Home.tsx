import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Award, 
  ShieldCheck, 
  Truck, 
  Star, 
  CheckCircle2, 
  Plus, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Product, CartItem, Review } from '../types';

interface HomeProps {
  products: Product[];
  reviews: Review[];
  setActiveTab: (tab: string) => void;
  addToCart: (product: Product) => void;
  cart: CartItem[];
}

export default function Home({
  products,
  reviews,
  setActiveTab,
  addToCart,
  cart
}: HomeProps) {
  // Filter best sellers
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 6);
  // Get top 3 positive reviews
  const topReviews = reviews.filter(r => r.rating === 5).slice(0, 3);

  const highlights = [
    {
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      title: 'Freshly Baked Daily',
      desc: 'Our deck ovens roar to life at 3:00 AM every single night, ensuring your breakfast pastries and artisan sourdough are warm out of the brick hearth.'
    },
    {
      icon: <Award className="h-6 w-6 text-primary-600" />,
      title: 'Premium Ingredients',
      desc: 'No artificial additives, bleached flour, or hydrogenated oils. We source high-grade Belgian chocolate, European butter, and local organic fruits.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary-600" />,
      title: 'Certified Standards',
      desc: 'Tested to strict HACCP food safety guidelines, regular audits, and maximum environment hygiene sanitization protocols under certified supervisors.'
    },
    {
      icon: <Truck className="h-6 w-6 text-primary-600" />,
      title: 'Reliable Fast Delivery',
      desc: 'Direct, temperature-regulated logistics across Nairobi. Your delicate pastries and artisanal breads are securely packed and handled with absolute care.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero / Attractive Bakery Banner Section */}
      <section className="relative overflow-hidden bg-stone-900 px-4 pt-12 pb-20 sm:px-6 md:py-32 lg:px-8" id="home-hero">
        {/* Background Image containing actual generated photo */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <img
            src="/src/assets/images/kenyan_cakes_portfolio_hero_1781862817254.jpg"
            alt="Beautiful curated Kenyan celebration cakes portfolio"
            className="h-full w-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Diagonal Soft Lighting Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-950 via-stone-900/60 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-300 ring-1 ring-primary-500/30 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Voted Nairobi's Best Artisanal Bakery 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-serif text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in"
          >
            Stone Ground Passion, <br />
            <span className="text-primary-400">Artisanal Sourdough & Pastries</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-stone-200"
          >
            Welcome to Artisanal Breads and Pastries. We combine traditional 36-hour high-hydration fermentation, authentic French wild-yeast sourdough craftsmanship, golden butter-laminated premium pastries, and strict hygiene standards to deliver majestic quality in every single crust.
          </motion.p>

          {/* Call-to-action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
            id="home-cta-block"
          >
            <button
              onClick={() => setActiveTab('menu')}
              id="cta-order-now"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-primary-500/20 transition-all duration-300 hover:bg-primary-600 hover:shadow-primary-600/30 sm:w-auto hover:-translate-y-0.5 active:translate-y-0"
            >
              Order Online Now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              id="cta-view-menu"
              className="flex w-full items-center justify-center rounded-xl bg-white/10 px-8 py-4 font-sans text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:w-auto ring-1 ring-white/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              View Artisanal Menu
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              id="cta-request-delivery"
              className="flex w-full items-center justify-center rounded-xl border border-primary-400 bg-transparent px-8 py-4 font-sans text-base font-bold text-primary-300 transition-all duration-300 hover:bg-primary-500/10 sm:w-auto hover:-translate-y-0.5 active:translate-y-0"
            >
              Request Quick Delivery
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Highlights Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-featured-highlights">
        <div className="text-center">
          <h2 className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
            The Artisanal Way
          </h2>
          <p className="mt-2 text-3xl font-bold font-serif tracking-tight text-stone-900 sm:text-4xl">
            Why Our Breads & Pastries Excel
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary-500 rounded-full" />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((hlt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col items-start rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-100 hover:shadow-md hover:-translate-y-1"
            >
              <div className="rounded-xl bg-primary-50 p-3 mb-4">
                {hlt.icon}
              </div>
              <h3 className="font-sans text-lg font-bold text-stone-900">{hlt.title}</h3>
              <p className="mt-2 font-sans text-sm text-stone-500 leading-relaxed">{hlt.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Best-Selling Products Section */}
      <section className="bg-stone-100 py-16" id="home-bestsellers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
                Customer Favorites
              </h2>
              <p className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                Our Best-Selling Treasures
              </p>
            </div>
            <button
              onClick={() => setActiveTab('menu')}
              className="flex items-center gap-1 hover:gap-2 text-sm font-bold text-primary-600 transition-all hover:text-primary-700"
            >
              Examine Complete Menu Catalogue
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((product) => {
              const inCartCount = cart.find(item => item.product.id === product.id)?.quantity || 0;
              return (
                <div
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  id={`bestseller-card-${product.id}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-primary-600 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      Best Seller
                    </span>
                    {product.inventory <= 5 && (
                      <span className="absolute top-3 right-3 rounded-full bg-red-500 px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-wider text-white shadow-sm animate-pulse">
                        Sells Out Fast! ({product.inventory} left)
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between text-stone-500">
                      <span className="font-display text-xs font-medium tracking-wide uppercase">
                        {product.category} {product.subCategory ? `• ${product.subCategory}` : ''}
                      </span>
                      <span className="flex items-center gap-1 font-sans text-xs font-semibold text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {product.rating.toFixed(1)}
                      </span>
                    </div>

                    <h3 className="mt-2 font-serif text-lg font-bold text-stone-800 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-stone-500 line-clamp-2 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                      <div>
                        <span className="font-sans text-[10px] font-semibold text-stone-400 block uppercase tracking-wider">
                          Price
                        </span>
                        <span className="font-sans text-2xl font-black text-stone-900">
                          KSh {product.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition-all duration-300 ${
                          inCartCount > 0
                            ? 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200'
                            : 'bg-stone-900 text-white hover:bg-stone-800'
                        }`}
                        id={`bestseller-add-${product.id}`}
                      >
                        {inCartCount > 0 ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-primary-600" />
                            Added ({inCartCount})
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Customer Testimonials Preview Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-testimonials">
        <div className="text-center">
          <h2 className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
            Customer Delight
          </h2>
          <p className="mt-2 text-3xl font-bold font-serif tracking-tight text-stone-900 sm:text-4xl">
            Featured Reviews From Happy Customers
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary-500 rounded-full" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {topReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm relative overflow-hidden"
              id={`testimonial-${rev.id}`}
            >
              {/* Decorative Quotation Mark */}
              <span className="absolute -top-4 -right-1 font-serif text-8xl text-stone-50 select-none pointer-events-none">
                “
              </span>

              <div className="relative z-10">
                <div className="flex items-center gap-0.5 text-amber-500 mb-4" id={`testimonial-stars-${rev.id}`}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-500" />
                  ))}
                </div>
                <p className="font-sans text-stone-600 italic leading-relaxed text-sm">
                  "{rev.message}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {rev.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-stone-950 flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-50" title="Verified Customer" />
                    )}
                  </h4>
                  <span className="font-sans text-[11px] text-stone-400">
                    Verified Buyer • {rev.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab('reviews')}
            className="flex items-center gap-2 rounded-xl border border-stone-250 bg-stone-50 px-6 py-3 text-sm font-semibold text-stone-700 transition-all hover:bg-stone-100"
            id="btn-goto-reviews"
          >
            <MessageSquare className="h-4 w-4" />
            Read More Customer Testimonials
          </button>
          
          <button
            onClick={() => setActiveTab('reviews')}
            className="flex items-center gap-2 rounded-xl bg-primary-100 px-6 py-3 text-sm font-bold text-primary-700 transition-all hover:bg-primary-200"
            id="btn-write-review-hero"
          >
            Submit Your Review
          </button>
        </div>
      </section>

      {/* 5. Custom Floating Order-Now Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-950 p-8 text-center text-white md:px-12 md:py-12 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/40 via-brick-900/10 to-stone-900/50 mix-blend-overlay" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold sm:text-3xl">Ready for baked perfection?</h3>
            <p className="mt-3 font-sans text-stone-300 text-sm leading-relaxed">
              Order fresh whole-grain artisan baguettes, glazed danishes, butter-laminated pastries, or custom bakes right now.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setActiveTab('menu')}
                className="rounded-xl bg-primary-500 px-6 py-3 font-bold text-white shadow-md hover:bg-primary-600 transition-all hover:-translate-y-0.5"
                id="footer-cta-order"
              >
                Order Direct
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="rounded-xl border border-stone-400 px-6 py-3 font-semibold text-stone-200 hover:bg-white/10 transition-all"
                title="Catering service enquiries"
                id="footer-cta-catering"
              >
                Inquire For Event Catering
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
