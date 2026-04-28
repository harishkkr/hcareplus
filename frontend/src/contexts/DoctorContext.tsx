import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import * as apiClient from "@/api/client";

interface DoctorContextType {
  patients: any[];
  selectedPatient: any | null;
  setSelectedPatient: (patient: any) => void;
  isLoading: boolean;
  refreshPatients: () => Promise<void>;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshPatients = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const data = await apiClient.fetchPatients(token);
      setPatients(data);
      if (data.length > 0 && !selectedPatient) {
        setSelectedPatient(data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch patients", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshPatients();
  }, [token]);

  return (
    <DoctorContext.Provider value={{ patients, selectedPatient, setSelectedPatient, isLoading, refreshPatients }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error("useDoctor must be used within a DoctorProvider");
  }
  return context;
};
