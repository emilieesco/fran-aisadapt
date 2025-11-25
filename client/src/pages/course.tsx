import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, BookOpen } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: string;
  order: number;
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

export default function Course() {
  const [match, params] = useRoute("/course/:id");
  const [, setLocation] = useLocation();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match || !params?.id) return;

    const fetchCourse = async () => {
      try {
        const [courseRes, exercisesRes] = await Promise.all([
          fetch(`/api/courses/${params.id}`, { credentials: "include" }),
          fetch(`/api/courses/${params.id}/exercises`, { credentials: "include" }),
        ]);

        if (courseRes.ok) setCourse(await courseRes.json());
        if (exercisesRes.ok) setExercises(await exercisesRes.json());
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
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
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {course.title}
            </h1>
            <p className="text-sm text-muted-foreground">{course.category}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Course Content */}
        <Card className="p-8 mb-8 bg-white dark:bg-slate-800">
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: course.content }}
              />
            </div>
          </div>
        </Card>

        {/* Exercises */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Exercices du cours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => (
              <Card
                key={exercise.id}
                className="p-6 hover-elevate cursor-pointer transition-all"
                data-testid={`card-exercise-${exercise.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs font-semibold rounded-full mb-2">
                      Exercice {index + 1}
                    </span>
                    <h3 className="text-lg font-bold">{exercise.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {exercise.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Type: {exercise.type}
                  </span>
                  <Button
                    onClick={() => setLocation(`/exercise/${exercise.id}`)}
                    size="sm"
                    data-testid={`button-start-exercise-${exercise.id}`}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Démarrer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
