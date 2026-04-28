import { MapPin, AlertTriangle } from "lucide-react";

const districts = [
  { name: "Sundar Nagar", risk: 92, level: "Critical", visits: 412, color: "bg-danger" },
  { name: "Rampur", risk: 78, level: "High", visits: 287, color: "bg-danger/80" },
  { name: "Mohali", risk: 64, level: "High", visits: 245, color: "bg-warning" },
  { name: "Ludhiana", risk: 52, level: "Medium", visits: 198, color: "bg-warning/80" },
  { name: "Patiala", risk: 41, level: "Medium", visits: 167, color: "bg-warning/60" },
  { name: "Bathinda", risk: 28, level: "Low", visits: 124, color: "bg-success/80" },
  { name: "Amritsar", risk: 22, level: "Low", visits: 102, color: "bg-success/70" },
  { name: "Jalandhar", risk: 18, level: "Low", visits: 89, color: "bg-success/60" },
  { name: "Gurdaspur", risk: 14, level: "Low", visits: 67, color: "bg-success/50" },
  { name: "Hoshiarpur", risk: 11, level: "Low", visits: 54, color: "bg-success/40" },
  { name: "Kapurthala", risk: 9, level: "Low", visits: 41, color: "bg-success/30" },
  { name: "Faridkot", risk: 6, level: "Low", visits: 32, color: "bg-success/30" },
];

export function DistrictHeatmap() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              District intelligence
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Every village,{" "}
              <span className="text-gradient">scored in real time</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Outbreak risk scores are calculated from environmental telemetry, visit patterns,
              and seasonal factors — broken down to the village level.
            </p>
            <div className="space-y-3">
              {[
                { color: "bg-danger", label: "Critical risk · immediate action" },
                { color: "bg-warning", label: "Elevated · monitor closely" },
                { color: "bg-success", label: "Stable · routine surveillance" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-3 text-sm">
                  <span className={`h-3 w-3 rounded-full ${l.color}`} />
                  <span className="text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-display font-semibold">Punjab region · 12 districts</h3>
                </div>
                <span className="flex items-center gap-1 text-xs text-danger font-medium">
                  <AlertTriangle className="h-3 w-3" />
                  3 critical zones
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {districts.map((d, i) => (
                  <div
                    key={d.name}
                    className="group relative rounded-2xl p-4 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className={`absolute inset-0 ${d.color} opacity-90`} />
                    <div className="relative">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-white/80 mb-1">
                        {d.level}
                      </p>
                      <p className="font-display font-bold text-white text-sm leading-tight mb-2">
                        {d.name}
                      </p>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-display font-bold text-white">{d.risk}</span>
                        <span className="text-[10px] text-white/80">{d.visits} visits</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
