/* ============================================================
   TechWorld — Shared App Logic
   Runs on every page: header/footer render, cart/wishlist/auth
   state (persisted in localStorage), toasts, nav wiring.
   ============================================================ */

const Store = {
  KEYS: { cart:"tw_cart", wishlist:"tw_wishlist", user:"tw_user", orders:"tw_orders", addresses:"tw_addresses" },

  _read(key, fallback){
    try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  },
  _write(key, val){ localStorage.setItem(key, JSON.stringify(val)); },

  getCart(){ return this._read(this.KEYS.cart, []); },              // [{id, qty}]
  setCart(cart){ this._write(this.KEYS.cart, cart); updateHeaderBadges(); },
  addToCart(id, qty=1){
    const cart = this.getCart();
    const line = cart.find(l => l.id === id);
    if (line) line.qty += qty; else cart.push({ id, qty });
    this.setCart(cart);
  },
  removeFromCart(id){ this.setCart(this.getCart().filter(l => l.id !== id)); },
  updateQty(id, qty){
    const cart = this.getCart();
    const line = cart.find(l => l.id === id);
    if (!line) return;
    line.qty = Math.max(1, qty);
    this.setCart(cart);
  },
  cartCount(){ return this.getCart().reduce((sum,l)=> sum + l.qty, 0); },
  cartLines(){
    return this.getCart().map(l => ({ ...l, product: getProductById(l.id) })).filter(l => l.product);
  },
  cartSubtotal(){ return this.cartLines().reduce((sum,l)=> sum + l.product.price * l.qty, 0); },

  getWishlist(){ return this._read(this.KEYS.wishlist, []); },
  isWishlisted(id){ return this.getWishlist().includes(id); },
  toggleWishlist(id){
    let list = this.getWishlist();
    if (list.includes(id)){ list = list.filter(x=>x!==id); }
    else { list.push(id); }
    this._write(this.KEYS.wishlist, list);
    updateHeaderBadges();
    return list.includes(id);
  },

  getUser(){ return this._read(this.KEYS.user, null); },
  setUser(u){ this._write(this.KEYS.user, u); updateHeaderBadges(); },
  logout(){ localStorage.removeItem(this.KEYS.user); updateHeaderBadges(); },

  getAddresses(){ return this._read(this.KEYS.addresses, []); },
  addAddress(addr){ const list=this.getAddresses(); addr.id="addr_"+Date.now(); list.push(addr); this._write(this.KEYS.addresses, list); return addr; },

  getOrders(){ return this._read(this.KEYS.orders, []); },
  addOrder(order){ const list=this.getOrders(); list.unshift(order); this._write(this.KEYS.orders, list); return order; }
};

/* ---------------- Toasts ---------------- */
function showToast(message, opts={}){
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap){ wrap = document.createElement("div"); wrap.className="toast-wrap"; document.body.appendChild(wrap); }
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span style="width:18px;height:18px;flex-shrink:0;color:var(--tech-blue-light)">${icon(opts.icon || "checkCircle")}</span><span>${message}</span>`;
  wrap.appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; t.style.transition="opacity .3s"; setTimeout(()=>t.remove(), 300); }, 2600);
}

/* ---------------- Header / Footer ---------------- */
function currentPage(){
  return location.pathname.split("/").pop() || "index.html";
}

function renderHeader(){
  const holder = document.getElementById("header-placeholder");
  if (!holder) return;
  const page = currentPage();
  const navLink = (href, label) => `<a href="${href}" class="${page===href?'active':''}">${label}</a>`;

  holder.innerHTML = `
  <header class="site-header">
    <div class="container header-top">
      <button class="icon-btn nav-toggle" id="navToggle" aria-label="Toggle menu">${icon("menu")}</button>
      <a href="index.html" class="logo"><span class="logo-mark">TW</span>Tech<span>World</span></a>
      <form class="search-bar" id="headerSearchForm" role="search">
        <input type="text" id="headerSearchInput" placeholder="Search phones, laptops, audio, accessories..." aria-label="Search products">
        <button type="submit" aria-label="Search">${icon("search")}</button>
      </form>
      <div class="header-actions">
        <a class="icon-btn" href="account.html?tab=wishlist" aria-label="Wishlist">${icon("heart")}<span class="badge-count" id="wishlistBadge" hidden>0</span></a>
        <a class="icon-btn" href="cart.html" aria-label="Cart">${icon("cart")}<span class="badge-count" id="cartBadge" hidden>0</span></a>
        <a class="icon-btn" href="account.html" aria-label="Account">${icon("user")}</a>
      </div>
    </div>
    <div class="mobile-search">
      <form class="search-bar" id="headerSearchFormMobile" role="search">
        <input type="text" id="headerSearchInputMobile" placeholder="Search products...">
        <button type="submit" aria-label="Search">${icon("search")}</button>
      </form>
    </div>
    <nav class="main-nav" id="mainNav">
      <div class="container">
        ${navLink("index.html","Home")}
        ${navLink("products.html?category=phones","Smartphones")}
        ${navLink("products.html?category=laptops","Laptops & Tablets")}
        ${navLink("products.html?category=audio","Audio & Wearables")}
        ${navLink("products.html?category=accessories","Accessories")}
        ${navLink("products.html?deal=1","Deals")}
        ${navLink("about.html","About Us")}
        ${navLink("contact.html","Contact")}
      </div>
    </nav>
  </header>`;

  document.getElementById("navToggle").addEventListener("click", ()=>{
    document.getElementById("mainNav").classList.toggle("open");
  });
  const wireSearch = (formId, inputId) => {
    const form = document.getElementById(formId);
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const q = document.getElementById(inputId).value.trim();
      window.location.href = "products.html" + (q ? ("?q=" + encodeURIComponent(q)) : "");
    });
  };
  wireSearch("headerSearchForm","headerSearchInput");
  wireSearch("headerSearchFormMobile","headerSearchInputMobile");

  updateHeaderBadges();
}

function updateHeaderBadges(){
  const cartBadge = document.getElementById("cartBadge");
  const wishBadge = document.getElementById("wishlistBadge");
  if (cartBadge){
    const c = Store.cartCount();
    cartBadge.textContent = c;
    cartBadge.hidden = c === 0;
  }
  if (wishBadge){
    const w = Store.getWishlist().length;
    wishBadge.textContent = w;
    wishBadge.hidden = w === 0;
  }
}

function renderFooter(){
  const holder = document.getElementById("footer-placeholder");
  if (!holder) return;
  holder.innerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo"><span class="logo-mark">TW</span>Tech<span>World</span></a>
        <p>Your one-stop shop for smartphones, laptops, audio and everyday tech — curated, tested, and shipped fast.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">${icon("facebook")}</a>
          <a href="#" aria-label="Instagram">${icon("instagram")}</a>
          <a href="#" aria-label="Twitter">${icon("twitter")}</a>
          <a href="#" aria-label="LinkedIn">${icon("linkedin")}</a>
        </div>
      </div>
      <div>
        <h4>Shop</h4>
        <a href="products.html?category=phones">Smartphones</a>
        <a href="products.html?category=laptops">Laptops & Tablets</a>
        <a href="products.html?category=audio">Audio & Wearables</a>
        <a href="products.html?category=accessories">Accessories</a>
        <a href="products.html?deal=1">Today's Deals</a>
      </div>
      <div>
        <h4>Account</h4>
        <a href="account.html">My Account</a>
        <a href="account.html?tab=orders">Order Tracking</a>
        <a href="account.html?tab=wishlist">Wishlist</a>
        <a href="cart.html">Cart</a>
        <a href="login.html">Login / Register</a>
      </div>
      <div>
        <h4>Company</h4>
        <a href="about.html">About Us</a>
        <a href="contact.html">Contact Us</a>
        <a href="contact.html#faq">FAQs</a>
        <a href="contact.html">Shipping & Returns</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© 2026 TechWorld. Built for a web development internship project.</span>
      <span class="text-mono">Demo store · payments simulated</span>
    </div>
  </footer>`;
}

/* ---------------- Real product photos, with graceful fallback ----------------
   Drop a real photo into images/products/ named after the product id
   (e.g. images/products/p01.jpg) and it will be picked up automatically.
   Tries .jpg -> .jpeg -> .png -> .webp, then falls back to the icon tile
   if no photo file exists for that product. See README-IMAGES.md. */
const IMG_EXTS = ["jpg","jpeg","png","webp"];

function handleImgFallback(img){
  const idx = Number(img.dataset.fallbackIdx || 0) + 1;
  if (idx < IMG_EXTS.length){
    img.dataset.fallbackIdx = idx;
    img.src = `images/products/${img.dataset.id}.${IMG_EXTS[idx]}`;
  } else {
    img.style.display = "none"; // reveals the icon/gradient fallback beneath
  }
}

function productImageHTML(p, cls=""){
  return `<img src="images/products/${p.id}.${IMG_EXTS[0]}" data-fallback-idx="0" data-id="${p.id}" class="product-photo ${cls}" alt="${p.name}" loading="lazy" onerror="handleImgFallback(this)">`;
}

/* ---------------- Product card builder (shared by home/listing/related) ---------------- */
function productCardHTML(p){
  const wished = Store.isWishlisted(p.id);
  const badgeMap = { sale:"Sale", new:"New", best:"Bestseller" };
  const outOfStock = p.stock === 0;
  return `
  <div class="product-card" data-id="${p.id}">
    <a href="product-detail.html?id=${p.id}" class="product-media" aria-label="${p.name}">
      ${productImageHTML(p)}
      ${outOfStock ? `<span class="product-tag out">Out of stock</span>` : (p.badge ? `<span class="product-tag ${p.badge}">${badgeMap[p.badge]}</span>` : "")}
      <span class="bracket tl"></span><span class="bracket tr"></span><span class="bracket bl"></span><span class="bracket br"></span>
      ${icon(p.icon)}
    </a>
    <button class="wishlist-btn ${wished?'active':''}" data-wish="${p.id}" aria-label="Toggle wishlist">${icon("heart")}</button>
    <div class="product-info">
      <div class="product-meta spec-strip"><span>${p.brand}</span><span class="dot">·</span><span>${CATEGORIES.find(c=>c.id===p.category)?.name || p.category}</span></div>
      <a href="product-detail.html?id=${p.id}" class="product-name">${p.name}</a>
      <div class="product-rating"><span class="stars">${starRow(p.rating)}</span><span>${p.rating} (${p.reviews})</span></div>
      <div class="product-price-row">
        <span class="price">${formatCurrency(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatCurrency(p.oldPrice)}</span>` : ""}
      </div>
    </div>
    <div class="product-actions">
      <button class="btn btn-dark btn-block btn-sm" data-add="${p.id}" ${outOfStock ? "disabled" : ""}>${outOfStock ? "Out of stock" : "Add to cart"}</button>
    </div>
  </div>`;
}

function wireProductGridEvents(container){
  container.addEventListener("click", (e)=>{
    const addBtn = e.target.closest("[data-add]");
    const wishBtn = e.target.closest("[data-wish]");
    if (addBtn){
      e.preventDefault();
      Store.addToCart(addBtn.dataset.add, 1);
      const p = getProductById(addBtn.dataset.add);
      showToast(`Added <strong>${p.name}</strong> to cart`, { icon:"cart" });
    }
    if (wishBtn){
      e.preventDefault();
      const active = Store.toggleWishlist(wishBtn.dataset.wish);
      wishBtn.classList.toggle("active", active);
      showToast(active ? "Saved to wishlist" : "Removed from wishlist", { icon:"heart" });
    }
  });
}

/* ---------------- Boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
