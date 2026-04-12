import { useEffect, useRef, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, XCircle, FileText, BookOpen, ChevronDown, ChevronUp, ArrowRight, RotateCcw, PenLine, Link2, Trophy, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react";

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

// Normalize and check fill_blank answer
function checkFillBlankAnswer(answer: string, correct: string): boolean {
  const normalized = answer.trim().toLowerCase();
  return correct.split("|").some((opt) => opt.trim().toLowerCase() === normalized);
}

// Check a matching answer (JSON map user vs correct)
function checkMatchingAnswer(userAnswer: string, correctAnswer: string): boolean {
  try {
    const correctMap: Record<string, string> = JSON.parse(correctAnswer);
    const userMap: Record<string, string> = userAnswer ? JSON.parse(userAnswer) : {};
    return Object.keys(correctMap).every((k) => userMap[k] === correctMap[k]);
  } catch {
    return false;
  }
}

// Colors for matched pairs
const MATCH_COLORS = [
  { bg: "bg-blue-200 dark:bg-blue-800",    border: "border-blue-400 dark:border-blue-500",    text: "text-blue-900 dark:text-blue-100" },
  { bg: "bg-emerald-200 dark:bg-emerald-800", border: "border-emerald-400 dark:border-emerald-500", text: "text-emerald-900 dark:text-emerald-100" },
  { bg: "bg-purple-200 dark:bg-purple-800",  border: "border-purple-400 dark:border-purple-500",  text: "text-purple-900 dark:text-purple-100" },
  { bg: "bg-amber-200 dark:bg-amber-800",    border: "border-amber-400 dark:border-amber-500",    text: "text-amber-900 dark:text-amber-100" },
  { bg: "bg-rose-200 dark:bg-rose-800",      border: "border-rose-400 dark:border-rose-500",      text: "text-rose-900 dark:text-rose-100" },
  { bg: "bg-cyan-200 dark:bg-cyan-800",      border: "border-cyan-400 dark:border-cyan-500",      text: "text-cyan-900 dark:text-cyan-100" },
  { bg: "bg-indigo-200 dark:bg-indigo-800",  border: "border-indigo-400 dark:border-indigo-500",  text: "text-indigo-900 dark:text-indigo-100" },
  { bg: "bg-teal-200 dark:bg-teal-800",      border: "border-teal-400 dark:border-teal-500",      text: "text-teal-900 dark:text-teal-100" },
];

// Inline fill-blank input
function FillBlankInput({
  text, value, onChange, disabled,
}: {
  text: string; value: string; onChange: (v: string) => void; disabled: boolean;
}) {
  const parts = text.split("___");
  if (parts.length === 1) {
    return (
      <div className="space-y-3">
        <p className="text-lg leading-relaxed text-foreground">{text}</p>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Écris ta réponse…"
          className="max-w-xs text-base border-2 border-amber-300 dark:border-amber-700 focus-visible:ring-amber-400"
          data-testid="input-fill-blank"
        />
      </div>
    );
  }
  return (
    <div className="text-lg leading-relaxed text-foreground flex flex-wrap items-center gap-1">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1 flex-wrap">
          <span>{part}</span>
          {i < parts.length - 1 && (
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="…"
              className="inline-block w-36 text-base border-2 border-amber-300 dark:border-amber-700 focus-visible:ring-amber-400"
              data-testid="input-fill-blank"
            />
          )}
        </span>
      ))}
    </div>
  );
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

  // Matching-specific state
  const [matchingLeft, setMatchingLeft] = useState<string | null>(null);
  const shuffledRightRef = useRef<Record<string, string[]>>({});

  useEffect(() => {
    if (!match || !params?.id) return;

    setCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowFeedback(false);
    setLoading(true);
    setSiblingExercises([]);
    setMatchingLeft(null);
    shuffledRightRef.current = {};

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
            options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
          }));
          setQuestions(parsedQs);
        }

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

  // Reset matching left selection when question changes
  useEffect(() => {
    setMatchingLeft(null);
  }, [currentQuestionIndex]);

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

  const isTextQuestion    = currentQuestion.type === "text";
  const isFillBlankQuestion = currentQuestion.type === "fill_blank";
  const isMatchingQuestion  = currentQuestion.type === "matching";
  const isAutoGraded = !isTextQuestion;

  // Parse matching data
  const matchingCorrectMap: Record<string, string> = isMatchingQuestion
    ? (() => { try { return JSON.parse(currentQuestion.correctAnswer); } catch { return {}; } })()
    : {};

  const matchingLeftItems: string[] = isMatchingQuestion
    ? (currentQuestion.options as string[] || [])
    : [];

  // Stable shuffled right column (per question id)
  const getShuffledRight = (qId: string, correctMap: Record<string, string>): string[] => {
    if (!shuffledRightRef.current[qId]) {
      const items = Object.values(correctMap) as string[];
      shuffledRightRef.current[qId] = [...items].sort(() => Math.random() - 0.5);
    }
    return shuffledRightRef.current[qId];
  };

  const matchingRightItems: string[] = isMatchingQuestion
    ? getShuffledRight(currentQuestion.id, matchingCorrectMap)
    : [];

  const matchingConnections: Record<string, string> = isMatchingQuestion
    ? (() => { try { return currentAnswer ? JSON.parse(currentAnswer) : {}; } catch { return {}; } })()
    : {};

  const matchingRightToLeft: Record<string, string> = {};
  Object.entries(matchingConnections).forEach(([l, r]) => { matchingRightToLeft[r] = l; });

  // Color index for each left item (by its position in leftItems)
  const getMatchColor = (leftItem: string) => {
    const idx = matchingLeftItems.indexOf(leftItem);
    return MATCH_COLORS[idx % MATCH_COLORS.length];
  };

  const isMatchingComplete = isMatchingQuestion
    ? matchingLeftItems.every((l) => matchingConnections[l] !== undefined)
    : true;

  const isCorrect = isTextQuestion
    ? null
    : isMatchingQuestion
    ? checkMatchingAnswer(currentAnswer, currentQuestion.correctAnswer)
    : isFillBlankQuestion
    ? checkFillBlankAnswer(currentAnswer, currentQuestion.correctAnswer)
    : currentAnswer === currentQuestion.correctAnswer;

  const firstQuestion = questions[0];
  const isNarrativeExercise =
    firstQuestion &&
    (firstQuestion.title.toLowerCase().includes("histoire") ||
      exercise.title.toLowerCase().includes("narratif") ||
      exercise.title.toLowerCase().includes("histoire")) &&
    firstQuestion.text.length > 500;

  const isDescriptiveExercise =
    exercise &&
    (exercise.title.startsWith("Description") ||
      exercise.title.includes("Lecture:") ||
      exercise.title.toLowerCase().includes("descriptif")) &&
    firstQuestion &&
    firstQuestion.text.length > 200 &&
    !isNarrativeExercise;

  const storyText = isNarrativeExercise || isDescriptiveExercise ? firstQuestion.text : null;
  const isReadingExercise = isNarrativeExercise || isDescriptiveExercise;

  const isInformatifExercise =
    exercise &&
    (exercise.title.toLowerCase().includes("informatif") ||
      firstQuestion?.text?.length > 500) &&
    !isNarrativeExercise &&
    !isDescriptiveExercise;

  const informatifText =
    isInformatifExercise && firstQuestion && firstQuestion.text.length > 500
      ? firstQuestion.text
      : null;

  const handleAnswerChange = (answer: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answer });
    setShowFeedback(false);
  };

  // Matching click handlers
  const handleMatchingLeftClick = (left: string) => {
    if (showFeedback) return;
    setMatchingLeft(matchingLeft === left ? null : left);
  };

  const handleMatchingRightClick = (right: string) => {
    if (showFeedback || !matchingLeft) return;
    const newConns = { ...matchingConnections };
    const existingLeft = matchingRightToLeft[right];
    if (existingLeft) delete newConns[existingLeft];
    delete newConns[matchingLeft];
    newConns[matchingLeft] = right;
    setMatchingLeft(null);
    handleAnswerChange(JSON.stringify(newConns));
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

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    } else {
      setCompleted(true);
      // Mettre à jour la progression de l'élève pour ce cours
      const userId = localStorage.getItem("userId");
      if (userId && exercise?.courseId) {
        try {
          await fetch(`/api/students/${userId}/progress`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: exercise.courseId }),
          });
        } catch (err) {
          console.error("Erreur mise à jour progression:", err);
        }
      }
    }
  };

  if (completed) {
    // Compute per-question results
    const results = questions.map((q) => {
      const userAnswer = userAnswers[q.id] || "";
      const isText = q.type === "text";
      let isCorrect = false;
      if (!isText) {
        if (q.type === "fill_blank") isCorrect = checkFillBlankAnswer(userAnswer, q.correctAnswer);
        else if (q.type === "matching") isCorrect = checkMatchingAnswer(userAnswer, q.correctAnswer);
        else isCorrect = userAnswer === q.correctAnswer;
      }
      return { q, userAnswer, isCorrect, isText };
    });

    const autoGradedResults = results.filter((r) => !r.isText);
    const textResults = results.filter((r) => r.isText);
    const correctCount = autoGradedResults.filter((r) => r.isCorrect).length;
    const score = autoGradedResults.length > 0
      ? Math.round((correctCount / autoGradedResults.length) * 100)
      : null;

    const currentIndex = siblingExercises.findIndex((ex) => ex.id === params?.id);
    const nextExercise = currentIndex >= 0 && currentIndex < siblingExercises.length - 1
      ? siblingExercises[currentIndex + 1]
      : null;
    const prevExercise = currentIndex > 0 ? siblingExercises[currentIndex - 1] : null;

    // Adaptive recommendation
    type AdaptiveLevel = "excellent" | "bien" | "continue" | "retry";
    const adaptive: {
      level: AdaptiveLevel;
      Icon: typeof Trophy;
      label: string;
      msg: string;
      scoreClass: string;
      bgClass: string;
      retryFirst: boolean;
    } = score === null
      ? { level: "bien", Icon: CheckCircle, label: "Terminé !", msg: "Tes réponses ont été enregistrées.", scoreClass: "text-amber-600 dark:text-amber-400", bgClass: "bg-amber-50 dark:bg-amber-950/40", retryFirst: false }
      : score >= 80
        ? { level: "excellent", Icon: Trophy, label: "Excellent !", msg: "Tu maîtrises très bien ce contenu. Passe à l'exercice suivant !", scoreClass: "text-green-600 dark:text-green-400", bgClass: "bg-green-50 dark:bg-green-950/40", retryFirst: false }
        : score >= 60
          ? { level: "bien", Icon: TrendingUp, label: "Bien !", msg: "Bonne progression. Relis tes erreurs et continue.", scoreClass: "text-blue-600 dark:text-blue-400", bgClass: "bg-blue-50 dark:bg-blue-950/40", retryFirst: false }
          : score >= 40
            ? { level: "continue", Icon: TrendingUp, label: "Continue !", msg: "Relis tes erreurs ci-dessous, puis passe à la suite.", scoreClass: "text-amber-600 dark:text-amber-400", bgClass: "bg-amber-50 dark:bg-amber-950/40", retryFirst: false }
            : { level: "retry", Icon: RefreshCw, label: "Persévère !", msg: "Recommence l'exercice pour mieux assimiler le contenu.", scoreClass: "text-red-600 dark:text-red-400", bgClass: "bg-red-50 dark:bg-red-950/40", retryFirst: true };

    const retryFn = () => {
      setCompleted(false);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowFeedback(false);
      setMatchingLeft(null);
      shuffledRightRef.current = {};
    };

    // Display helpers for review
    const displayUserAnswer = (q: Question, userAnswer: string): string => {
      if (!userAnswer) return "(non répondu)";
      if (q.type === "matching") {
        try {
          const map: Record<string, string> = JSON.parse(userAnswer);
          return Object.entries(map).map(([k, v]) => `${k} → ${v}`).join("  •  ");
        } catch { return userAnswer; }
      }
      return userAnswer;
    };

    const displayCorrectAnswer = (q: Question): string => {
      if (q.type === "matching") {
        try {
          const map: Record<string, string> = JSON.parse(q.correctAnswer);
          return Object.entries(map).map(([k, v]) => `${k} → ${v}`).join("  •  ");
        } catch { return q.correctAnswer; }
      }
      if (q.type === "fill_blank") return q.correctAnswer.split("|").join(" ou ");
      return q.correctAnswer;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">

          {/* ── Score card ── */}
          <Card className="p-8">
            <div className="text-center">
              <adaptive.Icon className={`w-12 h-12 mx-auto mb-3 ${adaptive.scoreClass}`} />
              <h1 className="text-2xl font-bold text-foreground mb-1">{adaptive.label}</h1>
              <p className="text-sm text-muted-foreground mb-4">{adaptive.msg}</p>

              {score !== null && (
                <div className={`inline-block rounded-md px-6 py-4 mb-4 ${adaptive.bgClass}`}>
                  <span className={`text-5xl font-extrabold ${adaptive.scoreClass}`}>{score}%</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {correctCount} bonne{correctCount !== 1 ? "s" : ""} réponse
                    {correctCount !== 1 ? "s" : ""} sur {autoGradedResults.length}
                  </p>
                </div>
              )}

              {textResults.length > 0 && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>
                    {textResults.length} réponse{textResults.length > 1 ? "s" : ""} écrite
                    {textResults.length > 1 ? "s" : ""} en attente de correction par l'enseignant
                  </span>
                </div>
              )}
            </div>

            {siblingExercises.length > 1 && (
              <div className="mt-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Progression dans le cours</span>
                  <span>{currentIndex + 1} / {siblingExercises.length}</span>
                </div>
                <div className="flex gap-1">
                  {siblingExercises.map((ex, i) => (
                    <div
                      key={ex.id}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= currentIndex ? "bg-amber-500" : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* ── Question-by-question review ── */}
          {results.length > 0 && (
            <Card className="p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">
                Révision des réponses
              </h2>
              <div className="space-y-4">
                {results.map((r, i) => (
                  <div key={r.q.id} data-testid={`review-question-${i}`}>
                    {i > 0 && <Separator className="mb-4" />}
                    <div className="flex items-start gap-3">
                      {/* Status icon */}
                      <div className="mt-0.5 shrink-0">
                        {r.isText ? (
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        ) : r.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Question label */}
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-medium text-muted-foreground">
                            Question {i + 1}
                          </span>
                          {r.isText ? (
                            <Badge variant="secondary" className="text-xs">À corriger</Badge>
                          ) : r.isCorrect ? (
                            <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Correct</Badge>
                          ) : (
                            <Badge variant="destructive" className="text-xs">Incorrect</Badge>
                          )}
                        </div>

                        {/* Question text (truncated) */}
                        <p className="text-sm font-medium text-foreground mb-2 leading-snug">
                          {r.q.text.length > 120
                            ? r.q.title.replace(/^Question\s*\d*\s*:\s*/i, "").trim() || r.q.text.slice(0, 120) + "…"
                            : r.q.text}
                        </p>

                        {/* Answers */}
                        <div className="space-y-1 text-sm">
                          {r.isText ? (
                            <div className="bg-secondary/50 rounded-md px-3 py-2 text-muted-foreground italic">
                              {r.userAnswer || "(aucune réponse)"}
                            </div>
                          ) : (
                            <>
                              {/* User answer */}
                              <div className={`rounded-md px-3 py-1.5 ${
                                r.isCorrect
                                  ? "bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300"
                                  : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300"
                              }`}>
                                <span className="font-medium">Ta réponse : </span>
                                {displayUserAnswer(r.q, r.userAnswer)}
                              </div>

                              {/* Correct answer — only shown if wrong */}
                              {!r.isCorrect && (
                                <div className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 rounded-md px-3 py-1.5">
                                  <span className="font-medium">Bonne réponse : </span>
                                  {displayCorrectAnswer(r.q)}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ── Navigation ── */}
          <Card className="p-6 space-y-3">
            {/* Primary adaptive CTA */}
            {adaptive.retryFirst ? (
              <>
                <Button onClick={retryFn} className="w-full" data-testid="button-retry-exercise">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Recommencer l'exercice
                </Button>
                {nextExercise && (
                  <Button
                    variant="outline"
                    onClick={() => setLocation(`/exercise/${nextExercise.id}`)}
                    className="w-full"
                    data-testid="button-next-exercise"
                  >
                    Exercice suivant quand même
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </>
            ) : (
              <>
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
                <Button
                  variant="outline"
                  onClick={retryFn}
                  className="w-full"
                  data-testid="button-retry-exercise"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Recommencer
                </Button>
              </>
            )}

            <Separator />

            <div className="flex gap-3">
              {exercise?.courseId && (
                <Button
                  variant="ghost"
                  onClick={() => setLocation(`/course/${exercise.courseId}`)}
                  className="flex-1"
                  data-testid="button-back-course"
                >
                  Retour au cours
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={() => setLocation("/student-dashboard")}
                className="flex-1 text-muted-foreground"
                data-testid="button-back-dashboard"
              >
                Tableau de bord
              </Button>
            </div>
          </Card>

        </div>
      </div>
    );
  }

  const questionDisplayText = (() => {
    if ((isReadingExercise || isInformatifExercise) && currentQuestion.text.length > 200) {
      return currentQuestion.title.includes(":")
        ? currentQuestion.title.split(":").slice(1).join(":").trim()
        : currentQuestion.title;
    }
    return currentQuestion.text;
  })();

  // Matching feedback: per-pair result
  const matchingFeedbackPairs: { left: string; userRight: string; correctRight: string; ok: boolean }[] =
    showFeedback && isMatchingQuestion
      ? matchingLeftItems.map((l) => ({
          left: l,
          userRight: matchingConnections[l] || "(non répondu)",
          correctRight: matchingCorrectMap[l] || "",
          ok: matchingConnections[l] === matchingCorrectMap[l],
        }))
      : [];

  const canSubmit = isMatchingQuestion
    ? isMatchingComplete
    : currentAnswer.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/student-dashboard")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold truncate">{exercise.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} sur {questions.length}
              </p>
            </div>
          </div>
          <div className="w-32 shrink-0 bg-secondary rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Reading panel — informatif */}
        {isInformatifExercise && informatifText && (
          <Collapsible open={storyPanelOpen} onOpenChange={setStoryPanelOpen} className="mb-6">
            <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-between p-2" data-testid="button-toggle-story">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-semibold text-purple-800 dark:text-purple-200">Texte informatif</span>
                  </div>
                  {storyPanelOpen ? <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 max-h-80 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{informatifText}</p>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Reading panel — descriptif */}
        {isDescriptiveExercise && storyText && (
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="font-semibold text-blue-800 dark:text-blue-200">Texte à lire</span>
            </div>
            <div className="max-h-64 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{storyText}</p>
            </div>
          </Card>
        )}

        {/* Reading panel — narratif */}
        {isNarrativeExercise && storyText && (
          <Collapsible open={storyPanelOpen} onOpenChange={setStoryPanelOpen} className="mb-6">
            <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-between p-2" data-testid="button-toggle-story">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span className="font-semibold text-amber-800 dark:text-amber-200">Texte de l'histoire</span>
                  </div>
                  {storyPanelOpen ? <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" /> : <ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 max-h-80 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{storyText}</p>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        <Card className="p-8 mb-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200">
                Question {currentQuestionIndex + 1}
              </h2>
              {isFillBlankQuestion && (
                <span className="text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-700">
                  <PenLine className="w-3 h-3 inline mr-1" />
                  Complète la phrase
                </span>
              )}
              {isMatchingQuestion && (
                <span className="text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700">
                  <Link2 className="w-3 h-3 inline mr-1" />
                  Association
                </span>
              )}
            </div>

            {/* Question prompt — non-fill-blank, non-matching */}
            {!isFillBlankQuestion && !isMatchingQuestion && (
              <div className="prose prose-sm dark:prose-invert max-w-none bg-amber-50 dark:bg-amber-900/10 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
                <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground">
                  {questionDisplayText}
                </p>
              </div>
            )}

            {/* Fill blank */}
            {isFillBlankQuestion && (
              <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
                <FillBlankInput
                  text={currentQuestion.text}
                  value={currentAnswer}
                  onChange={handleAnswerChange}
                  disabled={showFeedback}
                />
                {currentQuestion.title && (
                  <p className="text-sm text-muted-foreground mt-3 italic">
                    {currentQuestion.title.includes(":")
                      ? currentQuestion.title.split(":").slice(1).join(":").trim()
                      : currentQuestion.title}
                  </p>
                )}
              </div>
            )}

            {/* ─── MATCHING ─── */}
            {isMatchingQuestion && (
              <div className="space-y-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border-l-4 border-emerald-500">
                  <p className="text-base font-medium text-foreground">{currentQuestion.text}</p>
                  {!showFeedback && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {matchingLeft
                        ? "Maintenant clique sur la bonne réponse dans la colonne de droite."
                        : "Clique d'abord sur un élément de la colonne gauche, puis sur sa correspondance à droite."}
                    </p>
                  )}
                </div>

                {/* Progress indicator */}
                {!showFeedback && (
                  <p className="text-xs text-muted-foreground text-right">
                    {Object.keys(matchingConnections).length} / {matchingLeftItems.length} paires reliées
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {/* LEFT column */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-1 border-b border-border">
                      Colonne A
                    </p>
                    {matchingLeftItems.map((left) => {
                      const connected = matchingConnections[left] !== undefined;
                      const isSelected = matchingLeft === left;
                      const color = getMatchColor(left);
                      return (
                        <button
                          key={left}
                          onClick={() => handleMatchingLeftClick(left)}
                          disabled={showFeedback}
                          data-testid={`matching-left-${left}`}
                          className={`w-full p-3 text-left rounded-lg border-2 font-semibold text-sm transition-all ${
                            isSelected
                              ? "border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ring-2 ring-blue-300"
                              : connected
                              ? `${color.bg} ${color.border} ${color.text}`
                              : "border-border bg-background hover-elevate"
                          }`}
                        >
                          {left}
                          {connected && !isSelected && (
                            <span className="float-right opacity-60 text-xs font-normal">
                              {matchingConnections[left]}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* RIGHT column */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-1 border-b border-border">
                      Colonne B
                    </p>
                    {matchingRightItems.map((right) => {
                      const pairedLeft = matchingRightToLeft[right];
                      const isPaired = pairedLeft !== undefined;
                      const color = isPaired ? getMatchColor(pairedLeft) : null;
                      const isTarget = !!matchingLeft && !isPaired;
                      return (
                        <button
                          key={right}
                          onClick={() => handleMatchingRightClick(right)}
                          disabled={showFeedback || (!matchingLeft && !isPaired)}
                          data-testid={`matching-right-${right}`}
                          className={`w-full p-3 text-left rounded-lg border-2 text-sm transition-all ${
                            isPaired && color
                              ? `${color.bg} ${color.border} ${color.text} font-semibold`
                              : isTarget
                              ? "border-dashed border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-foreground hover-elevate cursor-pointer"
                              : "border-border bg-background"
                          }`}
                        >
                          {right}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback: per-pair results */}
                {showFeedback && matchingFeedbackPairs.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-semibold text-foreground">Résultats :</p>
                    {matchingFeedbackPairs.map(({ left, userRight, correctRight, ok }) => (
                      <div
                        key={left}
                        className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
                          ok
                            ? "bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700"
                            : "bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700"
                        }`}
                      >
                        {ok
                          ? <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                          : <XCircle   className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                        }
                        <div className="min-w-0">
                          <span className="font-bold">{left}</span>
                          {" → "}
                          {ok ? (
                            <span className="text-green-700 dark:text-green-300">{userRight}</span>
                          ) : (
                            <>
                              <span className="text-red-500 line-through mr-2">{userRight}</span>
                              <span className="text-green-700 dark:text-green-300 font-semibold">{correctRight}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Multiple choice */}
            {currentQuestion.type === "multiple_choice" && (
              <div className="space-y-4 mt-6">
                {((currentQuestion.options as string[]) || []).map((option) => (
                  <button
                    key={option}
                    onClick={() => !showFeedback && handleAnswerChange(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all text-base ${
                      currentAnswer === option
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                        : "border-border bg-background"
                    } hover-elevate`}
                    data-testid={`button-option-${option}`}
                    disabled={showFeedback}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Select */}
            {currentQuestion.type === "select" && (
              <div className="mt-6">
                <Select value={currentAnswer} onValueChange={handleAnswerChange}>
                  <SelectTrigger className="w-full" data-testid="select-answer">
                    <SelectValue placeholder="Choisissez une réponse..." />
                  </SelectTrigger>
                  <SelectContent>
                    {((currentQuestion.options as string[]) || []).map((option) => (
                      <SelectItem key={option} value={option} data-testid={`select-option-${option}`}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Free text */}
            {currentQuestion.type === "text" && (
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

          {/* Submit button */}
          {!showFeedback && (
            <Button
              onClick={handleSubmitAnswer}
              className="w-full"
              disabled={!canSubmit}
              data-testid="button-submit-answer"
            >
              {isMatchingQuestion && !isMatchingComplete
                ? `Relie toutes les paires (${Object.keys(matchingConnections).length}/${matchingLeftItems.length})`
                : "Valider ma réponse"}
            </Button>
          )}

          {/* Feedback panel */}
          {showFeedback && (
            <div className="space-y-4 mt-4">
              {isTextQuestion ? (
                <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900 border-2 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    <span className="font-bold text-blue-700 dark:text-blue-200">Réponse enregistrée</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Votre réponse sera évaluée par le professeur.
                  </p>
                </div>
              ) : isMatchingQuestion ? (
                <div className={`p-4 rounded-lg border-2 ${isCorrect ? "bg-green-100 dark:bg-green-900 border-green-500" : "bg-red-100 dark:bg-red-900 border-red-500"}`}>
                  <div className="flex items-center gap-2">
                    {isCorrect
                      ? <><CheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" /><span className="font-bold text-green-700 dark:text-green-200">Toutes les paires sont correctes !</span></>
                      : <><XCircle   className="w-5 h-5 text-red-600 dark:text-red-300"   /><span className="font-bold text-red-700 dark:text-red-200">Certaines paires sont incorrectes.</span></>
                    }
                  </div>
                </div>
              ) : (
                <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-100 dark:bg-green-900 border-2 border-green-500" : "bg-red-100 dark:bg-red-900 border-2 border-red-500"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect
                      ? <><CheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" /><span className="font-bold text-green-700 dark:text-green-200">Correct !</span></>
                      : <><XCircle   className="w-5 h-5 text-red-600 dark:text-red-300"   /><span className="font-bold text-red-700 dark:text-red-200">Incorrect</span></>
                    }
                  </div>
                  {!isCorrect && (
                    <p className="text-sm">
                      <strong>Bonne réponse :</strong> {currentQuestion.correctAnswer.split("|")[0]}
                    </p>
                  )}
                </div>
              )}

              <Button
                onClick={handleNextQuestion}
                className="w-full"
                data-testid="button-next-question"
              >
                {currentQuestionIndex === questions.length - 1 ? "Terminer l'exercice" : "Prochaine question"}
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
