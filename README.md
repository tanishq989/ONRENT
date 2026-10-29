# ONRENT — Rent What You Need

> **Tagline**: *"Rent what you need"*  
> **Default Service City**: Chhatrapati Sambhajinagar, Maharashtra, India  

ONRENT is a complete, responsive peer-to-peer equipment rental marketplace designed with a mobile-first philosophy (430px app feel) that dynamically scales to a fluid multi-column desktop layout.

The marketplace is strictly scoped to **7 tech & creator product types**:
1. **Speakers**
2. **Laptops**
3. **iPhones**
4. **MacBooks**
5. **DSLR cameras**
6. **DSLR lenses**
7. **PS5**

---

## 🎨 Design System & Palette

- **Ink**: `#14213d` (Deep text, high-contrast headings)
- **Violet**: `#6f4bf6` (Primary brand accent, hero gradients)
- **Dark Violet**: `#5131ca` (Active headers, hover states)
- **Lime**: `#ddf75b` (Call-to-action buttons, high-visibility badges)
- **Orange**: `#ff8b5e` (Notice highlights, urgent status badges)
- **Paper**: `#f6f7fb` (Modern soft background)
- **Line**: `#e8eaf1` (Crisp dividers and borders)
- **Muted**: `#677187` (Secondary descriptions, captions)
- **Geometry**: 19px–28px card border-radius, pill chips, soft layered shadows.

---

## 🧭 Navigation & Moment Tiles

### Category Chips:
1. **For you** (`for-you`) — Curated catalogue across all 7 gear types (28 Items)
2. **Cameras** (`cameras`) — DSLR bodies and professional lenses (8 Items)
3. **Speakers** (`speakers`) — High-power party speakers and portable Bluetooth speakers (4 Items)
4. **Computers** (`computers`) — Apple MacBooks and Windows laptops (8 Items)
5. **Phones** (`phones`) — Flagship Apple iPhones (4 Items)
6. **Gaming** (`gaming`) — Sony PlayStation 5 consoles & controllers (4 Items)

### "Rent by Moment" Tiles:
1. **Create something** — DSLR cameras & lenses (`create-something`)
2. **Work and study** — Laptops & MacBooks (`work-and-study`)
3. **Party and play** — Speakers and PS5 with controllers for game nights and parties (`party-and-play`)
4. **Phone upgrade** — iPhones with 4K ProRes & telephoto zoom (`phone-upgrade`)

---

## 📋 Handover & Return Checklists (Tailored per Product Type)

Each product type has specialized pre-release and return inspection points:
- **iPhones**: Serial number & IMEI verified against digital reservation record, Apple ID & iCloud / Find My sign-out confirmation, Ceramic Shield glass condition, and battery health %.
- **MacBooks**: Serial number check in "About This Mac" and chassis, Activation Lock & FileVault release, Liquid Retina display dead-pixel & keyboard imprint check, battery cycle count, and MagSafe 3 charger check.
- **Laptops**: Display screen inspection (dead pixels, uniform backlighting, hinge tension), battery health diagnostics in BIOS/OS, keyboard & trackpad responsiveness, and OEM power brick verification.
- **DSLR lenses**: Optical front/rear glass element check under light (scratches, haze, fungus), metal bayonet mount and contacts, smooth zoom/focus ring operation, and lens caps/hood.
- **DSLR cameras**: Shutter actuation count logged in digital record, image sensor test frame at f/22, EVF & touchscreen display, and OEM batteries/chargers.
- **Speakers**: Subwoofer & bass clarity test at 80% volume, rechargeable wireless microphone pairing & echo check, metal grill condition, and battery/AC power cord.
- **PS5**: Console serial number verified, both DualSense wireless controllers tested for stick drift and USB-C charging, disc drive or digital edition verified, ultra-high-speed HDMI 2.1 cable and AC power cord checked, and storage initialization & console faceplate condition inspected.

---

## 💰 Scaled Security Deposits

Deposits are calibrated directly to item replacement value:
- **High-Value Gear (₹4,000 – ₹8,500 deposit)**:
  - iPhones: ₹5,000 – ₹7,500
  - MacBooks: ₹4,500 – ₹8,500
  - Laptops: ₹5,000 – ₹6,500
  - PS5: ₹6,000 – ₹7,000
  - Pro DSLR cameras & lenses: ₹4,000 – ₹7,500
- **Audio Gear (₹1,400 – ₹2,500 deposit)**:
  - Speakers: ₹1,400 – ₹2,500

---

## 🚀 Quick Run Instructions

The application is completely self-contained with modular ES6/Vanilla architecture and offline SVG assets. It requires **zero external build steps** or package installations.

### Option 1: Direct File Launch
Simply double-click [`index.html`](file:///c:/Users/Tanishq/Desktop/ONRENT/index.html) or open it in any web browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local HTTP Server via PowerShell (No Node/Python needed!)
Run the included PowerShell server script:
```powershell
.\start-server.ps1
```
This serves the application at `http://localhost:3000` automatically.

---

## 📦 File Architecture

```
c:\Users\Tanishq\Desktop\ONRENT\
├── index.html               # Main application shell with SEO tags, semantic layout & containers
├── styles.css               # Design system, CSS custom properties, responsive desktop & mobile rules
├── config.js                # Product types (7), brands (12), checklists, tax rates, duration discounts
├── seed-data.js             # 28 verified listings (4 per product type), moment tiles, demo rentals
├── app-state.js             # State management, localStorage persistence (V4), pricing engine, scaled deposit logic
├── components/              # Modular UI components & screen view renderers
│   ├── navigation.js        # Header (desktop), mobile bottom bar, location switcher modal
│   ├── home-view.js         # Hero, search bar, category chips, 4 moment tiles, "Ready near you"
│   ├── browse-view.js       # Search, 7 product type pills, brand dropdown, radius slider, sort
│   ├── product-view.js      # Product detail, image gallery, checklist preview, scaled deposit display
│   ├── checkout-view.js     # Checkout review, verification step (ID + payment check: pending/verified/review)
│   ├── tracker-view.js      # Live 7-step status timeline (Confirmed -> Refunded), milestone tracker
│   ├── handover-return.js   # Digital handover & return forms with product-type checklist & refund breakdown
│   ├── rentals-view.js      # Active & past rentals, service requests (repair, extension, exchange, support)
│   ├── list-item-view.js    # Owner listing form (7 product types dropdown) & owner management hub
│   └── profile-view.js      # User verification status, active city selector, wallet/deposit balance
├── start-server.ps1         # Simple one-click PowerShell HTTP server for local testing
└── README.md                # Comprehensive documentation, run instructions, and seed data guide
```

---

## 🛒 Complete Catalogue (28 Items — Exactly 4 per Product Type)

### 1. PS5 & Gaming Consoles (High Deposits: ₹6,000 – ₹7,000)
- Sony PlayStation 5 Standard Edition (Disc) + 2 Controllers — **₹699/day** (Deposit: ₹6,500)
- Sony PlayStation 5 Digital Edition + 2 Controllers — **₹649/day** (Deposit: ₹6,000)
- Sony PlayStation 5 Slim Standard Edition (1TB SSD) + 2 Controllers — **₹749/day** (Deposit: ₹7,000)
- Sony PlayStation 5 Digital Edition (Cosmic Red DualSense Bundle) — **₹679/day** (Deposit: ₹6,000)

### 2. Speakers (Lower Deposits: ₹1,400 – ₹2,500)
- Party Speaker with Wireless Mic (JBL PartyBox 100W) — **₹349/day** (Deposit: ₹1,800)
- Marshall Stanmore III Bluetooth Home Speaker — **₹320/day** (Deposit: ₹1,900)
- Bose SoundLink Revolve+ II 360° Speaker — **₹260/day** (Deposit: ₹1,400)
- JBL Boombox 3 Portable Bluetooth Speaker — **₹380/day** (Deposit: ₹2,500)

### 3. Laptops (Higher Deposits: ₹5,000 – ₹6,500)
- Dell Inspiron 15 Core i7 Laptop (16GB RAM / 512GB SSD) — **₹550/day** (Deposit: ₹5,000)
- ASUS ROG Zephyrus G14 Gaming Laptop (Ryzen 9 + RTX 4060) — **₹720/day** (Deposit: ₹6,500)
- Lenovo ThinkPad T14 Gen 4 Business Laptop — **₹480/day** (Deposit: ₹5,000)
- HP Envy x360 2-in-1 Touchscreen Laptop — **₹520/day** (Deposit: ₹5,000)

### 4. iPhones (Higher Deposits: ₹5,000 – ₹7,500)
- Apple iPhone 15 Pro Max (256GB - 4K ProRes) — **₹650/day** (Deposit: ₹7,500)
- Apple iPhone 15 Pro (128GB - Natural Titanium) — **₹590/day** (Deposit: ₹6,500)
- Apple iPhone 15 (128GB - Dynamic Island, Blue) — **₹450/day** (Deposit: ₹5,000)
- Apple iPhone 14 Pro (256GB - Deep Purple, 48MP) — **₹520/day** (Deposit: ₹5,500)

### 5. MacBooks (Higher Deposits: ₹4,500 – ₹8,500)
- Apple MacBook Pro 16" (M2 Max 12-Core, 38-Core GPU, 32GB RAM, 1TB) — **₹890/day** (Deposit: ₹8,500)
- Apple MacBook Pro 14 M3 Pro (18GB RAM / 512GB SSD) — **₹780/day** (Deposit: ₹7,500)
- Apple MacBook Air M2 (13.6", Midnight, 16GB RAM) — **₹580/day** (Deposit: ₹5,500)
- Apple MacBook Air M1 (13.3", Space Grey, 256GB) — **₹450/day** (Deposit: ₹4,500)

### 6. DSLR Cameras (Higher Deposits: ₹4,000 – ₹7,500)
- Canon Creator Kit (EOS R50 + Mic + Grip) — **₹499/day** (Deposit: ₹4,000)
- Nikon Z6 II Full-Frame Mirrorless DSLR — **₹750/day** (Deposit: ₹6,500)
- Canon EOS 5D Mark IV Professional DSLR Body — **₹690/day** (Deposit: ₹6,000)
- Sony Alpha A7 IV Full-Frame Camera Body — **₹820/day** (Deposit: ₹7,500)

### 7. DSLR Lenses (Higher Deposits: ₹4,000 – ₹6,000)
- Sony FE 24-70mm f/2.8 GM II G-Master Lens — **₹599/day** (Deposit: ₹5,500)
- Canon RF 70-200mm f/2.8L IS USM Telephoto Lens — **₹680/day** (Deposit: ₹6,000)
- Sigma 24-70mm f/2.8 DG DN Art Lens for Sony E — **₹420/day** (Deposit: ₹4,000)
- Nikon NIKKOR Z 50mm f/1.2 S Prime Lens — **₹480/day** (Deposit: ₹4,500)
