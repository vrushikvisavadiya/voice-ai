"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobPrepDetail, useSubmitAnswers, useGenerateNextQuestion } from "@/app/(platform)/job-prep/use-job-prep";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useMediaPermissions } from "@/hooks/useMediaPermissions";
import type { NextQuestionResponse, SessionAnswer } from "@/app/(platform)/job-prep/job-prep.types";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Wifi,
  WifiOff,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Volume2,
  Send,
  RotateCcw,
  Clock,
  AlertCircle,
  LogOut,
  FileText,
  AlertTriangle,
  Timer,
  X,
} from "lucide-react";

// ─── Stage Types ──────────────────────────────────────────────────────────────
type Stage = "preflight" | "generating" | "session" | "review";

// ─── Exit Confirmation Dialog ─────────────────────────────────────────────────
function ExitConfirmDialog({
  onConfirm,
  onCancel,
  isSubmitting,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card shadow-2xl p-6 space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground">End this interview session?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your progress so far will be submitted for AI evaluation and the round will be marked as{" "}
              <span className="font-semibold text-foreground">completed</span>. You will not be able to re-attempt this round.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            variant="outline"
            className="flex-1 rounded-xl text-sm font-semibold border-border"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Continue Interview
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded-xl text-sm font-semibold gap-2"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4" />
                End & Generate Report
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Already Completed Screen ─────────────────────────────────────────────────
function AlreadyCompletedScreen({ prepId, roundId, roundName }: { prepId: string; roundId: string; roundName?: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-foreground">Round Already Completed</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You have already completed the <span className="font-semibold text-foreground">{roundName || "interview"}</span> round.
            View your detailed performance report below.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="rounded-2xl gap-2 font-bold">
            <Link href={`/job-prep/${prepId}/rounds/${roundId}/report`}>
              <FileText className="h-5 w-5" />
              View Round Report
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-2xl gap-2 font-semibold border-border">
            <Link href={`/job-prep/${prepId}`}>
              <ArrowLeft className="h-5 w-5" />
              Back to Track
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RoundSessionPage({
  params,
}: {
  params: Promise<{ id: string; roundId: string }>;
}) {
  const { id: prepId, roundId } = use(params);
  const router = useRouter();

  const { data: prep } = useJobPrepDetail(prepId);
  const { mutate: submitAnswersMutate, isPending: isSubmitting } = useSubmitAnswers(prepId, roundId);
  const { mutateAsync: generateNextQuestionAsync, isPending: isGenerating } = useGenerateNextQuestion(roundId);

  const currentRound = prep?.rounds.find((r) => r.id === roundId);

  // ─── Hooks ──────────────────────────────────────────────────────────────────
  const { speak, stop: stopSpeaking, isSpeaking, isSupported: ttsSupported } = useSpeechSynthesis();
  const { start: startListening, stop: stopListening, reset: resetTranscript, transcript, interimTranscript, isListening, isSupported: sttSupported } = useSpeechRecognition();
  const { micStatus, cameraStatus, cameraStream, networkLatency, isOnline, requestMic, requestCamera, checkNetwork } = useMediaPermissions();

  // ─── State ───────────────────────────────────────────────────────────────────
  const [stage, setStage] = useState<Stage>("preflight");
  const [currentQuestion, setCurrentQuestion] = useState<NextQuestionResponse | null>(null);
  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>([]);
  const [editedAnswers, setEditedAnswers] = useState<Record<string, string>>({});
  const [isMicActive, setIsMicActive] = useState(false);
  const [networkChecked, setNetworkChecked] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  // Silence-detection auto-advance
  const [silenceCountdown, setSilenceCountdown] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const handleNextQuestionRef = useRef<(() => Promise<void>) | null>(null);

  const TOTAL_QUESTIONS = 5;
  const SILENCE_THRESHOLD_SEC = 3; // auto-advance after 3s of silence

  // ─── Guard: already completed round ──────────────────────────────────────────
  const isRoundCompleted = currentRound?.status === "completed";

  // ─── Camera stream → video element ──────────────────────────────────────────
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // ─── Preflight: auto-check network on mount ──────────────────────────────────
  useEffect(() => {
    const run = async () => {
      await checkNetwork();
      setNetworkChecked(true);
    };
    run();
  }, [checkNetwork]);

  // ─── Silence detection: auto-advance after SILENCE_THRESHOLD_SEC of no new speech ────
  useEffect(() => {
    // Only run when mic is active, we have enough transcript, and not already generating
    const hasEnoughTranscript =
      (transcript || interimTranscript).trim().length >= 10;

    if (!isMicActive || !hasEnoughTranscript || isGenerating || stage !== "session") {
      // Clear any running countdown
      if (silenceTimerRef.current) {
        clearInterval(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      setSilenceCountdown(null);
      return;
    }

    // Reset countdown every time transcript changes (user is still speaking)
    if (silenceTimerRef.current) {
      clearInterval(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    setSilenceCountdown(SILENCE_THRESHOLD_SEC);

    let remaining = SILENCE_THRESHOLD_SEC;
    silenceTimerRef.current = setInterval(() => {
      remaining -= 1;
      setSilenceCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(silenceTimerRef.current!);
        silenceTimerRef.current = null;
        setSilenceCountdown(null);
        // Trigger auto-advance
        handleNextQuestionRef.current?.();
      }
    }, 1000);

    return () => {
      if (silenceTimerRef.current) {
        clearInterval(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, interimTranscript, isMicActive, isGenerating, stage]);

  // ─── Cancel silence auto-advance ─────────────────────────────────────────────
  const cancelSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearInterval(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    setSilenceCountdown(null);
  };

  // ─── Generate first question and start session ───────────────────────────────
  const handleStartSession = useCallback(async () => {
    setStage("generating");
    try {
      const question = await generateNextQuestionAsync({ previous_answers: [] });
      setCurrentQuestion(question);
      setStage("session");
      if (ttsSupported) {
        speak(`Question ${question.question_number}. ${question.question_text}`, () => {
          if (sttSupported) {
            startListening();
            setIsMicActive(true);
          }
        });
      } else if (sttSupported) {
        startListening();
        setIsMicActive(true);
      }
    } catch {
      setStage("preflight");
    }
  }, [generateNextQuestionAsync, speak, startListening, ttsSupported, sttSupported]);

  // ─── Exit mid-session: build partial submit payload and submit ────────────────
  const handleExitAndSubmit = useCallback(() => {
    // Collect answers gathered so far, include current transcript if any
    const allAnswers: SessionAnswer[] = [...sessionAnswers];

    // If there is a current question with a live transcript, save it too
    if (currentQuestion) {
      const currentAnswerText =
        editedAnswers[currentQuestion.id] ?? transcript.trim();
      // Only add if not already in sessionAnswers
      const alreadySaved = allAnswers.some((a) => a.question_id === currentQuestion.id);
      if (!alreadySaved) {
        allAnswers.push({
          question_id: currentQuestion.id,
          question_text: currentQuestion.question_text,
          user_answer: currentAnswerText || "[No answer provided]",
        });
      }
    }

    // Stop all audio/mic
    stopSpeaking();
    stopListening();
    setIsMicActive(false);

    // Submit whatever we have — backend accepts partial answers
    if (allAnswers.length > 0) {
      submitAnswersMutate({
        answers: allAnswers.map((a) => ({
          question_id: a.question_id,
          user_answer: editedAnswers[a.question_id] ?? a.user_answer,
        })),
      });
    } else {
      // Nothing to submit — just navigate back
      router.push(`/job-prep/${prepId}`);
    }
    setShowExitConfirm(false);
  }, [
    sessionAnswers,
    currentQuestion,
    editedAnswers,
    transcript,
    stopSpeaking,
    stopListening,
    submitAnswersMutate,
    router,
    prepId,
  ]);

  // ─── Toggle mic manually ─────────────────────────────────────────────────────
  const handleMicToggle = () => {
    if (isSpeaking) stopSpeaking();
    if (isMicActive) {
      stopListening();
      setIsMicActive(false);
    } else {
      startListening();
      setIsMicActive(true);
    }
  };

  // ─── Save current answer & generate next question ────────────────────────────
  const handleNextQuestion = useCallback(async () => {
    if (!currentQuestion) return;

    // Cancel any pending silence timer
    if (silenceTimerRef.current) {
      clearInterval(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    setSilenceCountdown(null);

    const currentAnswer = transcript.trim() || editedAnswers[currentQuestion.id] || "";
    const newAnswers: SessionAnswer[] = [
      ...sessionAnswers,
      {
        question_id: currentQuestion.id,
        question_text: currentQuestion.question_text,
        user_answer: currentAnswer,
      },
    ];
    setSessionAnswers(newAnswers);

    stopListening();
    setIsMicActive(false);
    resetTranscript();

    if (currentQuestion.is_last) {
      setStage("review");
      return;
    }

    setStage("generating");
    try {
      const nextQ = await generateNextQuestionAsync({
        previous_answers: newAnswers.map((a) => ({
          question_text: a.question_text,
          user_answer: a.user_answer,
        })),
      });
      setCurrentQuestion(nextQ);
      setStage("session");

      if (ttsSupported) {
        speak(`Question ${nextQ.question_number}. ${nextQ.question_text}`, () => {
          if (sttSupported) {
            startListening();
            setIsMicActive(true);
          }
        });
      } else if (sttSupported) {
        startListening();
        setIsMicActive(true);
      }
    } catch {
      setStage("session");
    }
  }, [
    currentQuestion, transcript, editedAnswers, sessionAnswers,
    stopListening, resetTranscript, generateNextQuestionAsync,
    speak, startListening, ttsSupported, sttSupported,
  ]);

  // Keep ref in sync so silence timer can call latest version
  useEffect(() => {
    handleNextQuestionRef.current = handleNextQuestion;
  }, [handleNextQuestion]);

  // ─── Final submit ─────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    submitAnswersMutate({
      answers: sessionAnswers.map((a) => ({
        question_id: a.question_id,
        user_answer: editedAnswers[a.question_id] ?? a.user_answer,
      })),
    });
  };

  const currentTranscriptDisplay = transcript || interimTranscript;
  const canProceed =
    currentTranscriptDisplay.trim().length >= 10 ||
    Boolean(editedAnswers[currentQuestion?.id ?? ""]?.trim());
  const progressPercent = currentQuestion
    ? Math.round(((currentQuestion.question_number - 1) / TOTAL_QUESTIONS) * 100)
    : 0;

  // ════════════════════════════════════════════════════════════════════════════
  // GUARD: Round already completed
  // ════════════════════════════════════════════════════════════════════════════
  if (prep && isRoundCompleted) {
    return (
      <AlreadyCompletedScreen
        prepId={prepId}
        roundId={roundId}
        roundName={currentRound?.name}
      />
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // STAGE: PREFLIGHT
  // ════════════════════════════════════════════════════════════════════════════
  if (stage === "preflight") {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6">
        {/* Back */}
        <div className="absolute top-4 left-4">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Link href={`/job-prep/${prepId}`}>
              <ArrowLeft className="h-4 w-4" /> Back to Track
            </Link>
          </Button>
        </div>

        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Mic className="h-7 w-7" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Pre-flight Check</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Grant permissions and verify your setup before starting the{" "}
              <span className="font-semibold text-foreground">{currentRound?.name}</span> session.
            </p>
          </div>

          <div className="space-y-3">
            {/* Mic */}
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${micStatus === "granted" ? "bg-emerald-500/10 text-emerald-600" : micStatus === "denied" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                  {micStatus === "granted" ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Microphone</p>
                  <p className="text-xs text-muted-foreground">Required for voice answers</p>
                </div>
              </div>
              {micStatus === "granted" ? (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-semibold">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Granted
                </Badge>
              ) : micStatus === "denied" ? (
                <Badge variant="destructive" className="text-xs">Denied</Badge>
              ) : (
                <Button size="sm" variant="outline" className="h-8 text-xs rounded-xl" onClick={requestMic}>
                  Allow Access
                </Button>
              )}
            </div>

            {/* Camera — OPTIONAL */}
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${cameraStatus === "granted" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {cameraStatus === "granted" ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Camera <span className="text-muted-foreground font-normal">(optional)</span></p>
                  <p className="text-xs text-muted-foreground">Self-view during interview</p>
                </div>
              </div>
              {cameraStatus === "granted" ? (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Enabled
                </Badge>
              ) : (
                <Button size="sm" variant="ghost" className="h-8 text-xs rounded-xl text-muted-foreground" onClick={requestCamera}>
                  Enable
                </Button>
              )}
            </div>

            {/* Network */}
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isOnline ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}>
                  {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Network</p>
                  <p className="text-xs text-muted-foreground">
                    {!networkChecked ? "Checking connection..." : isOnline ? networkLatency !== null ? `Connected · ${networkLatency}ms latency` : "Connected" : "No internet connection"}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 text-xs rounded-xl text-muted-foreground" onClick={() => checkNetwork()}>
                Recheck
              </Button>
            </div>

            {/* STT unsupported */}
            {!sttSupported && (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Voice recognition not supported</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Use Chrome or Edge for the full voice experience. You can type your answers instead.
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button
            size="lg"
            className="w-full rounded-2xl gap-2 font-bold text-sm shadow-lg"
            disabled={micStatus !== "granted" || !isOnline}
            onClick={handleStartSession}
          >
            <Mic className="h-5 w-5" />
            Start Voice Interview Session
            <ChevronRight className="h-4 w-4 ml-auto opacity-70" />
          </Button>

          {micStatus === "denied" && (
            <p className="text-center text-xs text-muted-foreground">
              Microphone is required. Enable it in your browser settings and refresh.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // STAGE: GENERATING
  // ════════════════════════════════════════════════════════════════════════════
  if (stage === "generating") {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 animate-pulse">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-bold text-foreground text-base">
            {sessionAnswers.length === 0
              ? "Preparing your first question..."
              : `Preparing question ${sessionAnswers.length + 1} of ${TOTAL_QUESTIONS}...`}
          </p>
          <p className="text-xs text-muted-foreground">
            AI is tailoring the next question based on your answers
          </p>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // STAGE: SESSION (Live voice interview)
  // ════════════════════════════════════════════════════════════════════════════
  if (stage === "session" && currentQuestion) {
    return (
      <>
        {showExitConfirm && (
          <ExitConfirmDialog
            onConfirm={handleExitAndSubmit}
            onCancel={() => setShowExitConfirm(false)}
            isSubmitting={isSubmitting}
          />
        )}

        <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-muted/50 shrink-0">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Header */}
          <header className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-background/95 backdrop-blur-sm shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowExitConfirm(true)}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Exit Session</span>
            </Button>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-semibold px-3 py-1 rounded-full">
                <Mic className="h-3 w-3 mr-1 text-primary" />
                {currentRound?.name}
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                Q{currentQuestion.question_number} / {currentQuestion.total_questions}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isOnline ? (
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Wifi className="h-3 w-3 text-emerald-500" />
                  {networkLatency !== null ? `${networkLatency}ms` : "Online"}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-destructive">
                  <WifiOff className="h-3 w-3" /> Offline
                </span>
              )}
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex gap-0 overflow-hidden">

            {/* Left Panel: Question */}
            <div className="flex-1 flex flex-col justify-between p-6 lg:p-10 border-r border-border/30 min-w-0">
              <div className="space-y-6">
                {/* AI status indicator */}
                <div className="flex items-center gap-2">
                  {isSpeaking ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <span className="flex gap-0.5 items-end h-4">
                        {[1, 2, 3, 4].map((i) => (
                          <span
                            key={i}
                            className="w-0.5 bg-primary rounded-full animate-bounce"
                            style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 0.1}s`, animationDuration: "0.8s" }}
                          />
                        ))}
                      </span>
                      <span className="text-xs font-semibold text-primary">AI Speaking</span>
                      <Volume2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Your turn to answer</span>
                    </div>
                  )}
                </div>

                {/* Question text */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Question {currentQuestion.question_number} of {currentQuestion.total_questions}
                  </span>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground leading-relaxed">
                    {currentQuestion.question_text}
                  </h2>
                  {currentQuestion.expected_answer_guidance && (
                    <p className="text-xs text-muted-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border/40 leading-relaxed">
                      💡 <span className="font-medium">Hint:</span> {currentQuestion.expected_answer_guidance}
                    </p>
                  )}
                </div>
              </div>

              {/* Answered count */}
              {sessionAnswers.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {sessionAnswers.length} answer{sessionAnswers.length !== 1 ? "s" : ""} saved
                </div>
              )}
            </div>

            {/* Right Panel: Camera + Transcript */}
            <div className="w-full max-w-sm lg:max-w-md flex flex-col bg-background">
              {/* Camera preview */}
              <div className="relative bg-muted/30 border-b border-border/30 aspect-video flex items-center justify-center overflow-hidden">
                {cameraStatus === "granted" && cameraStream ? (
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <CameraOff className="h-8 w-8 opacity-40" />
                    <span className="text-xs opacity-60">Camera off</span>
                    {cameraStatus !== "denied" && (
                      <Button size="sm" variant="ghost" className="h-7 text-xs mt-1" onClick={requestCamera}>
                        Enable Camera
                      </Button>
                    )}
                  </div>
                )}
                {isMicActive && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    REC
                  </div>
                )}
              </div>

              {/* Transcript panel */}
              <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Your Answer Transcript
                  </span>
                  {(transcript || interimTranscript) && (
                    <button
                      type="button"
                      onClick={() => { resetTranscript(); setIsMicActive(false); }}
                      className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <RotateCcw className="h-3 w-3" /> Clear
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto">
                  {sttSupported ? (
                    <div className="min-h-[120px] rounded-xl border border-border/60 bg-card/50 p-3 text-sm text-foreground leading-relaxed">
                      {transcript && <span className="text-foreground">{transcript} </span>}
                      {interimTranscript && <span className="text-muted-foreground italic">{interimTranscript}</span>}
                      {!transcript && !interimTranscript && (
                        <span className="text-muted-foreground text-xs italic">
                          {isListening ? "Listening... speak your answer" : "Press the mic button to start speaking"}
                        </span>
                      )}
                    </div>
                  ) : (
                    <textarea
                      rows={6}
                      className="w-full rounded-xl border border-border/60 bg-card/50 p-3 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 leading-relaxed"
                      placeholder="Type your answer here..."
                      value={editedAnswers[currentQuestion.id] ?? ""}
                      onChange={(e) => setEditedAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                    />
                  )}
                </div>

                {/* Silence countdown auto-advance banner */}
                {silenceCountdown !== null && (
                  <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <Timer className="h-3.5 w-3.5 text-amber-500 animate-pulse shrink-0" />
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        Moving to next question in{" "}
                        <span className="font-extrabold tabular-nums">{silenceCountdown}s</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={cancelSilenceTimer}
                      className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 shrink-0"
                    >
                      <X className="h-3 w-3" /> Cancel
                    </button>
                  </div>
                )}

                {/* Mic toggle */}
                {sttSupported && (
                  <button
                    type="button"
                    onClick={handleMicToggle}
                    disabled={isSpeaking}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all ${
                      isMicActive
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600"
                        : isSpeaking
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                    }`}
                  >
                    {isMicActive ? (
                      <><span className="h-2 w-2 rounded-full bg-white animate-pulse" /><MicOff className="h-4 w-4" />Stop Recording</>
                    ) : isSpeaking ? (
                      <><Volume2 className="h-4 w-4 animate-pulse" />AI is Speaking...</>
                    ) : (
                      <><Mic className="h-4 w-4" />Start Recording</>
                    )}
                  </button>
                )}
              </div>

              {/* Next / Finish footer */}
              <div className="p-4 pt-0 border-t border-border/30">
                <Button
                  className="w-full rounded-2xl gap-2 font-bold h-11"
                  disabled={!canProceed || isGenerating}
                  onClick={handleNextQuestion}
                >
                  {isGenerating ? (
                    <><Sparkles className="h-4 w-4 animate-spin" />Generating next question...</>
                  ) : currentQuestion.is_last ? (
                    <><CheckCircle2 className="h-4 w-4" />Finish & Review Answers</>
                  ) : (
                    <>Next Question<ChevronRight className="h-4 w-4" /></>
                  )}
                </Button>
                {!canProceed && silenceCountdown === null && (
                  <p className="text-center text-[11px] text-muted-foreground mt-2">
                    {sttSupported ? "Speak at least 10 characters to continue" : "Type at least 10 characters to continue"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // STAGE: REVIEW
  // ════════════════════════════════════════════════════════════════════════════
  if (stage === "review") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Session Complete!</h1>
            <p className="text-sm text-muted-foreground">
              Review your answers below. You can edit them before submitting for AI evaluation.
            </p>
          </div>

          {/* Q&A Review Cards */}
          <div className="space-y-4">
            {sessionAnswers.map((answer, idx) => (
              <div key={answer.question_id} className="rounded-2xl border border-border/70 bg-card p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-bold">
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-sm text-foreground leading-relaxed">{answer.question_text}</p>
                </div>
                <div className="pl-9 space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Your Answer</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border border-border/60 bg-background/60 p-3 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 leading-relaxed"
                    value={editedAnswers[answer.question_id] ?? answer.user_answer}
                    onChange={(e) => setEditedAnswers((prev) => ({ ...prev, [answer.question_id]: e.target.value }))}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 rounded-2xl gap-2 font-bold text-sm shadow-lg"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <><Sparkles className="h-4 w-4 animate-spin" />AI is Evaluating Your Answers...</>
              ) : (
                <><Send className="h-4 w-4" />Submit for AI Evaluation</>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl gap-2 font-semibold text-sm border-border"
              onClick={() => setStage("preflight")}
            >
              <RotateCcw className="h-4 w-4" />
              Restart Session
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
