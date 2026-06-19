import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Calculator, 
  CreditCard, 
  PhoneCall, 
  Building2, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  FileText,
  Printer,
  ChevronRight,
  Info
} from 'lucide-react';
import { CartItem, Product, PaymentMethod, Order } from '../types';

interface OrderingProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  submitOrder: (order: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'status'>) => Order;
  setActiveTab: (tab: string) => void;
  setLastTrackingNumber: (trackingNum: string) => void;
}

export default function Ordering({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  submitOrder,
  setActiveTab,
  setLastTrackingNumber
}: OrderingProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '10:00 AM - 12:00 PM',
    additionalNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('M-pesa');
  const [mpesaNumber, setMpesaNumber] = React.useState('');
  const [paymentSimulating, setPaymentSimulating] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  
  // Completed Order receipt state
  const [completedOrder, setCompletedOrder] = React.useState<Order | null>(null);

  // Math equations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = cartSubtotal >= 4000 ? 0 : 500.00;
  const VAT = Number((cartSubtotal * 0.16).toFixed(2)); // standard 16% Kenyan VAT
  const cartTotal = cartSubtotal + deliveryFee + VAT;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setPaymentSimulating(true);

    // Simulate Payment delay (e.g. Mpesa screen push or Card validation)
    setTimeout(() => {
      setPaymentSimulating(false);
      setPaymentSuccess(true);
      
      // Map out summary line item details for search logic
      const orderSummaryStr = cart.map(item => `${item.quantity}x ${item.product.name}`).join(', ');

      const activeOrder = submitOrder({
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        deliveryAddress: formData.address,
        orderDetails: orderSummaryStr,
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        deliveryDate: formData.date || new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow default
        preferredTime: formData.time,
        totalAmount: cartTotal,
        paymentMethod: paymentMethod
      });

      setCompletedOrder(activeOrder);
      setLastTrackingNumber(activeOrder.trackingNumber);
    }, 2000);
  };

  const handleFinishAndTrack = () => {
    // Reset forms and view Tracker
    clearCart();
    setActiveTab('delivery');
  };

  const handlePrint = () => {
    window.print();
  };

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-sm max-w-lg mx-auto space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900">Your Shopping Basket is Empty</h2>
            <p className="font-sans text-xs text-stone-500">
              Select crusty artisan sourdough breads, golden flaky croissants, delicious gourmet pastries, or custom bakes from our catalog first!
            </p>
          </div>
          <button
            onClick={() => setActiveTab('menu')}
            className="rounded-xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700 transition"
            id="browse-menu-empty-cart"
          >
            Browse Breads & Pastries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      <AnimatePresence mode="wait">
        {!completedOrder ? (
          <motion.div
            key="checkout-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-8 lg:grid-cols-12"
            id="order-checkout-container"
          >
            {/* Left: Input details & methods (8 cols) */}
            <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-6">
              
              {/* Delivery info card */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs text-primary-700">1</span>
                  Delivery Information & Schedule
                </h2>
                <div className="h-px bg-stone-101" />

                <div className="grid gap-4 sm:grid-cols-2 font-sans text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Customer Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Wanjiku Kamau"
                      className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-500 focus:outline-none"
                      id="order-customer-name"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mobile Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 0712345678"
                      className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-500 focus:outline-none"
                      id="order-phone"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-700 mb-1">Email (For receipt notification)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="wanjiku.k@gmail.com"
                      className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-500 focus:outline-none"
                      id="order-email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-700 mb-1">Physical Delivery Address <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Apartment/Street/Estate, Nairobi Kenya"
                      className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-500 focus:outline-none"
                      id="order-address"
                    />
                  </div>

                  {/* Timing slots */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preferred Delivery Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]} // prevent past dates
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stone-250 p-2.5 focus:outline-none focus:border-primary-500 cursor-pointer text-stone-700"
                      id="order-delivery-date"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preferred Time Window <span className="text-red-500">*</span></label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stone-250 p-2.5 focus:outline-none focus:border-primary-500 cursor-pointer text-stone-700"
                      id="order-delivery-time"
                    >
                      <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM (Early Breakfast)</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Mid Morning)</option>
                      <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM (Afternoon Pastry)</option>
                      <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Teatime Rush)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Secure Payment section */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs text-primary-700">2</span>
                  Select Secure Payment Method
                </h2>
                <div className="h-px bg-stone-101" />

                {/* Grid selectors */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" id="payment-tabs">
                  {[
                    { id: 'M-pesa', label: 'M-pesa', icon: <PhoneCall className="h-4.5 w-4.5" /> },
                    { id: 'Credit/Debit', label: 'Credit Card', icon: <CreditCard className="h-4.5 w-4.5" /> },
                    { id: 'Bank Transfer', label: 'Bank Transfer', icon: <Building2 className="h-4.5 w-4.5" /> },
                    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: <Truck className="h-4.5 w-4.5" /> }
                  ].map((pay) => {
                    const isSelected = paymentMethod === pay.id;
                    return (
                      <button
                        key={pay.id}
                        type="button"
                        onClick={() => setPaymentMethod(pay.id as PaymentMethod)}
                        className={`rounded-xl p-3 border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/25'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-600'
                        }`}
                        id={`pay-tab-${pay.id}`}
                      >
                        {pay.icon}
                        <span className="font-sans text-[11px] font-bold leading-none">{pay.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-form fields based on Payment Method */}
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/60 font-sans text-xs">
                  {paymentMethod === 'M-pesa' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-stone-600 mb-1">
                        <Info className="h-4 w-4 text-primary-500" />
                        <span className="font-bold">Instant M-pesa Push Notification</span>
                      </div>
                      <p className="text-stone-400">Enter your M-pesa phone number. We will trigger an STK PIN prompt directly to your phone screen upon checkout.</p>
                      <div className="max-w-xs mt-2">
                        <label className="block font-semibold text-stone-700 mb-1">M-pesa Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={mpesaNumber || formData.phone}
                          onChange={(e) => setMpesaNumber(e.target.value)}
                          placeholder="e.g. +254 712 345678"
                          className="w-full rounded-lg border border-stone-250 p-2.5 focus:border-primary-500 focus:bg-white focus:outline-none"
                          id="mpesa-number-input"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Credit/Debit' && (
                    <div className="space-y-3">
                      <p className="text-stone-500 font-semibold flex items-center gap-1"><CreditCard className="h-4 w-4 text-primary-600" /> Secure 256-Bit SSL Credit Card Checkout</p>
                      <div className="grid gap-3 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Card Number</label>
                          <input type="text" placeholder="×××× ×××× ×××× 1234" required className="w-full rounded-lg border p-2.5 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Expiry Date</label>
                          <input type="text" placeholder="MM / YY" required className="w-full rounded-lg border p-2.5 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">CVV Code</label>
                          <input type="text" placeholder="123" required className="w-full rounded-lg border p-2.5 focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Bank Transfer' && (
                    <div className="space-y-1.5 leading-relaxed text-stone-600">
                      <p className="font-bold">Artisanal Breads & Pastries Bank Coordinates</p>
                      <p className="text-stone-500">Please execute an Electronic Funds Transfer (EFT) or RTGS transfer to the account coordinates below. Please write your buyer name as the transfer reference.</p>
                      <div className="bg-white border rounded-lg p-3 font-mono space-y-1 text-stone-800">
                        <p>Bank Name: <span className="font-bold">Equity Bank Kenya</span></p>
                        <p>Account Holder: <span className="font-bold">Artisanal Breads & Pastries Ltd</span></p>
                        <p>Account Number: <span className="font-bold">1200179930462 (Headoffice Main)</span></p>
                        <p>Swift Routing Code: <span className="font-bold">EQTXKENA</span></p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Cash on Delivery' && (
                    <div className="flex gap-2.5 items-start text-stone-650 font-sans">
                      <Truck className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Cash on Delivery Terms</p>
                        <p className="text-stone-400">Please prepare exact cash sum of <span className="font-bold text-stone-900">KSh {cartTotal.toLocaleString()}</span> or have your phone standby for direct M-pesa billing on physical arrival of our delivery driver.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submitting Buttons */}
              <button
                type="submit"
                disabled={paymentSimulating}
                className="w-full flex justify-center items-center gap-2 rounded-2xl bg-stone-900 py-4 text-center font-sans text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-stone-850 cursor-pointer disabled:opacity-50"
                id="submit-order-checkout"
              >
                {paymentSimulating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Simulating Secured {paymentMethod} API Connection...
                  </>
                ) : (
                  <>
                    Verify & Complete Order (KSh {cartTotal.toLocaleString()})
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Right: Cart Summary Review (4 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-5">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Cart Summary Review
                </h3>
                <div className="h-px bg-stone-101" />

                {/* Items loop */}
                <div className="divide-y divide-stone-101 max-h-80 overflow-y-auto pr-1" id="checkout-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 py-3 flex-wrap">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-12 w-12 rounded-lg object-cover bg-stone-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 space-y-0.5">
                        <h4 className="font-sans text-xs font-bold text-stone-850 line-clamp-1">{item.product.name}</h4>
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span>Qty: {item.quantity}</span>
                          <span>KSh {(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-stone-200" />

                {/* Calculations details */}
                <div className="space-y-2.5 font-sans text-xs">
                  <div className="flex items-center justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>KSh {cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-500">
                    <span>VAT Standard (16%)</span>
                    <span>KSh {VAT.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-500">
                    <span>Fresh Delivery logistics</span>
                    <span>{deliveryFee === 0 ? 'FREE (over KSh 4,000)' : `KSh ${deliveryFee.toLocaleString()}`}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[10px] text-primary-600 font-medium">Add KSh {(4000 - cartSubtotal).toLocaleString()} to trigger free delivery!</p>
                  )}
                  <div className="h-px bg-stone-100 pt-1" />
                  <div className="flex items-center justify-between text-base font-black text-stone-900">
                    <span>Grand Total</span>
                    <span>KSh {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-orange-50 p-3 flex items-start gap-2.5 font-sans text-xs text-orange-850">
                  <Info className="h-4.5 w-4.5 text-primary-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    By submitting your order information, you acknowledge that our staff compiles with certified HACCP sanitization procedures before logistics.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Invoice / Receipt display screen */
          <motion.div
            key="success-receipt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto space-y-6"
            id="completed-invoice-paper"
          >
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xl space-y-6 relative overflow-hidden" id="receipt-box">
              {/* Confirms Header background */}
              <div className="absolute top-0 inset-x-0 h-2 bg-primary-500" />
              
              <div className="text-center space-y-2 pb-6 border-b border-stone-150">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-stone-950">Payment Success & Invoice Generated</h1>
                <p className="font-sans text-xs text-stone-500">Thank you for ordering with Artisanal Breads & Pastries! Here is your official copy.</p>
              </div>

              {/* Invoice Meta Grid */}
              <div className="grid gap-4 sm:grid-cols-2 font-mono text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border">
                <div className="space-y-1">
                  <p>INVOICE NO: <span className="font-bold text-stone-905">{completedOrder.id}</span></p>
                  <p>TRACKING NO: <span className="font-bold text-primary-700">{completedOrder.trackingNumber}</span></p>
                  <p>DATE ISSUED: <span>{completedOrder.createdAt}</span></p>
                </div>
                <div className="space-y-1 sm:text-right">
                  <p>PAYMENT METHOD: <span>{completedOrder.paymentMethod}</span></p>
                  <p>STATUS: <span className="font-bold uppercase text-emerald-600">SECURED</span></p>
                  <p>DELIVERY: <span>{completedOrder.deliveryDate} ({completedOrder.preferredTime})</span></p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="font-sans text-xs space-y-1.5">
                <h4 className="font-bold text-stone-850">DELIVERY TO:</h4>
                <p className="text-stone-600">{completedOrder.customerName} ({completedOrder.phone})</p>
                <p className="text-stone-500">{completedOrder.deliveryAddress}</p>
              </div>

              {/* Billing table */}
              <div className="font-mono text-xs">
                <div className="flex justify-between font-bold border-b pb-2 mb-2 text-stone-800">
                  <span>ITEM DESCRIPTION</span>
                  <span>TOTAL SUM</span>
                </div>
                
                <div className="divide-y divide-stone-100 mb-4 text-stone-600">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <span>{item.quantity}x {item.product.name} @ KSh {item.product.price.toLocaleString()}</span>
                      <span>KSh {(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2 space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT GOK Tax (16%)</span>
                    <span>KSh {VAT.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics Packaging Fee</span>
                    <span>KSh {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-stone-900 border-t pt-2 mt-1">
                    <span>GRAND TOTAL PAID</span>
                    <span>KSh {completedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside invoice */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-stone-150 justify-end" id="completed-receipt-actions">
                <button
                  onClick={handlePrint}
                  className="rounded-xl border border-stone-250 bg-stone-50 px-5 py-3 text-xs font-bold text-stone-700 hover:bg-stone-100 flex items-center gap-1.5"
                  id="print-invoice-btn"
                >
                  <Printer className="h-4 w-4" />
                  Print/PDF Receipt
                </button>
                
                <button
                  onClick={handleFinishAndTrack}
                  className="rounded-xl bg-primary-600 px-6 py-3 text-xs font-bold text-white hover:bg-primary-700 flex items-center gap-1.5"
                  id="track-order-btn-finished"
                >
                  Track Delivery State
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Email notice note */}
            <div className="rounded-xl bg-blue-50 border border-blue-150 p-4 text-center text-xs font-sans text-blue-800 flex gap-2 items-center justify-center">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white font-bold">@</span>
              <p>Email Invoice Confirmation has been dispatched to <span className="font-bold">{completedOrder.email || "customer@website-user.com"}</span>.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
