/* ============================================================
   TechWorld — Account Page Logic
   ============================================================ */

const ORDER_STAGES = ["Placed","Confirmed","Shipped","Out for delivery","Delivered"];

function renderProfile(){
  const u = Store.getUser();
  document.getElementById("panel-profile").innerHTML = `
    <div class="card-panel">
      <div style="display:flex; align-items:center; gap:18px; margin-bottom:24px;">
        <div class="profile-avatar">${u.name.slice(0,2).toUpperCase()}</div>
        <div>
          <h3 style="margin:0;">${u.name}</h3>
          <p style="margin:0;" class="small">Member since ${new Date(u.joined).toLocaleDateString("en-IN", { year:"numeric", month:"long" })}</p>
        </div>
      </div>
      <form id="profileForm">
        <div class="form-row">
          <div class="form-group"><label>Full name</label><input type="text" id="pfName" value="${u.name}"></div>
          <div class="form-group"><label>Email</label><input type="email" id="pfEmail" value="${u.email}"></div>
        </div>
        <div class="form-group"><label>Phone</label><input type="tel" id="pfPhone" value="${u.phone||''}" placeholder="Add a phone number"></div>
        <button class="btn btn-primary" type="submit">Save changes</button>
      </form>
    </div>`;

  document.getElementById("profileForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    Store.setUser({ ...u, name: document.getElementById("pfName").value, email: document.getElementById("pfEmail").value, phone: document.getElementById("pfPhone").value });
    showToast("Profile updated");
    renderProfile();
  });
}

function renderOrders(){
  const orders = Store.getOrders();
  const panel = document.getElementById("panel-orders");
  if (orders.length === 0){
    panel.innerHTML = `<div class="empty-state"><h3>No orders yet</h3><p>Your order history and tracking will show up here.</p><a href="products.html" class="btn btn-primary">Start shopping</a></div>`;
    return;
  }
  panel.innerHTML = orders.map(o => `
    <div class="order-card" data-order="${o.id}">
      <div class="order-head">
        <div>
          <div class="text-mono" style="font-weight:700; color:var(--navy);">Order ${o.id}</div>
          <div class="small">${new Date(o.date).toLocaleDateString("en-IN", { year:"numeric", month:"short", day:"numeric" })} · ${o.items.reduce((s,i)=>s+i.qty,0)} items · ${formatCurrency(o.totals.total)}</div>
        </div>
        <span class="badge in-stock">${ORDER_STAGES[o.stage]}</span>
      </div>
      <div>
        ${o.items.map(i => `<div class="co-summary-item"><div class="sm-media">${productImageHTML({id:i.id, name:i.name})}${icon(i.icon)}</div><div class="sm-name">${i.name} <span class="text-mono" style="color:var(--ink-soft)">×${i.qty}</span></div><div class="text-mono">${formatCurrency(i.price*i.qty)}</div></div>`).join("")}
      </div>
      <div class="order-track">
        ${ORDER_STAGES.map((s,i)=>`<div class="ostep ${i<=o.stage?'done':''}"><span class="dot">${i<=o.stage?'✓':i+1}</span>${s}</div>`).join("")}
      </div>
      ${o.stage < ORDER_STAGES.length-1 ? `<button class="btn btn-outline btn-sm" data-advance="${o.id}" style="margin-top:16px;">Simulate next update</button>` : `<p class="small" style="margin-top:14px; color:var(--success);">Delivered — enjoy your new gear!</p>`}
    </div>`).join("");

  panel.addEventListener("click", function handler(e){
    const btn = e.target.closest("[data-advance]");
    if (!btn) return;
    const orders = Store.getOrders();
    const order = orders.find(o => o.id === btn.dataset.advance);
    order.stage = Math.min(ORDER_STAGES.length-1, order.stage+1);
    Store._write(Store.KEYS.orders, orders);
    showToast(`Order ${order.id} is now "${ORDER_STAGES[order.stage]}"`, { icon:"truck" });
    renderOrders();
  }, { once:true });
}

function renderAddresses(){
  const panel = document.getElementById("panel-addresses");
  const addresses = Store.getAddresses();
  panel.innerHTML = `
    <div class="card-panel">
      <h3>Saved addresses</h3>
      <div id="addrList">
        ${addresses.length === 0 ? `<p class="small">No saved addresses yet.</p>` : addresses.map(a => `
          <div class="addr-card">
            <strong>${a.label}</strong> <span class="badge in-stock" style="margin-left:6px;">${a.type}</span>
            <p style="margin:6px 0 0;">${a.line1}, ${a.city}, ${a.state} – ${a.pincode}</p>
            <p class="small" style="margin:2px 0 0;">${a.phone}</p>
          </div>`).join("")}
      </div>
      <div class="divider"></div>
      <h3>Add new address</h3>
      <form id="addrForm">
        <div class="form-row">
          <div class="form-group"><label>Label</label><input type="text" id="addrLabel" placeholder="e.g. Home, Office" required></div>
          <div class="form-group"><label>Phone</label><input type="tel" id="addrPhone" required></div>
        </div>
        <div class="form-group"><label>Address line</label><input type="text" id="addrLine1" required></div>
        <div class="form-row">
          <div class="form-group"><label>City</label><input type="text" id="addrCity" required></div>
          <div class="form-group"><label>State</label><input type="text" id="addrState" required></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>PIN code</label><input type="text" id="addrPincode" required></div>
          <div class="form-group"><label>Type</label><select id="addrTypeSel"><option>Home</option><option>Work</option><option>Other</option></select></div>
        </div>
        <button class="btn btn-primary" type="submit">Save address</button>
      </form>
    </div>`;

  document.getElementById("addrForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    Store.addAddress({
      label: document.getElementById("addrLabel").value,
      phone: document.getElementById("addrPhone").value,
      line1: document.getElementById("addrLine1").value,
      city: document.getElementById("addrCity").value,
      state: document.getElementById("addrState").value,
      pincode: document.getElementById("addrPincode").value,
      type: document.getElementById("addrTypeSel").value
    });
    showToast("Address saved");
    renderAddresses();
  });
}

function renderWishlist(){
  const panel = document.getElementById("panel-wishlist");
  const ids = Store.getWishlist();
  const products = ids.map(getProductById).filter(Boolean);
  if (products.length === 0){
    panel.innerHTML = `<div class="empty-state"><h3>Your wishlist is empty</h3><p>Tap the heart icon on any product to save it here.</p><a href="products.html" class="btn btn-primary">Browse products</a></div>`;
    return;
  }
  panel.innerHTML = `<div class="product-grid">${products.map(productCardHTML).join("")}</div>`;
  wireProductGridEvents(panel);
}

function switchTab(tab){
  document.querySelectorAll(".acc-side [data-tab]").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "panel-"+tab));
  if (tab === "profile") renderProfile();
  if (tab === "orders") renderOrders();
  if (tab === "addresses") renderAddresses();
  if (tab === "wishlist") renderWishlist();
}

document.addEventListener("DOMContentLoaded", ()=>{
  const user = Store.getUser();
  if (!user){
    document.getElementById("loginGate").style.display = "block";
    document.getElementById("gateIcon").innerHTML = icon("user");
    return;
  }
  document.getElementById("accContent").style.display = "grid";

  document.querySelectorAll(".acc-side [data-tab]").forEach(btn => {
    btn.addEventListener("click", ()=> switchTab(btn.dataset.tab));
  });
  document.getElementById("logoutBtn").addEventListener("click", ()=>{
    Store.logout();
    showToast("Logged out");
    setTimeout(()=> window.location.href = "index.html", 500);
  });

  const initialTab = new URLSearchParams(location.search).get("tab") || "profile";
  switchTab(["profile","orders","addresses","wishlist"].includes(initialTab) ? initialTab : "profile");
});
