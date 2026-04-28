import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/api/client";

export function Stats() {
  const { data: backendStats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  const stats = [
    { value: backendStats?.districts_monitored || "24", label: "Districts monitored" },
    { value: backendStats?.active_outbreaks || "3", label: "Active outbreaks" },
    { value: (backendStats?.health_score || "88") + "%", label: "Health score" },
    { value: backendStats?.pending_alerts || "12", label: "Pending alerts" },
  ];

  return (
    <section className="py-16 border-y border-border/60 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <p className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-2">
                {isLoading ? "..." : s.value}
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
