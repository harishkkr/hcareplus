import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserPlus, Activity, Pill, ClipboardList, AlertCircle } from "lucide-react";
import { useDoctor } from "@/contexts/DoctorContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PatientSummary = () => {
  const { selectedPatient } = useDoctor();

  if (!selectedPatient) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-500">
        <AlertCircle className="h-16 w-16 text-muted-foreground opacity-20" />
        <div>
          <h2 className="text-2xl font-bold">No Patient Selected</h2>
          <p className="text-muted-foreground max-w-xs mx-auto">Please select a patient from the queue to view their medical summary.</p>
        </div>
        <Link to="/doctor/queue">
          <Button variant="outline">Go to Patient Queue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Summary</h1>
        <p className="text-muted-foreground">Comprehensive medical records and history for {selectedPatient.full_name}.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Core Info */}
        <Card className="glass border-primary/20 lg:col-span-2">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardList className="h-5 w-5 text-primary" />
              Detailed Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/10">
                <UserPlus className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{selectedPatient.full_name}</h2>
                <p className="text-lg text-muted-foreground">
                  {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.admission_no || "ID Pending"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 rounded-3xl bg-secondary/20 border border-border/40">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Primary Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.symptoms?.split(',').map((s: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs font-bold border border-primary/10">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-3xl bg-secondary/20 border border-border/40">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Location Context</p>
                <p className="text-lg font-bold">{selectedPatient.district}</p>
                <p className="text-xs text-muted-foreground">Primary Health Center Region</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Medical History
              </p>
              <div className="p-6 rounded-3xl bg-secondary/10 border border-border/20 space-y-4">
                <div>
                  <p className="text-sm font-bold mb-2">Previous Observations</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Patient has a history of seasonal allergies. Last visit recorded in {selectedPatient.district} indicated mild influenza symptoms. 
                    Recommended for follow-up on vitals.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-border/20">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Checkup:</span>
                    <span className="font-bold text-primary">12 Feb 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient Status:</span>
                    <span className="font-bold text-success uppercase">{selectedPatient.is_new}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full h-12 rounded-xl font-bold gap-2 shadow-glow">
                <Pill className="h-4 w-4" />
                Prescribe Medication
              </Button>
              <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
                Update Records
              </Button>
              <Button variant="ghost" className="w-full h-12 rounded-xl text-danger hover:bg-danger/5">
                Flag for Emergency
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20 bg-accent/5">
            <CardContent className="pt-6 text-center">
              <Activity className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-accent">AI Insights Available</h3>
              <p className="text-xs text-muted-foreground mt-2 mb-4">
                Our AI engine has generated a risk profile for this patient.
              </p>
              <Link to="/doctor/insights">
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                  View Insights
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;
