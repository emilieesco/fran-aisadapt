import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertExerciseSchema, insertQuestionSchema, insertResponseSchema } from "@shared/schema";

export async function registerRoutes(app: Express, server: Server): Promise<Server> {
  // ─── Middleware admin ────────────────────────────────────────────────────────
  async function requireAdmin(req: any, res: any, next: any) {
    const adminId = req.headers["x-admin-id"] as string;
    if (!adminId) return res.status(401).send("Non autorisé");
    const user = await storage.getUser(adminId);
    if (!user || user.role !== "admin") return res.status(403).send("Accès refusé");
    next();
  }

  // Auth Routes
  app.post("/api/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);

      // Les enseignants doivent fournir un code d'invitation valide et inutilisé
      if (data.role === "teacher") {
        const inviteCode = req.body.inviteCode as string;
        if (!inviteCode) return res.status(403).send("Un code d'invitation est requis");

        const invite = await storage.getInviteCode(inviteCode);
        if (!invite) return res.status(403).send("Code d'invitation invalide");
        if (invite.usedBy) return res.status(403).send("Ce code d'invitation a déjà été utilisé");
      }

      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) return res.status(400).send("L'utilisateur existe déjà");

      const user = await storage.createUser(data);

      // Marquer le code comme utilisé
      if (data.role === "teacher") {
        await storage.useInviteCode(req.body.inviteCode, user.id);
      }

      res.json(user);
    } catch (err) {
      res.status(400).send("Erreur lors de l'inscription");
    }
  });

  // ─── Routes Admin ─────────────────────────────────────────────────────────────

  // Lister tous les utilisateurs
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      res.json(allUsers.filter((u) => u.role !== "admin"));
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Supprimer un utilisateur
  app.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Lister les codes d'invitation
  app.get("/api/admin/invite-codes", requireAdmin, async (req, res) => {
    try {
      const codes = await storage.getAllInviteCodes();
      res.json(codes);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Créer un code d'invitation
  app.post("/api/admin/invite-codes", requireAdmin, async (req, res) => {
    try {
      const { label } = req.body;
      const code = Math.random().toString(36).slice(2, 8).toUpperCase() + "-" +
                   Math.random().toString(36).slice(2, 6).toUpperCase();
      const invite = await storage.createInviteCode({ code, label: label || null });
      res.json(invite);
    } catch (err) {
      res.status(500).send("Erreur lors de la création du code");
    }
  });

  // Révoquer un code d'invitation
  app.delete("/api/admin/invite-codes/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteInviteCode(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).send("Identifiants invalides");
      }
      res.json(user);
    } catch (err) {
      res.status(400).send("Erreur lors de la connexion");
    }
  });

  // User Routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) return res.status(404).send("Utilisateur non trouvé");
      res.json(user);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Course Routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) return res.status(404).send("Cours non trouvé");
      res.json(course);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const body = {
        content: "",
        order: 999,
        ...req.body,
      };
      const data = insertCourseSchema.parse(body);
      const course = await storage.createCourse(data);
      res.json(course);
    } catch (err) {
      console.error("Erreur création cours:", err);
      res.status(400).send("Erreur lors de la création du cours");
    }
  });

  app.get("/api/courses/:id/exercises", async (req, res) => {
    try {
      const exercises = await storage.getExercisesByCourse(req.params.id);
      res.json(exercises);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Exercise Routes
  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const exercise = await storage.getExercise(req.params.id);
      if (!exercise) return res.status(404).send("Exercice non trouvé");
      res.json(exercise);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.post("/api/exercises", async (req, res) => {
    try {
      const data = insertExerciseSchema.parse(req.body);
      const exercise = await storage.createExercise(data);
      res.json(exercise);
    } catch (err) {
      res.status(400).send("Erreur lors de la création de l'exercice");
    }
  });

  app.get("/api/exercises/:id/questions", async (req, res) => {
    try {
      const questions = await storage.getQuestionsByExercise(req.params.id);
      res.json(questions);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Reading Narrative Exercises Route
  app.get("/api/reading-narratives", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).send("userId requis");
      
      const exercises = await storage.getReadingNarrativeExercises(userId);
      res.json(exercises);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Question Routes
  app.post("/api/questions", async (req, res) => {
    try {
      const data = insertQuestionSchema.parse(req.body);
      const question = await storage.createQuestion(data);
      res.json(question);
    } catch (err) {
      res.status(400).send("Erreur lors de la création de la question");
    }
  });

  // Student Response Routes
  app.post("/api/student-responses", async (req, res) => {
    try {
      const data = insertResponseSchema.parse(req.body);
      const response = await storage.createResponse(data);
      res.json(response);
    } catch (err) {
      res.status(400).send("Erreur lors de la sauvegarde de la réponse");
    }
  });

  // Notation d'une réponse texte libre par l'enseignant
  app.patch("/api/student-responses/:id/grade", async (req, res) => {
    try {
      const { isCorrect, comment } = req.body;
      if (typeof isCorrect !== "boolean") return res.status(400).send("isCorrect (boolean) requis");
      const updated = await storage.updateResponseGrade(req.params.id, isCorrect, comment);
      if (!updated) return res.status(404).send("Réponse introuvable");
      res.json(updated);
    } catch (err) {
      console.error("Erreur notation:", err);
      res.status(500).send("Erreur serveur");
    }
  });

  // Statistiques des questions d'un exercice (taux de réussite par question)
  app.get("/api/exercises/:id/stats", async (req, res) => {
    try {
      const questions = await storage.getQuestionsByExercise(req.params.id);
      const stats = await Promise.all(
        questions.map(async (q) => {
          const responses = await storage.getResponsesByQuestion(q.id);
          const autoGraded = responses.filter((r) => r.isCorrect !== null);
          const correct = autoGraded.filter((r) => r.isCorrect === true).length;
          const total = autoGraded.length;
          const accuracy = total > 0 ? Math.round((correct / total) * 100) : null;
          return {
            questionId: q.id,
            questionTitle: q.title,
            questionText: q.text.length > 80 ? q.text.slice(0, 80) + "…" : q.text,
            type: q.type,
            totalResponses: total,
            correctResponses: correct,
            accuracy,
          };
        })
      );
      // Trier par taux de réussite croissant (questions difficiles en premier)
      stats.sort((a, b) => (a.accuracy ?? 101) - (b.accuracy ?? 101));
      res.json(stats);
    } catch (err) {
      console.error("Erreur stats exercice:", err);
      res.status(500).send("Erreur serveur");
    }
  });

  app.patch("/api/student-responses/:id/comment", async (req, res) => {
    try {
      const { comment } = req.body;
      if (typeof comment !== "string") {
        return res.status(400).send("Champ 'comment' requis");
      }
      const updated = await storage.updateResponseComment(req.params.id, comment);
      if (!updated) return res.status(404).send("Réponse introuvable");
      res.json(updated);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Student Progress Routes
  app.get("/api/students/:id/courses", async (req, res) => {
    try {
      const studentId = req.params.id;
      const allCourses = await storage.getAllCourses();
      const progress = await storage.getAllStudentProgress(studentId);
      const assignments = await storage.getAssignmentsByStudent(studentId);

      const assignmentByCourse = new Map(assignments.map((a) => [a.courseId, a]));

      const courses = allCourses.map((course) => {
        const studentProgress = progress.find((p) => p.courseId === course.id);
        const assignment = assignmentByCourse.get(course.id);
        return {
          ...course,
          progressPercentage: studentProgress?.progressPercentage || 0,
          completed: studentProgress?.completed || false,
          dueDate: assignment?.dueDate || null,
          isAssigned: !!assignment,
        };
      });

      res.json(courses);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Recalculer et sauvegarder la progression d'un élève sur un cours
  app.post("/api/students/:id/progress", async (req, res) => {
    try {
      const studentId = req.params.id;
      const { courseId } = req.body;
      if (!courseId) return res.status(400).send("courseId requis");

      // Récupérer tous les exercices du cours
      const exercises = await storage.getExercisesByCourse(courseId);
      if (exercises.length === 0) return res.json({ progressPercentage: 0, completed: false });

      // Récupérer toutes les questions de ces exercices
      let allQuestions: any[] = [];
      for (const ex of exercises) {
        const qs = await storage.getQuestionsByExercise(ex.id);
        allQuestions = allQuestions.concat(qs);
      }

      const totalQuestions = allQuestions.length;
      if (totalQuestions === 0) return res.json({ progressPercentage: 0, completed: false });

      // Récupérer toutes les réponses de cet élève
      const responses = await storage.getResponsesByStudent(studentId);
      const questionIds = new Set(allQuestions.map((q) => q.id));

      // Filtrer les réponses pour ce cours uniquement
      const courseResponses = responses.filter((r) => questionIds.has(r.questionId));

      // Compter les questions répondues (une seule réponse par question — la dernière)
      const answeredSet = new Set(courseResponses.map((r) => r.questionId));
      const answeredCount = answeredSet.size;

      // Compter les bonnes réponses (isCorrect === true)
      const correctSet = new Set(
        courseResponses.filter((r) => r.isCorrect === true).map((r) => r.questionId)
      );
      const correctCount = correctSet.size;

      const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);
      const completed = answeredCount >= totalQuestions;

      const progress = await storage.updateProgress(
        studentId,
        courseId,
        progressPercentage,
        correctCount,
        totalQuestions,
        completed
      );

      res.json(progress);
    } catch (err) {
      console.error("Erreur mise à jour progression:", err);
      res.status(500).send("Erreur serveur");
    }
  });

  app.get("/api/students/:id/exercises", async (req, res) => {
    try {
      const allExercises = await storage.getAllExercises();
      const allCourses = await storage.getAllCourses();
      const courseMap = new Map(allCourses.map((c) => [c.id, c]));

      // Attach course info to each exercise
      const enriched = allExercises.map((ex) => {
        const course = courseMap.get(ex.courseId);
        return {
          ...ex,
          courseName: course?.title || "",
          courseCategory: course?.category || "",
        };
      });

      res.json(enriched);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.get("/api/students/:id/badges", async (req, res) => {
    try {
      const badges = await storage.getBadgesByStudent(req.params.id);
      res.json(badges);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Teacher Routes
  app.get("/api/teachers/:id/students", async (req, res) => {
    try {
      const students = await storage.getStudentsByTeacher(req.params.id);
      res.json(students);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.get("/api/teachers/:id/reports", async (req, res) => {
    try {
      const reports = await storage.getStudentReports(req.params.id);
      res.json(reports);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.get("/api/teachers/:teacherId/students/:studentId/responses", async (req, res) => {
    try {
      const { teacherId, studentId } = req.params;

      // Verify the teacher exists
      const teacher = await storage.getUser(teacherId);
      if (!teacher || teacher.role !== "teacher") {
        return res.status(403).send("Accès non autorisé");
      }

      const responses = await storage.getResponsesByStudent(studentId);
      
      // Enrich responses with question and exercise details
      const enrichedResponses = await Promise.all(
        responses.map(async (response) => {
          const question = await storage.getQuestion(response.questionId);
          const exercise = question ? await storage.getExercise(question.exerciseId) : null;
          const course = exercise ? await storage.getCourse(exercise.courseId) : null;
          
          return {
            ...response,
            question: question ? { id: question.id, title: question.title, text: question.text, type: question.type } : null,
            exercise: exercise ? { id: exercise.id, title: exercise.title } : null,
            course: course ? { id: course.id, title: course.title, category: course.category } : null,
          };
        })
      );

      res.json(enrichedResponses);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Assignment Routes
  app.get("/api/courses/:id/assignments", async (req, res) => {
    try {
      const assignments = await storage.getAssignmentsByCourse(req.params.id);
      // Enrich with student info
      const enriched = await Promise.all(
        assignments.map(async (a) => {
          const student = await storage.getUser(a.studentId);
          return {
            ...a,
            student: student
              ? { id: student.id, firstName: student.firstName, lastName: student.lastName }
              : null,
          };
        })
      );
      res.json(enriched);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  app.post("/api/assignments", async (req, res) => {
    try {
      const { teacherId, studentId, courseId, dueDate } = req.body;
      if (!teacherId || !studentId || !courseId) {
        return res.status(400).send("Champs manquants: teacherId, studentId, courseId");
      }
      // Limite de 25 élèves par enseignant
      const teacherAssignments = await storage.getAssignmentsByTeacher(teacherId);
      const uniqueStudents = new Set(teacherAssignments.map((a) => a.studentId));
      if (!uniqueStudents.has(studentId) && uniqueStudents.size >= 25) {
        return res.status(403).send("Limite atteinte : un enseignant ne peut pas avoir plus de 25 élèves");
      }

      // Vérifier si l'assignation existe déjà
      const existing = await storage.getAssignmentsByCourse(courseId);
      const duplicate = existing.find(
        (a) => a.studentId === studentId && a.teacherId === teacherId
      );
      if (duplicate) {
        return res.status(409).send("Ce cours est déjà assigné à cet élève");
      }
      const assignment = await storage.createAssignment({
        teacherId,
        studentId,
        courseId,
        dueDate: dueDate || null,
        createdAt: new Date(),
      });
      res.json(assignment);
    } catch (err) {
      res.status(400).send("Erreur lors de la création de l'assignation");
    }
  });

  app.delete("/api/assignments/:id", async (req, res) => {
    try {
      await storage.deleteAssignment(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // ─── DOCUMENTS ÉLÈVES ────────────────────────────────────────────────────────

  // Déposer un document (élève)
  app.post("/api/documents", async (req, res) => {
    try {
      const { studentId, title, fileName, fileType, fileSize, fileData } = req.body;
      if (!studentId || !title || !fileName || !fileType || !fileSize || !fileData) {
        return res.status(400).send("Champs manquants");
      }
      if (fileSize > 5 * 1024 * 1024) {
        return res.status(400).send("Fichier trop volumineux (max 5 Mo)");
      }
      const doc = await storage.createDocument({ studentId, title, fileName, fileType, fileSize, fileData });
      res.json(doc);
    } catch (err) {
      res.status(500).send("Erreur lors du dépôt du document");
    }
  });

  // Lister les documents d'un élève (l'élève ne peut voir que les siens)
  app.get("/api/documents/student/:studentId", async (req, res) => {
    try {
      const requesterId = req.headers["x-user-id"] as string;
      // Si un x-user-id est fourni, vérifier qu'il correspond au studentId demandé
      if (requesterId && requesterId !== req.params.studentId) {
        return res.status(403).send("Accès refusé");
      }
      const docs = await storage.getDocumentsByStudent(req.params.studentId);
      // Ne pas renvoyer fileData dans la liste (trop lourd)
      res.json(docs.map(({ fileData, ...rest }) => rest));
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Lister les documents des élèves d'un enseignant
  app.get("/api/documents/teacher/:teacherId", async (req, res) => {
    try {
      const docs = await storage.getDocumentsByTeacher(req.params.teacherId);
      res.json(docs.map(({ fileData, ...rest }) => rest));
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Télécharger un document (renvoie fileData)
  app.get("/api/documents/:id/download", async (req, res) => {
    try {
      const doc = await storage.getDocument(req.params.id);
      if (!doc) return res.status(404).send("Document introuvable");
      const buffer = Buffer.from(doc.fileData, "base64");
      res.setHeader("Content-Type", doc.fileType);
      res.setHeader("Content-Disposition", `attachment; filename="${doc.fileName}"`);
      res.send(buffer);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Commenter / valider un document (enseignant)
  app.patch("/api/documents/:id/comment", async (req, res) => {
    try {
      const { comment, reviewed, teacherId } = req.body;
      const docBefore = await storage.getDocument(req.params.id);
      const doc = await storage.updateDocumentComment(req.params.id, comment ?? "", reviewed ?? false);
      if (!doc) return res.status(404).send("Document introuvable");
      // Créer une notification si le document vient d'être marqué corrigé
      if (reviewed && docBefore && !docBefore.teacherReviewed) {
        await storage.createNotification({
          userId: doc.studentId,
          type: "document_reviewed",
          title: "Document corrigé",
          message: `Votre document "${doc.title}" a été corrigé par votre enseignant${comment ? " avec un commentaire" : ""}.`,
          relatedId: doc.id,
        });
      }
      res.json(doc);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Supprimer un document (élève)
  app.delete("/api/documents/:id", async (req, res) => {
    try {
      await storage.deleteDocument(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Trouver l'enseignant d'un élève (via ses assignments)
  app.get("/api/students/:id/teacher", async (req, res) => {
    try {
      const assignments = await storage.getAssignmentsByStudent(req.params.id);
      if (assignments.length === 0) return res.json(null);
      const teacher = await storage.getUser(assignments[0].teacherId);
      if (!teacher) return res.json(null);
      const { password, ...safeTeacher } = teacher;
      res.json(safeTeacher);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // ─── MESSAGES ────────────────────────────────────────────────────────────────

  // Envoyer un message
  app.post("/api/messages", async (req, res) => {
    try {
      const { senderId, receiverId, content } = req.body;
      if (!senderId || !receiverId || !content?.trim()) {
        return res.status(400).send("Champs manquants");
      }
      const msg = await storage.sendMessage({ senderId, receiverId, content: content.trim() });
      // Notifier le destinataire
      const sender = await storage.getUser(senderId);
      if (sender) {
        await storage.createNotification({
          userId: receiverId,
          type: "new_message",
          title: "Nouveau message",
          message: `${sender.firstName} ${sender.lastName} vous a envoyé un message.`,
          relatedId: senderId,
        });
      }
      res.json(msg);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Récupérer la conversation entre deux utilisateurs
  app.get("/api/messages/:userId1/:userId2", async (req, res) => {
    try {
      const msgs = await storage.getMessages(req.params.userId1, req.params.userId2);
      // Marquer les messages du destinataire comme lus
      await storage.markMessagesRead(req.params.userId1, req.params.userId2);
      res.json(msgs);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Nombre de messages non lus
  app.get("/api/messages/unread/:userId", async (req, res) => {
    try {
      const count = await storage.getUnreadCount(req.params.userId);
      res.json({ count });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

  // Récupérer les notifications d'un utilisateur
  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const notifs = await storage.getNotifications(req.params.userId);
      res.json(notifs);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Nombre de notifications non lues
  app.get("/api/notifications/:userId/unread-count", async (req, res) => {
    try {
      const count = await storage.getUnreadNotificationCount(req.params.userId);
      res.json({ count });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Marquer une notification comme lue
  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      await storage.markNotificationRead(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  // Marquer toutes les notifications comme lues
  app.patch("/api/notifications/:userId/read-all", async (req, res) => {
    try {
      await storage.markAllNotificationsRead(req.params.userId);
      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  });

  return server;
}
