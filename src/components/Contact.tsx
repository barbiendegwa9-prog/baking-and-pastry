import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Compass,
  CheckCircle,
  AlertTriangle,
  Layers,
  Milestone
} from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactProps {
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt'>) => void;
}

export default function Contact({ submitContactMessage }: ContactProps) {
  // Form State
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('Order Inquiry');
  const [message, setMessage] = React.useState('');
  const [formSuccess, setFormSuccess] = React.useState(false);

  // Map Simulation state
  const [mapLayer, setMapLayer] = React.useState<'standard' | 'satellite'>('standard');
  const [selectedPin, setSelectedPin] = React.useState<'bakery' | 'parking' | 'landmark'>('bakery');
  const [userLocationInput, setUserLocationInput] = React.useState('');
  const [calculatedDistance, setCalculatedDistance] = React.useState<number | null>(null);

  const contactInfos = [
    {
      id: 'phone',
      icon: <Phone className="h-5 w-5 text-primary-600" />,
      title: 'Telephone Hotline',
      desc: '+254 (0) 702 818166',
      sub: 'Main bakery ordering desk'
    },
    {
      id: 'whatsapp',
      icon: <MessageCircle className="h-5 w-5 text-emerald-600" />,
      title: 'WhatsApp Chat Support',
      desc: '+254 (0) 712 990022',
      sub: 'Instant answers for custom orders'
    },
    {
      id: 'email',
      icon: <Mail className="h-5 w-5 text-primary-600" />,
      title: 'Email Communications',
      desc: 'hello@sweethavenbakery.co.ke',
      sub: 'Corporate events and bookkeeping'
    },
    {
      id: 'location',
      icon: <MapPin className="h-5 w-5 text-primary-600" />,
      title: 'Physical Address',
      desc: 'Ground Floor, Cedar Arcade',
      sub: 'Ngong Road, Nairobi, Kenya'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '06:30 AM - 08:30 PM', desc: 'Deck baking warm cycles run hourly' },
    { day: 'Saturday', hours: '07:00 AM - 09:00 PM', desc: 'Perfect for weekend gathering pastries' },
    { day: 'Sunday & Holidays', hours: '08:00 AM - 05:00 PM', desc: 'Warm whole sourdough loaves by 9 AM' }
  ];

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitContactMessage({
      name,
      email,
      subject,
      message
    });

    setFormSuccess(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setFormSuccess(false);
    }, 4550);
  };

  const handleCalculateDistance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLocationInput.trim()) return;
    // Simple dynamic calculation simulation for demonstration
    const distanceSim = Math.floor(Math.random() * 12) + 1;
    setCalculatedDistance(distanceSim);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-display text-xs font-semibold tracking-widest text-primary-600 uppercase">
          Reach Our Bakers
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-primary-900 sm:text-4xl">
          Get in Touch & Visit Our Ovens
        </h1>
        <p className="font-sans text-primary-900/75 text-sm">
          Have an elaborate wedding planned, bulk office orders, or queries about our HACCP sanitary food guidelines? Drop us a prompt message.
        </p>
        <div className="mx-auto h-1 w-12 bg-primary-500 rounded-full" />
      </section>

      {/* Info & Form double-block */}
      <section className="grid gap-8 lg:grid-cols-12" id="contact-form-row">
        
        {/* Left: contact details & hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-primary-200 bg-white p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-900">
              Contact Information
            </h3>
            
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1" id="contact-info-list font-sans text-xs">
              {contactInfos.map((info) => (
                <div key={info.id} className="flex gap-4 items-start">
                  <div className="rounded-xl bg-primary-50 p-2.5 border border-primary-200 shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900 leading-tight text-xs">{info.title}</h4>
                    <span className="font-mono text-sm font-semibold text-primary-900/80 block mt-0.5">{info.desc}</span>
                    <span className="text-[10px] text-primary-900/45">{info.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-primary-200 bg-white p-6 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-primary-900 flex items-center gap-1.5">
              <Clock className="h-5 w-5 text-primary-600" />
              Business & Baking Hours
            </h3>
            <div className="h-px bg-primary-100" />

            <div className="space-y-4 font-sans text-xs">
              {businessHours.map((hours, i) => (
                <div key={i} className="flex justify-between items-start gap-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-primary-900">{hours.day}</span>
                    <span className="block text-[10px] text-primary-900/60 leading-none">{hours.desc}</span>
                  </div>
                  <span className="font-mono font-bold rounded-lg bg-primary-50 border border-primary-200 px-2.5 py-1 text-primary-800 select-none">
                    {hours.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Message Form (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-primary-200 bg-white p-6 shadow-sm space-y-5" id="message-form-container">
          <h3 className="font-serif text-lg font-bold text-primary-900">
            Send Us an Instant Message
          </h3>

          <AnimatePresence mode="wait">
            {formSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-xl bg-emerald-50 border border-emerald-150 p-6 text-center space-y-3"
                id="message-form-success"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-901">Message Sent Successfully!</h4>
                <p className="font-sans text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                  Excellent! We have logged your feedback into our local active files. Our booking supervisor or accounting secretary will follow up with you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactFormSubmit} className="space-y-4 font-sans text-xs" id="contact-message-form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-semibold text-primary-900 mb-1">Your Full Name <span className="text-red-500">*</span></label>
                    <input
                       type="text"
                       required
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="e.g. Amina Omondi"
                       className="w-full rounded-lg border border-primary-200 bg-white p-2.5 focus:border-primary-500 focus:outline-none placeholder:text-primary-950/40 text-primary-900"
                       id="cnt-name"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-primary-900 mb-1">Your Email Address <span className="text-red-500">*</span></label>
                    <input
                       type="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="amina@company.com"
                       className="w-full rounded-lg border border-primary-200 bg-white p-2.5 focus:border-primary-500 focus:outline-none placeholder:text-primary-950/40 text-primary-900"
                       id="cnt-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-primary-900 mb-1">Subject Heading</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-lg border border-primary-200 bg-white p-2.5 focus:outline-none focus:border-primary-500 cursor-pointer text-primary-900"
                    id="cnt-subject"
                  >
                    <option value="Order Inquiry">Order Inquiry (Status, alterations, timing)</option>
                    <option value="Pastry Customization Request">Custom Pastry & Catering Design (Sizing, boxes)</option>
                    <option value="Event Catering Enquiry">Event Catering (Corporate orders, weddings)</option>
                    <option value="Food Hygiene Protocols">Food Hygiene & Purification Standards (HACCP)</option>
                    <option value="Wholesale & Bread Account">Wholesale Account (Local cafe supply)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-primary-900 mb-1">Your Message <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write detailed specifications here..."
                    className="w-full rounded-lg border border-primary-200 bg-white p-2.5 focus:border-primary-500 focus:outline-none placeholder:text-primary-900/40 text-primary-900"
                    id="cnt-message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary-900 py-3.5 text-center font-bold text-stone-900 hover:bg-stone-800 hover:text-white flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                  id="cnt-submit-btn"
                >
                  <Send className="h-4.5 w-4.5" />
                  Dispatch Secure Message
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Google Maps Integration (Detailed Simulation) */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6" id="maps-integration">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5">
              <Compass className="h-5 w-5 text-primary-600" />
              Interactive Location Map
            </h3>
            <p className="font-sans text-xs text-stone-400 mt-1">
              Simulating actual Google Maps satellite grids, markers, coordinates, and transport directions.
            </p>
          </div>

          {/* Toggle standard / satellite */}
          <div className="flex items-center gap-2 rounded-xl bg-stone-50 border p-1" id="map-layers-selector">
            <button
              onClick={() => setMapLayer('standard')}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-bold flex items-center gap-1 transition-all ${
                mapLayer === 'standard' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              Standard Map
            </button>
            <button
              onClick={() => setMapLayer('satellite')}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-bold flex items-center gap-1 transition-all ${
                mapLayer === 'satellite' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Satellite Layer
            </button>
          </div>
        </div>

        {/* Outer map frame */}
        <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden border bg-stone-100 flex items-center justify-center" id="map-canvas">
          
          {/* Simulated Satellite vs standard render patterns */}
          {mapLayer === 'standard' ? (
            <div className="absolute inset-0 bg-[#e5e9f0]/90 font-mono text-[9px] p-4 flex flex-col justify-between">
              {/* Roads drawing simulation */}
              <div className="absolute inset-x-0 top-1/3 h-10 bg-white border-t border-b border-stone-300 transform -rotate-2 flex items-center justify-center font-bold text-stone-400 tracking-widest select-none uppercase">
                NGONG ROAD (HIGHWAY A104)
              </div>
              <div className="absolute inset-y-0 left-1/3 w-8 bg-white border-l border-r border-stone-300 transform rotate-12 flex items-center justify-center font-bold text-stone-400 tracking-widest select-none uppercase">
                CEDAR AVENUE
              </div>

              {/* Parkings visual */}
              <div className="absolute bottom-4 right-1/4 rounded bg-emerald-50 border border-emerald-300 p-3 flex flex-col items-center">
                <span className="font-bold text-emerald-700">CEDAR ARCADE PARK</span>
                <span className="text-[8px] text-stone-400">Green sanctuary</span>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-[#2e3440]/80 font-mono text-[9px] p-4 flex flex-col justify-between" style={{ backgroundImage: 'radial-gradient(ellipse at center, #3b4252 0%, #2e3440 100%)' }}>
              <div className="absolute inset-0 opacity-20 bg-grid-pattern pointer-events-none" />
              <div className="absolute inset-x-0 top-1/3 h-10 bg-stone-850/90 border-t border-b border-stone-750 transform -rotate-2 flex items-center justify-center text-stone-400 font-bold select-none uppercase">
                [Ngong Road Corridor - Satellite view]
              </div>
            </div>
          )}

          {/* Interactive pinned indicators */}
          {selectedPin === 'bakery' && (
            <motion.div
              initial={{ scale: 0.9, y: -5 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center cursor-pointer pointer-events-auto"
            >
              <div className="rounded-2xl bg-stone-900 border border-primary-400 px-3 py-1.5 shadow-lg text-white font-sans text-xs flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold">Artisanal Breads HQ</span>
                <span className="text-[10px] text-stone-300">(Cedar Arcade)</span>
              </div>
              <div className="h-6 w-0.5 bg-stone-900" />
              <MapPin className="h-8 w-8 text-rose-600 fill-rose-100 -mt-2.5" />
            </motion.div>
          )}

          {/* Zoom controls / Legend overlay */}
          <div className="absolute bottom-4 left-4 z-10 rounded-xl bg-white/90 p-3 shadow-md backdrop-blur-sm space-y-1 text-xs font-sans text-stone-800">
            <p className="font-bold">📍 Map Legends Selected:</p>
            <div className="flex flex-col gap-1.5 mt-2">
              <button 
                onClick={() => setSelectedPin('bakery')}
                className={`rounded px-2.5 py-1 text-left text-[11px] font-semibold flex items-center gap-1.5 ${selectedPin === 'bakery' ? 'bg-primary-50 text-primary-700' : 'text-stone-500 hover:text-stone-800'}`}
              >
                <span>🏢 Artisanal Breads & Pastries</span>
              </button>
            </div>
          </div>

          {/* Distance calculator form overlay widget */}
          <div className="absolute top-4 right-4 z-10 rounded-xl bg-white/95 border border-primary-200 p-4 shadow-lg backdrop-blur-md max-w-xs font-sans text-xs">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5"><Milestone className="h-4.5 w-4.5 text-primary-600" /> Travel Distance Finder</h4>
            <p className="text-primary-900/60 text-[10px] mt-1 leading-relaxed">Calculate travel minutes from your Nairobi spot directly to our bakery.</p>
            
            <form onSubmit={handleCalculateDistance} className="flex gap-1.5 mt-3">
              <input
                type="text"
                required
                placeholder="e.g. Westlands / Kilimani"
                value={userLocationInput}
                onChange={(e) => setUserLocationInput(e.target.value)}
                className="flex-1 rounded border px-2 py-1 text-xs focus:outline-none"
              />
              <button type="submit" className="rounded bg-stone-900 px-3 text-white font-bold hover:bg-stone-800 transition text-[10px] uppercase">
                Find
              </button>
            </form>

            <AnimatePresence>
              {calculatedDistance !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-stone-50 border rounded-lg p-2 font-semibold text-stone-701"
                >
                  🚙 Estimated distance: <span className="font-mono text-primary-700">{calculatedDistance} Km</span>
                  <p className="font-sans text-[10px] font-normal text-stone-400 mt-0.5">Approx. {calculatedDistance * 4} mins delivery courier cycle</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}
