import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, UserPlus, Activity } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select a role");
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup failed");

      // 2. Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: email,
          full_name: name,
          role,
          phone,
          specialization: role === "doctor" ? specialization : null,
          license_number: (role === "doctor" || role === "receptionist") ? licenseNumber : null,
        });

      if (profileError) throw profileError;

      toast.success("Account created successfully! Please check your email for confirmation.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VideoBackground videoSrc="/assets/background.mp4" overlayOpacity={0.6}>
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-white">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-lg">
            <Activity className="h-6 w-6" />
          </span>
          <span>HCarePlus</span>
        </Link>
        <Link to="/" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
          Back to Home
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <Card className="w-full max-w-lg glass animate-in fade-in zoom-in duration-500">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <UserPlus size={32} />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create Medical Account</CardTitle>
            <CardDescription className="text-center">
              Join the HCarePlus platform to manage health services
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Dr. John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@hospital.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 9876543210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={setRole} required>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="board_of_directors">Board of Directors</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {role === "doctor" && (
                <div className="grid gap-2 animate-in slide-in-from-top duration-300">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select onValueChange={setSpecialization} required>
                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(role === "doctor" || role === "receptionist") && (
                <div className="grid gap-2 animate-in slide-in-from-top duration-300">
                  <Label htmlFor="license">Medical License / Staff ID</Label>
                  <Input 
                    id="license" 
                    type="text" 
                    placeholder="LIC-123456" 
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required 
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </VideoBackground>
  );
};

export default Signup;
