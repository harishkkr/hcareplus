import { Linkedin, Twitter, Github } from "lucide-react";

const team = [
  { name: "Dr. Anika Rao", role: "Chief Medical Officer", initials: "AR", grad: "from-primary to-primary-glow" },
  { name: "Vikram Joshi", role: "Co-founder · CTO", initials: "VJ", grad: "from-accent to-primary" },
  { name: "Maya Chen", role: "Head of AI", initials: "MC", grad: "from-primary-glow to-accent" },
  { name: "Arjun Patel", role: "Head of Design", initials: "AP", grad: "from-primary to-accent" },
];

export function Team() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            The team
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Built by clinicians,{" "}
            <span className="text-gradient">engineers, and designers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We've spent years inside rural clinics. We know what's broken — and how to fix it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <div
              key={m.name}
              className="group glass rounded-2xl p-6 text-center hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`mx-auto h-20 w-20 rounded-full bg-gradient-to-br ${m.grad} grid place-items-center text-primary-foreground font-display font-bold text-2xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-[var(--shadow-soft)]`}>
                {m.initials}
              </div>
              <h3 className="font-display font-semibold">{m.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{m.role}</p>
              <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <a href="#" aria-label="LinkedIn" className="grid place-items-center h-8 w-8 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="Twitter" className="grid place-items-center h-8 w-8 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="GitHub" className="grid place-items-center h-8 w-8 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Github className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
