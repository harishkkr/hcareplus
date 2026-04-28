import { Navbar } from "@/components/landing/Navbar";
import { AlertsBanner } from "@/components/landing/AlertsBanner";
import { Footer } from "@/components/landing/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchAlerts } from "@/api/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, ShieldAlert, TrendingUp } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const Outbreaks = () => {
  const { data: alerts } = useQuery({ queryKey: ["alerts"], queryFn: fetchAlerts });
  const outbreaks = alerts?.filter((a: any) => a.type === "Outbreak") || [];

  // Group outbreaks by district for chart
  const districtData = outbreaks.reduce((acc: any, curr: any) => {
    const existing = acc.find((d: any) => d.name === curr.district);
    if (existing) existing.count += 1;
    else acc.push({ name: curr.district, count: 1 });
    return acc;
  }, []);

  const COLORS = ["hsl(var(--danger))", "hsl(var(--warning))", "hsl(var(--primary))", "hsl(var(--accent))"];

  return (
    <div className="min-h-screen bg-background">
      <AlertsBanner />
      <Navbar />
      <main className="container py-32">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Outbreak Tracking</h1>
            <p className="text-muted-foreground text-lg">Real-time surveillance and predictive modeling for infectious diseases.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Outbreaks</CardTitle>
                <ShieldAlert className="h-4 w-4 text-danger" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{outbreaks.length}</div>
                <p className="text-xs text-muted-foreground">+1 since last week</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prediction Confidence</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">Based on historical trends</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monitoring Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4k/sec</div>
                <p className="text-xs text-muted-foreground">Data points processed</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={districtData.length > 0 ? districtData : [{name: "No Data", count: 0}]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{ fill: "hsl(var(--secondary)/0.5)" }}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {districtData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Current Outbreak List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {outbreaks.length > 0 ? outbreaks.map((outbreak: any) => (
                    <div key={outbreak.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">{outbreak.message}</span>
                        <span className="text-xs text-muted-foreground">{outbreak.district} · {new Date(outbreak.timestamp).toLocaleDateString()}</span>
                      </div>
                      <span className="px-2 py-1 rounded bg-danger/10 text-danger text-[10px] font-bold uppercase">Critical</span>
                    </div>
                  )) : (
                    <p className="text-center text-muted-foreground py-12">No active outbreaks detected.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Simple Mock ShieldAlert
const ShieldAlert = ({ className }: any) => <ShieldAlertIcon className={className} />;
import { ShieldAlert as ShieldAlertIcon } from "lucide-react";

export default Outbreaks;
