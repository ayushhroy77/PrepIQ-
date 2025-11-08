import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import { QuizConfig } from "./QuizGenerator";

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [module, setModule] = useState("");
  const [examFormat, setExamFormat] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [availableModules, setAvailableModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const modules = {
    Physics: ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism", "Modern Physics", "Waves and Sound"],
    Chemistry: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Environmental Chemistry"],
    Biology: ["Cell Biology", "Genetics", "Human Physiology", "Ecology", "Botany", "Zoology"],
    Maths: ["Algebra", "Calculus", "Trigonometry", "Coordinate Geometry", "Probability", "Statistics"],
  };

  const examFormats = ["JEE Main", "JEE Advanced", "NEET", "General Practice"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const questionCounts = ["5", "10", "15", "20", "30"];

  useEffect(() => {
    if (subject) {
      setAvailableModules(modules[subject as keyof typeof modules] || []);
      setModule("");
    }
  }, [subject]);

  const calculateTimeLimit = () => {
    if (!examFormat || !numQuestions) return 0;
    const timeLimits: { [key: string]: number } = {
      "JEE Main": 3,
      "JEE Advanced": 4,
      "NEET": 2.5,
      "General Practice": 2,
    };
    return Math.round(parseInt(numQuestions) * timeLimits[examFormat]);
  };

  const handleStartQuiz = async () => {
    if (!subject || !module || !examFormat || !difficulty || !numQuestions) {
      toast({
        title: "Incomplete Selection",
        description: "Please fill in all fields to start the quiz",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/quiz/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          module,
          exam_format: examFormat,
          difficulty,
          num_questions: parseInt(numQuestions),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const quizData = await response.json();
      onStartQuiz(quizData);
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-2xl font-bold">Quiz Generator</h1>
              <p className="text-sm text-muted-foreground">
                Create your custom practice test
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto p-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Configure Your Quiz</h2>
              <p className="text-muted-foreground">
                Customize your practice session
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Subject Selection */}
            <div>
              <Label htmlFor="subject" className="text-base font-semibold mb-2">
                Subject *
              </Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject" className="h-12">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Maths">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Module Selection */}
            <div>
              <Label htmlFor="module" className="text-base font-semibold mb-2">
                Module/Topic *
              </Label>
              <Select
                value={module}
                onValueChange={setModule}
                disabled={!subject}
              >
                <SelectTrigger id="module" className="h-12">
                  <SelectValue placeholder="Select a module" />
                </SelectTrigger>
                <SelectContent>
                  {availableModules.map((mod) => (
                    <SelectItem key={mod} value={mod}>
                      {mod}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exam Format */}
            <div>
              <Label htmlFor="format" className="text-base font-semibold mb-2">
                Exam Format *
              </Label>
              <Select value={examFormat} onValueChange={setExamFormat}>
                <SelectTrigger id="format" className="h-12">
                  <SelectValue placeholder="Select exam format" />
                </SelectTrigger>
                <SelectContent>
                  {examFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Level */}
            <div>
              <Label
                htmlFor="difficulty"
                className="text-base font-semibold mb-2"
              >
                Difficulty Level *
              </Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty" className="h-12">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Questions */}
            <div>
              <Label
                htmlFor="numQuestions"
                className="text-base font-semibold mb-2"
              >
                Number of Questions *
              </Label>
              <Select value={numQuestions} onValueChange={setNumQuestions}>
                <SelectTrigger id="numQuestions" className="h-12">
                  <SelectValue placeholder="Select number of questions" />
                </SelectTrigger>
                <SelectContent>
                  {questionCounts.map((count) => (
                    <SelectItem key={count} value={count}>
                      {count} Questions
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Limit Display */}
            {examFormat && numQuestions && (
              <Card className="p-4 bg-accent/50 border-primary/20">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Estimated Time</p>
                    <p className="text-sm text-muted-foreground">
                      {calculateTimeLimit()} minutes for this quiz
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Start Button */}
            <Button
              onClick={handleStartQuiz}
              disabled={loading}
              className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
            >
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Quiz
                </>
              )}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default QuizSetup;
