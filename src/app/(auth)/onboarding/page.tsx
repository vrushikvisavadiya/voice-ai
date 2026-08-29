"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  Award,
  Code2,
  Building2,
  UserCheck,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";

const ROLE_PRESETS = [
  "Senior Full Stack Engineer",
  "Frontend Engineer (React / Next.js)",
  "Backend Engineer (Python / FastAPI)",
  "AI / Machine Learning Engineer",
  "DevOps & Infrastructure Engineer",
  "Product Manager",
  "Data Engineer",
];

const EXPERIENCE_LEVELS = [
  { id: "Entry", title: "Entry Level", desc: "0-2 years of professional experience" },
  { id: "Mid", title: "Mid Level", desc: "2-5 years of hands-on experience" },
  { id: "Senior", title: "Senior Level", desc: "5-8 years of domain expertise" },
  { id: "Lead", title: "Lead / Staff", desc: "8+ years leading systems & teams" },
];

const POPULAR_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "System Design",
  "AWS",
  "Docker",
  "Kubernetes",
  "Tailwind CSS",
  "GraphQL",
  "Git",
];

const INDUSTRY_PRESETS = [
  "SaaS & Cloud Platforms",
  "FinTech & Banking",
  "AI & Deep Learning",
  "E-Commerce & Retail",
  "HealthTech",
  "Cybersecurity",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { submitOnboardingAsync, isSubmittingOnboarding } = useUserProfile();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Senior");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Python"]);
  const [customSkill, setCustomSkill] = useState("");
  const [targetIndustry, setTargetIndustry] = useState("SaaS & Cloud Platforms");
  const [bio, setBio] = useState("");

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
      setSkills((prev) => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !targetRole.trim()) return;
    if (step < 3) setStep((prev) => (prev + 1) as 2 | 3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) return;

    try {
      await submitOnboardingAsync({
        target_role: targetRole.trim(),
        experience_level: experienceLevel,
        primary_skills: skills,
        target_industry: targetIndustry,
        bio: bio.trim() || undefined,
      });
      router.push("/dashboard");
    } catch {
      // Handled by hook error toast
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-8">
      {/* Brand Header */}
      <header className="mx-auto w-full max-w-4xl flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md">
            <Sparkles className="size-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Crack My Interview
          </span>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span className={cn(step >= 1 && "text-primary")}>1. Role</span>
          <span>•</span>
          <span className={cn(step >= 2 && "text-primary")}>2. Skills</span>
          <span>•</span>
          <span className={cn(step >= 3 && "text-primary")}>3. Review</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-2xl my-auto py-8">
        <Card className="rounded-3xl border border-border/60 bg-card shadow-xl p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* STEP 1: Target Role & Experience Level */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="space-y-1 text-center sm:text-left">
                  <Badge variant="outline" className="gap-1 border-primary/30 text-primary mb-2">
                    <Briefcase className="size-3" />
                    Step 1 of 3
                  </Badge>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    What role are you targeting?
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    We personalize mock interview questions and evaluation criteria to your target role.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="role" className="text-xs font-semibold">
                    Target Job Title
                  </Label>
                  <Input
                    id="role"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g., Senior Full Stack Engineer"
                    className="h-12 rounded-2xl text-base px-4 bg-muted/20 border-border/80 focus-visible:ring-primary"
                  />

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {ROLE_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTargetRole(preset)}
                        className={cn(
                          "rounded-xl px-3 py-1.5 text-xs font-medium border transition-all",
                          targetRole === preset
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-semibold">Experience Level</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <div
                        key={level.id}
                        onClick={() => setExperienceLevel(level.id)}
                        className={cn(
                          "cursor-pointer rounded-2xl border p-4 transition-all text-left",
                          experienceLevel === level.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border/60 hover:bg-muted/30"
                        )}
                      >
                        <p className="text-sm font-bold text-foreground">{level.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{level.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Skills & Target Industry */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="space-y-1 text-center sm:text-left">
                  <Badge variant="outline" className="gap-1 border-indigo-500/30 text-indigo-500 mb-2">
                    <Code2 className="size-3" />
                    Step 2 of 3
                  </Badge>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Select your primary skills
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Choose the technical & domain skills you want tested in your mock interviews.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-semibold">Primary Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SKILLS.map((skill) => {
                      const isSelected = skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={cn(
                            "rounded-xl px-3.5 py-1.5 text-xs font-medium border transition-all flex items-center gap-1.5",
                            isSelected
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                              : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {isSelected && <CheckCircle2 className="size-3.5" />}
                          {skill}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Skill */}
                  <div className="flex items-center gap-2 pt-2">
                    <Input
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomSkill();
                        }
                      }}
                      placeholder="Add custom skill..."
                      className="h-10 rounded-xl text-xs bg-muted/20 border-border/70"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addCustomSkill}
                      className="h-10 rounded-xl px-3 text-xs"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>

                  {/* Active Selected Skills Chips */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                      <span className="text-[11px] text-muted-foreground self-center mr-1">
                        Selected ({skills.length}):
                      </span>
                      {skills.map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="gap-1 text-xs py-1 px-2.5 rounded-lg"
                        >
                          {s}
                          <X
                            className="size-3 cursor-pointer hover:text-destructive"
                            onClick={() => toggleSkill(s)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-semibold">Target Industry / Sector</Label>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRY_PRESETS.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => setTargetIndustry(ind)}
                        className={cn(
                          "rounded-xl px-3.5 py-2 text-xs font-medium border transition-all",
                          targetIndustry === ind
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Summary & Candidate Bio */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="space-y-1 text-center sm:text-left">
                  <Badge variant="outline" className="gap-1 border-emerald-500/30 text-emerald-500 mb-2">
                    <UserCheck className="size-3" />
                    Step 3 of 3
                  </Badge>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Review candidate summary
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Confirm your onboarding preferences before entering your workspace.
                  </p>
                </div>

                {/* Preferences Summary Card */}
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground">Target Role</span>
                    <span className="font-bold text-foreground text-sm">{targetRole}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground">Experience Level</span>
                    <Badge variant="outline" className="border-primary/40 text-primary font-semibold">
                      {experienceLevel} Level
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground">Target Industry</span>
                    <span className="font-medium text-foreground">{targetIndustry}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground">Primary Skills Index</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[11px] py-0.5 px-2">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs font-semibold">
                    Short Bio / Summary (Optional)
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Briefly describe your career background or main interview goals..."
                    className="min-h-[90px] rounded-2xl text-xs bg-muted/20 border-border/70 p-3"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border/40">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="rounded-2xl px-5 h-11 text-xs gap-1.5"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={step === 1 && !targetRole.trim()}
                  className="rounded-2xl px-6 h-11 font-semibold text-xs gap-1.5 shadow-sm"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmittingOnboarding}
                  className="rounded-2xl px-7 h-11 font-semibold text-xs gap-2 shadow-md bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {isSubmittingOnboarding ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Setting Up Workspace...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <CheckCircle2 className="size-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-4xl text-center py-4 text-xs text-muted-foreground">
        © 2026 Crack My Interview Inc. All rights reserved.
      </footer>
    </div>
  );
}
