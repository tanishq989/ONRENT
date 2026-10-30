/**
 * ONRENT — PRODUCT DETAIL & LIVE PRICE CALCULATOR COMPONENT
 * Renders high-res gallery, owner credentials, condition & availability badges,
 * product-type specific handover checklist, and live interactive price calculator
 * with scaled deposits and 1 week, 1 month, and 6 months plans.
 */

window.ProductViewComponent = {
  activeImageIndex: 0,
  touchStartX: 0,
  touchStartY: 0,

  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const productId = window.AppState.selectedProductId || (window.AppState.products[0] && window.AppState.products[0].id) || 'onr-cam-01';
    const product = window.AppState.getProductById(productId);

    // Sync draft with current product
    if (window.AppState.checkoutDraft.productId !== productId) {
      window.AppState.checkoutDraft.productId = productId;
      window.AppState.checkoutDraft.planId = 'week_1';
      window.AppState.checkoutDraft.startDate = window.AppState.getTodayDateString();
      window.AppState.checkoutDraft.endDate = window.AppState.getFutureDateString(7);
      window.AppState.checkoutDraft.daysCount = 7;
    }

    const draft = window.AppState.checkoutDraft;
    const calc = window.AppState.calculatePrice(
      product.dailyPrice,
      draft.planId,
      draft.daysCount,
      draft.hasProtection,
      draft.fulfillmentMethod,
      product.deposit // Scaled deposit
    );
    draft.pricingBreakdown = calc;

    const images = (product.images && product.images.length > 0) ? product.images : [
      { url: './images/products/dslr/canon-creator-kit-front.webp', alt: product.title }
    ];
    const currentImg = images[this.activeImageIndex] || images[0];
    const normActive = window.ProductImage ? window.ProductImage.normalize(currentImg, product.title) : { url: currentImg, alt: product.title };

    // Get specific handover checklist for this product type
    const checklist = (window.ONRENT_CONFIG.handoverChecklists && window.ONRENT_CONFIG.handoverChecklists[product.productType]) || [];

    container.innerHTML = `
      <div id="productScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          
          <!-- Back button & Breadcrumb -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.goBack()">
              ← Back
            </button>
            <div style="font-size: 12px; color: var(--muted); font-weight: 600; word-break: break-word;">
              ${product.category} &nbsp;>&nbsp; <span style="color: var(--violet);">${product.productType}</span> &nbsp;>&nbsp; <span style="color: var(--ink);">${product.name}</span>
            </div>
          </div>

          <!-- Product Details Multi-Column Grid (Responsive for mobile & desktop) -->
          <div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 32px;" class="product-layout-grid">
            
            <!-- LEFT COLUMN: Swipeable Gallery & Product Info -->
            <div style="min-width: 0;">
              <!-- Main Swipeable Gallery Preview with Tap-to-Zoom -->
              <div 
                id="productGalleryContainer"
                ontouchstart="ProductViewComponent.handleTouchStart(event)"
                ontouchend="ProductViewComponent.handleTouchEnd(event)"
                style="position: relative; border-radius: var(--radius-xl); overflow: hidden; background-color: var(--white); border: 1px solid var(--line); box-shadow: var(--shadow-sm); margin-bottom: 14px; user-select: none;"
              >
                ${window.ProductImage ? window.ProductImage.render({
      src: normActive.url,
      alt: normActive.alt,
      productType: product.productType,
      aspectRatio: '4/3',
      zoomable: true,
      overlayHtml: `
                    <span class="product-condition-badge" style="position: absolute; top: 16px; left: 16px; z-index: 3;">
                      Condition: ${product.condition}
                    </span>
                    <span class="pill-badge pill-badge-lime" style="position: absolute; top: 16px; right: 16px; z-index: 3;">
                      ✓ ${product.availability}
                    </span>
                    <div style="position: absolute; bottom: 14px; right: 14px; z-index: 3; display: flex; gap: 6px; align-items: center;">
                      <span class="pill-badge pill-badge-violet" style="font-size: 11px; padding: 4px 10px; background: rgba(20, 33, 61, 0.85); backdrop-filter: blur(8px); color: white; border: 1px solid rgba(255,255,255,0.2);">
                        ${this.activeImageIndex + 1} / ${images.length}
                      </span>
                      <button 
                        type="button" 
                        onclick="event.stopPropagation(); ProductImage.openZoom('${normActive.url}', '${normActive.alt.replace(/'/g, "\\'")}')" 
                        class="pill-badge" 
                        style="font-size: 11px; padding: 4px 10px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); color: var(--ink); border: 1px solid var(--line); cursor: pointer;"
                        title="Tap to zoom"
                      >
                        🔍 Tap to zoom
                      </button>
                    </div>
                  `
    }) : `
                  <img src="${normActive.url}" alt="${normActive.alt}" style="width: 100%; aspect-ratio: 4/3; object-fit: cover;" />
                `}

                ${images.length > 1 ? `
                  <!-- Navigation arrows -->
                  <button 
                    type="button"
                    onclick="ProductViewComponent.prevImage()" 
                    style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); z-index: 4; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.92); border: 1px solid var(--line); box-shadow: var(--shadow-sm); font-size: 18px; font-weight: 800; color: var(--ink); cursor: pointer; display: flex; align-items: center; justify-content: center;"
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <button 
                    type="button"
                    onclick="ProductViewComponent.nextImage()" 
                    style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); z-index: 4; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.92); border: 1px solid var(--line); box-shadow: var(--shadow-sm); font-size: 18px; font-weight: 800; color: var(--ink); cursor: pointer; display: flex; align-items: center; justify-content: center;"
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                ` : ''}
              </div>

              <!-- Thumbnail Gallery Row (Fixed 4:3 thumbnails) -->
              <div style="display: flex; gap: 10px; margin-bottom: 24px; overflow-x: auto; padding-bottom: 4px;">
                ${images.map((img, idx) => {
      const thumbNorm = window.ProductImage ? window.ProductImage.normalize(img, `Angle ${idx + 1}`) : { url: img, alt: `Angle ${idx + 1}` };
      const isActive = idx === this.activeImageIndex;
      return `
                    <button 
                      type="button"
                      onclick="ProductViewComponent.switchImage(${idx})" 
                      style="width: 80px; height: 60px; border-radius: var(--radius-md); overflow: hidden; border: 2.5px solid ${isActive ? 'var(--violet)' : 'var(--line)'}; flex-shrink: 0; opacity: ${isActive ? '1' : '0.65'}; padding: 0; background: none; cursor: pointer; position: relative; transition: all 0.2s ease;"
                      aria-label="View photo ${idx + 1}"
                    >
                      <img src="${thumbNorm.url}" alt="${thumbNorm.alt}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                    </button>
                  `;
    }).join('')}
              </div>

              <!-- Product Headline & Badges -->
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                  <span class="pill-badge pill-badge-violet">${product.productType || product.category}</span>
                  ${product.brand ? `<span class="pill-badge pill-badge-muted">${product.brand}</span>` : ''}
                  <span style="font-size: 13px; color: var(--muted); font-weight: 600;">📍 ${product.area}, Sambhajinagar (${product.distanceKm} km away)</span>
                </div>
                <h1 style="font-size: 26px; font-weight: 900; color: var(--ink); line-height: 1.25; margin-bottom: 8px;">
                  ${product.title}
                </h1>
                <div style="display: flex; align-items: center; gap: 12px; font-size: 13px;">
                  <div style="display: flex; align-items: center; gap: 4px; font-weight: 700; color: var(--ink);">
                    <span style="color: #f59e0b;">★</span>
                    <span>${product.rating}</span>
                    <span style="color: var(--muted); font-weight: 500;">(${product.reviewsCount} verified reviews)</span>
                  </div>
                  <span>•</span>
                  <span style="color: var(--success); font-weight: 700;">✓ Verified Local Owner</span>
                </div>
              </div>

              <!-- Owner Profile Card -->
              <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-card); padding: 18px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; gap: 14px; box-shadow: var(--shadow-xs);">
                <div style="display: flex; align-items: center; gap: 14px;">
                  <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 100%); color: var(--white); display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: var(--font-display); font-size: 16px;">
                    ${product.owner.avatar}
                  </div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <h4 style="font-size: 15px; font-weight: 800; color: var(--ink);">${product.owner.name}</h4>
                      <span style="color: var(--violet); font-size: 12px;" title="Aadhaar Verified">✓</span>
                    </div>
                    <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">
                      Member since ${product.owner.joinedDate} • ${product.owner.area}
                    </div>
                  </div>
                </div>

                <div style="text-align: right;">
                  <span class="pill-badge pill-badge-success">★ ${product.owner.rating} (${product.owner.reviewsCount})</span>
                </div>
              </div>

              <!-- Product Description -->
              <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-card); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-xs);">
                <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 10px;">Item Description</h3>
                <p style="font-size: 14px; color: var(--ink-700); line-height: 1.6; margin-bottom: 16px;">
                  ${product.description}
                </p>

                <h4 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 8px;">Specifications & Included Kit:</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; margin-bottom: 20px;">
                  ${product.specs.map(spec => `
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink); background-color: var(--ink-50); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--line);">
                      <span style="color: var(--violet);">✓</span>
                      <span>${spec}</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Product-Type Specific Handover Checklist Preview -->
                ${checklist.length > 0 ? `
                  <div style="background-color: var(--violet-light); border: 1.5px solid var(--violet-tint); border-radius: var(--radius-md); padding: 16px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                      <span style="font-size: 16px;">📋</span>
                      <h4 style="font-size: 13px; font-weight: 800; color: var(--violet-dark); text-transform: uppercase; letter-spacing: 0.05em;">
                        ${product.productType} Handover & Return Protocol:
                      </h4>
                    </div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--ink);">
                      ${checklist.map(item => `
                        <li style="display: flex; align-items: flex-start; gap: 6px;">
                          <span style="color: var(--violet); font-weight: 700;">●</span>
                          <span>${item.label}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>

            </div>

            <!-- RIGHT COLUMN: Interactive Live Price Calculator Card -->
            <div style="min-width: 0;">
              <div style="position: sticky; top: 90px; background-color: var(--white); border: 1.5px solid var(--violet-tint); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-lg);">
                
                <!-- Calculator Header -->
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--line);">
                  <div>
                    <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--violet);">Rental Calculator</span>
                    <h3 style="font-size: 18px; font-weight: 900; color: var(--ink);">Select Your Rental Plan</h3>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: 22px; font-weight: 900; color: var(--ink);">${window.AppState.formatCurrency(product.dailyPrice)}</div>
                    <div style="font-size: 11px; color: var(--muted);">per day standard</div>
                  </div>
                </div>

                <!-- 1. DURATION PLAN SELECTOR (1 week, 1 month, 6 months, custom daily) -->
                <div style="margin-bottom: 16px;">
                  <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--muted); margin-bottom: 8px;">Choose Rental Duration Plan:</label>
                  <div class="plan-options-grid">
                    <button 
                      class="plan-pill-btn ${draft.planId === 'daily' ? 'active' : ''}" 
                      onclick="ProductViewComponent.selectPlan('daily', 1)"
                    >
                      <span class="plan-pill-name">Daily</span>
                      <span class="plan-pill-discount">Custom</span>
                    </button>

                    <button 
                      class="plan-pill-btn ${draft.planId === 'week_1' ? 'active' : ''}" 
                      onclick="ProductViewComponent.selectPlan('week_1', 7)"
                    >
                      <span class="plan-pill-name">1 Week</span>
                      <span class="plan-pill-discount" style="color: var(--violet);">Save 10%</span>
                    </button>

                    <button 
                      class="plan-pill-btn ${draft.planId === 'month_1' ? 'active' : ''}" 
                      onclick="ProductViewComponent.selectPlan('month_1', 30)"
                    >
                      <span class="plan-pill-name">1 Month</span>
                      <span class="plan-pill-discount" style="color: var(--violet);">Save 25%</span>
                    </button>

                    <button 
                      class="plan-pill-btn ${draft.planId === 'month_6' ? 'active' : ''}" 
                      onclick="ProductViewComponent.selectPlan('month_6', 180)"
                    >
                      <span class="plan-pill-name">6 Months</span>
                      <span class="plan-pill-discount" style="color: #10b981;">Save 40%</span>
                    </button>
                  </div>
                </div>

                <!-- 2. DATE RANGE PICKER -->
                <div class="calc-dates-row">
                  <div class="calc-input-group">
                    <label for="productStartDate">Start Date</label>
                    <input 
                      type="date" 
                      id="productStartDate" 
                      value="${draft.startDate}" 
                      min="${window.AppState.getTodayDateString()}"
                      onchange="ProductViewComponent.onDateRangeChange()" 
                    />
                  </div>
                  <div class="calc-input-group">
                    <label for="productEndDate">End Date</label>
                    <input 
                      type="date" 
                      id="productEndDate" 
                      value="${draft.endDate}" 
                      min="${draft.startDate}"
                      onchange="ProductViewComponent.onDateRangeChange()" 
                    />
                  </div>
                </div>

                <!-- 3. FULFILLMENT METHOD (Doorstep Delivery vs Self Pickup) -->
                <div style="margin-bottom: 14px;">
                  <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--muted); margin-bottom: 6px;">Handover Method:</label>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <button 
                      class="btn btn-sm ${draft.fulfillmentMethod === 'delivery' ? 'btn-violet' : 'btn-secondary'}" 
                      onclick="ProductViewComponent.setFulfillment('delivery')"
                      style="border-radius: var(--radius-md); font-size: 12px; padding: 10px 8px;"
                    >
                      🚚 Delivery (+₹149)
                    </button>
                    <button 
                      class="btn btn-sm ${draft.fulfillmentMethod === 'pickup' ? 'btn-violet' : 'btn-secondary'}" 
                      onclick="ProductViewComponent.setFulfillment('pickup')"
                      style="border-radius: var(--radius-md); font-size: 12px; padding: 10px 8px;"
                    >
                      📍 Self Pickup (Free)
                    </button>
                  </div>
                </div>

                <!-- 4. DAMAGE PROTECTION TOGGLE -->
                <label class="calc-toggle-row">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <input 
                      type="checkbox" 
                      id="protectionToggle" 
                      ${draft.hasProtection ? 'checked' : ''} 
                      onchange="ProductViewComponent.toggleProtection(event)" 
                    />
                    <div>
                      <strong style="font-size: 13px; color: var(--ink);">Comprehensive Damage Protection (+₹${window.ONRENT_CONFIG.pricing.defaultProtectionFee})</strong>
                      <div style="font-size: 11px; color: var(--muted);">Shields against accidental scratches and normal wear</div>
                    </div>
                  </div>
                </label>

                <!-- 5. ITEMIZED PRICING BREAKDOWN TABLE -->
                <div class="calc-breakdown-list">
                  <div class="calc-breakdown-row">
                    <span>Base Rent (${calc.daysCount} days × ${window.AppState.formatCurrency(calc.dailyRate)})</span>
                    <span>${window.AppState.formatCurrency(calc.baseRent)}</span>
                  </div>

                  ${calc.discountAmount > 0 ? `
                    <div class="calc-breakdown-row" style="color: var(--success); font-weight: 600;">
                      <span>Plan Discount (${calc.discountPercent}%)</span>
                      <span>-${window.AppState.formatCurrency(calc.discountAmount)}</span>
                    </div>
                  ` : ''}

                  <div class="calc-breakdown-row highlight-net">
                    <span>Net Rental Charge</span>
                    <span>${window.AppState.formatCurrency(calc.netRent)}</span>
                  </div>

                  <div class="calc-breakdown-row">
                    <span>Taxes (${calc.taxLabel})</span>
                    <span>+${window.AppState.formatCurrency(calc.taxAmount)}</span>
                  </div>

                  ${calc.hasProtection ? `
                    <div class="calc-breakdown-row">
                      <span>Damage Protection</span>
                      <span>+${window.AppState.formatCurrency(calc.protectionFee)}</span>
                    </div>
                  ` : ''}

                  <div class="calc-breakdown-row">
                    <span>Fulfillment (${calc.fulfillmentLabel})</span>
                    <span>${calc.deliveryFee > 0 ? '+' + window.AppState.formatCurrency(calc.deliveryFee) : 'FREE'}</span>
                  </div>

                  <div class="calc-breakdown-row" style="padding-top: 4px; color: var(--ink); font-weight: 700;">
                    <span>Refundable Deposit (Scaled)</span>
                    <span style="color: var(--violet);">${window.AppState.formatCurrency(calc.deposit)}</span>
                  </div>

                  <div class="calc-breakdown-row highlight-total">
                    <span>Total Amount Payable</span>
                    <span class="total-val">${window.AppState.formatCurrency(calc.totalPayable)}</span>
                  </div>
                </div>

                <!-- Refund Guarantee Notice -->
                <div style="background-color: var(--brand-50); border: 1px solid var(--brand-card-border); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 11px; color: var(--brand-900); margin-bottom: 18px; display: flex; align-items: center; gap: 8px;">
                  <span>💰</span>
                  <span><strong>100% Refundable Deposit:</strong> Released immediately upon return inspection.</span>
                </div>

                <!-- PROCEED TO BOOK BUTTON -->
                <button class="btn btn-primary btn-lg btn-full" onclick="ProductViewComponent.proceedToCheckout()">
                  Proceed to Verification & Booking →
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    `;

    // Apply 2-column layout on desktop
    const styleEl = document.getElementById('productDynamicStyles') || document.createElement('style');
    styleEl.id = 'productDynamicStyles';
    styleEl.innerHTML = `
      @media (min-width: 992px) {
        .product-layout-grid {
          grid-template-columns: 1.4fr 1fr !important;
        }
      }
    `;
    document.head.appendChild(styleEl);
  },

  switchImage(idx) {
    this.activeImageIndex = idx;
    this.render();
  },

  nextImage() {
    const productId = window.AppState.selectedProductId || (window.AppState.products[0] && window.AppState.products[0].id) || 'onr-cam-01';
    const product = window.AppState.getProductById(productId);
    const count = (product && product.images) ? product.images.length : 1;
    this.activeImageIndex = (this.activeImageIndex + 1) % count;
    this.render();
  },

  prevImage() {
    const productId = window.AppState.selectedProductId || (window.AppState.products[0] && window.AppState.products[0].id) || 'onr-cam-01';
    const product = window.AppState.getProductById(productId);
    const count = (product && product.images) ? product.images.length : 1;
    this.activeImageIndex = (this.activeImageIndex - 1 + count) % count;
    this.render();
  },

  handleTouchStart(e) {
    if (!e.touches || e.touches.length === 0) return;
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  },

  handleTouchEnd(e) {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const diffX = e.changedTouches[0].clientX - this.touchStartX;
    const diffY = e.changedTouches[0].clientY - this.touchStartY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
  },

  selectPlan(planId, days) {
    const draft = window.AppState.checkoutDraft;
    draft.planId = planId;
    draft.daysCount = days;
    draft.endDate = window.AppState.getFutureDateString(days);
    this.render();
  },

  onDateRangeChange() {
    const startVal = document.getElementById('productStartDate').value;
    const endVal = document.getElementById('productEndDate').value;
    const draft = window.AppState.checkoutDraft;
    draft.startDate = startVal;
    draft.endDate = endVal;
    draft.daysCount = window.AppState.diffDays(startVal, endVal);
    draft.planId = 'daily';
    this.render();
  },

  setFulfillment(method) {
    window.AppState.checkoutDraft.fulfillmentMethod = method;
    this.render();
  },

  toggleProtection(e) {
    window.AppState.checkoutDraft.hasProtection = e.target.checked;
    this.render();
  },

  proceedToCheckout() {
    window.AppState.navigateTo('checkout');
  }
};
