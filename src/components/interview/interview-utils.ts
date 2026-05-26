export const SAMPLE_DESCRIPTION = `We are looking for a Senior Frontend Engineer to join Acme Labs and build performant product experiences using React, TypeScript, and modern design systems. You will collaborate with product, design, and backend teams, drive frontend architecture decisions, and mentor other engineers. Experience with system design, performance optimization, testing, and communication across teams is important.`;

export const FOCUS_AREA_OPTIONS = [
  "Leadership",
  "Problem Solving",
  "System Design",
  "Communication",
  "Frontend Architecture",
  "Debugging",
  "Product Thinking",
];

export const STEP_LABELS = ["Paste JD", "Configure", "Start"] as const;

export interface DetectionResult {
  role: string;
  company: string;
  skills: string[];
}

const SKILL_PATTERNS: [string, RegExp][] = [
  ["React", /react/i],
  ["TypeScript", /typescript/i],
  ["System Design", /system design/i],
  ["Performance", /performance/i],
  ["Communication", /communication/i],
];

export function detectFromJobDescription(
  value: string,
): DetectionResult | null {
  if (!value.trim()) return null;

  const lower = value.toLowerCase();

  const role = lower.includes("senior frontend")
    ? "Senior Frontend Engineer"
    : lower.includes("product designer")
      ? "Product Designer"
      : "Software Engineer";

  const company =
    value
      .match(/join\s+([A-Z][A-Za-z0-9&\s.-]+?)(?:\s+and|\.|,)/)?.[1]
      ?.trim() ?? "Acme Labs";

  const skills = SKILL_PATTERNS.filter(([, pattern]) =>
    pattern.test(value),
  ).map(([skill]) => skill);

  return {
    role,
    company,
    skills: skills.length
      ? skills
      : ["Problem Solving", "Communication", "Collaboration"],
  };
}
