import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Zap, ShieldAlert, BarChart3, AlertCircle } from "lucide-react";
import { useDoctor } from "@/contexts/DoctorContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AISmartInsights = () => {
  const { selectedPatient } = useDoctor();

  if (!selectedPatient) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-500">
        <AlertCircle className="h-16 w-16 text-muted-foreground opacity-20" />
        <div>
          <h2 className="text-2xl font-bold">Awaiting Data</h2>
          <p className="text-muted-foreground max-w-xs mx-auto">Select a patient to generate AI-powered diagnostic insights and risk profiles.</p>
        </div>
        <Link to="/doctor/queue">
          <Button variant="outline">Go to Patient Queue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-accent">AI Smart Insights</h1>
          <p className="text-muted-foreground">Neural analysis for {selectedPatient.full_name}.</p>
        </div>
        <div className="bg-accent/10 text-accent px-4 py-2 rounded-2xl border border-accent/20 flex items-center gap-2">
          <Zap className="h-4 w-4 fill-accent" />
          <span className="text-sm font-bold">Real-time Analysis Active</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Profile */}
        <Card className="glass border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-accent">
              <ShieldAlert className="h-5 w-5" />
              Neural Risk Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex justify-around items-center py-4">
              <div className="text-center">
                <div className="relative h-32 w-32 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90">
                    <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-secondary/30" />
                    <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="364.4" strokeDashoffset="91.1" className="text-accent transition-all duration-1000" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold tracking-tighter">74%</span>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Score</span>
                  </div>
                </div>
                <p className="mt-4 text-sm font-bold text-accent">General Severity</p>
              </div>
              
              <div className="space-y-6 flex-1 max-w-[200px]">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
                    <span>Infection Risk</span>
                    <span className="text-accent">High</span>
                  </div>
                  <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[82%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
                    <span>Complication</span>
                    <span className="text-warning">Medium</span>
                  </div>
                  <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[45%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
                    <span>Recovery Rate</span>
                    <span className="text-success">Good</span>
                  </div>
                  <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[68%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-accent/5 border border-accent/10">
              <p className="text-xs font-bold text-accent uppercase mb-2">Regional Correlation</p>
              <p className="text-sm leading-relaxed italic">
                "Symptoms cluster matches <span className="font-bold">14 recent cases</span> in {selectedPatient.district}. 
                High statistical probability of localized seasonal outbreak."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Diagnostic Breakdown */}
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-primary">
              <BarChart3 className="h-5 w-5" />
              Differential Diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[
                { label: "Viral Outbreak", prob: "82%", status: "critical" },
                { label: "Dengue Fever", prob: "68%", status: "warning" },
                { label: "Seasonal Flu", prob: "14%", status: "normal" },
                { label: "Typhoid", prob: "5%", status: "normal" }
              ].map((d, i) => (
                <div key={i} className="p-4 rounded-2xl bg-secondary/20 border border-border/40 hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm">{d.label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      d.status === 'critical' ? 'bg-danger/20 text-danger' : 
                      d.status === 'warning' ? 'bg-warning/20 text-warning' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {d.prob} Confidence
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${
                      d.status === 'critical' ? 'bg-danger' : 
                      d.status === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} style={{ width: d.prob }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl border border-warning/30 bg-warning/5 flex gap-4 items-start">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-warning uppercase mb-1">Recommended Labs</p>
                <p className="text-[10px] text-muted-foreground">Complete Blood Count (CBC) and Serology recommended to confirm vector-borne markers.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid lg:grid-cols-1">
        <Card className="glass border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg">Full AI Diagnostic Report</h3>
              <p className="text-sm text-muted-foreground">Generate a comprehensive PDF report including all neural insights and historical correlations.</p>
            </div>
            <Button className="h-12 px-8 rounded-xl font-bold shadow-glow whitespace-nowrap">
              Generate Report (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AISmartInsights;
