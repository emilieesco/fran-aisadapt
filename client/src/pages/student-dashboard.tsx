import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PenTool, FileText, Award, TrendingUp, LogOut } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  progressPercentage: number;
}

interface Badge {
  id: string;
  type: string;
  earnedAt: string;
}

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
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

        const [coursesRes, badgesRes, userRes] = await Promise.all([
          fetch(`/api/students/${userId}/courses`, { credentials: "include" }),
          fetch(`/api/students/${userId}/badges`, { credentials: "include" }),
          fetch(`/api/users/${userId}`, { credentials: "include" }),
        ]);

        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (badgesRes.ok) setBadges(await badgesRes.json());
        if (userRes.ok) {
          const user = await userRes.json();
          setStudentName(user.firstName);
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

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      classes_de_mots: "Classes de mots",
      textes_narratifs: "Textes narratifs",
      ecriture: "Écriture",
    };
    return labels[category] || category;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "classes_de_mots":
        return <BookOpen className="w-5 h-5" />;
      case "textes_narratifs":
        return <FileText className="w-5 h-5" />;
      case "ecriture":
        return <PenTool className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
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
        <Tabs defaultValue="classes-de-mots" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="classes-de-mots" data-testid="tab-classes-de-mots">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Classes de mots</span>
              <span className="sm:hidden">Mots</span>
            </TabsTrigger>
            <TabsTrigger value="textes-narratifs" data-testid="tab-textes-narratifs">
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Textes narratifs</span>
              <span className="sm:hidden">Textes</span>
            </TabsTrigger>
            <TabsTrigger value="ecriture" data-testid="tab-ecriture">
              <PenTool className="w-4 h-4 mr-2" />
              Écriture
            </TabsTrigger>
            <TabsTrigger value="mon-proges" data-testid="tab-mon-progres">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Mon Progrès</span>
              <span className="sm:hidden">Progrès</span>
            </TabsTrigger>
          </TabsList>

          {/* Classes de mots Tab */}
          <TabsContent value="classes-de-mots">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-4">Classes de mots</h2>
                <p className="text-muted-foreground mb-6">
                  Apprenez à identifier et classifier les différents types de mots
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((c) => c.category === "classes_de_mots")
                  .map((course) => (
                    <Card
                      key={course.id}
                      className="p-6 hover-elevate cursor-pointer transition-all"
                      data-testid={`card-course-${course.id}`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {course.description}
                            </p>
                          </div>
                          <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0" />
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
                          {course.progressPercentage > 0 ? "Continuer" : "Commencer"}
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Textes narratifs Tab */}
          <TabsContent value="textes-narratifs">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-4">Textes narratifs</h2>
                <p className="text-muted-foreground mb-6">
                  Comprenez la structure et les éléments des textes narratifs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((c) => c.category === "textes_narratifs")
                  .map((course) => (
                    <Card
                      key={course.id}
                      className="p-6 hover-elevate cursor-pointer transition-all"
                      data-testid={`card-course-${course.id}`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {course.description}
                            </p>
                          </div>
                          <FileText className="w-5 h-5 text-green-500 flex-shrink-0" />
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
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
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
                          {course.progressPercentage > 0 ? "Continuer" : "Commencer"}
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Écriture Tab */}
          <TabsContent value="ecriture">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-4">Écriture</h2>
                <p className="text-muted-foreground mb-6">
                  Pratiquez l'écriture avec des activités guidées et créatives
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((c) => c.category === "ecriture")
                  .map((course) => (
                    <Card
                      key={course.id}
                      className="p-6 hover-elevate cursor-pointer transition-all"
                      data-testid={`card-course-${course.id}`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {course.description}
                            </p>
                          </div>
                          <PenTool className="w-5 h-5 text-purple-500 flex-shrink-0" />
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
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
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
                          {course.progressPercentage > 0 ? "Continuer" : "Commencer"}
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Mon Progrès Tab */}
          <TabsContent value="mon-proges">
            <div className="space-y-8">
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-blue-50 dark:bg-blue-900">
                  <p className="text-sm text-muted-foreground mb-2">Cours en cours</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    {courses.filter((c) => c.progressPercentage > 0 && c.progressPercentage < 100).length}
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

              {/* Progress by Category */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Progression détaillée</h3>
                <div className="space-y-6">
                  {["classes_de_mots", "textes_narratifs", "ecriture"].map((category) => {
                    const categoryCourses = courses.filter((c) => c.category === category);
                    const avgProgress =
                      categoryCourses.length > 0
                        ? Math.round(
                            categoryCourses.reduce((sum, c) => sum + c.progressPercentage, 0) /
                              categoryCourses.length
                          )
                        : 0;

                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category)}
                            <span className="font-semibold">
                              {getCategoryLabel(category)}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-muted-foreground">
                            {avgProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
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
