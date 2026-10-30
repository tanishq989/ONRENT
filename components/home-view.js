/**
 * ONRENT — HOME VIEW COMPONENT
 * Renders the Home Screen with Hero banner, multi-attribute search bar,
 * 5 category chips (For you, Cameras, Audio, Computers, Phones),
 * 4 curated "Rent by moment" tiles (Create something, Work and study, Music and parties, Phone upgrade),
 * "Ready near you" listings, and the trust and safety banner.
 */

window.HomeViewComponent = {
  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const featuredProducts = (window.AppState && window.AppState.products) ? window.AppState.products.slice(0, 8) : [];
    const moments = (window.ONRENT_SEEDS && window.ONRENT_SEEDS.moments) || [];
    const categories = (window.ONRENT_CONFIG && window.ONRENT_CONFIG.categories) || (window.ONRENT_SEEDS && window.ONRENT_SEEDS.categories) || [];

    container.innerHTML = `
      <div id="homeScreen" class="view-screen">
        
        <!-- HERO BANNER SECTION -->
        <section class="hero-section" id="heroBanner">
          <div class="hero-bg-shapes">
            <div class="hero-shape-1"></div>
            <div class="hero-shape-2"></div>
          </div>

          <div class="container hero-content">
            <h1 class="hero-title">
              Why Buy It When You Can <span class="highlight-lime">Rent It</span>?
            </h1>

            <p class="hero-subtitle">
              Rent verified DSLR cameras, pro lenses, MacBooks, laptops, iPhones, speakers, and PS5 gaming consoles in Chhatrapati Sambhajinagar. Save money, avoid clutter.
            </p>

            <!-- Multi-Attribute Search Bar (Wide ~1100px) -->
            <div class="hero-search-box">
              <form id="heroSearchForm" onsubmit="HomeViewComponent.handleSearch(event)" class="search-form-grid">
                <div class="search-field-unit">
                  <span class="search-field-icon" aria-hidden="true">
                    <svg class="search-field-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-700)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    id="heroProductQuery" 
                    placeholder="Search iPhone, MacBook, PS5, Canon Creator Kit, Speakers, Lenses..." 
                    value="${window.AppState.searchQuery}"
                    autocomplete="off"
                    aria-label="What gear do you need to rent?"
                  />
                </div>

                <div class="search-field-unit">
                  <span class="search-field-icon" aria-hidden="true">
                    <svg class="search-field-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-700)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    id="heroLocationQuery" 
                    value="${window.AppState.activeCity}" 
                    readonly
                    onclick="NavigationComponent.openLocationModal()"
                    aria-label="Rental city"
                    style="cursor: pointer;"
                  />
                </div>

                <div class="search-field-unit duration-field">
                  <span class="search-field-icon" aria-hidden="true">
                    <svg class="search-field-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-700)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                  <select id="heroDurationSelect" aria-label="Rental duration filter">
                    <option value="all">Any Duration</option>
                    <option value="weekend">Weekend (2-3 Days)</option>
                    <option value="week" selected>1 Week (Save 10%)</option>
                    <option value="month">1 Month (Save 25%)</option>
                    <option value="long">6 Months (Save 40%)</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-lime btn-lg" id="heroSearchSubmitBtn">
                  Search Items
                </button>
              </form>
            </div>

            <div style="margin-top: 18px; font-size: 13px; color: #b8c1d4;">
              Own useful tech gear sitting idle? <button type="button" onclick="window.AppState.navigateTo('list-item')" style="color: var(--brand-100); font-weight: 700; text-decoration: underline;">List your item</button> in Sambhajinagar and earn.
            </div>
          </div>
        </section>

        <!-- HORIZONTAL CATEGORY CHIPS SCROLLER (For you, Cameras, Audio, Computers, Phones) -->
        <div class="container" style="margin-top: -12px; position: relative; z-index: 10;">
          <div class="category-chips-bar" role="tablist" aria-label="Browse categories">
            ${categories.map(cat => `
              <button 
                class="category-chip ${window.AppState.selectedCategory === cat.slug ? 'active' : ''}" 
                onclick="HomeViewComponent.filterCategory('${cat.slug}')"
                role="tab"
                aria-selected="${window.AppState.selectedCategory === cat.slug}"
              >
                <span class="chip-icon">${cat.icon}</span>
                <span>${cat.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- "RENT BY MOMENT" CURATED TILES (Create something, Work and study, Music and parties, Phone upgrade) -->
        <section class="section-block" style="padding-top: 24px;">
          <div class="container">
            <div class="section-head">
              <div>
                <span class="pill-badge pill-badge-violet" style="margin-bottom: 6px;">CURATED EXPERIENCES</span>
                <h2 class="section-title">Rent by Moment</h2>
                <p class="section-subtitle">Gear bundled and ready for your projects & occasions in Sambhajinagar</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('browse')">View All →</button>
            </div>

            <div class="moments-scroll-grid">
              ${moments.map(m => `
                <div class="moment-card" onclick="HomeViewComponent.selectMoment('${m.slug}')" role="button" tabindex="0">
                  <div class="moment-card-header">
                    <div class="moment-icon-badge">${m.icon}</div>
                    <div class="moment-tag-pill">${m.tag}</div>
                  </div>
                  <div class="moment-card-body">
                    <h3 class="moment-card-title">${m.title}</h3>
                    <p class="moment-card-desc">${m.subtitle}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- "READY NEAR YOU" VERIFIED LISTINGS -->
        <section class="section-block">
          <div class="container">
            <div class="section-head">
              <div>
                <span class="pill-badge pill-badge-lime" style="margin-bottom: 6px;">VERIFIED OWNERS & SCALED DEPOSITS</span>
                <h2 class="section-title">Ready Near You</h2>
                <p class="section-subtitle">Available today for rapid pickup or 4-hour delivery in Sambhajinagar</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('browse')">
                Explore All (${window.AppState.products.length}) →
              </button>
            </div>

            <!-- Product Grid -->
            <div class="product-grid">
              ${featuredProducts.map(product => HomeViewComponent.renderProductCard(product)).join('')}
            </div>

            <!-- Browse Catalogue CTA Box -->
            <div style="text-align: center; margin-top: 36px;">
              <button class="btn btn-violet btn-lg" onclick="window.AppState.navigateTo('browse')">
                Browse Complete Catalogue (${window.AppState.products.length} Items) →
              </button>
            </div>
          </div>
        </section>

        <!-- TRUST & SAFETY BANNER -->
        <section class="container">
          <div class="trust-banner-section">
            <div style="text-align: center; max-width: 620px; margin: 0 auto 28px;">
              <span class="pill-badge pill-badge-violet" style="margin-bottom: 8px;">PEER TO PEER SAFETY</span>
              <h3 style="font-size: 22px; font-weight: 900; color: var(--ink);">Renting Built on Verification & Mutual Trust</h3>
              <p style="font-size: 14px; color: var(--muted); margin-top: 6px;">
                Verified owners, clear deposits, photo-based handover and return.
              </p>
            </div>

            <div class="trust-banner-grid">
              <div class="trust-feature-item">
                <div class="trust-feature-icon">🛡️</div>
                <div class="trust-feature-content">
                  <h4>Verified Resident Profiles</h4>
                  <p>Every renter and owner in Sambhajinagar completes Aadhaar/Govt ID verification and payment standing checks before booking.</p>
                </div>
              </div>

              <div class="trust-feature-item">
                <div class="trust-feature-icon">📷</div>
                <div class="trust-feature-content">
                  <h4>Product-Specific Handover Checklists</h4>
                  <p>Serial numbers recorded for iPhones and MacBooks, lens glass and mount checks, camera shutter count tests, and laptop battery reports protect everyone.</p>
                </div>
              </div>

              <div class="trust-feature-item">
                <div class="trust-feature-icon">💰</div>
                <div class="trust-feature-content">
                  <h4>Value-Scaled Refundable Deposits</h4>
                  <p>Deposits are scaled proportionally with item replacement value, held in escrow, and released immediately upon verified safe return.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- OWNER CTA SECTION -->
        <section class="container" style="margin-bottom: 40px;">
          <div style="background: linear-gradient(135deg, var(--violet) 0%, var(--violet-dark) 100%); border-radius: var(--radius-xl); padding: 36px 28px; color: var(--white); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px;">
            <span class="pill-badge pill-badge-lime">EARN PASSIVE INCOME</span>
            <h3 style="font-size: 26px; font-weight: 900; max-width: 560px;">Have Cameras, Laptops, MacBooks, PS5, or Speakers Sitting Idle?</h3>
            <p style="font-size: 14px; color: #ded5fd; max-width: 500px;">
              Rent them out to verified neighbours in Sambhajinagar. You set the daily price, retain 100% deposit protection, and approve handovers.
            </p>
            <button class="btn btn-lime btn-lg" onclick="window.AppState.navigateTo('list-item')">
              + List Your Item for Free →
            </button>
          </div>
        </section>

      </div>
    `;
  },

  renderProductCard(product) {
    const formattedPrice = window.AppState.formatCurrency(product.dailyPrice);
    const formattedDeposit = window.AppState.formatCurrency(product.deposit);
    const firstImg = (product.images && product.images[0]) || '';
    const norm = window.ProductImage ? window.ProductImage.normalize(firstImg, product.title) : { url: firstImg, alt: product.title };

    const overlays = `
      <span class="product-condition-badge">${product.condition}</span>
      <span class="product-distance-badge">📍 ${product.area} (${product.distanceKm} km away)</span>
    `;

    const imgHtml = window.ProductImage 
      ? window.ProductImage.render({
          src: norm.url,
          alt: norm.alt,
          productType: product.productType || product.category,
          aspectRatio: '4/3',
          className: 'product-card-img-wrap',
          overlayHtml: overlays
        })
      : `
        <div class="product-card-img-wrap">
          <img src="${norm.url}" alt="${norm.alt}" class="product-card-img" loading="lazy" />
          ${overlays}
        </div>
      `;

    return `
      <div class="product-card" onclick="window.AppState.navigateTo('product', { productId: '${product.id}' })" role="button" tabindex="0">
        ${imgHtml}

        <div class="product-card-body">
          <div class="product-category-row">
            <span class="product-category-name">${product.productType || product.category}</span>
            <div class="product-rating-box">
              <span class="star">★</span>
              <span>${product.rating}</span>
              <span style="color: var(--muted); font-size: 11px;">(${product.reviewsCount})</span>
            </div>
          </div>

          <h3 class="product-card-title">${product.name}</h3>

          <div class="product-owner-row">
            <div class="product-owner-avatar">${product.owner.avatar}</div>
            <span>Owner: ${product.owner.name}</span>
            <span style="color: var(--success); font-weight: 700;">✓</span>
          </div>

          <div class="product-card-footer">
            <div class="product-price-block">
              <div class="product-daily-rate">${formattedPrice} <span>/ day</span></div>
              <div class="product-deposit-pill">Deposit: ${formattedDeposit} (Scaled)</div>
            </div>

            <button class="btn btn-violet btn-sm" onclick="event.stopPropagation(); window.AppState.navigateTo('product', { productId: '${product.id}' })">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    `;
  },

  handleSearch(e) {
    e.preventDefault();
    const query = document.getElementById('heroProductQuery').value;
    const duration = document.getElementById('heroDurationSelect').value;
    window.AppState.rentalDurationFilter = duration;
    window.AppState.navigateTo('browse', { query });
  },

  filterCategory(slug) {
    window.AppState.selectedCategory = slug;
    window.AppState.selectedProductType = 'all';
    window.AppState.navigateTo('browse', { category: slug });
  },

  selectMoment(slug) {
    window.AppState.navigateTo('browse', { moment: slug });
  }
};
