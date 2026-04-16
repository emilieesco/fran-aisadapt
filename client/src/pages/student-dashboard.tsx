import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Link2, PenLine, PenTool, Play, TrendingUp, LogOut, FileText, Search, X, Calendar, AlertCircle, Mic, Volume2, CheckCircle, Upload, Trash2, Download, MessageSquare, Bell, Send, MessageCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  progressPercentage: number;
  completed?: boolean;
  dueDate?: string | null;
  isAssigned?: boolean;
  order?: number;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: string;
  courseId: string;
  order?: number;
  courseName?: string;
  courseCategory?: string;
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

interface StudentDoc {
  id: string;
  studentId: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  teacherComment: string | null;
  teacherReviewed: boolean;
  reviewedAt: string | null;
}

function CourseCard({
  course,
  badgeColor,
  label,
  onStart,
}: {
  course: Course;
  badgeColor: string;
  label: string;
  onStart: () => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateObj = course.dueDate ? new Date(course.dueDate) : null;
  const isOverdue = dueDateObj && dueDateObj < today && !course.completed;
  const isDueSoon = dueDateObj && !isOverdue && !course.completed && (dueDateObj.getTime() - today.getTime()) <= 3 * 24 * 60 * 60 * 1000;

  return (
    <Card
      className={`p-5 hover-elevate cursor-pointer flex flex-col gap-4 ${isOverdue ? "ring-1 ring-red-400 dark:ring-red-600" : ""}`}
      data-testid={`card-course-${course.id}`}
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${badgeColor}`}>
            {label}
          </span>
          {isOverdue && (
            <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-semibold" data-testid={`badge-overdue-${course.id}`}>
              <AlertCircle className="w-3.5 h-3.5" />
              En retard
            </span>
          )}
          {isDueSoon && !isOverdue && (
            <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold" data-testid={`badge-due-soon-${course.id}`}>
              <Calendar className="w-3.5 h-3.5" />
              Bientôt dû
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-foreground leading-snug">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        {dueDateObj && (
          <p className={`text-xs flex items-center gap-1 ${isOverdue ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`} data-testid={`text-due-date-${course.id}`}>
            <Calendar className="w-3 h-3" />
            Échéance : {dueDateObj.toLocaleDateString("fr-CA")}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-medium">Progression</span>
          <span className="text-muted-foreground">{course.progressPercentage ?? 0}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${course.completed ? "bg-green-500" : "bg-amber-500"}`}
            style={{ width: `${course.progressPercentage ?? 0}%` }}
          />
        </div>
      </div>
      <Button
        onClick={onStart}
        className="w-full"
        variant={isOverdue ? "destructive" : "default"}
        data-testid={`button-start-${course.id}`}
      >
        {course.completed ? "Revoir" : (course.progressPercentage ?? 0) > 0 ? "Continuer" : "Commencer"}
      </Button>
    </Card>
  );
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("tous");
  const [selectedExType, setSelectedExType] = useState("tous");
  const [documents, setDocuments] = useState<StudentDoc[]>([]);
  const [docTitle, setDocTitle] = useState("");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docUploading, setDocUploading] = useState(false);
  const [docError, setDocError] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [annotatedResponses, setAnnotatedResponses] = useState<any[]>([]);
  const [teacher, setTeacher] = useState<{ id: string; firstName: string; lastName: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [msgDraft, setMsgDraft] = useState("");
  const [msgSending, setMsgSending] = useState(false);

  const loadNotifications = async (userId: string) => {
    const res = await fetch(`/api/notifications/${userId}`, { credentials: "include" });
    if (res.ok) setNotifications(await res.json());
  };

  const loadMessages = async (userId: string, teacherId: string) => {
    const res = await fetch(`/api/messages/${userId}/${teacherId}`, { credentials: "include" });
    if (res.ok) setChatMessages(await res.json());
  };

  const handleSendMessage = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !teacher || !msgDraft.trim()) return;
    setMsgSending(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ senderId: userId, receiverId: teacher.id, content: msgDraft.trim() }),
    });
    setMsgSending(false);
    if (res.ok) {
      setMsgDraft("");
      loadMessages(userId, teacher.id);
    }
  };

  const handleMarkAllRead = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    await fetch(`/api/notifications/${userId}/read-all`, { method: "PATCH", credentials: "include" });
    loadNotifications(userId);
  };

  const loadDocuments = async (userId: string) => {
    const res = await fetch(`/api/documents/student/${userId}`, {
      credentials: "include",
      headers: { "x-user-id": userId },
    });
    if (res.ok) setDocuments(await res.json());
  };

  const handleDocUpload = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !docFile || !docTitle.trim()) return;
    if (docFile.size > 5 * 1024 * 1024) {
      setDocError("Fichier trop volumineux (max 5 Mo)");
      return;
    }
    setDocUploading(true);
    setDocError("");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          studentId: userId,
          title: docTitle.trim(),
          fileName: docFile.name,
          fileType: docFile.type || "application/octet-stream",
          fileSize: docFile.size,
          fileData: base64,
        }),
      });
      setDocUploading(false);
      if (res.ok) {
        setDocTitle("");
        setDocFile(null);
        loadDocuments(userId);
      } else {
        setDocError(await res.text());
      }
    };
    reader.readAsDataURL(docFile);
  };

  const handleDocDelete = async (docId: string) => {
    const userId = localStorage.getItem("userId");
    await fetch(`/api/documents/${docId}`, { method: "DELETE", credentials: "include" });
    if (userId) loadDocuments(userId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLocation("/");
          return;
        }

        const [coursesRes, badgesRes, userRes, narrativeRes, exercisesRes] = await Promise.all([
          fetch(`/api/students/${userId}/courses`, { credentials: "include" }),
          fetch(`/api/students/${userId}/badges`, { credentials: "include" }),
          fetch(`/api/users/${userId}`, { credentials: "include" }),
          fetch(`/api/reading-narratives?userId=${userId}`, { credentials: "include" }),
          fetch(`/api/students/${userId}/exercises`, { credentials: "include" }),
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
        if (exercisesRes.ok) setExercises(await exercisesRes.json());
        loadDocuments(userId);
        loadNotifications(userId);
        // Charger les réponses annotées par l'enseignant
        fetch(`/api/students/${userId}/annotated-responses`, { credentials: "include" })
          .then(r => r.ok ? r.json() : [])
          .then(data => setAnnotatedResponses(data))
          .catch(() => {});
        // Charger l'enseignant et les messages
        const teacherRes = await fetch(`/api/students/${userId}/teacher`, { credentials: "include" });
        if (teacherRes.ok) {
          const t = await teacherRes.json();
          if (t) {
            setTeacher(t);
            loadMessages(userId, t.id);
          }
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

  const CATEGORY_META: Record<string, { label: string; color: string }> = {
    grammaire:         { label: "Grammaire",         color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" },
    orthographe:       { label: "Orthographe",       color: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" },
    conjugaison:       { label: "Conjugaison",       color: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300" },
    ponctuation:       { label: "Ponctuation",       color: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" },
    vocabulaire:       { label: "Vocabulaire",       color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" },
    lecture_reading:   { label: "Lecture",           color: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300" },
    ecriture:          { label: "Écriture",          color: "bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300" },
    classes_de_mots:   { label: "Classes de mots",  color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" },
    textes_narratifs:  { label: "Textes narratifs",  color: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300" },
    textes_descriptifs:{ label: "Textes descriptifs",color: "bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300" },
    dictee:            { label: "Dictée",            color: "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300" },
    francais_fpt:      { label: "Français FPT",      color: "bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-700 dark:text-fuchsia-300" },
  };

  const getCategoryLabel = (category: string) =>
    CATEGORY_META[category]?.label || category;

  const getCategoryBadgeColor = (category: string) =>
    CATEGORY_META[category]?.color || "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";

  // Courses shown in the "Cours" tab (exclude lecture/ecriture which have their own tabs)
  const COURS_CATEGORIES = ["grammaire", "orthographe", "conjugaison", "ponctuation", "vocabulaire", "classes_de_mots", "francais_fpt"];

  const coursCourses = useMemo(
    () => courses.filter((c) => COURS_CATEGORIES.includes(c.category)),
    [courses]
  );

  const availableCategories = useMemo(
    () => [...new Set(coursCourses.map((c) => c.category))],
    [coursCourses]
  );

  const filteredCourses = useMemo(() => {
    let list = coursCourses;
    if (selectedCategory !== "tous") {
      list = list.filter((c) => c.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [coursCourses, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const writingExercises = exercises.filter(
    (ex) =>
      ex.type === "writing" ||
      ex.courseCategory === "ecriture" ||
      (ex.courseId && courses.find((c) => c.id === ex.courseId)?.category === "ecriture")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-2 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Bienvenue, {studentName}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Plateforme d'apprentissage du français
            </p>
          </div>
          <div className="flex items-center gap-2 relative">
            {/* Cloche de notifications */}
            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setNotifOpen(!notifOpen)}
                data-testid="button-notifications"
              >
                <Bell className="w-5 h-5" />
              </Button>
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
              {/* Panneau notifications */}
              {notifOpen && (
                <div className="absolute right-0 top-10 w-80 bg-white dark:bg-slate-900 border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <span className="font-semibold text-sm">Notifications</span>
                    <Button size="sm" variant="ghost" onClick={handleMarkAllRead} className="text-xs">
                      Tout marquer lu
                    </Button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">Aucune notification</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={`p-3 border-b border-border text-sm ${!n.isRead ? "bg-blue-50 dark:bg-blue-950" : ""}`} data-testid={`notif-${n.id}`}>
                        <p className="font-medium">{n.title}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString("fr-CA")}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="cours" className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
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
            <TabsTrigger value="dictee" data-testid="tab-dictee">
              <Mic className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Dictée</span>
            </TabsTrigger>
            <TabsTrigger value="ecriture" data-testid="tab-ecriture">
              <PenTool className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Écriture</span>
            </TabsTrigger>
            <TabsTrigger value="progres" data-testid="tab-progres">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Progrès</span>
            </TabsTrigger>
            <TabsTrigger value="documents" data-testid="tab-documents">
              <Upload className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-messages">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>

          {/* Cours Tab */}
          <TabsContent value="cours">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Mes Cours</h2>
                <p className="text-muted-foreground">
                  Sélectionnez un cours pour accéder aux contenus et exercices
                </p>
              </div>

              {/* Search + Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un cours..."
                    className="pl-9 pr-9"
                    data-testid="input-search-courses"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      data-testid="button-clear-search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category pills */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("tous")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === "tous"
                        ? "bg-amber-500 text-white"
                        : "bg-secondary text-muted-foreground hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-amber-700 dark:hover:text-amber-300"
                    }`}
                    data-testid="filter-tous"
                  >
                    Tous ({coursCourses.length})
                  </button>
                  {availableCategories.map((cat) => {
                    const count = coursCourses.filter((c) => c.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === cat
                            ? "bg-amber-500 text-white"
                            : "bg-secondary text-muted-foreground hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-amber-700 dark:hover:text-amber-300"
                        }`}
                        data-testid={`filter-${cat}`}
                      >
                        {getCategoryLabel(cat)} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Result count when filtered */}
                {(searchQuery || selectedCategory !== "tous") && (
                  <p className="text-sm text-muted-foreground">
                    {filteredCourses.length} cours trouvé{filteredCourses.length !== 1 ? "s" : ""}
                    {searchQuery && ` pour « ${searchQuery} »`}
                    {selectedCategory !== "tous" && ` dans ${getCategoryLabel(selectedCategory)}`}
                  </p>
                )}
              </div>

              {/* Course cards — grouped by category when no filter, flat when filtered */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">Aucun cours trouvé</p>
                  <p className="text-sm mt-1">Essayez un autre mot-clé ou une autre catégorie</p>
                </div>
              ) : searchQuery || selectedCategory !== "tous" ? (
                /* Flat list when filter is active */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      badgeColor={getCategoryBadgeColor(course.category)}
                      label={getCategoryLabel(course.category)}
                      onStart={() => handleStartCourse(course.id)}
                    />
                  ))}
                </div>
              ) : (
                /* Grouped by category when no filter */
                <div className="space-y-8">
                  {availableCategories.map((category) => {
                    const categoryCourses = filteredCourses.filter(
                      (c) => c.category === category
                    );
                    if (categoryCourses.length === 0) return null;
                    return (
                      <div key={category}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-5 w-1 rounded-full bg-amber-500" />
                          <h3 className="text-lg font-bold">
                            {getCategoryLabel(category)}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {categoryCourses.length} cours
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {categoryCourses.map((course) => (
                            <CourseCard
                              key={course.id}
                              course={course}
                              badgeColor={getCategoryBadgeColor(course.category)}
                              label={getCategoryLabel(course.category)}
                              onStart={() => handleStartCourse(course.id)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Exercices Tab */}
          <TabsContent value="exercices">
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Exercices interactifs</h2>
                  <p className="text-muted-foreground text-sm">
                    Pratiquez avec des exercices à choix multiple, des textes à trous, des associations et des classements
                  </p>
                </div>
              </div>

              {/* Type filter pills */}
              {(() => {
                const interactiveExercises = exercises.filter((ex) => ex.type !== "text");
                const qcmCount       = interactiveExercises.filter((ex) => ex.type === "multiple_choice").length;
                const fillCount      = interactiveExercises.filter((ex) => ex.type === "fill_blank").length;
                const matchingCount  = interactiveExercises.filter((ex) => ex.type === "matching").length;
                const sortingCount   = interactiveExercises.filter((ex) => ex.type === "sorting").length;
                const trueFalseCount = interactiveExercises.filter((ex) => ex.type === "true_false").length;
                const orderingCount  = interactiveExercises.filter((ex) => ex.type === "ordering").length;

                const EX_TYPE_META: Record<string, { label: string; color: string; activeColor: string }> = {
                  tous:            { label: "Tous",             color: "bg-muted text-muted-foreground", activeColor: "bg-foreground text-background" },
                  multiple_choice: { label: "Choix multiple",   color: "bg-muted text-muted-foreground", activeColor: "bg-blue-600 text-white" },
                  fill_blank:      { label: "Blancs à remplir", color: "bg-muted text-muted-foreground", activeColor: "bg-emerald-600 text-white" },
                  matching:        { label: "Association",      color: "bg-muted text-muted-foreground", activeColor: "bg-violet-600 text-white" },
                  sorting:         { label: "Classement",       color: "bg-muted text-muted-foreground", activeColor: "bg-violet-700 text-white" },
                  true_false:      { label: "Vrai ou Faux",     color: "bg-muted text-muted-foreground", activeColor: "bg-teal-600 text-white" },
                  ordering:        { label: "Mise en ordre",    color: "bg-muted text-muted-foreground", activeColor: "bg-indigo-600 text-white" },
                };

                const filteredEx = selectedExType === "tous"
                  ? interactiveExercises
                  : interactiveExercises.filter((ex) => ex.type === selectedExType);

                // Group by category
                const grouped: Record<string, typeof filteredEx> = {};
                filteredEx.forEach((ex) => {
                  const cat = ex.courseCategory || "autre";
                  if (!grouped[cat]) grouped[cat] = [];
                  grouped[cat].push(ex);
                });

                const EX_BADGE: Record<string, { label: string; color: string }> = {
                  multiple_choice: { label: "QCM",              color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" },
                  fill_blank:      { label: "Blancs à remplir", color: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300" },
                  matching:        { label: "Association",      color: "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300" },
                  sorting:         { label: "Classement",       color: "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300" },
                  true_false:      { label: "Vrai ou Faux",     color: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300" },
                  ordering:        { label: "Mise en ordre",    color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300" },
                };

                return (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {(["tous", "multiple_choice", "fill_blank", "matching", "sorting", "true_false", "ordering"] as const).map((t) => {
                        const count = t === "tous" ? interactiveExercises.length
                          : t === "multiple_choice" ? qcmCount
                          : t === "fill_blank" ? fillCount
                          : t === "matching" ? matchingCount
                          : t === "sorting" ? sortingCount
                          : t === "true_false" ? trueFalseCount
                          : orderingCount;
                        const meta = EX_TYPE_META[t];
                        const active = selectedExType === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedExType(t)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${active ? meta.activeColor : meta.color + " hover-elevate"}`}
                            data-testid={`filter-extype-${t}`}
                          >
                            {meta.label}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${active ? "bg-white/20" : "bg-background/60"}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {filteredEx.length === 0 ? (
                      <Card className="p-12 text-center text-muted-foreground">
                        <p className="font-medium">Aucun exercice trouvé.</p>
                      </Card>
                    ) : (
                      <div className="space-y-8">
                        {Object.entries(grouped).map(([cat, exList]) => (
                          <div key={cat}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-5 w-1 rounded-full bg-amber-500" />
                              <h3 className="text-base font-bold capitalize">
                                {CATEGORY_META[cat]?.label || cat}
                              </h3>
                              <span className="text-xs text-muted-foreground">
                                {exList.length} exercice{exList.length > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                              {exList.map((exercise) => {
                                const badge = EX_BADGE[exercise.type] || EX_BADGE.multiple_choice;
                                return (
                                  <Card
                                    key={exercise.id}
                                    className="p-5 hover-elevate flex flex-col gap-4"
                                    data-testid={`card-exercise-${exercise.id}`}
                                  >
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <span className="text-xs font-semibold text-muted-foreground truncate max-w-[55%]">
                                          {exercise.courseName}
                                        </span>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${badge.color}`}>
                                          {badge.label}
                                        </span>
                                      </div>
                                      <h3 className="text-base font-bold text-foreground leading-snug">
                                        {exercise.title}
                                      </h3>
                                      {exercise.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                          {exercise.description}
                                        </p>
                                      )}
                                    </div>
                                    <Button
                                      onClick={() => handleStartExercise(exercise.id)}
                                      className="w-full"
                                      data-testid={`button-start-exercise-${exercise.id}`}
                                    >
                                      {exercise.type === "fill_blank" ? (
                                        <PenLine className="w-3 h-3 mr-2" />
                                      ) : exercise.type === "matching" ? (
                                        <Link2 className="w-3 h-3 mr-2" />
                                      ) : (
                                        <Play className="w-3 h-3 mr-2" />
                                      )}
                                      Démarrer
                                    </Button>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
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
                <TabsContent value="narratif" className="space-y-6">
                  {(() => {
                    // Group narrative exercises by course (level)
                    const narrativeCourses = courses
                      .filter((c) => c.category === "lecture_reading")
                      .sort((a, b) => a.order - b.order);
                    const byCoursId: Record<string, typeof readingNarrativeExercises> = {};
                    readingNarrativeExercises.forEach((ex) => {
                      if (!byCoursId[ex.courseId]) byCoursId[ex.courseId] = [];
                      byCoursId[ex.courseId].push(ex);
                    });
                    return narrativeCourses.map((course) => {
                      const exs = (byCoursId[course.id] || []).sort((a, b) => a.order - b.order);
                      if (exs.length === 0) return null;
                      return (
                        <div key={course.id}>
                          <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                            {course.title}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {exs.map((exercise, idx) => (
                              <Card
                                key={exercise.id}
                                className="p-3 hover-elevate border-2 border-green-200 dark:border-green-800 cursor-pointer transition-all min-h-40 flex flex-col"
                                data-testid={`card-narrative-${exercise.id}`}
                                onClick={() => setLocation(`/exercise/${exercise.id}`)}
                              >
                                <div className="space-y-2 h-full flex flex-col justify-between">
                                  <div>
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-300 uppercase">
                                      Histoire {idx + 1}
                                    </span>
                                    <h3 className="text-sm font-bold text-foreground mt-1 leading-tight line-clamp-2">
                                      {exercise.title}
                                    </h3>
                                    {exercise.description && (
                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {exercise.description}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLocation(`/exercise/${exercise.id}`);
                                    }}
                                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-xs h-auto py-1"
                                    data-testid={`button-read-narrative-${exercise.id}`}
                                  >
                                    Lire
                                  </Button>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {exercises
                      .filter(
                        (e) =>
                          courses.find((c) => c.id === e.courseId)?.category === "lecture_informatif" &&
                          e.type === "text"
                      )
                      .sort((a, b) => a.order - b.order)
                      .map((exercise, index) => (
                        <Card
                          key={exercise.id}
                          className="p-3 hover-elevate border-2 border-purple-200 dark:border-purple-800 cursor-pointer transition-all min-h-40 flex flex-col"
                          data-testid={`card-informatif-${index}`}
                          onClick={() => setLocation(`/exercise/${exercise.id}`)}
                        >
                          <div className="space-y-2 h-full flex flex-col justify-between">
                            <div>
                              <span className="text-xs font-semibold text-purple-600 dark:text-purple-300 uppercase">
                                Informatif {index + 1}
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
                              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-xs h-auto py-1"
                              data-testid={`button-read-informatif-${index}`}
                            >
                              Lire
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                  {exercises.filter((e) => courses.find((c) => c.id === e.courseId)?.category === "lecture_informatif").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Aucun texte informatif disponible pour le moment.</p>
                    </div>
                  )}
                  {false && exercises
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
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Dictée Tab */}
          <TabsContent value="dictee">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Dictées interactives</h2>
                <p className="text-muted-foreground">
                  Écoute le texte, écris ce que tu entends et reçois une correction mot par mot.
                </p>
              </div>

              {/* Explication */}
              <Card className="p-5 bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-200 dark:border-sky-800">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-100 dark:bg-sky-900">
                    <Volume2 className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sky-900 dark:text-sky-100">Comment ça marche ?</h3>
                    <ol className="text-sm text-sky-800 dark:text-sky-200 space-y-0.5 list-decimal list-inside">
                      <li>Clique sur <strong>Écouter</strong> pour entendre le texte en français</li>
                      <li>Tape le texte dans la zone de saisie</li>
                      <li>Clique sur <strong>Soumettre</strong> pour voir ta correction</li>
                      <li>Les mots corrects apparaissent en <span className="text-green-600 font-medium">vert</span>, les erreurs en <span className="text-red-600 font-medium">rouge</span></li>
                    </ol>
                  </div>
                </div>
              </Card>

              {/* Dictée courses */}
              {(() => {
                const dicteeCourses = courses.filter((c) => c.category === "dictee");
                if (dicteeCourses.length === 0) {
                  return (
                    <Card className="p-8 text-center">
                      <Mic className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Aucune dictée disponible pour le moment.</p>
                      <p className="text-xs text-muted-foreground mt-1">L'enseignant peut t'en assigner une.</p>
                    </Card>
                  );
                }
                const getLevelTheme = (title: string) => {
                  if (title.includes("Niveau 1") || title.includes("Découverte") || title.includes("découverte")) {
                    return {
                      badge: "Niveau 1 — Débutant",
                      cardClass: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                      textClass: "text-green-700 dark:text-green-300",
                      barClass: "bg-green-500",
                    };
                  }
                  if (title.includes("Niveau 2") || title.includes("Intermédiaire") || title.includes("intermédiaire")) {
                    return {
                      badge: "Niveau 2 — Intermédiaire",
                      cardClass: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
                      textClass: "text-amber-700 dark:text-amber-300",
                      barClass: "bg-amber-500",
                    };
                  }
                  if (title.includes("Niveau 3") || title.includes("Avancé") || title.includes("avancé")) {
                    return {
                      badge: "Niveau 3 — Avancé",
                      cardClass: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                      textClass: "text-red-700 dark:text-red-300",
                      barClass: "bg-red-500",
                    };
                  }
                  return {
                    badge: "Découverte",
                    cardClass: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800",
                    textClass: "text-sky-700 dark:text-sky-300",
                    barClass: "bg-sky-500",
                  };
                };

                const sortedDicteeCourses = [...dicteeCourses].sort((a, b) => (a.title < b.title ? -1 : 1));

                return sortedDicteeCourses.map((course) => {
                  const dicExercises = exercises.filter((ex) => ex.courseId === course.id);
                  const theme = getLevelTheme(course.title);
                  return (
                    <div key={course.id} className="space-y-3">
                      {/* En-tête du niveau */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className={`text-xs font-bold uppercase tracking-wider ${theme.textClass}`}>{theme.badge}</span>
                          <h3 className="font-semibold text-foreground">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.description}</p>
                        </div>
                        {course.progressPercentage > 0 && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-32">
                            <div className="flex-1 h-2 rounded-full bg-secondary">
                              <div
                                className={`h-2 rounded-full transition-all ${theme.barClass}`}
                                style={{ width: `${course.progressPercentage}%` }}
                              />
                            </div>
                            <span className="whitespace-nowrap">{course.progressPercentage}%</span>
                          </div>
                        )}
                      </div>
                      {/* Cartes des dictées */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {dicExercises.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((ex, idx) => (
                          <Card
                            key={ex.id}
                            className={`p-5 border-2 hover-elevate ${theme.cardClass}`}
                            data-testid={`card-dictee-${ex.id}`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-xs font-bold uppercase tracking-wider ${theme.textClass}`}>
                                  Dictée {idx + 1}
                                </span>
                                <Mic className={`w-5 h-5 flex-shrink-0 ${theme.textClass}`} />
                              </div>
                              <div>
                                <h3 className="font-bold text-foreground leading-snug">{ex.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{ex.description}</p>
                              </div>
                              <Button
                                onClick={() => handleStartExercise(ex.id)}
                                className="w-full gap-2"
                                data-testid={`button-start-dictee-${ex.id}`}
                              >
                                <Volume2 className="w-4 h-4" />
                                Commencer la dictée
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </TabsContent>

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

              {/* Corrections de l'enseignant */}
              {annotatedResponses.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Corrections de l'enseignant</h3>
                  <div className="space-y-4">
                    {annotatedResponses.map((r: any) => (
                      <div key={r.id} className="border border-border rounded-md p-4 space-y-2" data-testid={`correction-${r.id}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-secondary px-2 py-0.5 rounded text-muted-foreground">{r.course?.title ?? "Cours"}</span>
                          <span className="text-xs text-muted-foreground">›</span>
                          <span className="text-xs text-muted-foreground">{r.exercise?.title ?? "Exercice"}</span>
                        </div>
                        <p className="text-sm font-medium">{r.question?.text}</p>
                        <div className={`text-sm px-3 py-2 rounded-md ${
                          r.isCorrect === true ? "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200" :
                          r.isCorrect === false ? "bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200" :
                          "bg-muted"
                        }`}>
                          <span className="font-medium">Ta réponse : </span>{r.answer}
                          {r.isCorrect === true && <span className="ml-2 text-xs font-semibold text-green-700 dark:text-green-300"> ✓ Correct</span>}
                          {r.isCorrect === false && <span className="ml-2 text-xs font-semibold text-red-700 dark:text-red-300"> ✗ Incorrect</span>}
                        </div>
                        {r.teacherComment && (
                          <div className="flex gap-2 bg-amber-50 dark:bg-amber-950 px-3 py-2 rounded-md">
                            <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-sm">{r.teacherComment}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

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

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Formulaire de dépôt */}
              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Déposer un document
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre du document</label>
                    <Input
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      placeholder="Ex: Rédaction sur les saisons"
                      data-testid="input-doc-title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fichier (max 5 Mo — PDF, Word, image, texte)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                      onChange={(e) => setDocFile(e.target.files?.[0] ?? null)}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 dark:file:bg-amber-900 dark:file:text-amber-200"
                      data-testid="input-doc-file"
                    />
                  </div>
                  {docError && (
                    <p className="text-sm text-red-600 dark:text-red-400" data-testid="text-doc-error">{docError}</p>
                  )}
                  <Button
                    onClick={handleDocUpload}
                    disabled={!docFile || !docTitle.trim() || docUploading}
                    data-testid="button-doc-upload"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {docUploading ? "Envoi en cours…" : "Envoyer le document"}
                  </Button>
                </div>
              </Card>

              {/* Liste des documents */}
              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Mes documents déposés ({documents.length})
                </h2>
                {documents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">Aucun document déposé pour l'instant.</p>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border border-border rounded-md p-4 space-y-2" data-testid={`card-doc-${doc.id}`}>
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <p className="font-semibold">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">{doc.fileName} — {(doc.fileSize / 1024).toFixed(1)} Ko</p>
                            <p className="text-xs text-muted-foreground">
                              Déposé le {new Date(doc.uploadedAt).toLocaleDateString("fr-CA")}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.teacherReviewed ? (
                              <span className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400 font-semibold">
                                <CheckCircle className="w-4 h-4" />
                                Corrigé
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">En attente</span>
                            )}
                            <a href={`/api/documents/${doc.id}/download`} download={doc.fileName}>
                              <Button size="icon" variant="outline" data-testid={`button-doc-download-${doc.id}`}>
                                <Download className="w-4 h-4" />
                              </Button>
                            </a>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleDocDelete(doc.id)}
                              data-testid={`button-doc-delete-${doc.id}`}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        {doc.teacherComment && (
                          <div className="bg-amber-50 dark:bg-amber-950 rounded-md p-3 flex gap-2">
                            <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                            <p className="text-sm">{doc.teacherComment}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-1">Messages</h2>
              <p className="text-muted-foreground mb-6">
                {teacher
                  ? `Conversation avec ${teacher.firstName} ${teacher.lastName}`
                  : "Aucun enseignant assigné pour le moment."}
              </p>
              {teacher ? (
                <Card className="flex flex-col" style={{ minHeight: "24rem" }}>
                  {/* Liste des messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "28rem" }}>
                    {chatMessages.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center mt-8">Aucun message. Commencez la conversation!</p>
                    ) : (
                      chatMessages.map((m: any) => {
                        const isMe = m.senderId === localStorage.getItem("userId");
                        return (
                          <div
                            key={m.id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                            data-testid={`msg-${m.id}`}
                          >
                            <div
                              className={`max-w-xs px-3 py-2 rounded-md text-sm ${
                                isMe
                                  ? "bg-blue-600 text-white"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p>{m.content}</p>
                              <p className={`text-xs mt-1 ${isMe ? "text-blue-200" : "text-muted-foreground"}`}>
                                {new Date(m.createdAt).toLocaleString("fr-CA")}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {/* Zone de saisie */}
                  <div className="border-t border-border p-4 flex gap-2">
                    <Input
                      value={msgDraft}
                      onChange={e => setMsgDraft(e.target.value)}
                      placeholder="Écrire un message…"
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                      data-testid="input-message"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={msgSending || !msgDraft.trim()}
                      data-testid="button-send-message"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Votre enseignant n'a pas encore assigné de cours. La messagerie sera disponible une fois un cours assigné.</p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
