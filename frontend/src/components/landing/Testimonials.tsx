import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "HCarePlus predicted the dengue surge 11 days before our usual indicators. We restocked, alerted villages, and avoided a crisis.",
    name: "Dr. Priya Menon",
    role: "District Health Officer · Sundar Nagar",
    initials: "PM",
  },
  {
    quote: "The shortage risk scoring is uncanny. We've cut emergency procurement runs by 62% this quarter.",
    name: "Rahul Verma",
    role: "Pharmacy Lead · 14 rural clinics",
    initials: "RV",
  },
  {
    quote: "Our doctors finally have a tool that respects clinical workflows. The interface is genuinely beautiful.",
    name: "Dr. Amara Singh",
    role: "Medical Director · CarePoint",
    initials: "AS",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Voices from the field
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Loved by clinicians who{" "}
            <span className="text-gradient">refuse compromise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="glass rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="grid place-items-center h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-display font-semibold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
