/**
 * ONRENT — APPLICATION CONFIGURATION & BUSINESS CONSTANTS
 * Centralized configuration for pricing calculations, discounts, taxes, and system constants.
 * Scoped exclusively to 7 tech & creator product types:
 * 1. Speakers, 2. Laptops, 3. iPhones, 4. MacBooks, 5. DSLR cameras, 6. DSLR lenses, 7. PS5.
 */

const ONRENT_CONFIG = {
  // Brand details
  brandName: 'ONRENT',
  tagline: 'Rent what you need',
  
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
    'Speakers',
    'Laptops',
    'iPhones',
    'MacBooks',
    'DSLR cameras',
    'DSLR lenses',
    'PS5'
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
    'Sigma'
  ],

  // Category navigation chips with clean inline SVGs in violet & lime palette
  categories: [
    { 
      id: 'for-you', 
      name: 'For you', 
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>', 
      slug: 'for-you', 
      count: 28, 
      productTypes: [] 
    },
    { 
      id: 'cameras', 
      name: 'Cameras', 
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>', 
      slug: 'cameras', 
      count: 8, 
      productTypes: ['DSLR cameras', 'DSLR lenses'] 
    },
    { 
      id: 'speakers', 
      name: 'Speakers', 
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>', 
      slug: 'speakers', 
      count: 4, 
      productTypes: ['Speakers'] 
    },
    { 
      id: 'computers', 
      name: 'Computers', 
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>', 
      slug: 'computers', 
      count: 8, 
      productTypes: ['Laptops', 'MacBooks'] 
    },
    { 
      id: 'phones', 
      name: 'Phones', 
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>', 
      slug: 'phones', 
      count: 4, 
      productTypes: ['iPhones'] 
    },
    { 
      id: 'gaming', 
      name: 'Gaming', 
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="6"/><path d="M6 12h4m-2-2v4"/><circle cx="17" cy="10" r=".8" fill="currentColor"/><circle cx="15" cy="13" r=".8" fill="currentColor"/></svg>', 
      slug: 'gaming', 
      count: 4, 
      productTypes: ['PS5'] 
    }
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
    'Speakers': [
      { id: 'chk_sound', label: 'Subwoofer and tweeters tested at 80% volume for clean bass without rattle', critical: true },
      { id: 'chk_mic', label: 'Rechargeable wireless microphone paired and volume echo tested', critical: true },
      { id: 'chk_grill', label: 'Speaker metal mesh grill inspected for zero dents or liquid ingress', critical: false },
      { id: 'chk_batt', label: 'Internal battery charge level verified and AC power cable included', critical: true }
    ],
    'PS5': [
      { id: 'chk_sn', label: 'Console serial number verified against rental reservation record', critical: true },
      { id: 'chk_controllers', label: 'Both DualSense wireless controllers tested: stick drift, buttons, vibration & USB-C charging', critical: true },
      { id: 'chk_edition', label: 'Console edition verified (Disc drive eject/read or Digital Edition intact)', critical: true },
      { id: 'chk_cables', label: 'Ultra-high-speed HDMI 2.1 cable and AC power cord included and verified', critical: true },
      { id: 'chk_storage_condition', label: 'Internal SSD storage initialized and exterior console faceplates inspected for zero damage', critical: false }
    ],
    'Other': [
      { id: 'chk_sn', label: 'Serial or model number recorded into digital handover record', critical: true },
      { id: 'chk_accessories', label: 'All included accessories, cables, chargers & cases listed and verified', critical: true },
      { id: 'chk_test', label: 'Working operational test recorded on camera before handover & upon return', critical: true },
      { id: 'chk_photos', label: 'Front, back, and all sides photographed in clear lighting', critical: true },
      { id: 'chk_marks', label: 'Note and document any existing cosmetic marks, scratches, or wear', critical: false }
    ]
  },

  // Pricing & Taxation Constants
  pricing: {
    taxRate: 0.18,
    taxLabel: 'GST (18%)',

    defaultProtectionFee: 149,
    minProtectionFee: 49,
    maxProtectionFee: 299,

    durationPlans: [
      { id: 'daily', label: 'Daily (Custom)', minDays: 1, discountPercent: 0, tag: 'Standard' },
      { id: 'week_1', label: '1 Week', days: 7, discountPercent: 10, tag: 'Save 10%' },
      { id: 'month_1', label: '1 Month', days: 30, discountPercent: 25, tag: 'Popular • Save 25%' },
      { id: 'month_6', label: '6 Months', days: 180, discountPercent: 40, tag: 'Best Value • Save 40%' }
    ],

    defaultDepositMultiplierDays: 6,
    depositRefundGuaranteeDays: 2,

    fulfillment: {
      pickup: { id: 'pickup', label: 'Self Pickup from Owner', fee: 0, timeEst: 'Ready in 2 hours' },
      delivery: { id: 'delivery', label: 'Safe Doorstep Delivery', fee: 149, timeEst: 'Delivered in 4 hours' }
    }
  },

  verification: {
    statuses: {
      PENDING: 'pending',
      VERIFIED: 'verified',
      NEEDS_REVIEW: 'needs_review'
    },
    requiredDocs: ['Aadhaar Card', 'Driving License', 'Voter ID', 'Passport'],
    paymentHistoryThreshold: 'Good Standing'
  },

  orderMilestones: [
    { key: 'confirmed', label: 'Confirmed', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-check"></use></svg>', desc: 'Booking confirmed by owner' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-truck"></use></svg>', desc: 'Item en route or ready for pickup' },
    { key: 'delivered', label: 'Delivered', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-box"></use></svg>', desc: 'Item handed over to renter' },
    { key: 'in_rental', label: 'In Rental', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-clock"></use></svg>', desc: 'Rental duration active' },
    { key: 'return_due', label: 'Return Due', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-bell"></use></svg>', desc: 'Return scheduled or due soon' },
    { key: 'returned', label: 'Returned', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>', desc: 'Item inspected by both parties' },
    { key: 'deposit_refunded', label: 'Deposit Refunded', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-banknote-rupee"></use></svg>', desc: 'Security deposit released' }
  ],

  rentalRequestTypes: [
    { id: 'repair', label: 'Request Repair', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-wrench"></use></svg>', desc: 'Report malfunction or scheduled maintenance' },
    { id: 'extension', label: 'Extend Rental', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-calendar"></use></svg>', desc: 'Keep the item for more days at discounted rate' },
    { id: 'exchange', label: 'Exchange Item', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-refresh"></use></svg>', desc: 'Swap with another model or replacement' },
    { id: 'support', label: 'Contact Support', icon: '<svg class="icon icon-20" aria-hidden="true"><use href="#icon-message"></use></svg>', desc: 'Instant support from ONRENT team' }
  ],

  // Storage Keys for Offline Persistence (V4 reflects PS5 addition)
  storageKeys: {
    catalog: 'ONRENT_CATALOG_V4',
    rentals: 'ONRENT_RENTALS_V4',
    userProfile: 'ONRENT_USER_PROFILE_V4',
    ownerListings: 'ONRENT_OWNER_LISTINGS_V4',
    activeCity: 'ONRENT_ACTIVE_CITY_V4'
  }
};

if (typeof window !== 'undefined') {
  window.ONRENT_CONFIG = ONRENT_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ONRENT_CONFIG;
}
