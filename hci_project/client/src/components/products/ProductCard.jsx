import { ShoppingCart, Star } from "lucide-react";
import { currency } from "../../utils/currency";
import "./ProductCard.css";

const CATEGORY_GRADIENTS = {
  kurta:       "linear-gradient(135deg, #00897b 0%, #004d40 100%)",
  shoes:       "linear-gradient(135deg, #c62828 0%, #37474f 100%)",
  dupatta:     "linear-gradient(135deg, #7b1fa2 0%, #e91e63 100%)",
  watch:       "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
  bag:         "linear-gradient(135deg, #ef6c00 0%, #bf360c 100%)",
  headphones:  "linear-gradient(135deg, #283593 0%, #4a148c 100%)",
};

const CATEGORY_EMOJI = {
  kurta: "👕", shoes: "👟", dupatta: "🧣", watch: "⌚", bag: "👜", headphones: "🎧",
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="product-stars" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={11}
          strokeWidth={1.5}
          fill={i < full ? "#f9a825" : i === full && half ? "#f9a825" : "none"}
          color={i < full || (i === full && half) ? "#f9a825" : "#ccc"}
        />
      ))}
      <span className="product-stars__val">{rating}</span>
    </div>
  );
}

export default function ProductCard({ product, onAdd, busy }) {
  const gradient = CATEGORY_GRADIENTS[product.category] || CATEGORY_GRADIENTS.kurta;
  const emoji = CATEGORY_EMOJI[product.category] || "📦";
  const inStock = product.stock > 0;

  return (
    <article className={`product-card ${!inStock ? "product-card--out" : ""}`}>
      <div
        className="product-card__media"
        style={{ background: gradient }}
        aria-label={`${product.category} product`}
      >
        <span className="product-card__emoji">{emoji}</span>
        <div className="product-card__badges">
          <span className="product-card__category-badge">{product.category}</span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="product-card__low-stock">Only {product.stock} left</span>
          )}
          {!inStock && (
            <span className="product-card__out-badge">Out of Stock</span>
          )}
        </div>
        <div
          className="product-card__color-dot"
          style={{ background: COLOR_HEX[product.color] || product.color }}
          title={product.color}
        />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__urdu" lang="ur">{product.urdu}</p>
        <StarRating rating={product.rating} />
        <div className="product-card__meta">
          <strong className="product-card__price">{currency(product.price)}</strong>
          <span className="product-card__color-label">{product.color}</span>
        </div>
        <button
          className="product-card__add"
          onClick={() => onAdd(product)}
          disabled={busy || !inStock}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={15} strokeWidth={2.2} />
          <span>{!inStock ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>
    </article>
  );
}

const COLOR_HEX = {
  red: "#e53935", blue: "#1e88e5", green: "#43a047",
  white: "#f5f5f5", black: "#212121", brown: "#6d4c41",
};
