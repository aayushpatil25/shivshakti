/**
 * ALL EDITABLE INFO LIVES HERE — text, phone numbers, prices, product images.
 * Everything marked REPLACE is a placeholder.
 */

export const brand = {
  name: 'Shivshakti',
  wordmark: 'SHIVSHAKTI',
  tagline: 'Creative Hub',
  /** REPLACE: WhatsApp number, digits only, with country code (91 for India). */
  whatsapp: '+919075588486',
  /** REPLACE: number shown on the page. */
  phoneDisplay: '+919075588486',
  /** REPLACE */
  email: 'shivshakticreativehub@gmail.com',
  /** REPLACE */
  address: 'Dahanu Agar – 401601',
  /** REPLACE (leave '' to hide). */
  instagram: 'https://www.instagram.com/shiv_shakti_creatice_hub/',
  /** OPTIONAL: your logo, e.g. '/images/logo.png' (put the file in public/images/). '' = built-in text mark. */
  logo: '/images/logo.png',
};

export const nav = [
  {label: 'Products', href: '#products'},
  {label: 'Process', href: '#process'},
  {label: 'Pricing', href: '#pricing'},
  {label: 'Order', href: '#order'},
];

export const hero = {
  eyebrow: 'Custom print studio',
  title: 'Wear it. Sip it. Make it yours.',
  body: 'T-shirts, hoodies, mugs, cups and caps — printed with your design, one piece or a thousand.',
  veil: 'Scroll to start printing',
};

export const intro = {
  eyebrow: 'What we print',
  heading: 'One design. Every surface.',
  body: 'From a single birthday mug to a full team kit, we print it, check it and deliver it.',
};

export type Kind = 'tshirt' | 'hoodie' | 'mug' | 'cup' | 'cap';

/**
 * REPLACE `image` with a real photo, e.g. '/images/tshirt.jpg' (file in public/images/).
 * Leave '' to show the drawn illustration. `color` is the illustration's colour.
 */
export const products: {kind: Kind; tag: string; title: string; body: string; color: string; image: string}[] = [
  {kind: 'tshirt', tag: 'Most ordered', title: 'T-shirts', body: 'Soft cotton, sharp prints. Round neck, polo and oversized.', color: '#f4efe6', image: ''},
  {kind: 'hoodie', tag: 'Winter', title: 'Hoodies', body: 'Heavy fleece with a front or back print that does not crack.', color: '#7a1226', image: ''},
  {kind: 'mug', tag: 'Gifting', title: 'Mugs', body: 'Dishwasher-safe ceramic with a full-wrap photo or logo.', color: '#f6efe3', image: ''},
  {kind: 'cup', tag: 'Events', title: 'Cups & tumblers', body: 'Sippers and tumblers for offices, weddings and campaigns.', color: '#ff8a1f', image: ''},
  {kind: 'cap', tag: 'Teams', title: 'Caps', body: 'Embroidered or printed, with adjustable straps.', color: '#1d2a44', image: ''},
];

export const process = {
  eyebrow: 'How it works',
  heading: 'From your idea to your doorstep.',
  counterLabel: 'Orders delivered',
  /** REPLACE with your real number. */
  delivered: 12500,
  steps: [
    {title: 'Share your design', body: 'Send a file, a photo or just an idea on WhatsApp.'},
    {title: 'Proof & approval', body: 'We send a mock-up. You approve it or ask for changes.'},
    {title: 'Printing', body: 'Heat-press, sublimation or DTF — whichever suits the product.'},
    {title: 'Quality check', body: 'Every piece is checked for colour, alignment and finish.'},
    {title: 'Packed & delivered', body: 'Pick up from the shop or we ship to your address.'},
  ],
};

/** REPLACE prices (placeholders). `qty` pre-fills the order form. */
export const pricing = {
  eyebrow: 'Pricing',
  heading: 'Pay for what you print.',
  note: 'Placeholder prices — replace with yours.',
  tiers: [
    {name: 'Single piece', qty: '1', from: '₹299', unit: 'per piece', lines: ['One-off custom print', 'Free design check', 'Ready in 2–3 days'], cta: 'Order one'},
    {name: 'Bulk', qty: '10+', from: '₹229', unit: 'per piece', lines: ['10 pieces or more', 'Same design, mixed sizes', 'Ready in 4–5 days'], cta: 'Get bulk quote', featured: true},
    {name: 'Corporate & events', qty: '50+', from: 'Custom', unit: 'quote', lines: ['Uniforms, kits, giveaways', 'GST invoice', 'Dedicated contact'], cta: 'Talk to us'},
  ],
};

export const order = {
  eyebrow: 'Order',
  heading: 'Tell us what to print.',
  body: 'Fill this in and it opens WhatsApp with your request ready to send. No payment now.',
  /** REPLACE: your next bulk-order cut-off (ISO date). Set '' to hide the countdown. */
  deadline: '2027-03-01T00:00:00+05:30',
  deadlineLabel: 'Next bulk-order cut-off (placeholder)',
};
