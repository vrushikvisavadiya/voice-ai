import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqItems = [
  {
    id: "item-1",
    question: "Can I switch plans later?",
    answer:
      "Yes. You can upgrade from Free to Pro or Team at any time, and you can change billing between monthly and annual as your needs evolve.",
  },
  {
    id: "item-2",
    question: "What happens if I hit the Free plan limit?",
    answer:
      "Once you use your 3 interviews for the month, you can wait until the next billing cycle or upgrade to Pro for unlimited interviews and full reports.",
  },
  {
    id: "item-3",
    question: "Does Pro include downloadable reports?",
    answer:
      "Yes. Pro unlocks PDF export, complete feedback history, richer AI analysis, and priority support.",
  },
  {
    id: "item-4",
    question: "Who is the Team plan for?",
    answer:
      "Team is built for hiring teams, bootcamps, and coaching programs that need shared reports, team analytics, and admin-level visibility.",
  },
  {
    id: "item-5",
    question: "Do you offer refunds on annual plans?",
    answer:
      "Annual plans are discounted for long-term use. For billing issues or account questions, contact support and we’ll help review your situation.",
  },
];

export function PricingFAQ() {
  return (
    <Card className="rounded-[32px] border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
          Frequently asked questions
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
