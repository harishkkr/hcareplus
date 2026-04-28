import { Activity } from "lucide-react";

export function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Dashboard", "Pricing", "Changelog", "Roadmap"] },
    { title: "Company", links: ["About", "Team", "Careers", "Press", "Contact"] },
    { title: "Resources", links: ["Documentation", "API reference", "Blog", "Case studies", "Help center"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "HIPAA", "Compliance"] },
  ];

  return (
    <footer className="border-t border-border/60 py-16 bg-secondary/20">
      <div className="container">
        <div className="grid lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <Activity className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span>HCare<span className="text-gradient">Plus</span></span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Predictive healthcare intelligence for rural clinics, district health officers, and public health systems.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-semibold text-sm mb-4">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 HCarePlus. Saving lives through prediction.</p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
