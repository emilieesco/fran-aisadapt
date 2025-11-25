import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, BookOpen, Plus, LogOut } from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  progressPercentage: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
}

export default function TeacherDashboard() {
  const [, setLocation] = useLocation();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [teacherName, setTeacherName] = useState("");
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "classes_de_mots",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLocation("/");
          return;
        }

        const [studentsRes, coursesRes, userRes] = await Promise.all([
          fetch(`/api/teachers/${userId}/students`, { credentials: "include" }),
          fetch(`/api/courses`, { credentials: "include" }),
          fetch(`/api/users/${userId}`, { credentials: "include" }),
        ]);

        if (studentsRes.ok) setStudents(await studentsRes.json());
        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (userRes.ok) {
          const user = await userRes.json();
          setTeacherName(user.firstName);
        }
      } catch (err) {
        console.error("Erreur:", err);
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

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
        credentials: "include",
      });

      if (res.ok) {
        const course = await res.json();
        setCourses([...courses, course]);
        setNewCourse({ title: "", description: "", category: "classes_de_mots" });
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chargement...</p>
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
              Tableau de bord Enseignant
            </h1>
            <p className="text-sm text-muted-foreground">
              Bienvenue, {teacherName}
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
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="courses" data-testid="tab-courses">
              <BookOpen className="w-4 h-4 mr-2" />
              Cours
            </TabsTrigger>
            <TabsTrigger value="students" data-testid="tab-students">
              <Users className="w-4 h-4 mr-2" />
              Élèves ({students.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="space-y-6">
              <Card className="p-6 bg-white dark:bg-slate-800">
                <h2 className="text-xl font-bold mb-4">Créer un nouveau cours</h2>
                <form onSubmit={handleCreateCourse} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre du cours</Label>
                    <Input
                      id="title"
                      value={newCourse.title}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, title: e.target.value })
                      }
                      placeholder="Ex: Identification des noms"
                      required
                      data-testid="input-course-title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={newCourse.description}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, description: e.target.value })
                      }
                      placeholder="Description du cours"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <select
                      id="category"
                      value={newCourse.category}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, category: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="classes_de_mots">Classes de mots</option>
                      <option value="textes_narratifs">Textes narratifs</option>
                      <option value="ecriture">Écriture</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-create-course"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer le cours
                  </Button>
                </form>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="p-6 hover-elevate"
                    data-testid={`card-course-${course.id}`}
                  >
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold rounded mb-2">
                      {course.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                    <Button
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => setLocation(`/teacher/course/${course.id}`)}
                      data-testid={`button-edit-course-${course.id}`}
                    >
                      Gérer
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Mes Élèves</h2>
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg hover-elevate"
                    data-testid={`row-student-${student.id}`}
                  >
                    <div>
                      <p className="font-semibold">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Progression: {student.progressPercentage}%
                      </p>
                    </div>
                    <div className="w-24 bg-background rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${student.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
