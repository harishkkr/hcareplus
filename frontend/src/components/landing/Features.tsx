import { Brain, CloudRain, Pill, MapPin, Bell, Activity } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Predictive AI engine",
    desc: "Correlates temperature, humidity, AQI, and rainfall with patient visits to forecast outbreaks 7-14 days ahead.",
    accent: "from-primary/20 to-primary-glow/10",
  },
  {
    icon: Pill,
    title: "Smart inventory alerts",
    desc: "Tracks expiry, reorder levels, and daily usage rates. Auto-scores shortage risk per medicine, per clinic.",
    accent: "from-accent/20 to-primary/10",
  },
  {
    icon: CloudRain,
    title: "Environmental telemetry",
    desc: "Live AQI, water quality index, and seasonal dengue risk pulled from district sensors and weather APIs.",
    accent: "from-warning/20 to-accent/10",
  },
  {
    icon: MapPin,
    title: "District heatmaps",
    desc: "Village-level disease distribution. Drill into age groups, symptoms categories, and emergency levels.",
    accent: "from-danger/20 to-warning/10",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    desc: "Context-aware alerts route to the right doctor, pharmacist, or district officer. SMS, email, or in-app.",
    accent: "from-primary-glow/20 to-accent/10",
  },
  {
    icon: Activity,
    title: "Live dashboard sync",
    desc: "Generate real-time risk assessments. Backend AI service syncs with FastAPI + SQLModel in milliseconds.",
    accent: "from-success/20 to-primary/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Capabilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Everything your clinic needs,{" "}
            <span className="text-gradient">in one intelligent platform</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From granular patient tracking to predictive medicine restocking — built for resource-constrained healthcare.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass rounded-2xl p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br ${f.accent} mb-5 group-hover:scale-110 transition-transform duration-500`}>
                <f.icon className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
