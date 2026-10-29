/**
 * ONRENT â€” SEED DATA & MOCK CATALOGUE (V3: REAL PRODUCT PHOTOGRAPHY)
 * Exactly 28 verified rental listings (4 per product type):
 * 1. Headphones (4)
 * 2. Speakers (4) [Includes party speaker with mic â‚¹349/day]
 * 3. Laptops (4)
 * 4. iPhones (4)
 * 5. MacBooks (4)
 * 6. DSLR cameras (4) [Includes Canon Creator Kit â‚¹499/day]
 * 7. DSLR lenses (4)
 * Scaled deposits: Higher for iPhones, MacBooks, Laptops & Lenses; Lower for Headphones & Speakers.
 * All listings feature real, high-resolution WebP photographs (front, angle, detail/accessories) with descriptive alt text.
 */

function generateVisualPlaceholder(title, category, icon, bgGradient) {
  // Graceful fallback helper
  return './images/products/dslr/canon-creator-kit-front.webp';
}

const SEED_PRODUCTS = [
  // =========================================================================
  // 1. HEADPHONES (4 listings - Lower deposits: â‚¹1,200 - â‚¹2,200)
  // =========================================================================
  {
    id: 'onr-hp-01',
    name: 'Sony WH-1000XM5 Noise-Cancelling Headphones',
    title: 'Sony WH-1000XM5 Wireless Industry-Leading Noise Cancelling Headphones',
    productType: 'Headphones',
    brand: 'Sony',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 290,
    deposit: 1800,
    protectionFee: 79,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Shahnoorwadi',
    distanceKm: 2.1,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.97,
    reviewsCount: 58,
    images: [
      { url: './images/products/headphones/sony-wh1000xm5-front.webp', alt: 'Sony WH-1000XM5 wireless noise-cancelling headphones in black, front view' },
      { url: './images/products/headphones/sony-wh1000xm5-angle.webp', alt: 'Sony WH-1000XM5 headphones angled view showing soft earcups' },
      { url: './images/products/headphones/sony-wh1000xm5-detail.webp', alt: 'Sony WH-1000XM5 travel hard case and audio cable accessories' }
    ],
    owner: {
      name: 'Priyanka Jadhav',
      rating: 4.96,
      reviewsCount: 47,
      verified: true,
      joinedDate: 'Dec 2024',
      avatar: 'PJ',
      phone: '+91 98902 44109',
      area: 'Shahnoorwadi'
    },
    description: 'Industry-leading noise cancelling with dual processor V1 and 8 microphones. Featherlight soft-fit synthetic leather headband, 30-hour battery life with 3-minute quick charge, Hi-Res LDAC wireless audio, and pristine call microphones. Hard travel case included.',
    specs: ['Active Noise Cancellation (8 Mics)', '30-Hour Battery Life', 'Hi-Res Audio Wireless LDAC', 'Touch Sensor Controls'],
    aliases: ['headphones', 'headphone', 'sony', 'xm5', 'anc', 'wireless headphones', 'audio'],
    featured: true,
    momentSlug: 'music-and-parties'
  },
  {
    id: 'onr-hp-02',
    name: 'Bose QuietComfort 45 Bluetooth Headphones',
    title: 'Bose QuietComfort 45 Wireless Noise Cancelling Headphones',
    productType: 'Headphones',
    brand: 'Bose',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 270,
    deposit: 1600,
    protectionFee: 69,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.5,
    condition: 'Excellent',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.91,
    reviewsCount: 34,
    images: [
      { url: './images/products/headphones/bose-qc45-front.webp', alt: 'Bose QuietComfort 45 wireless headphones in silver, front profile' },
      { url: './images/products/headphones/bose-qc45-angle.webp', alt: 'Bose QuietComfort 45 earcups and padded headband angled view' },
      { url: './images/products/headphones/bose-qc45-detail.webp', alt: 'Bose QuietComfort 45 folded in protective travel case' }
    ],
    owner: {
      name: 'Amit Varma',
      rating: 4.95,
      reviewsCount: 38,
      verified: true,
      joinedDate: 'Feb 2025',
      avatar: 'AV',
      phone: '+91 98600 12894',
      area: 'Samarth Nagar'
    },
    description: 'Legendary Bose Acoustic Noise Cancelling technology with Quiet and Aware modes. Ultra-plush synthetic leather ear cushions, TriPort acoustic architecture, and 24 hours of playback per charge. Supplied with USB-C cable and Bose carry case.',
    specs: ['Acoustic Noise Cancelling', '24 Hours Playtime', 'Plush Ergonomic Cushions', 'TriPort Acoustic Headroom'],
    aliases: ['bose', 'qc45', 'headphones', 'quietcomfort', 'bluetooth', 'audio'],
    featured: false,
    momentSlug: 'music-and-parties'
  },
  {
    id: 'onr-hp-03',
    name: 'Apple AirPods Max (Space Grey)',
    title: 'Apple AirPods Max Over-Ear Headphones with Active Noise Cancellation',
    productType: 'Headphones',
    brand: 'Apple',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 450,
    deposit: 2200,
    protectionFee: 119,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Cannaught Place',
    distanceKm: 2.7,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.98,
    reviewsCount: 42,
    images: [
      { url: './images/products/headphones/airpods-max-front.webp', alt: 'Apple AirPods Max in Space Grey aluminum finish, front view' },
      { url: './images/products/headphones/airpods-max-angle.webp', alt: 'Apple AirPods Max knit-mesh canopy and anodized aluminum cups angled' },
      { url: './images/products/headphones/airpods-max-detail.webp', alt: 'Apple AirPods Max Smart Case and Lightning charging port' }
    ],
    owner: {
      name: 'Tanmay Kale',
      rating: 4.99,
      reviewsCount: 74,
      verified: true,
      joinedDate: 'Oct 2024',
      avatar: 'TK',
      phone: '+91 98225 67104',
      area: 'Cannaught Place'
    },
    description: 'Apple-designed dynamic driver delivers high-fidelity audio with Personalized Spatial Audio and dynamic head tracking. Computational audio with H1 chips in each cup, breathable knit-mesh canopy, acoustically engineered memory foam ear cushions, and Smart Case.',
    specs: ['Apple H1 Headphone Chips (Each Cup)', 'Personalized Spatial Audio with Head Tracking', 'Anodized Aluminum Ear Cups', '20 Hours Battery Life'],
    aliases: ['apple', 'airpods max', 'headphones', 'airpods', 'spatial audio'],
    featured: true,
    momentSlug: 'music-and-parties'
  },
  {
    id: 'onr-hp-04',
    name: 'Sennheiser Momentum 4 Wireless Headphones',
    title: 'Sennheiser Momentum 4 Wireless (60-Hour Battery, Audiophile Sound)',
    productType: 'Headphones',
    brand: 'Sennheiser',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 240,
    deposit: 1200,
    protectionFee: 59,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Beed Bypass',
    distanceKm: 3.4,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.89,
    reviewsCount: 27,
    images: [
      { url: './images/products/headphones/sennheiser-momentum4-front.webp', alt: 'Sennheiser Momentum 4 wireless headphones in matte black, front view' },
      { url: './images/products/headphones/sennheiser-momentum4-angle.webp', alt: 'Sennheiser Momentum 4 angled view with fabric headband' },
      { url: './images/products/headphones/sennheiser-momentum4-detail.webp', alt: 'Sennheiser Momentum 4 audio cables and airplane adapter' }
    ],
    owner: {
      name: 'Rohan Patil',
      rating: 4.99,
      reviewsCount: 54,
      verified: true,
      joinedDate: 'Nov 2024',
      avatar: 'RP',
      phone: '+91 98901 33201',
      area: 'Beed Bypass'
    },
    description: 'Audiophile-inspired 42mm transducer system delivering brilliant dynamics and musicality. Unmatched 60-hour battery life on a single charge, adaptive noise cancellation with transparency mode, and lightweight folding design.',
    specs: ['42mm Audiophile Transducer', '60-Hour Battery Playtime', 'Adaptive Noise Cancellation', 'Crystal-Clear Call Quality'],
    aliases: ['sennheiser', 'momentum 4', 'headphones', 'audiophile', 'bluetooth'],
    featured: false,
    momentSlug: 'music-and-parties'
  },

  // =========================================================================
  // 2. SPEAKERS (4 listings - Lower deposits: â‚¹1,400 - â‚¹2,500)
  // [Keep party speaker with wireless mic â‚¹349/day]
  // =========================================================================
  {
    id: 'onr-spk-01',
    name: 'Party Speaker with Wireless Mic (JBL PartyBox 100W)',
    title: 'Party Speaker with Wireless Mic (JBL PartyBox 100W with Dynamic Lightshow)',
    productType: 'Speakers',
    brand: 'JBL',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 349,
    deposit: 1800,
    protectionFee: 89,
    location: 'Chhatrapati Sambhajinagar',
    area: 'CIDCO N-2',
    distanceKm: 2.2,
    condition: 'Excellent',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.98,
    reviewsCount: 71,
    images: [
      { url: './images/products/speakers/partybox-speaker-front.webp', alt: 'JBL PartyBox 100W party speaker with dynamic LED ring light front view' },
      { url: './images/products/speakers/partybox-speaker-angle.webp', alt: 'JBL PartyBox high-output speaker angled outdoor setup' },
      { url: './images/products/speakers/partybox-speaker-detail.webp', alt: 'Rechargeable wireless UHF karaoke microphone and control panel' }
    ],
    owner: {
      name: 'Kavita Joshi',
      rating: 4.97,
      reviewsCount: 65,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'KJ',
      phone: '+91 94227 55901',
      area: 'CIDCO N-2'
    },
    description: 'The ultimate party and event sound solution. 100 watts of powerful JBL Original Pro Sound with punchy bass, synced dynamic light show that dances to the beat, splashproof IPX4 design, and included rechargeable wireless karaoke microphone with echo controls.',
    specs: ['100W RMS Output with Bass Boost', 'Rechargeable Wireless UHF Mic Included', 'Synced Multi-Color Lightshow', 'Up to 10 Hours Battery + AC Power'],
    aliases: ['party speaker', 'speaker', 'jbl', 'partybox', 'mic', 'karaoke', 'party', 'bluetooth speaker'],
    featured: true,
    momentSlug: 'music-and-parties'
  },
  {
    id: 'onr-spk-02',
    name: 'Marshall Stanmore III Bluetooth Home Speaker',
    title: 'Marshall Stanmore III Bluetooth Home Speaker (80W, Brass Knobs, Black)',
    productType: 'Speakers',
    brand: 'Marshall',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 320,
    deposit: 1900,
    protectionFee: 89,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.4,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.96,
    reviewsCount: 39,
    images: [
      { url: './images/products/speakers/marshall-stanmore-front.webp', alt: 'Marshall Stanmore III Bluetooth speaker with vintage script front view' },
      { url: './images/products/speakers/marshall-stanmore-angle.webp', alt: 'Marshall Stanmore III brass grill and textured vinyl angled view' },
      { url: './images/products/speakers/marshall-stanmore-detail.webp', alt: 'Marshall Stanmore III brass analog control knobs for bass and treble' }
    ],
    owner: {
      name: 'Aditya Deshmukh',
      rating: 4.98,
      reviewsCount: 62,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'AD',
      phone: '+91 98220 14892',
      area: 'Samarth Nagar'
    },
    description: 'Iconic vintage Marshall design with room-filling, expansive stereo soundstage. 80W total power with 50W class D amplifier for woofer and two 15W tweeters. Brass analog knobs for bass, treble, and volume control with RCA and 3.5mm inputs.',
    specs: ['80W Total Class D Amplification', 'Two Tweeters + 50W Subwoofer', 'Analog Brass Rotary Controls', 'Bluetooth 5.2 + RCA & 3.5mm Aux'],
    aliases: ['marshall', 'speaker', 'stanmore', 'vintage speaker', 'bluetooth speaker'],
    featured: false,
    momentSlug: 'music-and-parties'
  },
  {
    id: 'onr-spk-03',
    name: 'Bose SoundLink Revolve+ II 360Â° Speaker',
    title: 'Bose SoundLink Revolve+ II Portable 360Â° Bluetooth Speaker (Triple Black)',
    productType: 'Speakers',
    brand: 'Bose',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 260,
    deposit: 1400,
    protectionFee: 69,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Osmanpura',
    distanceKm: 1.9,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.93,
    reviewsCount: 31,
    images: [
      { url: './images/products/speakers/bose-revolve-front.webp', alt: 'Bose SoundLink Revolve+ II 360-degree cylindrical speaker front' },
      { url: './images/products/speakers/bose-revolve-angle.webp', alt: 'Bose SoundLink Revolve+ II portable outdoor angled view' },
      { url: './images/products/speakers/bose-revolve-detail.webp', alt: 'Bose SoundLink Revolve+ II flexible fabric handle and silicone buttons' }
    ],
    owner: {
      name: 'Pooja Kulkarni',
      rating: 4.94,
      reviewsCount: 29,
      verified: true,
      joinedDate: 'Mar 2025',
      avatar: 'PK',
      phone: '+91 94231 88204',
      area: 'Osmanpura'
    },
    description: 'Deep, jaw-dropping 360-degree sound with consistent, uniform acoustic coverage. Seamless aluminum body with flexible fabric handle for portability, IP55 water and dust resistance, and 17 hours of battery runtime.',
    specs: ['True 360-Degree Sound Dispersion', '17-Hour Battery Runtime', 'Seamless Aluminum Chassis', 'IP55 Water-Resistant Design'],
    aliases: ['bose', 'revolve', 'speaker', 'portable speaker', 'bluetooth speaker'],
    featured: false,
    momentSlug: 'music-and-parties'
  },
  {
    id: 'onr-spk-04',
    name: 'JBL Boombox 3 Portable Bluetooth Speaker',
    title: 'JBL Boombox 3 Portable Bluetooth Speaker (180W, Monstrous Bass)',
    productType: 'Speakers',
    brand: 'JBL',
    category: 'Audio',
    categorySlug: 'audio',
    dailyPrice: 380,
    deposit: 2500,
    protectionFee: 99,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Kranti Chowk',
    distanceKm: 1.2,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.92,
    reviewsCount: 44,
    images: [
      { url: './images/products/speakers/jbl-boombox3-front.webp', alt: 'JBL Boombox 3 portable high-power Bluetooth speaker front view' },
      { url: './images/products/speakers/jbl-boombox3-angle.webp', alt: 'JBL Boombox 3 side subwoofer radiator and metal handle angled' },
      { url: './images/products/speakers/jbl-boombox3-detail.webp', alt: 'JBL Boombox 3 heavy-duty silicone grip handle and IP67 weather seals' }
    ],
    owner: {
      name: 'Nitin Gore',
      rating: 4.92,
      reviewsCount: 44,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'NG',
      phone: '+91 98811 90234',
      area: 'Kranti Chowk'
    },
    description: 'Monstrous sound featuring a powerful subwoofer for deeper bass and crisp acoustic detail. Sturdy metal handle with silicone grip, IP67 waterproof and dustproof build, and built-in USB device charger to charge phones while playing music.',
    specs: ['3-Way Speaker Acoustic System', '24 Hours Playtime + Phone Charging', 'IP67 Waterproof & Dustproof', 'PartyBoost Multi-Speaker Pairing'],
    aliases: ['boombox', 'jbl', 'party speaker', 'loud speaker', 'bluetooth speaker'],
    featured: false,
    momentSlug: 'music-and-parties'
  },

  // =========================================================================
  // 3. LAPTOPS (4 listings - High deposits: â‚¹5,000 - â‚¹6,500)
  // =========================================================================
  {
    id: 'onr-lap-01',
    name: 'Dell Inspiron 15 Core i7 Laptop (16GB RAM / 512GB SSD)',
    title: 'Dell Inspiron 15 Laptop (Intel Core i7-1355U, 16GB RAM, 512GB SSD, FHD 120Hz)',
    productType: 'Laptops',
    brand: 'Dell',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 550,
    deposit: 5000,
    protectionFee: 149,
    location: 'Chhatrapati Sambhajinagar',
    area: 'CIDCO N-5',
    distanceKm: 2.8,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.93,
    reviewsCount: 38,
    images: [
      { url: './images/products/laptops/dell-inspiron15-front.webp', alt: 'Dell Inspiron 15 Core i7 laptop open on desk, front display view' },
      { url: './images/products/laptops/dell-inspiron15-angle.webp', alt: 'Dell Inspiron 15 laptop angled profile showing backlit keyboard' },
      { url: './images/products/laptops/dell-inspiron15-detail.webp', alt: 'Dell Inspiron 15 original 65W AC charger and HDMI/USB-C ports' }
    ],
    owner: {
      name: 'Rohan Patil',
      rating: 4.99,
      reviewsCount: 54,
      verified: true,
      joinedDate: 'Nov 2024',
      avatar: 'RP',
      phone: '+91 98901 33201',
      area: 'CIDCO N-5'
    },
    description: 'High-performance work and productivity laptop. 13th Gen Intel Core i7 processor, 16GB DDR4 RAM, 512GB NVMe SSD, 15.6-inch Full HD display with 120Hz refresh rate, backlit keyboard, and Windows 11 Pro. Includes original 65W charger and laptop sleeve.',
    specs: ['Intel Core i7-1355U (10 Cores)', '16GB RAM / 512GB NVMe SSD', '15.6" FHD 120Hz Anti-Glare Screen', 'Windows 11 Pro + MS Office'],
    aliases: ['dell', 'laptop', 'intel i7', 'windows laptop', 'computer'],
    featured: true,
    momentSlug: 'work-and-study'
  },
  {
    id: 'onr-lap-02',
    name: 'Lenovo ThinkPad T14 Gen 4 Business Laptop',
    title: 'Lenovo ThinkPad T14 Gen 4 (AMD Ryzen 7 PRO, 16GB RAM, 512GB SSD)',
    productType: 'Laptops',
    brand: 'Lenovo',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 480,
    deposit: 5000,
    protectionFee: 129,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Osmanpura',
    distanceKm: 1.8,
    condition: 'Excellent',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.96,
    reviewsCount: 41,
    images: [
      { url: './images/products/laptops/lenovo-thinkpad-front.webp', alt: 'Lenovo ThinkPad T14 business laptop with anti-glare screen front' },
      { url: './images/products/laptops/lenovo-thinkpad-angle.webp', alt: 'Lenovo ThinkPad T14 rugged matte black unibody angled view' },
      { url: './images/products/laptops/lenovo-thinkpad-detail.webp', alt: 'Lenovo ThinkPad TrackPoint red cap and 65W USB-C fast charger' }
    ],
    owner: {
      name: 'Amit Varma',
      rating: 4.95,
      reviewsCount: 38,
      verified: true,
      joinedDate: 'Feb 2025',
      avatar: 'AV',
      phone: '+91 98600 12894',
      area: 'Osmanpura'
    },
    description: 'The definitive corporate and coding laptop. Built to military MIL-STD-810H durability standards with legendary spill-resistant keyboard, TrackPoint navigation, AMD Ryzen 7 PRO performance, and all-day 14-hour battery with Rapid Charge.',
    specs: ['AMD Ryzen 7 PRO 7840U Processor', '16GB LPDDR5X RAM / 512GB SSD', 'MIL-STD-810H Military Durability', 'Spill-Resistant Ergonomic Keyboard'],
    aliases: ['lenovo', 'thinkpad', 'laptop', 'business laptop', 'coding'],
    featured: false,
    momentSlug: 'work-and-study'
  },
  {
    id: 'onr-lap-03',
    name: 'ASUS ROG Zephyrus G14 Gaming Laptop',
    title: 'ASUS ROG Zephyrus G14 (AMD Ryzen 9 7940HS, RTX 4060, 16GB, 1TB SSD)',
    productType: 'Laptops',
    brand: 'ASUS',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 720,
    deposit: 6500,
    protectionFee: 189,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.7,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.98,
    reviewsCount: 52,
    images: [
      { url: './images/products/laptops/asus-zephyrus-front.webp', alt: 'ASUS ROG Zephyrus G14 gaming laptop with QHD display front view' },
      { url: './images/products/laptops/asus-zephyrus-angle.webp', alt: 'ASUS ROG Zephyrus G14 sharp magnesium alloy chassis angled view' },
      { url: './images/products/laptops/asus-zephyrus-detail.webp', alt: 'ASUS ROG Zephyrus 240W power adapter and rear cooling vents' }
    ],
    owner: {
      name: 'Aditya Deshmukh',
      rating: 4.98,
      reviewsCount: 62,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'AD',
      phone: '+91 98220 14892',
      area: 'Samarth Nagar'
    },
    description: 'Powerhouse ultrabook for video rendering, Unreal Engine, 3D modelling and AAA gaming. ROG Nebula QHD 165Hz display, NVIDIA GeForce RTX 4060 8GB GPU, vapour chamber liquid metal cooling, and compact 1.65kg magnesium-aluminium chassis.',
    specs: ['AMD Ryzen 9 7940HS (8 Cores/16 Threads)', 'NVIDIA GeForce RTX 4060 8GB VRAM', '14" QHD+ 165Hz ROG Nebula Display', '16GB DDR5 RAM / 1TB NVMe SSD'],
    aliases: ['asus', 'rog', 'zephyrus', 'gaming laptop', 'rtx 4060', 'laptop'],
    featured: true,
    momentSlug: 'work-and-study'
  },
  {
    id: 'onr-lap-04',
    name: 'HP Envy x360 2-in-1 Touchscreen Laptop',
    title: 'HP Envy x360 15.6" Convertible (Intel Core i5-1335U, 16GB, Touch + Pen)',
    productType: 'Laptops',
    brand: 'HP',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 520,
    deposit: 5000,
    protectionFee: 139,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Cannaught Place',
    distanceKm: 2.6,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.91,
    reviewsCount: 30,
    images: [
      { url: './images/products/laptops/hp-envy-front.webp', alt: 'HP Envy x360 2-in-1 touchscreen convertible laptop front view' },
      { url: './images/products/laptops/hp-envy-angle.webp', alt: 'HP Envy x360 360-degree geared hinge in tent mode angled' },
      { url: './images/products/laptops/hp-envy-detail.webp', alt: 'HP Envy x360 active rechargeable stylus pen and USB-C power kit' }
    ],
    owner: {
      name: 'Tanmay Kale',
      rating: 4.99,
      reviewsCount: 74,
      verified: true,
      joinedDate: 'Oct 2024',
      avatar: 'TK',
      phone: '+91 98225 67104',
      area: 'Cannaught Place'
    },
    description: 'Versatile 2-in-1 convertible for design, sketching, and presentation. 360-degree geared hinge smoothly shifts into laptop, tent, stand, or tablet mode. Includes active rechargeable stylus pen and HP fast-charge USB-C power brick.',
    specs: ['Intel Core i5-1335U 10-Core Processor', '15.6" Full HD IPS Touchscreen Display', '360Â° Convertible Hinge + Stylus Pen Included', '16GB RAM / 512GB PCIe SSD'],
    aliases: ['hp', 'envy', 'touchscreen laptop', 'convertible', 'laptop', 'stylus'],
    featured: false,
    momentSlug: 'work-and-study'
  },

  // =========================================================================
  // 4. iPHONES (4 listings - High deposits: â‚¹5,000 - â‚¹7,500)
  // =========================================================================
  {
    id: 'onr-iph-01',
    name: 'Apple iPhone 15 Pro Max (256GB - 4K ProRes)',
    title: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium, 5x Optical Zoom)',
    productType: 'iPhones',
    brand: 'Apple',
    category: 'Phones',
    categorySlug: 'phones',
    dailyPrice: 650,
    deposit: 7500,
    protectionFee: 179,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.6,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.99,
    reviewsCount: 64,
    images: [
      { url: './images/products/iphones/iphone15-promax-front.webp', alt: 'Apple iPhone 15 Pro Max Natural Titanium front with Dynamic Island' },
      { url: './images/products/iphones/iphone15-promax-angle.webp', alt: 'Apple iPhone 15 Pro Max brushed titanium frame and curved edges angled' },
      { url: './images/products/iphones/iphone15-promax-detail.webp', alt: 'Apple iPhone 15 Pro Max 5x telephoto camera and braided USB-C cable' }
    ],
    owner: {
      name: 'Aditya Deshmukh',
      rating: 4.98,
      reviewsCount: 62,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'AD',
      phone: '+91 98220 14892',
      area: 'Samarth Nagar'
    },
    description: 'Aerospace-grade titanium design with textured matte glass back. A17 Pro chip, Action button, 48MP main camera with next-generation portraits, 5x optical telephoto zoom lens, 4K 60fps ProRes recording to external SSD, and USB-C connectivity.',
    specs: ['6.7" Super Retina XDR OLED (120Hz)', 'A17 Pro 3nm Silicon Chip', '48MP Pro Triple Camera + 5x Optical Zoom', '4K 60fps ProRes Video with Log Encoding'],
    aliases: ['iphone', 'iphone 15 pro max', 'apple', 'smartphone', 'mobile', 'ios'],
    featured: true,
    momentSlug: 'phone-upgrade'
  },
  {
    id: 'onr-iph-02',
    name: 'Apple iPhone 15 Pro (128GB - Natural Titanium)',
    title: 'Apple iPhone 15 Pro (128GB, Natural Titanium, A17 Pro, Action Button)',
    productType: 'iPhones',
    brand: 'Apple',
    category: 'Phones',
    categorySlug: 'phones',
    dailyPrice: 590,
    deposit: 6500,
    protectionFee: 159,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Osmanpura',
    distanceKm: 2.0,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.97,
    reviewsCount: 46,
    images: [
      { url: './images/products/iphones/iphone15-pro-front.webp', alt: 'Apple iPhone 15 Pro Super Retina XDR OLED display front view' },
      { url: './images/products/iphones/iphone15-pro-angle.webp', alt: 'Apple iPhone 15 Pro titanium chassis and Action Button angled' },
      { url: './images/products/iphones/iphone15-pro-detail.webp', alt: 'Apple iPhone 15 Pro triple camera lens module close-up' }
    ],
    owner: {
      name: 'Amit Varma',
      rating: 4.95,
      reviewsCount: 38,
      verified: true,
      joinedDate: 'Feb 2025',
      avatar: 'AV',
      phone: '+91 98600 12894',
      area: 'Osmanpura'
    },
    description: 'Compact 6.1-inch titanium flagship. Unlocked for all Indian carriers, clean battery health (100%), and pristine camera lenses. Includes 20W Apple fast charger, braided USB-C cable, and MagSafe silicone case.',
    specs: ['6.1" ProMotion 120Hz Always-On OLED', 'A17 Pro Chip with Hardware Ray Tracing', '48MP Main / 3x Optical Telephoto', 'USB-C with USB 3 Speeds (10Gbps)'],
    aliases: ['iphone 15 pro', 'iphone', 'apple', 'smartphone', 'pro camera'],
    featured: false,
    momentSlug: 'phone-upgrade'
  },
  {
    id: 'onr-iph-03',
    name: 'Apple iPhone 15 (128GB - Dynamic Island, Blue)',
    title: 'Apple iPhone 15 (128GB, Dynamic Island, 48MP Main Camera, Blue)',
    productType: 'iPhones',
    brand: 'Apple',
    category: 'Phones',
    categorySlug: 'phones',
    dailyPrice: 450,
    deposit: 5000,
    protectionFee: 129,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Cannaught Place',
    distanceKm: 2.3,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.93,
    reviewsCount: 37,
    images: [
      { url: './images/products/iphones/iphone15-front.webp', alt: 'Apple iPhone 15 in Blue finish front view with Dynamic Island' },
      { url: './images/products/iphones/iphone15-angle.webp', alt: 'Apple iPhone 15 color-infused back glass angled view' },
      { url: './images/products/iphones/iphone15-detail.webp', alt: 'Apple iPhone 15 48MP main camera and original USB-C cable' }
    ],
    owner: {
      name: 'Tanmay Kale',
      rating: 4.99,
      reviewsCount: 74,
      verified: true,
      joinedDate: 'Oct 2024',
      avatar: 'TK',
      phone: '+91 98225 67104',
      area: 'Cannaught Place'
    },
    description: 'Featuring the innovative Dynamic Island, powerful 48MP main camera with 2x optical-quality telephoto, color-infused back glass, A16 Bionic chip, and universally compatible USB-C port.',
    specs: ['Dynamic Island Interactive Alerts', '48MP Main Camera with 2x Telephoto', 'A16 Bionic 6-Core Processor', 'All-Day Battery Life with USB-C'],
    aliases: ['iphone 15', 'iphone', 'apple', 'ios', 'smartphone'],
    featured: false,
    momentSlug: 'phone-upgrade'
  },
  {
    id: 'onr-iph-04',
    name: 'Apple iPhone 14 Pro (256GB - Deep Purple, 48MP)',
    title: 'Apple iPhone 14 Pro (256GB, Deep Purple, Always-On Display, 48MP)',
    productType: 'iPhones',
    brand: 'Apple',
    category: 'Phones',
    categorySlug: 'phones',
    dailyPrice: 520,
    deposit: 5500,
    protectionFee: 139,
    location: 'Chhatrapati Sambhajinagar',
    area: 'CIDCO N-3',
    distanceKm: 2.9,
    condition: 'Excellent',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.94,
    reviewsCount: 51,
    images: [
      { url: './images/products/iphones/iphone14-pro-front.webp', alt: 'Apple iPhone 14 Pro Deep Purple front view with Always-On display' },
      { url: './images/products/iphones/iphone14-pro-angle.webp', alt: 'Apple iPhone 14 Pro textured matte glass back angled view' },
      { url: './images/products/iphones/iphone14-pro-detail.webp', alt: 'Apple iPhone 14 Pro stainless steel sides and camera lenses' }
    ],
    owner: {
      name: 'Kavita Joshi',
      rating: 4.97,
      reviewsCount: 65,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'KJ',
      phone: '+91 94227 55901',
      area: 'CIDCO N-3'
    },
    description: 'Striking Deep Purple finish with medical-grade stainless steel frame. Always-On display, Dynamic Island, Action Mode for gimbal-like video stabilization, and Cinematic 4K video recording.',
    specs: ['48MP Pro RAW Camera System', 'Always-On Super Retina XDR Display', 'Action Mode Smooth Video', 'A16 Bionic High Performance Chip'],
    aliases: ['iphone 14 pro', 'deep purple', 'apple', 'iphone', 'smartphone'],
    featured: false,
    momentSlug: 'phone-upgrade'
  },

  // =========================================================================
  // 5. MacBooks (4 listings - High deposits: â‚¹4,500 - â‚¹8,500)
  // =========================================================================
  {
    id: 'onr-mac-01',
    name: 'Apple MacBook Pro 16" (M2 Max, 32GB RAM, 1TB SSD)',
    title: 'MacBook Pro 16" (Apple M2 Max 12-Core, 38-Core GPU, 32GB RAM, 1TB SSD)',
    productType: 'MacBooks',
    brand: 'Apple',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 890,
    deposit: 8500,
    protectionFee: 249,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.6,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.99,
    reviewsCount: 57,
    images: [
      { url: './images/products/macbooks/macbook-pro16-front.webp', alt: 'Apple MacBook Pro 16 Liquid Retina XDR display front view' },
      { url: './images/products/macbooks/macbook-pro16-angle.webp', alt: 'Apple MacBook Pro 16 Space Grey aluminum unibody angled view' },
      { url: './images/products/macbooks/macbook-pro16-detail.webp', alt: 'Apple MacBook Pro 140W USB-C Power Adapter and MagSafe 3 cable' }
    ],
    owner: {
      name: 'Aditya Deshmukh',
      rating: 4.98,
      reviewsCount: 62,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'AD',
      phone: '+91 98220 14892',
      area: 'Samarth Nagar'
    },
    description: 'Ultimate creative workstation. Massive 16.2-inch Liquid Retina XDR display with 1600 nits peak brightness and ProMotion 120Hz. M2 Max silicon with 32GB unified memory handles multiple 8K video streams and complex 3D renders with ease.',
    specs: ['Apple M2 Max 12-Core CPU / 38-Core GPU', '32GB Unified Memory / 1TB High-Speed SSD', '16.2" Liquid Retina XDR Screen (120Hz)', '140W MagSafe Fast Charger Included'],
    aliases: ['macbook pro 16', 'm2 max', 'macbook', 'apple', 'laptop', 'macbook pro'],
    featured: true,
    momentSlug: 'work-and-study'
  },
  {
    id: 'onr-mac-02',
    name: 'Apple MacBook Pro 14 M3 Pro (18GB RAM / 512GB SSD)',
    title: 'MacBook Pro 14" (M3 Pro Chip, Space Black, 18GB, 512GB SSD)',
    productType: 'MacBooks',
    brand: 'Apple',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 780,
    deposit: 7500,
    protectionFee: 219,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Osmanpura',
    distanceKm: 2.1,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.98,
    reviewsCount: 36,
    images: [
      { url: './images/products/macbooks/macbook-pro14-front.webp', alt: 'Apple MacBook Pro 14 in Space Black finish front view' },
      { url: './images/products/macbooks/macbook-pro14-angle.webp', alt: 'Apple MacBook Pro 14 anodized aluminum edge and keyboard angled' },
      { url: './images/products/macbooks/macbook-pro14-detail.webp', alt: 'Apple MacBook Pro 70W USB-C adapter and braided charging cable' }
    ],
    owner: {
      name: 'Amit Varma',
      rating: 4.95,
      reviewsCount: 38,
      verified: true,
      joinedDate: 'Feb 2025',
      avatar: 'AV',
      phone: '+91 98600 12894',
      area: 'Osmanpura'
    },
    description: 'Next-generation 3nm Apple silicon in sleek anodized Space Black. Hardware-accelerated ray tracing, 18GB unified memory, Liquid Retina XDR screen with ProMotion, MagSafe 3 charging, and up to 18 hours battery life. Includes 70W USB-C power adapter.',
    specs: ['Apple M3 Pro 11-Core CPU / 14-Core GPU', '18GB Unified Memory / 512GB SSD', '14.2" Liquid Retina XDR ProMotion', 'Hardware Ray Tracing Engine'],
    aliases: ['macbook pro 14', 'm3 pro', 'macbook', 'apple', 'laptop', 'macos'],
    featured: false,
    momentSlug: 'work-and-study'
  },
  {
    id: 'onr-mac-03',
    name: 'Apple MacBook Air M2 (13.6-inch, Midnight, 16GB RAM)',
    title: 'MacBook Air 13.6" M2 (16GB RAM, 512GB SSD, Midnight)',
    productType: 'MacBooks',
    brand: 'Apple',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 580,
    deposit: 5500,
    protectionFee: 159,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Cannaught Place',
    distanceKm: 2.5,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.95,
    reviewsCount: 49,
    images: [
      { url: './images/products/macbooks/macbook-air-m2-front.webp', alt: 'Apple MacBook Air 13.6 M2 in Midnight dark blue front view' },
      { url: './images/products/macbooks/macbook-air-m2-angle.webp', alt: 'Apple MacBook Air M2 ultra-thin 11.3mm profile angled view' },
      { url: './images/products/macbooks/macbook-air-m2-detail.webp', alt: 'Apple MacBook Air M2 Magic Keyboard, Touch ID and MagSafe port' }
    ],
    owner: {
      name: 'Tanmay Kale',
      rating: 4.99,
      reviewsCount: 74,
      verified: true,
      joinedDate: 'Oct 2024',
      avatar: 'TK',
      phone: '+91 98225 67104',
      area: 'Cannaught Place'
    },
    description: 'Impossibly thin 11.3mm fanless aluminum unibody. Fast Apple M2 chip with 16GB unified RAM upgrade, vibrant 13.6-inch Liquid Retina display (500 nits), 1080p FaceTime HD camera, four-speaker sound system with Spatial Audio, and 18 hours battery.',
    specs: ['Apple M2 8-Core CPU / 10-Core GPU', '16GB Unified RAM Upgrade', '13.6" Liquid Retina Screen (500 nits)', 'Fanless Silent Operation'],
    aliases: ['macbook air', 'm2 air', 'macbook', 'apple', 'macbook air m2', 'laptop'],
    featured: true,
    momentSlug: 'work-and-study'
  },
  {
    id: 'onr-mac-04',
    name: 'Apple MacBook Air M1 (13.3-inch, Space Grey, 256GB)',
    title: 'MacBook Air M1 (8GB RAM, 256GB SSD, Retina Display)',
    productType: 'MacBooks',
    brand: 'Apple',
    category: 'Computers',
    categorySlug: 'computers',
    dailyPrice: 450,
    deposit: 4500,
    protectionFee: 129,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.5,
    condition: 'Excellent',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.92,
    reviewsCount: 63,
    images: [
      { url: './images/products/macbooks/macbook-air-m1-front.webp', alt: 'Apple MacBook Air M1 13.3-inch Retina display front view' },
      { url: './images/products/macbooks/macbook-air-m1-angle.webp', alt: 'Apple MacBook Air M1 tapered aluminum wedge chassis angled' },
      { url: './images/products/macbooks/macbook-air-m1-detail.webp', alt: 'Apple MacBook Air 30W USB-C charger and dual Thunderbolt ports' }
    ],
    owner: {
      name: 'Pooja Kulkarni',
      rating: 4.94,
      reviewsCount: 29,
      verified: true,
      joinedDate: 'Mar 2025',
      avatar: 'PK',
      phone: '+91 94231 88204',
      area: 'Samarth Nagar'
    },
    description: 'The proven workhorse for students, developers, and writers. Groundbreaking Apple M1 chip delivers fast everyday performance with zero fan noise. High-resolution Retina display, backlit Magic Keyboard, Touch ID login, and 18-hour battery.',
    specs: ['Apple M1 8-Core System-on-Chip', '8GB Unified Memory / 256GB SSD', '13.3" Retina Display with P3 Color', 'Silent Fanless Design'],
    aliases: ['macbook air m1', 'm1 macbook', 'apple macbook', 'macbook', 'laptop'],
    featured: false,
    momentSlug: 'work-and-study'
  },

  // =========================================================================
  // 6. DSLR CAMERAS (4 listings - High deposits: â‚¹4,000 - â‚¹7,500)
  // [Keep Canon Creator Kit â‚¹499/day]
  // =========================================================================
  {
    id: 'onr-cam-01',
    name: 'Canon Creator Kit (EOS R50 + Mic + Grip)',
    title: 'Canon Creator Kit (EOS R50 + Shotgun Mic + Tripod Grip)',
    productType: 'DSLR cameras',
    brand: 'Canon',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 499,
    deposit: 4000,
    protectionFee: 149,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.8,
    condition: 'Like New',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.96,
    reviewsCount: 48,
    images: [
      { url: './images/products/dslr/canon-creator-kit-front.webp', alt: 'Canon Creator Kit EOS R50 4K camera with 18-45mm lens front view' },
      { url: './images/products/dslr/canon-creator-kit-angle.webp', alt: 'Canon EOS R50 camera mounted on tripod handgrip with wireless remote' },
      { url: './images/products/dslr/canon-creator-kit-detail.webp', alt: 'Canon DM-E100 directional microphone, dual batteries and 128GB SD' }
    ],
    owner: {
      name: 'Aditya Deshmukh',
      rating: 4.98,
      reviewsCount: 62,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'AD',
      phone: '+91 98220 14892',
      area: 'Samarth Nagar'
    },
    description: 'Complete all-in-one vlogging and content creation kit. Includes Canon EOS R50 4K camera with 18-45mm IS STM lens, DM-E100 directional stereo microphone, HG-100TBR wireless tripod grip, 2 LP-E17 batteries, 128GB SanDisk Extreme Pro V30 card, and rugged carry bag. Perfect for YouTube shoots, reels, and wedding events.',
    specs: [
      '24.2 MP APS-C CMOS Sensor',
      'Uncropped 4K 30p Video',
      'Tripod Handgrip with Bluetooth Remote',
      'Dual Battery + 128GB V30 High Speed SD'
    ],
    aliases: ['canon', 'creator kit', 'camera', 'vlogging', 'dslr', 'eos r50', 'mic', 'youtube'],
    featured: true,
    momentSlug: 'create-something'
  },
  {
    id: 'onr-cam-02',
    name: 'Nikon Z6 II Full-Frame Mirrorless DSLR',
    title: 'Nikon Z6 II Body (24.5MP Full-Frame, Dual EXPEED 6, 4K 60p)',
    productType: 'DSLR cameras',
    brand: 'Nikon',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 750,
    deposit: 6500,
    protectionFee: 199,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Osmanpura',
    distanceKm: 2.4,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.92,
    reviewsCount: 33,
    images: [
      { url: './images/products/dslr/nikon-z6ii-front.webp', alt: 'Nikon Z6 II 24.5MP full-frame mirrorless camera body front view' },
      { url: './images/products/dslr/nikon-z6ii-angle.webp', alt: 'Nikon Z6 II ergonomic grip and top OLED control panel angled' },
      { url: './images/products/dslr/nikon-z6ii-detail.webp', alt: 'Nikon Z6 II clean sensor bayonet mount and dual card slots' }
    ],
    owner: {
      name: 'Pooja Kulkarni',
      rating: 4.94,
      reviewsCount: 29,
      verified: true,
      joinedDate: 'Mar 2025',
      avatar: 'PK',
      phone: '+91 94231 88204',
      area: 'Osmanpura'
    },
    description: 'Professional 24.5MP full-frame camera with dual EXPEED 6 processors, 4K 60p video, 5-axis in-body image stabilization, twin card slots (CFexpress + SD), and 14 fps continuous shooting. Supplied with two EN-EL15c batteries, dual charger, and weather-sealed sling bag.',
    specs: ['24.5MP BSI CMOS Sensor', 'Dual EXPEED 6 Image Processors', '4K 60p Video Recording', '5-Axis Sensor-Shift VR'],
    aliases: ['nikon', 'dslr', 'full frame', 'z6', 'z6 ii', 'camera', 'dslr camera'],
    featured: false,
    momentSlug: 'create-something'
  },
  {
    id: 'onr-cam-03',
    name: 'Canon EOS 5D Mark IV Professional DSLR Body',
    title: 'Canon EOS 5D Mark IV (30.4MP Full-Frame, Dual Pixel RAW, 4K)',
    productType: 'DSLR cameras',
    brand: 'Canon',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 690,
    deposit: 6000,
    protectionFee: 189,
    location: 'Chhatrapati Sambhajinagar',
    area: 'CIDCO N-4',
    distanceKm: 3.1,
    condition: 'Excellent',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.95,
    reviewsCount: 52,
    images: [
      { url: './images/products/dslr/canon-5d-iv-front.webp', alt: 'Canon EOS 5D Mark IV professional full-frame DSLR body front view' },
      { url: './images/products/dslr/canon-5d-iv-angle.webp', alt: 'Canon 5D Mark IV weather-sealed magnesium body angled view' },
      { url: './images/products/dslr/canon-5d-iv-detail.webp', alt: 'Canon 5D Mark IV top status LCD screen, dual batteries and charger' }
    ],
    owner: {
      name: 'Rohan Patil',
      rating: 4.99,
      reviewsCount: 54,
      verified: true,
      joinedDate: 'Nov 2024',
      avatar: 'RP',
      phone: '+91 98901 33201',
      area: 'CIDCO N-4'
    },
    description: 'The legendary wedding and portrait workhorse. 30.4MP full-frame CMOS sensor, DIGIC 6+ image processor, 61-point High Density Reticular AF II system, Dual Pixel CMOS AF, DCI 4K video recording, and rugged magnesium alloy weather sealing.',
    specs: ['30.4MP Full-Frame CMOS Sensor', '61-Point High Density AF System', 'Dual Pixel RAW Microadjustment', 'DCI 4K Video Internal'],
    aliases: ['canon', '5d mark iv', '5d', 'dslr', 'camera', 'wedding camera'],
    featured: false,
    momentSlug: 'create-something'
  },
  {
    id: 'onr-cam-04',
    name: 'Sony Alpha A7 IV Full-Frame Camera Body',
    title: 'Sony Alpha A7 IV (33MP Exmor R, BIONZ XR, 4K 60p, 10-bit 4:2:2)',
    productType: 'DSLR cameras',
    brand: 'Sony',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 820,
    deposit: 7500,
    protectionFee: 229,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.6,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.99,
    reviewsCount: 67,
    images: [
      { url: './images/products/dslr/sony-a7iv-front.webp', alt: 'Sony Alpha A7 IV 33MP hybrid full-frame camera body front view' },
      { url: './images/products/dslr/sony-a7iv-angle.webp', alt: 'Sony Alpha A7 IV control dials, custom buttons and deep grip angled' },
      { url: './images/products/dslr/sony-a7iv-detail.webp', alt: 'Sony Alpha A7 IV articulating touchscreen display and ports' }
    ],
    owner: {
      name: 'Aditya Deshmukh',
      rating: 4.98,
      reviewsCount: 62,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'AD',
      phone: '+91 98220 14892',
      area: 'Samarth Nagar'
    },
    description: 'State-of-the-art hybrid camera for stills and filmmaking. 33MP full-frame back-illuminated sensor, next-gen BIONZ XR engine, AI real-time autofocus with human/animal/bird eye tracking, S-Cinetone color profile, and breathing compensation.',
    specs: ['33MP Full-Frame Exmor R Sensor', 'BIONZ XR Image Processor', 'Real-Time Eye AF & Touch Tracking', '4K 60p 10-Bit 4:2:2 All-Intra'],
    aliases: ['sony', 'a7 iv', 'alpha', 'sony camera', 'full frame', 'dslr camera'],
    featured: true,
    momentSlug: 'create-something'
  },

  // =========================================================================
  // 7. DSLR LENSES (4 listings - High deposits: â‚¹4,000 - â‚¹6,000)
  // =========================================================================
  {
    id: 'onr-len-01',
    name: 'Sony FE 24-70mm f/2.8 GM II G-Master Lens',
    title: 'Sony FE 24-70mm f/2.8 GM II E-Mount Lens (Nano AR II, Quad XD)',
    productType: 'DSLR lenses',
    brand: 'Sony',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 599,
    deposit: 5500,
    protectionFee: 179,
    location: 'Chhatrapati Sambhajinagar',
    area: 'CIDCO N-4',
    distanceKm: 3.1,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 5.0,
    reviewsCount: 27,
    images: [
      { url: './images/products/lenses/sony-24-70-front.webp', alt: 'Sony FE 24-70mm f/2.8 GM II G-Master lens front optical glass element' },
      { url: './images/products/lenses/sony-24-70-angle.webp', alt: 'Sony 24-70mm f/2.8 GM II zoom barrel and aperture click switch angled' },
      { url: './images/products/lenses/sony-24-70-detail.webp', alt: 'Sony 24-70mm GM II metal bayonet mount, hood and protective cap' }
    ],
    owner: {
      name: 'Rohan Patil',
      rating: 4.99,
      reviewsCount: 54,
      verified: true,
      joinedDate: 'Nov 2024',
      avatar: 'RP',
      phone: '+91 98901 33201',
      area: 'CIDCO N-4'
    },
    description: 'The standard zoom holy grail lens for Sony Alpha E-mount full-frame cameras. Razor-sharp optics, constant f/2.8 aperture, lightning-fast quad XD linear AF motors, and creamy 11-blade circular bokeh. Comes with hood, UV filter, and lens cap.',
    specs: ['E-Mount Lens / Full-Frame', 'Aperture Range: f/2.8 to f/22', 'Four XD Linear AF Motors', 'Nano AR Coating II'],
    aliases: ['lens', 'sony lens', 'g master', '24-70', 'f2.8', 'camera lens', 'dslr lens'],
    featured: true,
    momentSlug: 'create-something'
  },
  {
    id: 'onr-len-02',
    name: 'Canon RF 70-200mm f/2.8L IS USM Telephoto Lens',
    title: 'Canon RF 70-200mm f/2.8L IS USM (5-Stop Optical Image Stabilizer)',
    productType: 'DSLR lenses',
    brand: 'Canon',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 680,
    deposit: 6000,
    protectionFee: 199,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Samarth Nagar',
    distanceKm: 1.7,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.98,
    reviewsCount: 31,
    images: [
      { url: './images/products/lenses/canon-70-200-front.webp', alt: 'Canon RF 70-200mm f/2.8L IS USM professional white telephoto lens front' },
      { url: './images/products/lenses/canon-70-200-angle.webp', alt: 'Canon RF 70-200mm f/2.8L compact zoom barrel and tripod ring angled' },
      { url: './images/products/lenses/canon-70-200-detail.webp', alt: 'Canon RF 70-200mm optical stabilization switches and lens hood' }
    ],
    owner: {
      name: 'Aditya Deshmukh',
      rating: 4.98,
      reviewsCount: 62,
      verified: true,
      joinedDate: 'Jan 2025',
      avatar: 'AD',
      phone: '+91 98220 14892',
      area: 'Samarth Nagar'
    },
    description: 'Flagship L-series professional telephoto zoom lens. Incredibly compact retractable design, constant f/2.8 aperture, dual Nano USM focus motors, 5-stop optical image stabilization, customizable control ring, and weather-resistant fluorine coating.',
    specs: ['RF Mount / Full-Frame Coverage', 'Constant f/2.8 Aperture', '5-Stop Optical Image Stabilization', 'Dual Nano USM Autofocus Motors'],
    aliases: ['canon lens', '70-200', 'telephoto lens', 'rf lens', 'dslr lens'],
    featured: false,
    momentSlug: 'create-something'
  },
  {
    id: 'onr-len-03',
    name: 'Sigma 24-70mm f/2.8 DG DN Art Lens for Sony E',
    title: 'Sigma 24-70mm f/2.8 DG DN Art Lens (Sony E-Mount / Full-Frame)',
    productType: 'DSLR lenses',
    brand: 'Sigma',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 420,
    deposit: 4000,
    protectionFee: 129,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Osmanpura',
    distanceKm: 2.3,
    condition: 'Excellent',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.93,
    reviewsCount: 22,
    images: [
      { url: './images/products/lenses/sigma-24-70-front.webp', alt: 'Sigma 24-70mm f/2.8 DG DN Art lens front glass element' },
      { url: './images/products/lenses/sigma-24-70-angle.webp', alt: 'Sigma 24-70mm Art textured metal focus and zoom rings angled' },
      { url: './images/products/lenses/sigma-24-70-detail.webp', alt: 'Sigma 24-70mm brass bayonet mount and zoom lock switch' }
    ],
    owner: {
      name: 'Amit Varma',
      rating: 4.95,
      reviewsCount: 38,
      verified: true,
      joinedDate: 'Feb 2025',
      avatar: 'AV',
      phone: '+91 98600 12894',
      area: 'Osmanpura'
    },
    description: 'Renowned Art line optical performance across the entire zoom range. Outstanding sharpness with three aspherical and six FLD/SLD low-dispersion elements. Super Multi-Layer Coating suppresses flare and ghosting. Weather sealed with brass bayonet mount.',
    specs: ['Sony E-Mount / Full-Frame Format', 'Constant f/2.8 Maximum Aperture', '6 FLD Elements, 2 SLD Elements', 'Dust and Splash-Proof Structure'],
    aliases: ['sigma', 'art lens', '24-70', 'sony lens', 'dslr lens'],
    featured: false,
    momentSlug: 'create-something'
  },
  {
    id: 'onr-len-04',
    name: 'Nikon NIKKOR Z 50mm f/1.2 S Prime Lens',
    title: 'Nikon NIKKOR Z 50mm f/1.2 S Professional Prime Lens (OLED Display)',
    productType: 'DSLR lenses',
    brand: 'Nikon',
    category: 'Cameras',
    categorySlug: 'cameras',
    dailyPrice: 480,
    deposit: 4500,
    protectionFee: 139,
    location: 'Chhatrapati Sambhajinagar',
    area: 'Cannaught Place',
    distanceKm: 2.8,
    condition: 'Flawless',
    availability: 'Available Today',
    availableFrom: '2026-10-27',
    availableTo: '2026-12-31',
    rating: 4.99,
    reviewsCount: 19,
    images: [
      { url: './images/products/lenses/nikon-50mm-front.webp', alt: 'Nikon NIKKOR Z 50mm f/1.2 S large aperture prime lens glass element' },
      { url: './images/products/lenses/nikon-50mm-angle.webp', alt: 'Nikon Z 50mm f/1.2 S prime lens barrel and customizable control ring angled' },
      { url: './images/products/lenses/nikon-50mm-detail.webp', alt: 'Nikon Z 50mm f/1.2 S OLED information display and metal mount' }
    ],
    owner: {
      name: 'Tanmay Kale',
      rating: 4.99,
      reviewsCount: 74,
      verified: true,
      joinedDate: 'Oct 2024',
      avatar: 'TK',
      phone: '+91 98225 67104',
      area: 'Cannaught Place'
    },
    description: 'Dreamy low-light and portrait master lens. Ultra-bright f/1.2 maximum aperture produces stunning circular bokeh and dramatic background separation. Built-in OLED lens information panel, dual multi-focus stepping motors, and weather-resistant sealing.',
    specs: ['Z-Mount Lens / Full-Frame Format', 'Ultra-Fast f/1.2 Maximum Aperture', 'Multi-Focus Stepping Motor AF System', 'OLED Information Panel & Control Ring'],
    aliases: ['nikon lens', '50mm', 'prime lens', 'nikkor z', 'portrait lens', 'dslr lens'],
    featured: false,
    momentSlug: 'create-something'
  }
];

// Curated "Rent by Moment" Bundles
const SEED_MOMENTS = [
  {
    id: 'moment-create',
    slug: 'create-something',
    title: 'Create something',
    subtitle: 'DSLR cameras & lenses for films, reels and shoots',
    tag: 'Creator Kit',
    icon: 'ðŸ“·',
    categorySlug: 'cameras',
    accentColor: '#6f4bf6'
  },
  {
    id: 'moment-work',
    slug: 'work-and-study',
    title: 'Work and study',
    subtitle: 'Laptops & MacBooks ready for coding and projects',
    tag: 'Popular',
    icon: 'ðŸ’»',
    categorySlug: 'computers',
    accentColor: '#5131ca'
  },
  {
    id: 'moment-music',
    slug: 'music-and-parties',
    title: 'Music and parties',
    subtitle: 'Speakers & headphones with wireless mic',
    tag: 'Party â‚¹349/d',
    icon: 'ðŸ”Š',
    categorySlug: 'audio',
    accentColor: '#ff8b5e'
  },
  {
    id: 'moment-phone',
    slug: 'phone-upgrade',
    title: 'Phone upgrade',
    subtitle: 'iPhones with 4K ProRes & telephoto zoom',
    tag: 'Flagship',
    icon: 'ðŸ“±',
    categorySlug: 'phones',
    accentColor: '#14213d'
  }
];

// Sample Initial Demo Rentals demonstrating the complete lifecycle and history
const SEED_INITIAL_RENTALS = [
  {
    bookingId: 'ONR-74892',
    productId: 'onr-cam-01',
    productTitle: 'Canon Creator Kit (EOS R50 + Shotgun Mic + Tripod Grip)',
    productCategory: 'Cameras',
    productType: 'DSLR cameras',
    brand: 'Canon',
    productImage: './images/products/dslr/canon-creator-kit-front.webp',
    ownerName: 'Aditya Deshmukh',
    ownerPhone: '+91 98220 14892',
    ownerArea: 'Samarth Nagar',
    renterName: 'Tanishq S.',
    renterPhone: '+91 98765 43210',
    renterIdNumber: 'XXXX-XXXX-8492',
    planId: 'week_1',
    planLabel: '1 Week (Save 10%)',
    startDate: '2026-10-25',
    endDate: '2026-11-01',
    daysCount: 7,
    dailyRate: 499,
    baseRent: 3493,
    discountAmount: 349,
    netRent: 3144,
    taxAmount: 566,
    protectionFee: 149,
    deliveryFee: 149,
    deposit: 4000,
    totalPayable: 8008,
    fulfillmentMethod: 'delivery',
    verificationStatus: 'verified',
    orderStatus: 'in_rental',
    createdAt: '25 Oct 2026, 11:30 AM',
    
    // Handover inspection records
    handover: {
      completed: true,
      timestamp: '25 Oct 2026, 02:45 PM',
      confirmedByOwner: true,
      confirmedByRenter: true,
      renterSignature: 'Tanishq S.',
      ownerSignature: 'Aditya Deshmukh',
      notes: 'Shutter actuation count recorded (3,410 actuations). Sensor test at f/22 clear. Mic and 2 batteries verified.',
      photos: [
        './images/handover/handover-camera-sensor.webp',
        './images/handover/handover-serial-chassis.webp',
        './images/handover/handover-accessories-cables.webp'
      ]
    },

    returnRecord: {
      completed: false,
      timestamp: null,
      photos: [
        './images/handover/return-front-condition.webp',
        './images/handover/return-ports-clean.webp'
      ],
      aiDiagnostic: null,
      damageReported: false,
      damageFee: 0,
      damageNotes: '',
      depositRefunded: 0,
      refundStatus: 'pending'
    },

    serviceRequests: [
      {
        id: 'REQ-101',
        type: 'extension',
        title: 'Extend Rental by 3 Days',
        status: 'approved',
        createdAt: '26 Oct 2026, 04:15 PM',
        notes: 'Requested +3 days extension for video shoot at Ellora.',
        response: 'Owner Aditya approved extension at discounted rate.'
      }
    ]
  },
  {
    bookingId: 'ONR-63219',
    productId: 'onr-mac-01',
    productTitle: 'MacBook Pro 16" (M2 Max 12-Core CPU, 38-Core GPU, 32GB, 1TB SSD)',
    productCategory: 'Computers',
    productType: 'MacBooks',
    brand: 'Apple',
    productImage: './images/products/macbooks/macbook-pro16-front.webp',
    ownerName: 'Aditya Deshmukh',
    ownerPhone: '+91 98220 14892',
    ownerArea: 'Samarth Nagar',
    renterName: 'Tanishq S.',
    renterPhone: '+91 98765 43210',
    renterIdNumber: 'XXXX-XXXX-8492',
    planId: 'daily',
    planLabel: '3 Days',
    startDate: '2026-10-18',
    endDate: '2026-10-21',
    daysCount: 3,
    dailyRate: 890,
    baseRent: 2670,
    discountAmount: 0,
    netRent: 2670,
    taxAmount: 481,
    protectionFee: 149,
    deliveryFee: 0,
    deposit: 8500,
    totalPayable: 11799,
    fulfillmentMethod: 'pickup',
    verificationStatus: 'verified',
    orderStatus: 'deposit_refunded',
    createdAt: '18 Oct 2026, 09:15 AM',
    
    handover: {
      completed: true,
      timestamp: '18 Oct 2026, 11:00 AM',
      confirmedByOwner: true,
      confirmedByRenter: true,
      renterSignature: 'Tanishq S.',
      ownerSignature: 'Aditya Deshmukh',
      notes: 'Serial number verified: C02GXXXXMD6T. iCloud signed out. Battery health: 97%. Liquid Retina display immaculate.',
      photos: [
        './images/handover/handover-serial-chassis.webp',
        './images/products/macbooks/macbook-pro16-detail.webp'
      ]
    },

    returnRecord: {
      completed: true,
      timestamp: '21 Oct 2026, 05:30 PM',
      photos: [
        './images/handover/return-front-condition.webp',
        './images/handover/return-ports-clean.webp'
      ],
      aiDiagnostic: 'Clean & Intact. Zero damage detected.',
      damageReported: false,
      damageFee: 0,
      damageNotes: 'MacBook returned in flawless working order with MagSafe charger.',
      depositRefunded: 8500,
      refundStatus: 'completed'
    },

    serviceRequests: []
  }
];

// Global seed data export
const ONRENT_SEEDS = {
  products: SEED_PRODUCTS,
  moments: SEED_MOMENTS,
  categories: (typeof ONRENT_CONFIG !== 'undefined' && ONRENT_CONFIG.categories) ? ONRENT_CONFIG.categories : [
    { id: 'for-you', name: 'For you', icon: '✦', slug: 'for-you', count: 28, productTypes: [] },
    { id: 'cameras', name: 'Cameras', icon: '📷', slug: 'cameras', count: 8, productTypes: ['DSLR cameras', 'DSLR lenses'] },
    { id: 'audio', name: 'Audio', icon: '🎧', slug: 'audio', count: 8, productTypes: ['Headphones', 'Speakers'] },
    { id: 'computers', name: 'Computers', icon: '💻', slug: 'computers', count: 8, productTypes: ['Laptops', 'MacBooks'] },
    { id: 'phones', name: 'Phones', icon: '📱', slug: 'phones', count: 4, productTypes: ['iPhones'] }
  ],
  initialRentals: SEED_INITIAL_RENTALS,
  generateVisualPlaceholder
};

if (typeof window !== 'undefined') {
  window.ONRENT_SEEDS = ONRENT_SEEDS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ONRENT_SEEDS;
}

