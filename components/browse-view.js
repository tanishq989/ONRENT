/**
 * ONRENT — BROWSE & SEARCH VIEW COMPONENT
 * Full catalogue browser with search by product, location, rental duration,
 * category chips (For you, Cameras, Audio, Computers, Phones),
 * 7 product types filter, brand filter, distance slider, price sorting,
 * and empty state handling.
 */

window.BrowseViewComponent = {
  render() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    const filtered = window.AppState.getFilteredProducts();
    const categories = (window.ONRENT_CONFIG && window.ONRENT_CONFIG.categories) || (window.ONRENT_SEEDS && window.ONRENT_SEEDS.categories) || [];
    const productTypes = window.ONRENT_CONFIG.productTypes;
    const brands = window.ONRENT_CONFIG.brands;

    container.innerHTML = `
      <div id="browseScreen" class="view-screen">
        <div class="container" style="padding-top: 24px; padding-bottom: 48px;">
          
          <!-- Breadcrumb & Top Bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <button class="btn btn-secondary btn-sm" onclick="window.AppState.navigateTo('home')">
              ← Back to Home
            </button>
            <div style="font-size: 12px; color: var(--muted); font-weight: 600;">
              Service Location: <strong style="color: var(--ink);">${window.AppState.activeCity}</strong>
            </div>
          </div>

          <!-- Section Title & Result Count -->
          <div class="section-head" style="margin-bottom: 18px;">
            <div>
              <h1 class="section-title">Explore Rental Catalogue</h1>
              <p class="section-subtitle" id="browseResultSummaryText">
                Showing ${filtered.length} verified items available in Chhatrapati Sambhajinagar
              </p>
            </div>
          </div>

          <!-- SEARCH & FILTER TOOLBAR CARD -->
          <div style="background-color: var(--white); border: 1px solid var(--line); border-radius: var(--radius-xl); padding: 18px; margin-bottom: 24px; box-shadow: var(--shadow-xs);">
            
            <!-- Search Keyword Bar & Clear Action -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
              <div class="browse-search-unit" onclick="document.getElementById('browseSearchInput')?.focus()">
                <label for="browseSearchInput" class="visually-hidden">Search rental products</label>
                <span class="search-field-icon" aria-hidden="true">
                  <svg class="icon icon-22" style="color: var(--brand-700);" aria-hidden="true"><use href="#icon-search"></use></svg>
                </span>
                <input 
                  type="search" 
                  id="browseSearchInput" 
                  placeholder="Search iPhone, MacBook, PS5, camera…"
                  value="${window.AppState.searchQuery || ''}"
                  autocomplete="off"
                  enterkeyhint="search"
                  oninput="BrowseViewComponent.onSearchInput(event)"
                  onkeydown="BrowseViewComponent.onSearchKeydown(event)"
                  aria-label="Search rental products"
                />
                <button 
                  type="button" 
                  class="search-clear-btn" 
                  id="browseSearchClearBtn" 
                  aria-label="Clear search" 
                  onclick="BrowseViewComponent.clearSearch(event)"
                  style="display: ${window.AppState.searchQuery ? 'inline-flex' : 'none'};"
                >
                  <svg class="icon icon-16" aria-hidden="true"><use href="#icon-close"></use></svg>
                </button>
              </div>

              ${window.AppState.searchQuery || window.AppState.selectedCategory !== 'for-you' || window.AppState.selectedProductType !== 'all' || window.AppState.selectedBrand !== 'All Brands' ? `
                <button class="btn btn-secondary btn-sm" onclick="BrowseViewComponent.clearAllFilters()">
                  <svg class="icon icon-16" style="vertical-align: -2px; margin-right: 4px;" aria-hidden="true"><use href="#icon-close"></use></svg> Reset Filters
                </button>
              ` : ''}
            </div>

            <!-- 1. Category Filter Chips (For you, Cameras, Speakers, Computers, Phones, Gaming) -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
              ${categories.map(cat => `
                <button 
                  class="category-chip ${window.AppState.selectedCategory === cat.slug ? 'active' : ''}" 
                  onclick="BrowseViewComponent.selectCategory('${cat.slug}')"
                >
                  <span class="chip-icon">${cat.icon}</span>
                  <span>${cat.name}</span>
                </button>
              `).join('')}
            </div>

            <!-- 2. Product Type Filter Pills (The 7 Approved Product Types) -->
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; padding: 10px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
              <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--muted); margin-right: 4px;">Type:</span>
              <button 
                class="pill-badge ${window.AppState.selectedProductType === 'all' ? 'pill-badge-violet' : 'pill-badge-muted'}" 
                onclick="BrowseViewComponent.selectProductType('all')"
                style="cursor: pointer;"
              >
                All Types
              </button>
              ${productTypes.map(pt => `
                <button 
                  class="pill-badge ${window.AppState.selectedProductType === pt ? 'pill-badge-violet' : 'pill-badge-muted'}" 
                  onclick="BrowseViewComponent.selectProductType('${pt}')"
                  style="cursor: pointer;"
                >
                  ${pt}
                </button>
              `).join('')}
            </div>

            <!-- 3. Secondary Filters: Brand, Sort, Radius Slider, and Duration -->
            <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
              
              <!-- Brand Filter Dropdown -->
              <div style="display: flex; align-items: center; gap: 8px;">
                <label for="browseBrandSelect" style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Brand:</label>
                <select 
                  id="browseBrandSelect" 
                  onchange="BrowseViewComponent.onBrandChange(event)"
                  style="padding: 6px 12px; border-radius: var(--radius-sm); border: 1px solid var(--line); background-color: var(--ink-50); font-size: 13px; font-weight: 600;"
                >
                  ${brands.map(b => `<option value="${b}" ${window.AppState.selectedBrand === b ? 'selected' : ''}>${b}</option>`).join('')}
                </select>
              </div>

              <!-- Sort Selector -->
              <div style="display: flex; align-items: center; gap: 8px;">
                <label for="browseSortSelect" style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Sort by:</label>
                <select 
                  id="browseSortSelect" 
                  onchange="BrowseViewComponent.onSortChange(event)"
                  style="padding: 6px 12px; border-radius: var(--radius-sm); border: 1px solid var(--line); background-color: var(--ink-50); font-size: 13px; font-weight: 600;"
                >
                  <option value="distance" ${window.AppState.sortBy === 'distance' ? 'selected' : ''}>Distance (Closest First)</option>
                  <option value="price_asc" ${window.AppState.sortBy === 'price_asc' ? 'selected' : ''}>Price (Low to High)</option>
                  <option value="price_desc" ${window.AppState.sortBy === 'price_desc' ? 'selected' : ''}>Price (High to Low)</option>
                  <option value="rating" ${window.AppState.sortBy === 'rating' ? 'selected' : ''}>Highest Rating</option>
                </select>
              </div>

              <!-- Distance Filter Slider -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <label for="browseDistanceSlider" style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">
                  Max Radius: <strong style="color: var(--violet);">${window.AppState.maxDistanceKm} km</strong>
                </label>
                <input 
                  type="range" 
                  id="browseDistanceSlider" 
                  min="2" 
                  max="15" 
                  step="1" 
                  value="${window.AppState.maxDistanceKm}"
                  oninput="BrowseViewComponent.onDistanceChange(event)"
                  style="accent-color: var(--violet); cursor: pointer;"
                />
              </div>

            </div>

          </div>

          <!-- RESULTS GRID OR EMPTY STATE -->
          <div id="browseResultsContainer">
            ${filtered.length > 0 ? `
              <div class="product-grid" id="browseProductsGrid">
                ${filtered.map(p => HomeViewComponent.renderProductCard(p)).join('')}
              </div>
            ` : `
              <!-- Empty State -->
              <div style="text-align: center; padding: 60px 20px; background-color: var(--white); border-radius: var(--radius-xl); border: 1px solid var(--line); box-shadow: var(--shadow-xs);">
                <div style="width: 56px; height: 56px; border-radius: 50%; background-color: var(--brand-50); color: var(--brand-700); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                  <svg class="icon icon-28" aria-hidden="true"><use href="#icon-search"></use></svg>
                </div>
                <h3 style="font-size: 20px; font-weight: 800; color: var(--ink); margin-bottom: 8px;">
                  ${window.AppState.searchQuery ? `No items match '${window.AppState.searchQuery}'` : 'No matching tech items found'}
                </h3>
                <p style="font-size: 14px; color: var(--muted); max-width: 440px; margin: 0 auto 20px;">
                  ${window.AppState.searchQuery ? 'Try another name or clear filters to view available gear.' : `We couldn't find items matching your active search and filters within ${window.AppState.maxDistanceKm}km in Sambhajinagar.`}
                </p>
                <button class="btn btn-violet" onclick="BrowseViewComponent.clearAllFilters()">
                  Clear Filters & Show All
                </button>
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  },

  debounceTimer: null,

  onSearchInput(e) {
    const raw = e.target.value;
    const clearBtn = document.getElementById('browseSearchClearBtn');
    if (clearBtn) {
      clearBtn.style.display = raw.trim().length > 0 ? 'inline-flex' : 'none';
    }

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      window.AppState.searchQuery = raw;
      this.updateResults();
    }, 200);
  },

  clearSearch(e) {
    if (e) e.stopPropagation();
    clearTimeout(this.debounceTimer);
    const input = document.getElementById('browseSearchInput');
    if (input) {
      input.value = '';
      window.AppState.searchQuery = '';
      const clearBtn = document.getElementById('browseSearchClearBtn');
      if (clearBtn) clearBtn.style.display = 'none';
      input.focus();
    }
    this.updateResults();
  },

  onSearchKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.clearSearch(e);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(this.debounceTimer);
      const input = document.getElementById('browseSearchInput');
      if (input) {
        window.AppState.searchQuery = input.value;
      }
      this.updateResults();
    }
  },

  updateResults() {
    const filtered = window.AppState.getFilteredProducts();
    const summaryText = document.getElementById('browseResultSummaryText');
    if (summaryText) {
      summaryText.textContent = `Showing ${filtered.length} verified items available in Chhatrapati Sambhajinagar`;
    }

    const container = document.getElementById('browseResultsContainer');
    if (!container) return;

    if (filtered.length > 0) {
      container.innerHTML = `
        <div class="product-grid" id="browseProductsGrid">
          ${filtered.map(p => HomeViewComponent.renderProductCard(p)).join('')}
        </div>
      `;
    } else {
      const q = (window.AppState.searchQuery || '').trim();
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background-color: var(--white); border-radius: var(--radius-xl); border: 1px solid var(--line); box-shadow: var(--shadow-xs);">
          <div style="width: 56px; height: 56px; border-radius: 50%; background-color: var(--brand-50); color: var(--brand-700); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            <svg class="icon icon-28" aria-hidden="true"><use href="#icon-search"></use></svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 800; color: var(--ink); margin-bottom: 8px;">
            ${q ? `No items match '${q}'. Try another name or clear filters.` : 'No items match your active filters.'}
          </h3>
          <p style="font-size: 14px; color: var(--muted); max-width: 440px; margin: 0 auto 20px;">
            ${q ? 'Try searching for generic terms like camera, macbook, drone, or bike.' : `We couldn't find items matching your active search and filters within ${window.AppState.maxDistanceKm}km in Sambhajinagar.`}
          </p>
          <button class="btn btn-violet" onclick="BrowseViewComponent.clearSearch()">
            Clear search
          </button>
        </div>
      `;
    }
  },

  selectCategory(slug) {
    window.AppState.selectedCategory = slug;
    window.AppState.selectedProductType = 'all';
    BrowseViewComponent.render();
  },

  selectProductType(pt) {
    window.AppState.selectedProductType = pt;
    BrowseViewComponent.render();
  },

  onBrandChange(e) {
    window.AppState.selectedBrand = e.target.value;
    BrowseViewComponent.render();
  },

  onSortChange(e) {
    window.AppState.sortBy = e.target.value;
    BrowseViewComponent.render();
  },

  onDistanceChange(e) {
    window.AppState.maxDistanceKm = Number(e.target.value);
    BrowseViewComponent.render();
  },

  clearAllFilters() {
    window.AppState.searchQuery = '';
    window.AppState.selectedCategory = 'for-you';
    window.AppState.selectedProductType = 'all';
    window.AppState.selectedBrand = 'All Brands';
    window.AppState.maxDistanceKm = 10;
    window.AppState.sortBy = 'distance';
    BrowseViewComponent.render();
  }
};

// Global "/" keyboard shortcut to focus search without typing "/"
if (typeof window !== 'undefined' && !window.__slashSearchListenerAdded) {
  window.__slashSearchListenerAdded = true;
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName) && !document.activeElement?.isContentEditable) {
      e.preventDefault();
      const browseInput = document.getElementById('browseSearchInput');
      const heroInput = document.getElementById('heroProductQuery');
      if (browseInput) {
        browseInput.focus();
        browseInput.select();
      } else if (heroInput) {
        heroInput.focus();
        heroInput.select();
      } else {
        window.AppState.navigateTo('browse');
        setTimeout(() => {
          const bi = document.getElementById('browseSearchInput');
          if (bi) {
            bi.focus();
            bi.select();
          }
        }, 50);
      }
    }
  });
}
