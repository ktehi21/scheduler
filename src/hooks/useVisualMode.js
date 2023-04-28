import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(initial, replace = false) {
    setMode(initial);    
    if (!replace) {
      setHistory(prevHistory => [initial, ...prevHistory]);
    }
  }

  function back() {
    if (history.length > 1) {
      setMode(history[1]);
      setHistory(prevHistory => prevHistory.slice(1));
    }
  }

  return { mode, transition, back };
};

