/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  X, 
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  Lock,
  Plus,
  Minus
} from 'lucide-react';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Ordering from './components/Ordering';
import Delivery from './components/Delivery';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Admin from './components/Admin';
import Footer from './components/Footer';

import { Product, CartItem, Order, Review, CustomInquiry, ContactMessage } from './types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = React.useState<string>('home');
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);

  // Core States (Linked with LocalStorage for durable cloud-like persistence)
  const [products, setProducts] = React.useState<Product[]>(() => {
    const saved = localStorage.getItem('sh_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && parsed.some((p: any) => p.price < 100)) {
          localStorage.removeItem('sh_products');
          localStorage.removeItem('sh_cart'); // clear stale cart if any
          return INITIAL_PRODUCTS;
        }
        return parsed;
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sh_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('sh_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = React.useState<Review[]>(() => {
    const saved = localStorage.getItem('sh_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [inquiries, setInquiries] = React.useState<CustomInquiry[]>(() => {
    const saved = localStorage.getItem('sh_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = React.useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('sh_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Default pre-populated completed order so tracking is instantly testable!
  const [orders, setOrders] = React.useState<Order[]>(() => {
    const saved = localStorage.getItem('sh_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && parsed.some((o: any) => o.totalAmount < 500)) {
          localStorage.removeItem('sh_orders');
        } else {
          return parsed;
        }
      } catch (e) {}
    }

    const initialOrder: Order = {
      id: 'SH-4420',
      trackingNumber: '#SH-4420',
      customerName: 'Wanjiku Kamau',
      phone: '0712889955',
      email: 'wanjiku@kamau.com',
      deliveryAddress: 'Cedar Arcade Suite 4B, Ngong Road, Nairobi',
      orderDetails: '1x Elegant Velvet Birthday Cake, 2x Classic Golden Croissant',
      items: [
        { productId: 'p1', name: 'Elegant Velvet Birthday Cake', quantity: 1, price: 4500 },
        { productId: 'p5', name: 'Classic Golden Croissant', quantity: 2, price: 350 }
      ],
      deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
      preferredTime: '10:00 AM - 12:00 PM',
      totalAmount: 5700.00,
      paymentMethod: 'M-pesa',
      status: 'baking', // starts in baking cycle for visual interest
      createdAt: new Date().toLocaleDateString()
    };
    return [initialOrder];
  });

  const [lastTrackingNumber, setLastTrackingNumber] = React.useState<string>('#SH-4420');

  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('sh_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  React.useEffect(() => {
    localStorage.setItem('sh_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  // Sync state modifications to LocalStorage elements
  React.useEffect(() => {
    localStorage.setItem('sh_products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('sh_cart', JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem('sh_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  React.useEffect(() => {
    localStorage.setItem('sh_reviews', JSON.stringify(reviews));
  }, [reviews]);

  React.useEffect(() => {
    localStorage.setItem('sh_orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    localStorage.setItem('sh_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  React.useEffect(() => {
    localStorage.setItem('sh_messages', JSON.stringify(messages));
  }, [messages]);

  // Core Actions
  const addToCart = (product: Product) => {
    // Find active stock constraints
    const matchingProd = products.find(p => p.id === product.id);
    if (!matchingProd || matchingProd.inventory <= 0) {
      alert(`We are incredibly sorry! "${product.name}" is completely sold out for today's deck-oven session.`);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= matchingProd.inventory) {
          alert(`Our early morning session only prepared ${matchingProd.inventory} pieces of "${product.name}". You consolidated all of them!`);
          return prev;
        }
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { id: product.id, product, quantity: 1 }];
    });
  };

  const removeFromCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter(item => item.product.id !== product.id);
      }
      return prev.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const submitReview = (newReview: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const formattedReview: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      message: newReview.message,
      date: 'Just now',
      verified: true
    };
    setReviews(prev => [formattedReview, ...prev]);
  };

  const submitInquiry = (inq: Omit<CustomInquiry, 'id' | 'status' | 'createdAt'>) => {
    const freshInq: CustomInquiry = {
      id: `inq-${Date.now()}`,
      name: inq.name,
      email: inq.email,
      phone: inq.phone,
      eventType: inq.eventType,
      eventDate: inq.eventDate,
      guestCount: inq.guestCount,
      details: inq.details,
      status: 'pending',
      createdAt: new Date().toLocaleDateString()
    };
    setInquiries(prev => [freshInq, ...prev]);
  };

  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const freshMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      createdAt: new Date().toLocaleDateString()
    };
    setMessages(prev => [freshMsg, ...prev]);
  };

  const submitOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'status'>): Order => {
    const numPart = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SH-${numPart}`;
    
    const freshOrder: Order = {
      ...orderData,
      id: orderId,
      trackingNumber: `#${orderId}`,
      status: 'received',
      createdAt: new Date().toLocaleDateString()
    };

    setOrders(prev => [freshOrder, ...prev]);

    // Deduct stock limits correspondingly
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        const cartItemMatch = cart.find(c => c.product.id === prod.id);
        if (cartItemMatch) {
          return {
            ...prod,
            inventory: Math.max(0, prod.inventory - cartItemMatch.quantity)
          };
        }
        return prod;
      });
    });

    return freshOrder;
  };

  // Administrative overrides
  const addProduct = (p: Omit<Product, 'id' | 'rating'>) => {
    const fresh: Product = {
      ...p,
      id: `p-${Date.now()}`,
      rating: 5.0
    };
    setProducts(prev => [...prev, fresh]);
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  // Quick helper to jump straight to order view from cart drawer
  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setActiveTab('ordering');
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900 selection:bg-primary-200 selection:text-primary-900" id="sweet-haven-shell">
      
      {/* Dynamic Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        wishlistCount={wishlist.length}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Pages Content with Layout transitions */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home 
            products={products} 
            reviews={reviews} 
            setActiveTab={setActiveTab} 
            addToCart={addToCart}
            cart={cart}
          />
        )}

        {activeTab === 'menu' && (
          <Products 
            products={products}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            setActiveTab={setActiveTab}
            submitInquiry={submitInquiry}
          />
        )}

        {activeTab === 'gallery' && <Gallery />}

        {activeTab === 'about' && <About />}

        {activeTab === 'ordering' && (
          <Ordering 
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            submitOrder={submitOrder}
            setActiveTab={setActiveTab}
            setLastTrackingNumber={setLastTrackingNumber}
          />
        )}

        {activeTab === 'delivery' && (
          <Delivery 
            orders={orders}
            lastTrackingNumber={lastTrackingNumber}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && <Contact submitContactMessage={submitContactMessage} />}

        {activeTab === 'reviews' && (
          <Reviews 
            reviews={reviews} 
            submitReview={submitReview}
          />
        )}

        {activeTab === 'admin' && (
          <Admin 
            products={products}
            orders={orders}
            inquiries={inquiries}
            messages={messages}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            updateOrderStatus={updateOrderStatus}
          />
        )}
      </main>

      {/* Persistent Global Footer bar */}
      <Footer setActiveTab={setActiveTab} />

      {/* sliding shopping cart overlay drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-stone-950/65"
            />

            {/* Cabinet body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
              id="global-cart-drawer"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b px-6 py-5">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-stone-100 p-2 text-stone-701">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">Your Baking Cart</h3>
                    <p className="text-[10px] text-stone-400 -mt-0.5">{cart.reduce((a, b) => a + b.quantity, 0)} Items consolidated</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-2 text-stone-600 hover:bg-stone-100 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items loop list */}
              <div className="flex-grow overflow-y-auto divide-y divide-stone-101 p-6" id="cart-drawer-items">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 items-start" id={`cart-item-${item.id}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-14 w-14 rounded-xl object-cover bg-stone-50 border"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-sans text-xs font-bold text-stone-850 line-clamp-1">{item.product.name}</h4>
                          <span className="font-sans text-xs font-black text-stone-900">KSh {(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-stone-400 capitalize">{item.product.category} {item.product.subCategory ? `• ${item.product.subCategory}` : ''}</p>
                        
                        {/* +/- Controller */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5 rounded-lg border bg-stone-50 p-0.5">
                            <button
                              onClick={() => removeFromCart(item.product)}
                              className="flex h-5 w-5 items-center justify-center rounded bg-white text-stone-700 shadow-xs hover:bg-stone-50"
                              id={`cart-minus-${item.product.id}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-sans text-xs font-semibold px-1 text-stone-800">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item.product)}
                              className="flex h-5 w-5 items-center justify-center rounded bg-stone-900 text-white shadow-xs hover:bg-stone-800"
                              id={`cart-plus-${item.product.id}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart({ ...item.product, price: 0 } as any)} // deletes
                            className="text-[10px] text-red-500 font-bold hover:underline"
                            title="Remove completely"
                            id={`cart-trash-${item.product.id}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-[50vh] space-y-4 text-stone-400">
                    <ShoppingBag className="h-10 w-10 text-stone-300" />
                    <div>
                      <p className="font-serif text-sm font-bold text-stone-700">Empty Shopping Cart</p>
                      <p className="text-[11px] leading-relaxed max-w-[200px] mx-auto mt-1">Ready to be stuffed with double-chocolate cookies and fresh sourdough!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout CTA footer block */}
              {cart.length > 0 && (
                <div className="border-t px-6 py-6 space-y-4 bg-stone-50 flex flex-col">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-stone-500 font-sans">
                      <span>Total Products Value</span>
                      <span className="font-semibold text-stone-700">KSh {cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-stone-900 border-t pt-2">
                      <span>Subtotal</span>
                      <span>KSh {cartSubtotal.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 leading-none">Vat taxes & logistics packaging calculated globally on checkout.</p>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full flex justify-center items-center gap-2 rounded-xl bg-orange-600/90 py-3.5 text-center font-sans text-sm font-bold text-white shadow-md hover:bg-orange-655 cursor-pointer"
                    id="drawer-checkout-btn"
                  >
                    Proceed to Delivery Checkout
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
