import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, BookOpen, Plus, LogOut, FileText, Download, CheckCircle, MessageSquare, Clock, Bell, MessageCircle, Send } from "lucide-react";

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
  const [newCourse, setNewCourse] = useState({ title: "", description: "", category: "grammaire" });
  const [documents, setDocuments] = useState<StudentDoc[]>([]);
  const [commentDraft, setCommentDraft] = useState<{ [id: string]: string }>({});
  const [savingComment, setSavingComment] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [selectedStudentMsg, setSelectedStudentMsg] = useState<Student | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [msgDraft, setMsgDraft] = useState("");
  const [msgSending, setMsgSending] = useState(false);

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
        // Charger les documents des élèves
        const docsRes = await fetch(`/api/documents/teacher/${userId}`, { credentials: "include" });
        if (docsRes.ok) {
          const docs: StudentDoc[] = await docsRes.json();
          setDocuments(docs);
          const drafts: { [id: string]: string } = {};
          docs.forEach(d => { drafts[d.id] = d.teacherComment ?? ""; });
          setCommentDraft(drafts);
        }
        // Charger les notifications
        const notifRes = await fetch(`/api/notifications/${userId}`, { credentials: "include" });
        if (notifRes.ok) setNotifications(await notifRes.json());
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLocation]);

  const handleSaveComment = async (docId: string, reviewed: boolean) => {
    setSavingComment(docId);
    const res = await fetch(`/api/documents/${docId}/comment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment: commentDraft[docId] ?? "", reviewed }),
    });
    if (res.ok) {
      const updated: StudentDoc = await res.json();
      setDocuments(prev => prev.map(d => d.id === docId ? { ...updated } : d));
    }
    setSavingComment(null);
  };

  const loadMessages = async (studentId: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const res = await fetch(`/api/messages/${userId}/${studentId}`, { credentials: "include" });
    if (res.ok) setChatMessages(await res.json());
  };

  const handleSelectStudentMsg = (s: Student) => {
    setSelectedStudentMsg(s);
    setChatMessages([]);
    loadMessages(s.id);
  };

  const handleSendMessage = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !selectedStudentMsg || !msgDraft.trim()) return;
    setMsgSending(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ senderId: userId, receiverId: selectedStudentMsg.id, content: msgDraft.trim() }),
    });
    setMsgSending(false);
    if (res.ok) {
      setMsgDraft("");
      loadMessages(selectedStudentMsg.id);
    }
  };

  const handleMarkAllRead = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    await fetch(`/api/notifications/${userId}/read-all`, { method: "PATCH", credentials: "include" });
    const res = await fetch(`/api/notifications/${userId}`, { credentials: "include" });
    if (res.ok) setNotifications(await res.json());
  };

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              Tableau de bord Enseignant
            </h1>
            <p className="text-sm text-muted-foreground">
              Bienvenue, {teacherName}
            </p>
          </div>
          <div className="flex items-center gap-2 relative">
            <Button
              variant="outline"
              onClick={() => setLocation("/teacher-reports")}
              data-testid="button-reports"
            >
              Rapports
            </Button>
            {/* Cloche de notifications enseignant */}
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="courses" data-testid="tab-courses">
              <BookOpen className="w-4 h-4 mr-2" />
              Cours
            </TabsTrigger>
            <TabsTrigger value="students" data-testid="tab-students">
              <Users className="w-4 h-4 mr-2" />
              Élèves ({students.length})
            </TabsTrigger>
            <TabsTrigger value="documents" data-testid="tab-documents">
              <FileText className="w-4 h-4 mr-2" />
              Documents
              {documents.filter(d => !d.teacherReviewed).length > 0 && (
                <span className="ml-2 bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {documents.filter(d => !d.teacherReviewed).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-messages-teacher">
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
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
                      <optgroup label="Langue">
                        <option value="grammaire">Grammaire</option>
                        <option value="orthographe">Orthographe</option>
                        <option value="conjugaison">Conjugaison</option>
                        <option value="ponctuation">Ponctuation</option>
                        <option value="vocabulaire">Vocabulaire</option>
                        <option value="classes_de_mots">Classes de mots</option>
                      </optgroup>
                      <optgroup label="Lecture">
                        <option value="lecture_reading">Lecture — cours</option>
                        <option value="textes_narratifs">Textes narratifs</option>
                        <option value="textes_descriptifs">Textes descriptifs</option>
                      </optgroup>
                      <optgroup label="Écriture">
                        <option value="ecriture">Écriture</option>
                      </optgroup>
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

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-xl font-bold">Documents déposés par les élèves</h2>
                <span className="text-sm text-muted-foreground">
                  {documents.filter(d => !d.teacherReviewed).length} en attente · {documents.filter(d => d.teacherReviewed).length} corrigés
                </span>
              </div>
              {documents.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  Aucun document déposé par vos élèves pour l'instant.
                </Card>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => {
                    const student = students.find(s => s.id === doc.studentId);
                    return (
                      <Card key={doc.id} className="p-5" data-testid={`card-doc-${doc.id}`}>
                        <div className="flex items-start justify-between gap-2 flex-wrap mb-3">
                          <div>
                            <p className="font-semibold">{doc.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {student ? `${student.firstName} ${student.lastName}` : "Élève inconnu"} · {doc.fileName} · {(doc.fileSize / 1024).toFixed(1)} Ko
                            </p>
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
                              <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                                <Clock className="w-4 h-4" />
                                En attente
                              </span>
                            )}
                            <a href={`/api/documents/${doc.id}/download`} download={doc.fileName}>
                              <Button size="icon" variant="outline" data-testid={`button-doc-download-${doc.id}`}>
                                <Download className="w-4 h-4" />
                              </Button>
                            </a>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-1 text-sm font-medium">
                            <MessageSquare className="w-4 h-4" />
                            Commentaire pour l'élève
                          </label>
                          <Textarea
                            value={commentDraft[doc.id] ?? ""}
                            onChange={(e) => setCommentDraft(prev => ({ ...prev, [doc.id]: e.target.value }))}
                            placeholder="Écrire un commentaire…"
                            rows={2}
                            data-testid={`textarea-comment-${doc.id}`}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSaveComment(doc.id, false)}
                              disabled={savingComment === doc.id}
                              data-testid={`button-save-comment-${doc.id}`}
                            >
                              Sauvegarder
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSaveComment(doc.id, true)}
                              disabled={savingComment === doc.id}
                              data-testid={`button-mark-reviewed-${doc.id}`}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Marquer comme corrigé
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ minHeight: "28rem" }}>
              {/* Liste des élèves */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Choisir un élève</h3>
                <div className="space-y-2">
                  {students.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun élève assigné.</p>
                  ) : (
                    students.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSelectStudentMsg(s)}
                        className={`w-full text-left px-4 py-3 rounded-md border border-border text-sm transition-colors ${selectedStudentMsg?.id === s.id ? "bg-blue-100 dark:bg-blue-900 font-medium" : "bg-card hover-elevate"}`}
                        data-testid={`button-select-student-msg-${s.id}`}
                      >
                        {s.firstName} {s.lastName}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Zone de conversation */}
              <div className="md:col-span-2">
                {selectedStudentMsg ? (
                  <Card className="flex flex-col h-full">
                    <div className="p-4 border-b border-border font-semibold text-sm">
                      Conversation avec {selectedStudentMsg.firstName} {selectedStudentMsg.lastName}
                    </div>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "22rem" }}>
                      {chatMessages.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center mt-8">Aucun message. Commencez la conversation!</p>
                      ) : (
                        chatMessages.map((m: any) => {
                          const isMe = m.senderId === localStorage.getItem("userId");
                          return (
                            <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`} data-testid={`msg-${m.id}`}>
                              <div className={`max-w-xs px-3 py-2 rounded-md text-sm ${isMe ? "bg-blue-600 text-white" : "bg-muted text-foreground"}`}>
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
                        data-testid="input-message-teacher"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={msgSending || !msgDraft.trim()}
                        data-testid="button-send-message-teacher"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    <div className="text-center">
                      <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
                      <p>Sélectionnez un élève pour démarrer une conversation.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
