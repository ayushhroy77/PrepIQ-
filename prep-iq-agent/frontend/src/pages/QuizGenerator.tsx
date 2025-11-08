import { useState } from "react";
import QuizSetup from "./QuizSetup";
import QuizExam from "./QuizExam";
import QuizResults from "./QuizResults";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizConfig {
  quiz_id: string;
  subject: string;
  module: string;
  exam_format: string;
  difficulty: string;
  time_limit_minutes: number;
  questions: QuizQuestion[];
}

export type QuizStage = "setup" | "exam" | "results";

const QuizGenerator = () => {
  const [stage, setStage] = useState<QuizStage>("setup");
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizResults, setQuizResults] = useState<any>(null);

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setStage("exam");
  };

  const handleSubmitQuiz = (results: any) => {
    setQuizResults(results);
    setStage("results");
  };

  const handleRetakeQuiz = () => {
    setStage("setup");
    setQuizConfig(null);
    setQuizResults(null);
  };

  return (
    <>
      {stage === "setup" && <QuizSetup onStartQuiz={handleStartQuiz} />}
      {stage === "exam" && quizConfig && (
        <QuizExam config={quizConfig} onSubmitQuiz={handleSubmitQuiz} />
      )}
      {stage === "results" && quizResults && (
        <QuizResults results={quizResults} onRetakeQuiz={handleRetakeQuiz} />
      )}
    </>
  );
};

export default QuizGenerator;
