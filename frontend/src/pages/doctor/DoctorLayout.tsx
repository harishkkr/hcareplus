import { Navbar } from "@/components/landing/Navbar";
import { AlertsBanner } from "@/components/landing/AlertsBanner";
import { Footer } from "@/components/landing/Footer";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ListOrdered, ClipboardList, Activity, LayoutDashboard } from "lucide-react";
import { DoctorProvider } from "@/contexts/DoctorContext";

const DoctorLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Patient Queue", path: "/doctor/queue", icon: ListOrdered },
    { name: "Patient Summary", path: "/doctor/summary", icon: ClipboardList },
    { name: "AI Smart Insights", path: "/doctor/insights", icon: Activity },
  ];

  return (
    <DoctorProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <AlertsBanner />
        <Navbar />
        
        <div className="flex-1 flex container py-32 gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-4">
              <div className="px-4 py-2">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  Clinical Portal
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Doctor's Workspace</p>
              </div>
              
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-glow" 
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </DoctorProvider>
  );
};

export default DoctorLayout;
