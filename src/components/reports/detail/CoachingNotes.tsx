import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Code2, Mic2 } from "lucide-react";

interface CoachingNote {
  icon: "Mic2" | "Code2" | "Award";
  title: string;
  note: string;
}

interface CoachingNotesProps {
  notes: CoachingNote[];
}

const iconMap = {
  Mic2,
  Code2,
  Award,
};

export function CoachingNotes({ notes }: CoachingNotesProps) {
  return (
    <Card className="rounded-[32px] border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          Coach&apos;s Notes
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized recommendations based on your session
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {notes.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <div
                key={item.title}
                className="rounded-[28px] border border-border bg-background p-5"
              >
                <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card">
                  <Icon className="size-4 text-foreground" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.note}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-[28px] border border-border bg-background p-5">
          <h3 className="text-base font-semibold text-foreground">
            Next Steps
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-foreground">
                Suggested focus
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Practice concise behavioral responses with stronger measurable
                outcomes and clearer result framing.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                Recommended next session
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Run a Mixed interview next, with extra emphasis on technical
                depth and structured storytelling.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
