/**
 * useSpeechRecognition
 * Wraps the browser's SpeechRecognition API for real-time speech-to-text.
 * Falls back gracefully on unsupported browsers (Firefox).
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Minimal local typings for the Web Speech API (not in TypeScript's lib.dom by default)
interface SpeechRecognitionResultItem {
  readonly transcript: string;
}
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionResultItem;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

interface UseSpeechRecognitionReturn {
  start: () => void;
  stop: () => void;
  reset: () => void;
  transcript: string;           // Final confirmed transcript
  interimTranscript: string;    // Live in-progress words
  isListening: boolean;
  isSupported: boolean;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognitionImpl = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition
    ) as ISpeechRecognitionConstructor;

    const recognition = new SpeechRecognitionImpl();
    recognition.continuous = true;       // Keep listening until stop() called
    recognition.interimResults = true;   // Show partial results live
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }

      finalTranscriptRef.current = final;
      setTranscript(final.trim());
      setInterimTranscript(interim);
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // Ignore no-speech errors (user just paused)
      if (event.error !== "no-speech" && event.error !== "aborted") {
        console.warn("SpeechRecognition error:", event.error);
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [isSupported]);

  const start = useCallback(() => {
    if (!isSupported || !recognitionRef.current) return;
    try {
      recognitionRef.current.start();
    } catch {
      // Already started — ignore InvalidStateError
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported || !recognitionRef.current) return;
    recognitionRef.current.stop();
  }, [isSupported]);

  const reset = useCallback(() => {
    if (!isSupported || !recognitionRef.current) return;
    try {
      recognitionRef.current.abort();
    } catch {
      // ignore
    }
    finalTranscriptRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setIsListening(false);
  }, [isSupported]);

  return {
    start,
    stop,
    reset,
    transcript,
    interimTranscript,
    isListening,
    isSupported,
  };
}
