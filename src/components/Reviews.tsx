import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  Award,
  Sparkles
} from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
  submitReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
}

export default function Reviews({
  reviews,
  submitReview
}: ReviewsProps) {
  // Review Form state
  const [name, setName] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [message, setMessage] = React.useState('');
  const [formSuccess, setFormSuccess] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  // Thumbs count tracking
  const [thumbs, setThumbs] = React.useState<Record<string, number>>({
    'r1': 11,
    'r2': 8,
    'r3': 5
  });

  const handleThumbClick = (id: string) => {
    setThumbs(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Calculate stats breakdown
  const totalReviews = reviews.length;
  const ratingAverage = Number((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1));
  const fiveStarsCount = reviews.filter(r => r.rating === 5).length;
  const fourStarsCount = reviews.filter(r => r.rating === 4).length;
  const threeStarsCount = reviews.filter(r => r.rating === 3).length;

  const handleReviewFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    submitReview({ name, rating, message });

    setFormSuccess(true);
    setName('');
    setMessage('');
    setRating(5);

    setTimeout(() => {
      setFormSuccess(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Editorial page heading */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
          Client Feedback wall
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-stone-900 sm:text-4xl">
          Real Customer Reviews & Testimonials
        </h1>
        <p className="font-sans text-stone-500 text-sm">
          Nothing sparks joy in our hearts like morning baking feedback. Read reviews from sweet lovers or write your own verified experience below.
        </p>
        <div className="mx-auto h-1 w-12 bg-primary-500 rounded-full" />
      </section>

      {/* Stats and write CTA block */}
      <section className="grid gap-8 md:grid-cols-12" id="reviews-stats-summary-block">
        
        {/* Left: Overall average breakdown (5 cols) */}
        <div className="md:col-span-5 rounded-2xl border border-primary-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary-500">Average Bakery Score</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl font-black text-primary-900">{ratingAverage}</span>
              <span className="font-sans text-sm text-primary-900/60">/ 5.0 Rating</span>
            </div>

            {/* Glowing stars */}
            <div className="flex items-center gap-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => {
                const filled = i < Math.round(ratingAverage);
                return (
                  <Star key={i} className={`h-5 w-5 ${filled ? 'fill-current' : 'text-primary-200'}`} />
                );
              })}
              <span className="text-xs font-semibold text-primary-900/70 ml-1">({totalReviews} Verified Submissions)</span>
            </div>

            {/* Simulated bars loop */}
            <div className="space-y-2.5 pt-4 border-t border-primary-100 font-sans text-xs">
              {[
                { label: '5 Stars', count: fiveStarsCount, percentage: (fiveStarsCount / totalReviews) * 100 },
                { label: '4 Stars', count: fourStarsCount, percentage: (fourStarsCount / totalReviews) * 105 },
                { label: '3 Stars', count: threeStarsCount, percentage: (threeStarsCount / totalReviews) * 100 }
              ].map((bar, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-12 text-primary-900/70 font-semibold">{bar.label}</span>
                  <div className="flex-1 h-2 bg-primary-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${bar.percentage}%` }} />
                  </div>
                  <span className="w-6 text-right text-primary-900/80 font-mono font-bold">{bar.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-primary-100 flex items-center justify-between">
            <span className="font-sans text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              100% Verified orders
            </span>
            <button
              onClick={() => setShowForm(prev => !prev)}
              className="rounded-xl bg-primary-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-primary-800 transition"
              id="write-review-cta"
            >
              {showForm ? 'Close Form' : 'Write a Review'}
            </button>
          </div>
        </div>

        {/* Right: Submission form (expanded if visible) (7 cols) */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-2xl border border-primary-200 bg-primary-50 p-6 shadow-xs space-y-4 font-sans text-xs"
                id="review-form-box"
              >
                <h3 className="font-serif text-lg font-bold text-primary-900">
                  Share Your Culinary Experience!
                </h3>
                <p className="text-primary-900/60">Every feedback helps Amina and the baking crew adjust hydration yeast layers.</p>

                {formSuccess ? (
                  <div className="bg-white rounded-xl border border-primary-200 p-6 text-center space-y-2">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      ✓
                    </div>
                    <p className="font-bold text-primary-900">Thank you! Review added immediately.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewFormSubmit} className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block font-semibold text-primary-900 mb-1">Your Full Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Wanjiku Kamau"
                          className="w-full rounded-lg border border-primary-200 bg-white p-2.5 focus:border-primary-500 focus:outline-none"
                          id="review-submitter-name"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-semibold text-primary-900 mb-1">Star Giver <span className="text-red-500">*</span></label>
                        <div className="flex gap-1.5 pt-2" id="star-selectors">
                          {[5, 4, 3].map((starNum) => (
                            <button
                              key={starNum}
                              type="button"
                              onClick={() => setRating(starNum)}
                              className={`flex items-center gap-1 border rounded-lg px-3 py-1 font-bold ${
                                rating === starNum 
                                  ? 'border-amber-500 bg-amber-50 text-amber-700 ring-1 ring-amber-500/20'
                                  : 'border-primary-200 bg-white hover:bg-primary-50 text-primary-900/70'
                              }`}
                              id={`rating-choice-${starNum}`}
                            >
                              <Star className={`h-3 w-3 ${rating >= starNum ? 'fill-current text-amber-500' : 'text-primary-300'}`} />
                              {starNum} Stars
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-primary-900 mb-1">Your Review Message <span className="text-red-500">*</span></label>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write details e.g. moistness ratios, customized design accuracy, delivery swiftness..."
                        className="w-full rounded-lg border border-primary-200 bg-white p-2.5 focus:border-primary-500 focus:outline-none placeholder:text-primary-950/45 text-primary-900"
                        id="review-message-input"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="rounded-xl border border-primary-200 px-4 py-2 font-bold text-primary-900 bg-white hover:bg-primary-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-xl bg-primary-600 px-5 py-2 font-bold text-white hover:bg-primary-700"
                        id="confirm-submit-review"
                      >
                        Publish Verified Review
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            ) : (
              /* Informational helpful box */
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 flex flex-col justify-center items-center text-center space-y-4 h-full">
                <div className="rounded-full bg-primary-100 p-3 text-primary-600">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-primary-900 leading-tight">Authenticity GOK Standards</h4>
                <p className="font-sans text-xs text-primary-900/60 leading-relaxed max-w-xs">
                  We verify every review against completed checkout orders inside our database. No fake indices, only delicious, verified pastry love!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="rounded-xl border border-primary-200 bg-white px-5 py-2.5 text-xs font-bold text-primary-900"
                >
                  Write Review
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Active reviews feed cards database */}
      <section className="space-y-4" id="reviews-feed">
        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-primary-500">
          Recent Client Submissions ({reviews.length})
        </h3>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-primary-200 bg-white p-6 shadow-sm flex flex-col justify-between"
              id={`review-feed-card-${rev.id}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < rev.rating ? 'fill-current' : 'text-stone-100'}`} />
                    ))}
                  </div>
                  
                  <span className="font-sans text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <p className="mt-3 font-sans text-stone-605 text-xs italic leading-relaxed">
                  "{rev.message}"
                </p>
              </div>

              {/* Card Footer details */}
              <div className="mt-6 border-t pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-stone-100 font-sans text-xs font-bold text-stone-650 flex items-center justify-center border">
                    {rev.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      {rev.name}
                      {rev.verified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-50" title="Verified Customer" />
                      )}
                    </h4>
                  </div>
                </div>

                {/* Thumbs up clicker simulation */}
                <button
                  onClick={() => handleThumbClick(rev.id)}
                  className="rounded-xl bg-stone-50 hover:bg-stone-100 border text-stone-500 hover:text-stone-800 px-3 py-1.5 text-[10px] font-semibold flex items-center gap-1.5 transition-colors"
                  id={`thumbs-btn-${rev.id}`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Helpful ({thumbs[rev.id] || 0})
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
