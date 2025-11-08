import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Bookmark,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QuizConfig } from "./QuizGenerator";
import { localAuth } from "@/lib/localAuth";

interface QuizExamProps {
  config: QuizConfig;
  onSubmitQuiz: (results: any) => void;
}

type QuestionStatus = "unattempted" | "attempted" | "marked";

const QuizExam = ({ config, onSubmitQuiz }: QuizExamProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    Array(config.questions.length).fill("unattempted")
  );
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(config.time_limit_minutes * 60);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [userId, setUserId] = useState("");
  const warningShownRef = useRef(false);

  // ✅ Local user & saved state
  useEffect(() => {
    const user = localAuth.getUser();
    if (user) setUserId(user.email || user.id || "local-user");

    const saved = sessionStorage.getItem(`quiz_${config.quiz_id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers || {});
      setBookmarkedQuestions(new Set(parsed.bookmarks || []));
    }
  }, [config.quiz_id]);

  // ✅ Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }

        if (prev === 300 && !warningShownRef.current) {
          warningShownRef.current = true;
          setShowWarningDialog(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ Save to session storage
  useEffect(() => {
    sessionStorage.setItem(
      `quiz_${config.quiz_id}`,
      JSON.stringify({
        answers,
        bookmarks: Array.from(bookmarkedQuestions),
      })
    );
  }, [answers, bookmarkedQuestions, config.quiz_id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));

    setQuestionStatuses((prev) => {
      const newStatuses = [...prev];
      if (newStatuses[currentQuestion] !== "marked") {
        newStatuses[currentQuestion] = "attempted";
      }
      return newStatuses;
    });
  };

  const handleMarkForReview = () => {
    setQuestionStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[currentQuestion] = "marked";
      return newStatuses;
    });
    toast({
      title: "Marked for Review",
      description: `Question ${currentQuestion + 1} marked for review`,
    });
  };

  const toggleBookmark = () => {
    setBookmarkedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
        toast({
          title: "Bookmark Removed",
          description: `Removed bookmark from question ${currentQuestion + 1}`,
        });
      } else {
        newSet.add(currentQuestion);
        toast({
          title: "Bookmarked",
          description: `Bookmarked question ${currentQuestion + 1}`,
        });
      }
      return newSet;
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < config.questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handleAutoSubmit = () => {
    toast({
      title: "Time’s Up!",
      description: "Your quiz was auto-submitted.",
    });
    submitQuiz();
  };

  // ✅ Submit quiz (local or backend)
  const submitQuiz = async () => {
    try {
      const timeTaken = config.time_limit_minutes * 60 - timeLeft;

      const correctAnswers: { [key: string]: string } = {};
      config.questions.forEach((q, i) => {
        correctAnswers[(i + 1).toString()] = q.answer;
      });

      const submittedAnswers: { [key: string]: string } = {};
      Object.keys(answers).forEach((key) => {
        submittedAnswers[(parseInt(key) + 1).toString()] = answers[parseInt(key)];
      });

      const results = {
        quiz_id: config.quiz_id,
        user_id: userId,
        subject: config.subject,
        module: config.module,
        exam_format: config.exam_format,
        difficulty: config.difficulty,
        total_questions: config.questions.length,
        time_taken_seconds: timeTaken,
        answers: submittedAnswers,
        correct_answers: correctAnswers,
        bookmarked_questions: Array.from(bookmarkedQuestions).map((i) => i + 1),
        score_percentage: calculateScorePercentage(config.questions, answers),
        questions: config.questions,
      };

      sessionStorage.removeItem(`quiz_${config.quiz_id}`);
      onSubmitQuiz(results);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Error",
        description: "Something went wrong submitting the quiz.",
        variant: "destructive",
      });
    }
  };

  const calculateScorePercentage = (questions: any[], answers: any) => {
    const total = questions.length;
    const correct = questions.filter(
      (q, i) => q.answer === answers[i]
    ).length;
    return ((correct / total) * 100).toFixed(1);
  };

  const getStatusColor = (status: QuestionStatus) => {
    switch (status) {
      case "attempted":
        return "bg-blue-500 hover:bg-blue-600";
      case "marked":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  const currentQuestionData = config.questions[currentQuestion];
  const attemptedCount = questionStatuses.filter(
    (s) => s === "attempted" || s === "marked"
  ).length;
  const markedCount = questionStatuses.filter((s) => s === "marked").length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              {config.subject} - {config.module}
            </h1>
            <p className="text-sm text-muted-foreground">
              {config.exam_format} ({config.difficulty})
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                timeLeft < 300
                  ? "bg-destructive/20 text-destructive"
                  : "bg-primary/20 text-primary"
              }`}
            >
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
            <Button
              onClick={() => setShowSubmitDialog(true)}
              className="bg-gradient-primary"
            >
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Question */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Card className="max-w-4xl mx-auto p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                    Question {currentQuestion + 1} of {config.questions.length}
                  </span>
                  {bookmarkedQuestions.has(currentQuestion) && (
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-600 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Bookmark className="w-3 h-3" />
                      Bookmarked
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold leading-relaxed">
                  {currentQuestionData.question}
                </h2>
              </div>
            </div>

            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestionData.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    answers[currentQuestion] === option
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleAnswerChange(option)}
                >
                  <RadioGroupItem value={option} id={`option-${idx}`} />
                  <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer text-base">
                    <span className="font-semibold mr-2">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Bottom controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <div className="flex gap-2">
                <Button onClick={handleMarkForReview} variant="outline" className="gap-2">
                  <Flag className="w-4 h-4" />
                  Mark for Review
                </Button>
                <Button onClick={toggleBookmark} variant="outline" className="gap-2">
                  <Bookmark className="w-4 h-4" />
                  {bookmarkedQuestions.has(currentQuestion) ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentQuestion === config.questions.length - 1}
                  className="bg-gradient-primary"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Navigator */}
        <aside className="w-80 border-l border-border bg-card p-6 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Question Navigator</h3>

          <div className="space-y-2 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Attempted:</span> <span className="font-semibold">{attemptedCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Marked:</span> <span className="font-semibold text-purple-600">{markedCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Unattempted:</span>
              <span className="font-semibold text-muted-foreground">
                {config.questions.length - attemptedCount}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {config.questions.map((_, idx) => (
              <Button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                variant="outline"
                className={`h-10 w-10 p-0 ${getStatusColor(questionStatuses[idx])} ${
                  currentQuestion === idx ? "ring-2 ring-primary ring-offset-2" : ""
                } ${questionStatuses[idx] !== "unattempted" ? "text-white" : ""}`}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </aside>
      </div>

      {/* Submit Confirmation */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You’ve attempted {attemptedCount} of {config.questions.length} questions.
              {attemptedCount < config.questions.length && (
                <span className="block mt-2 text-destructive font-semibold">
                  {config.questions.length - attemptedCount} unattempted questions remain!
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitQuiz}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time Warning */}
      <AlertDialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" /> Time Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              Only 5 minutes left! The quiz will auto-submit when time runs out.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowWarningDialog(false)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizExam;
