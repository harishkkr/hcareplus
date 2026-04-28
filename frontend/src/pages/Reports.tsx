import { Navbar } from "@/components/landing/Navbar";
import { AlertsBanner } from "@/components/landing/AlertsBanner";
import { Footer } from "@/components/landing/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/api/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Download, BarChart3, Users, Activity } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const Reports = () => {
  const { data: stats } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });

  const chartData = [
    { name: "Week 1", score: 65 },
    { name: "Week 2", score: 59 },
    { name: "Week 3", score: 80 },
    { name: "Week 4", score: 81 },
    { name: "Week 5", score: 56 },
    { name: "Week 6", score: 55 },
    { name: "Week 7", score: 40 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AlertsBanner />
      <Navbar />
      <main className="container py-32">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">District Reports</h1>
            <p className="text-muted-foreground text-lg">Comprehensive health analytics and statutory reporting for district officers.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "Patient Flow", icon: Users, color: "text-primary" },
              { label: "Symptom Trends", icon: BarChart3, color: "text-success" },
              { label: "Resource Allocation", icon: FileText, color: "text-warning" },
              { label: "Outbreak Analysis", icon: Activity, color: "text-danger" },
            ].map((report, i) => (
              <Card key={i} className="glass group cursor-pointer hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{report.label}</CardTitle>
                  <report.icon className={`h-4 w-4 ${report.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground mb-4">Last generated: 2 hours ago</div>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary group-hover:underline">
                    <Download className="h-3 w-3" />
                    Download PDF
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Predictive Health Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reports;
