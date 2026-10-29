/**
 * ONRENT — HANDOVER & RETURN INSPECTION COMPONENT
 * Implements Step 6 (Digital Handover with photo condition records & mutual signatures)
 * and Step 8 (Return form with damage deduction calculator & final deposit release).
 */

window.HandoverReturnComponent = {
  // Return form local state
  damageReported: false,
  damageFee: 0,
  damageNotes: '',
  simulatedReturnPhotos: [],

  renderHandover() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const rentalId = window.AppState.activeRentalId || (window.AppState.rentals[0] && window.AppState.rentals[0].bookingId);
    const rental = window.AppState.getRentalById(rentalId);

    if (!rental) {
      container.innerHTML = `<div class="container" style="padding: 40px; text-align: center;">No booking found.</div>`;
      return;
    }

    const product = window.AppState.getProductById(rental.productId) || {};
    const productType = rental.productType || product.productType || 'DSLR cameras';
    const checklists = (window.ONRENT_CONFIG && window.ONRENT_CONFIG.handoverChecklists) || {};
    const typeSpecificChecklist = checklists[productType] || [];

    const normProductImg = window.ProductImage ? window.ProductImage.normalize(rental.productImage, rental.productTitle) : { url: (typeof rental.productImage === 'object' ? rental.productImage.url : rental.productImage), alt: rental.productTitle };

    const defaultPhotos = (rental.handover && rental.handover.photos && rental.handover.photos.length > 0)
      ? rental.handover.photos 
      : (product.images && product.images.length > 0)
        ? product.images.map(img => (typeof img === 'object' ? img.url : img))
        : [
            'public/images/handover/handover-camera-sensor.webp',
            'public/images/handover/handover-serial-chassis.webp',
            'public/images/handover/handover-accessories-cables.webp'
          ];

    container.innerHTML = `
      <div id="handoverScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 800px;">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('tracker', { rentalId: '${rental.bookingId}' })">
              ← Back to Tracker
            </button>
            <span class="pill-badge pill-badge-violet">STEP 6: DIGITAL HANDOVER</span>
          </div>

          <div class="section-head" style="margin-bottom: 22px;">
            <div>
              <h1 class="section-title">Mutual Handover & Inspection Form</h1>
              <p class="section-subtitle">
                Both parties confirm condition photos and sign before gear release in Sambhajinagar
              </p>
            </div>
          </div>

          <!-- BOOKING CONTEXT HEADER -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 20px; margin-bottom: 24px; display: flex; gap: 16px; align-items: center; box-shadow: var(--shadow-xs);">
            <div style="width: 72px; height: 54px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0; position: relative;">
              ${window.ProductImage ? window.ProductImage.render({
                src: normProductImg.url,
                alt: normProductImg.alt,
                productType: productType,
                aspectRatio: '4/3'
              }) : `<img src="${normProductImg.url}" alt="${normProductImg.alt}" style="width: 100%; height: 100%; object-fit: cover;" />`}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 11px; font-weight: 700; color: var(--violet); text-transform: uppercase;">Booking: ${rental.bookingId}</span>
                <span class="pill-badge pill-badge-lime" style="font-size: 10px; padding: 2px 8px;">${productType}</span>
                ${rental.brand ? `<span class="pill-badge pill-badge-violet" style="font-size: 10px; padding: 2px 8px;">${rental.brand}</span>` : ''}
              </div>
              <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 2px;">${rental.productTitle}</h3>
              <div style="font-size: 12px; color: var(--muted);">Owner: ${rental.ownerName} • Renter: ${rental.renterName}</div>
            </div>
          </div>

          <!-- HANDOVER FORM -->
          <form onsubmit="HandoverReturnComponent.submitHandover(event, '${rental.bookingId}')" style="display: flex; flex-direction: column; gap: 20px;">
            
            <!-- 1. Condition Verification Checklist Tailored per Product Type -->
            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-xs);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
                <div>
                  <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">${productType} Handover Checklist</h3>
                  <p style="font-size: 12px; color: var(--muted);">Mandatory inspection points tailored specifically for ${productType}</p>
                </div>
                <span class="pill-badge pill-badge-violet">${productType} Verification</span>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
                ${typeSpecificChecklist.map((item, idx) => `
                  <label style="display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--ink); cursor: pointer; padding: 10px 12px; background-color: var(--paper); border-radius: var(--radius-sm); border: 1px solid var(--line);">
                    <input type="checkbox" id="chk_item_${idx}" checked required style="width: 18px; height: 18px; accent-color: var(--violet); margin-top: 2px;" />
                    <div style="flex: 1;">
                      <span style="font-weight: 600;">${item.label}</span>
                      ${item.critical ? `<span style="display: inline-block; margin-left: 6px; font-size: 10px; font-weight: 700; color: #b45309; background: var(--warning-light); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.4);">CRITICAL</span>` : ''}
                    </div>
                  </label>
                `).join('')}
              </div>

              <div style="font-size: 11px; font-weight: 800; color: var(--muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Core Baseline Checks</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ink); cursor: pointer;">
                  <input type="checkbox" id="chk_core_1" checked required style="width: 18px; height: 18px; accent-color: var(--violet);" />
                  <span>Item powered on and functionality verified in person.</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ink); cursor: pointer;">
                  <input type="checkbox" id="chk_core_2" checked required style="width: 18px; height: 18px; accent-color: var(--violet);" />
                  <span>All specified cables, batteries, chargers, and accessories present.</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ink); cursor: pointer;">
                  <input type="checkbox" id="chk_core_3" checked required style="width: 18px; height: 18px; accent-color: var(--violet);" />
                  <span>Cosmetic condition matches "Like New / Clean" baseline without scratches.</span>
                </label>
              </div>
            </div>

            <!-- 2. Inspection Photos -->
            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-xs);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
                <div>
                  <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">2. Mutual Baseline Photos</h3>
                  <div style="font-size: 12px; color: var(--muted);">Timestamped photos protect deposit return</div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <input type="file" id="handoverFileInput" accept="image/*" style="display: none;" onchange="HandoverReturnComponent.handlePhotoUpload(event, 'handover')" />
                  <button type="button" class="btn btn-secondary btn-sm" onclick="HandoverReturnComponent.triggerPhotoUpload('handover')">
                    📷 + Upload Photo
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="HandoverReturnComponent.addPresetPhoto('handover')">
                    + Add Angle
                  </button>
                </div>
              </div>

              <div id="handoverPhotosGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                ${defaultPhotos.map((photo, i) => `
                  <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--line); aspect-ratio: 4 / 3; position: relative;">
                    <img src="${typeof photo === 'object' ? photo.url : photo}" alt="Angle ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;" />
                    <span style="position: absolute; bottom: 6px; left: 6px; font-size: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px;">
                      Angle ${i + 1} ✓
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 3. Mutual Digital Signatures & Timestamp -->
            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-xs);">
              <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 14px;">3. Digital Signatures & Timestamp</h3>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Renter Digital Signature</label>
                  <input 
                    type="text" 
                    id="renterSigInput" 
                    value="${rental.renterName}" 
                    required 
                    style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-family: cursive; font-size: 16px; color: var(--violet-dark);" 
                  />
                </div>

                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Owner Digital Signature</label>
                  <input 
                    type="text" 
                    id="ownerSigInput" 
                    value="${rental.ownerName}" 
                    required 
                    style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-family: cursive; font-size: 16px; color: var(--ink);" 
                  />
                </div>
              </div>

              <div>
                <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Handover Inspection Notes (Optional)</label>
                <textarea 
                  id="handoverNotesInput" 
                  rows="2" 
                  placeholder="Note any cosmetic marks or agreed return instructions..."
                  style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 13px;"
                >${rental.handover.notes || 'Gear handed over in excellent cosmetic and working order with all included accessories.'}</textarea>
              </div>
            </div>

            <!-- Submit Handover Button -->
            <button type="submit" class="btn btn-lime btn-lg btn-full">
              Confirm Handover & Activate Rental Status →
            </button>
          </form>

        </div>
      </div>
    `;
  },

  triggerPhotoUpload(type) {
    const input = document.getElementById(type === 'handover' ? 'handoverFileInput' : 'returnFileInput');
    if (input) input.click();
  },

  handlePhotoUpload(event, type) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const gridId = type === 'handover' ? 'handoverPhotosGrid' : 'returnPhotosGrid';
      const grid = document.getElementById(gridId);
      if (grid) {
        const count = grid.children.length + 1;
        const div = document.createElement('div');
        div.style.cssText = 'border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--violet); aspect-ratio: 4 / 3; position: relative;';
        div.innerHTML = `
          <img src="${dataUrl}" alt="${type === 'handover' ? 'Inspection' : 'Return'} Angle ${count}" style="width: 100%; height: 100%; object-fit: cover;" />
          <span style="position: absolute; bottom: 6px; left: 6px; font-size: 10px; background: rgba(111, 75, 246, 0.9); color: white; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
            ${type === 'handover' ? 'Inspection Angle' : 'Return Angle'} ${count} ✓ (Uploaded)
          </span>
        `;
        grid.appendChild(div);
      }
      NavigationComponent.showToast(`${type === 'handover' ? 'Inspection' : 'Return'} photo uploaded & previewed!`, 'success');
    };
    reader.readAsDataURL(file);
  },

  addPresetPhoto(type = 'handover') {
    const grid = document.getElementById(type === 'handover' ? 'handoverPhotosGrid' : 'returnPhotosGrid');
    if (grid) {
      const count = grid.children.length + 1;
      const div = document.createElement('div');
      div.style.cssText = 'border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--violet); aspect-ratio: 4 / 3; position: relative;';
      const imgSrc = type === 'handover' ? 'public/images/handover/handover-accessories-cables.webp' : 'public/images/handover/return-ports-clean.webp';
      div.innerHTML = `
        <img src="${imgSrc}" alt="${type === 'handover' ? 'Inspection' : 'Return'} Angle ${count}" style="width: 100%; height: 100%; object-fit: cover;" />
        <span style="position: absolute; bottom: 6px; left: 6px; font-size: 10px; background: rgba(111, 75, 246, 0.9); color: white; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
          ${type === 'handover' ? 'Inspection Angle' : 'Return Angle'} ${count} ✓ (Timestamped)
        </span>
      `;
      grid.appendChild(div);
    }
    NavigationComponent.showToast('Added condition snapshot with instant timestamp', 'success');
  },

  addHandoverPhoto() {
    this.addPresetPhoto('handover');
  },

  submitHandover(e, bookingId) {
    e.preventDefault();
    const renterSig = document.getElementById('renterSigInput').value;
    const ownerSig = document.getElementById('ownerSigInput').value;
    const notes = document.getElementById('handoverNotesInput').value;

    window.AppState.saveHandoverRecord(bookingId, {
      confirmedByOwner: true,
      confirmedByRenter: true,
      renterSignature: renterSig,
      ownerSignature: ownerSig,
      notes
    });

    NavigationComponent.showToast('Handover confirmed! Status changed to: In Rental', 'success');
    window.AppState.navigateTo('tracker', { rentalId: bookingId });
  },

  // =========================================================================
  // STEP 8: RETURN & DEPOSIT REFUND BREAKDOWN
  // =========================================================================
  renderReturn() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const rentalId = window.AppState.activeRentalId || (window.AppState.rentals[0] && window.AppState.rentals[0].bookingId);
    const rental = window.AppState.getRentalById(rentalId);

    if (!rental) {
      container.innerHTML = `<div class="container" style="padding: 40px; text-align: center;">No booking found.</div>`;
      return;
    }

    const product = window.AppState.getProductById(rental.productId) || {};
    const productType = rental.productType || product.productType || 'DSLR cameras';
    const checklists = (window.ONRENT_CONFIG && window.ONRENT_CONFIG.handoverChecklists) || {};
    const typeSpecificChecklist = checklists[productType] || [];

    const heldDeposit = rental.deposit;
    const damageFee = this.damageFee || 0;
    const netRefund = Math.max(heldDeposit - damageFee, 0);

    container.innerHTML = `
      <div id="returnScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 820px;">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('tracker', { rentalId: '${rental.bookingId}' })">
              ← Back to Tracker
            </button>
            <span class="pill-badge pill-badge-lime">STEP 8: RETURN & DEPOSIT REFUND</span>
          </div>

          <div class="section-head" style="margin-bottom: 22px;">
            <div>
              <h1 class="section-title">Item Return & Deposit Refund</h1>
              <p class="section-subtitle">
                Inspect return condition photos against baseline and release the security deposit
              </p>
            </div>
          </div>

          <!-- RETURN SUMMARY HEADER -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; gap: 14px; align-items: center;">
              <div style="width: 72px; height: 54px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0; position: relative;">
                ${window.ProductImage ? window.ProductImage.render({
                  src: (typeof rental.productImage === 'object' ? rental.productImage.url : rental.productImage),
                  alt: rental.productTitle,
                  productType: productType,
                  aspectRatio: '4/3'
                }) : `<img src="${typeof rental.productImage === 'object' ? rental.productImage.url : rental.productImage}" alt="${rental.productTitle}" style="width: 100%; height: 100%; object-fit: cover;" />`}
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span class="pill-badge pill-badge-violet" style="font-size: 11px;">Booking: ${rental.bookingId}</span>
                  <span class="pill-badge pill-badge-lime" style="font-size: 10px; padding: 2px 8px;">${productType}</span>
                  ${rental.brand ? `<span class="pill-badge pill-badge-violet" style="font-size: 10px; padding: 2px 8px;">${rental.brand}</span>` : ''}
                </div>
                <h3 style="font-size: 18px; font-weight: 800; color: var(--ink);">${rental.productTitle}</h3>
                <div style="font-size: 12px; color: var(--muted);">Owner: ${rental.ownerName} • Renter: ${rental.renterName}</div>
              </div>
            </div>

            <div style="text-align: right; background-color: var(--violet-light); padding: 12px 18px; border-radius: var(--radius-md);">
              <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Held Security Deposit</div>
              <div style="font-size: 22px; font-weight: 900; color: var(--violet);">
                ${window.AppState.formatCurrency(heldDeposit)}
              </div>
            </div>
          </div>

          <!-- 1. RETURN PHOTOS SECTION -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-xs);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
              <div>
                <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">1. Return Condition Photos</h3>
                <p style="font-size: 12px; color: var(--muted);">Uploaded photos are compared with baseline handover pictures</p>
              </div>
              <div style="display: flex; gap: 8px;">
                <input type="file" id="returnFileInput" accept="image/*" style="display: none;" onchange="HandoverReturnComponent.handlePhotoUpload(event, 'return')" />
                <button type="button" class="btn btn-secondary btn-sm" onclick="HandoverReturnComponent.triggerPhotoUpload('return')">
                  📷 + Upload Return Photo
                </button>
                <button class="btn btn-secondary btn-sm" onclick="HandoverReturnComponent.simulateReturnScan()">
                  🤖 AI Condition Diagnostic
                </button>
              </div>
            </div>

            <div id="returnPhotosGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 14px;">
              <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--line); aspect-ratio: 4 / 3; position: relative;">
                <img src="public/images/handover/return-front-condition.webp" alt="Return Front Condition" style="width: 100%; height: 100%; object-fit: cover;" />
                <span style="position: absolute; bottom: 6px; left: 6px; font-size: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px;">Return Front Condition ✓</span>
              </div>
              <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--line); aspect-ratio: 4 / 3; position: relative;">
                <img src="public/images/handover/return-ports-clean.webp" alt="Return Ports & Serial" style="width: 100%; height: 100%; object-fit: cover;" />
                <span style="position: absolute; bottom: 6px; left: 6px; font-size: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px;">Return Ports & Serial ✓</span>
              </div>
            </div>

            <div style="background-color: var(--success-light); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 12px 16px; font-size: 13px; color: #065f46; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 18px;">✓</span>
              <div>
                <strong>AI Inspection Diagnostic: Clean & Functional</strong>
                <div style="font-size: 11px; color: #047857;">Zero structural damage detected. Advisory note: Owner has final authority on deposit release.</div>
              </div>
            </div>
          </div>

          <!-- 2. PRODUCT-TYPE RETURN INSPECTION CHECKLIST -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-xs);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
              <div>
                <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">2. ${productType} Return Condition Audit</h3>
                <p style="font-size: 12px; color: var(--muted);">Verification against initial handover baseline</p>
              </div>
              <span class="pill-badge pill-badge-lime">${productType} Checklist</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${typeSpecificChecklist.map(item => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background-color: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-sm); font-size: 13px;">
                  <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                    <span style="color: var(--success); font-weight: 800; font-size: 15px;">✓</span>
                    <span style="color: var(--ink); font-weight: 600;">${item.label}</span>
                  </div>
                  <span style="font-size: 10px; font-weight: 700; color: #047857; background: var(--success-light); padding: 3px 8px; border-radius: 4px; white-space: nowrap;">Verified Clean</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3. DAMAGE ASSESSMENT TOGGLE & FEE DEDUCTION -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-xs);">
            <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 12px;">3. Owner Damage Assessment</h3>

            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
              <button 
                type="button" 
                class="btn ${!this.damageReported ? 'btn-violet' : 'btn-secondary'}" 
                onclick="HandoverReturnComponent.setDamageReported(false)"
              >
                ✓ No Damage (Normal Wear)
              </button>
              <button 
                type="button" 
                class="btn ${this.damageReported ? 'btn-violet' : 'btn-secondary'}" 
                onclick="HandoverReturnComponent.setDamageReported(true)"
              >
                ⚠️ Report Damage / Missing Gear
              </button>
            </div>

            ${this.damageReported ? `
              <div style="background-color: var(--warning-light); border: 1.5px solid rgba(245, 158, 11, 0.5); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
                <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">
                  Damage Deduction Amount (₹):
                </label>
                <input 
                  type="number" 
                  id="damageFeeInput" 
                  value="${this.damageFee || 500}" 
                  max="${heldDeposit}" 
                  min="0"
                  oninput="HandoverReturnComponent.onDamageFeeInput(event)"
                  style="width: 100%; max-width: 260px; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 16px; font-weight: 800; color: #b45309;"
                />
                <div style="font-size: 11px; color: #92400e; margin-top: 4px;">Max deductible is held deposit (${window.AppState.formatCurrency(heldDeposit)}).</div>

                <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin: 12px 0 4px;">
                  Damage Notes & Itemized Description:
                </label>
                <textarea 
                  id="damageNotesInput" 
                  rows="2" 
                  placeholder="Detail scratched lens cap, chipped cable, missing connector, etc."
                  style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 13px;"
                >Scratch on protective UV lens filter; replacement cost deducted from held deposit with renter consent.</textarea>
              </div>
            ` : ''}
          </div>

          <!-- 4. FINAL DEPOSIT REFUND BREAKDOWN -->
          <div style="background-color: var(--white); border: 1.5px solid var(--line); border-radius: var(--radius-xl); padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 14px;">4. Itemised Deposit Refund Breakdown</h3>

            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; color: var(--ink);">
                <span>Held Security Deposit</span>
                <strong>${window.AppState.formatCurrency(heldDeposit)}</strong>
              </div>

              ${damageFee > 0 ? `
                <div style="display: flex; justify-content: space-between; color: #dc2626; font-weight: 600;">
                  <span>Less Damage Fee Deduction</span>
                  <span>-${window.AppState.formatCurrency(damageFee)}</span>
                </div>
              ` : `
                <div style="display: flex; justify-content: space-between; color: var(--success); font-weight: 600;">
                  <span>Damage Fee Deduction</span>
                  <span>₹0 (100% Intact)</span>
                </div>
              `}

              <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1.5px dashed var(--line); font-size: 18px; font-weight: 900; color: var(--ink);">
                <span>Final Refund Released to Renter:</span>
                <span style="color: var(--success);">${window.AppState.formatCurrency(netRefund)}</span>
              </div>
            </div>

            <div style="font-size: 12px; color: var(--muted); margin-bottom: 18px;">
              Refund will be immediately released back to the original payment method and credited to the user's Sambhajinagar wallet.
            </div>

            <!-- Owner Approval Action Button -->
            <button 
              class="btn btn-lime btn-lg btn-full" 
              onclick="HandoverReturnComponent.finalizeReturn('${rental.bookingId}', ${heldDeposit}, ${damageFee})"
            >
              ✓ Owner Approves & Releases ${window.AppState.formatCurrency(netRefund)} Deposit
            </button>
          </div>

        </div>
      </div>
    `;
  },

  setDamageReported(isReported) {
    this.damageReported = isReported;
    this.damageFee = isReported ? 500 : 0;
    this.renderReturn();
  },

  onDamageFeeInput(e) {
    this.damageFee = Number(e.target.value) || 0;
    this.renderReturn();
  },

  simulateReturnScan() {
    NavigationComponent.showToast('AI Scan Complete: Baseline match verified', 'success');
  },

  finalizeReturn(bookingId, heldDeposit, damageFee) {
    const notes = this.damageReported ? (document.getElementById('damageNotesInput') ? document.getElementById('damageNotesInput').value : 'Damage deducted') : 'Returned in verified condition';

    window.AppState.saveReturnRecord(bookingId, {
      damageReported: this.damageReported,
      damageFee,
      damageNotes: notes
    });

    NavigationComponent.showToast(`Deposit refund released! Status: Deposit Refunded`, 'success');
    window.AppState.navigateTo('tracker', { rentalId: bookingId });
  }
};
