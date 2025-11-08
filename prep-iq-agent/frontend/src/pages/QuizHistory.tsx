import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Clock, Target, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import prepiqLogo from "@/assets/prepiq-logo.jpg";

const QuizHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState<any[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (subjectFilter === "all") {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(
        history.filter((item) => item.subject === subjectFilter)
      );
    }
  }, [subjectFilter, history]);

  const loadHistory = async () => {
    try {
    
const session = {
  user: {
    id: "local-user-1",
    email: "student@local.app",
    user_metadata: {
      full_name: "Local Student",
    },
  },
};

      if (!session?.user) {
        navigate("/login");
        return;
      }

      const id = session.user.email || session.user.id;
      setUserId(id);

      const backendUrl = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/quiz/history/${id}`);

      if (!response.ok) {
        throw new Error("Failed to load history");
      }

      const data = await response.json();
      setHistory(data);
      setFilteredHistory(data);
    } catch (error) {
      console.error("Error loading history:", error);
      toast({
        title: "Error",
        description: "Failed to load quiz history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const uniqueSubjects = Array.from(
    new Set(history.map((item) => item.subject))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img
              src={prepiqLogo}
              alt="PrepIQ Logo"
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold">Quiz History</h1>
              <p className="text-sm text-muted-foreground">
                View your past quiz attempts
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{history.length}</p>
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
                <p className="text-2xl font-bold">
                  {history.length > 0
                    ? (
                        history.reduce(
                          (sum, item) => sum + item.score_percentage,
                          0
                        ) / history.length
                      ).toFixed(1)
                    : 0}
                  %
                </p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {history.length > 0
                    ? formatTime(
                        Math.round(
                          history.reduce(
                            (sum, item) => sum + item.time_taken_seconds,
                            0
                          ) / history.length
                        )
                      )
                    : "0m"}
                </p>
                <p className="text-sm text-muted-foreground">Avg Time</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {history.filter(
                    (item) =>
                      new Date(item.timestamp) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold">Filter by Subject:</label>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {uniqueSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* History Table */}
        <Card className="overflow-hidden">
          {filteredHistory.length === 0 ? (
            <div className="p-12 text-center">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold mb-2">No quiz history yet</p>
              <p className="text-muted-foreground mb-6">
                Start taking quizzes to see your progress here
              </p>
              <Button
                onClick={() => navigate("/quiz-generator")}
                className="bg-gradient-primary"
              >
                Take Your First Quiz
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.attempt_id}>
                    <TableCell className="font-medium">
                      {formatDate(item.timestamp)}
                    </TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.module}</TableCell>
                    <TableCell className="text-sm">
                      {item.exam_format}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${getScoreColor(
                          item.score_percentage
                        )}`}
                      >
                        {item.score_percentage.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.correct_answers}/{item.total_questions}
                    </TableCell>
                    <TableCell>{formatTime(item.time_taken_seconds)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </main>
    </div>
  );
};

export default QuizHistory;
