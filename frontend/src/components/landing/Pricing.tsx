import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Clinic",
    price: "$0",
    period: "Free forever · single clinic",
    features: ["Up to 500 patient visits/mo", "Basic predictions", "Inventory tracking", "Email alerts"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "District",
    price: "$249",
    period: "/mo · up to 25 clinics",
    features: ["Unlimited visits", "Advanced AI predictions", "District heatmaps", "SMS + email alerts", "Priority support", "Custom integrations"],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "State",
    price: "Custom",
    period: "100+ clinics · government tier",
    features: ["Everything in District", "Dedicated AI tuning", "On-prem deployment", "SLA + 24/7 support", "Compliance audits"],
    cta: "Talk to sales",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Simple pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Built for{" "}
            <span className="text-gradient">every scale</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From a single rural clinic to a state-wide deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 animate-fade-in-up ${
                t.highlight
                  ? "bg-gradient-to-br from-primary to-primary-deep text-primary-foreground shadow-[var(--shadow-glow)] lg:scale-105"
                  : "glass"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="font-display font-semibold text-xl mb-2">{t.name}</h3>
              <div className="mb-1">
                <span className="text-4xl font-display font-bold">{t.price}</span>
              </div>
              <p className={`text-sm mb-6 ${t.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {t.period}
              </p>
              <Button
                className={`w-full rounded-full mb-6 ${
                  t.highlight
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {t.cta}
              </Button>
              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${t.highlight ? "text-primary-foreground" : "text-primary"}`} />
                    <span className={t.highlight ? "text-primary-foreground/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
