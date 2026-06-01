import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import "./ChatHistory.css";

const LANG_FLAGS = {
  english: "🇬🇧",
  urdu: "🇵🇰",
  "roman-urdu": "🇵🇰",
  "code-switched": "🔀",
};

export default function ChatHistory({ history }) {
  const [expanded, setExpanded] = useState(true);

  if (!history.length) return null;

  return (
    <div className="chat-history">
      <button
        className="chat-history__toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <MessageSquare size={15} />
        <span>Conversation History ({history.length})</span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {expanded && (
        <div className="chat-history__list animate-fade-in">
          {history.map((item) => (
            <div key={item.id} className="chat-entry">
              <div className="chat-entry__user">
                <span className="chat-entry__flag">
                  {LANG_FLAGS[item.nlu?.language] || "💬"}
                </span>
                <span className="chat-entry__text">{item.text}</span>
              </div>
              <div className="chat-entry__bot">
                <span className="chat-entry__bot-label">Bot</span>
                <span className="chat-entry__bot-text">{item.response}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
