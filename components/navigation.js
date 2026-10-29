/**
 * ONRENT — NAVIGATION & HEADER COMPONENT
 * Renders the responsive desktop header, mobile bottom navigation bar,
 * active city switcher modal, and toast notification manager.
 */

window.NavigationComponent = {
  init() {
    this.renderHeader();
    this.renderMobileBottomBar();
    this.renderLocationModal();
    this.setupListeners();
  },

  setupListeners() {
    window.addEventListener('scroll', () => {
      const header = document.getElementById('siteHeader');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    window.AppState.subscribe((event, payload) => {
      this.updateActiveNavStates();
      if (event === 'navigate' && payload.screen) {
        this.updateHeaderCityDisplay();
      }
    });
  },

  renderHeader() {
    const headerContainer = document.getElementById('siteHeader');
    if (!headerContainer) return;

    headerContainer.innerHTML = `
      <div class="container header-container">
        <!-- Brand Logo & Eyebrow -->
        <div class="brand-block" onclick="window.AppState.navigateTo('home')" role="button" tabindex="0" aria-label="ONRENT Home">
          <div class="brand-symbol">⚡</div>
          <div class="brand-text-wrap">
            <span class="brand-name">ONRENT</span>
            <span class="brand-eyebrow-text">RENT SMARTER, LIVE LIGHTER</span>
          </div>
        </div>

        <!-- Location Indicator / Switcher -->
        <button class="location-selector-chip" id="locationSelectorBtn" onclick="NavigationComponent.openLocationModal()" aria-label="Current service city">
          <span class="location-dot">📍</span>
          <span id="activeCityHeaderLabel">${window.AppState.activeCity}</span>
          <span style="font-size: 10px; color: var(--muted); margin-left: 2px;">▼</span>
        </button>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <button class="nav-item-btn ${window.AppState.currentScreen === 'home' ? 'active' : ''}" data-screen="home" onclick="window.AppState.navigateTo('home')">Home</button>
          <button class="nav-item-btn ${window.AppState.currentScreen === 'browse' ? 'active' : ''}" data-screen="browse" onclick="window.AppState.navigateTo('browse')">Browse</button>
          <button class="nav-item-btn ${window.AppState.currentScreen === 'rentals' ? 'active' : ''}" data-screen="rentals" onclick="window.AppState.navigateTo('rentals')">My Rentals</button>
          <button class="nav-item-btn ${window.AppState.currentScreen === 'list-item' ? 'active' : ''}" data-screen="list-item" onclick="window.AppState.navigateTo('list-item')">List Item</button>
          <button class="nav-item-btn ${window.AppState.currentScreen === 'profile' ? 'active' : ''}" data-screen="profile" onclick="window.AppState.navigateTo('profile')">Profile</button>
        </nav>

        <!-- Header Actions -->
        <div class="header-actions">
          <button class="btn btn-lime btn-sm" onclick="window.AppState.navigateTo('list-item')">
            + List an Item
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('profile')" style="display: none;" id="desktopProfileBtn">
            👤 Account
          </button>
        </div>
      </div>
    `;

    if (window.innerWidth >= 992) {
      const btn = document.getElementById('desktopProfileBtn');
      if (btn) btn.style.display = 'inline-flex';
    }
  },

  renderMobileBottomBar() {
    let bar = document.getElementById('mobileBottomNav');
    if (!bar) {
      bar = document.createElement('nav');
      bar.id = 'mobileBottomNav';
      bar.className = 'mobile-bottom-bar';
      bar.setAttribute('aria-label', 'Mobile Navigation');
      document.body.appendChild(bar);
    }

    const current = window.AppState.currentScreen;
    bar.innerHTML = `
      <button class="mobile-nav-tab ${current === 'home' ? 'active' : ''}" onclick="window.AppState.navigateTo('home')" aria-label="Home">
        <span class="tab-icon">🏠</span>
        <span>Home</span>
      </button>

      <button class="mobile-nav-tab ${current === 'browse' ? 'active' : ''}" onclick="window.AppState.navigateTo('browse')" aria-label="Browse">
        <span class="tab-icon">🔍</span>
        <span>Browse</span>
      </button>

      <button class="mobile-nav-tab list-tab-highlight ${current === 'list-item' ? 'active' : ''}" onclick="window.AppState.navigateTo('list-item')" aria-label="List an item">
        <div class="tab-icon-wrap">＋</div>
        <span>List Item</span>
      </button>

      <button class="mobile-nav-tab ${current === 'rentals' || current === 'tracker' ? 'active' : ''}" onclick="window.AppState.navigateTo('rentals')" aria-label="Rentals">
        <span class="tab-icon">📦</span>
        <span>Rentals</span>
      </button>

      <button class="mobile-nav-tab ${current === 'profile' ? 'active' : ''}" onclick="window.AppState.navigateTo('profile')" aria-label="Profile">
        <span class="tab-icon">👤</span>
        <span>Profile</span>
      </button>
    `;
  },

  updateActiveNavStates() {
    const current = window.AppState.currentScreen;
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-screen') === current);
    });
    this.renderMobileBottomBar();
  },

  updateHeaderCityDisplay() {
    const el = document.getElementById('activeCityHeaderLabel');
    if (el) el.textContent = window.AppState.activeCity;
  },

  renderLocationModal() {
    let modal = document.getElementById('locationModalContainer');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'locationModalContainer';
      document.body.appendChild(modal);
    }

    const neighborhoods = window.ONRENT_CONFIG.supportedNeighborhoods;

    modal.innerHTML = `
      <div class="modal-backdrop" id="locationModalBackdrop" onclick="if(event.target===this) NavigationComponent.closeLocationModal()">
        <div class="modal-box" style="max-width: 500px; text-align: center;">
          <button class="modal-close-btn" onclick="NavigationComponent.closeLocationModal()" aria-label="Close modal">✕</button>
          
          <div style="width: 56px; height: 56px; border-radius: 50%; background-color: var(--violet-light); color: var(--violet); display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px;">
            📍
          </div>

          <h3 style="font-size: 22px; font-weight: 900; color: var(--ink); margin-bottom: 8px;">Active Service City</h3>
          <p style="font-size: 14px; color: var(--muted); margin-bottom: 20px;">
            ONRENT provides verified peer-to-peer equipment rentals with mutual photo handovers exclusively in:
          </p>

          <div style="background-color: var(--violet-light); border: 1.5px solid var(--violet-tint); border-radius: var(--radius-md); padding: 14px; margin-bottom: 20px;">
            <div style="font-size: 16px; font-weight: 800; color: var(--violet-dark);">Chhatrapati Sambhajinagar</div>
            <div style="font-size: 12px; color: var(--muted); margin-top: 4px;">Maharashtra, India</div>
          </div>

          <div style="text-align: left; margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--muted); margin-bottom: 8px;">Supported Verified Hubs:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${neighborhoods.map(n => `<span class="pill-badge pill-badge-muted">${n}</span>`).join('')}
            </div>
          </div>

          <div style="background-color: var(--lime-light); border: 1px solid rgba(139, 159, 30, 0.3); border-radius: var(--radius-md); padding: 12px; font-size: 12px; color: var(--ink); margin-bottom: 20px;">
            ✨ Handover condition inspections and deposit guarantees are active across all 12 Sambhajinagar sectors.
          </div>

          <button class="btn btn-violet btn-full" onclick="NavigationComponent.closeLocationModal()">
            Continue Browsing Sambhajinagar Listings →
          </button>
        </div>
      </div>
    `;
  },

  openLocationModal() {
    const backdrop = document.getElementById('locationModalBackdrop');
    if (backdrop) backdrop.classList.add('active');
  },

  closeLocationModal() {
    const backdrop = document.getElementById('locationModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  },

  showToast(message, type = 'info') {
    let shelf = document.getElementById('toastShelf');
    if (!shelf) {
      shelf = document.createElement('div');
      shelf.id = 'toastShelf';
      shelf.className = 'toast-shelf';
      shelf.setAttribute('aria-live', 'polite');
      document.body.appendChild(shelf);
    }

    const toast = document.createElement('div');
    toast.className = `toast-pill ${type}`;
    let icon = '⚡';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    shelf.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => {
        toast.remove();
      }, 250);
    }, 3200);
  }
};
