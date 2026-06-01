import { useEffect, useState } from "react";
import VoiceOrb from "../components/voice/VoiceOrb";
import CommandInput from "../components/input/CommandInput";
import SamplePhrases from "../components/input/SamplePhrases";
import ResponsePanel from "../components/assistant/ResponsePanel";
import CartPanel from "../components/cart/CartPanel";
import ChatHistory from "../components/assistant/ChatHistory";
import ProductGrid from "../components/products/ProductGrid";
import "./HomePage.css";

export default function HomePage({
  assistantState,
  products,
  history,
  busy,
  onSend,
  speech,
  tts,
}) {
  const [command, setCommand] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const { state } = assistantState;
  const cartCount = state.cart?.length || 0;

  /* Auto-open cart when item is added */
  useEffect(() => {
    if (cartCount > 0) setCartOpen(true);
  }, [cartCount]);

  function handleSend(text) {
    const t = (text || command).trim();
    if (!t) return;
    onSend(t).then((result) => {
      if (result) tts.speak(result.response);
    });
    setCommand("");
  }

  function handleVoiceResult(text) {
    handleSend(text);
  }

  function handleVoiceClick() {
    if (speech.listening) {
      speech.stopListening();
    } else {
      speech.startListening();
    }
  }

  /* Register voice result callback */
  useEffect(() => {
    speech.onResultRef && (speech.onResultRef.current = handleVoiceResult);
  });

  return (
    <div className="home-page">
      {/* ── Hero / Command band ─────────────── */}
      <section className="hero-band">
        <div className="hero-band__inner">
          <VoiceOrb
            listening={speech.listening}
            supported={speech.supported}
            interimText={speech.interimText}
            onClick={handleVoiceClick}
          />

          <div className="hero-band__content">
            <div className="hero-band__heading">
              <h1 className="hero-band__title">
                <span>Voice Shopping</span>
                <span className="hero-band__title-ur" lang="ur">آواز سے خریداری</span>
              </h1>
              <p className="hero-band__sub">
                Search, add, and order products using English, Urdu, or both
              </p>
            </div>

            <CommandInput
              value={command}
              onChange={setCommand}
              onSubmit={handleSend}
              busy={busy}
              voiceEnabled={tts.enabled}
              onVoiceToggle={() => tts.setEnabled((v) => !v)}
              interimText={speech.interimText}
              listening={speech.listening}
            />

            <SamplePhrases onSelect={handleSend} />
          </div>
        </div>
      </section>

      {/* ── Main content ────────────────────── */}
      <div className="home-main">
        {/* Left column */}
        <div className="home-main__left">
          <ResponsePanel
            response={state.response}
            nlu={state.nlu}
            busy={busy}
          />
          <ChatHistory history={history} />
        </div>

        {/* Right column – Cart */}
        <div className={`home-main__right ${cartOpen ? "home-main__right--open" : ""}`}>
          <CartPanel
            cart={state.cart}
            total={state.total}
            busy={busy}
            onSend={handleSend}
            onClose={() => setCartOpen(false)}
          />
        </div>
      </div>

      {/* ── Product grid ────────────────────── */}
      <ProductGrid
        products={products}
        resultProducts={state.results}
        busy={busy}
        onAdd={(product) =>
          handleSend(`add ${product.color} ${product.category} to cart`)
        }
      />

      {/* Mobile cart toggle */}
      {!cartOpen && cartCount > 0 && (
        <button
          className="cart-fab"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          🛒 {cartCount} item{cartCount !== 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
}
