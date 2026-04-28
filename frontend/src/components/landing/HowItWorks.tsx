import { Database, Brain, Bell, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Database,
    num: "01",
    title: "Connect data streams",
    desc: "Plug in clinic visits, weather APIs, district sensors, and pharmacy inventories. Auto-normalized.",
  },
  {
    icon: Brain,
    num: "02",
    title: "AI correlates signals",
    desc: "HealthPredictor service runs continuous correlation across env factors and visit categories.",
  },
  {
    icon: BarChart3,
    num: "03",
    title: "See live forecasts",
    desc: "Dashboards surface patient surges, outbreak zones, and shortage risks per village.",
  },
  {
    icon: Bell,
    num: "04",
    title: "Act on smart alerts",
    desc: "The right people get notified at the right moment — restock, deploy, or escalate.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            How it works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            From raw data to{" "}
            <span className="text-gradient">life-saving decisions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Four steps. Zero infrastructure overhead.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.num} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="glass rounded-2xl p-6 h-full hover:shadow-[var(--shadow-glow)] transition-shadow duration-500">
                <div className="flex items-center justify-between mb-5">
                  <div className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
                    <s.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <span className="text-3xl font-display font-bold text-muted-foreground/30">{s.num}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
