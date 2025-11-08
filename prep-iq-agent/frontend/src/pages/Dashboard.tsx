import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  TrendingUp,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Home,
  BookOpen,
  Target,
  BarChart3,
  Sparkles,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import { localAuth } from "@/lib/localAuth";
import { localDB } from "@/lib/localDB";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState<any>(null);
  const [quizStats, setQuizStats] = useState({ totalQuizzes: 0, avgScore: 0 });
  const [recentQuizzes, setRecentQuizzes] = useState<any[]>([]);

  // ✅ Load user + data on mount
  useEffect(() => {
    const currentUser = localAuth.getUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    const history = localDB.get("quizHistory") || [];
    const total = history.length;
    const avg =
      total > 0
        ? history.reduce((sum: number, q: any) => sum + q.score_percentage, 0) / total
        : 0;

    setQuizStats({ totalQuizzes: total, avgScore: avg });
    setRecentQuizzes(history.slice(-5).reverse());
  }, [navigate]);

  // ✅ Logout
  const handleLogout = () => {
    localAuth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const stats = [
    { label: "Study Hours", value: "24.5", icon: BookOpen, color: "text-primary" },
    {
      label: "Quizzes Done",
      value: quizStats.totalQuizzes.toString(),
      icon: Target,
      color: "text-secondary",
    },
    {
      label: "Average Score",
      value: quizStats.avgScore ? `${quizStats.avgScore.toFixed(0)}%` : "N/A",
      icon: TrendingUp,
      color: "text-success",
    },
  ];

  // ✅ Format “time ago”
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hrs > 0) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    if (mins > 0) return `${mins} min${mins > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const getUserInitials = () => {
    if (!user) return "ST";
    const name = user.fullName || user.user_metadata?.full_name || user.email || "Student";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-8">
          <img src={prepiqLogo} alt="PrepIQ Logo" className="w-10 h-10 rounded-lg" />
          <span className="text-xl font-bold">PrepIQ</span>
        </div>

        <nav className="space-y-2">
          {[
            { id: "home", label: "Dashboard", icon: Home },
            { id: "profile", label: "My Profile", icon: User },
            { id: "schedule", label: "Study Schedule", icon: Calendar },
            { id: "progress", label: "Performance", icon: BarChart3, route: "/performance" },
            { id: "concepts", label: "Concept Library", icon: BookOpen, route: "/dashboard/modules" },
            { id: "quiz", label: "Quiz Generator", icon: Sparkles, route: "/quiz-generator" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.route) navigate(item.route);
                else setActiveTab(item.id);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="lg"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            size="lg"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Welcome back, {user?.fullName || "Student"}!
            </h1>
            <p className="text-muted-foreground">Let’s make today productive</p>
          </div>
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Recent Quizzes */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          {recentQuizzes.length === 0 ? (
            <p className="text-muted-foreground">No quizzes yet. Start one now!</p>
          ) : (
            <div className="space-y-3">
              {recentQuizzes.map((quiz, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 border-b border-border last:border-none"
                >
                  <div>
                    <p className="font-semibold">{quiz.subject} - {quiz.module}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(quiz.timestamp)}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      quiz.score_percentage >= 70
                        ? "text-green-600"
                        : quiz.score_percentage >= 40
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {quiz.score_percentage.toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
