export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'Cakes' | 'Pastries' | 'Breads' | 'Desserts';
  subCategory?: string;
  price: number;
  image: string;
  rating: number;
  bestSeller: boolean;
  inventory: number; // in stock count
}

export interface CartItem {
  id: string; // combination of product.id + options if any
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'M-pesa' | 'Credit/Debit' | 'Bank Transfer' | 'Cash on Delivery';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  orderDetails: string; // summary of products ordered
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  deliveryDate: string;
  preferredTime: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: 'received' | 'baking' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  trackingNumber: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cakes' | 'pastries' | 'bread' | 'events' | 'scenes';
  imageUrl: string;
  description: string;
}

export interface CustomInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  details: string;
  status: 'pending' | 'replied';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
