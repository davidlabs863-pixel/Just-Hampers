(function () {
  const image = (id, width = 560) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

  window.HamperBuilderData = {
    pricingNote: 'Illustrative estimates only. Final catalogue prices and availability will be confirmed before launch.',
    boxes: [
      { id: 'small', name: 'Small', description: 'A lovely little something, thoughtfully packed.', capacity: 3, basePrice: 4000, image: 'oy.jpeg', alt: 'A seasonal gift box with red and black ribbon details', colors: ['ivory', 'sage', 'burgundy'] },
      { id: 'medium', name: 'Medium', description: 'A balanced choice for everyday gifting.', capacity: 5, basePrice: 6500, image: 'ylbk.jpeg', alt: 'A set of premium drink flasks and notebooks arranged for gifting', colors: ['ivory', 'sage', 'burgundy', 'blush'] },
      { id: 'large', name: 'Large', description: 'More room for a generous selection of good things.', capacity: 7, basePrice: 9500, image: 'iyn%20.jpeg', alt: 'A blue presentation box with several corporate gift items', colors: ['ivory', 'sage', 'burgundy', 'blush'] },
      { id: 'luxury', name: 'Luxury', description: 'A keepsake presentation for truly special moments.', capacity: 10, basePrice: 16000, image: image('photo-1607082348824-0a96f2a4b9da'), alt: 'A premium arrangement of gift boxes', colors: ['ivory', 'burgundy'] }
    ],
    budgets: [
      { id: '20000', label: '₦20,000', limit: 20000, productCeiling: 6000, note: 'A thoughtful little hamper' },
      { id: '30000', label: '₦30,000', limit: 30000, productCeiling: 9000, note: 'Room for a few favourites' },
      { id: '50000', label: '₦50,000', limit: 50000, productCeiling: 14000, note: 'Explore a more generous mix' },
      { id: '100000', label: '₦100,000+', limit: null, productCeiling: null, note: 'Open the door to luxury picks' }
    ],
    categories: [
      { id: 'all', label: 'All', icon: '✳' },
      { id: 'food', label: 'Food', icon: '🍫' },
      { id: 'drinks', label: 'Drinks', icon: '☕' },
      { id: 'beauty', label: 'Beauty', icon: '🌸' },
      { id: 'lifestyle', label: 'Lifestyle', icon: '📓' },
      { id: 'accessories', label: 'Accessories', icon: '🎁' }
    ],
    products: [
      { id: 'chocolate', name: 'Chocolate Bar', category: 'food', description: 'A rich little moment of sweetness.', price: 3500, minimumBudget: '20000', image: image('photo-1606313564200-e75d5e30476c'), alt: 'A bar of dark chocolate' },
      { id: 'biscuits', name: 'Butter Biscuits', category: 'food', description: 'Crisp, buttery and lovely with a cuppa.', price: 2500, minimumBudget: '20000', image: image('photo-1558961363-fa8fdf82db35'), alt: 'Freshly baked biscuits' },
      { id: 'coffee', name: 'Ground Coffee', category: 'drinks', description: 'A cosy cup for a slower morning.', price: 6500, minimumBudget: '30000', image: image('photo-1447933601403-0c6688de566e'), alt: 'A cup of freshly brewed coffee' },
      { id: 'perfume', name: 'Signature Perfume', category: 'beauty', description: 'A considered fragrance for their everyday.', price: 18000, minimumBudget: '100000', image: image('photo-1594035910387-fea47794261f'), alt: 'A refined perfume bottle' },
      { id: 'skincare', name: 'Care Ritual Set', category: 'beauty', description: 'A gentle set for a little at-home care.', price: 12000, minimumBudget: '50000', image: image('photo-1608248543803-ba4f8c70ae0b'), alt: 'A skincare jar with natural ingredients' },
      { id: 'mug', name: 'Ceramic Mug', category: 'lifestyle', description: 'A useful favourite for their daily ritual.', price: 6000, minimumBudget: '30000', image: image('photo-1514228742587-6b1558fcca3d'), alt: 'A handmade ceramic coffee mug' },
      { id: 'notebook', name: 'Linen Notebook', category: 'lifestyle', description: 'A fresh page for all their good ideas.', price: 4500, minimumBudget: '30000', image: image('photo-1531346878377-a5be20888e57'), alt: 'A notebook and pen on a desk' },
      { id: 'candle', name: 'Scented Candle', category: 'lifestyle', description: 'A soft glow and a little room to unwind.', price: 7000, minimumBudget: '50000', image: image('photo-1603006905003-be475563bc59'), alt: 'A candle glowing in a glass jar' },
      { id: 'snacks', name: 'Snack Selection', category: 'food', description: 'A moreish mix for their next little break.', price: 3000, minimumBudget: '20000', image: image('photo-1566478989037-eec170784d0b'), alt: 'A selection of crunchy snacks' },
      { id: 'sweets', name: 'Sweet Treats', category: 'food', description: 'A colourful handful of something sweet.', price: 2200, minimumBudget: '20000', image: image('photo-1582058091505-f87a2e55a40f'), alt: 'Colourful sweets ready for gifting' },
      { id: 'tea', name: 'Tea Collection', category: 'drinks', description: 'A few comforting blends to steep and savour.', price: 4500, minimumBudget: '30000', image: image('photo-1544787219-7f47ccb76574'), alt: 'A cup of tea with loose tea leaves' },
      { id: 'accessories', name: 'Desk Accessory', category: 'accessories', description: 'A useful finishing touch for their space.', price: 8500, minimumBudget: '50000', image: image('photo-1494438639946-1ebd1d20bf85'), alt: 'A tidy desk with a thoughtful accessory' }
    ],
    ribbons: [
      { id: 'gold', label: 'Soft gold', color: '#c69b4c' }, { id: 'white', label: 'Warm white', color: '#fffaf0' },
      { id: 'black', label: 'Ink', color: '#302a27' }, { id: 'red', label: 'Berry red', color: '#781b31' },
      { id: 'pink', label: 'Blush', color: '#d99a9d' }, { id: 'blue', label: 'Soft blue', color: '#809db1' },
      { id: 'custom', label: 'Custom', color: null }
    ],
    boxColors: [
      { id: 'ivory', label: 'Warm ivory', color: '#f5e7c7' }, { id: 'sage', label: 'Soft sage', color: '#aebba0' },
      { id: 'burgundy', label: 'Burgundy', color: '#781b31' }, { id: 'blush', label: 'Blush', color: '#ddb2a7' }
    ],
    orderStatuses: ['Pending', 'Payment Confirmed', 'Order Received', 'In Production', 'Quality Check', 'Ready for Delivery', 'Out for Delivery', 'Delivered', 'Cancelled']
  };
})();
