import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Check, 
  FileText, 
  Activity, 
  FileCheck,
  Percent,
  Search,
  DollarSign,
  Download,
  AlertCircle,
  FolderSync
} from 'lucide-react';
import { Product, Order, CustomInquiry, ContactMessage } from '../types';

interface AdminProps {
  products: Product[];
  orders: Order[];
  inquiries: CustomInquiry[];
  messages: ContactMessage[];
  addProduct: (product: Omit<Product, 'id' | 'rating'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export default function Admin({
  products,
  orders,
  inquiries,
  messages,
  addProduct,
  updateProduct,
  deleteProduct,
  updateOrderStatus
}: AdminProps) {
  const [activeSubTab, setActiveSubTab] = React.useState<'products' | 'orders' | 'inquiries'>('products');

  // New product form states
  const [newName, setNewName] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');
  const [newCategory, setNewCategory] = React.useState<'Cakes' | 'Pastries' | 'Breads' | 'Desserts'>('Cakes');
  const [newPrice, setNewPrice] = React.useState(500.00);
  const [newStock, setNewStock] = React.useState(20);
  const [newSub, setNewSub] = React.useState('');
  const [productSuccess, setProductSuccess] = React.useState(false);

  // Search details
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Invoice viewing state
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = React.useState<Order | null>(null);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDesc.trim()) return;

    // Use beautiful relevant food photography placeholder based on category
    let categoryImg = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
    if (newCategory === 'Pastries') {
      categoryImg = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80';
    } else if (newCategory === 'Breads') {
      categoryImg = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80';
    } else if (newCategory === 'Desserts') {
      categoryImg = 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80';
    }

    addProduct({
      name: newName,
      description: newDesc,
      category: newCategory,
      subCategory: newSub || undefined,
      price: Number(newPrice),
      image: categoryImg,
      bestSeller: false,
      inventory: Number(newStock)
    });

    setProductSuccess(true);
    setNewName('');
    setNewDesc('');
    setNewStock(20);
    setNewPrice(5.00);
    setNewSub('');

    setTimeout(() => {
      setProductSuccess(false);
    }, 2500);
  };

  const handleStockUpdate = (p: Product, newInv: number) => {
    updateProduct({
      ...p,
      inventory: Math.max(0, newInv)
    });
  };

  const handlePriceUpdate = (p: Product, newPriceVal: number) => {
    updateProduct({
      ...p,
      price: Math.max(0.1, newPriceVal)
    });
  };

  // Filter lists
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10" id="admin-root">
      
      {/* Admin header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary-600">Administrative Portal</span>
          <h1 className="font-serif text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Bakery Control Board Dashboard 
          </h1>
          <p className="font-sans text-stone-450 text-xs mt-0.5">Manage live pastry catalogs, logistics states metadata, and customer custom order requests securely.</p>
        </div>

        {/* Dynamic Telemetry metric */}
        <div className="flex gap-4 items-center">
          <div className="rounded-xl border bg-stone-50 p-3 flex gap-2 items-center text-xs font-sans">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <div className="space-y-0.5 leading-none">
              <span className="block font-bold text-stone-850">{orders.length} Active Orders</span>
              <span className="text-[10px] text-stone-400">Inventory levels functional</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admin sub-tabs */}
      <section className="flex flex-wrap gap-2 border-b border-stone-200 pb-3" id="admin-subtabs">
        {[
          { id: 'products', label: 'Product & Stock Management', icon: <Package className="h-4.5 w-4.5" /> },
          { id: 'orders', label: 'Order Supervisor & Invoices', icon: <ShoppingBag className="h-4.5 w-4.5" /> },
          { id: 'inquiries', label: 'Event Booking Requests', icon: <MessageSquare className="h-4.5 w-4.5" /> }
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-stone-50 text-stone-605 border hover:bg-stone-100'
              }`}
              id={`adm-subtab-${tab.id}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </section>

      {/* Primary Panels displaying active states */}
      <AnimatePresence mode="wait">
        {activeSubTab === 'products' && (
          <motion.div
            key="adm-products"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-8 lg:grid-cols-12"
          >
            {/* Left pricing modifier grid (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap gap-4 items-center justify-between border-b pb-4">
                <h3 className="font-serif text-lg font-bold text-stone-900">Live Catalog Pricing & Stock Levels</h3>
                
                {/* Internal finder */}
                <div className="relative max-w-xs w-full">
                  <span className="absolute inset-y-0 left-2.5 flex items-center text-stone-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search cakes/breads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:border-stone-500"
                    id="search-admin-catalog"
                  />
                </div>
              </div>

              {/* Modify matrix */}
              <div className="overflow-x-auto" id="admin-product-table">
                <table className="w-full text-left font-sans text-xs border-collapse divide-y divide-stone-100">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-stone-400 h-10">
                      <th>Pastry Item Info</th>
                      <th>Category</th>
                      <th className="w-24">Price (KSh)</th>
                      <th className="w-24">In Stock Count</th>
                      <th className="w-16 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="h-14 hover:bg-stone-50">
                        <td>
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="h-9 w-9 rounded object-cover bg-stone-100 shrink-0" referrerPolicy="no-referrer" />
                            <div>
                              <span className="font-bold text-stone-900 block leading-tight">{p.name}</span>
                              <span className="text-[10px] text-stone-400 font-mono tracking-wider">SKU: {p.id.toUpperCase()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="font-semibold text-stone-550">{p.category}</td>
                        
                        {/* Direct price changer input field */}
                        <td>
                          <input
                            type="number"
                            step="0.1"
                            value={p.price}
                            onChange={(e) => handlePriceUpdate(p, Number(e.target.value))}
                            className="w-16 rounded border bg-stone-50 p-1 font-mono font-bold focus:bg-white text-stone-850 focus:outline-none"
                            id={`adm-edit-price-${p.id}`}
                          />
                        </td>
                        
                        {/* Direct stock changer input field */}
                        <td>
                          <input
                            type="number"
                            value={p.inventory}
                            onChange={(e) => handleStockUpdate(p, Number(e.target.value))}
                            className="w-16 rounded border bg-stone-50 p-1 font-mono font-bold focus:bg-white text-stone-850 focus:outline-none"
                            id={`adm-edit-stock-${p.id}`}
                          />
                        </td>

                        <td className="text-center">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="rounded p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete item"
                            id={`adm-del-prod-${p.id}`}
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Add new active product (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4 h-fit">
              <h3 className="font-serif text-lg font-bold text-stone-900">Add New Baked Goods</h3>
              <div className="h-px bg-stone-101" />

              {productSuccess ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-150 p-4 text-center space-y-2 font-sans text-xs">
                  <span className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto font-bold">✓</span>
                  <p className="font-bold">Goods Created Successfully!</p>
                  <p className="text-stone-400">Added directly to catalog. Visual placeholder mapped automatically.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateProduct} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Item Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Vanilla Bean Glazed Bun"
                      className="w-full rounded-lg border p-2.5 focus:border-stone-500 focus:outline-none"
                      id="adm-new-name"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Baking Category <span className="text-red-500">*</span></label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full rounded-lg border p-2.5 focus:outline-none cursor-pointer text-stone-700"
                      id="adm-new-category"
                    >
                      <option value="Cakes">Cakes (Anniversary, Custom)</option>
                      <option value="Pastries">Pastries (Donuts, Croissants)</option>
                      <option value="Breads">Breads (Sourdough, Artisan)</option>
                      <option value="Desserts">Desserts (Cookies, Muffins)</option>
                    </select>
                  </div>

                  <div className="grid gap-3 grid-cols-2">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Price (KSh) <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        step="1"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full rounded-lg border p-2.5 focus:outline-none"
                        id="adm-new-price"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Stock Count <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        required
                        value={newStock}
                        onChange={(e) => setNewStock(Number(e.target.value))}
                        className="w-full rounded-lg border p-2.5 focus:outline-none"
                        id="adm-new-stock"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Baked Sub-Category label</label>
                    <input
                      type="text"
                      value={newSub}
                      onChange={(e) => setNewSub(e.target.value)}
                      placeholder="e.g. croissant, birthday cakes, custom"
                      className="w-full rounded-lg border p-2.5 focus:outline-none"
                      id="adm-new-sub"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Detailed Description <span className="text-red-500">*</span></label>
                    <textarea
                      rows={3}
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Write ingredient lists, baking parameters, or frosting texture profiles..."
                      className="w-full rounded-lg border p-2.5 focus:outline-none placeholder:text-stone-400"
                      id="adm-new-desc"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-stone-900 py-3 text-center font-bold text-white hover:bg-stone-800 transition cursor-pointer"
                    id="adm-add-btn-confirm"
                  >
                    Add to Shop Catalog
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}

        {/* Order Supervisor sub-tab */}
        {activeSubTab === 'orders' && (
          <motion.div
            key="adm-orders"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
            id="adm-orders-panel"
          >
            {/* Orders summary table listing */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">Logistics Tracking & Order Dispatch</h3>
              <p className="font-sans text-xs text-stone-400">Change step states here to immediately alter trackers on the Delivery page!</p>

              <div className="overflow-x-auto" id="admin-orders-table">
                <table className="w-full text-left font-sans text-xs border-collapse divide-y divide-stone-100">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-stone-400 h-10">
                      <th>Tracking Number</th>
                      <th>Recipient</th>
                      <th>Delivery Target</th>
                      <th>Order Value</th>
                      <th className="w-48">Change Live Logistics State</th>
                      <th className="text-center w-28">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="h-14 hover:bg-stone-50">
                        <td className="font-mono font-bold text-primary-750 uppercase tracking-widest">{order.trackingNumber}</td>
                        <td>
                          <div className="leading-tight">
                            <span className="font-bold text-stone-900 block">{order.customerName}</span>
                            <span className="text-[10px] text-stone-400 font-mono">{order.phone}</span>
                          </div>
                        </td>
                        <td>
                          <div className="leading-tight max-w-[200px] truncate">
                            <span className="font-medium text-stone-605 block truncate">{order.deliveryAddress}</span>
                            <span className="text-[10px] text-stone-400 font-semibold uppercase">{order.deliveryDate} @ {order.preferredTime}</span>
                          </div>
                        </td>
                        <td className="font-bold text-stone-900 font-mono tracking-tight">KSh {order.totalAmount.toLocaleString()}</td>
                        
                        {/* Selector targeting state tracker */}
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="rounded-lg border bg-stone-50 p-2 text-xs font-bold text-stone-701 opacity-90 cursor-pointer outline-none focus:border-stone-500"
                            id={`status-dropdown-${order.id}`}
                          >
                            <option value="received">Order Received</option>
                            <option value="baking">Baking Cycle active</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Successfully Delivered</option>
                          </select>
                        </td>

                        <td className="text-center">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="hover:scale-102 flex items-center justify-center gap-1 mx-auto rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 font-bold hover:bg-stone-100"
                            id={`btn-view-invoice-${order.id}`}
                          >
                            <FileText className="h-3.5 w-3.5 text-stone-600" />
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}

                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-405 font-medium">No customer orders have been completed yet. Submit a test checkout to populate files.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Invoice Overlay modal */}
            <AnimatePresence>
              {selectedInvoiceOrder && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedInvoiceOrder(null)}
                    className="fixed inset-0 z-50 bg-stone-950/60"
                  />

                  {/* Modal invoice */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="fixed inset-x-4 top-10 md:top-20 z-50 mx-auto max-w-xl overflow-y-auto max-h-[85vh] rounded-2xl bg-white shadow-2xl p-6 space-y-6"
                    id="invoice-viewer-modal"
                  >
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-stone-950 uppercase">SWEET HAVEN BAKERY INVOICE</h3>
                        <p className="font-mono text-xs text-stone-400">TRACKING NO: {selectedInvoiceOrder.trackingNumber}</p>
                      </div>
                      <button onClick={() => setSelectedInvoiceOrder(null)} className="text-stone-400 hover:text-stone-700 text-sm font-bold">✕</button>
                    </div>

                    {/* Invoice content copy */}
                    <div className="font-mono text-xs space-y-4 border p-4 bg-stone-50 rounded-xl">
                      <div className="grid grid-cols-2">
                        <div>
                          <p className="font-bold">BILL FROM:</p>
                          <p>Artisanal Breads & Pastries HQ</p>
                          <p>Cedar Arcade, Nairobi</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">PREPARED FOR:</p>
                          <p>{selectedInvoiceOrder.customerName}</p>
                          <p>{selectedInvoiceOrder.phone}</p>
                        </div>
                      </div>

                      <div className="h-px bg-stone-200" />

                      <div>
                        <p className="font-bold mb-1">DELIVERY LOCATION:</p>
                        <p>{selectedInvoiceOrder.deliveryAddress}</p>
                        <p>DUE BY: {selectedInvoiceOrder.deliveryDate} ({selectedInvoiceOrder.preferredTime})</p>
                      </div>

                      <div className="h-px bg-stone-200" />

                      <div className="space-y-1">
                        <p className="font-bold mb-2">SUMMARY LINE ITEMS:</p>
                        <p className="font-sans leading-relaxed text-stone-601 font-semibold">{selectedInvoiceOrder.orderDetails}</p>
                      </div>

                      <div className="h-px bg-stone-300" />

                      <div className="space-y-1 text-right font-bold text-stone-900 border-t pt-2">
                        <p>SUBTOTAL: KSh {(selectedInvoiceOrder.totalAmount - (selectedInvoiceOrder.totalAmount * 0.16) - (selectedInvoiceOrder.totalAmount >= 4000 ? 0 : 500)).toLocaleString()}</p>
                        <p>TAX (VAT 16%): KSh {((selectedInvoiceOrder.totalAmount - (selectedInvoiceOrder.totalAmount >= 4000 ? 0 : 500)) * 0.16).toLocaleString()}</p>
                        <p>PACKAGING DISPATCH: KSh {(selectedInvoiceOrder.totalAmount >= 4000 ? 0 : 500).toLocaleString()}</p>
                        <p className="text-base text-primary-750">TOTAL SUM: KSh {selectedInvoiceOrder.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t">
                      <button 
                        onClick={() => window.print()}
                        className="rounded-xl border px-4 py-2 text-xs font-bold text-stone-700 flex items-center gap-1.5 hover:bg-stone-50"
                        id="invoice-modal-print"
                      >
                        <Download className="h-4 w-4" />
                        Download Invoice
                      </button>
                      <button
                        onClick={() => setSelectedInvoiceOrder(null)}
                        className="rounded-xl bg-stone-900 px-5 py-2 text-xs font-bold text-white hover:bg-stone-805"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </motion.div>
        )}

        {/* Client enquiries sub-tab */}
        {activeSubTab === 'inquiries' && (
          <motion.div
            key="adm-inquiries"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-8 lg:grid-cols-2"
            id="adm-inquiries-panel"
          >
            {/* Left: Custom event bookings list */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">Bespoke Event Catering Queries</h3>
              <p className="font-sans text-xs text-stone-400">Inquiries submitted via the Services preorder forms.</p>

              <div className="space-y-3 font-sans text-xs" id="admin-catering-inquiries-feed">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="rounded-xl border p-4 bg-stone-50 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-stone-900">{inq.name}</h4>
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase ${
                        inq.status === 'replied' ? 'bg-stone-200 text-stone-600' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="text-stone-550 leading-relaxed space-y-1">
                      <p>Type Selection: <span className="font-semibold text-stone-800">{inq.eventType}</span></p>
                      <p>Target Date: <span>{inq.eventDate || 'flexible'}</span> • Guest index: <span>{inq.guestCount}</span></p>
                      <p className="italic bg-white p-2 border rounded-lg mt-1 select-all font-sans text-[11px]">"{inq.details || 'No additional details provided.'}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-[11px]">
                      <span className="text-stone-400 font-mono">Contact: {inq.phone} • {inq.email}</span>
                      {inq.status === 'pending' && (
                        <button
                          onClick={() => alert(`Simulated follow-up reply dispatched to customer via direct mail callback!`)}
                          className="rounded bg-stone-800 hover:bg-stone-905 px-2.5 py-1 font-bold text-white flex items-center gap-1 text-[10px]"
                          id={`reply-inq-${inq.id}`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          Mark replied
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {inquiries.length === 0 && (
                  <p className="text-stone-405 text-center py-6 font-medium">No event booking inquiries have been logged yet.</p>
                )}
              </div>
            </div>

            {/* Right: Contact Form Messages list */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">Direct Contact Board Messages</h3>
              <p className="font-sans text-xs text-stone-400">Feedback and general questions received from the Contact page.</p>

              <div className="space-y-3 font-sans text-xs" id="admin-contact-messages-feed">
                {messages.map((msg) => (
                  <div key={msg.id} className="rounded-xl border p-4 bg-stone-50 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-stone-900">{msg.name}</h4>
                        <span className="text-[10px] text-stone-400">{msg.email}</span>
                      </div>
                      <span className="font-sans text-[10px] text-stone-400">{msg.createdAt}</span>
                    </div>
                    <div className="text-stone-601 font-semibold leading-none pt-1">
                      Subject: {msg.subject}
                    </div>
                    <p className="text-stone-550 italic leading-relaxed bg-white border p-2 rounded-lg text-[11px]">
                      "{msg.message}"
                    </p>
                  </div>
                ))}

                {messages.length === 0 && (
                  <p className="text-stone-405 text-center py-6 font-medium">No board messages have been logged yet.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
