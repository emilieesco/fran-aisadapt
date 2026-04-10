import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Users, Trash2, Plus, UserCheck } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: string;
  order: number;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

interface AssignedStudent {
  id: string;
  studentId: string;
  courseId: string;
  dueDate?: string | null;
  student: { id: string; firstName: string; lastName: string } | null;
}

const categoryLabels: Record<string, string> = {
  grammaire: "Grammaire",
  orthographe: "Orthographe",
  conjugaison: "Conjugaison",
  ponctuation: "Ponctuation",
  lecture: "Lecture & Compréhension",
  ecriture: "Écriture",
  classes_de_mots: "Classes de mots",
  textes_narratifs: "Textes narratifs",
  textes_descriptifs: "Textes descriptifs",
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

export default function TeacherCourse() {
  const [match, params] = useRoute("/teacher/course/:id");
  const [, setLocation] = useLocation();

  const [course, setCourse] = useState<Course | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [assignedStudents, setAssignedStudents] = useState<AssignedStudent[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [assignMsg, setAssignMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const teacherId = localStorage.getItem("userId") || "";
  const courseId = params?.id || "";

  useEffect(() => {
    if (!match || !courseId) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLocation("/");
      return;
    }

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
        body: JSON.stringify({
          teacherId,
          studentId: selectedStudentId,
          courseId,
          dueDate: dueDate || null,
        }),
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
      const res = await fetch(`/api/assignments/${assignmentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setAssignedStudents((prev) => prev.filter((a) => a.id !== assignmentId));
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/teacher-dashboard")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-amber-700 dark:text-amber-400 truncate">
              {course.title}
            </h1>
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${colorClass}`}>
              {categoryLabel}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Course Info */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h2 className="font-semibold text-lg">Description</h2>
              <p className="text-muted-foreground mt-1">{course.description}</p>
            </div>
          </div>
        </Card>

        {/* Exercises */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Exercices ({exercises.length})
          </h2>
          {exercises.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun exercice associé à ce cours.</p>
          ) : (
            <div className="space-y-3">
              {exercises
                .sort((a, b) => a.order - b.order)
                .map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between p-3 rounded-md bg-secondary"
                    data-testid={`row-exercise-${ex.id}`}
                  >
                    <div>
                      <p className="font-medium text-sm">{ex.title}</p>
                      <p className="text-xs text-muted-foreground">{ex.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {ex.type === "multiple_choice" ? "QCM" : "Réponse libre"}
                    </Badge>
                  </div>
                ))}
            </div>
          )}
        </Card>

        {/* Assign to students */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Assigner à des élèves
          </h2>

          {allStudents.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aucun élève dans votre classe pour le moment.
            </p>
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
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm"
                    placeholder="Date limite (optionnel)"
                    data-testid="input-due-date"
                  />
                  <Button
                    onClick={handleAssign}
                    disabled={!selectedStudentId || assigning}
                    data-testid="button-assign"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {assigning ? "Assignation..." : "Assigner"}
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  Tous vos élèves ont déjà ce cours assigné.
                </p>
              )}

              {assignMsg && (
                <div
                  className={`text-sm px-3 py-2 rounded-md mb-4 ${
                    assignMsg.type === "success"
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                  }`}
                >
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
                {assignedStudents.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between p-3 rounded-md bg-secondary"
                    data-testid={`row-assigned-${a.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-green-600 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">
                          {a.student
                            ? `${a.student.firstName} ${a.student.lastName}`
                            : "Élève inconnu"}
                        </p>
                        {a.dueDate && (
                          <p className="text-xs text-muted-foreground">
                            Date limite: {new Date(a.dueDate).toLocaleDateString("fr-CA")}
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
                ))}
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
