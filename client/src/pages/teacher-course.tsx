import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, BookOpen, Users, Trash2, Plus, UserCheck,
  BarChart2, ChevronDown, ChevronUp, AlertTriangle, CheckCircle,
  HelpCircle, PenLine,
} from "lucide-react";

interface Course {
  id: string; title: string; description: string; category: string; content: string;
}
interface Exercise {
  id: string; title: string; description: string; type: string; order: number;
}
interface Student {
  id: string; firstName: string; lastName: string;
}
interface AssignedStudent {
  id: string; studentId: string; courseId: string; dueDate?: string | null;
  student: { id: string; firstName: string; lastName: string } | null;
}
interface QuestionStat {
  questionId: string; questionTitle: string; questionText: string;
  type: string; totalResponses: number; correctResponses: number; accuracy: number | null;
}

const categoryLabels: Record<string, string> = {
  grammaire: "Grammaire", orthographe: "Orthographe", conjugaison: "Conjugaison",
  ponctuation: "Ponctuation", lecture: "Lecture & Compréhension", ecriture: "Écriture",
  classes_de_mots: "Classes de mots", textes_narratifs: "Textes narratifs",
  textes_descriptifs: "Textes descriptifs", vocabulaire: "Vocabulaire",
  lecture_reading: "Lecture — cours",
};

const categoryColors: Record<string, string> = {
  grammaire: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
  orthographe: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200",
  conjugaison: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200",
  ponctuation: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200",
  lecture: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200",
  ecriture: "bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200",
  classes_de_mots: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
  textes_narratifs: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200",
  textes_descriptifs: "bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200",
};

// Accuracy bar color
function AccuracyBar({ value }: { value: number | null }) {
  if (value === null) return <span className="text-xs text-muted-foreground italic">Aucune réponse</span>;
  const color = value >= 70 ? "bg-green-500" : value >= 40 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary rounded-full h-1.5">
        <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-bold w-8 text-right ${
        value >= 70 ? "text-green-600 dark:text-green-400" : value >= 40 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"
      }`}>{value}%</span>
    </div>
  );
}

// Stats panel for one exercise
function ExerciseStats({ exerciseId }: { exerciseId: string }) {
  const { data: stats = [], isLoading } = useQuery<QuestionStat[]>({
    queryKey: [`/api/exercises/${exerciseId}/stats`],
  });

  if (isLoading) return <p className="text-xs text-muted-foreground py-2">Chargement…</p>;
  if (stats.length === 0) return <p className="text-xs text-muted-foreground py-2">Aucune question dans cet exercice.</p>;

  const noData = stats.every((s) => s.accuracy === null);
  if (noData) return <p className="text-xs text-muted-foreground py-2">Aucune réponse enregistrée pour cet exercice.</p>;

  return (
    <div className="space-y-3 mt-3">
      {stats.map((s, i) => (
        <div key={s.questionId} className="space-y-1">
          <div className="flex items-start gap-2">
            {s.accuracy !== null && s.accuracy < 50 ? (
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
            ) : s.accuracy !== null && s.accuracy >= 70 ? (
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
            ) : (
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Q{i + 1}. {s.questionTitle.replace(/^Question\s*\d*\s*:\s*/i, "")}
              </p>
              <div className="mt-1">
                <AccuracyBar value={s.accuracy} />
              </div>
              {s.totalResponses > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {s.correctResponses}/{s.totalResponses} élève{s.totalResponses !== 1 ? "s" : ""} correct{s.correctResponses !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Question form inside the exercise creation form
interface NewQuestion {
  title: string; text: string; type: string; options: string; correctAnswer: string; order: number;
}

export default function TeacherCourse() {
  const [match, params] = useRoute("/teacher/course/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [course, setCourse] = useState<Course | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [assignedStudents, setAssignedStudents] = useState<AssignedStudent[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [assignMsg, setAssignMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Exercise stats panel open state
  const [openStats, setOpenStats] = useState<Record<string, boolean>>({});

  // Custom exercise creation state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newExTitle, setNewExTitle] = useState("");
  const [newExDesc, setNewExDesc] = useState("");
  const [newExType, setNewExType] = useState("multiple_choice");
  const [questions, setQuestions] = useState<NewQuestion[]>([
    { title: "Question 1", text: "", type: "multiple_choice", options: "", correctAnswer: "", order: 1 },
  ]);
  const [creating, setCreating] = useState(false);

  const teacherId = localStorage.getItem("userId") || "";
  const courseId = params?.id || "";

  useEffect(() => {
    if (!match || !courseId) return;
    const userId = localStorage.getItem("userId");
    if (!userId) { setLocation("/"); return; }

    const fetchAll = async () => {
      try {
        const [courseRes, exercisesRes, studentsRes, assignmentsRes] = await Promise.all([
          fetch(`/api/courses/${courseId}`, { credentials: "include" }),
          fetch(`/api/courses/${courseId}/exercises`, { credentials: "include" }),
          fetch(`/api/teachers/${userId}/students`, { credentials: "include" }),
          fetch(`/api/courses/${courseId}/assignments`, { credentials: "include" }),
        ]);
        if (courseRes.ok) setCourse(await courseRes.json());
        if (exercisesRes.ok) setExercises(await exercisesRes.json());
        if (studentsRes.ok) setAllStudents(await studentsRes.json());
        if (assignmentsRes.ok) setAssignedStudents(await assignmentsRes.json());
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [match, courseId, setLocation]);

  const handleAssign = async () => {
    if (!selectedStudentId) return;
    setAssigning(true);
    setAssignMsg(null);
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ teacherId, studentId: selectedStudentId, courseId, dueDate: dueDate || null }),
      });
      if (res.ok) {
        const newAssignment = await res.json();
        const student = allStudents.find((s) => s.id === selectedStudentId);
        setAssignedStudents((prev) => [
          ...prev,
          { ...newAssignment, student: student ? { id: student.id, firstName: student.firstName, lastName: student.lastName } : null },
        ]);
        setSelectedStudentId("");
        setDueDate("");
        setAssignMsg({ type: "success", text: "Cours assigné avec succès!" });
      } else {
        const msg = await res.text();
        setAssignMsg({ type: "error", text: msg || "Erreur lors de l'assignation." });
      }
    } catch {
      setAssignMsg({ type: "error", text: "Erreur réseau." });
    } finally {
      setAssigning(false);
    }
  };

  const handleRemoveAssignment = async (assignmentId: string) => {
    try {
      const res = await fetch(`/api/assignments/${assignmentId}`, { method: "DELETE", credentials: "include" });
      if (res.ok) setAssignedStudents((prev) => prev.filter((a) => a.id !== assignmentId));
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { title: `Question ${prev.length + 1}`, text: "", type: newExType, options: "", correctAnswer: "", order: prev.length + 1 },
    ]);
  };

  const removeQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx).map((q, i) => ({ ...q, order: i + 1 })));
  };

  const updateQuestion = (idx: number, field: keyof NewQuestion, value: string) => {
    setQuestions((prev) => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExTitle.trim()) return;
    setCreating(true);
    try {
      // 1. Créer l'exercice
      const exRes = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          courseId,
          title: newExTitle.trim(),
          description: newExDesc.trim() || newExTitle.trim(),
          type: newExType,
          order: exercises.length + 1,
        }),
      });
      if (!exRes.ok) throw new Error("Erreur création exercice");
      const newEx: Exercise = await exRes.json();

      // 2. Créer les questions
      for (const q of questions) {
        if (!q.text.trim() || !q.correctAnswer.trim()) continue;
        await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            exerciseId: newEx.id,
            title: q.title,
            text: q.text.trim(),
            type: q.type,
            options: q.options.trim()
              ? JSON.stringify(q.options.split("\n").map((o) => o.trim()).filter(Boolean))
              : null,
            correctAnswer: q.correctAnswer.trim(),
            order: q.order,
          }),
        });
      }

      setExercises((prev) => [...prev, newEx]);
      setNewExTitle(""); setNewExDesc(""); setNewExType("multiple_choice");
      setQuestions([{ title: "Question 1", text: "", type: "multiple_choice", options: "", correctAnswer: "", order: 1 }]);
      setShowCreateForm(false);
      toast({ description: `Exercice "${newEx.title}" créé avec ${questions.filter(q => q.text.trim()).length} question(s).` });
    } catch (err) {
      console.error("Erreur:", err);
      toast({ description: "Erreur lors de la création de l'exercice.", variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const assignedStudentIds = new Set(assignedStudents.map((a) => a.studentId));
  const availableStudents = allStudents.filter((s) => !assignedStudentIds.has(s.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Cours introuvable.</p>
          <Button onClick={() => setLocation("/teacher-dashboard")}>Retour</Button>
        </div>
      </div>
    );
  }

  const colorClass = categoryColors[course.category] || "bg-slate-100 text-slate-700";
  const categoryLabel = categoryLabels[course.category] || course.category;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/teacher-dashboard")} data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-amber-700 dark:text-amber-400 truncate">{course.title}</h1>
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${colorClass}`}>
              {categoryLabel}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Course description */}
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h2 className="font-semibold text-lg mb-1">Description</h2>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>
        </Card>

        {/* ── Exercises section ── */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Exercices ({exercises.length})
            </h2>
            <Button
              size="sm"
              variant={showCreateForm ? "secondary" : "outline"}
              onClick={() => setShowCreateForm((v) => !v)}
              data-testid="button-add-exercise"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {showCreateForm ? "Annuler" : "Ajouter un exercice"}
            </Button>
          </div>

          {/* ── Create exercise form ── */}
          {showCreateForm && (
            <div className="mb-6 p-5 border border-dashed border-blue-300 dark:border-blue-700 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 space-y-5">
              <h3 className="font-semibold text-base flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <PenLine className="w-4 h-4" />
                Nouvel exercice
              </h3>
              <form onSubmit={handleCreateExercise} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Titre de l'exercice</Label>
                    <Input
                      value={newExTitle}
                      onChange={(e) => setNewExTitle(e.target.value)}
                      placeholder="Ex: Identifier les noms communs"
                      required
                      data-testid="input-exercise-title"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Type d'exercice</Label>
                    <select
                      value={newExType}
                      onChange={(e) => { setNewExType(e.target.value); setQuestions((prev) => prev.map((q) => ({ ...q, type: e.target.value }))); }}
                      className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                      data-testid="select-exercise-type"
                    >
                      <option value="multiple_choice">Choix multiple (QCM)</option>
                      <option value="fill_blank">Compléter les blancs</option>
                      <option value="text">Réponse ouverte</option>
                      <option value="select">Sélection</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Description (optionnel)</Label>
                  <Input
                    value={newExDesc}
                    onChange={(e) => setNewExDesc(e.target.value)}
                    placeholder="Brève description de l'exercice"
                  />
                </div>

                <Separator />

                {/* Questions */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Questions</h4>
                  {questions.map((q, idx) => (
                    <div key={idx} className="border border-border rounded-lg p-4 bg-background space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-muted-foreground">Question {idx + 1}</span>
                        {questions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(idx)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">Énoncé de la question *</Label>
                        <textarea
                          value={q.text}
                          onChange={(e) => updateQuestion(idx, "text", e.target.value)}
                          placeholder="Tapez la question ici…"
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none"
                          rows={2}
                          required
                          data-testid={`input-question-text-${idx}`}
                        />
                      </div>

                      {(newExType === "multiple_choice" || newExType === "select") && (
                        <div className="space-y-1.5">
                          <Label className="text-xs">Options (une par ligne)</Label>
                          <textarea
                            value={q.options}
                            onChange={(e) => updateQuestion(idx, "options", e.target.value)}
                            placeholder={"Option A\nOption B\nOption C\nOption D"}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none"
                            rows={3}
                            data-testid={`input-question-options-${idx}`}
                          />
                        </div>
                      )}

                      {newExType === "fill_blank" && (
                        <p className="text-xs text-muted-foreground">
                          Mettez <code className="bg-muted px-1 rounded">___</code> dans l'énoncé pour indiquer l'emplacement du blanc.
                          Pour plusieurs bonnes réponses, séparez par <code className="bg-muted px-1 rounded">|</code> dans la réponse.
                        </p>
                      )}

                      <div className="space-y-1.5">
                        <Label className="text-xs">
                          {newExType === "text" ? "Réponse attendue (référence enseignant)" : "Bonne réponse *"}
                        </Label>
                        <Input
                          value={q.correctAnswer}
                          onChange={(e) => updateQuestion(idx, "correctAnswer", e.target.value)}
                          placeholder={newExType === "fill_blank" ? "réponse1|réponse2" : "Bonne réponse exacte"}
                          required
                          data-testid={`input-question-answer-${idx}`}
                        />
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Ajouter une question
                  </Button>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={creating || !newExTitle.trim()} data-testid="button-create-exercise">
                    {creating ? "Création…" : "Créer l'exercice"}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowCreateForm(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ── Exercise list with stats ── */}
          {exercises.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun exercice associé à ce cours.</p>
          ) : (
            <div className="space-y-2">
              {exercises
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((ex) => (
                  <Collapsible
                    key={ex.id}
                    open={openStats[ex.id]}
                    onOpenChange={(open) => setOpenStats((s) => ({ ...s, [ex.id]: open }))}
                  >
                    <div
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary gap-3"
                      data-testid={`row-exercise-${ex.id}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{ex.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{ex.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="text-xs">
                          {ex.type === "multiple_choice" ? "QCM" : ex.type === "fill_blank" ? "Compléter" : ex.type === "text" ? "Réponse libre" : ex.type}
                        </Badge>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground"
                            data-testid={`button-stats-${ex.id}`}
                          >
                            <BarChart2 className="w-4 h-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                    <CollapsibleContent>
                      <div className="px-3 pb-3 pt-2 border border-t-0 border-secondary rounded-b-lg bg-background/60">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <BarChart2 className="w-3 h-3" />
                          Taux de réussite par question
                        </p>
                        <ExerciseStats exerciseId={ex.id} />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </div>
          )}
        </Card>

        {/* ── Assign to students ── */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Assigner à des élèves
          </h2>

          {allStudents.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun élève dans votre classe pour le moment.</p>
          ) : (
            <>
              {availableStudents.length > 0 ? (
                <div className="flex flex-wrap gap-3 mb-4">
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="flex-1 min-w-48 h-9 px-3 rounded-md border border-input bg-background text-sm"
                    data-testid="select-student"
                  >
                    <option value="">— Sélectionner un élève —</option>
                    {availableStudents.map((s) => (
                      <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground whitespace-nowrap">Échéance :</label>
                    <input
                      type="date"
                      value={dueDate}
                      min={today}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="h-9 px-3 rounded-md border border-input bg-background text-sm"
                      data-testid="input-due-date"
                    />
                  </div>
                  <Button onClick={handleAssign} disabled={!selectedStudentId || assigning} data-testid="button-assign">
                    <Plus className="w-4 h-4 mr-2" />
                    {assigning ? "Assignation…" : "Assigner"}
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">Tous vos élèves ont déjà ce cours assigné.</p>
              )}

              {assignMsg && (
                <div className={`text-sm px-3 py-2 rounded-md mb-4 ${
                  assignMsg.type === "success"
                    ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                }`}>
                  {assignMsg.text}
                </div>
              )}
            </>
          )}

          {/* Already assigned */}
          {assignedStudents.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Élèves assignés ({assignedStudents.length})
              </h3>
              <div className="space-y-2">
                {assignedStudents.map((a) => {
                  const isOverdue = a.dueDate && new Date(a.dueDate) < new Date(today);
                  return (
                    <div
                      key={a.id}
                      className="flex items-center justify-between p-3 rounded-md bg-secondary"
                      data-testid={`row-assigned-${a.id}`}
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-green-600 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">
                            {a.student ? `${a.student.firstName} ${a.student.lastName}` : "Élève inconnu"}
                          </p>
                          {a.dueDate && (
                            <p className={`text-xs ${isOverdue ? "text-red-600 dark:text-red-400 font-semibold" : "text-muted-foreground"}`}>
                              Échéance : {new Date(a.dueDate).toLocaleDateString("fr-CA")}
                              {isOverdue && " — En retard"}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAssignment(a.id)}
                        data-testid={`button-remove-assignment-${a.id}`}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
