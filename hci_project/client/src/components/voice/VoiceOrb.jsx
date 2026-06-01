import { Mic, MicOff } from "lucide-react";
import "./VoiceOrb.css";

export default function VoiceOrb({ listening, supported, interimText, onClick }) {
  return (
    <div className="orb-wrapper" aria-label="Voice input orb">
      <button
        className={`orb ${listening ? "orb--active" : ""} ${!supported ? "orb--disabled" : ""}`}
        onClick={onClick}
        disabled={!supported}
        aria-label={listening ? "Listening… tap to stop" : "Tap to speak"}
        title={supported ? (listening ? "Listening…" : "Tap to speak") : "Speech not supported in this browser"}
      >
        {/* Pulse rings */}
        {listening && (
          <>
            <span className="orb__ring orb__ring--1" />
            <span className="orb__ring orb__ring--2" />
          </>
        )}

        {/* Wave bars */}
        <div className={`orb__bars ${listening ? "orb__bars--active" : ""}`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="orb__bar" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>

        {/* Icon fallback when not listening */}
        {!listening && (
          <div className="orb__icon">
            {supported ? <Mic size={30} strokeWidth={1.8} /> : <MicOff size={28} strokeWidth={1.8} />}
          </div>
        )}
      </button>

      <div className="orb__label">
        {!supported
          ? "Voice unavailable"
          : listening
          ? (interimText || "Listening…")
          : "Tap to speak"}
      </div>
    </div>
  );
}
