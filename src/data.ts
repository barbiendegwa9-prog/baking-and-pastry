import { Product, GalleryItem, Review } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // Cakes
  {
    id: 'p1',
    name: 'Elegant Velvet Birthday Cake',
    description: 'Fudge-layered rich red velvet sponge layered with smooth, luxury Madagascan vanilla cream-cheese frosting, gold leaf flakes, and edible floral garnishes. Perfect for memorable birthdays.',
    category: 'Cakes',
    subCategory: 'Birthday cakes',
    price: 4500.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    bestSeller: true,
    inventory: 5
  },
  {
    id: 'p2',
    name: 'Grand Bloom Wedding Cake',
    description: 'A 3-tier majestic masterpiece with custom vanilla-almond sponge, champagne cream filling, and exquisite white fondant draped with lifelike sugar flowers. Handcrafted to order.',
    category: 'Cakes',
    subCategory: 'Wedding cakes',
    price: 28000.00,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    bestSeller: false,
    inventory: 2
  },
  {
    id: 'p3',
    name: 'Royale Anniversary Cake',
    description: 'Decadent dark chocolate ganache cake infused with orange zest liqueur, topped with spun sugar details, dark cocoa crumbs, and silver foil finish. Truly premium.',
    category: 'Cakes',
    subCategory: 'Anniversary cakes',
    price: 5500.00,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    bestSeller: false,
    inventory: 4
  },
  {
    id: 'p4',
    name: 'Belgian Chocolate Custom Drizzle',
    description: 'Fully customizable drip-cake made with single-origin Belgian chocolate mousse, moist layers of sponge, and seasonal fresh berries. Personalized message included.',
    category: 'Cakes',
    subCategory: 'Custom cakes',
    price: 6000.00,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    bestSeller: true,
    inventory: 3
  },

  // Pastries
  {
    id: 'p5',
    name: 'Classic Golden Croissant',
    description: 'Traditional French-style butter pastry with 81 micro-layers, baked daily to a crisp golden flakiness with an airy, feather-soft buttery core.',
    category: 'Pastries',
    subCategory: 'croissants',
    price: 350.00,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    bestSeller: true,
    inventory: 40
  },
  {
    id: 'p6',
    name: 'Glazed Danish Custard Pastry',
    description: 'Delicate Danish puff dough crowned with fresh warm Madagascar vanilla bean custard and fresh field berries with a light honey glaze sparkle.',
    category: 'Pastries',
    subCategory: 'Danish pastries',
    price: 420.00,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    bestSeller: false,
    inventory: 25
  },
  {
    id: 'p7',
    name: 'Savory Puff Pastry Basket',
    description: 'Golden puff shell stuffed with creamy wild mushrooms, fresh thyme, caramelized sweet onions, and a sprinkle of premium parmesan.',
    category: 'Pastries',
    subCategory: 'Puff pastries',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1549590143-d5855148a9d5?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    bestSeller: false,
    inventory: 15
  },

  // Breads
  {
    id: 'p8',
    name: 'Stone-Baked White Boule',
    description: 'Crispy-crusted rustic white bread fermented with slow-rise sourdough yeast, giving a soft chewy crumb and rich sourdough taste.',
    category: 'Breads',
    subCategory: 'White bread',
    price: 400.00,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    bestSeller: false,
    inventory: 20
  },
  {
    id: 'p9',
    name: 'Sprouted Malt Brown Loaf',
    description: 'Nutritious brown loaf incorporating organic rye flour, coarse barley, malted dark molasses, wheat bran, and loaded with flaxseeds and sunflower kernels.',
    category: 'Breads',
    subCategory: 'Brown bread',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    bestSeller: false,
    inventory: 18
  },
  {
    id: 'p10',
    name: 'Sourdough Artisan Batard',
    description: 'Our signature wholewheat and wild yeast batard, stone-baked with absolute precision. 36-hour proofing process yields standard-setting crumb structure.',
    category: 'Breads',
    subCategory: 'Artisan bread',
    price: 600.00,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    bestSeller: true,
    inventory: 10
  },

  // Desserts (Cupcakes, Cookies, Doughnuts, etc.)
  {
    id: 'p11',
    name: 'Velvety Cocoa Cupcakes (Box of 4)',
    description: 'Whimsical pastel vanilla and chocolate fudge cupcakes with premium pink frosting swirls, rainbow sprinkles, and mini macaron tops.',
    category: 'Desserts',
    subCategory: 'Cupcakes',
    price: 1200.00,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    bestSeller: true,
    inventory: 10
  },
  {
    id: 'p12',
    name: 'Gourmet Salted Caramel Glazed Doughnut',
    description: 'Yeast-raised giant doughnut, blanketed in high-grade dark salted caramel glaze, topped with crushed English toffee and toasted pecans.',
    category: 'Desserts',
    subCategory: 'Doughnuts',
    price: 380.00,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    bestSeller: true,
    inventory: 30
  },
  {
    id: 'p13',
    name: 'New York style Basque Burnt Cheesecake',
    description: 'Creamy, melt-in-mouth core, high caramelized Basque crown. Baked on authentic parchment to create a beautiful caramelized contrast.',
    category: 'Desserts',
    subCategory: 'cheesecakes',
    price: 3200.00,
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    bestSeller: true,
    inventory: 8
  },
  {
    id: 'p14',
    name: 'Chunky Belgian Chocolate Fudge Brownie',
    description: 'Rich, ultra-fudgy cocoa brownie squares crafted with chunks of 70% dark chocolate and roasted walnuts. Crisp crackle top.',
    category: 'Desserts',
    subCategory: 'Brownies',
    price: 400.00,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    bestSeller: false,
    inventory: 16
  },
  {
    id: 'p15',
    name: 'Warm Madagascar Vanilla Muffins (2 Pack)',
    description: 'Puffy whole-egg muffins stuffed with slow-cooked berry fillings and lightly baked almond flakes on top.',
    category: 'Desserts',
    subCategory: 'Muffins',
    price: 550.00,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    bestSeller: false,
    inventory: 20
  },
  {
    id: 'p16',
    name: 'Giant Chunk Double Chocolate Cookies',
    description: 'Fresh warm freshly-baked triple chocolate cookie, crispy exterior with a super-soft molten fudge center.',
    category: 'Desserts',
    subCategory: 'Cookies',
    price: 300.00,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    bestSeller: true,
    inventory: 50
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Wanjiku Kamau',
    rating: 5,
    message: 'Oh my! These are hands down the best cakes in town. The Red Velvet is literally like velvet, perfectly sweet and stunningly beautiful. Highly recommended!',
    date: '3 days ago',
    verified: true
  },
  {
    id: 'r2',
    name: 'Michael Miller',
    rating: 5,
    message: 'Superb fresh pastries and excellent service. Order delivery was prompt, and the croissants were still hot and gloriously flaky when they arrived at our office!',
    date: '1 week ago',
    verified: true
  },
  {
    id: 'r3',
    name: 'Amina Omondi',
    rating: 5,
    message: 'The custom cake designed for our corporate gala was stunningly accurate to the branding sheet. Tasted absolutely stellar and looked like art.',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'r4',
    name: 'David Jenkins',
    rating: 4,
    message: 'Their artisan sourdough batting crust option is unmatched in Nairobi. Exceptional texture, crisp and bubbly crust with perfect chewiness.',
    date: '3 weeks ago',
    verified: false
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Multi-Tiered Kenyan Wedding Cake',
    category: 'cakes',
    imageUrl: '/src/assets/images/kenyan_cakes_portfolio_hero_1781862817254.jpg',
    description: 'Stately three-tier Kenyan custom wedding cake, draped in sugar lace, passion fruit glazes, vibrant tropical hibiscus, orchids, and edible gold beadwork patterns.'
  },
  {
    id: 'g2',
    title: 'Kenyan Tropical Chocolate Drip Cake',
    category: 'cakes',
    imageUrl: '/src/assets/images/kenyan_birthday_drip_cake_1781862845580.jpg',
    description: 'A magnificent custom chocolate-caramel drip celebration cake, adorned with passion fruit frosting, fresh local flowers, and fine gold dust.'
  },
  {
    id: 'g3',
    title: 'Freshly Baked Croissant Batch',
    category: 'pastries',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    description: 'Layered pastries cooling off the deck under rustic ambient workspace lighting.'
  },
  {
    id: 'g4',
    title: 'Delicate Danish Assortment',
    category: 'pastries',
    imageUrl: 'https://images.unsplash.com/photo-1549590143-d5855148a9d5?auto=format&fit=crop&w=800&q=80',
    description: 'Stuffed custard pastries with powdered sugar crust, blueberries, and fresh organic raspberry glazes.'
  },
  {
    id: 'g5',
    title: 'Artisan Woodfired Sourdough Batards',
    category: 'bread',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh batards proofed for 36 hours before stone-deck baking, crispy ears and robust blistering.'
  },
  {
    id: 'g6',
    title: 'Assorted Seeded Grain Loaves',
    category: 'bread',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=80',
    description: 'Gluten-conscious sprouted multigrain and brown yeast loaves sliced to preview the uniform cellular structure.'
  },
  {
    id: 'g7',
    title: 'Catered Birthday Dessert Board',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    description: 'Stunning tiered presentation featuring personalized cupcakes, macaron drops, and miniature tarts.'
  },
  {
    id: 'g8',
    title: 'Behind the Scenes: Sifting with Passion',
    category: 'scenes',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    description: 'Chef sifting high-grade flour to prepare the afternoon batch of French baguettes under direct visual inspection.'
  },
  {
    id: 'g9',
    title: 'The Deck Oven Loading',
    category: 'scenes',
    imageUrl: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&w=800&q=80',
    description: "Our head baker loading handmade loaves onto the firestone hearth using a traditional wooden baker's peel."
  }
];
