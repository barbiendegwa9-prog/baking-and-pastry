import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  CheckCircle, 
  Flame, 
  MapPin, 
  Truck, 
  Sparkles, 
  PackageCheck,
  Calendar,
  Clock,
  Navigation
} from 'lucide-react';
import { Order } from '../types';

interface DeliveryProps {
  orders: Order[];
  lastTrackingNumber: string;
  setActiveTab: (tab: string) => void;
}

export default function Delivery({
  orders,
  lastTrackingNumber,
  setActiveTab
}: DeliveryProps) {
  const [searchTracking, setSearchTracking] = React.useState(lastTrackingNumber || '');
  const [trackedOrder, setTrackedOrder] = React.useState<Order | null>(null);

  // If order details change, update the active tracked order
  React.useEffect(() => {
    const defaultTracked = orders.find(o => o.trackingNumber === lastTrackingNumber) || orders[0] || null;
    setTrackedOrder(defaultTracked);
    if (defaultTracked) {
      setSearchTracking(defaultTracked.trackingNumber);
    }
  }, [orders, lastTrackingNumber]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSearch = searchTracking.trim().toUpperCase();
    const found = orders.find(o => o.trackingNumber === cleanSearch || o.id === cleanSearch);
    if (found) {
      setTrackedOrder(found);
    } else {
      alert('Tracking number not found in local active files. Test with existing tracking numbers visible on page.');
    }
  };

  const steps = [
    { statusId: 'received', label: 'Order Received', desc: 'Secure payment cleared, order specifications verified by head baker.', icon: <CheckCircle className="h-5 w-5" /> },
    { statusId: 'baking', label: 'Baking', desc: 'Active kneading, organic proofing, and brick hearth deck baking occurring now.', icon: <Flame className="h-5 w-5" /> },
    { statusId: 'out_for_delivery', label: 'Out for Delivery', desc: 'Loaded into specialized temperature-regulated vans with professional handlers.', icon: <Navigation className="h-5 w-5" /> },
    { statusId: 'delivered', label: 'Delivered', desc: 'Safely handed over to you with pristine flakiness standards maintained.', icon: <PackageCheck className="h-5 w-5" /> }
  ];

  // Helper to determine the index of the current status
  const getStepIndex = (status: string) => {
    if (status === 'received') return 0;
    if (status === 'baking') return 1;
    if (status === 'out_for_delivery') return 2;
    if (status === 'delivered') return 3;
    return 0;
  };

  const currentStepIdx = trackedOrder ? getStepIndex(trackedOrder.status) : -1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Search Order Block */}
      <section className="bg-stone-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl" id="delivery-search-banner">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80"
            alt="background sourdough"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-5">
          <span className="font-display text-xs font-semibold tracking-widest text-primary-400 uppercase">
            Instant Delivery Dispatch
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Track Your Fresh Breads & Pastries Logistically
          </h1>
          <p className="font-sans text-stone-300 text-xs leading-relaxed max-w-lg">
            Every pastry box and sourdough loaf dispatch is fully tracked through our internal safety control panels. Input your unique tracking ID code starting with #SH- below.
          </p>

          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md pt-2" id="delivery-search-form">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-stone-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Enter Code (e.g. #SH-1234)"
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className="w-full uppercase rounded-xl bg-white/10 border border-white/20 py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary-500 focus:bg-white/15 transition-all font-mono tracking-widest"
                id="search-tracking-field"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600 transition tracking-wide text-xs uppercase"
              id="submit-order-tracker"
            >
              Track Order
            </button>
          </form>
        </div>
      </section>

      {/* Main Tracker Visualization Block */}
      <section className="grid gap-8 lg:grid-cols-12" id="delivery-main-tracker">
        {trackedOrder ? (
          <>
            {/* Left: Active Tracker Timeline (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-base font-black text-stone-900 uppercase tracking-widest">{trackedOrder.trackingNumber}</span>
                    <span className="rounded-full bg-primary-100 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase text-primary-750 animate-pulse">
                      Live State: {steps[currentStepIdx]?.label}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-stone-400 mt-1">
                    Booked for {trackedOrder.customerName} on {trackedOrder.deliveryDate} ({trackedOrder.preferredTime})
                  </p>
                </div>
                
                {/* Simulated manual state override notice */}
                <div className="rounded-xl bg-amber-50 p-2 border border-amber-200/50 text-amber-800 font-sans text-[10px] sm:max-w-xs">
                  💡 <span className="font-bold">Test notice:</span> Update order states instantly via the <span className="font-bold underline cursor-pointer hover:text-primary-600" onClick={() => setActiveTab('admin')}>Admin Dashboard</span> to watch this tracker progress programmatically!
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="relative pt-4 pb-2">
                
                {/* Horizontal Bar for desktops, vertical for mobile */}
                <div className="hidden md:block absolute top-[43px] left-[50px] right-[50px] h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStepIdx / 3) * 100}%` }}
                    className="h-full bg-primary-550"
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Progress markers loop (horizontal) */}
                <div className="grid gap-6 md:grid-cols-4 select-none relative z-10" id="tracker-steps-display">
                  {steps.map((st, i) => {
                    const isDone = i <= currentStepIdx;
                    const isActive = i === currentStepIdx;
                    return (
                      <div key={st.statusId} className="flex md:flex-col items-center gap-4 md:gap-3 text-center md:text-center shrink-0">
                        {/* Icon circle */}
                        <motion.div
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-colors ${
                            isActive 
                              ? 'bg-primary-600 text-white ring-4 ring-primary-150'
                              : isDone 
                                ? 'bg-primary-500 text-white' 
                                : 'bg-white text-stone-300 border-2 border-stone-200'
                          }`}
                        >
                          {st.icon}
                        </motion.div>

                        {/* Title and desc */}
                        <div className="flex-1 md:flex-none text-left md:text-center space-y-1">
                          <h4 className={`font-sans text-xs font-bold leading-tight ${
                            isActive ? 'text-primary-700' : isDone ? 'text-stone-900' : 'text-stone-400'
                          }`}>
                            {st.label}
                          </h4>
                          <p className="font-sans text-[10px] text-stone-400 max-w-[160px] md:mx-auto leading-relaxed">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Driver Info Section */}
              <div className="rounded-xl border border-stone-150 bg-stone-50 p-4 font-sans text-xs flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 font-serif shadow-inner">
                    M
                  </div>
                  <div>
                    <p className="font-bold text-stone-850">Your Designated Logistics Driver: Mwangi</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">Contact: +254 712 110099 • Vehicle: KCH-928A (Eco-Van)</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white border px-3 py-1.5 rounded-lg text-emerald-600 font-bold shrink-0 shadow-xs">
                  <CheckCircle className="h-4 w-4" />
                  Sanitizer Audit Approved
                </div>
              </div>
            </div>

            {/* Right: Order Specifications view (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-stone-900">Order Information</h3>
                <div className="h-px bg-stone-101" />

                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-semibold">Recipient</span>
                    <span className="font-bold text-stone-800">{trackedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-semibold">Contact Phone</span>
                    <span className="font-mono">{trackedOrder.phone}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-semibold">Delivery Address</span>
                    <span className="text-stone-605 break-words">{trackedOrder.deliveryAddress}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-semibold">Target Timing</span>
                    <span className="font-semibold text-stone-705 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3 text-primary-500" />
                      {trackedOrder.deliveryDate} @ {trackedOrder.preferredTime}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-semibold">Goods summary</span>
                    <p className="text-stone-700 font-semibold bg-stone-50 border rounded-lg p-2 mt-1 break-words leading-relaxed">
                      {trackedOrder.orderDetails}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No active orders searched placeholder */
          <div className="col-span-full rounded-2xl bg-white border border-stone-200 p-12 text-center text-stone-500 max-w-md mx-auto space-y-4 shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <Truck className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">No Current Active order Selected</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-450">
              Please submit a new delivery order request via the Checkout page or input an existing tracking number like #SH-XXXX to see its live progress.
            </p>
            <button
              onClick={() => setActiveTab('menu')}
              className="rounded-xl bg-primary-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-stone-850"
            >
              Order Breads & Pastries Now
            </button>
          </div>
        )}
      </section>

      {/* Interactive Demonstration Panel helper at bottom */}
      {orders.length > 0 && (
        <section className="rounded-2xl border-2 border-dashed border-stone-250 p-6 bg-stone-50/60 font-sans" id="demos-orders-list">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-amber-500 animate-spin" />
            Active Test Order Files (Click any to track instantly!)
          </h4>
          <div className="flex flex-wrap gap-2">
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setTrackedOrder(o);
                  setSearchTracking(o.trackingNumber);
                }}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold tracking-wider transition-all ${
                  trackedOrder?.id === o.id
                    ? 'border-primary-500 bg-white text-primary-700 shadow-sm font-bold'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-605'
                }`}
                id={`demo-order-btn-${o.id}`}
              >
                <span>{o.trackingNumber}</span>
                <span className="text-[10px] text-stone-400">({o.customerName}) ({o.status})</span>
              </button>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
