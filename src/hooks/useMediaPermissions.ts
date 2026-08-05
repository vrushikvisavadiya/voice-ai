/**
 * useMediaPermissions
 * Handles mic/camera permission requests and network status checking.
 * Camera is always optional — never blocks the session from starting.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PermissionState = "idle" | "granted" | "denied" | "prompt";

interface UseMediaPermissionsReturn {
  micStatus: PermissionState;
  cameraStatus: PermissionState;
  cameraStream: MediaStream | null;
  networkLatency: number | null;
  isOnline: boolean;
  requestMic: () => Promise<PermissionState>;
  requestCamera: () => Promise<PermissionState>;
  checkNetwork: () => Promise<void>;
}

const BACKEND_HEALTH_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/health`
    : "http://localhost:8000/api/v1/health";

export function useMediaPermissions(): UseMediaPermissionsReturn {
  const [micStatus, setMicStatus] = useState<PermissionState>("idle");
  const [cameraStatus, setCameraStatus] = useState<PermissionState>("idle");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [networkLatency, setNetworkLatency] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  const cameraStreamRef = useRef<MediaStream | null>(null);

  // Track online/offline
  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const requestMic = useCallback(async (): Promise<PermissionState> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the test stream immediately — actual recording uses SpeechRecognition
      stream.getTracks().forEach((t) => t.stop());
      setMicStatus("granted");
      return "granted";
    } catch (err: unknown) {
      const error = err as { name?: string };
      if (error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
        setMicStatus("denied");
        return "denied";
      }
      setMicStatus("denied");
      return "denied";
    }
  }, []);

  const requestCamera = useCallback(async (): Promise<PermissionState> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraStreamRef.current = stream;
      setCameraStream(stream);
      setCameraStatus("granted");
      return "granted";
    } catch (err: unknown) {
      const error = err as { name?: string };
      if (error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
        setCameraStatus("denied");
      } else {
        // Device not found or other error — still not blocking
        setCameraStatus("denied");
      }
      return "denied";
    }
  }, []);

  const checkNetwork = useCallback(async (): Promise<void> => {
    if (!navigator.onLine) {
      setIsOnline(false);
      setNetworkLatency(null);
      return;
    }
    const start = performance.now();
    try {
      await fetch(BACKEND_HEALTH_URL, {
        method: "GET",
        cache: "no-cache",
        signal: AbortSignal.timeout(5000),
      });
      const latency = Math.round(performance.now() - start);
      setNetworkLatency(latency);
      setIsOnline(true);
    } catch {
      setNetworkLatency(null);
      // Still mark online if navigator.onLine — server might just be slow
      setIsOnline(navigator.onLine);
    }
  }, []);

  return {
    micStatus,
    cameraStatus,
    cameraStream,
    networkLatency,
    isOnline,
    requestMic,
    requestCamera,
    checkNetwork,
  };
}
