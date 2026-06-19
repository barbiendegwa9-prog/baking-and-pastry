import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Leaf, 
  Smile, 
  Sparkles, 
  Compass, 
  Target, 
  ShieldAlert, 
  Droplet, 
  Activity, 
  Users, 
  ShoppingBag, 
  CheckCircle,
  Clock,
  ShieldCheck,
  Cpu,
  BookmarkCheck,
  TrendingDown,
  Coins,
  Headphones
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <AwardIcon className="h-6 w-6 text-primary-600" />,
      title: 'Uncompromised Quality',
      desc: 'We never slice corners. Every butter croissant or seed-crusted country sourdough boule is prepared to strict master dimensions with optimal crumb density.'
    },
    {
      icon: <Leaf className="h-6 w-6 text-emerald-600" />,
      title: 'Hearth-Cold Freshness',
      desc: 'We maintain a rigid zero-leftover policy. Sourdough batards or breads that aren’t dispatched on their baking day are donated directly to local shelters.'
    },
    {
      icon: <Smile className="h-6 w-6 text-primary-600" />,
      title: 'Absolute Customer Delight',
      desc: 'Our team goes above and beyond to personalize your pastries, solve ordering edge cases, custom-bake event items, and deliver joy directly to your doorstep.'
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      title: 'Continuous Pastry Innovation',
      desc: 'Blending time-tested European techniques with modern baker chemistry to craft innovative textures, sugar-low variations, and delicious gluten-conscious alternatives.'
    }
  ];

  const safetyStandards = [
    {
      id: 's1',
      title: 'HACCP Compliance',
      desc: 'Strict Hazard Analysis Critical Control Point system tracks micro-environments from dough-mixer temperatures to loading bays.'
    },
    {
      id: 's2',
      title: 'Food-Grade Sourcing',
      desc: '100% certified non-GMO flour, pure cocoa solids, unbleached grains, and fresh ingredients with clear origin tracking.'
    },
    {
      id: 's3',
      title: 'Daily Sanitization',
      desc: 'Our steam-cleaning equipment sterilizes professional mixing bowls, deck sheets, and counters multiple times per shift.'
    },
    {
      id: 's4',
      title: 'Staff Hygiene Training',
      desc: 'Certified sanitization coaching, complete hairnets, sanitizing boots, and mandatory dual-glove touch standards on finished bakes.'
    },
    {
      id: 's5',
      title: 'Fresh Ingredient Sourcing',
      desc: 'Direct farm contracts for dairy, eggs, and fruits. Kept in sterile cold-storage boxes with batch-expiry tracking.'
    },
    {
      id: 's6',
      title: 'Temperature Controlled',
      desc: 'Chutes, cooling racks, and logistics trucks are maintained at precise temperature limits to protect delicate chocolate swirls.'
    }
  ];

  const certifications = [
    { title: 'Food Safety Authority Cert', agency: 'Nairobi Health Committee' },
    { title: 'ISO 22000 Food Safety Standard', agency: 'Global Quality Assessors' },
    { title: 'Certified HACCP Plan compliance', agency: 'Safety Council Audit' }
  ];

  const trustFactors = [
    {
      title: 'Fresh Baked Every Day',
      desc: 'Baked brand-new from scratch at midnight, never defrosted or pre-packaged.',
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: 'Certified Safety Practice',
      desc: 'Clean environment keeping safety scores at consecutive 100% marks.',
      icon: <ShieldCheck className="h-4 w-4" />
    },
    {
      title: 'Secure Online Ordering',
      desc: 'Locked M-pesa & Visa gateways safeguarding details from end to end.',
      icon: <BookmarkCheck className="h-4 w-4" />
    },
    {
      title: 'Transparent Pricing',
      desc: 'Zero hidden service fees or delivery markups. Clear quotes for custom-built bakes.',
      icon: <Coins className="h-4 w-4" />
    },
    {
      title: 'Premium Ingredients Only',
      desc: 'Real cream, vanilla beans, and high-butterfat pastries with no shortcuts.',
      icon: <Leaf className="h-4 w-4" />
    },
    {
      title: 'Professional Bakers',
      desc: 'Led by certified pastry masters with combined decades of high-end hotel baking experience.',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Fast & Reliable Logistics',
      desc: 'Real-time tracked pastry delivery vans preventing standard heat melted bakes.',
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: 'Excellent Human Support',
      desc: 'Instant WhatsApp hotline with dedicated bakery managers answering inquiries.',
      icon: <Headphones className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-24 py-12 pb-24">
      
      {/* 1. Company Story & Introduction */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="about-story">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
              Our Legacy of Flakiness
            </span>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
              Spreading Golden Crumbs <br />
              <span className="text-primary-600">With Love & Integrity Since 2018</span>
            </h2>
            <p className="font-sans text-stone-600 text-base leading-relaxed">
              Artisanal Breads and Pastries began as a humble brick oven in Nairobi with a simple, soaring ambition: to rescue the neighborhood from cardboard, mass-manufactured breads. Founded by third-generation pastry chef Amina and baking chemist Leo, we set out to restore the ancient art of sourdough hydration and Belgian chocolate tempering.
            </p>
            <p className="font-sans text-stone-600 text-base leading-relaxed">
              What started as small morning batches of croissants grew into Nairobi’s beloved breads & pastries destination. Today, while our ovens are larger and our certified food safety standards are world-class, our core recipe remains beautifully unchanged: organic grains, cold slow-proofing, and a mountain of authentic passion.
            </p>
            
            <div className="flex items-center gap-6 pt-4 border-t border-primary-200">
              <div>
                <span className="block font-serif text-3xl font-black text-primary-600">100%</span>
                <span className="font-sans text-xs text-stone-500 uppercase tracking-widest">Natural Sourdough</span>
              </div>
              <div className="h-10 w-px bg-stone-200" />
              <div>
                <span className="block font-serif text-3xl font-black text-primary-600">20+</span>
                <span className="font-sans text-xs text-stone-500 uppercase tracking-widest">Master Pastry Chefs</span>
              </div>
              <div className="h-10 w-px bg-stone-200" />
              <div>
                <span className="block font-serif text-3xl font-black text-primary-600">45k+</span>
                <span className="font-sans text-xs text-stone-500 uppercase tracking-widest">Delighted Families</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
                alt="Amina and Leo preparing croissants together"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decors */}
            <div className="absolute -bottom-6 -left-6 z-10 hidden rounded-2xl bg-stone-900 p-5 text-white shadow-lg sm:flex items-center gap-3">
              <div className="rounded-lg bg-primary-500/10 p-2 text-primary-400">
                <Heart className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <p className="font-sans text-xs text-stone-400">Baked With</p>
                <p className="font-serif font-bold text-sm">81 Pure Flaky Layers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Section */}
      <section className="bg-stone-900 py-16 text-white" id="about-vision-mission">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <div className="relative rounded-2xl bg-white/5 p-8 transition-colors duration-300 hover:bg-white/10 ring-1 ring-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold tracking-wide">Our Grand Vision</h3>
              <p className="mt-4 font-sans text-stone-300 leading-relaxed text-sm">
                To become the most trusted and loved bakery brand inside Kenya and beyond by delivering exceptional, health-conscious baked products and memorable culinary experiences that spark warmth in every home. We aim to define the perfect intersection of traditional artistry and state-of-the-art food hygiene rules.
              </p>
            </div>

            {/* Mission */}
            <div className="relative rounded-2xl bg-primary-950 p-8 transition-colors duration-300 hover:bg-primary-900 ring-1 ring-primary-500/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold tracking-wide">Our Daily Mission</h3>
              <p className="mt-4 font-sans text-orange-100 leading-relaxed text-sm">
                To provide fresh, delicious, and premium-quality bakery products made with raw unyielding passion, while strictly maintaining the highest possible standards of hygiene, health controls, and customer happiness. We commit to continuous education, zero residue waste, and absolute support for local farmers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pastry Purification & Food Safety Standards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="about-safety-standards">
        <div className="text-center">
          <span className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
            Pure Hygiene Protocols
          </span>
          <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Pastry Purification & Food Safety Standards
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-stone-500 text-sm">
            We operate our baking lab like a sterile high-end research facility. Safe eating triggers healthy living, which is why safety is a vital ingredient baked into every flour grain.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary-500 rounded-full" />
        </div>

        {/* 6 Standards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="standards-grid">
          {safetyStandards.map((std) => (
            <div
              key={std.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:border-primary-200 transition-colors"
            >
              <h3 className="font-sans text-base font-bold text-stone-900 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                  ✓
                </span>
                {std.title}
              </h3>
              <p className="mt-2.5 font-sans text-xs text-stone-500 leading-relaxed">
                {std.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications Badge row */}
        <div className="mt-16 rounded-2xl bg-stone-100 p-8 text-center" id="certifications-summary">
          <h3 className="font-display text-xs font-bold tracking-widest text-stone-400 uppercase">
            Our Official Credentials & Active Audits
          </h3>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            {certifications.map((cert, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-sm border border-stone-200"
              >
                <div className="rounded-full bg-emerald-100 p-1.5 text-emerald-600">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="font-sans text-xs font-bold text-stone-850">{cert.title}</p>
                  <p className="font-sans text-[10px] text-stone-400">{cert.agency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Customers Should Trust Us */}
      <section className="bg-stone-50 py-16 border-t border-b border-stone-200/60" id="about-trust-factors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
              The sweet pillars
            </span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
              Why Our Community Trusts Us
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 bg-primary-500 rounded-full" />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustFactors.map((tr, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white p-5 shadow-sm border border-stone-150 flex gap-4 items-start hover:shadow-md transition-shadow"
                id={`trust-card-${idx}`}
              >
                <div className="rounded-xl bg-primary-100 p-2 text-primary-700 font-bold shrink-0">
                  {tr.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans text-sm font-bold text-stone-900 leading-tight">
                    {tr.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-550 leading-relaxed">
                    {tr.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Simple internal component to prevent empty import warning
function AwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}
