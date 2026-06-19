import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Send, 
  MessageCircle, 
  Share2, 
  Heart, 
  MessageSquare,
  Croissant,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);
  const [showShareNotification, setShowShareNotification] = React.useState(false);
  const [sharePlatformUsed, setSharePlatformUsed] = React.useState('');

  // Simulated Instagram post feed list
  const igPosts = [
    { id: 1, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80', likes: 218, comments: 24 },
    { id: 2, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80', likes: 450, comments: 45 },
    { id: 3, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80', likes: 189, comments: 12 },
    { id: 4, img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80', likes: 312, comments: 38 }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 3000);
  };

  const handleSocialShare = (platform: string) => {
    setSharePlatformUsed(platform);
    setShowShareNotification(true);
    setTimeout(() => {
      setShowShareNotification(false);
    }, 2500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800" id="footer-panel">
      
      {/* 4 Footer Columns row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-b border-stone-800 pb-10">
        
        {/* Col 1: About & Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="rounded-full bg-primary-500/25 p-2 text-primary-400">
              <Croissant className="h-5 w-5" />
            </div>
            <span className="font-serif text-lg font-bold">Artisanal Breads & Pastries</span>
          </div>
          <p className="font-sans text-xs text-stone-400 leading-relaxed">
            Nairobi's standard-setting baking oven specialized in artisan sourdough breads and delicate French pastries. We craft certified, 81-layer butter croissants and stone-deck country loaves with 100% organic flour.
          </p>

          {/* Social Platforms links block */}
          <div className="flex items-center gap-3 pt-2" id="social-platforms">
            <button
              onClick={() => handleSocialShare('Facebook')}
              className="h-8 w-8 rounded-full bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white flex items-center justify-center transition"
              title="Share / Follow on Facebook"
              id="share-platform-fb"
            >
              <Facebook className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSocialShare('Instagram')}
              className="h-8 w-8 rounded-full bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white flex items-center justify-center transition"
              title="Follow our Instagram"
              id="share-platform-ig"
            >
              <Instagram className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSocialShare('TikTok')}
              className="h-8 w-8 rounded-full bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white flex items-center justify-center transition font-bold text-xs"
              title="TikTok bake logs"
              id="share-platform-tt"
            >
              🎵
            </button>
            <button
              onClick={() => handleSocialShare('YouTube')}
              className="h-8 w-8 rounded-full bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white flex items-center justify-center transition"
              title="Baking masterclasses YouTube"
              id="share-platform-yt"
            >
              <Youtube className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSocialShare('WhatsApp')}
              className="h-8 w-8 rounded-full bg-stone-800 text-stone-250 hover:bg-stone-700 hover:text-white flex items-center justify-center transition"
              title="Chat over WhatsApp"
              id="share-platform-wa"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Col 2: Directory Links */}
        <div className="space-y-4 font-sans text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Breads & Pastries Directory</h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Browse Fresh Pastries', tab: 'menu' },
              { label: 'Custom Event Catering', tab: 'menu' },
              { label: 'HACCP Safety Certificates', tab: 'about' },
              { label: 'Inquire Custom Orders', tab: 'menu' },
              { label: 'Read Verified Reviews', tab: 'reviews' },
              { label: 'Track Active Delivery Dispatch', tab: 'delivery' }
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setActiveTab(link.tab)}
                  className="hover:text-white hover:underline transition-colors text-stone-400 font-semibold"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Instagram Live Feed Display */}
        <div className="space-y-4">
          <h4 className="font-sans font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Instagram className="h-4 w-4 text-primary-400" />
            Instagram Feed @sweethaven
          </h4>

          {/* 4 Photo Grid */}
          <div className="grid grid-cols-2 gap-2" id="footer-ig-feed">
            {igPosts.map((post) => (
              <div 
                key={post.id} 
                className="group relative aspect-square overflow-hidden rounded-lg bg-stone-800 border border-stone-800 pointer-events-auto cursor-pointer"
                onClick={() => handleSocialShare('Instagram Product Link')}
              >
                <img
                  src={post.img}
                  alt="Pastry IG"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* likes hover layer */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-[10px] font-bold">
                  <span className="flex items-center gap-0.5"><Heart className="h-3.5 w-3.5 fill-current text-rose-500" /> {post.likes}</span>
                  <span className="flex items-center gap-0.5"><MessageSquare className="h-3.5 w-3.5 fill-current" /> {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 4: Newsletter Subscriber */}
        <div className="space-y-4 font-sans text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Send className="h-4 w-4 text-primary-400" />
            The Baking Bulletin
          </h4>
          <p className="text-stone-400 leading-relaxed">
            Subscribe early for morning warm loaf discounts, upcoming handmade pastry schedules, and professional safety audit logs!
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 pt-1" id="newsletter-subscription-form">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="baker-friend@email.com"
              className="bg-stone-800 border border-stone-700 rounded-lg p-2.5 focus:outline-none focus:border-primary-500 text-xs text-white"
              id="newsletter-email-field"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary-600 px-4 py-2.5 font-bold text-white hover:bg-primary-550 transition uppercase tracking-wider text-[11px]"
              id="submit-newsletter-btn"
            >
              Subscribe Today
            </button>
          </form>

          {newsletterSubscribed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] text-emerald-400 font-bold"
            >
              ✓ Inscribed successfully! Welcome to the baking family.
            </motion.p>
          )}
        </div>

      </div>

      {/* Social share alert notifications */}
      <AnimatePresence>
        {showShareNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed bottom-6 left-6 z-50 rounded-xl bg-stone-950 border border-stone-800 p-4 font-sans text-xs text-stone-200 shadow-2xl flex items-center gap-2"
            id="share-success-notification"
          >
            <Share2 className="h-4 w-4 text-primary-400 shrink-0" />
            <p>Shared Artisanal Breads & Pastries' recipe link to <span className="font-bold text-white">{sharePlatformUsed}</span> callback successful! Thank you!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Chat Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none" id="whatsapp-floating-assistant">
        <motion.button
          onClick={() => handleSocialShare('WhatsApp Chat Channel Link')}
          whileHover={{ scale: 1.05 }}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-emerald-600 p-3.5 font-sans text-xs font-bold text-white shadow-2xl hover:bg-emerald-505 transition shadow-emerald-600/30 ring-4 ring-emerald-500/10"
          id="whatsapp-chat-button"
        >
          <MessageCircle className="h-5 w-5 fill-current" />
          <span className="hidden md:inline-block">Talk to a Baker Live</span>
        </motion.button>
      </div>

      {/* Footer Copy notes */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-stone-500 font-sans">
        <p>© {currentYear} Artisanal Breads & Pastries Ltd. Co. All Rights Reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0 font-semibold" id="footer-legals">
          <button onClick={() => setActiveTab('about')} className="hover:text-stone-300 hover:underline">HACCP Safety Compliance</button>
          <span>•</span>
          <button onClick={() => setActiveTab('contact')} className="hover:text-stone-300 hover:underline">Operating Hours</button>
          <span>•</span>
          <button onClick={() => setActiveTab('about')} className="hover:text-stone-300 hover:underline">Privacy Terms</button>
        </div>
      </div>

    </footer>
  );
}
