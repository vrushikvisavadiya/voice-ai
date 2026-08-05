/**
 * useSpeechSynthesis
 * Wraps the browser's Web Speech API SpeechSynthesis for text-to-speech.
 * Automatically selects the best available English voice.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseSpeechSynthesisReturn {
  speak: (text: string, onEnd?: () => void) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  // Pre-load voices (Chrome requires this)
  useEffect(() => {
    if (!isSupported) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const getPreferredVoice = (): SpeechSynthesisVoice | null => {
    if (!isSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    // Prefer natural English voices in priority order
    const preferred = [
      "Google UK English Female",
      "Google US English",
      "Samantha",
      "Alex",
      "Karen",
      "Daniel",
    ];
    for (const name of preferred) {
      const v = voices.find((v) => v.name === name);
      if (v) return v;
    }
    // Fallback: first English voice
    return voices.find((v) => v.lang.startsWith("en")) || voices[0] || null;
  };

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!isSupported) {
        onEnd?.();
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;   // Slightly slower for interview clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voice = getPreferredVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
