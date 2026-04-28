import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { TrendingUp, AlertCircle, Activity, Pill } from "lucide-react";

const flowData = [
  { day: "Mon", visits: 142, predicted: 138 },
  { day: "Tue", visits: 168, predicted: 165 },
  { day: "Wed", visits: 195, predicted: 198 },
  { day: "Thu", visits: 224, predicted: 230 },
  { day: "Fri", visits: 268, predicted: 275 },
  { day: "Sat", visits: 312, predicted: 318 },
  { day: "Sun", visits: 287, predicted: 295 },
];

const stockData = [
  { name: "Paracetamol", stock: 12, risk: 92 },
  { name: "ORS", stock: 28, risk: 78 },
  { name: "Amoxicillin", stock: 45, risk: 54 },
  { name: "Insulin", stock: 67, risk: 32 },
  { name: "Bandages", stock: 84, risk: 18 },
];

const riskColor = (risk: number) =>
  risk > 75 ? "hsl(var(--danger))" : risk > 50 ? "hsl(var(--warning))" : "hsl(var(--success))";

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Live dashboard
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            See your district's health,{" "}
            <span className="text-gradient">in real time</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every chart is wired to live FastAPI endpoints. Predictions update every 60 seconds.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[var(--shadow-card)] animate-fade-in-up">
          {/* Top stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Today's visits", value: "287", change: "+12%", icon: Activity, color: "text-primary" },
              { label: "Outbreak risk", value: "Medium", change: "Sundar district", icon: AlertCircle, color: "text-warning" },
              { label: "Critical stock", value: "3", change: "Action needed", icon: Pill, color: "text-danger" },
              { label: "Forecast accuracy", value: "94.2%", change: "+2.1%", icon: TrendingUp, color: "text-success" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-card/60 backdrop-blur p-4 border border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <p className="text-2xl font-display font-bold">{s.value}</p>
                <p className={`text-xs mt-1 ${s.color}`}>{s.change}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Patient flow chart */}
            <div className="lg:col-span-3 rounded-2xl bg-card/60 backdrop-blur p-5 border border-border/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold">Patient flow prediction</h3>
                  <p className="text-xs text-muted-foreground">Actual vs AI forecast · last 7 days</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-success/15 text-success font-medium">+18% surge</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={flowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="predicted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                        fontSize: "12px",
                      }}
                    />
                    <Area type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#visits)" />
                    <Area type="monotone" dataKey="predicted" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" fill="url(#predicted)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stock alerts */}
            <div className="lg:col-span-2 rounded-2xl bg-card/60 backdrop-blur p-5 border border-border/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold">Medicine shortage risk</h3>
                  <p className="text-xs text-muted-foreground">Live shortage scoring</p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} width={80} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="risk" radius={[0, 8, 8, 0]}>
                      {stockData.map((entry, i) => (
                        <Cell key={i} fill={riskColor(entry.risk)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
