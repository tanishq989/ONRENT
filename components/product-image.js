/**
 * ONRENT — REUSABLE PRODUCT IMAGE COMPONENT
 * Implements fixed aspect ratios (4:3 on cards, 4:3 or 1:1 on product page),
 * object-fit: cover, rounded corners matching design system, native lazy loading,
 * soft shimmering skeleton loading state, and fallback neutral tiles for broken images.
 */

window.ProductImage = {
  // Product type icon mappings for neutral fallback tiles
  productIcons: {
    'PS5': 'gamepad',
    'Gaming': 'gamepad',
    'Speakers': 'speaker',
    'Laptops': 'laptop',
    'iPhones': 'smartphone',
    'MacBooks': 'laptop',
    'DSLR cameras': 'camera',
    'DSLR lenses': 'lens',
    'Cameras': 'camera',
    'Computers': 'laptop',
    'Phones': 'smartphone'
  },

  /**
   * Safely normalizes an image item that can be either:
   * - A string URL ('public/images/...')
   * - An object ({ url: '...', alt: '...' })
   */
  normalize(imgItem, defaultAlt = 'ONRENT Gear') {
    if (!imgItem) {
      return { url: '', alt: defaultAlt };
    }
    let rawUrl = typeof imgItem === 'string' ? imgItem : (imgItem.url || '');
    let alt = typeof imgItem === 'string' ? defaultAlt : (imgItem.alt || defaultAlt);

    rawUrl = rawUrl.trim();

    // Strip any leading slashes so file:// does not look at drive root
    rawUrl = rawUrl.replace(/^\/+/, '');

    // Normalize public/images/ to ./images/
    if (rawUrl.startsWith('public/images/')) {
      rawUrl = './images/' + rawUrl.slice('public/images/'.length);
    }

    // Ensure relative path starting with ./ for file:// and offline execution
    if (!rawUrl.startsWith('./') && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://') && !rawUrl.startsWith('data:')) {
      rawUrl = './' + rawUrl;
    }

    return {
      url: rawUrl,
      alt: alt
    };
  },

  /**
   * Renders the unified ProductImage HTML wrapper with skeleton & error handlers
   */
  render({
    src,
    alt = 'ONRENT Gear',
    productType = 'Tech Gear',
    aspectRatio = '4/3',
    className = '',
    style = '',
    overlayHtml = '',
    id = '',
    zoomable = false,
    loading = 'lazy'
  }) {
    const norm = this.normalize(src, alt);
    const imageUrl = norm.url;
    const imageAlt = norm.alt;
    const safeType = (productType || 'Tech Gear').replace(/'/g, "\\'");
    const idAttr = id ? `id="${id}"` : '';
    const zoomAttr = zoomable ? `onclick="ProductImage.openZoom('${imageUrl}', '${imageAlt.replace(/'/g, "\\'")}')" style="cursor: zoom-in;"` : '';

    return `
      <div class="onrent-img-wrap ${className}" style="aspect-ratio: ${aspectRatio}; ${style}" ${zoomAttr}>
        <!-- Soft background shimmer skeleton (does not hide content) -->
        <div class="onrent-skeleton" aria-hidden="true"></div>

        <!-- Product Photo: visible by default with error fallback -->
        <img 
          ${idAttr}
          src="${imageUrl}" 
          alt="${imageAlt}" 
          loading="${loading}"
          decoding="async"
          class="onrent-img is-loaded"
          onload="ProductImage.handleLoad(this)"
          onerror="ProductImage.handleError(this, '${safeType}')"
        />

        <!-- Overlays (Condition badge, distance tag, availability) -->
        ${overlayHtml ? `<div class="onrent-img-overlays">${overlayHtml}</div>` : ''}
      </div>
    `;
  },

  /**
   * Called when image successfully loads: removes skeleton
   */
  handleLoad(imgEl) {
    if (!imgEl) return;
    imgEl.classList.add('is-loaded');
    const wrap = imgEl.closest('.onrent-img-wrap');
    if (wrap) {
      const skeleton = wrap.querySelector('.onrent-skeleton');
      if (skeleton) {
        skeleton.classList.add('skeleton-hidden');
      }
    }
  },

  /**
   * Fallback: if an image fails to load, replaces with a sleek neutral tile
   * displaying the specific product type icon & label, avoiding any broken image icons.
   */
  handleError(imgEl, productType = 'Tech Gear') {
    if (!imgEl) return;
    const wrap = imgEl.closest('.onrent-img-wrap');
    const iconId = this.productIcons[productType] || 'bolt';

    if (wrap) {
      const skeleton = wrap.querySelector('.onrent-skeleton');
      if (skeleton) skeleton.remove();
      
      imgEl.style.display = 'none';

      let fallbackEl = wrap.querySelector('.onrent-img-fallback');
      if (!fallbackEl) {
        fallbackEl = document.createElement('div');
        fallbackEl.className = 'onrent-img-fallback';
        fallbackEl.innerHTML = `
          <div class="fallback-icon">
            <svg class="icon icon-28" aria-hidden="true"><use href="#icon-${iconId}"></use></svg>
          </div>
          <span class="fallback-label">${productType}</span>
          <span class="fallback-badge">ONRENT Verified Gear</span>
        `;
        wrap.insertBefore(fallbackEl, wrap.firstChild);
      }
    }
  },

  /**
   * Tap-to-zoom modal for mobile & desktop inspections
   */
  openZoom(imgUrl, altText) {
    let modal = document.getElementById('imageZoomModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'imageZoomModal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-backdrop active" onclick="ProductImage.closeZoom()" style="display: flex; align-items: center; justify-content: center; z-index: 10000; background: rgba(20, 33, 61, 0.92); backdrop-filter: blur(8px);">
        <div style="position: relative; max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column; align-items: center;" onclick="event.stopPropagation()">
          <button 
            onclick="ProductImage.closeZoom()" 
            style="position: absolute; top: -44px; right: 0; background: rgba(255,255,255,0.2); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
            aria-label="Close zoom preview"
          >
            <svg class="icon icon-20" style="color: white;" aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
          <img 
            src="${imgUrl}" 
            alt="${altText}" 
            style="max-width: 100%; max-height: 75vh; border-radius: var(--radius-lg); object-fit: contain; box-shadow: 0 20px 40px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.15);" 
          />
          <div style="color: white; font-size: 13px; font-weight: 600; margin-top: 12px; text-align: center; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
            ${altText}
          </div>
          <div style="color: var(--brand-100); font-size: 11px; margin-top: 4px; display: flex; align-items: center; gap: 4px; justify-content: center;">
            <span>Pinch to zoom on mobile • Click outside or</span> <svg class="icon icon-16" style="color: var(--brand-100); width: 12px; height: 12px;" aria-hidden="true"><use href="#icon-close"></use></svg> <span>to close</span>
          </div>
        </div>
      </div>
    `;
  },

  closeZoom() {
    const modal = document.getElementById('imageZoomModal');
    if (modal) modal.remove();
  }
};
