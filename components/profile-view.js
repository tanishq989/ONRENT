/**
 * ONRENT — USER PROFILE & TRUST ACCOUNT COMPONENT
 * Renders user details, Aadhaar verification credentials, held security deposit
 * balance, active service city switcher, and reset option.
 */

window.ProfileViewComponent = {
  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const user = window.AppState.userProfile;
    const rentals = window.AppState.rentals;
    const activeRentalsCount = rentals.filter(r => r.orderStatus !== 'deposit_refunded').length;
    const totalDepositsHeld = rentals
      .filter(r => r.orderStatus !== 'deposit_refunded')
      .reduce((sum, r) => sum + r.deposit, 0);

    container.innerHTML = `
      <div id="profileScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 800px;">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('home')">
              ← Back to Home
            </button>
            <span class="pill-badge pill-badge-violet">MY ACCOUNT & TRUST</span>
          </div>

          <!-- USER PROFILE CARD -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 26px; margin-bottom: 24px; box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, var(--violet) 0%, var(--violet-dark) 100%); color: var(--lime); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; box-shadow: var(--shadow-violet);">
                TS
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <h1 style="font-size: 22px; font-weight: 900; color: var(--ink);">${user.name}</h1>
                  <span class="pill-badge pill-badge-success" style="font-size: 11px;">✓ VERIFIED</span>
                </div>
                <div style="font-size: 13px; color: var(--muted); margin-top: 2px;">
                  ${user.email} • ${user.phone}
                </div>
                <div style="font-size: 12px; color: var(--violet); font-weight: 600; margin-top: 2px;">
                  📍 ${user.address}
                </div>
              </div>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Member Since</div>
              <div style="font-size: 14px; font-weight: 800; color: var(--ink);">${user.joinedDate}</div>
            </div>
          </div>

          <!-- TRUST METRICS & WALLET ESCROW STATS -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
            
            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-xs);">
              <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Active Rentals</div>
              <div style="font-size: 24px; font-weight: 900; color: var(--ink); margin-top: 4px;">
                ${activeRentalsCount} <span style="font-size: 13px; font-weight: 500; color: var(--muted);">in progress</span>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('rentals')" style="margin-top: 10px; width: 100%;">
                View Rentals →
              </button>
            </div>

            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-xs);">
              <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Held Escrow Deposits</div>
              <div style="font-size: 24px; font-weight: 900; color: var(--violet); margin-top: 4px;">
                ${window.AppState.formatCurrency(totalDepositsHeld)}
              </div>
              <div style="font-size: 11px; color: var(--muted); margin-top: 10px;">
                100% refundable upon safe return
              </div>
            </div>

            <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-xs);">
              <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Trust & Standing</div>
              <div style="font-size: 16px; font-weight: 800; color: var(--success); margin-top: 4px;">
                Score 98/100
              </div>
              <div style="font-size: 11px; color: var(--muted); margin-top: 10px;">
                ${user.paymentHistoryScore}
              </div>
            </div>

          </div>

          <!-- VERIFICATION CREDENTIALS DETAILS -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-xs);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">Identity Verification Credentials</h3>
              <span class="pill-badge pill-badge-success">✓ Government Verified</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 13px;">
              <div style="background-color: var(--ink-50); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--line);">
                <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Document Type</div>
                <div style="font-weight: 700; color: var(--ink); margin-top: 2px;">${user.idType}</div>
              </div>

              <div style="background-color: var(--ink-50); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--line);">
                <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Document Number</div>
                <div style="font-weight: 700; color: var(--ink); margin-top: 2px;">${user.idNumber}</div>
              </div>
            </div>

            <div style="margin-top: 14px; font-size: 12px; color: var(--muted);">
              🔒 Stored securely in compliance with peer-to-peer equipment rental guidelines. Only disclosed during mutual handover verification in Sambhajinagar.
            </div>
          </div>

          <!-- SERVICE LOCATION & POLICY -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-xs);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">Service Region Policy</h3>
              <button class="btn btn-secondary btn-sm" onclick="NavigationComponent.openLocationModal()">View City Details</button>
            </div>
            <p style="font-size: 13px; color: var(--muted); line-height: 1.5;">
              ONRENT currently operates exclusively across <strong>Chhatrapati Sambhajinagar, Maharashtra, India</strong> to ensure verified rapid handovers within 2-4 hours and guarantee 100% deposit releases without escrow delays.
            </p>
          </div>

          <!-- SYSTEM ACTIONS & DATA RESET -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px;">
            <div style="font-size: 12px; color: var(--muted);">
              Need to test clean flow from scratch?
            </div>
            <button class="btn btn-secondary btn-sm" onclick="if(confirm('Reset all demo orders and reload original catalogue?')) window.AppState.resetAllData()">
              🔄 Reset Demo Seed Data
            </button>
          </div>

        </div>
      </div>
    `;
  }
};
