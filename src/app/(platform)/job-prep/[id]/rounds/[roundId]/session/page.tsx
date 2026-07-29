"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  useJobPrepDetail,
  useGenerateQuestions,
  useSubmitAnswers,
} from "@/app/(platform)/job-prep/use-job-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Send, Mic, HelpCircle } from "lucide-react";
import type { InterviewQuestionResponse } from "@/app/(platform)/job-prep/job-prep.types";

export default function RoundSessionPage({
  params,
}: {
  params: Promise<{ id: string; roundId: string }>;
}) {
  const { id: prepId, roundId } = use(params);

  const { data: prep, isLoading: isLoadingPrep } = useJobPrepDetail(prepId);
  const { mutate: generateQuestionsMutate, isPending: isGenerating } = useGenerateQuestions(roundId);
  const { mutate: submitAnswersMutate, isPending: isSubmitting } = useSubmitAnswers(prepId, roundId);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentRound = prep?.rounds.find((r) => r.id === roundId);
  const questions: InterviewQuestionResponse[] = currentRound?.questions || [];

  useEffect(() => {
    if (currentRound && questions.length === 0 && !isGenerating) {
      generateQuestionsMutate();
    }
  }, [currentRound, questions.length, isGenerating, generateQuestionsMutate]);

  const handleAnswerChange = (questionId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) return;

    const payloadAnswers = questions.map((q) => ({
      question_id: q.id,
      user_answer: answers[q.id]?.trim() || "",
    }));

    const incomplete = payloadAnswers.filter((a) => a.user_answer.length < 10);
    if (incomplete.length > 0) {
      setValidationError("Please provide an answer (at least 10 characters) for all questions.");
      return;
    }

    setValidationError(null);
    submitAnswersMutate({ answers: payloadAnswers });
  };

  if (isLoadingPrep || isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Sparkles className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm font-medium text-muted-foreground">
          Generating AI tailored interview questions for this round...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/job-prep/${prepId}`} className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Track
          </Link>
        </Button>
        <Badge variant="outline" className="flex items-center gap-1">
          <Mic className="h-3.5 w-3.5 text-primary" />
          {currentRound?.name || "Interview Session"}
        </Badge>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {currentRound?.name} - Mock Practice Session
        </h1>
        <p className="text-sm text-muted-foreground">
          Answer the questions below to receive comprehensive AI feedback and scoring.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, idx) => (
          <Card key={q.id} className="border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base font-semibold flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-bold">
                  {idx + 1}
                </span>
                <span>{q.question_text}</span>
              </CardTitle>
              {q.expected_answer_guidance && (
                <p className="text-xs text-muted-foreground pl-8 flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" /> Hint: {q.expected_answer_guidance}
                </p>
              )}
            </CardHeader>
            <CardContent className="pl-8 space-y-2">
              <Label htmlFor={`q-${q.id}`}>Your Answer</Label>
              <Textarea
                id={`q-${q.id}`}
                rows={4}
                placeholder="Type your response here..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                disabled={isSubmitting}
              />
            </CardContent>
          </Card>
        ))}

        {validationError && (
          <p className="text-xs text-destructive font-medium">{validationError}</p>
        )}

        <Button type="submit" size="lg" className="w-full sm:w-auto gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Sparkles className="h-4 w-4 animate-spin" /> Evaluating Answers with AI...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit Round for Evaluation
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
