import "./SamplePhrases.css";

const PHRASES = [
  { en: "show me red shoes under 5000", ur: "سرخ جوتے" },
  { en: "mujhe blue kurta dikhao",       ur: "نیلا کرتا" },
  { en: "cart mein 2 kurta add karo",    ur: "کارٹ میں" },
  { en: "mera cart dikhao",              ur: "کارٹ دکھاؤ" },
  { en: "yes place order",              ur: "آرڈر کرو" },
  { en: "black watch dikhao",           ur: "گھڑی دکھاؤ" },
];

export default function SamplePhrases({ onSelect }) {
  return (
    <div className="samples" role="list" aria-label="Sample voice commands">
      <span className="samples__label">Quick commands:</span>
      {PHRASES.map(({ en, ur }) => (
        <button
          key={en}
          className="sample-chip"
          onClick={() => onSelect(en)}
          role="listitem"
          title={ur}
        >
          <span className="sample-chip__en">{en}</span>
          <span className="sample-chip__ur" lang="ur">{ur}</span>
        </button>
      ))}
    </div>
  );
}
