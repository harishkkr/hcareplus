import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the predictive AI engine actually work?",
    a: "HealthPredictor correlates environmental telemetry (temperature, humidity, AQI, water quality, rainfall) with historical patient visit patterns by symptom category, age group, and village. It outputs a real-time outbreak risk score per district with Low/Medium/High alerts.",
  },
  {
    q: "What data sources do I need to connect?",
    a: "At minimum: clinic visit records (we provide a simple form). Optionally: weather APIs, district sensor feeds, pharmacy inventory exports, and water quality reports. We auto-normalize via FastAPI + SQLModel.",
  },
  {
    q: "Is patient data secure?",
    a: "Yes. All data is encrypted in transit and at rest. We're HIPAA-aligned, and our State tier supports on-prem deployment for full sovereignty.",
  },
  {
    q: "Can it run offline in remote clinics?",
    a: "Yes. The clinic-side app is offline-first and syncs when connectivity returns. Predictions degrade gracefully to local heuristics when the AI service is unreachable.",
  },
  {
    q: "How accurate are the shortage predictions?",
    a: "Our shortage_risk_score combines daily usage rates, current stock, expiry windows, and supplier lead times. In production, we average 91% precision on critical-stock alerts 7 days out.",
  },
  {
    q: "Do you offer training for clinic staff?",
    a: "Every paid plan includes onboarding sessions, video walkthroughs, and a Hindi/English knowledge base. Our State tier includes on-site training.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Frequently asked
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass rounded-2xl border-0 px-6 data-[state=open]:shadow-[var(--shadow-card)]"
            >
              <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
