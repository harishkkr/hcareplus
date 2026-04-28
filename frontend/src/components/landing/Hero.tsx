import { ArrowRight, Sparkles, ShieldCheck, Activity, Pill, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroImg from "@/assets/hero-ai-healthcare.jpg";

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      if (user.role === "board_of_directors") navigate("/board");
      else if (user.role === "doctor") navigate("/doctor");
      else if (user.role === "receptionist") navigate("/reception");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>AI-powered health intelligence</span>
              <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">Live</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              Predict patient flow.{" "}
              <span className="text-gradient">Prevent shortages.</span>{" "}
              Save lives.
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              HCarePlus correlates environmental telemetry with patient visits to forecast outbreaks,
              optimize medicine inventory, and alert rural clinics before crisis hits.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="rounded-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-primary-foreground shadow-[var(--shadow-glow)] group"
              >
                {user ? "Go to Dashboard" : "Get started now"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-2"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn more
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                HIPAA-aligned
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Real-time AI scoring
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Used in 240+ rural clinics
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/20 blur-3xl rounded-full animate-pulse-glow" />
            <div className="relative glass-strong rounded-3xl p-2 shadow-[var(--shadow-glow)]">
              <img
                src={heroImg}
                alt="HCarePlus AI healthcare dashboard visualization"
                width={1536}
                height={1280}
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute -left-4 sm:-left-8 top-1/4 glass rounded-2xl p-3 sm:p-4 animate-float shadow-[var(--shadow-card)] max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-danger/15 text-danger">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Outbreak risk</p>
                  <p className="font-display font-semibold text-sm">Sundar Nagar</p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-display font-bold text-danger">87%</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-danger/15 text-danger font-medium">High</span>
              </div>
            </div>

            <div className="absolute -right-4 sm:-right-6 bottom-1/4 glass rounded-2xl p-3 sm:p-4 animate-float shadow-[var(--shadow-card)] max-w-[220px]" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-warning/15 text-warning">
                  <Pill className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Stock alert</p>
                  <p className="font-display font-semibold text-sm">Paracetamol</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-warning to-danger" />
                </div>
                <p className="text-[10px] text-muted-foreground">3 days remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
