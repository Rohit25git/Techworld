/* ============================================================
   TechWorld — Product Listing Logic
   ============================================================ */

const state = {
  categories: new Set(),
  brands: new Set(),
  minPrice: null,
  maxPrice: null,
  minRating: 0,
  q: "",
  deal: false,
  sort: "relevance"
};

function readURLParams(){
  const params = new URLSearchParams(location.search);
  if (params.get("category")) state.categories.add(params.get("category"));
  if (params.get("brand")) state.brands.add(params.get("brand"));
  if (params.get("q")) state.q = params.get("q");
  if (params.get("deal")) state.deal = true;
}

function renderFilterOptions(){
  document.getElementById("categoryFilters").innerHTML = CATEGORIES.map(c => `
    <label class="filter-option">
      <input type="checkbox" value="${c.id}" data-filter="category" ${state.categories.has(c.id)?"checked":""}>
      ${c.name}
    </label>`).join("");

  document.getElementById("brandFilters").innerHTML = BRANDS.map(b => `
    <label class="filter-option">
      <input type="checkbox" value="${b}" data-filter="brand" ${state.brands.has(b)?"checked":""}>
      ${b}
    </label>`).join("");

  document.getElementById("ratingFilters").innerHTML = [4,3,2,1].map(r => `
    <label class="filter-option">
      <input type="radio" name="rating" value="${r}" data-filter="rating" ${state.minRating===r?"checked":""}>
      ${"★".repeat(r)}${"☆".repeat(5-r)} & up
    </label>`).join("") + `
    <label class="filter-option">
      <input type="radio" name="rating" value="0" data-filter="rating" ${state.minRating===0?"checked":""}>
      Any rating
    </label>`;

  document.getElementById("minPrice").value = state.minPrice ?? "";
  document.getElementById("maxPrice").value = state.maxPrice ?? "";
}

function matchesFilters(p){
  if (state.categories.size && !state.categories.has(p.category)) return false;
  if (state.brands.size && !state.brands.has(p.brand)) return false;
  if (state.minPrice != null && p.price < state.minPrice) return false;
  if (state.maxPrice != null && p.price > state.maxPrice) return false;
  if (state.minRating && p.rating < state.minRating) return false;
  if (state.deal && !p.oldPrice) return false;
  if (state.q){
    const q = state.q.toLowerCase();
    const hay = (p.name + " " + p.brand + " " + p.short).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function sortProducts(list){
  const arr = [...list];
  switch(state.sort){
    case "price-asc": arr.sort((a,b)=>a.price-b.price); break;
    case "price-desc": arr.sort((a,b)=>b.price-a.price); break;
    case "rating": arr.sort((a,b)=>b.rating-a.rating); break;
    case "newest": arr.sort((a,b)=> (b.badge==="new")-(a.badge==="new")); break;
    default: break; // relevance = catalog order
  }
  return arr;
}

function renderActiveChips(){
  const chips = [];
  state.categories.forEach(c => chips.push({ label: CATEGORIES.find(x=>x.id===c)?.name || c, clear: ()=>state.categories.delete(c) }));
  state.brands.forEach(b => chips.push({ label: b, clear: ()=>state.brands.delete(b) }));
  if (state.minRating) chips.push({ label: state.minRating+"★ & up", clear: ()=> state.minRating=0 });
  if (state.minPrice != null || state.maxPrice != null){
    chips.push({ label: `${state.minPrice ?? 0} – ${state.maxPrice ?? "∞"}`, clear: ()=>{ state.minPrice=null; state.maxPrice=null; } });
  }
  if (state.deal) chips.push({ label: "Deals only", clear: ()=> state.deal=false });
  if (state.q) chips.push({ label: `"${state.q}"`, clear: ()=> state.q="" });

  const holder = document.getElementById("activeFilters");
  holder.innerHTML = chips.map((c,i) => `<span class="filter-chip">${c.label}<button data-chip="${i}">${icon("close")}</button></span>`).join("");
  holder.querySelectorAll("[data-chip]").forEach(btn => {
    btn.addEventListener("click", ()=>{
      chips[Number(btn.dataset.chip)].clear();
      render();
    });
  });
}

function render(){
  renderFilterOptions();
  renderActiveChips();

  let list = PRODUCTS.filter(matchesFilters);
  list = sortProducts(list);

  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  document.getElementById("resultCount").textContent = `Showing ${list.length} product${list.length===1?"":"s"}`;

  if (list.length === 0){
    grid.innerHTML = "";
    grid.style.display = "none";
    empty.style.display = "block";
    document.getElementById("emptyIcon").innerHTML = icon("box");
  } else {
    grid.style.display = "grid";
    empty.style.display = "none";
    grid.innerHTML = list.map(productCardHTML).join("");
    wireProductGridEvents(grid);
  }

  // breadcrumb label
  let label = "Shop";
  if (state.categories.size === 1){
    const id = [...state.categories][0];
    label = CATEGORIES.find(c=>c.id===id)?.name || "Shop";
  } else if (state.deal){
    label = "Today's Deals";
  } else if (state.q){
    label = `Results for "${state.q}"`;
  }
  document.getElementById("crumbLabel").textContent = label;
  document.title = label + " — TechWorld";
}

function wireEvents(){
  document.body.addEventListener("change", (e)=>{
    const t = e.target;
    if (t.dataset.filter === "category"){
      t.checked ? state.categories.add(t.value) : state.categories.delete(t.value);
      render();
    }
    if (t.dataset.filter === "brand"){
      t.checked ? state.brands.add(t.value) : state.brands.delete(t.value);
      render();
    }
    if (t.dataset.filter === "rating"){
      state.minRating = Number(t.value);
      render();
    }
  });

  document.getElementById("applyPrice").addEventListener("click", ()=>{
    const min = document.getElementById("minPrice").value;
    const max = document.getElementById("maxPrice").value;
    state.minPrice = min !== "" ? Number(min) : null;
    state.maxPrice = max !== "" ? Number(max) : null;
    render();
  });

  document.getElementById("sortSelect").addEventListener("change", (e)=>{
    state.sort = e.target.value;
    render();
  });

  document.getElementById("clearFilters").addEventListener("click", clearAll);
  document.getElementById("emptyClear").addEventListener("click", clearAll);

  function clearAll(){
    state.categories.clear(); state.brands.clear();
    state.minPrice=null; state.maxPrice=null; state.minRating=0;
    state.deal=false; state.q="";
    render();
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  readURLParams();
  wireEvents();
  render();
});
