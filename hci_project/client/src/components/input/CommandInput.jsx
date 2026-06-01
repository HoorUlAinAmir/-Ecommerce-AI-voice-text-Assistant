import { Send, Volume2, VolumeX, Loader2 } from "lucide-react";
import "./CommandInput.css";

export default function CommandInput({
  value,
  onChange,
  onSubmit,
  busy,
  voiceEnabled,
  onVoiceToggle,
  interimText,
  listening,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }

  const displayValue = listening && interimText ? interimText : value;

  return (
    <form className="cmd-form" onSubmit={handleSubmit} noValidate>
      <div className={`cmd-input-wrap ${listening ? "cmd-input-wrap--listening" : ""}`}>
        <input
          className="cmd-input"
          type="text"
          value={displayValue}
          onChange={(e) => {
            if (!listening) onChange(e.target.value);
          }}
          placeholder="Type: show me red shoes under 5000 …"
          aria-label="Shopping command"
          disabled={busy}
          autoComplete="off"
        />
        {listening && <span className="cmd-cursor" aria-hidden="true" />}
      </div>

      <button
        type="submit"
        className="cmd-send"
        disabled={busy || (!value.trim() && !interimText)}
        aria-label="Send command"
      >
        {busy ? (
          <Loader2 size={18} className="spin" />
        ) : (
          <Send size={17} strokeWidth={2.2} />
        )}
        <span>{busy ? "Sending…" : "Send"}</span>
      </button>

      <button
        type="button"
        className={`cmd-tts ${voiceEnabled ? "cmd-tts--on" : "cmd-tts--off"}`}
        onClick={onVoiceToggle}
        aria-label={voiceEnabled ? "Mute voice reply" : "Enable voice reply"}
        title={voiceEnabled ? "Voice reply ON" : "Voice reply OFF"}
      >
        {voiceEnabled ? <Volume2 size={17} strokeWidth={2} /> : <VolumeX size={17} strokeWidth={2} />}
      </button>
    </form>
  );
}
