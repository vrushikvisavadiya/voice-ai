import { AnimatedSection } from "@/components/marketing/animated-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can I practice for a specific job description?",
    a: "Yes. Paste the job description and the interview flow is tailored around the role, responsibilities, and likely expectations.",
  },
  {
    q: "Does it only work for technical interviews?",
    a: "No. It is useful for technical, product, operations, customer-facing, and general behavioral interview preparation.",
  },
  {
    q: "Will I get feedback after every session?",
    a: "Yes. Each completed interview can return structured feedback, scores, and coaching notes you can review later.",
  },
  {
    q: "Can I track progress over time?",
    a: "Yes. Reports and history help users revisit sessions and measure improvement across attempts.",
  },
];

export function FaqSection() {
  return (
    <AnimatedSection
      id="faq"
      className="px-4 py-10 md:px-6 md:py-16"
      delay={0.1}
    >
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/60 bg-card px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Questions candidates usually ask first
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-8 w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-muted-foreground md:text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AnimatedSection>
  );
}
