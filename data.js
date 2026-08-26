/* ============================================================
   TechWorld — Product Catalog (demo data)
   ============================================================ */

const CATEGORIES = [
  { id: "phones",       name: "Smartphones",      icon: "phone",  desc: "iPhone, Galaxy, Pixel & more" },
  { id: "laptops",      name: "Laptops & Tablets", icon: "laptop", desc: "MacBook, XPS, Spectre, iPad" },
  { id: "audio",        name: "Audio & Wearables", icon: "headphones", desc: "Headphones, watches, speakers" },
  { id: "accessories",  name: "Accessories",       icon: "plug",   desc: "Chargers, cases, adapters" }
];

const PRODUCTS = [
  // ---------------- Smartphones ----------------
  { id:"p01", name:"iPhone 16 Pro", brand:"Apple", category:"phones", price:112900, oldPrice:119900, rating:4.8, reviews:342, stock:18, badge:"best", icon:"phone",
    short:"6.3\" Super Retina XDR, A18 Pro chip, titanium frame.",
    specs:{ Display:"6.3\" OLED 120Hz", Chip:"A18 Pro", Storage:"256GB", Camera:"48MP Triple", Battery:"Up to 27h video", Color:"Natural Titanium" } },
  { id:"p02", name:"iPhone 16", brand:"Apple", category:"phones", price:79900, oldPrice:null, rating:4.7, reviews:511, stock:24, badge:"new", icon:"phone",
    short:"6.1\" display with A18 chip and all-day battery life.",
    specs:{ Display:"6.1\" OLED 60Hz", Chip:"A18", Storage:"128GB", Camera:"48MP Dual", Battery:"Up to 22h video", Color:"Ultramarine" } },
  { id:"p03", name:"Samsung Galaxy S25 Ultra", brand:"Samsung", category:"phones", price:129999, oldPrice:139999, rating:4.7, reviews:266, stock:12, badge:"sale", icon:"phone",
    short:"200MP camera, S Pen included, Snapdragon 8 Gen 4.",
    specs:{ Display:"6.9\" AMOLED 120Hz", Chip:"Snapdragon 8 Gen 4", Storage:"512GB", Camera:"200MP Quad", Battery:"5000mAh", Color:"Titanium Black" } },
  { id:"p04", name:"Samsung Galaxy A56", brand:"Samsung", category:"phones", price:32999, oldPrice:null, rating:4.3, reviews:189, stock:40, badge:null, icon:"phone",
    short:"Mid-range all-rounder with a bright AMOLED display.",
    specs:{ Display:"6.5\" AMOLED 90Hz", Chip:"Exynos 1480", Storage:"128GB", Camera:"50MP Triple", Battery:"5000mAh", Color:"Awesome Graphite" } },
  { id:"p05", name:"Google Pixel 9 Pro", brand:"Google", category:"phones", price:99900, oldPrice:null, rating:4.6, reviews:154, stock:15, badge:"new", icon:"phone",
    short:"Pure Android with best-in-class computational photography.",
    specs:{ Display:"6.3\" LTPO OLED 120Hz", Chip:"Tensor G4", Storage:"256GB", Camera:"50MP Triple", Battery:"5060mAh", Color:"Obsidian" } },
  { id:"p06", name:"Google Pixel 9a", brand:"Google", category:"phones", price:49900, oldPrice:54900, rating:4.4, reviews:97, stock:30, badge:"sale", icon:"phone",
    short:"Flagship Pixel camera at a mid-range price.",
    specs:{ Display:"6.1\" OLED 90Hz", Chip:"Tensor G4", Storage:"128GB", Camera:"48MP Dual", Battery:"4700mAh", Color:"Porcelain" } },
  { id:"p07", name:"OnePlus 13", brand:"OnePlus", category:"phones", price:69999, oldPrice:null, rating:4.5, reviews:203, stock:22, badge:null, icon:"phone",
    short:"Snapdragon flagship with 100W fast charging.",
    specs:{ Display:"6.82\" AMOLED 120Hz", Chip:"Snapdragon 8 Elite", Storage:"256GB", Camera:"50MP Triple", Battery:"6000mAh", Color:"Midnight Ocean" } },
  { id:"p08", name:"OnePlus Nord 5", brand:"OnePlus", category:"phones", price:29999, oldPrice:33999, rating:4.2, reviews:88, stock:36, badge:"sale", icon:"phone",
    short:"Balanced mid-ranger with a smooth 120Hz display.",
    specs:{ Display:"6.7\" AMOLED 120Hz", Chip:"Snapdragon 7 Gen 4", Storage:"128GB", Camera:"50MP Dual", Battery:"5500mAh", Color:"Marble Grey" } },
  { id:"p09", name:"Xiaomi 15", brand:"Xiaomi", category:"phones", price:64999, oldPrice:null, rating:4.4, reviews:132, stock:20, badge:null, icon:"phone",
    short:"Leica-tuned optics in a compact flagship body.",
    specs:{ Display:"6.36\" AMOLED 120Hz", Chip:"Snapdragon 8 Elite", Storage:"256GB", Camera:"50MP Triple (Leica)", Battery:"5400mAh", Color:"Black" } },
  { id:"p10", name:"Xiaomi Redmi Note 14 Pro", brand:"Xiaomi", category:"phones", price:21999, oldPrice:24999, rating:4.1, reviews:76, stock:44, badge:"sale", icon:"phone",
    short:"Great value display and camera for everyday use.",
    specs:{ Display:"6.67\" AMOLED 120Hz", Chip:"Dimensity 7300", Storage:"128GB", Camera:"200MP Main", Battery:"5000mAh", Color:"Lavender Purple" } },

  // ---------------- Laptops & Tablets ----------------
  { id:"l01", name:"MacBook Pro 14\" M4", brand:"MacBook", category:"laptops", price:199900, oldPrice:null, rating:4.9, reviews:210, stock:9, badge:"best", icon:"laptop",
    short:"M4 Pro chip with Liquid Retina XDR for pro workflows.",
    specs:{ Display:"14.2\" Liquid Retina XDR", Chip:"Apple M4 Pro", RAM:"18GB", Storage:"512GB SSD", Battery:"Up to 18h", Weight:"1.55kg" } },
  { id:"l02", name:"MacBook Air 13\" M3", brand:"MacBook", category:"laptops", price:114900, oldPrice:124900, rating:4.8, reviews:388, stock:17, badge:"sale", icon:"laptop",
    short:"Fanless, ultralight, all-day battery.",
    specs:{ Display:"13.6\" Liquid Retina", Chip:"Apple M3", RAM:"8GB", Storage:"256GB SSD", Battery:"Up to 18h", Weight:"1.24kg" } },
  { id:"l03", name:"Dell XPS 14", brand:"Dell XPS", category:"laptops", price:154900, oldPrice:null, rating:4.5, reviews:121, stock:11, badge:"new", icon:"laptop",
    short:"InfinityEdge display in a machined-aluminum chassis.",
    specs:{ Display:"14.5\" 3.2K OLED", Chip:"Intel Core Ultra 7", RAM:"16GB", Storage:"1TB SSD", Battery:"Up to 13h", Weight:"1.55kg" } },
  { id:"l04", name:"Dell XPS 13", brand:"Dell XPS", category:"laptops", price:109900, oldPrice:119900, rating:4.4, reviews:97, stock:14, badge:"sale", icon:"laptop",
    short:"Compact flagship with a virtually borderless screen.",
    specs:{ Display:"13.4\" FHD+", Chip:"Intel Core Ultra 5", RAM:"16GB", Storage:"512GB SSD", Battery:"Up to 12h", Weight:"1.23kg" } },
  { id:"l05", name:"HP Spectre x360 14", brand:"HP Spectre", category:"laptops", price:139900, oldPrice:null, rating:4.5, reviews:143, stock:13, badge:null, icon:"laptop",
    short:"Convertible 2-in-1 with a gem-cut aluminum design.",
    specs:{ Display:"14\" 2.8K OLED Touch", Chip:"Intel Core Ultra 7", RAM:"16GB", Storage:"1TB SSD", Battery:"Up to 14h", Weight:"1.36kg" } },
  { id:"l06", name:"HP Spectre 13", brand:"HP Spectre", category:"laptops", price:99900, oldPrice:107900, rating:4.3, reviews:65, stock:19, badge:"sale", icon:"laptop",
    short:"Slim clamshell with brass-accented styling.",
    specs:{ Display:"13.5\" 3K2K", Chip:"Intel Core i7", RAM:"16GB", Storage:"512GB SSD", Battery:"Up to 12h", Weight:"1.17kg" } },
  { id:"l07", name:"iPad Pro 13\" M4", brand:"iPad", category:"laptops", price:124900, oldPrice:null, rating:4.8, reviews:176, stock:16, badge:"new", icon:"tablet",
    short:"Tandem OLED display, thinner than ever with M4.",
    specs:{ Display:"13\" Ultra Retina XDR", Chip:"Apple M4", Storage:"256GB", Camera:"12MP", Battery:"Up to 10h", Weight:"579g" } },
  { id:"l08", name:"iPad Air 11\"", brand:"iPad", category:"laptops", price:59900, oldPrice:64900, rating:4.6, reviews:229, stock:28, badge:"sale", icon:"tablet",
    short:"M2 performance in a light, colorful design.",
    specs:{ Display:"11\" Liquid Retina", Chip:"Apple M2", Storage:"128GB", Camera:"12MP", Battery:"Up to 10h", Weight:"460g" } },
  { id:"l09", name:"Surface Pro 11", brand:"Surface Pro", category:"laptops", price:129900, oldPrice:null, rating:4.4, reviews:88, stock:12, badge:null, icon:"tablet",
    short:"Windows tablet-laptop hybrid with Copilot+ features.",
    specs:{ Display:"13\" PixelSense 120Hz", Chip:"Snapdragon X Elite", RAM:"16GB", Storage:"512GB SSD", Battery:"Up to 14h", Weight:"895g" } },
  { id:"l10", name:"Surface Laptop 13", brand:"Surface Pro", category:"laptops", price:104900, oldPrice:112900, rating:4.3, reviews:54, stock:18, badge:"sale", icon:"laptop",
    short:"Thin-and-light Windows laptop with all-day battery.",
    specs:{ Display:"13\" PixelSense", Chip:"Snapdragon X Plus", RAM:"16GB", Storage:"256GB SSD", Battery:"Up to 20h", Weight:"1.34kg" } },

  // ---------------- Audio & Wearables ----------------
  { id:"a01", name:"SoundMax Studio Wireless", brand:"Headphones", category:"audio", price:24999, oldPrice:28999, rating:4.6, reviews:301, stock:34, badge:"sale", icon:"headphones",
    short:"Over-ear ANC headphones with 40h battery life.",
    specs:{ Type:"Over-ear, ANC", Battery:"40h (ANC on)", Connectivity:"Bluetooth 5.3", Weight:"254g", Mic:"Built-in", Color:"Matte Black" } },
  { id:"a02", name:"AirWave Pro 2", brand:"Headphones", category:"audio", price:17999, oldPrice:null, rating:4.4, reviews:178, stock:41, badge:null, icon:"headphones",
    short:"Lightweight on-ear headphones tuned for clarity.",
    specs:{ Type:"On-ear", Battery:"30h", Connectivity:"Bluetooth 5.2", Weight:"210g", Mic:"Built-in", Color:"Slate Blue" } },
  { id:"a03", name:"PulseBuds Pro", brand:"Earbuds", category:"audio", price:12999, oldPrice:14999, rating:4.5, reviews:412, stock:52, badge:"best", icon:"earbuds",
    short:"True wireless earbuds with adaptive noise cancelling.",
    specs:{ Type:"In-ear TWS", Battery:"8h + 24h case", Connectivity:"Bluetooth 5.3", Water:"IPX4", Mic:"Dual beamforming", Color:"Pearl White" } },
  { id:"a04", name:"PulseBuds Lite", brand:"Earbuds", category:"audio", price:5999, oldPrice:null, rating:4.1, reviews:203, stock:60, badge:null, icon:"earbuds",
    short:"Affordable everyday earbuds with punchy bass.",
    specs:{ Type:"In-ear TWS", Battery:"6h + 20h case", Connectivity:"Bluetooth 5.1", Water:"IPX4", Mic:"Single", Color:"Graphite" } },
  { id:"a05", name:"ChronoFit Watch 3", brand:"Smartwatches", category:"audio", price:22999, oldPrice:25999, rating:4.5, reviews:264, stock:29, badge:"sale", icon:"watch",
    short:"AMOLED smartwatch with GPS and 14-day battery.",
    specs:{ Display:"1.5\" AMOLED", Battery:"14 days", GPS:"Built-in", Water:"5ATM", Sensors:"HR, SpO2, ECG", Color:"Space Grey" } },
  { id:"a06", name:"ChronoFit Watch SE", brand:"Smartwatches", category:"audio", price:12999, oldPrice:null, rating:4.2, reviews:141, stock:38, badge:null, icon:"watch",
    short:"Essential fitness tracking with a bright display.",
    specs:{ Display:"1.3\" AMOLED", Battery:"10 days", GPS:"Connected", Water:"3ATM", Sensors:"HR, SpO2", Color:"Rose Gold" } },
  { id:"a07", name:"Resonance Mini Speaker", brand:"Speakers", category:"audio", price:6999, oldPrice:8499, rating:4.3, reviews:190, stock:47, badge:"sale", icon:"speaker",
    short:"Pocket-size speaker with surprisingly big sound.",
    specs:{ Output:"12W", Battery:"12h", Connectivity:"Bluetooth 5.3", Water:"IPX7", Weight:"320g", Color:"Coral" } },
  { id:"a08", name:"Resonance Home 360", brand:"Speakers", category:"audio", price:15999, oldPrice:null, rating:4.6, reviews:132, stock:21, badge:"new", icon:"speaker",
    short:"360° smart speaker with room-filling clarity.",
    specs:{ Output:"30W", Battery:"N/A (mains)", Connectivity:"Wi-Fi + Bluetooth", Voice:"Assistant built-in", Weight:"1.1kg", Color:"White" } },
  { id:"a09", name:"FlexBand Active", brand:"Fitness Bands", category:"audio", price:3999, oldPrice:4999, rating:4.0, reviews:256, stock:70, badge:"sale", icon:"band",
    short:"Slim fitness band with 18-day battery life.",
    specs:{ Display:"1.1\" AMOLED", Battery:"18 days", Water:"5ATM", Sensors:"HR, SpO2, Sleep", Weight:"22g", Color:"Black" } },
  { id:"a10", name:"FlexBand Pulse", brand:"Fitness Bands", category:"audio", price:2999, oldPrice:null, rating:4.0, reviews:98, stock:65, badge:null, icon:"band",
    short:"Budget-friendly tracker for steps, sleep and HR.",
    specs:{ Display:"0.96\" AMOLED", Battery:"12 days", Water:"IP68", Sensors:"HR, Steps, Sleep", Weight:"19g", Color:"Navy" } },

  // ---------------- Accessories ----------------
  { id:"c01", name:"GaN 65W Fast Charger", brand:"Chargers & Cables", category:"accessories", price:2499, oldPrice:2999, rating:4.6, reviews:340, stock:120, badge:"sale", icon:"charger",
    short:"Compact dual-port GaN charger, laptop-capable.",
    specs:{ Output:"65W (USB-C PD)", Ports:"2 (USB-C + USB-A)", Input:"100–240V", Weight:"110g" } },
  { id:"c02", name:"USB-C to USB-C Cable 2m", brand:"Chargers & Cables", category:"accessories", price:799, oldPrice:null, rating:4.4, reviews:512, stock:200, badge:null, icon:"charger",
    short:"Braided cable rated for 100W fast charging.",
    specs:{ Length:"2m", Output:"100W / 480Mbps", Material:"Braided nylon" } },
  { id:"c03", name:"PowerCell 20K Power Bank", brand:"Power Banks", category:"accessories", price:3999, oldPrice:4799, rating:4.5, reviews:287, stock:85, badge:"sale", icon:"powerbank",
    short:"20,000mAh with 30W pass-through fast charging.",
    specs:{ Capacity:"20,000mAh", Output:"30W USB-C PD", Ports:"2", Weight:"390g" } },
  { id:"c04", name:"PowerCell 10K Slim", brand:"Power Banks", category:"accessories", price:2299, oldPrice:null, rating:4.2, reviews:164, stock:96, badge:null, icon:"powerbank",
    short:"Credit-card slim power bank for everyday carry.",
    specs:{ Capacity:"10,000mAh", Output:"20W USB-C PD", Ports:"1", Weight:"180g" } },
  { id:"c05", name:"ShieldCase Armor Cover", brand:"Phone Cases", category:"accessories", price:1299, oldPrice:1599, rating:4.3, reviews:221, stock:150, badge:"sale", icon:"case",
    short:"Military-grade drop protection, slim profile.",
    specs:{ Protection:"MIL-STD-810G", Material:"TPU + Polycarbonate", Compatibility:"Multiple models" } },
  { id:"c06", name:"ClearFit Slim Case", brand:"Phone Cases", category:"accessories", price:699, oldPrice:null, rating:4.1, reviews:178, stock:180, badge:null, icon:"case",
    short:"Ultra-thin transparent case that shows off your phone.",
    specs:{ Protection:"Basic drop", Material:"TPU", Compatibility:"Multiple models" } },
  { id:"c07", name:"NanoGuard Tempered Glass (2-Pack)", brand:"Screen Protectors", category:"accessories", price:499, oldPrice:699, rating:4.4, reviews:390, stock:220, badge:"sale", icon:"shield",
    short:"9H hardness glass with case-friendly edges.",
    specs:{ Hardness:"9H", Pack:"2 units", Coating:"Oleophobic" } },
  { id:"c08", name:"FlexArmor Hydrogel Film", brand:"Screen Protectors", category:"accessories", price:399, oldPrice:null, rating:4.0, reviews:112, stock:160, badge:null, icon:"shield",
    short:"Self-healing film for curved-edge displays.",
    specs:{ Type:"Hydrogel", Pack:"3 units", Feature:"Self-healing" } },
  { id:"c09", name:"MultiPort USB-C Hub", brand:"Adapters", category:"accessories", price:2999, oldPrice:3499, rating:4.5, reviews:156, stock:70, badge:"sale", icon:"adapter",
    short:"7-in-1 hub: HDMI, USB-A, SD card and PD passthrough.",
    specs:{ Ports:"7-in-1", Video:"HDMI 4K@60Hz", Data:"2x USB-A 3.0", Charging:"100W PD passthrough" } },
  { id:"c10", name:"Wireless Charging Pad", brand:"Adapters", category:"accessories", price:1599, oldPrice:null, rating:4.2, reviews:203, stock:110, badge:"new", icon:"charger",
    short:"15W Qi wireless charging with LED indicator.",
    specs:{ Output:"15W Qi", Compatibility:"Qi-enabled devices", Cable:"USB-C included" } },
  { id:"c11", name:"Car Mount Vent Clip", brand:"Adapters", category:"accessories", price:899, oldPrice:1099, rating:4.1, reviews:87, stock:130, badge:"sale", icon:"adapter",
    short:"One-hand operation, fits phones up to 7 inches.",
    specs:{ Mount:"Air vent clip", Rotation:"360°", Compatibility:"Up to 7\" phones" } },
  { id:"c12", name:"USB-C to Lightning Adapter", brand:"Adapters", category:"accessories", price:599, oldPrice:null, rating:3.9, reviews:64, stock:140, badge:null, icon:"adapter",
    short:"Small connector adapter for legacy Lightning cables.",
    specs:{ Type:"USB-C female to Lightning male", Data:"USB 2.0 speed" } }
];

const BRANDS = [...new Set(PRODUCTS.map(p => p.brand))].sort();

function formatCurrency(n){
  return "₹" + Number(n).toLocaleString("en-IN");
}

function getProductById(id){
  return PRODUCTS.find(p => p.id === id);
}

function getRelatedProducts(product, count=4){
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, count);
}

/* Simulated reviews, keyed by product id (falls back to generic set) */
const REVIEW_POOL = [
  { name:"Aarav Mehta", rating:5, text:"Exceeded expectations. Build quality feels premium and it arrived well packaged." },
  { name:"Priya Nair", rating:4, text:"Great value overall, though the box didn't include a charger — worth knowing beforehand." },
  { name:"Rohan Kapoor", rating:5, text:"Been using it daily for three weeks — battery life is genuinely as advertised." },
  { name:"Sana Iqbal", rating:3, text:"Does the job but nothing special. Delivery was fast though." },
  { name:"Vikram Singh", rating:5, text:"Best purchase this year. Performance is smooth and no lag whatsoever." },
  { name:"Neha Joshi", rating:4, text:"Solid pick for the price bracket. Would recommend to a friend." }
];

function getReviewsFor(productId){
  // deterministic pseudo-random subset based on id so it's stable per product
  let seed = 0;
  for (const ch of productId) seed += ch.charCodeAt(0);
  const count = 3 + (seed % 3);
  const out = [];
  for (let i=0; i<count; i++){
    out.push(REVIEW_POOL[(seed + i*3) % REVIEW_POOL.length]);
  }
  return out;
}
