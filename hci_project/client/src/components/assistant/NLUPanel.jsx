import { currency } from "../../utils/currency";
import "./NLUPanel.css";

const INTENT_COLORS = {
  search_product:   { bg: "#e8f5e9", text: "#2e7d32", label: "Search" },
  add_to_cart:      { bg: "#e3f2fd", text: "#1565c0", label: "Add to Cart" },
  remove_from_cart: { bg: "#fbe9e7", text: "#bf360c", label: "Remove" },
  view_cart:        { bg: "#f3e5f5", text: "#6a1b9a", label: "View Cart" },
  confirm_order:    { bg: "#e8f5e9", text: "#1b5e20", label: "Confirm Order" },
  cancel_order:     { bg: "#fff3e0", text: "#e65100", label: "Cancel" },
  unknown:          { bg: "#f5f5f5", text: "#616161", label: "Unknown" },
  none:             { bg: "#f5f5f5", text: "#9e9e9e", label: "—" },
};

function Pill({ label, value, color, textColor }) {
  return (
    <div className="nlu-pill" style={{ background: color }}>
      <span className="nlu-pill__label">{label}</span>
      <strong className="nlu-pill__value" style={{ color: textColor }}>{value}</strong>
    </div>
  );
}

export default function NLUPanel({ nlu }) {
  if (!nlu) return null;
  const slots = nlu.slots || {};
  const intent = nlu.intent || "none";
  const intentMeta = INTENT_COLORS[intent] || INTENT_COLORS.none;

  return (
    <div className="nlu-panel">
      <span className="nlu-panel__label">NLU Analysis</span>
      <div className="nlu-grid">
        <Pill
          label="Intent"
          value={intentMeta.label}
          color={intentMeta.bg}
          textColor={intentMeta.text}
        />
        <Pill
          label="Category"
          value={slots.category || "—"}
          color="#f5f5f5"
          textColor="#424242"
        />
        <Pill
          label="Color"
          value={slots.color || "—"}
          color="#f5f5f5"
          textColor="#424242"
        />
        <Pill
          label="Max Price"
          value={slots.maxPrice ? currency(slots.maxPrice) : "—"}
          color="#f5f5f5"
          textColor="#424242"
        />
        {slots.quantity && slots.quantity > 1 && (
          <Pill
            label="Qty"
            value={slots.quantity}
            color="#f3e5f5"
            textColor="#6a1b9a"
          />
        )}
      </div>
    </div>
  );
}
