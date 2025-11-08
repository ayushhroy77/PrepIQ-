import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import studyBackground from "@/assets/study-background.jpg";
import { z } from "zod";
import { localAuth } from "@/lib/localAuth";
import { localDB } from "@/lib/localDB";

// ✅ Validation schema
const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate input
    try {
      loginSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // ✅ Fetch users from localDB
      const users = localDB.get("users") || [];
      const foundUser = users.find(
        (u: any) =>
          u.email.trim().toLowerCase() === formData.email.trim().toLowerCase() &&
          u.password === formData.password
      );

      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // ✅ Save session
      localAuth.signIn(foundUser);

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${foundUser.fullName || "Student"}!`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Unexpected error during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

      <Card className="w-full max-w-md p-8 sm:p-12 space-y-8 animate-fade-in glass-card relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={prepiqLogo} alt="PrepIQ Logo" className="w-12 h-12 rounded-lg" />
            <span className="text-2xl font-bold">PrepIQ</span>
          </Link>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">Sign in to continue your learning journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, rememberMe: checked as boolean })
              }
            />
            <Label htmlFor="remember" className="text-sm cursor-pointer">
              Remember me for 30 days
            </Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
            disabled={loading}
          >
            <LogIn className="w-5 h-5 mr-2" />
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">No account?</span>
            </div>
          </div>

          {/* Register Link */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => navigate("/register")}
          >
            Create a new account
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
