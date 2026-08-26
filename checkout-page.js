/* ============================================================
   TechWorld — Checkout Logic (fully simulated, no real payment)
   ============================================================ */

let checkoutLines = [];
let shippingAddress = null;

function renderSummary(){
  const subtotal = checkoutLines.reduce((s,l)=> s + l.product.price*l.qty, 0);
  const shipping = subtotal >= SHIP_THRESHOLD_CO ? 0 : 149;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  document.getElementById("summaryItems").innerHTML = checkoutLines.map(l => `
    <div class="co-summary-item">
      <div class="sm-media">${productImageHTML(l.product)}${icon(l.product.icon)}</div>
      <div class="sm-name">${l.product.name} <span class="text-mono" style="color:var(--ink-soft)">×${l.qty}</span></div>
      <div class="text-mono">${formatCurrency(l.product.price*l.qty)}</div>
    </div>`).join("");

  document.getElementById("summaryTotals").innerHTML = `
    <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping===0?"FREE":formatCurrency(shipping)}</span></div>
    <div class="summary-row"><span>Tax (18%)</span><span>${formatCurrency(tax)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatCurrency(total)}</span></div>`;

  return { subtotal, shipping, tax, total };
}
const SHIP_THRESHOLD_CO = 2000;

function wireShippingForm(){
  document.getElementById("shippingForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    shippingAddress = {
      name: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      line1: document.getElementById("addr1").value,
      city: document.getElementById("city").value,
      state: document.getElementById("stateField").value,
      pincode: document.getElementById("pincode").value,
      type: document.getElementById("addrType").value
    };
    document.getElementById("paymentSection").classList.remove("disabled");
    document.getElementById("stepShippingTab").classList.remove("active");
    document.getElementById("stepShippingTab").classList.add("done");
    document.getElementById("stepPaymentTab").classList.add("active");
    document.getElementById("paymentSection").scrollIntoView({ behavior:"smooth", block:"center" });
    showToast("Address saved");
  });
}

function wirePaymentOptions(){
  document.querySelectorAll(".pay-option").forEach(opt => {
    opt.addEventListener("click", ()=>{
      document.querySelectorAll(".pay-option").forEach(o=>o.classList.remove("selected"));
      opt.classList.add("selected");
      opt.querySelector("input").checked = true;
      document.getElementById("cardFields").style.display = opt.dataset.pay === "card" ? "block" : "none";
      document.getElementById("upiFields").style.display = opt.dataset.pay === "upi" ? "block" : "none";
    });
  });

  const cardNumber = document.getElementById("cardNumber");
  cardNumber.addEventListener("input", ()=>{
    let digits = cardNumber.value.replace(/\D/g,"").slice(0,16);
    cardNumber.value = digits.replace(/(.{4})/g,"$1 ").trim();
  });
  const cardExpiry = document.getElementById("cardExpiry");
  cardExpiry.addEventListener("input", ()=>{
    let digits = cardExpiry.value.replace(/\D/g,"").slice(0,4);
    cardExpiry.value = digits.length > 2 ? digits.slice(0,2) + "/" + digits.slice(2) : digits;
  });
}

function validatePayment(method){
  if (method === "card"){
    const num = document.getElementById("cardNumber").value.replace(/\s/g,"");
    const exp = document.getElementById("cardExpiry").value;
    const cvv = document.getElementById("cardCvv").value;
    if (num.length < 16 || exp.length < 4 || cvv.length < 3){
      showToast("Please complete all card details", { icon:"close" });
      return false;
    }
  }
  if (method === "upi"){
    const upi = document.getElementById("upiId").value;
    if (!upi.includes("@")){
      showToast("Please enter a valid UPI ID", { icon:"close" });
      return false;
    }
  }
  return true;
}

function wirePlaceOrder(){
  document.getElementById("placeOrderBtn").addEventListener("click", ()=>{
    const method = document.querySelector('input[name="payMethod"]:checked');
    if (!method){ showToast("Select a payment method", { icon:"close" }); return; }
    if (!validatePayment(method.value)) return;

    const btn = document.getElementById("placeOrderBtn");
    btn.disabled = true;
    btn.textContent = "Processing payment…";

    setTimeout(()=>{
      const totals = renderSummary();
      const order = {
        id: "TW" + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        items: checkoutLines.map(l => ({ id:l.product.id, name:l.product.name, qty:l.qty, price:l.product.price, icon:l.product.icon })),
        address: shippingAddress,
        payment: { method: method.value },
        totals,
        stage: Math.floor(Math.random()*2) // 0 = Placed, 1 = Confirmed (simulated starting point)
      };
      Store.addOrder(order);
      Store.setCart([]);
      renderConfirmation(order);
      btn.disabled = false;
    }, 1400);
  });
}

function renderConfirmation(order){
  document.getElementById("stepPaymentTab").classList.remove("active");
  document.getElementById("stepPaymentTab").classList.add("done");
  document.getElementById("stepConfirmTab").classList.add("active");

  document.getElementById("shippingSection").style.display = "none";
  document.getElementById("paymentSection").style.display = "none";
  document.getElementById("orderSummaryPanel").style.display = "none";

  const stages = ["Placed","Confirmed","Shipped","Out for delivery","Delivered"];
  const confirm = document.getElementById("confirmSection");
  confirm.style.display = "block";
  confirm.innerHTML = `
    <div class="confirm-panel">
      ${icon("checkCircle")}
      <h2>Order placed successfully!</h2>
      <p>Order <strong class="text-mono">${order.id}</strong> · Paying by ${order.payment.method === "card" ? "Card" : order.payment.method === "upi" ? "UPI" : "Cash on Delivery"}</p>
      <p class="small">A confirmation has been "sent" to your account. Track progress anytime from My Account → Orders.</p>
      <div class="track-line">
        ${stages.map((s,i)=>`
          <div class="track-step ${i<=order.stage ? 'done' : ''}">
            <span class="dot">${i<=order.stage ? '✓' : i+1}</span>${s}
          </div>`).join("")}
      </div>
      <div style="display:flex; gap:12px; justify-content:center; margin-top:32px; flex-wrap:wrap;">
        <a href="account.html?tab=orders" class="btn btn-dark">View my orders</a>
        <a href="products.html" class="btn btn-outline">Continue shopping</a>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", ()=>{
  checkoutLines = Store.cartLines();
  if (checkoutLines.length === 0){
    document.getElementById("checkoutEmpty").style.display = "block";
    document.getElementById("checkoutFlow").style.display = "none";
    return;
  }
  renderSummary();
  wireShippingForm();
  wirePaymentOptions();
  wirePlaceOrder();
});
