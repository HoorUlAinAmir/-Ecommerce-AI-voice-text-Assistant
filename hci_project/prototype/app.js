const core = window.BilingualAssistantCore;
const session = core.createSession();

const els = {
  input: document.getElementById("commandInput"),
  send: document.getElementById("sendButton"),
  mic: document.getElementById("micButton"),
  status: document.getElementById("speechStatus"),
  transcript: document.getElementById("transcriptText"),
  response: document.getElementById("assistantResponse"),
  language: document.getElementById("languagePill"),
  intent: document.getElementById("intentValue"),
  color: document.getElementById("colorValue"),
  category: document.getElementById("categoryValue"),
  price: document.getElementById("priceValue"),
  cartTotal: document.getElementById("cartTotal"),
  cartList: document.getElementById("cartList"),
  productGrid: document.getElementById("productGrid"),
  resultCount: document.getElementById("resultCount")
};

function renderProducts(products) {
  els.resultCount.textContent = `${products.length} item${products.length === 1 ? "" : "s"}`;
  els.productGrid.innerHTML = products.map((product) => `
    <article class="product">
      <h3>${product.name}</h3>
      <p>${product.urdu}</p>
      <div class="price">${core.formatCurrency(product.price)}</div>
      <p>${product.color} · ${product.category} · ${product.rating} rating</p>
    </article>
  `).join("");
}

function renderCart(cart, total) {
  els.cartTotal.textContent = core.formatCurrency(total);
  if (!cart.length) {
    els.cartList.innerHTML = '<li class="empty">No items yet</li>';
    return;
  }
  els.cartList.innerHTML = cart.map((item) => `
    <li>
      <span>${item.quantity} × ${item.name}</span>
      <strong>${core.formatCurrency(item.price * item.quantity)}</strong>
    </li>
  `).join("");
}

function submitCommand(command) {
  const text = command.trim();
  if (!text) return;
  const result = core.respond(session, text);
  els.transcript.textContent = text;
  els.response.textContent = result.response;
  els.language.textContent = result.nlu.language;
  els.intent.textContent = result.nlu.intent;
  els.color.textContent = result.nlu.slots.color || "none";
  els.category.textContent = result.nlu.slots.category || "none";
  els.price.textContent = result.nlu.slots.maxPrice ? core.formatCurrency(result.nlu.slots.maxPrice) : "none";
  renderCart(result.cart, result.total);
  renderProducts(result.results.length ? result.results : session.lastResults);
  els.input.value = "";
}

els.send.addEventListener("click", () => submitCommand(els.input.value));
els.input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") submitCommand(els.input.value);
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => submitCommand(button.dataset.sample));
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  els.mic.disabled = true;
  els.status.textContent = "Speech API unavailable";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-PK";
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.onstart = () => {
    els.status.textContent = "Listening...";
  };
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    submitCommand(text);
  };
  recognition.onerror = () => {
    els.status.textContent = "Speech input failed";
  };
  recognition.onend = () => {
    if (!els.mic.disabled) els.status.textContent = "Text mode ready";
  };
  els.mic.addEventListener("click", () => recognition.start());
}

renderProducts(core.catalog);

