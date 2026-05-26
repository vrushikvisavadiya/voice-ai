"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Mic2, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionItem {
  id: number;
  question: string;
  answer: string;
  fillerWords: number;
  wordCount: number;
  feedback: string;
  suggested: string[];
  score: number;
}

interface QuestionAccordionProps {
  questions: QuestionItem[];
}

function scoreTone(score: number) {
  if (score >= 9)
    return "text-emerald-600 border-emerald-500/20 bg-emerald-500/10";
  if (score >= 7) return "text-blue-600 border-blue-500/20 bg-blue-500/10";
  if (score >= 5) return "text-amber-600 border-amber-500/20 bg-amber-500/10";
  return "text-red-600 border-red-500/20 bg-red-500/10";
}

export function QuestionAccordion({ questions }: QuestionAccordionProps) {
  const averageScore =
    questions.length > 0
      ? (
          questions.reduce((sum, question) => sum + question.score, 0) /
          questions.length
        ).toFixed(1)
      : "0";

  const [openSuggested, setOpenSuggested] = React.useState<
    Record<number, boolean>
  >({});

  return (
    <div className="rounded-[32px] border border-border bg-card p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Question Breakdown
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {questions.length} questions · Avg score per question: {averageScore}
          /10
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue={`question-${questions[0]?.id}`}
      >
        {questions.map((item) => {
          const isSuggestedOpen = openSuggested[item.id] ?? false;

          return (
            <AccordionItem key={item.id} value={`question-${item.id}`}>
              <AccordionTrigger className="rounded-2xl px-3 text-left hover:no-underline">
                <div className="flex w-full flex-col gap-3 pr-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      Q{item.id}
                    </Badge>
                    <span className="truncate text-sm font-medium text-foreground sm:text-base">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "w-fit rounded-full border px-3 py-1 text-sm font-medium tabular-nums",
                      scoreTone(item.score),
                    )}
                  >
                    {item.score}/10
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-3 pb-5">
                <div className="space-y-5 rounded-2xl border border-border bg-background p-4 sm:p-5">
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    <p className="text-sm leading-6 text-foreground">
                      {item.question}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Mic2 className="size-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-foreground">
                        Your Answer
                      </h3>
                    </div>

                    <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                      <p className="text-sm leading-7 text-muted-foreground">
                        {item.answer}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {item.wordCount} words · {item.fillerWords} filler words
                        detected
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">
                        Feedback
                      </h3>
                    </div>

                    <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                      <p className="text-sm italic leading-7 text-muted-foreground">
                        {item.feedback}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                      onClick={() =>
                        setOpenSuggested((current) => ({
                          ...current,
                          [item.id]: !current[item.id],
                        }))
                      }
                    >
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-200",
                          isSuggestedOpen && "rotate-180",
                        )}
                      />
                      What a strong answer looks like
                    </button>

                    {isSuggestedOpen ? (
                      <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                        <ul className="space-y-2">
                          {item.suggested.map((point) => (
                            <li
                              key={point}
                              className="text-sm leading-6 text-muted-foreground"
                            >
                              • {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                      Question score
                    </p>
                    <div
                      className={cn(
                        "rounded-full border px-3 py-1 text-sm font-medium tabular-nums",
                        scoreTone(item.score),
                      )}
                    >
                      {item.score}/10
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
