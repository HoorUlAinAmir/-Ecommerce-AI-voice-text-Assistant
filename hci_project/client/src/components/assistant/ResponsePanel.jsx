import { Bot, Globe } from "lucide-react";
import NLUPanel from "./NLUPanel";
import "./ResponsePanel.css";

const LANG_LABELS = {
  english: { label: "English", flag: "🇬🇧" },
  urdu: { label: "اردو", flag: "🇵🇰" },
  "roman-urdu": { label: "Roman Urdu", flag: "🇵🇰" },
  "code-switched": { label: "Bilingual", flag: "🔀" },
  ready: { label: "Ready", flag: "🎙️" },
  none: { label: "—", flag: "" },
};

export default function ResponsePanel({ response, nlu, busy }) {
  const langInfo = LANG_LABELS[nlu?.language] || LANG_LABELS.none;

  return (
    <div className="resp-panel">
      <div className="resp-panel__head">
        <div className="resp-panel__title">
          <Bot size={18} strokeWidth={2} />
          <span>Assistant Response</span>
        </div>
        <div className="resp-lang-badge">
          <Globe size={13} />
          <span>{langInfo.flag} {langInfo.label}</span>
        </div>
      </div>

      <div className={`resp-bubble ${busy ? "resp-bubble--busy" : ""}`}>
        {busy ? (
          <div className="resp-dots" aria-label="Thinking">
            <span /><span /><span />
          </div>
        ) : (
          <p className="resp-text animate-slide-up" key={response}>
            {response}
          </p>
        )}
      </div>

      <NLUPanel nlu={nlu} />
    </div>
  );
}
