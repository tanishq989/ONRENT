/**
 * ONRENT — APPLICATION CONFIGURATION & BUSINESS CONSTANTS
 * Centralized configuration for pricing calculations, discounts, taxes, and system constants.
 * Scoped exclusively to 7 tech & creator product types:
 * 1. Headphones, 2. Speakers, 3. Laptops, 4. iPhones, 5. MacBooks, 6. DSLR cameras, 7. DSLR lenses.
 */

const ONRENT_CONFIG = {
  // Brand details
  brandName: 'ONRENT',
  tagline: 'Rent what you need',
  eyebrow: 'RENT SMARTER, LIVE LIGHTER',
  
  // Service Geographic Boundaries
  defaultCity: 'Chhatrapati Sambhajinagar',
  defaultRegion: 'Maharashtra, India',
  supportedNeighborhoods: [
    'CIDCO N-1 to N-12',
    'Samarth Nagar',
    'Osmanpura',
    'Kranti Chowk',
    'Garkheda Parisar',
    'Cannaught Place',
    'Beed Bypass',
    'Railway Station Road',
    'Shahnoorwadi',
    'Prozone Mall Area',
    'Waluj MIDC',
    'Shendra MIDC'
  ],

  // The 7 Approved Product Types
  productTypes: [
    'Headphones',
    'Speakers',
    'Laptops',
    'iPhones',
    'MacBooks',
    'DSLR cameras',
    'DSLR lenses'
  ],

  // Brands present across catalogue
  brands: [
    'All Brands',
    'Apple',
    'Sony',
    'Canon',
    'Nikon',
    'JBL',
    'Bose',
    'Dell',
    'Lenovo',
    'ASUS',
    'HP',
    'Marshall',
    'Sennheiser',
    'Sigma'
  ],

  // Category navigation chips
  categories: [
    { id: 'for-you', name: 'For you', icon: '✦', slug: 'for-you', count: 28, productTypes: [] },
    { id: 'cameras', name: 'Cameras', icon: '📷', slug: 'cameras', count: 8, productTypes: ['DSLR cameras', 'DSLR lenses'] },
    { id: 'audio', name: 'Audio', icon: '🎧', slug: 'audio', count: 8, productTypes: ['Headphones', 'Speakers'] },
    { id: 'computers', name: 'Computers', icon: '💻', slug: 'computers', count: 8, productTypes: ['Laptops', 'MacBooks'] },
    { id: 'phones', name: 'Phones', icon: '📱', slug: 'phones', count: 4, productTypes: ['iPhones'] }
  ],

  // Specific Handover & Return Checklists per Product Type
  handoverChecklists: {
    'iPhones': [
      { id: 'chk_sn', label: 'Serial number & IMEI verified against digital reservation record', critical: true },
      { id: 'chk_icloud', label: 'Apple ID & iCloud / Find My signed out before handover & upon return', critical: true },
      { id: 'chk_battery', label: 'Battery maximum capacity % verified in Settings', critical: false },
      { id: 'chk_screen', label: 'Ceramic Shield front glass & cameras free of fractures', critical: true },
      { id: 'chk_cable', label: 'Original braided USB-C / Lightning cable verified', critical: false }
    ],
    'MacBooks': [
      { id: 'chk_sn', label: 'Serial number verified via "About This Mac" and underside chassis', critical: true },
      { id: 'chk_icloud', label: 'Activation Lock & FileVault cleared for rental user session', critical: true },
      { id: 'chk_battery', label: 'Battery cycle count and condition health verified', critical: false },
      { id: 'chk_screen', label: 'Liquid Retina display verified for zero keyboard imprint or dead pixels', critical: true },
      { id: 'chk_charger', label: 'Original Apple USB-C Power Adapter and MagSafe 3 cable included', critical: true }
    ],
    'Laptops': [
      { id: 'chk_screen', label: 'Display screen check: zero dead pixels, uniform backlighting, smooth hinge tension', critical: true },
      { id: 'chk_battery', label: 'Battery health diagnostic verified in BIOS / OS power report', critical: true },
      { id: 'chk_keyboard', label: 'All keyboard keys and trackpad clicks tested & responsive', critical: false },
      { id: 'chk_charger', label: 'Original rated OEM power brick and power cable included', critical: true },
      { id: 'chk_ports', label: 'USB-C / HDMI ports and webcam verified functional', critical: false }
    ],
    'DSLR lenses': [
      { id: 'chk_glass', label: 'Front and rear optical glass inspected under light for zero scratches, haze or fungus', critical: true },
      { id: 'chk_mount', label: 'Metal bayonet mount and gold-plated electronic contacts clean & undamaged', critical: true },
      { id: 'chk_rings', label: 'Manual focus ring and zoom ring rotate smoothly without grinding', critical: true },
      { id: 'chk_aperture', label: 'Electronic aperture blades open and close cleanly without oil residue', critical: false },
      { id: 'chk_caps', label: 'Front lens cap, rear dust cap, and lens hood present', critical: false }
    ],
    'DSLR cameras': [
      { id: 'chk_shutter', label: 'Shutter actuation count recorded into timestamped digital handover record', critical: true },
      { id: 'chk_sensor', label: 'Image sensor inspected at f/22 test frame for dust or scratches', critical: true },
      { id: 'chk_viewfinder', label: 'Electronic Viewfinder (EVF) and articulating touchscreen display clean', critical: false },
      { id: 'chk_ports', label: 'Dual SD/CFexpress card slot pins and HDMI/USB port covers intact', critical: false },
      { id: 'chk_batt', label: 'Original OEM battery, charger and neck strap present', critical: true }
    ],
    'Headphones': [
      { id: 'chk_drivers', label: 'Left/Right acoustic driver balance and Active Noise Cancellation (ANC) tested', critical: true },
      { id: 'chk_cushions', label: 'Ear cushions sanitized with zero tears or synthetic leather flaking', critical: false },
      { id: 'chk_headband', label: 'Headband flex and slider adjustment smooth & firm', critical: false },
      { id: 'chk_bluetooth', label: 'Bluetooth pairing and multipoint connection verified', critical: false },
      { id: 'chk_case', label: 'Original hard travel protective case and audio cable included', critical: false }
    ],
    'Speakers': [
      { id: 'chk_sound', label: 'Subwoofer and tweeters tested at 80% volume for clean bass without rattle', critical: true },
      { id: 'chk_mic', label: 'Rechargeable wireless microphone paired and volume echo tested', critical: true },
      { id: 'chk_grill', label: 'Speaker metal mesh grill inspected for zero dents or liquid ingress', critical: false },
      { id: 'chk_batt', label: 'Internal battery charge level verified and AC power cable included', critical: true }
    ]
  },

  // Pricing & Taxation Constants
  pricing: {
    // GST Tax Rate (18% for consumer services / rental leasing)
    taxRate: 0.18,
    taxLabel: 'GST (18%)',

    // Damage Protection Fee
    defaultProtectionFee: 149,
    minProtectionFee: 49,
    maxProtectionFee: 299,

    // Rental Duration Discounts
    durationPlans: [
      { id: 'daily', label: 'Daily (Custom)', minDays: 1, discountPercent: 0, tag: 'Standard' },
      { id: 'week_1', label: '1 Week', days: 7, discountPercent: 10, tag: 'Save 10%' },
      { id: 'month_1', label: '1 Month', days: 30, discountPercent: 25, tag: 'Popular • Save 25%' },
      { id: 'month_6', label: '6 Months', days: 180, discountPercent: 40, tag: 'Best Value • Save 40%' }
    ],

    // Security Deposit calculation defaults
    defaultDepositMultiplierDays: 6,
    depositRefundGuaranteeDays: 2,

    // Delivery options
    fulfillment: {
      pickup: { id: 'pickup', label: 'Self Pickup from Owner', fee: 0, timeEst: 'Ready in 2 hours' },
      delivery: { id: 'delivery', label: 'Safe Doorstep Delivery', fee: 149, timeEst: 'Delivered in 4 hours' }
    }
  },

  // Verification Thresholds & Statuses
  verification: {
    statuses: {
      PENDING: 'pending',
      VERIFIED: 'verified',
      NEEDS_REVIEW: 'needs_review'
    },
    requiredDocs: ['Aadhaar Card', 'Driving License', 'Voter ID', 'Passport'],
    paymentHistoryThreshold: 'Good Standing'
  },

  // Order Lifecycle Timeline Milestones
  orderMilestones: [
    { key: 'confirmed', label: 'Confirmed', icon: '✓', desc: 'Booking confirmed by owner' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚', desc: 'Item en route or ready for pickup' },
    { key: 'delivered', label: 'Delivered', icon: '📦', desc: 'Item handed over to renter' },
    { key: 'in_rental', label: 'In Rental', icon: '⏱️', desc: 'Rental duration active' },
    { key: 'return_due', label: 'Return Due', icon: '🔔', desc: 'Return scheduled or due soon' },
    { key: 'returned', label: 'Returned', icon: '↩️', desc: 'Item inspected by both parties' },
    { key: 'deposit_refunded', label: 'Deposit Refunded', icon: '💰', desc: 'Security deposit released' }
  ],

  // Rental Support / In-Rental Request Types
  rentalRequestTypes: [
    { id: 'repair', label: 'Request Repair', icon: '🔧', desc: 'Report malfunction or scheduled maintenance' },
    { id: 'extension', label: 'Extend Rental', icon: '📅', desc: 'Keep the item for more days at discounted rate' },
    { id: 'exchange', label: 'Exchange Item', icon: '🔄', desc: 'Swap with another model or replacement' },
    { id: 'support', label: 'Contact Support', icon: '💬', desc: 'Instant support from ONRENT team' }
  ],

  // Storage Keys for Offline Persistence (V3 reflects real WebP product photography)
  storageKeys: {
    catalog: 'ONRENT_CATALOG_V3',
    rentals: 'ONRENT_RENTALS_V3',
    userProfile: 'ONRENT_USER_PROFILE_V3',
    ownerListings: 'ONRENT_OWNER_LISTINGS_V3',
    activeCity: 'ONRENT_ACTIVE_CITY_V3'
  }
};

// Export for ES modules and browser global window
if (typeof window !== 'undefined') {
  window.ONRENT_CONFIG = ONRENT_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ONRENT_CONFIG;
}
