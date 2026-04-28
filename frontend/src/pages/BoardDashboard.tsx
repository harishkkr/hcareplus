import { Navbar } from "@/components/landing/Navbar";
import { AlertsBanner } from "@/components/landing/AlertsBanner";
import { Footer } from "@/components/landing/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import * as apiClient from "@/api/client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const BoardDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    active_outbreaks: 0,
    districts_monitored: 0,
    health_score: 0,
    total_visits_today: 0
  });
  const [predictions, setPredictions] = useState([]);

  // Mock data for trends since real time-series data might not be available yet
  const trendData = [
    { name: "Mon", visits: 40, risk: 24 },
    { name: "Tue", visits: 30, risk: 13 },
    { name: "Wed", visits: 20, risk: 98 },
    { name: "Thu", visits: 27, risk: 39 },
    { name: "Fri", visits: 18, risk: 48 },
    { name: "Sat", visits: 23, risk: 38 },
    { name: "Sun", visits: 34, risk: 43 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const statsData = await apiClient.fetchStats();
        setStats(statsData);

        const predData = await apiClient.fetchPredictions(token);
        setPredictions(predData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <AlertsBanner />
      <Navbar />
      <main className="container py-32">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Board Analytics Dashboard</h1>
            <p className="text-muted-foreground text-lg">Comprehensive health system performance and predictive analytics.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Patient Visits</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_visits_today}</div>
                <p className="text-xs text-muted-foreground">Recorded across all clinics</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Outbreaks</CardTitle>
                <Activity className="h-4 w-4 text-danger" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active_outbreaks}</div>
                <p className="text-xs text-muted-foreground">Districts requiring intervention</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.health_score}%</div>
                <p className="text-xs text-muted-foreground">Community wellness index</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Districts Monitored</CardTitle>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.districts_monitored}</div>
                <p className="text-xs text-muted-foreground">Full regional coverage</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Regional Health Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
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
                      <Area 
                        type="monotone" 
                        dataKey="visits" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorVisits)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader>
                <CardTitle>AI Outbreak Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictions.length > 0 ? predictions.map((pred, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-primary/10 hover:bg-secondary/70 transition-colors">
                      <div>
                        <p className="font-bold">{pred.district}</p>
                        <p className="text-xs text-muted-foreground">Potential {pred.disease} Outbreak</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pred.risk_score > 0.7 ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                          Risk: {(pred.risk_score * 100).toFixed(0)}%
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Est: {new Date(pred.predicted_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-muted-foreground py-8">No immediate risks detected.</p>
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

export default BoardDashboard;
