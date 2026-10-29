/**
 * ONRENT — OWNER LISTING & OWNER HUB COMPONENT
 * Implements the Owner Flow scoped to the 7 product types:
 * - "List Item" form: title, productType (7 options only), brand, photos, daily price,
 *   scaled deposit, availability dates, condition, and handover checklist preview.
 * - Owner Hub: incoming requests, handover inspection forms, and active listed gear.
 */

window.ListItemViewComponent = {
  activeTab: 'form', // 'form' | 'hub'
  uploadedPhotos: [],
  selectedProductType: 'Laptops',

  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const productTypes = window.ONRENT_CONFIG.productTypes;
    const brands = window.ONRENT_CONFIG.brands.filter(b => b !== 'All Brands');
    const neighborhoods = window.ONRENT_CONFIG.supportedNeighborhoods;
    const ownerListings = window.AppState.ownerListings;
    const allRentals = window.AppState.rentals;

    const checklist = (window.ONRENT_CONFIG.handoverChecklists && window.ONRENT_CONFIG.handoverChecklists[this.selectedProductType]) || [];

    container.innerHTML = `
      <div id="listItemScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 860px;">
          
          <!-- Top bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
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
                💼 Owner Hub & Requests (${allRentals.length})
              </button>
            </div>
          </div>

          ${this.activeTab === 'form' ? `
            <!-- =========================================================
                 TAB 1: LIST ITEM FORM (7 PRODUCT TYPES ONLY)
                 ========================================================= -->
            <div class="section-head" style="margin-bottom: 22px;">
              <div>
                <span class="pill-badge pill-badge-lime" style="margin-bottom: 6px;">OWNER EARNINGS</span>
                <h1 class="section-title">List an Item for Rent</h1>
                <p class="section-subtitle">
                  Make your creator, computing, phone, or audio gear earn for you in <strong>Chhatrapati Sambhajinagar</strong>
                </p>
              </div>
            </div>

            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 26px; box-shadow: var(--shadow-sm);">
              <form id="ownerListingForm" onsubmit="ListItemViewComponent.handleFormSubmit(event)" style="display: flex; flex-direction: column; gap: 18px;">
                
                <!-- 1. Product Type (Dropdown with ONLY 7 options) & Brand -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Product Type (7 Options Only)
                    </label>
                    <select 
                      id="listProductType" 
                      onchange="ListItemViewComponent.onProductTypeChange(event)"
                      style="width: 100%; padding: 11px 14px; border: 1.5px solid var(--violet); border-radius: var(--radius-md); font-size: 14px; font-weight: 700; background: white; color: var(--violet-dark);"
                    >
                      ${productTypes.map(pt => `
                        <option value="${pt}" ${this.selectedProductType === pt ? 'selected' : ''}>${pt}</option>
                      `).join('')}
                    </select>
                  </div>

                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Brand / Manufacturer
                    </label>
                    <select 
                      id="listBrand" 
                      style="width: 100%; padding: 11px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600; background: white;"
                    >
                      ${brands.map(b => `<option value="${b}">${b}</option>`).join('')}
                    </select>
                  </div>
                </div>

                <!-- 2. Title & Condition -->
                <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px;">
                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Item Title & Exact Model Name
                    </label>
                    <input 
                      type="text" 
                      id="listTitle" 
                      placeholder="e.g. Sony Alpha A7 IV Kit, MacBook Pro 14 M3, iPhone 15 Pro Max"
                      required 
                      style="width: 100%; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600;" 
                    />
                  </div>

                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Item Condition
                    </label>
                    <select 
                      id="listCondition" 
                      style="width: 100%; padding: 11px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600; background: white;"
                    >
                      <option value="Flawless">Flawless (Mint / Pristine)</option>
                      <option value="Like New" selected>Like New (No cosmetic marks)</option>
                      <option value="Excellent">Excellent (Minor cosmetic wear)</option>
                      <option value="Good">Good (Fully functional)</option>
                    </select>
                  </div>
                </div>

                <!-- 3. Daily Price & Scaled Deposit -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Daily Rental Rate (₹)
                    </label>
                    <input 
                      type="number" 
                      id="listDailyRate" 
                      placeholder="e.g. 499" 
                      min="50" 
                      max="50000"
                      required 
                      style="width: 100%; padding: 11px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 15px; font-weight: 800; color: var(--violet);" 
                    />
                  </div>

                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Refundable Security Deposit (₹)
                    </label>
                    <input 
                      type="number" 
                      id="listDeposit" 
                      placeholder="e.g. 5000" 
                      min="100" 
                      max="100000"
                      required 
                      style="width: 100%; padding: 11px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 15px; font-weight: 800; color: var(--ink);" 
                    />
                    <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
                      Scaled with item value: higher for iPhones, MacBooks, laptops & lenses; lower for headphones & speakers.
                    </div>
                  </div>
                </div>

                <!-- 4. Mandatory Handover Checklist Preview for Selected Product Type -->
                <div style="background-color: var(--violet-light); border: 1.5px solid var(--violet-tint); border-radius: var(--radius-md); padding: 14px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span style="font-size: 16px;">📋</span>
                    <strong style="font-size: 12px; font-weight: 800; color: var(--violet-dark); text-transform: uppercase;">
                      Mandatory Handover & Return Protocol for ${this.selectedProductType}:
                    </strong>
                  </div>
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--ink);">
                    ${checklist.map(item => `
                      <li style="display: flex; align-items: flex-start; gap: 6px;">
                        <span style="color: var(--violet); font-weight: 700;">✓</span>
                        <span>${item.label}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- 5. Location Area & Dates -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Sambhajinagar Area
                    </label>
                    <select 
                      id="listArea" 
                      style="width: 100%; padding: 11px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600; background: white;"
                    >
                      ${neighborhoods.map(n => `<option value="${n}">${n}</option>`).join('')}
                    </select>
                  </div>

                  <div>
                    <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                      Available From
                    </label>
                    <input 
                      type="date" 
                      id="listAvailableFrom" 
                      value="${window.AppState.getTodayDateString()}" 
                      style="width: 100%; padding: 11px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px; font-weight: 600;" 
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
                      + Attach ${this.selectedProductType} Photo Angle
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
                  <label style="display: block; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">
                    Description & Kit Inclusions
                  </label>
                  <textarea 
                    id="listDesc" 
                    rows="3" 
                    placeholder="Describe included charger, original case, memory cards, power brick, or special handling..."
                    required 
                    style="width: 100%; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 13px;"
                  ></textarea>
                </div>

                <!-- Trust Guarantee Notice -->
                <div style="background-color: var(--lime-light); border: 1px solid rgba(139, 159, 30, 0.3); border-radius: var(--radius-md); padding: 12px 14px; font-size: 12px; color: var(--ink);">
                  📍 <strong>Owner Protection:</strong> Every rental requires identity verification and digital handover condition photos before gear is released in Sambhajinagar.
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-lime btn-lg btn-full" style="margin-top: 6px;">
                  Publish Listing to ONRENT Catalogue →
                </button>
              </form>
            </div>
          ` : `
            <!-- =========================================================
                 TAB 2: OWNER HUB (INCOMING REQUESTS & HANDOVER FORMS)
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

            <!-- OWNER'S LISTED ITEMS -->
            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-xs);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">Your Active Equipment Listings</h3>
                <button class="btn btn-secondary btn-sm" onclick="ListItemViewComponent.switchTab('form')">+ Add Another</button>
              </div>

              ${ownerListings.length > 0 ? `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
                  ${ownerListings.map(item => {
                    const normItemImg = window.ProductImage ? window.ProductImage.normalize(item.images[0], item.title) : { url: (typeof item.images[0] === 'object' ? item.images[0].url : item.images[0]), alt: item.title };
                    return `
                      <div style="border: 1px solid var(--line); border-radius: var(--radius-md); padding: 14px; display: flex; gap: 12px; align-items: center;">
                        <div style="width: 60px; height: 45px; border-radius: var(--radius-sm); overflow: hidden; flex-shrink: 0; position: relative;">
                          ${window.ProductImage ? window.ProductImage.render({
                            src: normItemImg.url,
                            alt: normItemImg.alt,
                            productType: item.productType,
                            aspectRatio: '4/3'
                          }) : `<img src="${normItemImg.url}" alt="${normItemImg.alt}" style="width: 100%; height: 100%; object-fit: cover;" />`}
                        </div>
                        <div>
                          <h4 style="font-size: 14px; font-weight: 800; color: var(--ink);">${item.title}</h4>
                          <div style="font-size: 12px; color: var(--violet); font-weight: 700;">${window.AppState.formatCurrency(item.dailyPrice)}/day</div>
                          <div style="font-size: 11px; color: var(--muted);">${item.productType} • ${item.area}</div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : `
                <p style="font-size: 13px; color: var(--muted);">No custom items listed yet. Switch to "List New Item" to create your first listing.</p>
              `}
            </div>
          `}

        </div>
      </div>
    `;
  },

  onProductTypeChange(e) {
    this.selectedProductType = e.target.value;
    this.render();
  },

  switchTab(tab) {
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
      'Headphones': [
        { url: 'public/images/products/headphones/sony-wh1000xm5-front.webp', alt: 'Headphones - Front' },
        { url: 'public/images/products/headphones/sony-wh1000xm5-angle.webp', alt: 'Headphones - Angle' },
        { url: 'public/images/products/headphones/sony-wh1000xm5-case.webp', alt: 'Headphones - Case' }
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
    NavigationComponent.showToast(`Attached ${this.selectedProductType} photo angle`, 'success');
  },

  removePhoto(index) {
    this.uploadedPhotos.splice(index, 1);
    this.render();
  },

  triggerPhotoAdd() {
    this.triggerFilePicker();
  },

  handleFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('listTitle').value;
    const productType = document.getElementById('listProductType').value;
    const brand = document.getElementById('listBrand').value;
    const condition = document.getElementById('listCondition').value;
    const dailyPrice = document.getElementById('listDailyRate').value;
    const deposit = document.getElementById('listDeposit').value;
    const area = document.getElementById('listArea').value;
    const availableFrom = document.getElementById('listAvailableFrom').value;
    const desc = document.getElementById('listDesc').value;

    const typeDefaults = {
      'Headphones': [
        { url: 'public/images/products/headphones/sony-wh1000xm5-front.webp', alt: `${title} - Front` },
        { url: 'public/images/products/headphones/sony-wh1000xm5-angle.webp', alt: `${title} - Angle` },
        { url: 'public/images/products/headphones/sony-wh1000xm5-case.webp', alt: `${title} - Case & Cables` }
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

    const fallbackList = typeDefaults[productType] || typeDefaults['Laptops'];
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
      productType,
      brand,
      dailyPrice,
      deposit,
      condition,
      area,
      availableFrom,
      description: desc,
      photos
    });

    NavigationComponent.showToast(`Listing published: "${title}" is now active in catalogue!`, 'success');
    this.uploadedPhotos = [];
    window.AppState.navigateTo('product', { productId: newProduct.id });
  }
};
