import { useMemo, useRef, useState } from "react";

const MAX_HISTORY = 6;

const emptyState = {
  response: "Type or speak a command to begin. Try saying 'show me blue kurta' or tap the mic!",
  nlu: { intent: "none", language: "ready", slots: {} },
  cart: [],
  results: [],
  total: 0,
};

export function useAssistant() {
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const [state, setState] = useState(emptyState);
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  const [apiStatus, setApiStatus] = useState("connecting");
  const abortRef = useRef(null);

  async function loadInitial() {
    try {
      const [productRes, healthRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/health"),
      ]);
      const { products: p } = await productRes.json();
      const health = await healthRes.json();
      setProducts(p || []);
      setApiStatus(health.database === "mongodb" ? "MongoDB" : "Memory");
    } catch {
      setApiStatus("Offline");
    }
  }

  async function send(text) {
    const trimmed = text.trim();
    if (!trimmed || busy) return null;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, command: trimmed }),
        signal: abortRef.current.signal,
      });
      const data = await res.json();
      setState(data);
      setHistory((prev) => [
        { id: Date.now(), text: trimmed, response: data.response, nlu: data.nlu },
        ...prev,
      ].slice(0, MAX_HISTORY));
      return data;
    } catch (err) {
      if (err.name === "AbortError") return null;
      const fallback = {
        ...emptyState,
        response: "Server unreachable. Please start the backend with npm run dev.",
      };
      setState(fallback);
      return fallback;
    } finally {
      setBusy(false);
    }
  }

  async function resetSession() {
    try {
      await fetch("/api/session/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch { /* ignore */ }
    setState(emptyState);
    setHistory([]);
  }

  return {
    state, products, history, busy, apiStatus,
    send, resetSession, loadInitial,
  };
}
