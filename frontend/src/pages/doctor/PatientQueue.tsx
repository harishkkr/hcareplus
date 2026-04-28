import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, RefreshCcw } from "lucide-react";
import { useDoctor } from "@/contexts/DoctorContext";
import { Button } from "@/components/ui/button";

const PatientQueue = () => {
  const { patients, selectedPatient, setSelectedPatient, isLoading, refreshPatients } = useDoctor();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Queue</h1>
          <p className="text-muted-foreground">Manage incoming patients and appointments.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refreshPatients()} 
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card className="glass border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.length === 0 ? (
              <div className="col-span-full py-20 text-center text-muted-foreground italic">
                {isLoading ? "Loading patients..." : "No patients in the queue today."}
              </div>
            ) : (
              patients.map((p, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedPatient(p)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selectedPatient?.id === p.id 
                      ? "bg-primary/10 border-primary shadow-sm" 
                      : "bg-secondary/20 border-transparent hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-lg">{p.full_name || "Unknown Patient"}</span>
                    <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">
                      {new Date(p.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${i < 2 ? "bg-danger animate-pulse" : "bg-success"}`} />
                      <span className="text-xs text-muted-foreground">{p.symptoms?.split(',')[0] || "General Checkup"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.age} years • {p.gender}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientQueue;
