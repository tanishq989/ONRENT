/**
 * ONRENT — APPLICATION STATE & STORAGE ENGINE
 * Manages reactive state, localStorage synchronization, currency/date utilities,
 * dynamic pricing with scaled deposits, and multi-filter catalogue search
 * scoped to the 7 product types and brand filters.
 */

class OnRentState {
  constructor() {
    this.config = window.ONRENT_CONFIG;
    this.seeds = window.ONRENT_SEEDS;
    
    // Core Navigation & Active Screen
    this.currentScreen = 'home'; // 'home' | 'browse' | 'product' | 'checkout' | 'tracker' | 'handover' | 'return' | 'rentals' | 'list-item' | 'profile'
    this.selectedProductId = null;
    this.activeRentalId = null;
    this.historyStack = ['home'];

    // Search & Filter State
    this.searchQuery = '';
    this.selectedCategory = 'for-you'; // 'for-you' | 'cameras' | 'audio' | 'computers' | 'phones'
    this.selectedProductType = 'all'; // 'all' or one of the 7 product types
    this.selectedBrand = 'All Brands'; // 'All Brands' or specific brand
    this.selectedMoment = null;
    this.rentalDurationFilter = 'all';
    this.sortBy = 'distance'; // 'distance' | 'price_asc' | 'price_desc' | 'rating'
    this.maxDistanceKm = 10;
    this.priceRange = [0, 2000];

    // Current City
    this.activeCity = this.loadItem(this.config.storageKeys.activeCity, this.config.defaultCity);

    // User Profile
    this.userProfile = this.loadItem(this.config.storageKeys.userProfile, {
      name: 'Tanishq S.',
      phone: '+91 98765 43210',
      email: 'tanishq@onrent.in',
      idNumber: 'XXXX-XXXX-8492',
      idType: 'Aadhaar Card',
      verificationStatus: 'verified',
      paymentHistoryScore: 'Excellent (100% on-time returns)',
      address: 'Plot 42, Samarth Nagar, Chhatrapati Sambhajinagar',
      walletBalance: 8000,
      joinedDate: 'Jan 2025'
    });

    // Catalogue from storage or seed (with migration safeguard for 7 product types & real photos)
    let loadedProducts = this.loadItem(this.config.storageKeys.catalog, null);
    if (!loadedProducts || !Array.isArray(loadedProducts) || loadedProducts.some(p => !this.config.productTypes.includes(p.productType) || (typeof p.images[0] === 'string' && (p.images[0].startsWith('data:') || p.images[0].startsWith('public/'))) || (typeof p.images[0] === 'object' && p.images[0].url && p.images[0].url.startsWith('public/')))) {
      loadedProducts = this.seeds.products;
      this.saveItem(this.config.storageKeys.catalog, loadedProducts);
    }
    this.products = loadedProducts;

    // Rentals & Bookings
    let loadedRentals = this.loadItem(this.config.storageKeys.rentals, null);
    if (!loadedRentals || !Array.isArray(loadedRentals) || loadedRentals.some(r => (r.productCategory && !['Cameras', 'Audio', 'Computers', 'Phones'].includes(r.productCategory)) || (typeof r.productImage === 'string' && (r.productImage.startsWith('data:') || r.productImage.startsWith('public/'))))) {
      loadedRentals = this.seeds.initialRentals;
      this.saveItem(this.config.storageKeys.rentals, loadedRentals);
    }
    this.rentals = loadedRentals;

    // Owner Listed Items
    this.ownerListings = this.loadItem(this.config.storageKeys.ownerListings, []);

    // Active Calculator & Checkout Draft
    const firstProduct = this.products[0] || this.seeds.products[0];
    this.checkoutDraft = {
      productId: firstProduct.id,
      planId: 'week_1',
      startDate: this.getTodayDateString(),
      endDate: this.getFutureDateString(7),
      daysCount: 7,
      hasProtection: true,
      fulfillmentMethod: 'delivery',
      pricingBreakdown: null
    };

    // UI Toast Notification State
    this.listeners = [];
  }

  // --- STORAGE HELPERS ---
  loadItem(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to load item from storage', key, e);
    }
    return defaultValue;
  }

  saveItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save item to storage', key, e);
    }
  }

  saveAll() {
    this.saveItem(this.config.storageKeys.catalog, this.products);
    this.saveItem(this.config.storageKeys.rentals, this.rentals);
    this.saveItem(this.config.storageKeys.userProfile, this.userProfile);
    this.saveItem(this.config.storageKeys.ownerListings, this.ownerListings);
    this.saveItem(this.config.storageKeys.activeCity, this.activeCity);
  }

  // --- EVENT DISPATCHER ---
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(event = 'statechange', payload = {}) {
    this.saveAll();
    this.listeners.forEach(cb => {
      try {
        cb(event, payload);
      } catch (err) {
        console.error('State listener error', err);
      }
    });
    window.dispatchEvent(new CustomEvent('onrent:statechange', { detail: { event, payload } }));
  }

  // --- NAVIGATION ---
  navigateTo(screen, params = {}) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentScreen = screen;
    this.historyStack.push(screen);

    if (params.productId) {
      this.selectedProductId = params.productId;
    }
    if (params.rentalId) {
      this.activeRentalId = params.rentalId;
    }
    if (params.category) {
      this.selectedCategory = params.category;
    }
    if (params.productType) {
      this.selectedProductType = params.productType;
    }
    if (params.brand) {
      this.selectedBrand = params.brand;
    }
    if (params.moment) {
      this.selectedMoment = params.moment;
      const found = this.seeds.moments.find(m => m.slug === params.moment);
      if (found) {
        this.selectedCategory = found.categorySlug;
      }
    }
    if (params.query !== undefined) {
      this.searchQuery = params.query;
    }

    this.notify('navigate', { screen, params });
  }

  goBack() {
    if (this.historyStack.length > 1) {
      this.historyStack.pop();
      const previous = this.historyStack.pop();
      this.navigateTo(previous || 'home');
    } else {
      this.navigateTo('home');
    }
  }

  // --- DATE & CURRENCY FORMATTERS ---
  formatCurrency(val) {
    const num = Math.round(Number(val) || 0);
    return '₹' + num.toLocaleString('en-IN');
  }

  formatDate(dateInput) {
    if (!dateInput) return '—';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getFutureDateString(daysAhead) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }

  diffDays(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  }

  // --- DYNAMIC PRICE CALCULATOR WITH SCALED DEPOSIT ---
  calculatePrice(dailyRate, planId, customDays = 1, hasProtection = true, fulfillmentMethod = 'delivery', customDeposit = null) {
    const pricingConfig = this.config.pricing;
    let daysCount = customDays;
    let discountPercent = 0;
    let planLabel = 'Daily';

    const foundPlan = pricingConfig.durationPlans.find(p => p.id === planId);
    if (foundPlan) {
      planLabel = foundPlan.label;
      discountPercent = foundPlan.discountPercent;
      if (foundPlan.days) {
        daysCount = foundPlan.days;
      }
    }

    if (!daysCount || daysCount < 1) daysCount = 1;

    // Itemized Calculations
    const baseRent = Math.round(dailyRate * daysCount);
    const discountAmount = Math.round(baseRent * (discountPercent / 100));
    const netRent = baseRent - discountAmount;
    const taxAmount = Math.round(netRent * pricingConfig.taxRate);
    const protectionFee = hasProtection ? pricingConfig.defaultProtectionFee : 0;
    const deliveryFee = fulfillmentMethod === 'delivery' 
      ? pricingConfig.fulfillment.delivery.fee 
      : pricingConfig.fulfillment.pickup.fee;

    // Scaled Security Deposit (uses item-specific scaled deposit if available, else formula)
    let deposit = customDeposit;
    if (deposit === null || deposit === undefined) {
      const depositMultiplier = pricingConfig.defaultDepositMultiplierDays;
      deposit = Math.round(dailyRate * depositMultiplier);
    }

    const totalPayable = netRent + taxAmount + protectionFee + deliveryFee + deposit;

    return {
      dailyRate,
      planId,
      planLabel,
      daysCount,
      discountPercent,
      baseRent,
      discountAmount,
      netRent,
      taxAmount,
      taxLabel: pricingConfig.taxLabel,
      protectionFee,
      hasProtection,
      deliveryFee,
      fulfillmentMethod,
      fulfillmentLabel: fulfillmentMethod === 'delivery' ? 'Doorstep Delivery' : 'Self Pickup',
      deposit,
      totalPayable
    };
  }

  // --- CATALOGUE METHODS ---
  getProductById(id) {
    return this.products.find(p => p.id === id) || this.seeds.products[0];
  }

  getFilteredProducts() {
    let result = [...this.products];

    // City constraint
    result = result.filter(p => p.location.toLowerCase().includes(this.activeCity.toLowerCase()));

    // Keyword search (name, title, productType, brand, description, specs, aliases)
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          (p.productType && p.productType.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          (p.aliases && p.aliases.some(a => a.toLowerCase().includes(q))) ||
          (p.specs && p.specs.some(s => s.toLowerCase().includes(q)))
        );
      });
    }

    // Category filter (For you, Cameras, Audio, Computers, Phones)
    if (this.selectedCategory && this.selectedCategory !== 'for-you' && this.selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug === this.selectedCategory);
    }

    // Product Type filter (Headphones, Speakers, Laptops, iPhones, MacBooks, DSLR cameras, DSLR lenses)
    if (this.selectedProductType && this.selectedProductType !== 'all') {
      result = result.filter(p => p.productType === this.selectedProductType);
    }

    // Brand filter (Apple, Sony, Canon, Nikon, etc.)
    if (this.selectedBrand && this.selectedBrand !== 'All Brands') {
      result = result.filter(p => p.brand === this.selectedBrand);
    }

    // Distance filter
    if (this.maxDistanceKm) {
      result = result.filter(p => (p.distanceKm || 2) <= this.maxDistanceKm);
    }

    // Sorting
    if (this.sortBy === 'distance') {
      result.sort((a, b) => (a.distanceKm || 2) - (b.distanceKm || 2));
    } else if (this.sortBy === 'price_asc') {
      result.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (this.sortBy === 'price_desc') {
      result.sort((a, b) => b.dailyPrice - a.dailyPrice);
    } else if (this.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  // --- RENTALS & ORDER WORKFLOW METHODS ---
  getRentalById(bookingId) {
    return this.rentals.find(r => r.bookingId === bookingId);
  }

  createBooking(bookingPayload) {
    const bookingId = 'ONR-' + Math.floor(10000 + Math.random() * 90000);
    const newRental = {
      bookingId,
      ...bookingPayload,
      orderStatus: 'confirmed',
      createdAt: this.formatDate(new Date()) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      handover: {
        completed: false,
        timestamp: null,
        confirmedByOwner: false,
        confirmedByRenter: false,
        renterSignature: '',
        ownerSignature: '',
        notes: '',
        photos: []
      },
      returnRecord: {
        completed: false,
        timestamp: null,
        photos: [],
        aiDiagnostic: null,
        damageReported: false,
        damageFee: 0,
        damageNotes: '',
        depositRefunded: 0,
        refundStatus: 'pending'
      },
      serviceRequests: []
    };

    this.rentals.unshift(newRental);
    this.activeRentalId = bookingId;
    this.notify('booking_created', { rental: newRental });
    return newRental;
  }

  updateOrderStatus(bookingId, nextStatus) {
    const rental = this.getRentalById(bookingId);
    if (!rental) return;
    rental.orderStatus = nextStatus;
    this.notify('status_updated', { rental, nextStatus });
  }

  saveHandoverRecord(bookingId, handoverData) {
    const rental = this.getRentalById(bookingId);
    if (!rental) return;
    rental.handover = {
      ...rental.handover,
      ...handoverData,
      completed: true,
      timestamp: this.formatDate(new Date()) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    rental.orderStatus = 'in_rental';
    this.notify('handover_saved', { rental });
  }

  saveReturnRecord(bookingId, returnData) {
    const rental = this.getRentalById(bookingId);
    if (!rental) return;
    
    const damageFee = Math.min(returnData.damageFee || 0, rental.deposit);
    const depositRefunded = Math.max(rental.deposit - damageFee, 0);

    rental.returnRecord = {
      ...rental.returnRecord,
      ...returnData,
      completed: true,
      damageFee,
      depositRefunded,
      refundStatus: 'refunded',
      timestamp: this.formatDate(new Date()) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    rental.orderStatus = 'deposit_refunded';
    this.notify('return_saved', { rental });
  }

  createServiceRequest(bookingId, { type, title, notes }) {
    const rental = this.getRentalById(bookingId);
    if (!rental) return;
    const reqId = 'REQ-' + (rental.serviceRequests.length + 101);
    const newRequest = {
      id: reqId,
      type,
      title,
      notes,
      status: 'pending',
      createdAt: this.formatDate(new Date()) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      response: 'Ticket assigned to local tech support engineer in ' + rental.ownerArea
    };
    rental.serviceRequests.unshift(newRequest);
    this.notify('service_requested', { rental, request: newRequest });
    return newRequest;
  }

  // --- OWNER METHODS ---
  addNewListing(listingData) {
    const newId = 'onr-custom-' + Math.floor(1000 + Math.random() * 9000);
    const productType = listingData.productType || 'Laptops';
    const brand = listingData.brand || 'Apple';

    // Map productType to parent category
    let categoryName = 'Computers';
    let categorySlug = 'computers';
    if (productType === 'DSLR cameras' || productType === 'DSLR lenses') {
      categoryName = 'Cameras';
      categorySlug = 'cameras';
    } else if (productType === 'Headphones' || productType === 'Speakers') {
      categoryName = 'Audio';
      categorySlug = 'audio';
    } else if (productType === 'iPhones') {
      categoryName = 'Phones';
      categorySlug = 'phones';
    }

    const typeDefaults = {
      'Headphones': [
        { url: 'public/images/products/headphones/sony-wh1000xm5-front.webp', alt: `${listingData.title} - Front` },
        { url: 'public/images/products/headphones/sony-wh1000xm5-angle.webp', alt: `${listingData.title} - Angle` },
        { url: 'public/images/products/headphones/sony-wh1000xm5-case.webp', alt: `${listingData.title} - Case & Cables` }
      ],
      'Speakers': [
        { url: 'public/images/products/speakers/jbl-partybox-front.webp', alt: `${listingData.title} - Front` },
        { url: 'public/images/products/speakers/jbl-partybox-angle.webp', alt: `${listingData.title} - Angle` },
        { url: 'public/images/products/speakers/jbl-partybox-controls.webp', alt: `${listingData.title} - Controls` }
      ],
      'Laptops': [
        { url: 'public/images/products/laptops/dell-xps-15-front.webp', alt: `${listingData.title} - Front` },
        { url: 'public/images/products/laptops/dell-xps-15-angle.webp', alt: `${listingData.title} - Angle` },
        { url: 'public/images/products/laptops/dell-xps-15-ports.webp', alt: `${listingData.title} - Ports & Charger` }
      ],
      'iPhones': [
        { url: 'public/images/products/iphones/iphone-15-pro-front.webp', alt: `${listingData.title} - Front` },
        { url: 'public/images/products/iphones/iphone-15-pro-back.webp', alt: `${listingData.title} - Back Titanium` },
        { url: 'public/images/products/iphones/iphone-15-pro-angle.webp', alt: `${listingData.title} - Display & Cable` }
      ],
      'MacBooks': [
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-front.webp', alt: `${listingData.title} - Front Display` },
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-angle.webp', alt: `${listingData.title} - Keyboard & Trackpad` },
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-closed.webp', alt: `${listingData.title} - Space Black Lid` }
      ],
      'DSLR cameras': [
        { url: 'public/images/products/dslr/canon-creator-kit-front.webp', alt: `${listingData.title} - Front Sensor` },
        { url: 'public/images/products/dslr/canon-creator-kit-angle.webp', alt: `${listingData.title} - Grip & Dial` },
        { url: 'public/images/products/dslr/canon-creator-kit-rig.webp', alt: `${listingData.title} - Rig & Batteries` }
      ],
      'DSLR lenses': [
        { url: 'public/images/products/lenses/canon-rf-24-70-front.webp', alt: `${listingData.title} - Front Element` },
        { url: 'public/images/products/lenses/canon-rf-24-70-angle.webp', alt: `${listingData.title} - Zoom Ring & Mount` },
        { url: 'public/images/products/lenses/canon-rf-24-70-hood.webp', alt: `${listingData.title} - Lens Hood & Pouch` }
      ]
    };
    const fallbackImgs = typeDefaults[productType] || typeDefaults['Laptops'];

    const product = {
      id: newId,
      name: listingData.title,
      title: listingData.title,
      productType,
      brand,
      category: categoryName,
      categorySlug,
      dailyPrice: Number(listingData.dailyPrice),
      deposit: Number(listingData.deposit),
      protectionFee: 149,
      location: this.activeCity,
      area: listingData.area || 'Samarth Nagar',
      distanceKm: 1.2,
      condition: listingData.condition || 'Like New',
      availability: 'Available Today',
      availableFrom: listingData.availableFrom || this.getTodayDateString(),
      availableTo: listingData.availableTo || this.getFutureDateString(90),
      rating: 5.0,
      reviewsCount: 1,
      images: listingData.photos && listingData.photos.length > 0 
        ? listingData.photos 
        : fallbackImgs,
      owner: {
        name: this.userProfile.name,
        rating: 5.0,
        reviewsCount: 1,
        verified: true,
        joinedDate: 'Oct 2026',
        avatar: 'ME',
        phone: this.userProfile.phone,
        area: listingData.area || 'Samarth Nagar'
      },
      description: listingData.description || `Verified ${productType} listed by verified owner in Sambhajinagar.`,
      specs: listingData.specs || ['Verified Working Condition', 'Handover Inspection Ready'],
      aliases: [listingData.title.toLowerCase(), productType.toLowerCase(), brand.toLowerCase()],
      featured: true
    };

    this.products.unshift(product);
    this.ownerListings.unshift(product);
    this.notify('listing_added', { product });
    return product;
  }

  // --- VERIFICATION METHODS ---
  updateVerification(status, details = {}) {
    this.userProfile.verificationStatus = status;
    if (details.name) this.userProfile.name = details.name;
    if (details.phone) this.userProfile.phone = details.phone;
    if (details.idNumber) this.userProfile.idNumber = details.idNumber;
    this.notify('verification_updated', { profile: this.userProfile });
  }

  resetAllData() {
    localStorage.removeItem(this.config.storageKeys.catalog);
    localStorage.removeItem(this.config.storageKeys.rentals);
    localStorage.removeItem(this.config.storageKeys.userProfile);
    localStorage.removeItem(this.config.storageKeys.ownerListings);
    localStorage.removeItem(this.config.storageKeys.activeCity);
    window.location.reload();
  }
}

// Expose singleton to window
window.AppState = new OnRentState();
