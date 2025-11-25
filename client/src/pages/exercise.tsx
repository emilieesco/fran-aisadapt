import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: string;
  title: string;
  text: string;
  type: string;
  options?: string | string[];
  correctAnswer: string;
  order: number;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: string;
}

export default function Exercise() {
  const [match, params] = useRoute("/exercise/:id");
  const [, setLocation] = useLocation();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!match || !params?.id) return;

    const fetchExercise = async () => {
      try {
        const [exerciseRes, questionsRes] = await Promise.all([
          fetch(`/api/exercises/${params.id}`, { credentials: "include" }),
          fetch(`/api/exercises/${params.id}/questions`, { credentials: "include" }),
        ]);

        if (exerciseRes.ok) setExercise(await exerciseRes.json());
        if (questionsRes.ok) {
          const qs = await questionsRes.json();
          // Parse JSON options if they're strings
          const parsedQs = qs.map((q: Question) => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
          }));
          setQuestions(parsedQs);
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [match, params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <p>Chargement de l'exercice...</p>
      </div>
    );
  }

  if (!exercise || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <p>Exercice non trouvé</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestion.id] || "";
  const isCorrect = currentAnswer === currentQuestion.correctAnswer;

  const handleAnswerChange = (answer: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answer });
    setShowFeedback(false);
  };

  const handleSubmitAnswer = async () => {
    setShowFeedback(true);

    try {
      const userId = localStorage.getItem("userId");
      await fetch("/api/student-responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: userId,
          questionId: currentQuestion.id,
          answer: currentAnswer,
          isCorrect,
          createdAt: new Date().toISOString(),
        }),
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    const correctCount = questions.filter(
      (q) => userAnswers[q.id] === q.correctAnswer
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4 text-amber-900">Bravo!</h1>
          <p className="text-lg mb-2">Vous avez complété l'exercice</p>
          <p className="text-2xl font-bold text-amber-700 mb-6">
            {correctCount}/{questions.length} correct
          </p>
          <Button
            onClick={() => setLocation("/student-dashboard")}
            className="w-full"
            data-testid="button-back-dashboard"
          >
            Retour au tableau de bord
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/student-dashboard")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{exercise.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} sur {questions.length}
              </p>
            </div>
          </div>
          <div className="w-32 bg-secondary rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 mb-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>

            {currentQuestion.type === "multiple_choice" ? (
              <div className="space-y-3">
                {(currentQuestion.options || []).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerChange(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      currentAnswer === option
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                        : "border-border bg-background"
                    } hover-elevate`}
                    data-testid={`button-option-${option}`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full p-4 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Écrivez votre réponse..."
                data-testid="textarea-answer"
              />
            )}
          </div>

          {!showFeedback && (
            <Button
              onClick={handleSubmitAnswer}
              className="w-full"
              disabled={!currentAnswer}
              data-testid="button-submit-answer"
            >
              Valider ma réponse
            </Button>
          )}

          {showFeedback && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? "bg-green-100 dark:bg-green-900 border-2 border-green-500"
                    : "bg-red-100 dark:bg-red-900 border-2 border-red-500"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
                      <span className="font-bold text-green-700 dark:text-green-200">
                        Correct!
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-300" />
                      <span className="font-bold text-red-700 dark:text-red-200">
                        Incorrect
                      </span>
                    </>
                  )}
                </div>
                {!isCorrect && (
                  <p className="text-sm">
                    <strong>Bonne réponse:</strong> {currentQuestion.correctAnswer}
                  </p>
                )}
              </div>

              <Button
                onClick={handleNextQuestion}
                className="w-full"
                data-testid="button-next-question"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Terminer l'exercice"
                  : "Prochaine question"}
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
