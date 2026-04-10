import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PenTool, Play, TrendingUp, LogOut, FileText } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  progressPercentage: number;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: string;
  courseId: string;
  courseName?: string;
}

interface Badge {
  id: string;
  type: string;
  earnedAt: string;
}

interface Question {
  id: string;
  exerciseId: string;
  title: string;
  text: string;
  type: string;
  options?: string;
  correctAnswer: string;
  order: number;
}

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [readingNarrativeExercises, setReadingNarrativeExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLocation("/");
          return;
        }

        const [coursesRes, badgesRes, userRes, narrativeRes] = await Promise.all([
          fetch(`/api/students/${userId}/courses`, { credentials: "include" }),
          fetch(`/api/students/${userId}/badges`, { credentials: "include" }),
          fetch(`/api/users/${userId}`, { credentials: "include" }),
          fetch(`/api/reading-narratives?userId=${userId}`, { credentials: "include" }),
        ]);

        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (badgesRes.ok) setBadges(await badgesRes.json());
        if (userRes.ok) {
          const user = await userRes.json();
          setStudentName(user.firstName);
        }
        if (narrativeRes.ok) {
          setReadingNarrativeExercises(await narrativeRes.json());
        }
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const handleStartCourse = (courseId: string) => {
    setLocation(`/course/${courseId}`);
  };

  const handleStartExercise = (exerciseId: string) => {
    setLocation(`/exercise/${exerciseId}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "grammaire":
        return "text-blue-500";
      case "orthographe":
        return "text-orange-500";
      case "conjugaison":
        return "text-red-500";
      case "textes":
        return "text-green-500";
      case "ecriture":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      grammaire: "Grammaire",
      orthographe: "Orthographe",
      conjugaison: "Conjugaison",
      ponctuation: "Ponctuation",
      vocabulaire: "Vocabulaire",
      textes: "Textes",
      ecriture: "Écriture",
      lecture_reading: "Lecture",
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const writingExercises = exercises.filter((ex) => ex.type === "writing" || (ex.courseId && courses.find((c) => c.id === ex.courseId)?.category === "écriture"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Bienvenue, {studentName}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Plateforme d'apprentissage du français
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="cours" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="cours" data-testid="tab-cours">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Cours</span>
            </TabsTrigger>
            <TabsTrigger value="exercices" data-testid="tab-exercices">
              <Play className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Exercices</span>
            </TabsTrigger>
            <TabsTrigger value="lecture" data-testid="tab-lecture">
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Lecture</span>
            </TabsTrigger>
            <TabsTrigger value="ecriture" data-testid="tab-ecriture">
              <PenTool className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Écriture</span>
            </TabsTrigger>
            <TabsTrigger value="progres" data-testid="tab-progres">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Progrès</span>
            </TabsTrigger>
          </TabsList>

          {/* Cours Tab */}
          <TabsContent value="cours">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Mes Cours</h2>
                <p className="text-muted-foreground mb-6">
                  Sélectionnez un cours pour accéder aux contenus et exercices
                </p>
              </div>

              {/* Group courses by category */}
              {["grammaire", "orthographe", "conjugaison", "ponctuation", "vocabulaire"].map((category) => {
                const categoryName = getCategoryLabel(category);
                const categoryCourses = courses.filter(
                  (c) =>
                    c.category === category &&
                    !c.category.includes("lecture") &&
                    !c.category.includes("ecriture")
                );

                if (categoryCourses.length === 0) return null;

                return (
                  <div key={category} className="space-y-4">
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {categoryName}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryCourses.map((course) => (
                        <Card
                          key={course.id}
                          className="p-6 hover-elevate cursor-pointer transition-all"
                          data-testid={`card-course-${course.id}`}
                        >
                          <div className="space-y-4">
                            <div>
                              <span
                                className={`inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold rounded-full mb-2 ${getCategoryColor(
                                  course.category
                                )}`}
                              >
                                {getCategoryLabel(course.category)}
                              </span>
                              <h3 className="text-lg font-bold text-foreground mt-2">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2">
                                {course.description}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="font-semibold">Progression</span>
                                <span className="text-muted-foreground">
                                  {course.progressPercentage}%
                                </span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${course.progressPercentage}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <Button
                              onClick={() => handleStartCourse(course.id)}
                              className="w-full"
                              data-testid={`button-start-${course.id}`}
                            >
                              {course.progressPercentage > 0
                                ? "Continuer"
                                : "Commencer"}
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Exercices Tab */}
          <TabsContent value="exercices">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Tous les Exercices</h2>
                <p className="text-muted-foreground mb-6">
                  Pratiquez avec les exercices interactifs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises
                  .filter((ex) => ex.type !== "text")
                  .map((exercise) => (
                    <Card
                      key={exercise.id}
                      className="p-6 hover-elevate"
                      data-testid={`card-exercise-${exercise.id}`}
                    >
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {exercise.courseName}
                          </span>
                          <h3 className="text-lg font-bold text-foreground mt-1">
                            {exercise.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {exercise.description}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleStartExercise(exercise.id)}
                          className="w-full"
                          data-testid={`button-start-exercise-${exercise.id}`}
                        >
                          <Play className="w-3 h-3 mr-2" />
                          Démarrer
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Lecture Tab */}
          <TabsContent value="lecture">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Activités de Lecture</h2>
                <p className="text-muted-foreground mb-6">
                  Améliorez votre compréhension de la lecture avec différents types de textes
                </p>
              </div>

              {/* Leçons de Lecture */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Leçons de Lecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses
                    .filter((c) => c.category === "lecture_reading")
                    .sort((a, b) => a.order - b.order)
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="p-4 hover-elevate cursor-pointer"
                        onClick={() => handleStartCourse(course.id)}
                        data-testid={`card-lecture-course-${course.id}`}
                      >
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.description}</p>
                          <Button size="sm" className="w-full">Lire le cours</Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>

              <Tabs defaultValue="narratif" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6 bg-green-50 dark:bg-green-900">
                  <TabsTrigger value="narratif" data-testid="tab-narratif">
                    Narratif
                  </TabsTrigger>
                  <TabsTrigger value="descriptif" data-testid="tab-descriptif">
                    Descriptif
                  </TabsTrigger>
                  <TabsTrigger value="explicatif" data-testid="tab-explicatif">
                    Explicatif
                  </TabsTrigger>
                  <TabsTrigger value="argumentatif" data-testid="tab-argumentatif">
                    Argumentatif
                  </TabsTrigger>
                  <TabsTrigger value="informatif" data-testid="tab-informatif">
                    Informatif
                  </TabsTrigger>
                </TabsList>

                {/* Narratif */}
                <TabsContent value="narratif" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {readingNarrativeExercises.map((exercise, index) => {
                      const storyTitles = [
                        "Histoire 1: Le Trésor de la Cave",
                        "Histoire 2: Le Jour de l'Accident",
                        "Histoire 3: La Fille qui Rêvait de Danser",
                        "Histoire 4: L'Amitié Retrouvée",
                        "Histoire 5: La Découverte Scientifique",
                      ];
                      const storyDescriptions = [
                        "Léa découvre une clé mystérieuse qui change sa vie",
                        "Marc apprend l'importance de la sécurité à vélo",
                        "Sophie poursuit son rêve de danser malgré les obstacles",
                        "Lucas et Thomas retrouvent leur amitié malgré la distance",
                        "Emma fait une découverte scientifique extraordinaire",
                      ];
                      
                      return (
                        <Card
                          key={exercise.id}
                          className="p-3 hover-elevate border-2 border-green-200 dark:border-green-800 cursor-pointer transition-all min-h-40 flex flex-col"
                          data-testid={`card-narrative-${index}`}
                          onClick={() => setLocation(`/exercise/${exercise.id}`)}
                        >
                          <div className="space-y-2 h-full flex flex-col justify-between">
                            <div>
                              <span className="text-xs font-semibold text-green-600 dark:text-green-300 uppercase">
                                Histoire {index + 1}
                              </span>
                              <h3 className="text-sm font-bold text-foreground mt-1 leading-tight line-clamp-2">
                                {storyTitles[index] || exercise.title}
                              </h3>
                            </div>
                            
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocation(`/exercise/${exercise.id}`);
                              }}
                              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-xs h-auto py-1"
                              data-testid={`button-read-narrative-${index}`}
                            >
                              Lire
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Descriptif */}
                <TabsContent value="descriptif" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {exercises
                      .filter(
                        (e) =>
                          courses.find((c) => c.id === e.courseId)?.category === "lecture_descriptif" && 
                          e.type === "text"
                      )
                      .sort((a, b) => a.order - b.order)
                      .map((exercise, index) => (
                        <Card
                          key={exercise.id}
                          className="p-3 hover-elevate border-2 border-blue-200 dark:border-blue-800 cursor-pointer transition-all min-h-40 flex flex-col"
                          data-testid={`card-descriptif-${index}`}
                          onClick={() => setLocation(`/exercise/${exercise.id}`)}
                        >
                          <div className="space-y-2 h-full flex flex-col justify-between">
                            <div>
                              <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase">
                                Description {index + 1}
                              </span>
                              <h3 className="text-sm font-bold text-foreground mt-1 leading-tight line-clamp-2">
                                {exercise.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {exercise.description}
                              </p>
                            </div>
                            
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocation(`/exercise/${exercise.id}`);
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-xs h-auto py-1"
                              data-testid={`button-read-descriptif-${index}`}
                            >
                              Lire
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                  {exercises.filter((e) => courses.find((c) => c.id === e.courseId)?.category === "lecture_descriptif").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Aucun texte descriptif disponible pour le moment.</p>
                    </div>
                  )}
                </TabsContent>

                {/* Explicatif */}
                <TabsContent value="explicatif" className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    {exercises
                      .filter(
                        (e) =>
                          courses.find((c) => c.id === e.courseId)?.title ===
                            "Texte explicatif" && 
                          e.type === "text" && 
                          e.title.startsWith("Lecture:")
                      )
                      .map((exercise) => (
                        <Card
                          key={exercise.id}
                          className="p-8 hover-elevate border-2 border-yellow-200 dark:border-yellow-800"
                          data-testid={`card-reading-${exercise.id}`}
                        >
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-300">
                                Texte explicatif
                              </span>
                              <h3 className="text-2xl font-bold text-foreground mt-2">
                                {exercise.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2">
                                {exercise.description}
                              </p>
                            </div>

                            <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
                              {questions
                                .filter((q) => q.exerciseId === exercise.id)
                                .map((question, idx) => (
                                  <div key={question.id} className="space-y-3 border-b pb-4 last:border-b-0">
                                    {idx === 0 ? (
                                      <div className="bg-background p-4 rounded border border-muted">
                                        <p className="text-sm whitespace-pre-wrap text-foreground">
                                          {question.text.split("Question")[0]}
                                        </p>
                                      </div>
                                    ) : null}
                                    {idx > 0 && (
                                      <div className="space-y-3 mt-4">
                                        <p className="font-semibold text-foreground">
                                          {question.text.includes("?")
                                            ? question.text.split("?")[0] + "?"
                                            : question.text}
                                        </p>
                                        <div className="space-y-2">
                                          {question.options &&
                                            JSON.parse(question.options).map(
                                              (option: string) => (
                                                <Button
                                                  key={option}
                                                  variant="outline"
                                                  className="w-full justify-start text-left"
                                                  data-testid={`button-answer-${question.id}-${option}`}
                                                >
                                                  {option}
                                                </Button>
                                              )
                                            )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>

                            <Button
                              onClick={() => handleStartExercise(exercise.id)}
                              className="w-full"
                              data-testid={`button-submit-reading-${exercise.id}`}
                            >
                              Soumettre mes réponses
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                {/* Argumentatif */}
                <TabsContent value="argumentatif" className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    {exercises
                      .filter(
                        (e) =>
                          courses.find((c) => c.id === e.courseId)?.title ===
                            "Texte argumentatif" && 
                          e.type === "text" && 
                          e.title.startsWith("Lecture:")
                      )
                      .map((exercise) => (
                        <Card
                          key={exercise.id}
                          className="p-8 hover-elevate border-2 border-red-200 dark:border-red-800"
                          data-testid={`card-reading-${exercise.id}`}
                        >
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs font-semibold text-red-600 dark:text-red-300">
                                Texte argumentatif
                              </span>
                              <h3 className="text-2xl font-bold text-foreground mt-2">
                                {exercise.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2">
                                {exercise.description}
                              </p>
                            </div>

                            <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
                              {questions
                                .filter((q) => q.exerciseId === exercise.id)
                                .map((question, idx) => (
                                  <div key={question.id} className="space-y-3 border-b pb-4 last:border-b-0">
                                    {idx === 0 ? (
                                      <div className="bg-background p-4 rounded border border-muted">
                                        <p className="text-sm whitespace-pre-wrap text-foreground">
                                          {question.text.split("Question")[0]}
                                        </p>
                                      </div>
                                    ) : null}
                                    {idx > 0 && (
                                      <div className="space-y-3 mt-4">
                                        <p className="font-semibold text-foreground">
                                          {question.text.includes("?")
                                            ? question.text.split("?")[0] + "?"
                                            : question.text}
                                        </p>
                                        <div className="space-y-2">
                                          {question.options &&
                                            JSON.parse(question.options).map(
                                              (option: string) => (
                                                <Button
                                                  key={option}
                                                  variant="outline"
                                                  className="w-full justify-start text-left"
                                                  data-testid={`button-answer-${question.id}-${option}`}
                                                >
                                                  {option}
                                                </Button>
                                              )
                                            )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>

                            <Button
                              onClick={() => handleStartExercise(exercise.id)}
                              className="w-full"
                              data-testid={`button-submit-reading-${exercise.id}`}
                            >
                              Soumettre mes réponses
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                {/* Informatif */}
                <TabsContent value="informatif" className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    {exercises
                      .filter(
                        (e) =>
                          courses.find((c) => c.id === e.courseId)?.title ===
                            "Texte informatif" && 
                          e.type === "text" && 
                          e.title.startsWith("Lecture:")
                      )
                      .map((exercise) => (
                        <Card
                          key={exercise.id}
                          className="p-8 hover-elevate border-2 border-purple-200 dark:border-purple-800"
                          data-testid={`card-reading-${exercise.id}`}
                        >
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs font-semibold text-purple-600 dark:text-purple-300">
                                Texte informatif
                              </span>
                              <h3 className="text-2xl font-bold text-foreground mt-2">
                                {exercise.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2">
                                {exercise.description}
                              </p>
                            </div>

                            <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
                              {questions
                                .filter((q) => q.exerciseId === exercise.id)
                                .map((question, idx) => (
                                  <div key={question.id} className="space-y-3 border-b pb-4 last:border-b-0">
                                    {idx === 0 ? (
                                      <div className="bg-background p-4 rounded border border-muted">
                                        <p className="text-sm whitespace-pre-wrap text-foreground">
                                          {question.text.split("Question")[0]}
                                        </p>
                                      </div>
                                    ) : null}
                                    {idx > 0 && (
                                      <div className="space-y-3 mt-4">
                                        <p className="font-semibold text-foreground">
                                          {question.text.includes("?")
                                            ? question.text.split("?")[0] + "?"
                                            : question.text}
                                        </p>
                                        <div className="space-y-2">
                                          {question.options &&
                                            JSON.parse(question.options).map(
                                              (option: string) => (
                                                <Button
                                                  key={option}
                                                  variant="outline"
                                                  className="w-full justify-start text-left"
                                                  data-testid={`button-answer-${question.id}-${option}`}
                                                >
                                                  {option}
                                                </Button>
                                              )
                                            )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>

                            <Button
                              onClick={() => handleStartExercise(exercise.id)}
                              className="w-full"
                              data-testid={`button-submit-reading-${exercise.id}`}
                            >
                              Soumettre mes réponses
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Écriture Tab */}
          <TabsContent value="ecriture">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Activités d'Écriture</h2>
                <p className="text-muted-foreground mb-6">
                  Pratiquez l'écriture avec des activités créatives et guidées
                </p>
              </div>

              {/* Leçons d'Écriture */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Leçons d'Écriture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses
                    .filter((c) => c.category === "ecriture")
                    .sort((a, b) => a.order - b.order)
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="p-4 hover-elevate cursor-pointer"
                        onClick={() => handleStartCourse(course.id)}
                        data-testid={`card-writing-course-${course.id}`}
                      >
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.description}</p>
                          <Button size="sm" className="w-full">Lire le cours</Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Exercices d'Écriture */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Exercices d'Écriture</h3>
              {writingExercises.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {writingExercises.map((exercise) => (
                    <Card
                      key={exercise.id}
                      className="p-6 hover-elevate border-2 border-purple-200 dark:border-purple-800"
                      data-testid={`card-writing-${exercise.id}`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs font-semibold text-purple-600 dark:text-purple-300">
                              {exercise.courseName}
                            </span>
                            <h3 className="text-lg font-bold text-foreground mt-1">
                              {exercise.title}
                            </h3>
                          </div>
                          <PenTool className="w-5 h-5 text-purple-500 flex-shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {exercise.description}
                        </p>
                        <Button
                          onClick={() => handleStartExercise(exercise.id)}
                          className="w-full"
                          data-testid={`button-start-writing-${exercise.id}`}
                        >
                          <PenTool className="w-3 h-3 mr-2" />
                          Commencer l'écriture
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Aucune activité d'écriture disponible pour le moment
                  </p>
                </Card>
              )}
              </div>
            </div>
          </TabsContent>

          {/* Progrès Tab */}
          <TabsContent value="progres">
            <div className="space-y-8">
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-blue-50 dark:bg-blue-900">
                  <p className="text-sm text-muted-foreground mb-2">Cours en cours</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    {courses.filter((c) => c.progressPercentage > 0 && c.progressPercentage < 100)
                      .length}
                  </p>
                </Card>
                <Card className="p-6 bg-green-50 dark:bg-green-900">
                  <p className="text-sm text-muted-foreground mb-2">Cours complétés</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-300">
                    {courses.filter((c) => c.progressPercentage === 100).length}
                  </p>
                </Card>
                <Card className="p-6 bg-purple-50 dark:bg-purple-900">
                  <p className="text-sm text-muted-foreground mb-2">Badges</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">
                    {badges.length}
                  </p>
                </Card>
              </div>

              {/* Progress by Course */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Progression par cours</h3>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{course.title}</span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {course.progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${course.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Badges Section */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Mes Badges</h3>
                {badges.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg hover-elevate"
                        data-testid={`badge-${badge.type}`}
                      >
                        <div className="text-4xl mb-2">🏆</div>
                        <p className="text-xs font-semibold text-center text-foreground">
                          {badge.type}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Complétez des exercices pour gagner des badges!
                  </p>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
