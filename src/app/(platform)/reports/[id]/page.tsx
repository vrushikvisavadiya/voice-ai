import { Separator } from "@/components/ui/separator";
import { ReportHeader } from "@/components/reports/detail/ReportHeader";
import { ExecutiveSummary } from "@/components/reports/detail/ExecutiveSummary";
import { ScoreTrendChart } from "@/components/reports/detail/ScoreTrendChart";
import { QuestionAccordion } from "@/components/reports/detail/QuestionAccordion";
import { SkillRadarChart } from "@/components/reports/detail/SkillRadarChart";
import { CoachingNotes } from "@/components/reports/detail/CoachingNotes";

const mockReport = {
  id: "1",
  role: "Senior Frontend Engineer",
  company: "Stripe",
  date: "May 26, 2026",
  duration: "24 mins",
  type: "Mixed",
  difficulty: "Hard",
  overallScore: 78,
  grade: "Good",
  categories: {
    communication: 82,
    technical: 74,
    confidence: 80,
    relevance: 76,
  },
  strengths: [
    "Clear and structured answers throughout",
    "Strong use of real-world examples",
    "Good pacing and articulation",
  ],
  improvements: [
    "Reduce filler words like 'um' and 'basically'",
    "Add more technical depth to system design answers",
    "Be more concise in behavioral responses",
  ],
  scoreTrend: [
    { date: "Apr 10", score: 61 },
    { date: "Apr 18", score: 65 },
    { date: "Apr 25", score: 70 },
    { date: "May 2", score: 68 },
    { date: "May 8", score: 73 },
    { date: "May 14", score: 75 },
    { date: "May 20", score: 72 },
    { date: "May 26", score: 78 },
  ],
  radarData: [
    { skill: "Communication", score: 82 },
    { skill: "Technical", score: 74 },
    { skill: "Confidence", score: 80 },
    { skill: "Relevance", score: 76 },
    { skill: "Structure", score: 79 },
  ],
  questions: [
    {
      id: 1,
      question:
        "Tell me about yourself and why you're interested in this role at Stripe.",
      answer:
        "I'm a frontend engineer with 5 years of experience specializing in React and TypeScript. I've worked at two startups and one mid-size company. I'm interested in Stripe because of the scale of their frontend challenges and their focus on developer experience.",
      fillerWords: 3,
      wordCount: 52,
      feedback:
        "Good opening that covers your background clearly. However, you could better connect your specific experience to Stripe's mission around financial infrastructure. Mentioning a specific Stripe product you've used or admired would strengthen this answer.",
      suggested: [
        "Open with your most relevant experience first",
        "Name a specific Stripe product or challenge you find compelling",
        "End with a forward-looking statement about what you'd contribute",
      ],
      score: 8,
    },
    {
      id: 2,
      question:
        "Describe a time you had to optimize a slow frontend application.",
      answer:
        "Um, so at my last job we had a dashboard that was taking like 8 seconds to load. I basically used React DevTools to profile it and found some um unnecessary re-renders. I memoized some components and it got down to 2 seconds.",
      fillerWords: 4,
      wordCount: 48,
      feedback:
        "The technical content is solid and shows real experience. However, the answer lacks structure — use the STAR method (Situation, Task, Action, Result) to make it more compelling. Also reduce filler words which undermine your confidence.",
      suggested: [
        "State the business impact of the problem first",
        "Walk through your diagnostic process step by step",
        "Quantify the result with specific metrics",
        "Mention what you learned or would do differently",
      ],
      score: 7,
    },
    {
      id: 3,
      question: "How do you approach accessibility in your frontend work?",
      answer:
        "I make sure to use semantic HTML and ARIA labels where needed. I also test with keyboard navigation and try to follow WCAG guidelines. At my last company I introduced an accessibility checklist for PRs.",
      fillerWords: 0,
      wordCount: 38,
      feedback:
        "Excellent answer. You demonstrated practical knowledge, mentioned a concrete initiative you led, and referenced industry standards. This was one of your strongest responses.",
      suggested: [
        "Could mention specific tools like axe or Lighthouse",
        "Could add an example of a specific accessibility bug you caught",
      ],
      score: 9,
    },
    {
      id: 4,
      question:
        "Walk me through how you would design a component library from scratch.",
      answer:
        "I would start with a design token system, then build atomic components first. I'd use Storybook for documentation and testing. I'd make sure to think about theming support from the start and versioning strategy.",
      fillerWords: 1,
      wordCount: 42,
      feedback:
        "Good high-level answer that covers the key considerations. You could go deeper on the decision-making process — for example, how you'd handle cross-team adoption, or how you'd balance flexibility vs consistency in the API design.",
      suggested: [
        "Discuss token architecture (color, spacing, typography)",
        "Address how you'd handle versioning and breaking changes",
        "Mention how you'd get team buy-in and drive adoption",
        "Talk about testing strategy for components",
      ],
      score: 7,
    },
    {
      id: 5,
      question:
        "Tell me about a time you disagreed with a technical decision. How did you handle it?",
      answer:
        "There was a time my team wanted to use a third-party CMS that I thought would create too much vendor lock-in. I wrote up a doc comparing the options and presented it to the team. We ended up going with a more flexible solution.",
      fillerWords: 1,
      wordCount: 46,
      feedback:
        "Strong behavioral answer with a clear narrative. You showed initiative by writing a comparison doc and demonstrated collaborative conflict resolution. Could improve by sharing more about the outcome and what you learned.",
      suggested: [
        "Add what the long-term outcome was",
        "Mention how it affected your relationship with teammates",
        "Reflect on what you'd do differently",
      ],
      score: 8,
    },
  ],
  coachingNotes: [
    {
      icon: "Mic2" as const,
      title: "Work on Conciseness",
      note: "Several of your answers ran longer than needed. Practice the STAR method to keep responses focused and under 2 minutes. Quality over quantity.",
    },
    {
      icon: "Code2" as const,
      title: "Deepen Technical Answers",
      note: "Your technical knowledge is solid but answers sometimes stay surface-level. Push yourself to go one level deeper — trade-offs, edge cases, and specific implementation details.",
    },
    {
      icon: "Award" as const,
      title: "Strong Behavioral Framing",
      note: "Your behavioral answers showed good self-awareness and initiative. Keep using concrete examples and quantifiable outcomes to make these answers memorable.",
    },
  ],
};

export default function ReportDetailPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <ReportHeader
          role={mockReport.role}
          company={mockReport.company}
          date={mockReport.date}
          duration={mockReport.duration}
          type={mockReport.type}
          difficulty={mockReport.difficulty}
          overallScore={mockReport.overallScore}
        />

        <Separator />

        <ExecutiveSummary
          score={mockReport.overallScore}
          grade={mockReport.grade}
          categories={mockReport.categories}
          strengths={mockReport.strengths}
          improvements={mockReport.improvements}
        />

        <ScoreTrendChart data={mockReport.scoreTrend} />

        <QuestionAccordion questions={mockReport.questions} />

        <SkillRadarChart data={mockReport.radarData} />

        <CoachingNotes notes={mockReport.coachingNotes} />
      </div>
    </main>
  );
}
