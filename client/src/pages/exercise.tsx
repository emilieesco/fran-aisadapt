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
import { ArrowLeft, CheckCircle, XCircle, FileText, BookOpen, ChevronDown, ChevronUp, ArrowRight, RotateCcw, PenLine, Link2, Trophy, TrendingUp, AlertTriangle, RefreshCw, Volume2, VolumeX, RotateCw, Pause, LayoutGrid, CheckSquare, HelpCircle, ArrowUp, ArrowDown, List, Layers, RotateCcw as FlipIcon, ThumbsUp, BookMarked } from "lucide-react";
import { ReadAloudButton, WordPredictor } from "@/components/accessibility-toolbar";

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

// Parse sorting question options: { categories, items }
function parseSortingOptions(options: string | string[] | undefined): { categories: string[]; items: string[] } {
  try {
    const parsed = JSON.parse(typeof options === "string" ? options : JSON.stringify(options));
    return { categories: parsed.categories || [], items: parsed.items || [] };
  } catch {
    return { categories: [], items: [] };
  }
}

// Check a sorting answer: userAnswer is JSON { [item]: category }, correctAnswer is JSON { [item]: category }
function checkSortingAnswer(userAnswer: string, correctAnswer: string): boolean {
  try {
    const correct: Record<string, string> = JSON.parse(correctAnswer);
    const user: Record<string, string> = userAnswer ? JSON.parse(userAnswer) : {};
    return Object.keys(correct).every((item) => user[item] === correct[item]);
  } catch {
    return false;
  }
}

function checkOrderingAnswer(userAnswer: string, correctAnswer: string): boolean {
  try {
    const correct: string[] = JSON.parse(correctAnswer);
    const user: string[] = userAnswer ? JSON.parse(userAnswer) : [];
    return correct.length === user.length && correct.every((item, i) => item === user[i]);
  } catch {
    return false;
  }
}

// Count correct items in a sorting answer
function countSortingCorrect(userAnswer: string, correctAnswer: string): { correct: number; total: number } {
  try {
    const correct: Record<string, string> = JSON.parse(correctAnswer);
    const user: Record<string, string> = userAnswer ? JSON.parse(userAnswer) : {};
    const total = Object.keys(correct).length;
    const correctCount = Object.keys(correct).filter((item) => user[item] === correct[item]).length;
    return { correct: correctCount, total };
  } catch {
    return { correct: 0, total: 0 };
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
  text, value, onChange, disabled, suggestions = [],
}: {
  text: string; value: string; onChange: (v: string) => void; disabled: boolean; suggestions?: string[];
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
        <WordPredictor value={value} onChange={onChange} suggestions={suggestions} />
      </div>
    );
  }
  return (
    <div className="space-y-2">
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
      <WordPredictor value={value} onChange={onChange} suggestions={suggestions} />
    </div>
  );
}

// ─── Dictée Word-diff ────────────────────────────────────────────────────────
function normWord(w: string) {
  return w.toLowerCase().replace(/[^a-zàâçéèêëîïôùûüÿœæ0-9]/g, "");
}

function DicteeCorrection({ userText, correctText }: { userText: string; correctText: string }) {
  const correctWords = correctText.trim().split(/\s+/);
  const userWords = userText.trim().split(/\s+/);

  let cIdx = 0;
  const tokens: { word: string; status: "correct" | "wrong" | "missing" }[] = [];

  for (let i = 0; i < Math.max(correctWords.length, userWords.length); i++) {
    const cw = correctWords[cIdx];
    const uw = userWords[i];
    if (!cw) break;
    if (!uw) {
      tokens.push({ word: cw, status: "missing" });
      cIdx++;
    } else if (normWord(uw) === normWord(cw)) {
      tokens.push({ word: cw, status: "correct" });
      cIdx++;
    } else {
      tokens.push({ word: uw, status: "wrong" });
      cIdx++;
    }
  }

  const correct = tokens.filter((t) => t.status === "correct").length;
  const pct = Math.round((correct / correctWords.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
        <div className={`text-2xl font-extrabold ${pct >= 80 ? "text-green-600" : pct >= 50 ? "text-amber-600" : "text-red-600"}`}>
          {pct}%
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{correct}</span> mot{correct !== 1 ? "s" : ""} correct{correct !== 1 ? "s" : ""} sur <span className="font-medium">{correctWords.length}</span>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-border leading-loose">
        {tokens.map((t, i) => (
          <span key={i} className={`mr-1 px-0.5 rounded ${
            t.status === "correct"
              ? "text-green-700 dark:text-green-300"
              : t.status === "wrong"
              ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 line-through"
              : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 italic"
          }`}>{t.word}</span>
        ))}
      </div>

      <div className="text-xs text-muted-foreground flex gap-4 flex-wrap">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 inline-block" /> Correct</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200 inline-block" /> Erreur (barré)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-200 inline-block" /> Mot manquant</span>
      </div>

      <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">Texte correct</p>
        <p className="text-sm text-green-900 dark:text-green-200 leading-relaxed">{correctText}</p>
      </div>
    </div>
  );
}

function DicteeInput({
  correctText,
  value,
  onChange,
  disabled,
}: {
  correctText: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const [speaking, setSpeaking] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = (text: string, rateOverride?: number) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const a11yRate = parseFloat(localStorage.getItem("a11y-tts-rate") ?? "0.88");
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-CA";
    utter.rate = rateOverride !== undefined ? rateOverride : a11yRate;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => { setSpeaking(false); setHasPlayed(true); };
    utter.onerror = () => setSpeaking(false);
    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  const handlePlay = () => speak(correctText);
  const handleSlow = () => speak(correctText, 0.55);
  const handleStop = () => { window.speechSynthesis.cancel(); setSpeaking(false); };

  return (
    <div className="space-y-5">
      {/* Audio controls */}
      <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 space-y-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Écoute le texte</span>
          {!("speechSynthesis" in window) && (
            <span className="text-xs text-red-500 ml-2">Synthèse vocale non disponible dans ce navigateur</span>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={speaking ? handleStop : handlePlay}
            disabled={disabled}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            data-testid="button-dictee-play"
          >
            {speaking ? (
              <><Pause className="w-4 h-4 mr-1.5" />Arrêter</>
            ) : (
              <><Volume2 className="w-4 h-4 mr-1.5" />{hasPlayed ? "Réécouter" : "Écouter"}</>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSlow}
            disabled={disabled || speaking}
            className="border-blue-300 text-blue-700 dark:text-blue-300"
            data-testid="button-dictee-slow"
          >
            <RotateCw className="w-3.5 h-3.5 mr-1.5" />
            Lecture lente
          </Button>
        </div>

        {speaking && (
          <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Lecture en cours…
          </div>
        )}
      </div>

      {/* Typing area */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <PenLine className="w-4 h-4 text-amber-600" />
          Écris ce que tu as entendu
        </label>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Tape ici le texte que tu as entendu…"
          className="min-h-[120px] text-base bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-300 dark:border-amber-700 focus-visible:ring-amber-400"
          data-testid="textarea-dictee"
        />
        <p className="text-xs text-muted-foreground">
          {hasPlayed ? "Écris le texte tel quel, avec la ponctuation." : "Écoute d'abord le texte avant d'écrire."}
        </p>
      </div>
    </div>
  );
}

export default function Exercise() {
  const [match, params] = useRoute("/exercise/:id");
  const [, setLocation] = useLocation();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [storyPanelOpen, setStoryPanelOpen] = useState(true);
  const [articlePanelOpen, setArticlePanelOpen] = useState(true);
  const [course, setCourse] = useState<{ id: string; title: string; category: string; content: string } | null>(null);
  const [siblingExercises, setSiblingExercises] = useState<Exercise[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Matching-specific state: which left item is selected in which question
  const [matchingLeft, setMatchingLeft] = useState<{ qId: string; item: string } | null>(null);
  const shuffledRightRef = useRef<Record<string, string[]>>({});

  // Sorting-specific state: which item is currently selected (per question)
  const [sortingSelected, setSortingSelected] = useState<Record<string, string | null>>({});

  // Ordering-specific state: current order of items per question
  const [orderingItems, setOrderingItems] = useState<Record<string, string[]>>({});
  const orderingInitRef = useRef<Record<string, boolean>>({});

  // Flashcard-specific state
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcRetryMode, setFcRetryMode] = useState(false);
  const [fcResults, setFcResults] = useState<Record<string, "known" | "review">>({});

  useEffect(() => {
    if (!match || !params?.id) return;

    setCompleted(false);
    setUserAnswers({});
    setShowFeedback(false);
    setSubmitted(false);
    setLoading(true);
    setSiblingExercises([]);
    setMatchingLeft(null);
    shuffledRightRef.current = {};
    setOrderingItems({});
    orderingInitRef.current = {};
    setFcIndex(0);
    setFcFlipped(false);
    setFcRetryMode(false);
    setFcResults({});

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
          setQuestions(parsedQs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }

        if (fetchedExercise?.courseId) {
          const [siblingsRes, courseRes] = await Promise.all([
            fetch(`/api/courses/${fetchedExercise.courseId}/exercises`, { credentials: "include" }),
            fetch(`/api/courses/${fetchedExercise.courseId}`, { credentials: "include" }),
          ]);
          if (siblingsRes.ok) {
            const siblings: Exercise[] = await siblingsRes.json();
            setSiblingExercises(siblings.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
          }
          if (courseRes.ok) {
            setCourse(await courseRes.json());
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

  // ── Per-question helpers ─────────────────────────────────────
  const getQAnswer = (qId: string) => userAnswers[qId] || "";

  const getMatchConns = (q: Question): Record<string, string> => {
    const ans = getQAnswer(q.id);
    try { return ans ? JSON.parse(ans) : {}; } catch { return {}; }
  };

  const getMatchCorrectMap = (q: Question): Record<string, string> => {
    try { return JSON.parse(q.correctAnswer); } catch { return {}; }
  };

  // Stable shuffled right column (per question id)
  const getShuffledRight = (qId: string, correctMap: Record<string, string>): string[] => {
    if (!shuffledRightRef.current[qId]) {
      const items = Object.values(correctMap) as string[];
      shuffledRightRef.current[qId] = [...items].sort(() => Math.random() - 0.5);
    }
    return shuffledRightRef.current[qId];
  };

  const getMatchColor = (leftItem: string, leftItems: string[]) => {
    const idx = leftItems.indexOf(leftItem);
    return MATCH_COLORS[idx % MATCH_COLORS.length];
  };

  // Sorting placement helpers
  const getSortingPlacements = (qId: string): Record<string, string> => {
    const ans = userAnswers[qId] || "";
    try { return ans ? JSON.parse(ans) : {}; } catch { return {}; }
  };

  const handleSortingPlace = (qId: string, item: string, category: string) => {
    const placements = getSortingPlacements(qId);
    // If item is already in this category, remove it (toggle)
    if (placements[item] === category) {
      const next = { ...placements };
      delete next[item];
      handleAnswerChange(qId, JSON.stringify(next));
    } else {
      const next = { ...placements, [item]: category };
      handleAnswerChange(qId, JSON.stringify(next));
    }
    setSortingSelected((prev) => ({ ...prev, [qId]: null }));
  };

  const handleSortingItemClick = (qId: string, item: string) => {
    setSortingSelected((prev) => ({
      ...prev,
      [qId]: prev[qId] === item ? null : item,
    }));
  };

  const handleSortingCategoryClick = (qId: string, category: string) => {
    const selected = sortingSelected[qId];
    if (selected) {
      handleSortingPlace(qId, selected, category);
    }
  };

  const handleSortingRemoveItem = (qId: string, item: string) => {
    const placements = getSortingPlacements(qId);
    const next = { ...placements };
    delete next[item];
    handleAnswerChange(qId, JSON.stringify(next));
    setSortingSelected((prev) => ({ ...prev, [qId]: null }));
  };

  // Ordering handlers
  const getOrderingItemList = (q: Question): string[] => {
    if (orderingItems[q.id]) return orderingItems[q.id];
    // Initialize from options (already shuffled in seed data)
    const opts: string[] = Array.isArray(q.options) ? q.options : (q.options ? JSON.parse(q.options as string) : []);
    if (!orderingInitRef.current[q.id]) {
      orderingInitRef.current[q.id] = true;
      setOrderingItems((prev) => ({ ...prev, [q.id]: opts }));
      handleAnswerChange(q.id, JSON.stringify(opts));
    }
    return opts;
  };

  const handleOrderingMove = (qId: string, fromIdx: number, toIdx: number) => {
    if (submitted) return;
    setOrderingItems((prev) => {
      const list = [...(prev[qId] || [])];
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      handleAnswerChange(qId, JSON.stringify(list));
      return { ...prev, [qId]: list };
    });
  };

  const isQAnswered = (q: Question): boolean => {
    const ans = getQAnswer(q.id);
    if (q.type === "matching") {
      const conns = getMatchConns(q);
      const correctMap = getMatchCorrectMap(q);
      return Object.keys(correctMap).every((k) => conns[k] !== undefined);
    }
    if (q.type === "sorting") {
      const { items } = parseSortingOptions(q.options);
      const placements = getSortingPlacements(q.id);
      return items.length > 0 && items.every((item) => placements[item] !== undefined);
    }
    if (q.type === "ordering") {
      return (orderingItems[q.id] || []).length > 0;
    }
    return ans.trim().length > 0;
  };

  const answeredCount = questions.filter((q) => isQAnswered(q)).length;
  const allAnswered = answeredCount === questions.length;

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

  const isLectureReadingExercise = course?.category === "lecture_reading";
  const articleContent = isLectureReadingExercise ? course?.content ?? null : null;

  const handleAnswerChange = (qId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  // Matching click handlers (per-question)
  const handleMatchingLeftClick = (qId: string, left: string) => {
    if (submitted) return;
    if (matchingLeft?.qId === qId && matchingLeft?.item === left) {
      setMatchingLeft(null);
    } else {
      setMatchingLeft({ qId, item: left });
    }
  };

  const handleMatchingRightClick = (qId: string, right: string) => {
    if (submitted || !matchingLeft || matchingLeft.qId !== qId) return;
    const q = questions.find((x) => x.id === qId);
    if (!q) return;
    const conns = getMatchConns(q);
    const rightToLeft: Record<string, string> = {};
    Object.entries(conns).forEach(([l, r]) => { rightToLeft[r] = l; });
    const newConns = { ...conns };
    const existingLeft = rightToLeft[right];
    if (existingLeft) delete newConns[existingLeft];
    delete newConns[matchingLeft.item];
    newConns[matchingLeft.item] = right;
    setMatchingLeft(null);
    handleAnswerChange(qId, JSON.stringify(newConns));
  };

  const handleSubmitAll = async () => {
    setSubmitted(true);
    setCompleted(true);
    const userId = localStorage.getItem("userId");
    try {
      for (const q of questions) {
        const ans = getQAnswer(q.id);
        const isText = q.type === "text";
        let correct = false;
        if (!isText) {
          if (q.type === "fill_blank") correct = checkFillBlankAnswer(ans, q.correctAnswer);
          else if (q.type === "matching") correct = checkMatchingAnswer(ans, q.correctAnswer);
          else if (q.type === "sorting") correct = checkSortingAnswer(ans, q.correctAnswer);
          else if (q.type === "ordering") correct = checkOrderingAnswer(ans, q.correctAnswer);
          else if (q.type === "dictee") {
            const cWords = q.correctAnswer.trim().split(/\s+/);
            const uWords = ans.trim().split(/\s+/);
            let corr = 0;
            for (let i = 0; i < cWords.length; i++) {
              if (normWord(uWords[i] || "") === normWord(cWords[i])) corr++;
            }
            correct = corr / cWords.length >= 0.7;
          } else if (q.type === "flashcard") correct = ans === "known";
          else correct = ans === q.correctAnswer;
        }
        await fetch("/api/student-responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: userId, questionId: q.id, answer: ans, isCorrect: isText ? null : correct }),
          credentials: "include",
        });
      }
      if (userId && exercise?.courseId) {
        await fetch(`/api/students/${userId}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: exercise.courseId }),
        });
      }
    } catch (err) {
      console.error("Erreur:", err);
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
        else if (q.type === "sorting") isCorrect = checkSortingAnswer(userAnswer, q.correctAnswer);
        else if (q.type === "ordering") isCorrect = checkOrderingAnswer(userAnswer, q.correctAnswer);
        else if (q.type === "dictee") {
          const cWords = q.correctAnswer.trim().split(/\s+/);
          const uWords = userAnswer.trim().split(/\s+/);
          let correct = 0;
          for (let i = 0; i < cWords.length; i++) {
            if (normWord(uWords[i] || "") === normWord(cWords[i])) correct++;
          }
          isCorrect = (correct / cWords.length) >= 0.7;
        }
        else if (q.type === "flashcard") isCorrect = userAnswer === "known";
        else isCorrect = userAnswer === q.correctAnswer;
      }
      return { q, userAnswer, isCorrect, isText };
    });
    const isFlashcardExercise = questions.length > 0 && questions.every(q => q.type === "flashcard");

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
      setSubmitted(false);
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
      if (q.type === "sorting") {
        try {
          const map: Record<string, string> = JSON.parse(userAnswer);
          return Object.entries(map).map(([item, cat]) => `${item} → ${cat}`).join("  •  ");
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
      if (q.type === "sorting") {
        try {
          const map: Record<string, string> = JSON.parse(q.correctAnswer);
          // Group by category for clarity
          const byCategory: Record<string, string[]> = {};
          Object.entries(map).forEach(([item, cat]) => {
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(item);
          });
          return Object.entries(byCategory).map(([cat, items]) => `${cat} : ${items.join(", ")}`).join("  |  ");
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
                          ) : r.q.type === "flashcard" ? (
                            r.isCorrect
                              ? <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Je savais</Badge>
                              : <Badge className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">À revoir</Badge>
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
                          ) : r.q.type === "flashcard" ? (
                            <div className="bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 rounded-md px-3 py-1.5">
                              <span className="font-medium">Verso de la carte : </span>
                              {r.q.correctAnswer}
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

  // ── Question card renderer ────────────────────────────────────
  const renderQuestion = (q: Question, index: number) => {
    const ans = getQAnswer(q.id);
    const isText = q.type === "text";
    const isFill = q.type === "fill_blank";
    const isMatch = q.type === "matching";
    const isDictee = q.type === "dictee";
    const isSorting = q.type === "sorting";
    const isTrueFalse = q.type === "true_false";
    const isOrdering = q.type === "ordering";
    const isReadingQ = (isReadingExercise || isInformatifExercise) && q.text.length > 200;

    const questionDisplayText = isReadingQ
      ? (q.title.includes(":") ? q.title.split(":").slice(1).join(":").trim() : q.title)
      : q.text;

    // Matching state for this question
    const conns = isMatch ? getMatchConns(q) : {};
    const correctMap = isMatch ? getMatchCorrectMap(q) : {};
    const leftItems: string[] = isMatch ? (q.options as string[] || []) : [];
    const rightItems: string[] = isMatch ? getShuffledRight(q.id, correctMap) : [];
    const rightToLeft: Record<string, string> = {};
    if (isMatch) Object.entries(conns).forEach(([l, r]) => { rightToLeft[r] = l; });
    const activeLeft = matchingLeft?.qId === q.id ? matchingLeft.item : null;

    const answered = isQAnswered(q);

    return (
      <Card key={q.id} className={`p-6 transition-all ${answered ? "border-green-300 dark:border-green-700" : isText ? "border-orange-300 dark:border-orange-700" : ""}`} data-testid={`question-card-${index}`}>
        {/* Question header */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`text-lg font-bold ${answered ? "text-green-700 dark:text-green-400" : "text-amber-900 dark:text-amber-200"}`}>
            {answered ? <CheckCircle className="w-5 h-5 inline mr-1 text-green-500" /> : null}
            Question {index + 1}
          </span>
          {isFill && (
            <span className="text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-700">
              <PenLine className="w-3 h-3 inline mr-1" />Complète la phrase
            </span>
          )}
          {isMatch && (
            <span className="text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700">
              <Link2 className="w-3 h-3 inline mr-1" />Association
            </span>
          )}
          {isDictee && (
            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-700">
              <Volume2 className="w-3 h-3 inline mr-1" />Dictée
            </span>
          )}
          {isSorting && (
            <span className="text-xs font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-md border border-violet-200 dark:border-violet-700">
              <LayoutGrid className="w-3 h-3 inline mr-1" />Classement
            </span>
          )}
          {isTrueFalse && (
            <span className="text-xs font-medium bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-700">
              <CheckSquare className="w-3 h-3 inline mr-1" />Vrai ou Faux
            </span>
          )}
          {isOrdering && (
            <span className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-700">
              <List className="w-3 h-3 inline mr-1" />Mise en ordre
            </span>
          )}
          {isText && (
            <span className="text-xs font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-700">
              <FileText className="w-3 h-3 inline mr-1" />Réponse rédigée
            </span>
          )}
          {!isDictee && (
            <ReadAloudButton
              text={questionDisplayText.replace(/___/g, " quelque chose ")}
              label="Lire"
              variant="secondary"
              className="ml-auto text-xs"
            />
          )}
        </div>

        {/* Question prompt */}
        {!isFill && !isMatch && !isDictee && !isSorting && !isTrueFalse && !isOrdering && (
          <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border-l-4 border-amber-400 mb-4">
            <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground">{questionDisplayText}</p>
          </div>
        )}

        {/* Fill-blank */}
        {isFill && (
          <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border-l-4 border-amber-400 mb-4">
            <FillBlankInput
              text={q.text}
              value={ans}
              onChange={(val) => handleAnswerChange(q.id, val)}
              disabled={submitted}
              suggestions={q.correctAnswer ? q.correctAnswer.split("|").map((s) => s.trim()).filter(Boolean) : []}
            />
            {q.title && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                {q.title.includes(":") ? q.title.split(":").slice(1).join(":").trim() : q.title}
              </p>
            )}
          </div>
        )}

        {/* Matching */}
        {isMatch && (
          <div className="space-y-3">
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg border-l-4 border-emerald-500">
              <p className="text-sm font-medium text-foreground">{q.text}</p>
              {!submitted && (
                <p className="text-xs text-muted-foreground mt-1">
                  {activeLeft
                    ? "Clique maintenant sur la bonne réponse à droite."
                    : "Clique sur un élément à gauche, puis sur sa correspondance à droite."}
                </p>
              )}
            </div>
            {!submitted && (
              <p className="text-xs text-muted-foreground text-right">
                {Object.keys(conns).length} / {leftItems.length} paires reliées
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-1 border-b border-border">Colonne A</p>
                {leftItems.map((left) => {
                  const connected = conns[left] !== undefined;
                  const isSelected = activeLeft === left;
                  const color = getMatchColor(left, leftItems);
                  return (
                    <button
                      key={left}
                      onClick={() => handleMatchingLeftClick(q.id, left)}
                      disabled={submitted}
                      data-testid={`matching-left-${left}`}
                      className={`w-full p-2.5 text-left rounded-lg border-2 font-semibold text-sm transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ring-2 ring-blue-300"
                          : connected
                          ? `${color.bg} ${color.border} ${color.text}`
                          : "border-border bg-background hover-elevate"
                      }`}
                    >
                      {left}
                      {connected && !isSelected && (
                        <span className="float-right opacity-60 text-xs font-normal">{conns[left]}</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-1 border-b border-border">Colonne B</p>
                {rightItems.map((right) => {
                  const pairedLeft = rightToLeft[right];
                  const isPaired = pairedLeft !== undefined;
                  const color = isPaired ? getMatchColor(pairedLeft, leftItems) : null;
                  const isTarget = !!activeLeft && !isPaired;
                  return (
                    <button
                      key={right}
                      onClick={() => handleMatchingRightClick(q.id, right)}
                      disabled={submitted || (!activeLeft && !isPaired)}
                      data-testid={`matching-right-${right}`}
                      className={`w-full p-2.5 text-left rounded-lg border-2 text-sm transition-all ${
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
          </div>
        )}

        {/* Sorting — Classer par catégorie */}
        {isSorting && (() => {
          const { categories, items } = parseSortingOptions(q.options);
          const placements = getSortingPlacements(q.id);
          const selectedItem = sortingSelected[q.id] || null;
          const unplaced = items.filter((item) => placements[item] === undefined);
          const placedCount = items.filter((item) => placements[item] !== undefined).length;

          // Category color palette
          const CAT_COLORS = [
            { header: "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200", body: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700", chip: "bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border-blue-300 dark:border-blue-600" },
            { header: "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200", body: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700", chip: "bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-600" },
            { header: "bg-violet-100 dark:bg-violet-900/40 border-violet-300 dark:border-violet-600 text-violet-800 dark:text-violet-200", body: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700", chip: "bg-violet-200 dark:bg-violet-800 text-violet-900 dark:text-violet-100 border-violet-300 dark:border-violet-600" },
            { header: "bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-200", body: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700", chip: "bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-600" },
            { header: "bg-rose-100 dark:bg-rose-900/40 border-rose-300 dark:border-rose-600 text-rose-800 dark:text-rose-200", body: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700", chip: "bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100 border-rose-300 dark:border-rose-600" },
          ];

          return (
            <div className="space-y-4">
              {/* Instruction */}
              <div className="bg-violet-50 dark:bg-violet-900/10 p-3 rounded-lg border-l-4 border-violet-500">
                <p className="text-sm font-medium text-foreground">{q.text}</p>
                {!submitted && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedItem
                      ? <><strong>«{selectedItem}»</strong> est sélectionné — clique sur une colonne pour le placer, ou clique à nouveau sur ce mot pour le désélectionner.</>
                      : "Clique sur un mot pour le sélectionner, puis clique sur la colonne où il appartient."}
                  </p>
                )}
              </div>

              {/* Progress */}
              {!submitted && (
                <p className="text-xs text-muted-foreground text-right">{placedCount} / {items.length} mots placés</p>
              )}

              {/* Unplaced items pool */}
              {!submitted && unplaced.length > 0 && (
                <div className="border-2 border-dashed border-border rounded-lg p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Mots à classer</p>
                  <div className="flex flex-wrap gap-2">
                    {unplaced.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleSortingItemClick(q.id, item)}
                        disabled={submitted}
                        className={`px-3 py-1.5 rounded-md border-2 text-sm font-medium transition-all hover-elevate ${
                          selectedItem === item
                            ? "bg-violet-200 dark:bg-violet-800 border-violet-500 text-violet-900 dark:text-violet-100 ring-2 ring-violet-400"
                            : "bg-background border-border text-foreground"
                        }`}
                        data-testid={`button-sort-item-${item}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category columns */}
              <div className={`grid gap-3 ${categories.length === 2 ? "grid-cols-2" : categories.length === 3 ? "grid-cols-3" : categories.length >= 4 ? "grid-cols-2" : "grid-cols-2"}`}>
                {categories.map((cat, catIdx) => {
                  const colors = CAT_COLORS[catIdx % CAT_COLORS.length];
                  const itemsInCat = items.filter((item) => placements[item] === cat);
                  const isClickableTarget = !submitted && !!selectedItem;

                  return (
                    <div key={cat} className="space-y-1">
                      {/* Column header */}
                      <button
                        onClick={() => !submitted && handleSortingCategoryClick(q.id, cat)}
                        disabled={submitted || !selectedItem}
                        className={`w-full text-center px-3 py-2 rounded-md border-2 font-bold text-sm transition-all ${colors.header} ${isClickableTarget ? "hover-elevate cursor-pointer ring-2 ring-violet-400 ring-offset-1" : "cursor-default"}`}
                        data-testid={`button-sort-category-${cat}`}
                      >
                        {cat}
                        {isClickableTarget && <span className="ml-1 text-xs opacity-70">▼ Placer ici</span>}
                      </button>

                      {/* Items in this category */}
                      <div className={`min-h-[60px] rounded-md border-2 p-2 space-y-1.5 transition-all ${colors.body} ${isClickableTarget ? "border-dashed" : "border-solid"}`}>
                        {itemsInCat.length === 0 && !submitted && (
                          <p className="text-xs text-muted-foreground text-center py-2 opacity-60">vide</p>
                        )}
                        {itemsInCat.map((item) => {
                          const isCorrect = submitted ? (placements[item] === (() => { try { return JSON.parse(q.correctAnswer)[item]; } catch { return null; } })()) : null;
                          return (
                            <div key={item} className="flex items-center gap-1">
                              {submitted ? (
                                <span className={`flex-1 px-2 py-1 rounded border text-sm font-medium flex items-center gap-1 ${
                                  isCorrect
                                    ? "bg-green-100 dark:bg-green-900/30 border-green-400 text-green-800 dark:text-green-200"
                                    : "bg-red-100 dark:bg-red-900/30 border-red-400 text-red-800 dark:text-red-200"
                                }`}>
                                  {isCorrect ? <CheckCircle className="w-3 h-3 shrink-0" /> : <XCircle className="w-3 h-3 shrink-0" />}
                                  {item}
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleSortingRemoveItem(q.id, item)}
                                  className={`flex-1 px-2 py-1 rounded border text-sm font-medium text-left hover-elevate ${colors.chip}`}
                                  data-testid={`button-sort-placed-${item}`}
                                  title="Cliquer pour retirer"
                                >
                                  {item} <span className="text-xs opacity-60 ml-1">✕</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* After submit: show correct categorization for wrong items */}
              {submitted && (() => {
                const correct: Record<string, string> = (() => { try { return JSON.parse(q.correctAnswer); } catch { return {}; } })();
                const wrongItems = items.filter((item) => placements[item] !== correct[item]);
                if (wrongItems.length === 0) return null;
                return (
                  <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1">Corrections :</p>
                    {wrongItems.map((item) => (
                      <p key={item} className="text-xs text-foreground">
                        <span className="font-medium">«{item}»</span> → <span className="text-green-700 dark:text-green-400 font-semibold">{correct[item]}</span>
                        {placements[item] && <span className="text-muted-foreground"> (tu avais mis : {placements[item]})</span>}
                      </p>
                    ))}
                  </div>
                );
              })()}
            </div>
          );
        })()}

        {/* Vrai ou Faux */}
        {isTrueFalse && (() => {
          const isCorrectAfter = submitted ? ans === q.correctAnswer : null;
          const explication = q.title && !q.title.match(/^Q\d+/) ? q.title : null;

          return (
            <div className="space-y-4">
              {/* Affirmation */}
              <div className="bg-teal-50 dark:bg-teal-900/10 p-4 rounded-lg border-l-4 border-teal-500">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-base font-medium leading-relaxed text-foreground">{q.text}</p>
                </div>
                {!submitted && (
                  <p className="text-xs text-muted-foreground mt-2 ml-7">Cette affirmation est-elle vraie ou fausse ?</p>
                )}
              </div>

              {/* Vrai / Faux buttons */}
              <div className="grid grid-cols-2 gap-3">
                {["Vrai", "Faux"].map((choice) => {
                  const isSelected = ans === choice;
                  const isThisCorrect = choice === q.correctAnswer;
                  let btnClass = "w-full py-5 rounded-lg border-2 font-bold text-lg transition-all ";
                  if (submitted) {
                    if (isThisCorrect) {
                      btnClass += "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200";
                    } else if (isSelected && !isThisCorrect) {
                      btnClass += "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200";
                    } else {
                      btnClass += "bg-muted border-border text-muted-foreground opacity-50";
                    }
                  } else {
                    if (isSelected) {
                      btnClass += choice === "Vrai"
                        ? "bg-teal-100 dark:bg-teal-900/40 border-teal-500 text-teal-800 dark:text-teal-200 ring-2 ring-teal-400"
                        : "bg-rose-100 dark:bg-rose-900/40 border-rose-500 text-rose-800 dark:text-rose-200 ring-2 ring-rose-400";
                    } else {
                      btnClass += "bg-background border-border text-foreground hover-elevate";
                    }
                  }

                  return (
                    <button
                      key={choice}
                      onClick={() => !submitted && handleAnswerChange(q.id, choice)}
                      disabled={submitted}
                      className={btnClass}
                      data-testid={`button-tf-${choice.toLowerCase()}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {submitted && isThisCorrect && <CheckCircle className="w-5 h-5" />}
                        {submitted && isSelected && !isThisCorrect && <XCircle className="w-5 h-5" />}
                        {choice}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explication après soumission */}
              {submitted && explication && (
                <div className={`rounded-lg p-3 border flex items-start gap-2 ${
                  isCorrectAfter
                    ? "bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-700"
                    : "bg-amber-50 dark:bg-amber-900/10 border-amber-300 dark:border-amber-700"
                }`}>
                  <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${isCorrectAfter ? "text-green-600" : "text-amber-600"}`} />
                  <div>
                    <p className={`text-xs font-bold mb-0.5 ${isCorrectAfter ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"}`}>
                      Explication
                    </p>
                    <p className="text-sm text-foreground">{explication}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Mise en ordre (ordering) */}
        {isOrdering && (() => {
          const items = getOrderingItemList(q);
          let correct: string[] = [];
          try { correct = JSON.parse(q.correctAnswer); } catch { /* ok */ }

          return (
            <div className="space-y-4">
              {/* Instruction */}
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-lg border-l-4 border-indigo-500">
                <p className="text-sm font-medium text-foreground">{q.text}</p>
                {!submitted && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Utilise les flèches <ArrowUp className="w-3 h-3 inline" /> <ArrowDown className="w-3 h-3 inline" /> pour remettre les éléments dans le bon ordre.
                  </p>
                )}
              </div>

              {/* Item list */}
              <div className="space-y-2">
                {items.map((item, idx) => {
                  const isCorrectPos = submitted ? (correct[idx] === item) : null;
                  return (
                    <div key={item} className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      submitted
                        ? isCorrectPos
                          ? "bg-green-50 dark:bg-green-900/20 border-green-400"
                          : "bg-red-50 dark:bg-red-900/20 border-red-400"
                        : "bg-background border-border"
                    }`} data-testid={`ordering-item-${idx}`}>
                      {/* Position number */}
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                        submitted
                          ? isCorrectPos
                            ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                            : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                          : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                      }`}>
                        {idx + 1}
                      </span>

                      {/* Item text */}
                      <span className="flex-1 text-sm font-medium text-foreground">{item}</span>

                      {/* Correction indicator */}
                      {submitted && (
                        isCorrectPos
                          ? <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                          : <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}

                      {/* Move buttons */}
                      {!submitted && (
                        <div className="flex flex-col gap-0.5 shrink-0">
                          <button
                            onClick={() => idx > 0 && handleOrderingMove(q.id, idx, idx - 1)}
                            disabled={idx === 0}
                            className="p-1 rounded hover-elevate disabled:opacity-30 text-muted-foreground"
                            data-testid={`button-ordering-up-${idx}`}
                            title="Monter"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => idx < items.length - 1 && handleOrderingMove(q.id, idx, idx + 1)}
                            disabled={idx === items.length - 1}
                            className="p-1 rounded hover-elevate disabled:opacity-30 text-muted-foreground"
                            data-testid={`button-ordering-down-${idx}`}
                            title="Descendre"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* After submit: show correct order for wrong positions */}
              {submitted && (() => {
                const wrongItems = items.filter((item, idx) => correct[idx] !== item);
                if (wrongItems.length === 0) return null;
                return (
                  <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-2">Ordre correct :</p>
                    <ol className="space-y-1">
                      {correct.map((item, idx) => (
                        <li key={item} className="text-xs text-foreground flex gap-2">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{idx + 1}.</span>
                          <span className={items[idx] === item ? "text-green-700 dark:text-green-400 font-semibold" : ""}>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })()}
            </div>
          );
        })()}

        {/* Multiple choice */}
        {q.type === "multiple_choice" && (
          <div className="space-y-2 mt-2">
            {((q.options as string[]) || []).map((option) => (
              <div key={option} className="relative group">
                <button
                  onClick={() => !submitted && handleAnswerChange(q.id, option)}
                  className={`w-full p-3.5 text-left rounded-lg border-2 transition-all text-sm pr-10 ${
                    ans === option
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-border bg-background"
                  } hover-elevate`}
                  data-testid={`button-option-${option}`}
                  disabled={submitted}
                >
                  <span className="font-medium">{option}</span>
                </button>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <ReadAloudButton text={option} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Select */}
        {q.type === "select" && (
          <div className="mt-2">
            <Select value={ans} onValueChange={(val) => handleAnswerChange(q.id, val)} disabled={submitted}>
              <SelectTrigger className="w-full" data-testid="select-answer">
                <SelectValue placeholder="Choisissez une réponse..." />
              </SelectTrigger>
              <SelectContent>
                {((q.options as string[]) || []).map((option) => (
                  <SelectItem key={option} value={option} data-testid={`select-option-${option}`}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Free text */}
        {isText && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="w-4 h-4 text-amber-600" />
              Votre réponse
            </label>
            <Textarea
              value={ans}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              disabled={submitted}
              className="min-h-[140px] text-base bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-300 dark:border-amber-700 focus-visible:ring-amber-400"
              placeholder="Écrivez votre réponse ici…"
              data-testid={`textarea-answer-${index}`}
            />
            <p className="text-xs text-muted-foreground">Réponse libre — corrigée par votre enseignant.</p>
          </div>
        )}

        {/* Dictée */}
        {isDictee && (
          <div className="mt-2">
            <DicteeInput
              correctText={q.correctAnswer}
              value={ans}
              onChange={(val) => handleAnswerChange(q.id, val)}
              disabled={submitted}
            />
          </div>
        )}
      </Card>
    );
  };

  // ── Flashcard mode ────────────────────────────────────────────────────────
  const isFlashcardMode = questions.length > 0 && questions.every(q => q.type === "flashcard");

  if (isFlashcardMode) {
    const deck = fcRetryMode
      ? questions.filter(q => fcResults[q.id] === "review")
      : questions;
    const currentCard = deck[fcIndex] ?? null;
    const deckDone = !currentCard;
    const knownCount = Object.values(fcResults).filter(v => v === "known").length;
    const reviewCount = Object.values(fcResults).filter(v => v === "review").length;

    const handleFcAssess = (result: "known" | "review") => {
      if (!currentCard) return;
      const newResults = { ...fcResults, [currentCard.id]: result };
      setFcResults(newResults);
      setUserAnswers(prev => ({ ...prev, [currentCard.id]: result }));
      setFcFlipped(false);
      setFcIndex(prev => prev + 1);
    };

    const handleFcRetry = () => {
      setFcRetryMode(true);
      setFcIndex(0);
      setFcFlipped(false);
    };

    const handleFcFinish = async () => {
      // Persist all answers and complete
      const userId = localStorage.getItem("userId");
      try {
        for (const q of questions) {
          const ans = fcResults[q.id] || "review";
          await fetch("/api/student-responses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId: userId, questionId: q.id, answer: ans, isCorrect: ans === "known" }),
            credentials: "include",
          });
        }
        if (userId && exercise?.courseId) {
          await fetch(`/api/students/${userId}/progress`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: exercise.courseId }),
          });
        }
      } catch (e) { console.error(e); }
      setUserAnswers(Object.fromEntries(questions.map(q => [q.id, fcResults[q.id] || "review"])));
      setCompleted(true);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border sticky top-0 z-50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Button variant="ghost" size="icon" onClick={() => setLocation("/student-dashboard")} data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
                  <h1 className="text-lg font-bold truncate">{exercise.title}</h1>
                </div>
                <p className="text-xs text-muted-foreground">Cartes à tâches</p>
              </div>
            </div>
            {!deckDone && (
              <div className="shrink-0 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {fcIndex + 1} / {deck.length}
              </div>
            )}
          </div>
          {/* Progress bar */}
          {!deckDone && (
            <div className="h-1 bg-secondary">
              <div
                className="h-1 bg-indigo-500 transition-all"
                style={{ width: `${((fcIndex) / deck.length) * 100}%` }}
              />
            </div>
          )}
        </header>

        <main className="max-w-xl mx-auto px-4 py-5 space-y-4">
          {deckDone ? (
            /* ── Summary ── */
            <Card className="p-8 text-center">
              <Layers className="w-12 h-12 mx-auto mb-3 text-indigo-500" />
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {fcRetryMode ? "Révision terminée !" : "Paquet terminé !"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {fcRetryMode
                  ? "Tu as revu toutes tes cartes à revoir."
                  : "Tu as parcouru toutes les cartes du paquet."}
              </p>
              <div className="flex gap-4 justify-center mb-6">
                <div className="bg-green-50 dark:bg-green-950/40 rounded-md px-6 py-4 text-center">
                  <p className="text-3xl font-extrabold text-green-600 dark:text-green-400">{knownCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Je savais</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/40 rounded-md px-6 py-4 text-center">
                  <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">{reviewCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">À revoir</p>
                </div>
              </div>
              {reviewCount > 0 && !fcRetryMode && (
                <Button variant="outline" onClick={handleFcRetry} className="w-full mb-3" data-testid="button-fc-retry">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retravailler les {reviewCount} carte{reviewCount > 1 ? "s" : ""} à revoir
                </Button>
              )}
              <Button onClick={handleFcFinish} className="w-full" data-testid="button-fc-finish">
                <CheckCircle className="w-4 h-4 mr-2" />
                Terminer et voir les résultats
              </Button>
            </Card>
          ) : (
            /* ── Current card ── */
            <div className="space-y-4">
              {/* Dot progress */}
              <div className="flex justify-center gap-1.5 flex-wrap pt-1">
                {deck.map((q, i) => {
                  const res = fcResults[q.id];
                  return (
                    <div
                      key={q.id}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i < fcIndex
                          ? res === "known" ? "bg-green-500" : "bg-orange-400"
                          : i === fcIndex ? "bg-indigo-500" : "bg-secondary"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Card face — fades between recto and verso */}
              <div
                className={`rounded-xl border-2 p-6 transition-all duration-300 ${
                  fcFlipped
                    ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40"
                    : "border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900"
                }`}
              >
                {/* Label */}
                <p className="text-xs font-semibold uppercase tracking-widest text-center text-indigo-400 dark:text-indigo-500 mb-3">
                  {fcFlipped ? "Verso — Réponse" : `Recto — Carte ${fcIndex + 1} sur ${deck.length}`}
                </p>

                {!fcFlipped ? (
                  /* ── Recto ── */
                  <div className="text-center">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">{currentCard.title}</p>
                    <p className="text-lg font-semibold text-foreground leading-relaxed whitespace-pre-wrap mb-6">
                      {currentCard.text}
                    </p>
                    <Button onClick={() => setFcFlipped(true)} data-testid="button-fc-flip" className="gap-2">
                      <FlipIcon className="w-4 h-4" />
                      Retourner la carte
                    </Button>
                  </div>
                ) : (
                  /* ── Verso ── */
                  <div>
                    <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-wrap mb-6">
                      {currentCard.correctAnswer}
                    </p>
                    <div className="flex gap-3 flex-wrap justify-center pt-2 border-t border-indigo-200 dark:border-indigo-700">
                      <Button
                        variant="outline"
                        onClick={() => handleFcAssess("review")}
                        className="gap-2 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 flex-1 sm:flex-none"
                        data-testid="button-fc-review"
                      >
                        <RotateCcw className="w-4 h-4" />
                        À revoir
                      </Button>
                      <Button
                        onClick={() => handleFcAssess("known")}
                        className="gap-2 bg-green-600 text-white flex-1 sm:flex-none"
                        data-testid="button-fc-known"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Je savais !
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/student-dashboard")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold truncate">{exercise.title}</h1>
              <p className="text-xs text-muted-foreground">
                {answeredCount} / {questions.length} réponses saisies
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <div className="w-24 bg-secondary rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Reading panel — article de journal */}
        {isLectureReadingExercise && articleContent && (
          <Collapsible open={articlePanelOpen} onOpenChange={setArticlePanelOpen}>
            <Card className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-between p-2" data-testid="button-toggle-article">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-emerald-800 dark:text-emerald-200">Article — visible pendant les questions</span>
                  </div>
                  {articlePanelOpen
                    ? <ChevronUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div
                  className="mt-3 max-h-96 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: articleContent }}
                />
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Reading panel — informatif */}
        {isInformatifExercise && informatifText && (
          <Collapsible open={storyPanelOpen} onOpenChange={setStoryPanelOpen}>
            <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex-1 flex items-center justify-between p-2" data-testid="button-toggle-story">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-purple-800 dark:text-purple-200">Texte informatif</span>
                    </div>
                    {storyPanelOpen ? <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  </Button>
                </CollapsibleTrigger>
                <ReadAloudButton text={informatifText} label="Lire" className="text-purple-700 dark:text-purple-300 shrink-0" />
              </div>
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
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="font-semibold text-blue-800 dark:text-blue-200 flex-1">Texte à lire</span>
              <ReadAloudButton text={storyText} label="Lire le texte" className="text-blue-700 dark:text-blue-300 shrink-0" />
            </div>
            <div className="max-h-64 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{storyText}</p>
            </div>
          </Card>
        )}

        {/* Reading panel — narratif */}
        {isNarrativeExercise && storyText && (
          <Collapsible open={storyPanelOpen} onOpenChange={setStoryPanelOpen}>
            <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex-1 flex items-center justify-between p-2" data-testid="button-toggle-story">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="font-semibold text-amber-800 dark:text-amber-200">Texte de l'histoire</span>
                    </div>
                    {storyPanelOpen ? <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" /> : <ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                  </Button>
                </CollapsibleTrigger>
                <ReadAloudButton text={storyText} label="Lire" className="text-amber-700 dark:text-amber-300 shrink-0" />
              </div>
              <CollapsibleContent>
                <div className="mt-4 max-h-80 overflow-y-auto bg-white dark:bg-slate-800 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{storyText}</p>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* All questions */}
        {questions.map((q, i) => renderQuestion(q, i))}

        {/* Submit */}
        <Card className="p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground">
              {allAnswered
                ? "Toutes les réponses sont saisies. Tu peux soumettre."
                : `${questions.length - answeredCount} réponse${questions.length - answeredCount > 1 ? "s" : ""} manquante${questions.length - answeredCount > 1 ? "s" : ""}`}
            </p>
            <Button
              onClick={handleSubmitAll}
              disabled={!allAnswered}
              className="flex-1 sm:flex-none"
              data-testid="button-submit-answer"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Soumettre mes réponses
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
