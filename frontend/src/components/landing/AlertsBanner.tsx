import { useQuery } from "@tanstack/react-query";
import { fetchAlerts } from "@/api/client";
import { AlertCircle, Bell, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function AlertsBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { data: alerts, isLoading } = useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
    refetchInterval: 5000, // Polling as fallback for WebSockets
  });

  // Handle WebSocket for real-time
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/notifications");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new_alert") {
        toast.info(`New Alert: ${data.data.message}`);
        // Optionally refetch alerts
      }
    };
    return () => socket.close();
  }, []);

  if (!isVisible || isLoading || !alerts || alerts.length === 0) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-[40] bg-danger/10 border-y border-danger/20 py-2 backdrop-blur-md animate-in slide-in-from-top duration-500">
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-danger/20 p-1 rounded-full shrink-0">
            <AlertCircle className="h-3.5 w-3.5 text-danger animate-pulse" />
          </div>
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...alerts, ...alerts].map((alert: any, idx) => (
              <div key={`${alert.id}-${idx}`} className="flex items-center gap-2 text-xs font-bold">
                <span className="text-danger uppercase text-[9px] tracking-widest px-1.5 py-0.5 bg-danger/10 rounded">
                  {alert.type}
                </span>
                <span>{alert.message}</span>
                <span className="text-muted-foreground ml-1">· {alert.district}</span>
              </div>
            ))}
          </div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
