import { Navbar } from "@/components/landing/Navbar";
import { AlertsBanner } from "@/components/landing/AlertsBanner";
import { Footer } from "@/components/landing/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchAlerts } from "@/api/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, ShoppingCart, Truck } from "lucide-react";

const Medicine = () => {
  const { data: alerts } = useQuery({ queryKey: ["alerts"], queryFn: fetchAlerts });
  const shortages = alerts?.filter((a: any) => a.type === "Shortage") || [];

  return (
    <div className="min-h-screen bg-background">
      <AlertsBanner />
      <Navbar />
      <main className="container py-32">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Medicine Inventory</h1>
            <p className="text-muted-foreground text-lg">Inventory tracking and supply chain forecasting for essential medicines.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Shortages</CardTitle>
                <Package className="h-4 w-4 text-danger" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shortages.length}</div>
                <p className="text-xs text-muted-foreground">Action required immediately</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
                <Truck className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">Arriving in next 48 hours</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auto-Restock Level</CardTitle>
                <ShoppingCart className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">Optimized for district demand</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shortages.length > 0 ? shortages.map((shortage: any) => (
                  <div key={shortage.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border-l-4 border-danger">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{shortage.message}</span>
                      <span className="text-xs text-muted-foreground">{shortage.district} · CHC Monitoring</span>
                    </div>
                    <Button variant="outline" size="sm">Procure Now</Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">No critical shortages detected.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Simplified Button since shadcn button might not be imported correctly in this snippet
const Button = ({ children, variant, size, className, ...props }: any) => (
    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${variant === 'outline' ? 'border border-border hover:bg-secondary' : 'bg-primary text-primary-foreground'} ${className}`} {...props}>
        {children}
    </button>
);

export default Medicine;
