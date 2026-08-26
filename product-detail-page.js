/* ============================================================
   TechWorld — Product Detail Logic
   ============================================================ */

function getParam(name){ return new URLSearchParams(location.search).get(name); }

function renderProductDetail(){
  const id = getParam("id");
  const p = getProductById(id) || PRODUCTS[0];

  document.getElementById("pageTitle").textContent = `${p.name} — TechWorld`;
  document.getElementById("crumb").innerHTML = `
    <a href="index.html">Home</a><span class="sep">/</span>
    <a href="products.html?category=${p.category}">${CATEGORIES.find(c=>c.id===p.category)?.name}</a><span class="sep">/</span>
    <span class="current">${p.name}</span>`;

  const stockBadge = p.stock === 0 ? `<span class="badge out-stock">Out of stock</span>`
    : p.stock <= 10 ? `<span class="badge low-stock">Only ${p.stock} left</span>`
    : `<span class="badge in-stock">In stock</span>`;

  const discount = p.oldPrice ? Math.round((1 - p.price/p.oldPrice) * 100) : 0;
  const wished = Store.isWishlisted(p.id);

  document.getElementById("pdRoot").innerHTML = `
  <div class="pd-layout">
    <div>
      <div class="pd-media">${productImageHTML(p)}${icon(p.icon)}</div>
      <div class="pd-thumbs">
        ${[p.icon, "shield", "box"].map((ic,i)=>`<div class="pd-thumb ${i===0?'active':''}">${icon(ic)}</div>`).join("")}
      </div>
    </div>
    <div>
      <div class="spec-strip"><span>${p.brand}</span><span class="dot">·</span><span>SKU-${p.id.toUpperCase()}</span></div>
      <h1 class="pd-title">${p.name}</h1>
      <div class="product-rating"><span class="stars">${starRow(p.rating)}</span><span>${p.rating} · ${p.reviews} reviews</span></div>
      <div class="pd-price-row">
        <span class="pd-price">${formatCurrency(p.price)}</span>
        ${p.oldPrice ? `<span class="pd-price-old">${formatCurrency(p.oldPrice)}</span><span class="pd-save">Save ${discount}%</span>` : ""}
      </div>
      <div>${stockBadge}</div>
      <p style="margin-top:16px;">${p.short}</p>

      <div class="form-group" style="max-width:160px; margin-top:20px;">
        <label>Quantity</label>
        <div class="qty-control">
          <button type="button" id="qtyMinus">${icon("minus")}</button>
          <input type="number" id="qtyInput" value="1" min="1" max="${Math.max(p.stock,1)}">
          <button type="button" id="qtyPlus">${icon("plus")}</button>
        </div>
      </div>

      <div class="pd-actions">
        <button class="btn btn-primary" id="addToCartBtn" ${p.stock===0?"disabled":""}>${icon("cart")} Add to cart</button>
        <button class="btn btn-outline" id="buyNowBtn" ${p.stock===0?"disabled":""}>Buy now</button>
        <button class="btn btn-ghost" id="wishBtn" style="color:${wished?'var(--danger)':'var(--navy)'}">${icon("heart")} ${wished?'Saved':'Save'}</button>
      </div>

      <div class="pd-trust">
        <div>${icon("truck")} Free delivery in 2–4 days</div>
        <div>${icon("shield")} 1-year warranty</div>
        <div>${icon("lock")} Secure payment</div>
      </div>
    </div>
  </div>`;

  document.getElementById("tab-desc").innerHTML = `
    <p>${p.short} Designed for everyday reliability, the ${p.name} pairs thoughtful engineering with the specs that matter most — performance, battery life, and build quality.</p>
    <p>Every unit ships with a 1-year TechWorld warranty and our 7-day hassle-free return policy. Need help deciding? Our support team is one message away on the <a href="contact.html" style="color:var(--tech-blue)">Contact page</a>.</p>`;

  document.getElementById("specTable").innerHTML = Object.entries(p.specs).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");

  renderReviews(p);
  renderRelated(p);
  wireDetailEvents(p);
}

function renderReviews(p){
  const reviews = getReviewsFor(p.id);
  document.getElementById("ratingSummary").innerHTML = `
    <div class="rating-big">${p.rating}</div>
    <div>
      <div class="stars" style="font-size:1.1rem">${starRow(p.rating)}</div>
      <div class="small" style="color:var(--ink-soft)">Based on ${p.reviews} verified reviews</div>
    </div>`;
  document.getElementById("reviewList").innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${r.name.split(" ").map(n=>n[0]).join("")}</div>
        <div>
          <div style="font-weight:600; color:var(--navy); font-size:.9rem;">${r.name}</div>
          <div class="stars" style="font-size:.8rem;">${starRow(r.rating)}</div>
        </div>
      </div>
      <p style="margin:0;">${r.text}</p>
    </div>`).join("");
}

function renderRelated(p){
  const related = getRelatedProducts(p, 4);
  const grid = document.getElementById("relatedGrid");
  grid.innerHTML = related.map(productCardHTML).join("");
  wireProductGridEvents(grid);
}

function wireDetailEvents(p){
  document.getElementById("pdTabs").addEventListener("click", (e)=>{
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active", b===btn));
    document.querySelectorAll(".tab-panel").forEach(panel=>panel.classList.toggle("active", panel.id === "tab-"+btn.dataset.tab));
  });

  const qtyInput = document.getElementById("qtyInput");
  document.getElementById("qtyMinus").addEventListener("click", ()=> qtyInput.value = Math.max(1, Number(qtyInput.value)-1));
  document.getElementById("qtyPlus").addEventListener("click", ()=> qtyInput.value = Math.min(Number(qtyInput.max)||99, Number(qtyInput.value)+1));

  document.getElementById("addToCartBtn").addEventListener("click", ()=>{
    Store.addToCart(p.id, Number(qtyInput.value) || 1);
    showToast(`Added <strong>${p.name}</strong> to cart`, { icon:"cart" });
  });

  document.getElementById("buyNowBtn").addEventListener("click", ()=>{
    Store.addToCart(p.id, Number(qtyInput.value) || 1);
    window.location.href = "checkout.html";
  });

  document.getElementById("wishBtn").addEventListener("click", (e)=>{
    const active = Store.toggleWishlist(p.id);
    e.currentTarget.style.color = active ? "var(--danger)" : "var(--navy)";
    e.currentTarget.innerHTML = `${icon("heart")} ${active ? "Saved" : "Save"}`;
    showToast(active ? "Saved to wishlist" : "Removed from wishlist", { icon:"heart" });
  });
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
