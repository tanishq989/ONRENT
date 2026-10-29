/**
 * ONRENT — MY RENTALS & IN-RENTAL SERVICE REQUESTS COMPONENT
 * Implements Step 7 (In-rental service requests: repair, extension, exchange, support)
 * and displays active/past rental milestones with tracker shortcuts.
 */

window.RentalsViewComponent = {
  activeModalBookingId: null,

  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const rentals = window.AppState.rentals;
    const activeRentals = rentals.filter(r => r.orderStatus !== 'deposit_refunded');
    const pastRentals = rentals.filter(r => r.orderStatus === 'deposit_refunded');

    container.innerHTML = `
      <div id="rentalsScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('home')">
              ← Back to Home
            </button>
            <button class="btn btn-violet btn-sm" onclick="window.AppState.navigateTo('browse')">
              + Rent Another Item
            </button>
          </div>

          <div class="section-head" style="margin-bottom: 24px;">
            <div>
              <h1 class="section-title">My Rentals & Bookings</h1>
              <p class="section-subtitle">
                Track live equipment milestones, manage service requests, and view deposit releases
              </p>
            </div>
          </div>

          <!-- ACTIVE RENTALS SECTION -->
          <div style="margin-bottom: 36px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h2 style="font-size: 18px; font-weight: 800; color: var(--ink);">
                Active Rentals (${activeRentals.length})
              </h2>
            </div>

            ${activeRentals.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 18px;">
                ${activeRentals.map(r => RentalsViewComponent.renderRentalCard(r)).join('')}
              </div>
            ` : `
              <div style="text-align: center; padding: 40px; background-color: var(--white); border-radius: var(--radius-xl); border: 1px solid var(--line);">
                <p style="color: var(--muted); font-size: 14px; margin-bottom: 14px;">You have no active rentals right now.</p>
                <button class="btn btn-violet" onclick="window.AppState.navigateTo('browse')">Browse Available Items</button>
              </div>
            `}
          </div>

          <!-- PAST & COMPLETED RENTALS SECTION -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h2 style="font-size: 18px; font-weight: 800; color: var(--ink);">
                Completed History (${pastRentals.length})
              </h2>
            </div>

            ${pastRentals.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${pastRentals.map(r => RentalsViewComponent.renderRentalCard(r, true)).join('')}
              </div>
            ` : `
              <div style="text-align: center; padding: 30px; background-color: var(--white); border-radius: var(--radius-xl); border: 1px solid var(--line);">
                <p style="color: var(--muted); font-size: 13px;">No past rental history yet.</p>
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  },

  renderRentalCard(rental, isPast = false) {
    const milestones = window.ONRENT_CONFIG.orderMilestones;
    const currentMilestone = milestones.find(m => m.key === rental.orderStatus) || milestones[0];
    const normImg = window.ProductImage ? window.ProductImage.normalize(rental.productImage, rental.productTitle) : { url: (typeof rental.productImage === 'object' ? rental.productImage.url : rental.productImage), alt: rental.productTitle };

    return `
      <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 20px; box-shadow: var(--shadow-xs);">
        
        <!-- Header row -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--line);">
          <div style="display: flex; gap: 14px; align-items: center;">
            <div style="width: 72px; height: 54px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0; position: relative;">
              ${window.ProductImage ? window.ProductImage.render({
                src: normImg.url,
                alt: normImg.alt,
                productType: rental.productType,
                aspectRatio: '4/3'
              }) : `<img src="${normImg.url}" alt="${normImg.alt}" style="width: 100%; height: 100%; object-fit: cover;" />`}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--violet); text-transform: uppercase;">
                Booking ID: ${rental.bookingId}
              </div>
              <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin: 2px 0;">
                ${rental.productTitle}
              </h3>
              <div style="font-size: 12px; color: var(--muted);">
                Owner: <strong>${rental.ownerName}</strong> (${rental.ownerPhone}) • ${rental.ownerArea}
              </div>
            </div>
          </div>

          <div style="text-align: right;">
            <span class="pill-badge ${isPast ? 'pill-badge-success' : 'pill-badge-lime'}" style="font-size: 12px; font-weight: 800; padding: 5px 12px;">
              ${currentMilestone.icon} ${currentMilestone.label}
            </span>
            <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
              Deposit: <strong>${window.AppState.formatCurrency(rental.deposit)}</strong> (Refundable)
            </div>
          </div>
        </div>

        <!-- Info specs row -->
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: var(--ink); margin-bottom: 16px;">
          <div>📅 <strong>Dates:</strong> ${window.AppState.formatDate(rental.startDate)} → ${window.AppState.formatDate(rental.endDate)} (${rental.daysCount} days)</div>
          <div>💰 <strong>Net Total:</strong> ${window.AppState.formatCurrency(rental.totalPayable)}</div>
          <div>🚚 <strong>Fulfillment:</strong> ${rental.fulfillmentMethod === 'delivery' ? 'Doorstep Delivery' : 'Self Pickup'}</div>
        </div>

        <!-- Service Requests History if any -->
        ${rental.serviceRequests && rental.serviceRequests.length > 0 ? `
          <div style="background-color: var(--ink-50); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--violet); margin-bottom: 6px;">
              Active Service Requests (${rental.serviceRequests.length}):
            </div>
            ${rental.serviceRequests.map(req => `
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding: 4px 0;">
                <div>
                  <strong>${req.title}</strong> — <span style="color: var(--muted);">${req.notes}</span>
                </div>
                <span class="pill-badge pill-badge-violet" style="font-size: 10px;">${req.status.toUpperCase()}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Card Actions -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; padding-top: 10px;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('tracker', { rentalId: '${rental.bookingId}' })">
              ⏱️ Open Status Tracker
            </button>

            ${!isPast ? `
              <button class="btn btn-secondary btn-sm" onclick="RentalsViewComponent.openServiceRequestModal('${rental.bookingId}')">
                🔧 Request Repair / Extension
              </button>
            ` : ''}
          </div>

          <div style="display: flex; gap: 8px;">
            ${!rental.handover.completed ? `
              <button class="btn btn-violet btn-sm" onclick="window.AppState.navigateTo('handover', { rentalId: '${rental.bookingId}' })">
                📷 Handover Form
              </button>
            ` : ''}

            ${rental.orderStatus === 'in_rental' || rental.orderStatus === 'return_due' ? `
              <button class="btn btn-lime btn-sm" onclick="window.AppState.navigateTo('return', { rentalId: '${rental.bookingId}' })">
                ↩️ Return Item
              </button>
            ` : ''}

            ${isPast ? `
              <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('return', { rentalId: '${rental.bookingId}' })">
                Receipt & Refund
              </button>
            ` : ''}
          </div>
        </div>

      </div>
    `;
  },

  // In-Rental Service Request Modal (Repair, Extension, Exchange, Support)
  openServiceRequestModal(bookingId) {
    this.activeModalBookingId = bookingId;
    let modal = document.getElementById('serviceRequestModalContainer');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'serviceRequestModalContainer';
      document.body.appendChild(modal);
    }

    const types = window.ONRENT_CONFIG.rentalRequestTypes;

    modal.innerHTML = `
      <div class="modal-backdrop active" id="serviceReqBackdrop" onclick="if(event.target===this) RentalsViewComponent.closeServiceRequestModal()">
        <div class="modal-box" style="max-width: 540px;">
          <button class="modal-close-btn" onclick="RentalsViewComponent.closeServiceRequestModal()">✕</button>

          <span class="pill-badge pill-badge-violet" style="margin-bottom: 6px;">STEP 7: DURING RENTAL SUPPORT</span>
          <h3 style="font-size: 20px; font-weight: 900; color: var(--ink); margin-bottom: 6px;">
            In-Rental Service Request
          </h3>
          <p style="font-size: 13px; color: var(--muted); margin-bottom: 20px;">
            Need help with your ongoing rental in Sambhajinagar? Submit a ticket below.
          </p>

          <form onsubmit="RentalsViewComponent.submitServiceRequest(event)">
            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">Select Request Type:</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                ${types.map((t, idx) => `
                  <label style="border: 1.5px solid var(--line); border-radius: var(--radius-md); padding: 10px; cursor: pointer; display: flex; flex-direction: column; gap: 2px;" class="request-type-opt">
                    <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 800; color: var(--ink);">
                      <input type="radio" name="requestType" value="${t.id}" ${idx === 0 ? 'checked' : ''} style="accent-color: var(--violet);" />
                      <span>${t.icon} ${t.label}</span>
                    </div>
                    <span style="font-size: 10px; color: var(--muted);">${t.desc}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Subject / Details Title</label>
              <input 
                type="text" 
                id="serviceReqTitle" 
                placeholder="e.g. Request +3 days extension, or report lens calibration check" 
                required 
                style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 14px;" 
              />
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Explanation & Requirements</label>
              <textarea 
                id="serviceReqNotes" 
                rows="3" 
                placeholder="Explain the reason for extension, repair location, or exchange request..." 
                required 
                style="width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius-md); font-size: 13px;"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-lime btn-lg btn-full">
              Submit Service Request Ticket →
            </button>
          </form>
        </div>
      </div>
    `;
  },

  closeServiceRequestModal() {
    const modal = document.getElementById('serviceRequestModalContainer');
    if (modal) modal.innerHTML = '';
  },

  submitServiceRequest(e) {
    e.preventDefault();
    const type = document.querySelector('input[name="requestType"]:checked').value;
    const title = document.getElementById('serviceReqTitle').value;
    const notes = document.getElementById('serviceReqNotes').value;

    window.AppState.createServiceRequest(this.activeModalBookingId, {
      type,
      title,
      notes
    });

    this.closeServiceRequestModal();
    NavigationComponent.showToast('Service request created with status: Pending', 'success');
    this.render();
  }
};
