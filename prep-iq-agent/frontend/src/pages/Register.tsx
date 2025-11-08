import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import studyBackground from "@/assets/study-background.jpg";
import { z } from "zod";
import { localAuth } from "@/lib/localAuth";

// ✅ Validation schema
const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  targetExams: z.array(z.string()).min(1, "Select at least one target exam"),
  educationLevel: z.string().min(1, "Please select an education level"),
  language: z.string().min(1, "Please select a language"),
  agreeTerms: z.boolean().refine(v => v === true, "You must accept the terms"),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    targetExams: [] as string[],
    educationLevel: "",
    language: "",
    agreeTerms: false
  });

  const exams = ["JEE Main/Advanced", "NEET", "UPSC", "CAT", "GATE", "Other"];
  const educationLevels = ["High School", "Undergraduate", "Graduate", "Working Professional"];
  const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali"];

  // ✅ Check local user
  useEffect(() => {
    const user = localAuth.getUser();
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ Password strength
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 1, text: "Weak", color: "bg-destructive" },
      { strength: 2, text: "Fair", color: "bg-yellow-500" },
      { strength: 3, text: "Good", color: "bg-blue-500" },
      { strength: 4, text: "Strong", color: "bg-success" },
    ];

    return levels[strength - 1] || { strength: 0, text: "", color: "" };
  };

  const handleExamToggle = (exam: string) => {
    setFormData(prev => ({
      ...prev,
      targetExams: prev.targetExams.includes(exam)
        ? prev.targetExams.filter(e => e !== exam)
        : [...prev.targetExams, exam]
    }));
  };

  // ✅ Handle submit (Local Storage)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      registerSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
      return;
    }

    setLoading(true);

    try {
      // Save user locally
      const newUser = {
        email: formData.email.trim(),
        password: formData.password,
        user_metadata: {
          full_name: formData.fullName.trim(),
          phone: formData.phone.trim() || null,
          target_exams: formData.targetExams,
          education_level: formData.educationLevel,
          preferred_language: formData.language,
        },
      };

      localStorage.setItem("user", JSON.stringify(newUser));

      toast({
        title: "Account Created!",
        description: "Welcome to PrepIQ — redirecting to your dashboard...",
      });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while creating your account.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${studyBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <Card className="w-full max-w-2xl p-8 sm:p-12 space-y-8 animate-fade-in glass-card relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={prepiqLogo} alt="PrepIQ Logo" className="w-12 h-12 rounded-lg" />
            <span className="text-2xl font-bold">PrepIQ</span>
          </Link>
          <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
          <p className="text-muted-foreground">Start your journey to exam success with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 12345 67890"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password *</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a strong password"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label>Confirm Password *</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Target Exams */}
          <div className="space-y-3">
            <Label>Target Exam(s) *</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {exams.map((exam) => (
                <label
                  key={exam}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.targetExams.includes(exam)
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Checkbox
                    checked={formData.targetExams.includes(exam)}
                    onCheckedChange={() => handleExamToggle(exam)}
                  />
                  <span className="text-sm">{exam}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Education Level & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Education Level *</Label>
              <Select
                value={formData.educationLevel}
                onValueChange={(v) => setFormData({ ...formData, educationLevel: v })}
              >
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {educationLevels.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Language *</Label>
              <Select
                value={formData.language}
                onValueChange={(v) => setFormData({ ...formData, language: v })}
              >
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {languages.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <Checkbox
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeTerms: checked as boolean })
              }
            />
            <Label className="text-sm leading-relaxed">
              I agree to PrepIQ’s{" "}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
            disabled={loading}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;
