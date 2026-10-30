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

    // Close account menus on click outside
    document.addEventListener('click', (e) => {
      const wrapper = document.getElementById('accountDropdownWrapper');
      const mobileWrapper = document.getElementById('mobileAccountWrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        this.closeDesktopAccountMenu();
      }
      if (mobileWrapper && !mobileWrapper.contains(e.target)) {
        this.closeMobileAccountMenu();
      }
    });

    // Keyboard accessibility for account menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const desktopMenu = document.getElementById('desktopAccountMenu');
        if (desktopMenu && desktopMenu.classList.contains('show')) {
          this.closeDesktopAccountMenu();
          document.getElementById('desktopAccountBtn')?.focus();
          return;
        }
        const mobileMenu = document.getElementById('mobileAccountMenu');
        if (mobileMenu && mobileMenu.classList.contains('show')) {
          this.closeMobileAccountMenu();
          document.getElementById('mobileAccountBtn')?.focus();
          return;
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const desktopMenu = document.getElementById('desktopAccountMenu');
        if (desktopMenu && desktopMenu.classList.contains('show')) {
          const items = Array.from(desktopMenu.querySelectorAll('.account-menu-item'));
          if (items.length > 0) {
            e.preventDefault();
            const currentIndex = items.indexOf(document.activeElement);
            if (e.key === 'ArrowDown') {
              const nextIndex = currentIndex === -1 || currentIndex === items.length - 1 ? 0 : currentIndex + 1;
              items[nextIndex].focus();
            } else {
              const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
              items[prevIndex].focus();
            }
          }
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
        </nav>

        <!-- Header Actions -->
        <div class="header-actions">
          <button class="btn btn-lime btn-sm" onclick="window.AppState.navigateTo('list-item')">
            + List an Item
          </button>
          
          <div class="account-dropdown-wrapper" id="accountDropdownWrapper">
            <button 
              class="btn btn-secondary btn-sm account-dropdown-btn ${['rentals', 'tracker', 'profile'].includes(window.AppState.currentScreen) ? 'active' : ''}" 
              id="desktopAccountBtn" 
              onclick="NavigationComponent.toggleAccountMenu(event)" 
              onkeydown="NavigationComponent.handleAccountBtnKeydown(event)"
              aria-haspopup="true" 
              aria-expanded="false" 
              aria-label="Account menu"
            >
              <span>👤 Account</span>
              <svg class="dropdown-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="account-dropdown-menu" id="desktopAccountMenu" role="menu" aria-label="Account options">
              <button class="account-menu-item ${window.AppState.currentScreen === 'rentals' || window.AppState.currentScreen === 'tracker' ? 'active' : ''}" role="menuitem" data-screen="rentals" onclick="NavigationComponent.selectAccountOption('rentals')">
                <span class="menu-item-icon">📦</span>
                <span>My Rentals</span>
              </button>
              <button class="account-menu-item ${window.AppState.currentScreen === 'profile' ? 'active' : ''}" role="menuitem" data-screen="profile" onclick="NavigationComponent.selectAccountOption('profile')">
                <span class="menu-item-icon">👤</span>
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  handleAccountBtnKeydown(event) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      const menu = document.getElementById('desktopAccountMenu');
      if (menu && !menu.classList.contains('show')) {
        event.preventDefault();
        this.openDesktopAccountMenu();
        const first = menu.querySelector('.account-menu-item');
        if (first) first.focus();
      }
    }
  },

  toggleAccountMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('desktopAccountMenu');
    if (!menu) return;

    if (menu.classList.contains('show')) {
      this.closeDesktopAccountMenu();
    } else {
      this.closeMobileAccountMenu();
      this.openDesktopAccountMenu();
    }
  },

  openDesktopAccountMenu() {
    const menu = document.getElementById('desktopAccountMenu');
    const btn = document.getElementById('desktopAccountBtn');
    if (menu) menu.classList.add('show');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  },

  closeDesktopAccountMenu() {
    const menu = document.getElementById('desktopAccountMenu');
    const btn = document.getElementById('desktopAccountBtn');
    if (menu) menu.classList.remove('show');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  },

  toggleMobileAccountMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('mobileAccountMenu');
    if (!menu) return;

    if (menu.classList.contains('show')) {
      this.closeMobileAccountMenu();
    } else {
      this.closeDesktopAccountMenu();
      this.openMobileAccountMenu();
    }
  },

  openMobileAccountMenu() {
    const menu = document.getElementById('mobileAccountMenu');
    const btn = document.getElementById('mobileAccountBtn');
    if (menu) menu.classList.add('show');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  },

  closeMobileAccountMenu() {
    const menu = document.getElementById('mobileAccountMenu');
    const btn = document.getElementById('mobileAccountBtn');
    if (menu) menu.classList.remove('show');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  },

  closeAccountMenus() {
    this.closeDesktopAccountMenu();
    this.closeMobileAccountMenu();
  },

  selectAccountOption(screen) {
    this.closeAccountMenus();
    window.AppState.navigateTo(screen);
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
    const isAccountActive = current === 'rentals' || current === 'tracker' || current === 'profile';

    bar.innerHTML = `
      <button class="mobile-nav-tab ${current === 'home' ? 'active' : ''}" onclick="window.AppState.navigateTo('home')" aria-label="Home">
        <span class="tab-icon">🏠</span>
        <span>Home</span>
      </button>

      <button class="mobile-nav-tab ${current === 'browse' ? 'active' : ''}" onclick="window.AppState.navigateTo('browse')" aria-label="Browse">
        <span class="tab-icon">🔍</span>
        <span>Browse</span>
      </button>

      <div class="mobile-account-wrapper" id="mobileAccountWrapper">
        <div class="mobile-account-menu" id="mobileAccountMenu" role="menu" aria-label="Account options">
          <button class="mobile-account-menu-item ${current === 'rentals' || current === 'tracker' ? 'active' : ''}" role="menuitem" onclick="NavigationComponent.selectAccountOption('rentals')">
            <span class="tab-icon">📦</span>
            <span>My Rentals</span>
          </button>
          <button class="mobile-account-menu-item ${current === 'profile' ? 'active' : ''}" role="menuitem" onclick="NavigationComponent.selectAccountOption('profile')">
            <span class="tab-icon">👤</span>
            <span>Profile</span>
          </button>
        </div>

        <button class="mobile-nav-tab ${isAccountActive ? 'active' : ''}" id="mobileAccountBtn" onclick="NavigationComponent.toggleMobileAccountMenu(event)" aria-haspopup="true" aria-expanded="false" aria-label="Account">
          <span class="tab-icon">👤</span>
          <span>Account</span>
        </button>
      </div>
    `;
  },

  updateActiveNavStates() {
    const current = window.AppState.currentScreen;
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-screen') === current);
    });

    const isAccountActive = current === 'rentals' || current === 'tracker' || current === 'profile';
    const desktopAccountBtn = document.getElementById('desktopAccountBtn');
    if (desktopAccountBtn) {
      desktopAccountBtn.classList.toggle('active', isAccountActive);
    }

    document.querySelectorAll('.account-menu-item').forEach(item => {
      const target = item.getAttribute('data-screen');
      const isActive = target === current || (target === 'rentals' && current === 'tracker');
      item.classList.toggle('active', isActive);
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
          
          <div style="width: 56px; height: 56px; border-radius: 50%; background-color: var(--brand-50); color: var(--brand-700); display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px; border: 1px solid var(--brand-card-border);">
            📍
          </div>

          <h3 style="font-size: 22px; font-weight: 700; color: var(--brand-900); margin-bottom: 8px;">Active Service City</h3>
          <p style="font-size: 14px; color: var(--brand-700); margin-bottom: 20px;">
            ONRENT provides verified peer-to-peer equipment rentals with mutual photo handovers exclusively in:
          </p>

          <div style="background-color: var(--brand-50); border: 1px solid var(--brand-card-border); border-radius: var(--radius-card); padding: 14px; margin-bottom: 20px;">
            <div style="font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--brand-900);">Chhatrapati Sambhajinagar</div>
            <div style="font-size: 12px; color: var(--brand-700); margin-top: 4px;">Maharashtra, India</div>
          </div>

          <div style="text-align: left; margin-bottom: 24px;">
            <div style="font-family: var(--font-display); font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--brand-700); margin-bottom: 8px;">Supported Verified Hubs:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${neighborhoods.map(n => `<span class="pill-badge pill-badge-muted">${n}</span>`).join('')}
            </div>
          </div>

          <div style="background-color: var(--brand-50); border: 1px solid var(--brand-card-border); border-radius: var(--radius-card); padding: 12px; font-size: 12px; color: var(--brand-900); margin-bottom: 20px;">
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
