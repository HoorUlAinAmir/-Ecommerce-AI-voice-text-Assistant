import { useEffect, useRef } from "react";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import { useAssistant } from "./hooks/useAssistant";
import { useSpeech, useTTS } from "./hooks/useSpeech";
import "./styles/global.css";

export default function App() {
  const assistant = useAssistant();
  const tts = useTTS();
  const onResultRef = useRef(null);

  const speech = useSpeech({
    onResult: (text) => {
      onResultRef.current?.(text);
    },
  });

  /* Expose ref so HomePage can set the callback */
  speech.onResultRef = onResultRef;

  useEffect(() => {
    assistant.loadInitial();
  }, []);

  async function handleSend(text) {
    return assistant.send(text);
  }

  return (
    <div className="app-root">
      <Header
        cartCount={assistant.state.cart?.length || 0}
        apiStatus={assistant.apiStatus}
        onReset={assistant.resetSession}
      />

      <HomePage
        assistantState={{ state: assistant.state }}
        products={assistant.products}
        history={assistant.history}
        busy={assistant.busy}
        onSend={handleSend}
        speech={speech}
        tts={tts}
      />
    </div>
  );
}
