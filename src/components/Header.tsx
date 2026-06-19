import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Settings, Heart, Croissant, Sun, Moon } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  wishlistCount: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  wishlistCount,
  theme,
  toggleTheme
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About & Safety' },
    { id: 'delivery', label: 'Track Order' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Brand / Human Labels */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex cursor-pointer items-center gap-2.5"
          id="header-brand"
        >
          <div className="rounded-full bg-primary-500 p-2 text-white transition-transform duration-300 hover:scale-105 shadow-sm">
            <Croissant className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-black tracking-tight text-primary-900">
              Artisanal
            </span>
            <span className="-mt-1 font-display text-[9px] font-bold tracking-widest text-primary-500 uppercase">
              Breads & Pastries
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-primary-500' : 'text-primary-900/70 hover:text-primary-500'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side utility icons */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggler Button */}
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary-900 transition-all hover:bg-primary-100"
            id="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-stone-800 fill-stone-800" />
            )}
          </button>

          {/* Wishlist Icon */}
          <button 
            onClick={() => setActiveTab('menu')} 
            className="group relative hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary-900 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            title="Breads & Pastries list"
            id="header-wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <motion.button
            key={totalCartItems}
            animate={totalCartItems > 0 ? { scale: [1, 1.2, 1] } : {}}
            id="header-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary-900 text-white shadow-md transition-all hover:bg-primary-800 hover:shadow-lg"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-primary-900 animate-pulse">
                {totalCartItems}
              </span>
            )}
          </motion.button>

          {/* Admin Switch */}
          <button
            id="nav-admin-dashboard"
            onClick={() => setActiveTab('admin')}
            className={`hidden md:flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'admin'
                ? 'border-primary-500 bg-primary-100 text-primary-900 shadow-sm'
                : 'border-primary-200 bg-white text-primary-900/80 hover:border-primary-400 hover:bg-primary-50'
            }`}
          >
            <Settings className="h-4 w-4" />
            Dashboard
          </button>

          {/* Mobile hamburger menu */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 text-primary-900 lg:hidden hover:bg-primary-50"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-stone-950/60 lg:hidden"
            />

            {/* Slider */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-stone-150 pb-5">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary-100 p-2 text-primary-600">
                    <Croissant className="h-5 w-5" />
                  </div>
                  <span className="font-serif text-lg font-bold text-stone-900">
                    Artisanal Breads & Pastries
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 text-stone-600 hover:bg-stone-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {navigationItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-left font-sans text-base font-semibold transition-all ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {item.label}
                      <span className={`block h-1.5 w-1.5 rounded-full ${isActive ? 'bg-primary-500' : 'bg-transparent'}`} />
                    </button>
                  );
                })}

                <div className="mt-8 border-t border-stone-200/60 pt-6">
                  {/* Mobile Theme Switcher */}
                  <button
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="flex w-full mb-3 items-center justify-between rounded-xl px-4 py-3 bg-stone-50 border border-stone-205 hover:bg-stone-100/80 text-stone-800 font-sans text-sm font-semibold transition-all"
                    id="mobile-theme-toggle"
                  >
                    <span className="flex items-center gap-2">
                      {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500 fill-amber-500" /> : <Moon className="h-4 w-4 text-stone-600 fill-stone-600" />}
                      <span>Appearance</span>
                    </span>
                    <span className="text-xs uppercase font-bold text-stone-400">
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider transition-all ${
                      activeTab === 'admin'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'border border-stone-250 bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    Admin Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
