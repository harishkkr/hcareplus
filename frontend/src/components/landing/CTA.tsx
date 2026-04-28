import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-deep to-primary p-10 sm:p-16 text-center text-primary-foreground shadow-[var(--shadow-glow)]">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-xs font-medium mb-6 border border-white/20">
              <Sparkles className="h-3.5 w-3.5" />
              Ready when you are
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Stop reacting.{" "}
              <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Start predicting.
              </span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Join 240+ clinics using HCarePlus to forecast outbreaks, prevent shortages, and save lives every day.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 group">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
