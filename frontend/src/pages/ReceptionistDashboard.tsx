import { Navbar } from "@/components/landing/Navbar";
import { AlertsBanner } from "@/components/landing/AlertsBanner";
import { Footer } from "@/components/landing/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, ListOrdered, ClipboardList, Droplets, Thermometer, Wind, CloudRain } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

import * as apiClient from "@/api/client";

const ReceptionistDashboard = () => {
  const { token } = useAuth();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [patientForm, setPatientForm] = useState({ 
    full_name: "",
    dob: "",
    district: "North District", 
    phone: "",
    address: "",
    symptoms: "", 
    age: "", 
    gender: "Male",
    admission_no: "",
    is_new: "New Patient"
  });

  const fetchPatients = async () => {
    if (!token) return;
    try {
      const data = await apiClient.fetchPatients(token);
      setPatients(data);
    } catch (error) {
      console.error("Failed to fetch patients", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [token]);

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsLoading(true);
    try {
      await apiClient.createPatientVisit({ 
        ...patientForm, 
        age: parseInt(patientForm.age) 
      }, token);
      
      toast.success("Patient registered successfully");
      setPatientForm({ 
        full_name: "",
        dob: "",
        district: "North District", 
        phone: "",
        address: "",
        symptoms: "", 
        age: "", 
        gender: "Male",
        admission_no: "",
        is_new: "New Patient"
      });
      fetchPatients();
    } catch (error) {
      toast.error("Failed to register patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AlertsBanner />
      <Navbar />
      <main className="container py-32">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Reception Desk</h1>
            <p className="text-muted-foreground text-lg">Comprehensive patient registration and hospital queue management.</p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Patient Registration Form */}
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  New Patient Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input 
                        placeholder="Patient's Full Name" 
                        value={patientForm.full_name}
                        onChange={(e) => setPatientForm({...patientForm, full_name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input 
                        type="date" 
                        value={patientForm.dob}
                        onChange={(e) => setPatientForm({...patientForm, dob: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <div className="flex gap-4 h-10 items-center">
                        {["Male", "Female", "Other"].map((g) => (
                          <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input 
                              type="radio" 
                              name="gender" 
                              value={g} 
                              checked={patientForm.gender === g}
                              onChange={(e) => setPatientForm({...patientForm, gender: e.target.value})}
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input 
                        type="tel" 
                        placeholder="+91 9876543210" 
                        value={patientForm.phone}
                        onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Age</Label>
                      <Input 
                        type="number" 
                        placeholder="Age" 
                        value={patientForm.age}
                        onChange={(e) => setPatientForm({...patientForm, age: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>District / Location</Label>
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        value={patientForm.district}
                        onChange={(e) => setPatientForm({...patientForm, district: e.target.value})}
                      >
                        <option>North District</option>
                        <option>South District</option>
                        <option>East District</option>
                        <option>West District</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input 
                        placeholder="Residential Address" 
                        value={patientForm.address}
                        onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Symptoms Category</Label>
                      <Input 
                        placeholder="e.g. Fever, Cough, Body Pain" 
                        value={patientForm.symptoms}
                        onChange={(e) => setPatientForm({...patientForm, symptoms: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Admission No.</Label>
                      <Input 
                        placeholder="ADM-00123" 
                        value={patientForm.admission_no}
                        onChange={(e) => setPatientForm({...patientForm, admission_no: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Patient Status</Label>
                      <div className="flex gap-6 h-10 items-center">
                        {["New Patient", "Already Admitted"].map((status) => (
                          <label key={status} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input 
                              type="radio" 
                              name="status" 
                              value={status} 
                              checked={patientForm.is_new === status}
                              onChange={(e) => setPatientForm({...patientForm, is_new: e.target.value})}
                            />
                            {status}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" className="w-full h-11" disabled={isLoading}>
                        Register & Admit Patient
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Patient History Section */}
          <Card className="glass overflow-hidden">
            <CardHeader className="bg-secondary/20 border-b border-border/40">
              <CardTitle className="flex items-center gap-2">
                <ListOrdered className="h-5 w-5 text-primary" />
                Patient Admission History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 border-b border-border/40">
                      <th className="p-4 text-xs font-bold uppercase text-muted-foreground">Arrival Time</th>
                      <th className="p-4 text-xs font-bold uppercase text-muted-foreground">Patient Name</th>
                      <th className="p-4 text-xs font-bold uppercase text-muted-foreground">Age / Gender</th>
                      <th className="p-4 text-xs font-bold uppercase text-muted-foreground">Symptoms</th>
                      <th className="p-4 text-xs font-bold uppercase text-muted-foreground">Location</th>
                      <th className="p-4 text-xs font-bold uppercase text-muted-foreground">Admission No.</th>
                      <th className="p-4 text-xs font-bold uppercase text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-10 text-center text-muted-foreground italic">
                          No patients registered yet.
                        </td>
                      </tr>
                    ) : (
                      patients.map((p, i) => (
                        <tr key={i} className="border-b border-border/20 hover:bg-secondary/10 transition-colors">
                          <td className="p-4 text-sm font-medium">
                            {new Date(p.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            <br/>
                            <span className="text-[10px] text-muted-foreground">{new Date(p.timestamp).toLocaleDateString()}</span>
                          </td>
                          <td className="p-4 text-sm font-bold">{p.full_name || "N/A"}</td>
                          <td className="p-4 text-sm">
                            {p.age} yrs / {p.gender}
                          </td>
                          <td className="p-4 text-sm max-w-[150px] truncate" title={p.symptoms}>
                            {p.symptoms}
                          </td>
                          <td className="p-4 text-sm">{p.district}</td>
                          <td className="p-4 text-sm">
                            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-mono text-xs">
                              {p.admission_no || "N/A"}
                            </span>
                          </td>
                          <td className="p-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              p.is_new === "New Patient" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                            }`}>
                              {p.is_new || "New Patient"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReceptionistDashboard;
