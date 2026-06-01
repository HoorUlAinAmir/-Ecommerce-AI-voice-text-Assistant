(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.BilingualAssistantCore = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {

  /* ── Product Catalog (expanded) ──────────────────────────────── */
  const catalog = [
    // Kurtas
    { id: "kurta-blue",     name: "Blue Cotton Kurta",           urdu: "نیلا کاٹن کرتا",           category: "kurta",      color: "blue",   price: 2490, rating: 4.6, stock: 16 },
    { id: "kurta-green",    name: "Green Embroidered Kurta",     urdu: "سبز کڑھائی والا کرتا",     category: "kurta",      color: "green",  price: 3290, rating: 4.5, stock: 9  },
    { id: "kurta-white",    name: "White Lawn Kurta",            urdu: "سفید لان کرتا",            category: "kurta",      color: "white",  price: 1990, rating: 4.3, stock: 14 },
    { id: "kurta-black",    name: "Black Silk Kurta",            urdu: "کالا ریشمی کرتا",          category: "kurta",      color: "black",  price: 4200, rating: 4.7, stock: 7  },
    // Shoes
    { id: "shoes-red",      name: "Red Running Shoes",           urdu: "سرخ رننگ شوز",             category: "shoes",      color: "red",    price: 4590, rating: 4.4, stock: 12 },
    { id: "shoes-blue",     name: "Blue Jogger Shoes",           urdu: "نیلے جوگر شوز",            category: "shoes",      color: "blue",   price: 3990, rating: 4.2, stock: 11 },
    { id: "shoes-black",    name: "Black Leather Sneakers",      urdu: "کالے چمڑے کے جوتے",       category: "shoes",      color: "black",  price: 5200, rating: 4.5, stock: 8  },
    { id: "shoes-white",    name: "White Canvas Shoes",          urdu: "سفید کینوس شوز",           category: "shoes",      color: "white",  price: 2800, rating: 4.1, stock: 15 },
    // Dupatta
    { id: "dupatta-white",  name: "White Lawn Dupatta",          urdu: "سفید لان دوپٹہ",           category: "dupatta",    color: "white",  price: 1290, rating: 4.2, stock: 21 },
    { id: "dupatta-blue",   name: "Blue Chiffon Dupatta",        urdu: "نیلا شیفون دوپٹہ",        category: "dupatta",    color: "blue",   price: 1590, rating: 4.3, stock: 13 },
    { id: "dupatta-red",    name: "Red Embroidered Dupatta",     urdu: "سرخ کڑھائی دوپٹہ",        category: "dupatta",    color: "red",    price: 1990, rating: 4.4, stock: 10 },
    // Watch
    { id: "watch-black",    name: "Black Smart Watch",           urdu: "کالی اسمارٹ واچ",          category: "watch",      color: "black",  price: 6990, rating: 4.3, stock: 7  },
    { id: "watch-brown",    name: "Brown Leather Watch",         urdu: "براؤن لیدر واچ",           category: "watch",      color: "brown",  price: 8500, rating: 4.6, stock: 4  },
    // Bag
    { id: "bag-brown",      name: "Brown Leather Bag",           urdu: "براؤن لیدر بیگ",           category: "bag",        color: "brown",  price: 5490, rating: 4.5, stock: 6  },
    { id: "bag-black",      name: "Black Tote Bag",              urdu: "کالا ٹوٹ بیگ",             category: "bag",        color: "black",  price: 3200, rating: 4.2, stock: 11 },
    // Headphones
    { id: "headphones-black", name: "Black Wireless Headphones", urdu: "کالے وائرلیس ہیڈفون",     category: "headphones", color: "black",  price: 3990, rating: 4.1, stock: 14 },
    { id: "headphones-white", name: "White Earbuds",             urdu: "سفید ائربڈز",              category: "headphones", color: "white",  price: 2590, rating: 4.0, stock: 18 },
  ];

  /* ── Dictionaries ─────────────────────────────────────────────── */
  const colors = {
    red:   ["red", "surkh", "laal", "lal", "لال", "سرخ"],
    blue:  ["blue", "neela", "neeli", "neelay", "nile", "نیلا", "نیلی", "نیلے"],
    green: ["green", "sabz", "hari", "سبز", "ہری"],
    white: ["white", "safed", "safaid", "سفید"],
    black: ["black", "kala", "kali", "kalay", "kale", "کالا", "کالی", "کالے"],
    brown: ["brown", "braun", "bhura", "bhoora", "بھورا", "براؤن"],
  };

  const categories = {
    kurta:      ["kurta", "kurtay", "kurte", "kurtas", "کرتا", "کرتے", "shirt", "qamis", "qameez"],
    shoes:      ["shoes", "shoe", "jootay", "juta", "joota", "joggers", "jogger", "sneakers", "sneaker", "جوگر", "جوتے", "جوتا", "شوز"],
    dupatta:    ["dupatta", "dupatte", "duppata", "scarf", "دوپٹہ", "دوپٹے"],
    watch:      ["watch", "watches", "ghari", "ghadi", "گھڑی", "واچ"],
    bag:        ["bag", "bags", "handbag", "tote", "purse", "بیگ", "تھیلا"],
    headphones: ["headphones", "headphone", "earphones", "earphone", "earbuds", "earbud", "ear buds", "ہیڈفون", "ائرفون", "ائربڈز"],
  };

  const synonyms = {
    search:  ["show", "find", "search", "display", "get", "dikhao", "dikha", "dhoondo", "dhundho", "chahiye", "chahie",
               "دکھاؤ", "دکھاو", "چاہیے", "چاہئے", "ڈھونڈو"],
    add:     ["add", "cart mein", "cart me", "basket mein", "dalo", "rakh", "rakho", "shamil", "dal do",
               "شامل", "ڈالو", "رکھو", "کارٹ میں"],
    remove:  ["remove", "delete", "nikalo", "hata", "hatao", "nikal", "nikaldao",
               "نکالو", "ہٹاؤ", "ڈیلیٹ"],
    cart:    ["cart", "basket", "kart", "ٹوکری", "کارٹ"],
    confirm: ["confirm", "place order", "order karo", "order de", "order do", "yes", "haan", "han", "ha", "okay", "ok", "bilkul",
               "ہاں", "آرڈر", "ٹھیک ہے", "بالکل"],
    cancel:  ["cancel", "no", "nahin", "nahi", "na", "band", "rok", "نہیں", "نہ", "رکو"],
    greet:   ["hello", "hi", "assalam", "salam", "السلام"],
    help:    ["help", "madad", "kya kar sakta", "what can", "مدد", "کیا"],
  };

  /* ── Normalization ────────────────────────────────────────────── */
  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[؟?.,!،]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function includesAny(text, terms) {
    const normalizedText = String(text || "").toLowerCase();
    const tokens = normalizedText.split(/\s+/).filter(Boolean);
    return terms.some((term) => {
      const normalizedTerm = String(term).toLowerCase().trim();
      if (!normalizedTerm) return false;
      if (normalizedTerm.length <= 2 && /^[a-z0-9]+$/.test(normalizedTerm)) {
        return tokens.includes(normalizedTerm);
      }
      return normalizedText.includes(normalizedTerm);
    });
  }

  /* ── Language Detection ───────────────────────────────────────── */
  function detectLanguage(text) {
    const lower = String(text || "").toLowerCase();
    const hasUrduScript = /[؀-ۿݐ-ݿ]/.test(text);
    const romanUrduTerms = [
      "mujhe", "dikhao", "cart mein", "haan", "nahi", "karo", "chahiye",
      "nikalo", "jootay", "kurta", "dupatta", "ghari", "laal", "neela",
      "safed", "kala", "sabz", "dalo", "mera", "meri",
    ];
    const hasRomanUrdu = romanUrduTerms.some((t) => lower.includes(t));
    const hasEnglish = /[a-z]/i.test(text) &&
      ["show", "find", "add", "remove", "cart", "order", "under", "search"].some((t) => lower.includes(t));

    if ((hasUrduScript || hasRomanUrdu) && hasEnglish) return "code-switched";
    if (hasUrduScript) return "urdu";
    if (hasRomanUrdu) return "roman-urdu";
    return "english";
  }

  /* ── Slot Detection ───────────────────────────────────────────── */
  function detectColor(text) {
    return Object.keys(colors).find((c) => includesAny(text, colors[c])) || null;
  }

  function detectCategory(text) {
    return Object.keys(categories).find((c) => includesAny(text, categories[c])) || null;
  }

  function detectQuantity(text) {
    const wordNums = {
      one: 1, aik: 1, ek: 1, ایک: 1,
      two: 2, do: 2, دو: 2,
      three: 3, teen: 3, تین: 3,
      four: 4, char: 4, چار: 4,
      five: 5, paanch: 5, پانچ: 5,
    };
    const digitMatch = text.match(/\b([1-9])\b/);
    if (digitMatch) return Number(digitMatch[1]);
    const tokens = String(text || "").split(/\s+/).filter(Boolean);
    const found = Object.keys(wordNums).find((w) => tokens.includes(w));
    return found ? wordNums[found] : 1;
  }

  function detectMaxPrice(text) {
    // Patterns like "under 5000", "below 3000 rs", "5000 ke andar", "paanch hazar se kam"
    const patterns = [
      /(?:under|below|less[\s-]?than|under rs\.?|below rs\.?|kam[\s-]?se[\s-]?kam|se[\s-]?kam|کم|نیچے)\s*(?:rs\.?|pkr\.?)?\s*(\d{3,6})/i,
      /(\d{3,6})\s*(?:rs\.?|pkr\.?)?\s*(?:se[\s-]?kam|ke[\s-]?andar|tak|کے اندر|تک|سے کم)/i,
      /(?:rs\.?|pkr\.?)\s*(\d{3,6})\s*(?:se[\s-]?kam|ke[\s-]?andar)/i,
    ];
    for (const pat of patterns) {
      const m = text.match(pat);
      if (m) return Number(m[1]);
    }
    // Word-form price
    const wordPrices = {
      "paanch hazar": 5000, "پانچ ہزار": 5000,
      "teen hazar": 3000,   "تین ہزار": 3000,
      "char hazar": 4000,   "چار ہزار": 4000,
      "do hazar": 2000,     "دو ہزار": 2000,
    };
    const found = Object.keys(wordPrices).find((k) => text.includes(k));
    return found ? wordPrices[found] : null;
  }

  /* ── Intent Classification ───────────────────────────────────── */
  function classify(text) {
    const normalized = normalize(text);
    const hasConfirm  = includesAny(normalized, synonyms.confirm);
    const hasCancel   = includesAny(normalized, synonyms.cancel);
    const hasRemove   = includesAny(normalized, synonyms.remove);
    const hasAdd      = includesAny(normalized, synonyms.add);
    const hasCart     = includesAny(normalized, synonyms.cart);
    const hasSearch   = includesAny(normalized, synonyms.search);
    const hasGreet    = includesAny(normalized, synonyms.greet);
    const hasHelp     = includesAny(normalized, synonyms.help);
    const category    = detectCategory(normalized);
    const color       = detectColor(normalized);
    const maxPrice    = detectMaxPrice(normalized);
    const quantity    = detectQuantity(normalized);

    let intent = "unknown";
    if (hasGreet)                            intent = "greet";
    else if (hasHelp)                        intent = "help";
    else if (hasCancel)                      intent = "cancel_order";
    else if (hasConfirm)                     intent = "confirm_order";
    else if (hasRemove)                      intent = "remove_from_cart";
    else if (hasAdd || (hasCart && category)) intent = "add_to_cart";
    else if (hasCart)                        intent = "view_cart";
    else if (hasSearch || category || color || maxPrice) intent = "search_product";

    return {
      intent,
      language: detectLanguage(text),
      slots: { category, color, quantity, maxPrice },
      normalized,
    };
  }

  /* ── Product Search ──────────────────────────────────────────── */
  function searchProducts(slots, products) {
    return (products || catalog).filter((p) => {
      if (slots.category && p.category !== slots.category) return false;
      if (slots.color    && p.color    !== slots.color)    return false;
      if (slots.maxPrice && p.price    >  slots.maxPrice)  return false;
      return true;
    });
  }

  /* ── Session ─────────────────────────────────────────────────── */
  function createSession() {
    return { cart: [], lastResults: [], awaitingConfirmation: false, orderPlaced: false };
  }

  function findCartItem(session, slots) {
    if (!slots.category && !slots.color) return session.cart[session.cart.length - 1] || null;
    return session.cart.find((item) => {
      if (slots.category && item.category !== slots.category) return false;
      if (slots.color    && item.color    !== slots.color)    return false;
      return true;
    });
  }

  function firstMatchingProduct(session, slots, products) {
    const source = products || catalog;
    const fromLast = session.lastResults.find((p) => {
      if (slots.category && p.category !== slots.category) return false;
      if (slots.color    && p.color    !== slots.color)    return false;
      return true;
    });
    return fromLast || searchProducts(slots, source)[0] || source[0];
  }

  /* ── Utilities ───────────────────────────────────────────────── */
  function formatCurrency(value) {
    return "PKR " + Number(value || 0).toLocaleString("en-PK");
  }

  function cartTotal(session) {
    return session.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /* ── Response Engine ─────────────────────────────────────────── */
  function respond(session, text, products) {
    const nlu = classify(text);
    let response = "";
    let results  = [];

    switch (nlu.intent) {
      case "greet":
        response = "Assalam-o-Alaikum! I'm VoiceBazaar, your bilingual shopping assistant. Try saying 'show me blue kurta' or 'mujhe red shoes dikhao'.";
        break;

      case "help":
        response = "You can say: 'show me [color] [product]', 'add [product] to cart', 'mera cart dikhao', or 'yes place order'. I understand English, Urdu and Romanized Urdu!";
        break;

      case "search_product": {
        results = searchProducts(nlu.slots, products);
        session.lastResults = results;
        if (results.length === 0) {
          response = "Koi matching product nahi mila. Please try a different color, category, or price.";
        } else {
          const top = results[0];
          const priceFilter = nlu.slots.maxPrice ? ` under ${formatCurrency(nlu.slots.maxPrice)}` : "";
          response = `I found ${results.length} item${results.length > 1 ? "s" : ""}${priceFilter}. Best option: ${top.name} for ${formatCurrency(top.price)}. Say 'add to cart' to add it!`;
        }
        break;
      }

      case "add_to_cart": {
        const product = firstMatchingProduct(session, nlu.slots, products);
        if (!product) {
          response = "Koi product nahi mila. Pehle 'show me' command use karein.";
          break;
        }
        const existing = session.cart.find((i) => i.id === product.id);
        if (existing) {
          existing.quantity += nlu.slots.quantity;
        } else {
          session.cart.push({ ...product, quantity: nlu.slots.quantity });
        }
        session.awaitingConfirmation = false;
        response = `${nlu.slots.quantity > 1 ? nlu.slots.quantity + "x " : ""}${product.name} cart mein add ho gaya! Total: ${formatCurrency(cartTotal(session))}. Say 'mera cart dikhao' to review.`;
        break;
      }

      case "remove_from_cart": {
        const item = findCartItem(session, nlu.slots);
        if (!item) {
          response = "Ye item cart mein nahi hai.";
        } else {
          session.cart = session.cart.filter((ci) => ci.id !== item.id);
          response = `${item.name} cart se remove ho gaya. Naya total: ${formatCurrency(cartTotal(session))}.`;
        }
        break;
      }

      case "view_cart":
        if (session.cart.length === 0) {
          response = "Aapka cart khali hai. Try: 'show me blue kurta' phir 'add to cart'.";
        } else {
          const itemList = session.cart.map((i) => `${i.quantity}x ${i.name}`).join(", ");
          response = `Cart mein hai: ${itemList}. Total: ${formatCurrency(cartTotal(session))}. 'Yes place order' bol kar order karein!`;
          session.awaitingConfirmation = true;
        }
        break;

      case "confirm_order":
        if (session.cart.length === 0) {
          response = "Cart khali hai, order nahi diya ja sakta. Pehle kuch add karein.";
        } else {
          const total = cartTotal(session);
          session.orderPlaced = true;
          session.awaitingConfirmation = false;
          response = `Order confirm ho gaya! Total: ${formatCurrency(total)}. Shukriya aapke order ke liye. Delivery 3-5 business days mein hogi. شکریہ!`;
        }
        break;

      case "cancel_order":
        session.awaitingConfirmation = false;
        response = "Order confirmation cancel ho gaya. Aapka cart abhi bhi safe hai.";
        break;

      default:
        response = "Samajh nahi aaya. Try: 'show me red shoes', 'kurta cart mein add karo', or 'mera cart dikhao'.";
    }

    return {
      nlu,
      response,
      results,
      cart:                 session.cart.slice(),
      total:                cartTotal(session),
      awaitingConfirmation: session.awaitingConfirmation,
      orderPlaced:          session.orderPlaced,
    };
  }

  return { catalog, classify, createSession, respond, searchProducts, formatCurrency, cartTotal };
});
