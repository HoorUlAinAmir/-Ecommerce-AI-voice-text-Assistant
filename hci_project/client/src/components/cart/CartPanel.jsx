import { ShoppingBag, X, CheckCircle, Trash2 } from "lucide-react";
import { currency } from "../../utils/currency";
import "./CartPanel.css";

export default function CartPanel({ cart, total, busy, onSend, onClose }) {
  const isEmpty = !cart || cart.length === 0;

  function handleCheckout() {
    onSend("yes place order");
  }

  function handleRemove(item) {
    onSend(`remove ${item.color ? item.color + " " : ""}${item.category}`);
  }

  return (
    <aside className="cart-panel" aria-label="Shopping cart">
      <div className="cart-panel__head">
        <div className="cart-panel__title">
          <ShoppingBag size={18} strokeWidth={2} />
          <span>Your Cart</span>
          {!isEmpty && (
            <span className="cart-count">{cart.length}</span>
          )}
        </div>
        {onClose && (
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <X size={17} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className="cart-items">
        {isEmpty ? (
          <div className="cart-empty">
            <ShoppingBag size={38} strokeWidth={1.2} />
            <p>Your cart is empty</p>
            <small>Say "show me kurta" to start shopping</small>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className={`cart-item__thumb cart-item__thumb--${item.category}`}>
                <span>{CATEGORY_EMOJI[item.category] || "📦"}</span>
              </div>
              <div className="cart-item__info">
                <p className="cart-item__name">{item.name}</p>
                <p className="cart-item__urdu" lang="ur">{item.urdu}</p>
                <div className="cart-item__meta">
                  <span className="cart-item__qty">× {item.quantity}</span>
                  <strong className="cart-item__price">{currency(item.price * item.quantity)}</strong>
                </div>
              </div>
              <button
                className="cart-item__remove"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.name}`}
                disabled={busy}
              >
                <Trash2 size={15} strokeWidth={2} />
              </button>
            </div>
          ))
        )}
      </div>

      {!isEmpty && (
        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Total</span>
            <strong>{currency(total)}</strong>
          </div>
          <button
            className="cart-checkout"
            onClick={handleCheckout}
            disabled={busy}
          >
            <CheckCircle size={18} strokeWidth={2.2} />
            <span>Place Order</span>
          </button>
          <p className="cart-hint">Or say "yes place order" • آرڈر دیں</p>
        </div>
      )}
    </aside>
  );
}

const CATEGORY_EMOJI = {
  kurta: "👕",
  shoes: "👟",
  dupatta: "🧣",
  watch: "⌚",
  bag: "👜",
  headphones: "🎧",
};
