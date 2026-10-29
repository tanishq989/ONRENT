/**
 * ONRENT — ORDER TRACKER & LIFECYCLE TIMELINE COMPONENT
 * Implements the 7-status timeline:
 * Confirmed -> Out for delivery -> Delivered -> In rental -> Return due -> Returned -> Deposit refunded.
 * Includes interactive milestone stepper for demonstration & verification.
 */

window.TrackerViewComponent = {
  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const rentalId = window.AppState.activeRentalId || (window.AppState.rentals[0] && window.AppState.rentals[0].bookingId);
    const rental = window.AppState.getRentalById(rentalId) || window.AppState.rentals[0];

    if (!rental) {
      container.innerHTML = `
        <div class="container" style="padding: 60px 20px; text-align: center;">
          <h3>No active rental found to track</h3>
          <button class="btn btn-violet" onclick="window.AppState.navigateTo('browse')">Browse Catalogue</button>
        </div>
      `;
      return;
    }

    const milestones = window.ONRENT_CONFIG.orderMilestones;
    const currentStatusIndex = milestones.findIndex(m => m.key === rental.orderStatus);
    const activeIndex = currentStatusIndex !== -1 ? currentStatusIndex : 0;
    const normImg = window.ProductImage ? window.ProductImage.normalize(rental.productImage, rental.productTitle) : { url: (typeof rental.productImage === 'object' ? rental.productImage.url : rental.productImage), alt: rental.productTitle };

    container.innerHTML = `
      <div id="trackerScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 820px;">
          
          <!-- Top bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('rentals')">
              ← Back to My Rentals
            </button>
            <span class="pill-badge pill-badge-violet">ORDER STATUS TRACKER</span>
          </div>

          <!-- RENTAL ITEM HEADER CARD -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-sm); display: flex; gap: 18px; align-items: center; flex-wrap: wrap;">
            <div style="width: 84px; height: 64px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0; position: relative;">
              ${window.ProductImage ? window.ProductImage.render({
                src: normImg.url,
                alt: normImg.alt,
                productType: rental.productType,
                aspectRatio: '4/3'
              }) : `<img src="${normImg.url}" alt="${normImg.alt}" style="width: 100%; height: 100%; object-fit: cover;" />`}
            </div>
            <div style="flex: 1; min-width: 220px;">
              <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">
                Booking ID: <strong style="color: var(--violet);">${rental.bookingId}</strong>
              </div>
              <h2 style="font-size: 18px; font-weight: 900; color: var(--ink); margin: 2px 0;">
                ${rental.productTitle}
              </h2>
              <div style="font-size: 12px; color: var(--muted);">
                Owner: <strong>${rental.ownerName}</strong> (${rental.ownerPhone}) • ${rental.ownerArea}
              </div>
            </div>

            <!-- Active Status Badge -->
            <div style="text-align: right;">
              <div style="font-size: 11px; color: var(--muted); margin-bottom: 4px;">Current Milestone</div>
              <span class="pill-badge pill-badge-lime" style="font-size: 13px; font-weight: 800; padding: 6px 14px;">
                ${milestones[activeIndex].icon} ${milestones[activeIndex].label}
              </span>
            </div>
          </div>

          <!-- SIMULATOR STEPPER BAR (Great for reviewing & demonstrating full flow) -->
          <div style="background-color: var(--ink-50); border: 1px dashed var(--line); border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div>
              <strong style="font-size: 13px; color: var(--ink);">Demo Flow Controller:</strong>
              <div style="font-size: 11px; color: var(--muted);">Step through order lifecycle milestones in real-time</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button 
                class="btn btn-secondary btn-sm" 
                onclick="TrackerViewComponent.stepStatus(-1, '${rental.bookingId}')"
                ${activeIndex === 0 ? 'disabled style="opacity: 0.5;"' : ''}
              >
                ◀ Previous Milestone
              </button>
              <button 
                class="btn btn-violet btn-sm" 
                onclick="TrackerViewComponent.stepStatus(1, '${rental.bookingId}')"
                ${activeIndex >= milestones.length - 1 ? 'disabled style="opacity: 0.5;"' : ''}
              >
                Advance to Next Milestone ▶
              </button>
            </div>
          </div>

          <!-- 7-STATUS TIMELINE COMPONENT -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
            <h3 style="font-size: 17px; font-weight: 900; color: var(--ink); margin-bottom: 6px;">
              Rental Status Timeline
            </h3>
            <p style="font-size: 13px; color: var(--muted); margin-bottom: 24px;">
              Every milestone is verified through mutual records and clear photo timestamps.
            </p>

            <div class="timeline-stepper">
              ${milestones.map((m, idx) => {
                let statusClass = '';
                if (idx < activeIndex) statusClass = 'completed';
                else if (idx === activeIndex) statusClass = 'active';

                return `
                  <div class="timeline-step ${statusClass}">
                    <div class="step-marker">
                      ${idx < activeIndex ? '✓' : (idx === activeIndex ? '●' : idx + 1)}
                    </div>
                    <div class="step-title" style="display: flex; align-items: center; gap: 8px;">
                      <span>${m.icon} ${m.label}</span>
                      ${idx === activeIndex ? '<span class="pill-badge pill-badge-lime" style="font-size: 10px; padding: 2px 8px;">CURRENT</span>' : ''}
                      ${idx < activeIndex ? '<span style="color: var(--success); font-size: 12px; font-weight: 700;">Completed</span>' : ''}
                    </div>
                    <div class="step-desc">${m.desc}</div>
                    ${idx === 0 ? `<div style="font-size: 11px; color: var(--muted); margin-top: 2px;">Recorded: ${rental.createdAt}</div>` : ''}
                    ${idx === 2 && rental.handover.completed ? `<div style="font-size: 11px; color: var(--violet); font-weight: 600; margin-top: 2px;">Handover Photos Timestamped: ${rental.handover.timestamp}</div>` : ''}
                    ${idx === 6 && rental.returnRecord.completed ? `<div style="font-size: 11px; color: var(--success); font-weight: 700; margin-top: 2px;">Deposit Released: ${window.AppState.formatCurrency(rental.returnRecord.depositRefunded)} on ${rental.returnRecord.timestamp}</div>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- CONTEXTUAL ACTION CARD BASED ON STATUS -->
          <div style="background: linear-gradient(135deg, var(--violet-light) 0%, var(--white) 100%); border: 1.5px solid var(--violet-tint); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
            
            ${rental.orderStatus === 'confirmed' || rental.orderStatus === 'out_for_delivery' || rental.orderStatus === 'delivered' ? `
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div>
                  <h4 style="font-size: 16px; font-weight: 800; color: var(--ink);">Step 6: Mutual Handover Condition Record</h4>
                  <p style="font-size: 13px; color: var(--muted); margin-top: 4px;">
                    Take handover photos and digitally sign the handover form with the owner before starting the rental.
                  </p>
                </div>
                <button class="btn btn-violet btn-lg" onclick="window.AppState.navigateTo('handover', { rentalId: '${rental.bookingId}' })">
                  📷 Open Handover Form →
                </button>
              </div>
            ` : ''}

            ${rental.orderStatus === 'in_rental' || rental.orderStatus === 'return_due' ? `
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div>
                  <h4 style="font-size: 16px; font-weight: 800; color: var(--ink);">Rental Active • Ready for Return or Support</h4>
                  <p style="font-size: 13px; color: var(--muted); margin-top: 4px;">
                    Request extensions or maintenance, or initiate return photo scan to claim your deposit refund.
                  </p>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <button class="btn btn-secondary" onclick="window.AppState.navigateTo('rentals')">
                    🔧 Request Support / Extension
                  </button>
                  <button class="btn btn-lime btn-lg" onclick="window.AppState.navigateTo('return', { rentalId: '${rental.bookingId}' })">
                    ↩️ Return Item & Claim Deposit →
                  </button>
                </div>
              </div>
            ` : ''}

            ${rental.orderStatus === 'returned' || rental.orderStatus === 'deposit_refunded' ? `
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div>
                  <h4 style="font-size: 16px; font-weight: 800; color: var(--ink);">Item Returned • Deposit Refunded</h4>
                  <p style="font-size: 13px; color: var(--muted); margin-top: 4px;">
                    ${rental.returnRecord.completed ? `Refund of ${window.AppState.formatCurrency(rental.returnRecord.depositRefunded)} processed. View detailed damage and refund assessment.` : 'Inspection complete. 100% deposit released.'}
                  </p>
                </div>
                <button class="btn btn-violet" onclick="window.AppState.navigateTo('return', { rentalId: '${rental.bookingId}' })">
                  View Deposit Refund Receipt →
                </button>
              </div>
            ` : ''}

          </div>

        </div>
      </div>
    `;
  },

  stepStatus(delta, bookingId) {
    const rental = window.AppState.getRentalById(bookingId);
    if (!rental) return;

    const milestones = window.ONRENT_CONFIG.orderMilestones;
    const currentIndex = milestones.findIndex(m => m.key === rental.orderStatus);
    const newIndex = Math.max(0, Math.min(milestones.length - 1, currentIndex + delta));
    const nextKey = milestones[newIndex].key;

    window.AppState.updateOrderStatus(bookingId, nextKey);
    NavigationComponent.showToast(`Status updated to: ${milestones[newIndex].label}`, 'success');
    this.render();
  }
};
