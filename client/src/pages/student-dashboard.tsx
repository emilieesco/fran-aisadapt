import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, TrendingUp, LogOut } from "lucide-react";

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
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Bienvenue, {studentName}! 🎓
            </h1>
            <p className="text-sm text-muted-foreground">
              Continuez votre apprentissage du français
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="courses" data-testid="tab-courses">
              <BookOpen className="w-4 h-4 mr-2" />
              Mes Cours
            </TabsTrigger>
            <TabsTrigger value="progress" data-testid="tab-progress">
              <TrendingUp className="w-4 h-4 mr-2" />
              Progression
            </TabsTrigger>
            <TabsTrigger value="badges" data-testid="tab-badges">
              <Award className="w-4 h-4 mr-2" />
              Badges ({badges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="p-6 hover-elevate cursor-pointer transition-all"
                  data-testid={`card-course-${course.id}`}
                >
                  <div className="space-y-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold rounded-full mb-2">
                        {getCategoryLabel(course.category)}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">
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
                      {course.progressPercentage > 0 ? "Continuer" : "Commencer"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Votre Progression</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{course.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.progressPercentage}% complété
                      </p>
                    </div>
                    <div className="w-40 bg-secondary rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-lg hover-elevate"
                  data-testid={`badge-${badge.type}`}
                >
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-xs font-semibold text-center text-foreground">
                    {badge.type}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
