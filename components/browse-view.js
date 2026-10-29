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
              <div style="flex: 1; min-width: 260px; display: flex; align-items: center; gap: 10px; background-color: var(--ink-50); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 8px 14px;">
                <span style="font-size: 16px; color: var(--violet);">🔍</span>
                <input 
                  type="text" 
                  id="browseSearchInput" 
                  placeholder="Search by product name, e.g. iPhone 15 Pro, MacBook, Canon Creator Kit, Headphones..."
                  value="${window.AppState.searchQuery}"
                  oninput="BrowseViewComponent.onSearchChange(event)"
                  style="border: none; background: transparent; width: 100%; font-size: 14px; font-weight: 600; outline: none;"
                  aria-label="Search rental products"
                />
              </div>

              ${window.AppState.searchQuery || window.AppState.selectedCategory !== 'for-you' || window.AppState.selectedProductType !== 'all' || window.AppState.selectedBrand !== 'All Brands' ? `
                <button class="btn btn-secondary btn-sm" onclick="BrowseViewComponent.clearAllFilters()">
                  ✕ Reset Filters
                </button>
              ` : ''}
            </div>

            <!-- 1. Category Filter Chips (For you, Cameras, Audio, Computers, Phones) -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
              ${categories.map(cat => `
                <button 
                  class="category-chip ${window.AppState.selectedCategory === cat.slug ? 'active' : ''}" 
                  onclick="BrowseViewComponent.selectCategory('${cat.slug}')"
                >
                  <span>${cat.icon}</span>
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
          ${filtered.length > 0 ? `
            <div class="product-grid" id="browseProductsGrid">
              ${filtered.map(p => HomeViewComponent.renderProductCard(p)).join('')}
            </div>
          ` : `
            <!-- Empty State -->
            <div style="text-align: center; padding: 60px 20px; background-color: var(--white); border-radius: var(--radius-xl); border: 1px solid var(--line); box-shadow: var(--shadow-xs);">
              <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
              <h3 style="font-size: 20px; font-weight: 800; color: var(--ink); margin-bottom: 8px;">No matching tech items found</h3>
              <p style="font-size: 14px; color: var(--muted); max-width: 440px; margin: 0 auto 20px;">
                We couldn't find items matching your active search and filters within ${window.AppState.maxDistanceKm}km in Sambhajinagar. Try searching for "iPhone 15", "MacBook Pro", "Canon Creator Kit", "Sony WH-1000XM5", or "Party Speaker".
              </p>
              <button class="btn btn-violet" onclick="BrowseViewComponent.clearAllFilters()">
                Show All Catalogue Items
              </button>
            </div>
          `}

        </div>
      </div>
    `;
  },

  onSearchChange(e) {
    window.AppState.searchQuery = e.target.value;
    BrowseViewComponent.render();
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
