import { Activity, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "board_of_directors") return "/board";
    if (user.role === "doctor") return "/doctor";
    if (user.role === "receptionist") return "/reception";
    return "/";
  };

  const navItems = user?.role === "receptionist" 
    ? [
        { label: "Reception Desk", href: "/reception" },
      ]
    : [
        ...(user?.role === "doctor" ? [] : [{ label: "Home", href: "/" }]),
        ...(user ? [{ label: "Dashboard", href: getDashboardLink() }] : []),
        { label: "Outbreaks", href: "/outbreaks" },
        { label: "Medicine", href: "/medicine" },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mt-4">
        <nav className="glass-strong rounded-2xl flex items-center justify-between px-4 sm:px-6 py-3">
          <Link to={getDashboardLink()} className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
              <Activity className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span>HCare<span className="text-gradient">Plus</span></span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors hover:bg-secondary/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-xs font-bold leading-none">{user.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                    {user.role.replace(/_/g, " ")}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={logout} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-primary-foreground shadow-[var(--shadow-glow)]"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-4 animate-fade-in">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
