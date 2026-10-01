(function () {
  const image = (id, width) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

  window.HamperData = {
    categories: [
      { name: 'Christmas Hampers', icon: '✳', description: 'A little extra magic for the season.', image: image('photo-1512909006721-3d6018887383', 700), alt: 'A thoughtfully wrapped seasonal gift' },
      { name: 'Corporate Hampers', icon: '▧', description: 'Good things, thoughtfully shared.', image: image('photo-1607082348824-0a96f2a4b9da', 700), alt: 'A selection of beautifully presented gifts' },
      { name: 'Wedding & Introduction', icon: '♡', description: 'A lovely beginning, beautifully marked.', image: image('photo-1511795409834-ef04bbd61622', 700), alt: 'An elegant celebration table' },
      { name: 'Birthday Hampers', icon: '✷', description: 'For their once-a-year kind of day.', image: image('photo-1511988617509-a57c8a288659', 700), alt: 'Friends celebrating together' },
      { name: 'Valentine’s Gifts', icon: '♥', description: 'A little way to say, it’s you.', image: image('photo-1513201099705-a9746e1e201f', 700), alt: 'A gift wrapped with care' },
      { name: 'Women’s Gifts', icon: '✿', description: 'For the wonderful women in your world.', image: image('photo-1524504388940-b1c1722653e1', 700), alt: 'A woman smiling in natural light' },
      { name: 'Men’s Gifts', icon: '✦', description: 'Considered little luxuries, just for him.', image: image('photo-1506794778202-cad84cf45f1d', 700), alt: 'A portrait of a smiling man' },
      { name: 'Baby Gifts', icon: '☼', description: 'A warm welcome for someone brand new.', image: image('photo-1511895426328-dc8714191300', 700), alt: 'A joyful family moment' },
      { name: 'Appreciation Gifts', icon: '♡', description: 'For the people who make a difference.', image: image('photo-1523438885200-e635ba2c371e', 700), alt: 'A thoughtful detail for a special occasion' },
      { name: 'Hampers by Budget', icon: '₦', description: 'A lovely gesture, at just the right price.', image: image('photo-1549465220-1a8b9238cd48', 700), alt: 'A wrapped gift ready to give' }
    ],
    products: [
      { id: 'classic', name: 'The Classic', description: 'A timeless mix of little luxuries and everyday favourites.', price: 'Price coming soon', size: 'Medium', image: image('photo-1549465220-1a8b9238cd48', 850), alt: 'A classic gift box wrapped in paper', tone: 'sage' },
      { id: 'celebration', name: 'The Celebration Box', description: 'A bright, joyful collection for their big little day.', price: 'Price coming soon', size: 'Large', image: image('photo-1527529482837-4698179dc6ce', 850), alt: 'A joyful gathering with friends', tone: 'peach' },
      { id: 'executive', name: 'The Executive', description: 'A polished thank-you for clients, teams and partners.', price: 'Price coming soon', size: 'Large', image: image('photo-1607082348824-0a96f2a4b9da', 850), alt: 'Carefully arranged premium gifts', tone: 'olive' },
      { id: 'love', name: 'The Love Box', description: 'A sweet, thoughtful reminder that they’re your person.', price: 'Price coming soon', size: 'Medium', image: image('photo-1513201099705-a9746e1e201f', 850), alt: 'A romantic gift wrapped with a ribbon', tone: 'rose' },
      { id: 'luxury', name: 'The Luxury Collection', description: 'An extra-special gathering of beautiful things.', price: 'Price coming soon', size: 'Large', image: image('photo-1512909006721-3d6018887383', 850), alt: 'An elegant arrangement of wrapped presents', tone: 'sand' },
      { id: 'mini', name: 'The Mini Treats', description: 'A small, lovely something that says a whole lot.', price: 'Price coming soon', size: 'Small', image: image('photo-1523438885200-e635ba2c371e', 850), alt: 'A small thoughtful gift on a table', tone: 'blue' }
    ],
    features: [
      { icon: '✿', title: 'Carefully curated', description: 'Every hamper is thoughtfully put together, down to the last lovely detail.' },
      { icon: '✳', title: 'Premium presentation', description: 'Beautiful packaging designed to make the moment memorable.' },
      { icon: '♡', title: 'Made with thought', description: 'Gifts selected with the person you’re celebrating in mind.' },
      { icon: '↗', title: 'Reliable delivery', description: 'A smooth, dependable delivery experience is part of the gift.' },
      { icon: '✎', title: 'A personal touch', description: 'Add a heartfelt message and those little custom details.' },
      { icon: '▧', title: 'Corporate gifting', description: 'Considered gifting solutions for businesses and organisations.' }
    ],
    steps: [
      { number: '01', title: 'Choose', description: 'Browse our hampers and find the perfect gift.' },
      { number: '02', title: 'Personalise', description: 'Add your preferred options and a personal message.' },
      { number: '03', title: 'Order', description: 'Confirm your order and payment.' },
      { number: '04', title: 'Deliver', description: 'We prepare and deliver your hamper.' }
    ],
    occasions: [
      { name: 'Birthday', icon: '✷' }, { name: 'Wedding', icon: '♡' }, { name: 'Anniversary', icon: '✿' },
      { name: 'Christmas', icon: '✳' }, { name: 'Valentine’s Day', icon: '♥' }, { name: 'Baby celebration', icon: '☼' },
      { name: 'Corporate appreciation', icon: '▧' }, { name: 'Graduation', icon: '✦' }, { name: 'Thank you', icon: '✎' }, { name: 'Just because', icon: '☺' }
    ],
    testimonials: [
      { name: 'Amara O.', occasion: 'Birthday', rating: 5, review: 'The little details made it feel so personal. It was exactly the kind of gift I wanted to send.' },
      { name: 'Tunde A.', occasion: 'A thoughtful thank-you', rating: 5, review: 'Beautifully put together, and so easy to give. It made saying thank you feel extra special.' },
      { name: 'Nneka C.', occasion: 'Celebration', rating: 5, review: 'You can tell a lot of care went into every part of it. Such a lovely moment to share.' }
    ]
  };
})();
