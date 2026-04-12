import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Play, PenLine } from "lucide-react";

interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

interface ExerciseData {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: string;
  order: number;
}

const EXERCISE_TYPE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  multiple_choice: { label: "Choix multiple", color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300", icon: "QCM" },
  fill_blank:      { label: "Blancs à remplir", color: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300", icon: "Lacunaire" },
  text:            { label: "Réponse ouverte", color: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300", icon: "Texte" },
  select:          { label: "Sélection", color: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300", icon: "Choix" },
};

export default function Course() {
  const [match, params] = useRoute("/course/:id");
  const [, setLocation] = useLocation();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match || !params?.id) return;

    const fetchCourse = async () => {
      try {
        const [courseRes, exRes] = await Promise.all([
          fetch(`/api/courses/${params.id}`, { credentials: "include" }),
          fetch(`/api/courses/${params.id}/exercises`, { credentials: "include" }),
        ]);

        if (courseRes.ok) setCourse(await courseRes.json());
        if (exRes.ok) {
          const exList: ExerciseData[] = await exRes.json();
          setExercises(exList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [match, params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chargement du cours...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Cours non trouvé</p>
      </div>
    );
  }

  const hasContent = course.content && course.content.trim().length > 10 && course.content !== course.description;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/student-dashboard")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              {course.title}
            </h1>
            <p className="text-sm text-muted-foreground">{course.description}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Theory / course content — only show if there's rich HTML content */}
        {hasContent && (
          <Card className="p-8 bg-white dark:bg-slate-800">
            <div className="flex items-start gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-4">Contenu du cours</h2>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: course.content }}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Exercises list */}
        {exercises.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-6 w-1 rounded-full bg-amber-500" />
              <h2 className="text-xl font-bold">
                Exercices
              </h2>
              <span className="text-sm text-muted-foreground">
                {exercises.length} exercice{exercises.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {exercises.map((ex, idx) => {
                const typeMeta = EXERCISE_TYPE_LABELS[ex.type] || EXERCISE_TYPE_LABELS.text;
                return (
                  <Card
                    key={ex.id}
                    className="p-5 hover-elevate flex flex-col gap-4"
                    data-testid={`card-exercise-${ex.id}`}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-muted-foreground">
                          Exercice {idx + 1}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeMeta.color}`}>
                          {typeMeta.label}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-snug">
                        {ex.title}
                      </h3>
                      {ex.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {ex.description}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => setLocation(`/exercise/${ex.id}`)}
                      className="w-full"
                      data-testid={`button-start-exercise-${ex.id}`}
                    >
                      {ex.type === "fill_blank" ? (
                        <PenLine className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Démarrer
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {exercises.length === 0 && !hasContent && (
          <Card className="p-12 text-center text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Ce cours n'a pas encore d'exercices.</p>
          </Card>
        )}
      </main>
    </div>
  );
}
