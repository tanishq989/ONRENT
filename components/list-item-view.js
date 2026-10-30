/**
 * ONRENT — OWNER LISTING & OWNER HUB COMPONENT
 * Implements the Owner Flow:
 * - "List Item" form: title, productType (with "Other" custom type), brand (with "Other" custom brand),
 *   photos, daily price, scaled deposit, availability dates, condition, and handover checklist preview.
 * - Owner Hub: incoming requests, handover inspection forms, and active listed gear with approval badges.
 */

window.ListItemViewComponent = {
  activeTab: 'form', // 'form' | 'hub'
  uploadedPhotos: [],
  selectedProductType: 'Laptops',
  selectedBrand: 'Apple',
  customProductType: '',
  customBrand: '',
  errors: {},
  draft: {},

  saveFormDraft() {
    const titleEl = document.getElementById('listTitle');
    const conditionEl = document.getElementById('listCondition');
    const dailyRateEl = document.getElementById('listDailyRate');
    const depositEl = document.getElementById('listDeposit');
    const areaEl = document.getElementById('listArea');
    const availableFromEl = document.getElementById('listAvailableFrom');
    const descEl = document.getElementById('listDesc');
    const customTypeEl = document.getElementById('listCustomProductType');
    const customBrandEl = document.getElementById('listCustomBrand');

    if (titleEl) this.draft.title = titleEl.value;
    if (conditionEl) this.draft.condition = conditionEl.value;
    if (dailyRateEl) this.draft.dailyRate = dailyRateEl.value;
    if (depositEl) this.draft.deposit = depositEl.value;
    if (areaEl) this.draft.area = areaEl.value;
    if (availableFromEl) this.draft.availableFrom = availableFromEl.value;
    if (descEl) this.draft.desc = descEl.value;
    if (customTypeEl) this.customProductType = customTypeEl.value;
    if (customBrandEl) this.customBrand = customBrandEl.value;
  },

  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const productTypes = window.ONRENT_CONFIG.productTypes;
    const brands = window.ONRENT_CONFIG.brands.filter(b => b !== 'All Brands');
    const neighborhoods = window.ONRENT_CONFIG.supportedNeighborhoods;
    const ownerListings = window.AppState.ownerListings;
    const allRentals = window.AppState.rentals;

    // Default brand if not set
    if (!this.selectedBrand) {
      this.selectedBrand = this.selectedProductType === 'Other' ? 'Other' : brands[0];
    }

    const isOtherType = this.selectedProductType === 'Other';
    const isOtherBrand = isOtherType || this.selectedBrand === 'Other';

    // Checklist for selected type (including 'Other')
    const checklist = (window.ONRENT_CONFIG.handoverChecklists && window.ONRENT_CONFIG.handoverChecklists[this.selectedProductType]) || [
      { id: 'chk_sn', label: 'Serial or model number recorded into digital handover record', critical: true },
      { id: 'chk_accessories', label: 'All accessories, cables, chargers & cases listed and verified', critical: true },
      { id: 'chk_test', label: 'Working operational test recorded on camera before handover & upon return', critical: true },
      { id: 'chk_photos', label: 'Front, back, and all sides photographed in clear lighting', critical: true },
      { id: 'chk_marks', label: 'Note and document any existing cosmetic marks, scratches, or wear', critical: false }
    ];

    container.innerHTML = `
      <div id="listItemScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 860px;">
          
          <!-- Top bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('home')">
              ← Back to Home
            </button>
            
            <!-- Tab Switcher (List Form vs Owner Hub) -->
            <div style="display: flex; background-color: var(--ink-100); padding: 4px; border-radius: var(--radius-full); border: 1px solid var(--line);">
              <button 
                class="btn btn-sm ${this.activeTab === 'form' ? 'btn-violet' : ''}" 
                onclick="ListItemViewComponent.switchTab('form')"
                style="padding: 6px 14px; font-size: 12px;"
              >
                + List New Item
              </button>
              <button 
                class="btn btn-sm ${this.activeTab === 'hub' ? 'btn-violet' : ''}" 
                onclick="ListItemViewComponent.switchTab('hub')"
                style="padding: 6px 14px; font-size: 12px;"
              >
                💼 Owner Hub & Listings (${ownerListings.length})
              </button>
            </div>
          </div>

          ${this.activeTab === 'form' ? `
            <!-- =========================================================
                 TAB 1: LIST ITEM FORM
                 ========================================================= -->
            <div class="section-head" style="margin-bottom: 22px;">
              <div>
                <span class="pill-badge pill-badge-lime" style="margin-bottom: 6px;">OWNER EARNINGS</span>
                <h1 class="section-title">List an Item for Rent</h1>
                <p class="section-subtitle">
                  Make your creator, computing, phone, audio, or custom gear earn for you in <strong>Chhatrapati Sambhajinagar</strong>
                </p>
              </div>
            </div>

            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 26px; box-shadow: var(--shadow-sm); margin-bottom: 30px;">
              <form id="ownerListingForm" onsubmit="ListItemViewComponent.handleFormSubmit(event)" style="display: flex; flex-direction: column; gap: 18px;">
                
                <!-- 1. Product Type & Brand / Manufacturer -->
                <div class="form-grid-2col">
                  
                  <!-- Product Type Dropdown -->
                  <div class="form-field-unit">
                    <label for="listProductType">
                      Product Type
                    </label>
                    <select 
                      id="listProductType" 
                      onchange="ListItemViewComponent.onProductTypeChange(event)"
                      style="border-color: var(--brand-700); font-weight: 700; color: var(--brand-900);"
                    >
                      ${productTypes.map(pt => `
                        <option value="${pt}" ${this.selectedProductType === pt ? 'selected' : ''}>${pt}</option>
                      `).join('')}
                      <option value="Other" ${this.selectedProductType === 'Other' ? 'selected' : ''}>Other</option>
                    </select>

                    <!-- Specify Product Type (Visible only when Other is selected) -->
                    <div id="customProductTypeWrap" style="margin-top: 10px; display: ${isOtherType ? 'block' : 'none'};">
                      <label for="listCustomProductType">
                        Specify product type <span style="color: #b91c1c;">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="listCustomProductType" 
                        maxlength="40"
                        placeholder="e.g. Drone, Projector, Tablet" 
                        value="${this.customProductType || ''}"
                        oninput="ListItemViewComponent.onCustomTypeInput(event)"
                        style="border: 1.5px solid ${this.errors && this.errors.customType ? '#b91c1c' : 'var(--brand-700)'};"
                      />
                      <div id="customProductTypeError" style="color: #b91c1c; font-size: 12px; margin-top: 4px; font-weight: 600; display: ${this.errors && this.errors.customType ? 'block' : 'none'};">
                        ${this.errors && this.errors.customType ? this.errors.customType : ''}
                      </div>
                    </div>
                  </div>

                  <!-- Brand / Manufacturer Dropdown -->
                  <div class="form-field-unit">
                    <label for="listBrand">
                      Brand / Manufacturer
                    </label>
                    <select 
                      id="listBrand" 
                      onchange="ListItemViewComponent.onBrandChange(event)"
                    >
                      ${isOtherType ? `
                        <option value="Other" selected>Other</option>
                      ` : `
                        ${brands.map(b => `<option value="${b}" ${this.selectedBrand === b ? 'selected' : ''}>${b}</option>`).join('')}
                        <option value="Other" ${this.selectedBrand === 'Other' ? 'selected' : ''}>Other</option>
                      `}
                    </select>

                    <!-- Specify Brand (Visible when Brand is Other or Product Type is Other) -->
                    <div id="customBrandWrap" style="margin-top: 10px; display: ${isOtherBrand ? 'block' : 'none'};">
                      <label for="listCustomBrand">
                        Specify brand <span style="color: #b91c1c;">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="listCustomBrand" 
                        maxlength="40"
                        placeholder="e.g. Fujifilm, Marshall" 
                        value="${this.customBrand || ''}"
                        oninput="ListItemViewComponent.onCustomBrandInput(event)"
                        style="border: 1.5px solid ${this.errors && this.errors.customBrand ? '#b91c1c' : 'var(--brand-700)'};"
                      />
                      <div id="customBrandError" style="color: #b91c1c; font-size: 12px; margin-top: 4px; font-weight: 600; display: ${this.errors && this.errors.customBrand ? 'block' : 'none'};">
                        ${this.errors && this.errors.customBrand ? this.errors.customBrand : ''}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 2. Title & Condition -->
                <div class="form-grid-2col">
                  <div class="form-field-unit">
                    <label for="listTitle">
                      Item Title & Exact Model Name
                    </label>
                    <input 
                      type="text" 
                      id="listTitle" 
                      placeholder="e.g. Sony Alpha A7 IV Kit, MacBook Pro 14 M3, DJI Mavic 3 Pro"
                      value="${this.draft.title || ''}"
                      required 
                    />
                  </div>

                  <div class="form-field-unit">
                    <label for="listCondition">
                      Item Condition
                    </label>
                    <select id="listCondition">
                      <option value="Flawless" ${this.draft.condition === 'Flawless' ? 'selected' : ''}>Flawless (Mint / Pristine)</option>
                      <option value="Like New" ${!this.draft.condition || this.draft.condition === 'Like New' ? 'selected' : ''}>Like New (No cosmetic marks)</option>
                      <option value="Excellent" ${this.draft.condition === 'Excellent' ? 'selected' : ''}>Excellent (Minor cosmetic wear)</option>
                      <option value="Good" ${this.draft.condition === 'Good' ? 'selected' : ''}>Good (Fully functional)</option>
                    </select>
                  </div>
                </div>

                <!-- 3. Daily Price & Scaled Deposit -->
                <div class="form-grid-2col">
                  <div class="form-field-unit">
                    <label for="listDailyRate">
                      Daily Rental Rate (₹)
                    </label>
                    <input 
                      type="number" 
                      id="listDailyRate" 
                      placeholder="e.g. 499" 
                      min="50" 
                      max="50000"
                      value="${this.draft.dailyRate || ''}"
                      required 
                      style="font-family: var(--font-display); font-weight: 700; color: var(--brand-700);"
                    />
                  </div>

                  <div class="form-field-unit">
                    <label for="listDeposit">
                      Refundable Security Deposit (₹)
                    </label>
                    <input 
                      type="number" 
                      id="listDeposit" 
                      placeholder="e.g. 5000" 
                      min="100" 
                      max="100000"
                      value="${this.draft.deposit || ''}"
                      required 
                      style="font-family: var(--font-display); font-weight: 700; color: var(--brand-900);"
                    />
                    <div style="font-size: 11px; color: var(--brand-700); margin-top: 4px;" id="depositHint">
                      ${isOtherType 
                        ? 'Scaled with item value: higher for iPhones, MacBooks, laptops, PS5 & lenses; lower for speakers. Set the deposit at or above the item\'s resale value.' 
                        : 'Scaled with item value: higher for iPhones, MacBooks, laptops, PS5 & lenses; lower for speakers.'
                      }
                    </div>
                  </div>
                </div>

                <!-- 4. Mandatory Handover Checklist Preview -->
                <div style="background-color: var(--brand-50); border: 1px solid var(--brand-card-border); border-radius: var(--radius-card); padding: 16px; margin-bottom: 16px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span style="font-size: 16px;">📋</span>
                    <strong style="font-family: var(--font-display); font-size: 12px; font-weight: 700; color: var(--brand-900); text-transform: uppercase;">
                      Mandatory Handover & Return Protocol for ${isOtherType ? (this.customProductType && this.customProductType.trim() ? this.customProductType.trim() : 'Other Gear') : this.selectedProductType}:
                    </strong>
                  </div>
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--brand-900);">
                    ${checklist.map(item => `
                      <li style="display: flex; align-items: flex-start; gap: 6px;">
                        <span style="color: var(--brand-700); font-weight: 700;">✓</span>
                        <span>${item.label}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- 5. Location Area & Dates -->
                <div class="form-grid-2col">
                  <div class="form-field-unit">
                    <label for="listArea">
                      Sambhajinagar Area
                    </label>
                    <select id="listArea">
                      ${neighborhoods.map(n => `<option value="${n}" ${this.draft.area === n ? 'selected' : ''}>${n}</option>`).join('')}
                    </select>
                  </div>

                  <div class="form-field-unit">
                    <label for="listAvailableFrom">
                      Available From
                    </label>
                    <input 
                      type="date" 
                      id="listAvailableFrom" 
                      value="${this.draft.availableFrom || window.AppState.getTodayDateString()}" 
                    />
                  </div>
                </div>

                <!-- 6. Photos Upload & Live Previews -->
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <label style="font-size: 13px; font-weight: 700; color: var(--ink);">
                      Item Photographs (At least 2 angles recommended)
                    </label>
                    <span style="font-size: 11px; color: var(--violet); font-weight: 700;">
                      ${this.uploadedPhotos.length} / 3 angles attached
                    </span>
                  </div>

                  <input type="file" id="listItemFileInput" accept="image/*" multiple style="display: none;" onchange="ListItemViewComponent.handleFileUpload(event)" />
                  <div style="border: 2px dashed var(--line); border-radius: var(--radius-md); padding: 18px; text-align: center; background-color: var(--ink-50); cursor: pointer; transition: all 0.2s ease;" onclick="ListItemViewComponent.triggerFilePicker()">
                    <span style="font-size: 26px; display: block; margin-bottom: 4px;">📷</span>
                    <strong style="font-size: 13px; color: var(--violet);" id="listPhotoStatusText">
                      + Click to Upload Gear Photographs from Device
                    </strong>
                    <div style="font-size: 11px; color: var(--muted); margin-top: 2px;">
                      Clear front, serial number, and accessory photos ensure fast approval & secure deposit protection
                    </div>
                  </div>

                  <!-- Quick Preset Angles / Samples -->
                  <div style="display: flex; gap: 8px; margin-top: 8px; align-items: center; flex-wrap: wrap;">
                    <span style="font-size: 11px; color: var(--muted);">Or attach verified gear photos:</span>
                    <button type="button" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 10px;" onclick="ListItemViewComponent.addSamplePhoto()">
                      + Attach ${isOtherType ? (this.customProductType && this.customProductType.trim() ? this.customProductType.trim() : 'Gear') : this.selectedProductType} Photo Angle
                    </button>
                  </div>

                  <!-- Live Previews Grid -->
                  ${this.uploadedPhotos.length > 0 ? `
                    <div id="listPhotoPreviewsGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-top: 12px;">
                      ${this.uploadedPhotos.map((photo, pIdx) => {
                        const pUrl = typeof photo === 'object' ? photo.url : photo;
                        const pAlt = typeof photo === 'object' ? photo.alt : `Preview ${pIdx + 1}`;
                        return `
                          <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; border: 1.5px solid var(--violet); aspect-ratio: 4 / 3; box-shadow: var(--shadow-xs);">
                            <img src="${pUrl}" alt="${pAlt}" style="width: 100%; height: 100%; object-fit: cover;" />
                            <span style="position: absolute; bottom: 4px; left: 4px; font-size: 9px; background: rgba(20, 33, 61, 0.85); color: white; padding: 2px 6px; border-radius: 3px; font-weight: 700;">
                              Angle ${pIdx + 1}
                            </span>
                            <button 
                              type="button" 
                              onclick="event.stopPropagation(); ListItemViewComponent.removePhoto(${pIdx})" 
                              style="position: absolute; top: 4px; right: 4px; width: 22px; height: 22px; border-radius: 50%; background: rgba(220, 38, 38, 0.9); color: white; border: none; font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;"
                              title="Remove photo"
                            >
                              ✕
                            </button>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  ` : ''}
                </div>

                <!-- 7. Description & Inclusions -->
                <div>
                  <label for="listDesc" style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                    Description & Kit Inclusions
                  </label>
                  <textarea 
                    id="listDesc" 
                    rows="3" 
                    placeholder="Describe included charger, original case, memory cards, power brick, or special handling..."
                    required 
                    style="width: 100%; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 13px;"
                  >${this.draft.desc || ''}</textarea>
                </div>

                <!-- Trust Guarantee Notice -->
                <div style="background-color: var(--brand-50); border: 1px solid var(--brand-card-border); border-radius: var(--radius-card); padding: 12px 14px; font-size: 12px; color: var(--brand-900);">
                  📍 <strong>Owner Protection:</strong> Every rental requires identity verification and digital handover condition photos before gear is released in Sambhajinagar.
                </div>

                <!-- Submit Button -->
                <button type="submit" id="submitListingBtn" class="btn btn-primary btn-lg btn-full" style="margin-top: 6px;">
                  Publish Listing to ONRENT Catalogue →
                </button>
              </form>
            </div>
          ` : `
            <!-- =========================================================
                 TAB 2: OWNER HUB (INCOMING REQUESTS & LISTED GEAR)
                 ========================================================= -->
            <div class="section-head" style="margin-bottom: 22px;">
              <div>
                <span class="pill-badge pill-badge-violet" style="margin-bottom: 6px;">OWNER CONTROL HUB</span>
                <h1 class="section-title">Incoming Requests & Handovers</h1>
                <p class="section-subtitle">
                  Approve bookings, review renter profiles, and manage handover condition forms
                </p>
              </div>
            </div>

            <!-- INCOMING RENTAL REQUESTS & FORMS LIST -->
            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
              ${allRentals.map(rental => `
                <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 20px; box-shadow: var(--shadow-xs);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; margin-bottom: 12px;">
                    <div>
                      <span class="pill-badge pill-badge-lime" style="font-size: 11px;">Booking: ${rental.bookingId}</span>
                      <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin-top: 4px;">${rental.productTitle}</h3>
                      <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">
                        Renter: <strong>${rental.renterName}</strong> (${rental.renterPhone}) • ID: ${rental.renterIdNumber}
                      </div>
                    </div>

                    <div style="text-align: right;">
                      <span class="pill-badge ${rental.verificationStatus === 'verified' ? 'pill-badge-success' : 'pill-badge-orange'}">
                        Renter: ${rental.verificationStatus.toUpperCase()}
                      </span>
                      <div style="font-size: 14px; font-weight: 800; color: var(--violet); margin-top: 4px;">
                        ${window.AppState.formatCurrency(rental.totalPayable)}
                      </div>
                    </div>
                  </div>

                  <div style="background-color: var(--ink-50); padding: 10px 14px; border-radius: var(--radius-md); font-size: 12px; color: var(--ink); margin-bottom: 14px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                    <div>📅 Duration: ${rental.daysCount} days (${window.AppState.formatDate(rental.startDate)} → ${window.AppState.formatDate(rental.endDate)})</div>
                    <div>💰 Deposit in Escrow: ${window.AppState.formatCurrency(rental.deposit)}</div>
                    <div>📦 Status: <strong>${rental.orderStatus.replace('_', ' ').toUpperCase()}</strong></div>
                  </div>

                  <div style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap;">
                    <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('tracker', { rentalId: '${rental.bookingId}' })">
                      Open Tracker
                    </button>
                    <button class="btn btn-violet btn-sm" onclick="window.AppState.navigateTo('handover', { rentalId: '${rental.bookingId}' })">
                      📷 Mutual Handover Form
                    </button>
                    <button class="btn btn-lime btn-sm" onclick="window.AppState.navigateTo('return', { rentalId: '${rental.bookingId}' })">
                      ↩️ Return & Release Deposit
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}

          <!-- OWNER'S LISTED ITEMS (VISIBLE ON BOTH TABS FOR EASY ACCESS) -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-xs);">
            
            <!-- Admin Demo Review Toggle Bar -->
            <div style="background-color: var(--violet-light); border: 1.5px solid var(--violet-tint); border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
              <div>
                <strong style="font-size: 13px; font-weight: 800; color: var(--violet-dark); display: block;">
                  🛡️ Admin Demo Review Toggle
                </strong>
                <span style="font-size: 11px; color: var(--muted);">
                  Approve custom product types & brands to display them in public Browse & Home
                </span>
              </div>
              <button 
                id="adminApprovalToggleBtn"
                type="button" 
                class="btn btn-sm ${window.AppState.isAdminAutoApproveEnabled() ? 'btn-lime' : 'btn-secondary'}" 
                onclick="ListItemViewComponent.toggleAdminAutoApprove()"
                style="font-size: 12px; font-weight: 800; padding: 6px 14px;"
              >
                ${window.AppState.isAdminAutoApproveEnabled() ? '✓ Demo Mode: All Approved (Live)' : 'Demo Mode: Require Approval'}
              </button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
              <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin: 0;">Your Equipment Listings</h3>
              ${this.activeTab === 'hub' ? `
                <button class="btn btn-secondary btn-sm" onclick="ListItemViewComponent.switchTab('form')">+ Add Another Item</button>
              ` : ''}
            </div>

            ${ownerListings.length > 0 ? `
              <div id="ownerListingsGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
                ${ownerListings.map(item => {
                  const normItemImg = window.ProductImage ? window.ProductImage.normalize(item.images[0], item.title) : { url: (typeof item.images[0] === 'object' ? item.images[0].url : item.images[0]), alt: item.title };
                  const isPending = item.status === 'Pending review';
                  return `
                    <div style="border: 1px solid var(--line); border-radius: var(--radius-md); padding: 14px; display: flex; gap: 12px; align-items: center; justify-content: space-between; background: ${isPending ? '#fffdf7' : 'white'};">
                      <div style="display: flex; gap: 12px; align-items: center; min-width: 0;">
                        <div style="width: 60px; height: 45px; border-radius: var(--radius-sm); overflow: hidden; flex-shrink: 0; position: relative;">
                          ${window.ProductImage ? window.ProductImage.render({
                            src: normItemImg.url,
                            alt: normItemImg.alt,
                            productType: item.productType,
                            aspectRatio: '4/3'
                          }) : `<img src="${normItemImg.url}" alt="${normItemImg.alt}" style="width: 100%; height: 100%; object-fit: cover;" />`}
                        </div>
                        <div style="min-width: 0;">
                          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px; flex-wrap: wrap;">
                            <h4 style="font-size: 13px; font-weight: 800; color: var(--ink); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
                              ${item.title}
                            </h4>
                            ${isPending ? `
                              <span class="pill-badge" style="background-color: #fef3c7; color: #92400e; border: 1px solid #fcd34d; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 999px;">
                                ⏳ Pending review
                              </span>
                            ` : `
                              <span class="pill-badge pill-badge-lime" style="font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 999px;">
                                ✓ Live
                              </span>
                            `}
                          </div>
                          <div style="font-size: 12px; color: var(--violet); font-weight: 700;">${window.AppState.formatCurrency(item.dailyPrice)}/day</div>
                          <div style="font-size: 11px; color: var(--muted);">${item.productType} • ${item.brand} • ${item.area}</div>
                        </div>
                      </div>

                      ${(item.isCustomType || item.isCustomBrand || isPending) ? `
                        <div style="flex-shrink: 0; margin-left: 8px;">
                          <button 
                            type="button" 
                            class="btn btn-sm ${isPending ? 'btn-lime' : 'btn-secondary'}" 
                            onclick="ListItemViewComponent.toggleItemApproval('${item.id}')"
                            style="font-size: 11px; padding: 5px 10px; font-weight: 700;"
                          >
                            ${isPending ? '🛡️ Approve' : '↩️ Revoke'}
                          </button>
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <p style="font-size: 13px; color: var(--muted);">No items listed yet. Fill out the form above to list your first item.</p>
            `}
          </div>

        </div>
      </div>
    `;
  },

  onProductTypeChange(e) {
    this.saveFormDraft();
    const prevType = this.selectedProductType;
    this.selectedProductType = e.target.value;

    if (this.selectedProductType === 'Other') {
      this.selectedBrand = 'Other';
    } else if (prevType === 'Other') {
      const brands = window.ONRENT_CONFIG.brands.filter(b => b !== 'All Brands');
      if (this.selectedBrand === 'Other' && !this.customBrand) {
        this.selectedBrand = brands[0] || 'Apple';
      }
    }

    if (this.errors) this.errors.customType = null;
    this.render();
  },

  onBrandChange(e) {
    this.saveFormDraft();
    this.selectedBrand = e.target.value;
    if (this.errors) this.errors.customBrand = null;
    this.render();
  },

  onCustomTypeInput(e) {
    this.customProductType = e.target.value;
    if (this.errors && this.errors.customType && this.customProductType.trim()) {
      this.errors.customType = null;
      const errEl = document.getElementById('customProductTypeError');
      if (errEl) errEl.style.display = 'none';
      const inputEl = document.getElementById('listCustomProductType');
      if (inputEl) inputEl.style.borderColor = 'var(--violet)';
    }
  },

  onCustomBrandInput(e) {
    this.customBrand = e.target.value;
    if (this.errors && this.errors.customBrand && this.customBrand.trim()) {
      this.errors.customBrand = null;
      const errEl = document.getElementById('customBrandError');
      if (errEl) errEl.style.display = 'none';
      const inputEl = document.getElementById('listCustomBrand');
      if (inputEl) inputEl.style.borderColor = 'var(--violet)';
    }
  },

  toggleAdminAutoApprove() {
    const current = window.AppState.isAdminAutoApproveEnabled();
    window.AppState.setAdminAutoApprove(!current);
    NavigationComponent.showToast(
      !current ? 'Admin Demo: Approved all custom listings for public Browse!' : 'Admin Demo: Custom listings reverted to Pending review.',
      !current ? 'success' : 'info'
    );
    this.render();
  },

  toggleItemApproval(id) {
    window.AppState.toggleItemApproval(id);
    const item = window.AppState.ownerListings.find(i => i.id === id);
    const isNowApproved = window.AppState.isListingApproved(item);
    NavigationComponent.showToast(
      isNowApproved ? `Listing "${item.title}" approved! Now visible in public Browse.` : `Listing "${item.title}" set to Pending review.`,
      isNowApproved ? 'success' : 'info'
    );
    this.render();
  },

  switchTab(tab) {
    this.saveFormDraft();
    this.activeTab = tab;
    this.render();
  },

  triggerFilePicker() {
    const input = document.getElementById('listItemFileInput');
    if (input) input.click();
  },

  handleFileUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const readPromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const p = new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve({ url: e.target.result, alt: file.name });
        reader.readAsDataURL(file);
      });
      readPromises.push(p);
    }
    Promise.all(readPromises).then(newImages => {
      this.uploadedPhotos.push(...newImages);
      this.render();
      NavigationComponent.showToast(`${newImages.length} photo(s) attached & previewed!`, 'success');
    });
  },

  addSamplePhoto() {
    const typeDefaults = {
      'PS5': [
        { url: './images/products/ps5/ps5-standard-front.webp', alt: 'PS5 - Front' },
        { url: './images/products/ps5/ps5-standard-angle.webp', alt: 'PS5 - Angle' },
        { url: './images/products/ps5/ps5-standard-detail.webp', alt: 'PS5 - Controllers & Cables' }
      ],
      'Speakers': [
        { url: 'public/images/products/speakers/jbl-partybox-front.webp', alt: 'Speaker - Front' },
        { url: 'public/images/products/speakers/jbl-partybox-angle.webp', alt: 'Speaker - Angle' },
        { url: 'public/images/products/speakers/jbl-partybox-controls.webp', alt: 'Speaker - Controls' }
      ],
      'Laptops': [
        { url: 'public/images/products/laptops/dell-xps-15-front.webp', alt: 'Laptop - Front' },
        { url: 'public/images/products/laptops/dell-xps-15-angle.webp', alt: 'Laptop - Angle' },
        { url: 'public/images/products/laptops/dell-xps-15-ports.webp', alt: 'Laptop - Ports' }
      ],
      'iPhones': [
        { url: 'public/images/products/iphones/iphone-15-pro-front.webp', alt: 'iPhone - Front' },
        { url: 'public/images/products/iphones/iphone-15-pro-back.webp', alt: 'iPhone - Back' },
        { url: 'public/images/products/iphones/iphone-15-pro-angle.webp', alt: 'iPhone - Angle' }
      ],
      'MacBooks': [
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-front.webp', alt: 'MacBook - Front' },
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-angle.webp', alt: 'MacBook - Angle' },
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-closed.webp', alt: 'MacBook - Closed' }
      ],
      'DSLR cameras': [
        { url: 'public/images/products/dslr/canon-creator-kit-front.webp', alt: 'Camera - Front' },
        { url: 'public/images/products/dslr/canon-creator-kit-angle.webp', alt: 'Camera - Angle' },
        { url: 'public/images/products/dslr/canon-creator-kit-rig.webp', alt: 'Camera - Rig' }
      ],
      'DSLR lenses': [
        { url: 'public/images/products/lenses/canon-rf-24-70-front.webp', alt: 'Lens - Front' },
        { url: 'public/images/products/lenses/canon-rf-24-70-angle.webp', alt: 'Lens - Angle' },
        { url: 'public/images/products/lenses/canon-rf-24-70-hood.webp', alt: 'Lens - Hood' }
      ]
    };
    const list = typeDefaults[this.selectedProductType] || typeDefaults['Laptops'];
    const nextIdx = this.uploadedPhotos.length % list.length;
    this.uploadedPhotos.push(list[nextIdx]);
    this.render();
    NavigationComponent.showToast(`Attached ${this.selectedProductType === 'Other' ? (this.customProductType || 'Gear') : this.selectedProductType} photo angle`, 'success');
  },

  removePhoto(index) {
    this.uploadedPhotos.splice(index, 1);
    this.render();
  },

  handleFormSubmit(e) {
    e.preventDefault();
    this.saveFormDraft();

    const title = document.getElementById('listTitle').value.trim();
    const productType = document.getElementById('listProductType').value;
    const brand = document.getElementById('listBrand').value;
    const condition = document.getElementById('listCondition').value;
    const dailyPrice = document.getElementById('listDailyRate').value;
    const deposit = document.getElementById('listDeposit').value;
    const area = document.getElementById('listArea').value;
    const availableFrom = document.getElementById('listAvailableFrom').value;
    const desc = document.getElementById('listDesc').value;

    const isCustomType = productType === 'Other';
    const isCustomBrand = (productType === 'Other') || (brand === 'Other');

    const customTypeInput = document.getElementById('listCustomProductType');
    const customBrandInput = document.getElementById('listCustomBrand');

    const customTypeVal = customTypeInput ? customTypeInput.value.trim().slice(0, 40) : '';
    const customBrandVal = customBrandInput ? customBrandInput.value.trim().slice(0, 40) : '';

    this.errors = {};
    let hasError = false;

    // Validate visible Specify product type
    if (isCustomType && !customTypeVal) {
      this.errors.customType = 'Please specify the product type (up to 40 characters).';
      hasError = true;
    }

    // Validate visible Specify brand
    if (isCustomBrand && !customBrandVal) {
      this.errors.customBrand = 'Please specify the brand (up to 40 characters).';
      hasError = true;
    }

    if (hasError) {
      this.render();
      if (this.errors.customType) {
        document.getElementById('listCustomProductType')?.focus();
      } else if (this.errors.customBrand) {
        document.getElementById('listCustomBrand')?.focus();
      }
      return;
    }

    // Determine final stored values (not the word "Other")
    const finalProductType = isCustomType ? customTypeVal : productType;
    const finalBrand = isCustomBrand ? customBrandVal : brand;

    const typeDefaults = {
      'PS5': [
        { url: './images/products/ps5/ps5-standard-front.webp', alt: `${title} - Front View` },
        { url: './images/products/ps5/ps5-standard-angle.webp', alt: `${title} - Setup Angle` },
        { url: './images/products/ps5/ps5-standard-detail.webp', alt: `${title} - Controllers & Cables` }
      ],
      'Speakers': [
        { url: 'public/images/products/speakers/jbl-partybox-front.webp', alt: `${title} - Front` },
        { url: 'public/images/products/speakers/jbl-partybox-angle.webp', alt: `${title} - Angle` },
        { url: 'public/images/products/speakers/jbl-partybox-controls.webp', alt: `${title} - Controls` }
      ],
      'Laptops': [
        { url: 'public/images/products/laptops/dell-xps-15-front.webp', alt: `${title} - Front` },
        { url: 'public/images/products/laptops/dell-xps-15-angle.webp', alt: `${title} - Angle` },
        { url: 'public/images/products/laptops/dell-xps-15-ports.webp', alt: `${title} - Ports & Charger` }
      ],
      'iPhones': [
        { url: 'public/images/products/iphones/iphone-15-pro-front.webp', alt: `${title} - Front` },
        { url: 'public/images/products/iphones/iphone-15-pro-back.webp', alt: `${title} - Back Titanium` },
        { url: 'public/images/products/iphones/iphone-15-pro-angle.webp', alt: `${title} - Display & Cable` }
      ],
      'MacBooks': [
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-front.webp', alt: `${title} - Front Display` },
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-angle.webp', alt: `${title} - Keyboard & Trackpad` },
        { url: 'public/images/products/macbooks/macbook-pro-14-m3-closed.webp', alt: `${title} - Space Black Lid` }
      ],
      'DSLR cameras': [
        { url: 'public/images/products/dslr/canon-creator-kit-front.webp', alt: `${title} - Front Sensor` },
        { url: 'public/images/products/dslr/canon-creator-kit-angle.webp', alt: `${title} - Grip & Dial` },
        { url: 'public/images/products/dslr/canon-creator-kit-rig.webp', alt: `${title} - Rig & Batteries` }
      ],
      'DSLR lenses': [
        { url: 'public/images/products/lenses/canon-rf-24-70-front.webp', alt: `${title} - Front Element` },
        { url: 'public/images/products/lenses/canon-rf-24-70-angle.webp', alt: `${title} - Zoom Ring & Mount` },
        { url: 'public/images/products/lenses/canon-rf-24-70-hood.webp', alt: `${title} - Lens Hood & Pouch` }
      ]
    };

    const fallbackList = typeDefaults[finalProductType] || typeDefaults['Laptops'];
    let photos = [];
    if (this.uploadedPhotos.length === 0) {
      photos = fallbackList;
    } else {
      photos = [...this.uploadedPhotos];
      while (photos.length < 3) {
        photos.push(fallbackList[photos.length % fallbackList.length]);
      }
    }

    const newProduct = window.AppState.addNewListing({
      title,
      productType: finalProductType,
      brand: finalBrand,
      isCustomType,
      isCustomBrand,
      dailyPrice,
      deposit,
      condition,
      area,
      availableFrom,
      description: desc,
      photos
    });

    // Reset draft and errors
    this.uploadedPhotos = [];
    this.draft = {};
    this.customProductType = '';
    this.customBrand = '';
    this.errors = {};

    if (newProduct.status === 'Pending review') {
      NavigationComponent.showToast(`Listing submitted for review: "${title}" (Status: Pending review)`, 'warning');
      this.render();
    } else {
      NavigationComponent.showToast(`Listing published: "${title}" is now active in catalogue!`, 'success');
      window.AppState.navigateTo('product', { productId: newProduct.id });
    }
  }
};
