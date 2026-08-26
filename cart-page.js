/* ============================================================
   TechWorld — Cart Page Logic
   ============================================================ */

const SHIP_THRESHOLD = 2000;
const SHIP_COST = 149;
const TAX_RATE = 0.18;

function renderCart(){
  const lines = Store.cartLines();
  const root = document.getElementById("cartContent");

  if (lines.length === 0){
    root.innerHTML = `
      <div class="empty-state">
        <div style="width:64px;height:64px;color:var(--line);margin:0 auto 18px;">${icon("cart")}</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn btn-primary">Start shopping</a>
      </div>`;
    return;
  }

  const subtotal = Store.cartSubtotal();
  const shipping = subtotal >= SHIP_THRESHOLD ? 0 : SHIP_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  root.innerHTML = `
  <div class="cart-layout">
    <div class="card-panel" id="cartItems">
      ${lines.map(l => `
        <div class="cart-item" data-id="${l.product.id}">
          <div class="cart-item-media">${productImageHTML(l.product)}${icon(l.product.icon)}</div>
          <div>
            <h4><a href="product-detail.html?id=${l.product.id}" style="color:var(--navy)">${l.product.name}</a></h4>
            <div class="spec-strip"><span>${l.product.brand}</span></div>
            <button class="cart-item-remove" data-remove="${l.product.id}">${icon("trash")} Remove</button>
          </div>
          <div class="qty-control">
            <button data-minus="${l.product.id}">${icon("minus")}</button>
            <input type="number" min="1" max="${l.product.stock}" value="${l.qty}" data-qty="${l.product.id}">
            <button data-plus="${l.product.id}">${icon("plus")}</button>
          </div>
          <div class="cart-item-price">${formatCurrency(l.product.price * l.qty)}</div>
        </div>`).join("")}
      <div style="padding-top:16px;">
        <a href="products.html" class="btn btn-ghost btn-sm">← Continue shopping</a>
      </div>
    </div>

    <div class="card-panel">
      <h3>Order summary</h3>
      <div class="summary-row"><span>Subtotal (${lines.reduce((s,l)=>s+l.qty,0)} items)</span><span>${formatCurrency(subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping===0 ? "FREE" : formatCurrency(shipping)}</span></div>
      <div class="summary-row"><span>Estimated tax (18%)</span><span>${formatCurrency(tax)}</span></div>
      ${subtotal < SHIP_THRESHOLD ? `<p class="small" style="color:var(--tech-blue)">Add ${formatCurrency(SHIP_THRESHOLD-subtotal)} more for free shipping</p>` : ""}
      <div class="summary-row total"><span>Total</span><span>${formatCurrency(total)}</span></div>
      <div class="promo-row">
        <input type="text" placeholder="Promo code" id="promoInput" style="flex:1; padding:11px 12px; border:1.5px solid var(--line); border-radius:6px;">
        <button class="btn btn-outline btn-sm" id="promoBtn">Apply</button>
      </div>
      <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:20px;">Proceed to checkout</a>
      <div class="pd-trust" style="border:none; margin-top:16px; padding-top:0;">
        <div>${icon("lock")} Secure checkout</div>
      </div>
    </div>
  </div>`;

  wireCartEvents();
}

function wireCartEvents(){
  const root = document.getElementById("cartItems");
  root.addEventListener("click", (e)=>{
    const minus = e.target.closest("[data-minus]");
    const plus = e.target.closest("[data-plus]");
    const remove = e.target.closest("[data-remove]");
    if (minus){
      const id = minus.dataset.minus;
      const line = Store.getCart().find(l=>l.id===id);
      if (line.qty <= 1){ Store.removeFromCart(id); } else { Store.updateQty(id, line.qty-1); }
      renderCart();
    }
    if (plus){
      const id = plus.dataset.plus;
      const line = Store.getCart().find(l=>l.id===id);
      Store.updateQty(id, line.qty+1);
      renderCart();
    }
    if (remove){
      Store.removeFromCart(remove.dataset.remove);
      showToast("Item removed from cart", { icon:"trash" });
      renderCart();
    }
  });
  root.addEventListener("change", (e)=>{
    if (e.target.dataset.qty){
      const val = Math.max(1, Number(e.target.value) || 1);
      Store.updateQty(e.target.dataset.qty, val);
      renderCart();
    }
  });

  const promoBtn = document.getElementById("promoBtn");
  if (promoBtn){
    promoBtn.addEventListener("click", ()=>{
      const val = document.getElementById("promoInput").value.trim();
      if (val) showToast("Promo code not recognized (demo store)", { icon:"close" });
    });
  }
}

document.addEventListener("DOMContentLoaded", renderCart);
