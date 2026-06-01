import { useEffect, useRef, useState } from "react";

export function useSpeech({ onResult, onInterim } = {}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  const onInterimRef = useRef(onInterim);

  useEffect(() => { onResultRef.current = onResult; }, [onResult]);
  useEffect(() => { onInterimRef.current = onInterim; }, [onInterim]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-PK";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      setListening(true);
      setError(null);
      setInterimText("");
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += transcript;
        else interim += transcript;
      }
      if (interim) {
        setInterimText(interim);
        onInterimRef.current?.(interim);
      }
      if (final) {
        setInterimText("");
        onResultRef.current?.(final.trim());
      }
    };

    recognition.onerror = (event) => {
      setListening(false);
      setInterimText("");
      if (event.error !== "no-speech") setError(event.error);
    };

    recognition.onend = () => {
      setListening(false);
      setInterimText("");
    };

    recognitionRef.current = recognition;
    setSupported(true);
  }, []);

  function startListening() {
    if (!recognitionRef.current || listening) return;
    try {
      recognitionRef.current.start();
    } catch {
      /* already started */
    }
  }

  function stopListening() {
    if (!recognitionRef.current || !listening) return;
    recognitionRef.current.stop();
  }

  return { supported, listening, interimText, error, startListening, stopListening };
}

export function useTTS() {
  const [enabled, setEnabled] = useState(true);

  function speak(text, lang = "en-PK") {
    if (!enabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    window.speechSynthesis.speak(utterance);
  }

  function cancel() {
    window.speechSynthesis?.cancel();
  }

  return { enabled, setEnabled, speak, cancel };
}
