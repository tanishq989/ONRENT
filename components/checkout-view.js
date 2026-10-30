/**
 * ONRENT — CHECKOUT & IDENTITY VERIFICATION VIEW COMPONENT
 * Renders checkout confirmation with itemized summary, document upload simulator,
 * payment-history check, and multi-state verification (pending, verified, needs_review).
 */

window.CheckoutViewComponent = {
  verificationState: 'verified', // 'pending' | 'verified' | 'needs_review'
  isChecking: false,
  uploadedDocName: 'aadhaar_card_front_back.pdf',
  isBreakdownOpen: false,

  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const draft = window.AppState.checkoutDraft;
    const product = window.AppState.getProductById(draft.productId);
    const user = window.AppState.userProfile;
    const calc = draft.pricingBreakdown || window.AppState.calculatePrice(
      product.dailyPrice,
      draft.planId,
      draft.daysCount,
      draft.hasProtection,
      draft.fulfillmentMethod
    );

    const normImg = window.ProductImage ? window.ProductImage.normalize(product.images[0], product.title) : { url: (typeof product.images[0] === 'object' ? product.images[0].url : product.images[0]), alt: product.title };

    container.innerHTML = `
      <div id="checkoutScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 860px;">
          
          <!-- Back button -->
          <div style="margin-bottom: 20px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.goBack()">
              ← Back to Product
            </button>
          </div>

          <div class="section-head" style="margin-bottom: 24px;">
            <div>
              <span class="pill-badge pill-badge-violet" style="margin-bottom: 6px;">STEP 4: VERIFICATION & CHECKOUT</span>
              <h1 class="section-title">Confirm Your Rental Reservation</h1>
              <p class="section-subtitle">Complete identity verification to finalize your booking in Sambhajinagar</p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
            
            <!-- ORDER SUMMARY CARD -->
            <div style="background-color: var(--white); border: 1.5px solid var(--line); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-sm);">
              <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--line);">
                <div style="width: 80px; height: 60px; flex-shrink: 0; border-radius: var(--radius-md); overflow: hidden; position: relative;">
                  ${window.ProductImage ? window.ProductImage.render({
      src: normImg.url,
      alt: normImg.alt,
      productType: product.productType,
      aspectRatio: '4/3'
    }) : `<img src="${normImg.url}" alt="${normImg.alt}" style="width: 100%; height: 100%; object-fit: cover;" />`}
                </div>
                <div>
                  <span class="pill-badge pill-badge-lime" style="font-size: 10px; margin-bottom: 4px;">${product.category}</span>
                  <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">${product.title}</h3>
                  <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">
                    Owner: <strong>${product.owner.name}</strong> • ${product.owner.area}
                  </div>
                </div>
              </div>

              <!-- Dates and Plan breakdown summary -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px;">
                <div style="background-color: var(--ink-50); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--line);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Duration & Plan</div>
                  <div style="font-size: 14px; font-weight: 800; color: var(--ink); margin-top: 2px;">
                    ${calc.planLabel} (${calc.daysCount} Days)
                  </div>
                </div>

                <div style="background-color: var(--ink-50); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--line);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Rental Window</div>
                  <div style="font-size: 13px; font-weight: 700; color: var(--ink); margin-top: 2px;">
                    ${window.AppState.formatDate(draft.startDate)} → ${window.AppState.formatDate(draft.endDate)}
                  </div>
                </div>

                <div style="background-color: var(--ink-50); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--line);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Handover Method</div>
                  <div style="font-size: 13px; font-weight: 800; color: var(--violet); margin-top: 2px;">
                    ${calc.fulfillmentLabel}
                  </div>
                </div>
              </div>

              <!-- Price Breakdown with Collapsible Taxes & Fees -->
              ${window.AppState.renderPriceBreakdownHtml(calc, {
                id: 'checkoutBreakdownDetails',
                isOpen: this.isBreakdownOpen,
                toggleFn: 'CheckoutViewComponent.toggleBreakdown()'
              })}

              <!-- Refund Guarantee Notice -->
              <div style="background-color: var(--brand-50); border: 1px solid var(--brand-card-border); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 11px; color: var(--brand-900); margin-top: 14px; display: flex; align-items: center; gap: 8px;">
                <svg class="icon icon-16" aria-hidden="true"><use href="#icon-banknote-rupee"></use></svg>
                <span><strong>100% Refundable Deposit:</strong> Released immediately upon return inspection.</span>
              </div>
            </div>

            <!-- IDENTITY VERIFICATION & PAYMENT HISTORY CARD -->
            <div style="background-color: var(--white); border: 1.5px solid var(--line); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 18px;">
                <div>
                  <h3 style="font-size: 18px; font-weight: 900; color: var(--ink);">Renter Trust & Identity Verification</h3>
                  <p style="font-size: 13px; color: var(--muted); margin-top: 2px;">
                    Mandatory for peer-to-peer asset protection in Chhatrapati Sambhajinagar.
                  </p>
                </div>

                <!-- Status Badge -->
                <div id="verificationStatusBadge">
                  ${CheckoutViewComponent.renderStatusBadge(this.verificationState)}
                </div>
              </div>

              <!-- Verification State Simulator Selector (For Quality / Testing requirement) -->
              <div style="background-color: var(--ink-50); border: 1px dashed var(--line); border-radius: var(--radius-md); padding: 10px 14px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--muted);">Simulate Verification State:</span>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <button 
                    class="btn btn-sm ${this.verificationState === 'verified' ? 'btn-violet' : 'btn-secondary'}" 
                    onclick="CheckoutViewComponent.setVerificationState('verified')"
                    style="display: inline-flex; align-items: center; gap: 4px;"
                  >
                    <svg class="icon icon-16" aria-hidden="true"><use href="#icon-check"></use></svg> <span>Verified</span>
                  </button>
                  <button 
                    class="btn btn-sm ${this.verificationState === 'pending' ? 'btn-violet' : 'btn-secondary'}" 
                    onclick="CheckoutViewComponent.setVerificationState('pending')"
                    style="display: inline-flex; align-items: center; gap: 4px;"
                  >
                    <svg class="icon icon-16" aria-hidden="true"><use href="#icon-clock"></use></svg> <span>Pending</span>
                  </button>
                  <button 
                    class="btn btn-sm ${this.verificationState === 'needs_review' ? 'btn-violet' : 'btn-secondary'}" 
                    onclick="CheckoutViewComponent.setVerificationState('needs_review')"
                    style="display: inline-flex; align-items: center; gap: 4px;"
                  >
                    <svg class="icon icon-16" aria-hidden="true"><use href="#icon-alert"></use></svg> <span>Needs Review</span>
                  </button>
                </div>
              </div>

              <!-- Renter Input Details -->
              <form id="checkoutVerificationForm" onsubmit="CheckoutViewComponent.handleSubmitBooking(event)" style="display: flex; flex-direction: column; gap: 14px;">
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Full Legal Name</label>
                    <input 
                      type="text" 
                      id="renterLegalName" 
                      value="${user.name}" 
                      required 
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600;" 
                    />
                  </div>

                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Contact Phone Number</label>
                    <input 
                      type="tel" 
                      id="renterPhoneNumber" 
                      value="${user.phone}" 
                      required 
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600;" 
                    />
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Govt ID Type</label>
                    <select 
                      id="renterIdType" 
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600; background: white;"
                    >
                      <option value="Aadhaar Card" selected>Aadhaar Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>

                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Govt ID Number</label>
                    <input 
                      type="text" 
                      id="renterGovtIdNumber" 
                      value="${user.idNumber}" 
                      required 
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600;" 
                    />
                  </div>
                </div>

                <!-- Document Upload Simulator Section -->
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">
                    Upload Document Photo / Scan
                  </label>
                  <div style="border: 2px dashed var(--line); border-radius: var(--radius-md); padding: 16px; text-align: center; background-color: var(--ink-50); cursor: pointer;" onclick="document.getElementById('docFileInput').click()">
                    <input type="file" id="docFileInput" style="display: none;" onchange="CheckoutViewComponent.onDocUploaded(event)" accept="image/*,.pdf" />
                    <div style="margin-bottom: 4px;"><svg class="icon icon-28" style="color: var(--brand-700);" aria-hidden="true"><use href="#icon-receipt"></use></svg></div>
                    <strong style="font-size: 13px; color: var(--violet);" id="uploadFileNameLabel">
                      ${this.uploadedDocName}
                    </strong>
                    <div style="font-size: 11px; color: var(--muted); margin-top: 2px;">
                      Click to replace ID photo (JPG, PNG or PDF up to 10MB)
                    </div>
                  </div>
                </div>

                <!-- Payment History Check Report Box -->
                <div style="background-color: var(--ink-50); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 14px; display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <div style="font-size: 12px; font-weight: 700; color: var(--ink);">Payment & Return History Standing:</div>
                    <div style="font-size: 12px; color: var(--success); font-weight: 700; margin-top: 2px; display: flex; align-items: center; gap: 4px;">
                      <svg class="icon icon-16" style="color: var(--success);" aria-hidden="true"><use href="#icon-check"></use></svg> <span>${user.paymentHistoryScore}</span>
                    </div>
                  </div>
                  <span class="pill-badge pill-badge-success">0 Disputes</span>
                </div>

                <!-- Notice banner based on verification state -->
                <div id="stateNoticeBanner">
                  ${CheckoutViewComponent.renderStateNotice(this.verificationState)}
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  class="btn btn-lime btn-lg btn-full" 
                  style="margin-top: 8px;"
                  ${this.verificationState === 'pending' ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}
                >
                  Confirm & Reserve Item (${window.AppState.formatCurrency(calc.totalPayable)}) →
                </button>

              </form>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  renderStatusBadge(state) {
    if (state === 'verified') {
      return `<span class="pill-badge pill-badge-success" style="font-size: 12px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 4px;"><svg class="icon icon-16" aria-hidden="true"><use href="#icon-check"></use></svg> <span>ID Verified</span></span>`;
    }
    if (state === 'needs_review') {
      return `<span class="pill-badge pill-badge-orange" style="font-size: 12px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 4px;"><svg class="icon icon-16" aria-hidden="true"><use href="#icon-alert"></use></svg> <span>Needs Manual Review</span></span>`;
    }
    return `<span class="pill-badge pill-badge-muted" style="font-size: 12px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 4px;"><svg class="icon icon-16" aria-hidden="true"><use href="#icon-clock"></use></svg> <span>Verification Pending</span></span>`;
  },

  renderStateNotice(state) {
    if (state === 'verified') {
      return `
        <div style="background-color: var(--success-light); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 12px; font-size: 12px; color: #065f46; display: flex; align-items: flex-start; gap: 6px;">
          <svg class="icon icon-16" style="color: #065f46; margin-top: 2px;" aria-hidden="true"><use href="#icon-check"></use></svg>
          <div><strong>Instant Handover Approved:</strong> Your Aadhaar identity and rental history check passed. The owner can hand over the gear immediately upon condition confirmation.</div>
        </div>
      `;
    }
    if (state === 'needs_review') {
      return `
        <div style="background-color: var(--warning-light); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: var(--radius-md); padding: 12px; font-size: 12px; color: #92400e; display: flex; align-items: flex-start; gap: 6px;">
          <svg class="icon icon-16" style="color: #92400e; margin-top: 2px;" aria-hidden="true"><use href="#icon-alert"></use></svg>
          <div><strong>Owner Review Required:</strong> Because your document was uploaded recently, the owner in Sambhajinagar will review your profile during mutual handover inspection before releasing equipment.</div>
        </div>
      `;
    }
    return `
      <div style="background-color: var(--ink-100); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 12px; font-size: 12px; color: var(--muted); display: flex; align-items: flex-start; gap: 6px;">
        <svg class="icon icon-16" style="color: var(--muted); margin-top: 2px;" aria-hidden="true"><use href="#icon-clock"></use></svg>
        <div><strong>Verification Underway:</strong> Checking resident records. Please wait or simulate verified state above to continue.</div>
      </div>
    `;
  },

  setVerificationState(state) {
    this.verificationState = state;
    window.AppState.updateVerification(state);
    this.render();
  },

  onDocUploaded(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      this.uploadedDocName = file.name;
      const label = document.getElementById('uploadFileNameLabel');
      if (label) label.textContent = file.name + ' (Uploaded)';
      NavigationComponent.showToast('Document uploaded: ' + file.name, 'success');
    }
  },

  handleSubmitBooking(e) {
    e.preventDefault();
    const draft = window.AppState.checkoutDraft;
    const product = window.AppState.getProductById(draft.productId);
    const calc = draft.pricingBreakdown;

    const renterName = document.getElementById('renterLegalName').value;
    const renterPhone = document.getElementById('renterPhoneNumber').value;
    const renterId = document.getElementById('renterGovtIdNumber').value;

    const normProductImg = window.ProductImage ? window.ProductImage.normalize(product.images[0], product.title) : { url: (typeof product.images[0] === 'object' ? product.images[0].url : product.images[0]) };

    const payload = {
      productId: product.id,
      productTitle: product.title,
      productCategory: product.category,
      productType: product.productType,
      brand: product.brand,
      productImage: normProductImg.url,
      ownerName: product.owner.name,
      ownerPhone: product.owner.phone,
      ownerArea: product.owner.area,
      renterName,
      renterPhone,
      renterIdNumber: renterId,
      planId: calc.planId,
      planLabel: calc.planLabel,
      startDate: draft.startDate,
      endDate: draft.endDate,
      daysCount: calc.daysCount,
      dailyRate: calc.dailyRate,
      baseRent: calc.baseRent,
      discountAmount: calc.discountAmount,
      netRent: calc.netRent,
      taxAmount: calc.taxAmount,
      protectionFee: calc.protectionFee,
      deliveryFee: calc.deliveryFee,
      deposit: calc.deposit,
      totalPayable: calc.totalPayable,
      fulfillmentMethod: calc.fulfillmentMethod,
      verificationStatus: this.verificationState
    };

    const newBooking = window.AppState.createBooking(payload);
    this.showConfirmationModal(newBooking);
  },

  showConfirmationModal(rental) {
    let modal = document.getElementById('bookingConfirmedModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bookingConfirmedModal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-backdrop active" id="confirmedBackdrop">
        <div class="modal-box" style="text-align: center; max-width: 520px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--brand-50); color: var(--brand-700); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; animation: bounce 0.6s ease;"><svg class="icon icon-28" aria-hidden="true"><use href="#icon-party"></use></svg></div>
          <span class="pill-badge pill-badge-lime" style="margin-bottom: 10px;">RESERVATION CONFIRMED</span>
          <h2 style="font-size: 24px; font-weight: 900; color: var(--ink); margin-bottom: 6px;">
            Booking Confirmed!
          </h2>
          <div style="font-family: monospace; font-size: 16px; font-weight: 700; background-color: var(--ink-50); border: 1px solid var(--line); padding: 6px 16px; border-radius: var(--radius-sm); display: inline-block; margin-bottom: 14px; color: var(--violet);">
            ${rental.bookingId}
          </div>

          <p style="font-size: 14px; color: var(--muted); line-height: 1.5; margin-bottom: 22px;">
            Your reservation for <strong>${rental.productTitle}</strong> has been transmitted to owner <strong>${rental.ownerName}</strong> in ${rental.ownerArea}.
          </p>

          <div style="background-color: var(--violet-light); border: 1.5px solid var(--violet-tint); border-radius: var(--radius-md); padding: 14px; text-align: left; margin-bottom: 24px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span>Total Paid & Held:</span>
              <strong style="color: var(--ink);">${window.AppState.formatCurrency(rental.totalPayable)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--violet-dark); font-weight: 600;">
              <span>Refundable Escrow Deposit:</span>
              <span>${window.AppState.formatCurrency(rental.deposit)}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn btn-violet btn-lg btn-full" onclick="CheckoutViewComponent.goToTracker('${rental.bookingId}')">
              Open Order Tracker & Milestones →
            </button>
            <button class="btn btn-secondary btn-full" onclick="CheckoutViewComponent.goToRentals()">
              View in My Rentals
            </button>
          </div>
        </div>
      </div>
    `;
  },

  toggleBreakdown() {
    const btn = document.querySelector('[aria-controls="checkoutBreakdownDetails"]');
    this.isBreakdownOpen = window.AppState.toggleBreakdown(btn, 'checkoutBreakdownDetails');
  },

  goToTracker(bookingId) {
    const modal = document.getElementById('bookingConfirmedModal');
    if (modal) modal.remove();
    window.AppState.navigateTo('tracker', { rentalId: bookingId });
  },

  goToRentals() {
    const modal = document.getElementById('bookingConfirmedModal');
    if (modal) modal.remove();
    window.AppState.navigateTo('rentals');
  }
};
