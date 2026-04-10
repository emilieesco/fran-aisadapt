import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, CheckCircle, XCircle, FileText, BookOpen, ChevronDown, ChevronUp, ArrowRight, RotateCcw } from "lucide-react";

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
  courseId: string;
  title: string;
  description: string;
  type: string;
  order?: number;
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
  const [storyPanelOpen, setStoryPanelOpen] = useState(true);
  const [siblingExercises, setSiblingExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (!match || !params?.id) return;

    // Reset state for the new exercise
    setCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowFeedback(false);
    setLoading(true);
    setSiblingExercises([]);

    const fetchExercise = async () => {
      try {
        const [exerciseRes, questionsRes] = await Promise.all([
          fetch(`/api/exercises/${params.id}`, { credentials: "include" }),
          fetch(`/api/exercises/${params.id}/questions`, { credentials: "include" }),
        ]);

        let fetchedExercise: Exercise | null = null;
        if (exerciseRes.ok) {
          fetchedExercise = await exerciseRes.json();
          setExercise(fetchedExercise);
        }
        if (questionsRes.ok) {
          const qs = await questionsRes.json();
          const parsedQs = qs.map((q: Question) => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
          }));
          setQuestions(parsedQs);
        }

        // Fetch sibling exercises from the same course
        if (fetchedExercise?.courseId) {
          const siblingsRes = await fetch(
            `/api/courses/${fetchedExercise.courseId}/exercises`,
            { credentials: "include" }
          );
          if (siblingsRes.ok) {
            const siblings: Exercise[] = await siblingsRes.json();
            setSiblingExercises(siblings.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
          }
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
  
  // For text questions, we don't evaluate correctness - it will be reviewed by the teacher
  const isTextQuestion = currentQuestion.type === "text";
  const isCorrect = isTextQuestion ? null : currentAnswer === currentQuestion.correctAnswer;

  // Check if this is a reading comprehension exercise (narrative or descriptive)
  const firstQuestion = questions[0];
  const isNarrativeExercise = firstQuestion && 
    firstQuestion.title.toLowerCase().includes("histoire") && 
    firstQuestion.text.length > 500;
  
  // Check if this is a descriptive text exercise (title starts with "Description" and has long text)
  const isDescriptiveExercise = exercise &&
    (exercise.title.startsWith("Description") || exercise.title.includes("Lecture:")) &&
    firstQuestion &&
    firstQuestion.text.length > 200 &&
    !isNarrativeExercise;
  
  // Extract story/text from the first question if this is a reading exercise
  const storyText = (isNarrativeExercise || isDescriptiveExercise) ? firstQuestion.text : null;
  const isReadingExercise = isNarrativeExercise || isDescriptiveExercise;

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
          isCorrect: isTextQuestion ? null : isCorrect,
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
    const autoGradedQuestions = questions.filter((q) => q.type !== "text");
    const textQuestions = questions.filter((q) => q.type === "text");
    const correctCount = autoGradedQuestions.filter(
      (q) => userAnswers[q.id] === q.correctAnswer
    ).length;
    const score = autoGradedQuestions.length > 0
      ? Math.round((correctCount / autoGradedQuestions.length) * 100)
      : null;

    // Find the next exercise in the same course
    const currentIndex = siblingExercises.findIndex((ex) => ex.id === params?.id);
    const nextExercise = currentIndex >= 0 && currentIndex < siblingExercises.length - 1
      ? siblingExercises[currentIndex + 1]
      : null;
    const prevExercise = currentIndex > 0
      ? siblingExercises[currentIndex - 1]
      : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8">
          {/* Score header */}
          <div className="text-center mb-6">
            <CheckCircle className="w-14 h-14 text-amber-500 mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-foreground">Exercice terminé !</h1>
            {score !== null && (
              <div className="mt-3">
                <span className="text-4xl font-extrabold text-amber-600 dark:text-amber-400">
                  {score}%
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  {correctCount} bonne{correctCount !== 1 ? "s" : ""} réponse{correctCount !== 1 ? "s" : ""} sur {autoGradedQuestions.length}
                </p>
              </div>
            )}
            {textQuestions.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {textQuestions.length} réponse{textQuestions.length > 1 ? "s" : ""} écrite{textQuestions.length > 1 ? "s" : ""} en attente de correction
              </p>
            )}
          </div>

          {/* Progress recap */}
          {siblingExercises.length > 1 && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progression dans le cours</span>
                <span>{currentIndex + 1} / {siblingExercises.length}</span>
              </div>
              <div className="flex gap-1">
                {siblingExercises.map((ex, i) => (
                  <div
                    key={ex.id}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= currentIndex
                        ? "bg-amber-500"
                        : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="space-y-3">
            {nextExercise && (
              <Button
                onClick={() => setLocation(`/exercise/${nextExercise.id}`)}
                className="w-full"
                data-testid="button-next-exercise"
              >
                Exercice suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            <div className="flex gap-3">
              {prevExercise && (
                <Button
                  variant="outline"
                  onClick={() => setLocation(`/exercise/${prevExercise.id}`)}
                  className="flex-1"
                  data-testid="button-prev-exercise"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setCompleted(false);
                  setCurrentQuestionIndex(0);
                  setUserAnswers({});
                  setShowFeedback(false);
                }}
                className="flex-1"
                data-testid="button-retry-exercise"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Recommencer
              </Button>
            </div>

            {exercise?.courseId && (
              <Button
                variant="ghost"
                onClick={() => setLocation(`/course/${exercise.courseId}`)}
                className="w-full"
                data-testid="button-back-course"
              >
                Retour au cours
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() => setLocation("/student-dashboard")}
              className="w-full text-muted-foreground"
              data-testid="button-back-dashboard"
            >
              Tableau de bord
            </Button>
          </div>
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
        {/* Story/Text Panel for Reading Comprehension */}
        {isReadingExercise && storyText && (
          <>
            {isDescriptiveExercise ? (
              // For descriptive texts: show permanently at the top
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-blue-800 dark:text-blue-200">
                    Texte à lire
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                    {storyText}
                  </p>
                </div>
              </Card>
            ) : (
              // For narrative texts: collapsible panel
              <Collapsible open={storyPanelOpen} onOpenChange={setStoryPanelOpen} className="mb-6">
                <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                      data-testid="button-toggle-story"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span className="font-semibold text-amber-800 dark:text-amber-200">
                          Texte de l'histoire
                        </span>
                      </div>
                      {storyPanelOpen ? (
                        <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 max-h-80 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                        {storyText}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )}
          </>
        )}

        <Card className="p-8 mb-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-amber-900 dark:text-amber-200">
              Question {currentQuestionIndex + 1}
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none bg-amber-50 dark:bg-amber-900/10 p-6 rounded-lg border-l-4 border-amber-500">
              <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground">
                {/* For descriptive exercises with long text, extract question from title */}
                {isDescriptiveExercise && currentQuestion.text.length > 200 ? (
                  currentQuestion.title.includes(":") 
                    ? currentQuestion.title.split(":").slice(1).join(":").trim()
                    : currentQuestion.title
                ) : currentQuestion.text}
              </p>
            </div>

            {currentQuestion.type === "multiple_choice" ? (
              <div className="space-y-4 mt-6">
                {(currentQuestion.options || []).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerChange(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all text-base ${
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
            ) : currentQuestion.type === "select" ? (
              <div className="mt-6">
                <Select value={currentAnswer} onValueChange={handleAnswerChange}>
                  <SelectTrigger className="w-full" data-testid="select-answer">
                    <SelectValue placeholder="Choisissez une réponse..." />
                  </SelectTrigger>
                  <SelectContent>
                    {(currentQuestion.options || []).map((option) => (
                      <SelectItem key={option} value={option} data-testid={`select-option-${option}`}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="mt-6 space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Votre réponse
                </label>
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[160px] text-base bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-300 dark:border-amber-700 focus-visible:ring-amber-400"
                  placeholder="Écrivez votre réponse ici…"
                  data-testid="textarea-answer"
                />
                <p className="text-xs text-muted-foreground">
                  Réponse libre — elle sera lue et corrigée par votre enseignant.
                </p>
              </div>
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
              {isTextQuestion ? (
                // For text questions, show "Answer recorded" message
                <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900 border-2 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    <span className="font-bold text-blue-700 dark:text-blue-200">
                      Réponse enregistrée
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Votre réponse sera évaluée par le professeur.
                  </p>
                </div>
              ) : (
                // For multiple choice / select questions, show correct/incorrect
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
              )}

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
