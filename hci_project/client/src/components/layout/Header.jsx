import { ShoppingBag, Wifi, WifiOff, RotateCcw } from "lucide-react";
import "./Header.css";

export default function Header({ cartCount, apiStatus, onReset, onCartClick }) {
  const online = apiStatus !== "Offline" && apiStatus !== "connecting";

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__logo">
            <ShoppingBag size={22} strokeWidth={2.2} />
          </div>
          <div className="header__titles">
            <span className="header__title-en">VoiceBazaar</span>
            <span className="header__title-ur" lang="ur">آواز بازار</span>
          </div>
        </div>

        <nav className="header__nav">
          <span className="header__tagline">Bilingual Voice Shopping · English &amp; اردو</span>
        </nav>

        <div className="header__actions">
          <div className={`header__status ${online ? "header__status--ok" : "header__status--err"}`}>
            {online ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span>{apiStatus}</span>
          </div>

          <button
            className="header__cart-btn"
            onClick={onCartClick}
            aria-label="Open cart"
          >
            <ShoppingBag size={19} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="header__cart-badge">{cartCount}</span>
            )}
          </button>

          <button
            className="header__reset-btn"
            onClick={onReset}
            title="Reset session"
            aria-label="Reset session"
          >
            <RotateCcw size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
