import { useState } from "react";
import { SlidersHorizontal, Package } from "lucide-react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const CATEGORIES = ["all", "kurta", "shoes", "dupatta", "watch", "bag", "headphones"];
const SORTS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "rating", label: "Top Rated" },
];

function sortProducts(products, sort) {
  const arr = [...products];
  if (sort === "price-asc")  return arr.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return arr.sort((a, b) => b.price - a.price);
  if (sort === "rating")     return arr.sort((a, b) => b.rating - a.rating);
  return arr;
}

export default function ProductGrid({ products, resultProducts, busy, onAdd }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const source = resultProducts?.length ? resultProducts : products;
  const filtered = activeCategory === "all"
    ? source
    : source.filter((p) => p.category === activeCategory);
  const sorted = sortProducts(filtered, sort);

  return (
    <section className="product-section">
      <div className="product-section__head">
        <div className="product-section__info">
          <Package size={18} strokeWidth={2} />
          <div>
            <h2 className="product-section__title">
              {resultProducts?.length ? "Search Results" : "All Products"}
            </h2>
            <p className="product-section__count">{sorted.length} item{sorted.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="product-section__controls">
          <SlidersHorizontal size={15} />
          <select
            className="product-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-filter-bar" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${activeCategory === cat ? "filter-chip--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="product-empty">
          <Package size={44} strokeWidth={1.1} />
          <p>No products found</p>
          <small>Try a different filter or search command</small>
        </div>
      ) : (
        <div className="product-grid">
          {sorted.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAdd}
              busy={busy}
            />
          ))}
        </div>
      )}
    </section>
  );
}
