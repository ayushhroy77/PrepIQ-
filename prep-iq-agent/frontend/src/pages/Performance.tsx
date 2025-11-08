import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Trophy,
  AlertCircle,
  Award,
  Target,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { localAuth } from "@/lib/localAuth";
import { localDB } from "@/lib/localDB";

const Performance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  // ✅ Local version of analytics loader
  const loadAnalytics = async () => {
    try {
      const user = localAuth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setUserId(user.email || user.id || "local-user");

      // Load locally stored quiz history
      const quizzes = localDB.get("quizHistory") || [];
      if (!quizzes.length) {
        setAnalytics({
          total_quizzes: 0,
          average_score: 0,
          subject_performance: {},
          score_trend: [],
          weak_modules: [],
        });
        return;
      }

      const total_quizzes = quizzes.length;
      const average_score =
        quizzes.reduce((sum: number, q: any) => sum + q.score_percentage, 0) /
        total_quizzes;

      const subject_performance: Record<string, { total: number; average: number }> =
        {};

      quizzes.forEach((q: any) => {
        if (!subject_performance[q.subject]) {
          subject_performance[q.subject] = { total: 0, average: 0 };
        }
        subject_performance[q.subject].total += 1;
        subject_performance[q.subject].average += q.score_percentage;
      });

      Object.keys(subject_performance).forEach((s) => {
        subject_performance[s].average /= subject_performance[s].total;
      });

      const weak_modules = quizzes
        .filter((q: any) => q.score_percentage < 60)
        .map((q: any) => ({
          module: `${q.subject} - ${q.module}`,
          average_score: q.score_percentage,
        }));

      setAnalytics({
        total_quizzes,
        average_score,
        subject_performance,
        score_trend: quizzes.slice(-10),
        weak_modules,
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast({
        title: "Error",
        description: "Failed to load local analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics || analytics.total_quizzes === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <header className="border-b border-border bg-card/50 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={prepiqLogo} alt="PrepIQ Logo" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-2xl font-bold">Performance Analytics</h1>
              <p className="text-sm text-muted-foreground">Track your progress</p>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Card className="p-12 text-center">
            <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-2">No data available yet</p>
            <p className="text-muted-foreground mb-6">
              Complete some quizzes to see your performance analytics
            </p>
            <Button onClick={() => navigate("/quiz-generator")} className="bg-gradient-primary">
              Take Your First Quiz
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  // ✅ Prepare chart data
  const subjectPerformanceData = Object.keys(analytics.subject_performance).map(
    (subject) => ({
      subject,
      score: Math.round(analytics.subject_performance[subject].average),
    })
  );

  const scoreTrendData = analytics.score_trend.map((item: any, idx: number) => ({
    attempt: idx + 1,
    score: Math.round(item.score_percentage),
    subject: item.subject,
  }));

  const getBadges = () => {
    const badges = [];
    if (analytics.total_quizzes >= 10)
      badges.push({ name: "Quiz Master", icon: "🎯", desc: "10+ quizzes completed" });
    if (analytics.total_quizzes >= 50)
      badges.push({ name: "Dedicated Learner", icon: "📚", desc: "50+ quizzes completed" });
    if (analytics.average_score >= 80)
      badges.push({ name: "High Scorer", icon: "🌟", desc: "80%+ average score" });
    if (analytics.average_score >= 90)
      badges.push({ name: "Perfectionist", icon: "💯", desc: "90%+ average score" });
    return badges;
  };

  const badges = getBadges();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img src={prepiqLogo} alt="PrepIQ Logo" className="w-10 h-10 rounded-lg" />
          <div>
            <h1 className="text-2xl font-bold">Performance Analytics</h1>
            <p className="text-sm text-muted-foreground">Track your learning progress</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics.total_quizzes}</p>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics.average_score.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{badges.length}</p>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Your Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 text-center"
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="font-semibold mb-1">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Score Trend (Last 10 Quizzes)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="Score %" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Subject-wise Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#10b981" name="Average Score %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Weak Areas */}
          {analytics.weak_modules.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-600">
                <AlertCircle className="w-5 h-5" />
                Areas for Improvement (Below 60%)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.weak_modules.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg border-2 border-amber-500/30 bg-amber-500/5">
                    <p className="font-semibold mb-1">{item.module}</p>
                    <p className="text-sm text-muted-foreground">
                      Average: {item.average_score.toFixed(1)}%
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full"
                      onClick={() => navigate("/quiz-generator")}
                    >
                      Practice More
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Performance;
