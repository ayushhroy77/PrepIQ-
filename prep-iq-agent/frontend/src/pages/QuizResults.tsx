import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Home,
  RotateCcw,
  Bookmark,
} from "lucide-react";
import prepiqLogo from "@/assets/prepiq-logo.jpg";

interface QuizResultsProps {
  results: any;
  onRetakeQuiz: () => void;
}

const QuizResults = ({ results, onRetakeQuiz }: QuizResultsProps) => {
  const navigate = useNavigate();

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

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent work! 🌟";
    if (percentage >= 70) return "Great job! 👍";
    if (percentage >= 60) return "Good effort! 💪";
    if (percentage >= 50) return "Keep practicing! 📚";
    return "Don't give up! 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <img
            src={prepiqLogo}
            alt="PrepIQ Logo"
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold">Quiz Results</h1>
            <p className="text-sm text-muted-foreground">
              {results.subject} - {results.module}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Score Card */}
          <Card className="p-8 text-center animate-fade-in">
            <div
              className={`text-6xl font-bold mb-2 ${getScoreColor(
                results.score_percentage
              )}`}
            >
              {results.score_percentage.toFixed(1)}%
            </div>
            <p className="text-2xl font-semibold mb-1">
              {getScoreMessage(results.score_percentage)}
            </p>
            <p className="text-muted-foreground">
              {results.correct_answers} correct out of {results.total_questions}{" "}
              questions
            </p>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              className="p-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{results.attempted_questions}</p>
                  <p className="text-sm text-muted-foreground">Attempted</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {results.correct_answers}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {formatTime(results.time_taken_seconds)}
                  </p>
                  <p className="text-sm text-muted-foreground">Time Taken</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Review */}
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Detailed Review
            </h2>

            <div className="space-y-4">
              {results.questions?.map((question: any, idx: number) => {
                const userAnswer = results.user_answers[idx];
                const isCorrect = userAnswer === question.answer;
                const wasBookmarked = results.bookmarked?.has(idx);

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? "border-green-500/30 bg-green-500/5"
                        : userAnswer
                        ? "border-red-500/30 bg-red-500/5"
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`mt-1 p-1 rounded-full ${
                          isCorrect ? "bg-green-500" : userAnswer ? "bg-red-500" : "bg-muted"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : userAnswer ? (
                          <XCircle className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">
                            Question {idx + 1}:
                          </span>
                          {wasBookmarked && (
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-600 rounded-full text-xs font-semibold flex items-center gap-1">
                              <Bookmark className="w-3 h-3 fill-current" />
                              Bookmarked
                            </span>
                          )}
                        </div>
                        <p className="mb-3">{question.question}</p>

                        <div className="space-y-2">
                          {question.options.map((option: string, optIdx: number) => {
                            const isUserAnswer = userAnswer === option;
                            const isCorrectAnswer = question.answer === option;

                            return (
                              <div
                                key={optIdx}
                                className={`p-2 rounded text-sm ${
                                  isCorrectAnswer
                                    ? "bg-green-500/20 border border-green-500"
                                    : isUserAnswer
                                    ? "bg-red-500/20 border border-red-500"
                                    : "bg-muted/50"
                                }`}
                              >
                                <span className="font-semibold mr-2">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                {option}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-green-600 font-semibold">
                                    ✓ Correct
                                  </span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="ml-2 text-red-600 font-semibold">
                                    ✗ Your Answer
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {!userAnswer && (
                          <p className="mt-2 text-sm text-muted-foreground italic">
                            Not attempted
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Dashboard
            </Button>
            <Button
              onClick={onRetakeQuiz}
              size="lg"
              className="gap-2 bg-gradient-primary"
            >
              <RotateCcw className="w-5 h-5" />
              Take Another Quiz
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizResults;
