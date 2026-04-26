import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertExerciseSchema, insertQuestionSchema, insertResponseSchema } from "@shared/schema";
import { HISTOIRES } from "@shared/histoires";
import PDFDocument from "pdfkit";

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

  // Réponses annotées d'un élève (commentaires ou notations de l'enseignant)
  app.get("/api/students/:id/annotated-responses", async (req, res) => {
    try {
      const responses = await storage.getResponsesByStudent(req.params.id);
      const annotated = responses.filter(r => r.teacherComment || r.isCorrect !== null);
      const enriched = await Promise.all(
        annotated.map(async (r) => {
          const question = await storage.getQuestion(r.questionId);
          const exercise = question ? await storage.getExercise(question.exerciseId) : null;
          const course = exercise ? await storage.getCourse(exercise.courseId) : null;
          return { ...r, question: question ? { id: question.id, text: question.text, type: question.type } : null, exercise: exercise ? { id: exercise.id, title: exercise.title } : null, course: course ? { id: course.id, title: course.title } : null };
        })
      );
      res.json(enriched.filter(r => r.question));
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

  // ── GROUPES D'ÉLÈVES ─────────────────────────────────────────────────────────

  app.get('/api/groups/teacher/:teacherId', async (req, res) => {
    try {
      const groups = await storage.getGroupsByTeacher(req.params.teacherId);
      res.json(groups);
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  app.post('/api/groups', async (req, res) => {
    try {
      const { teacherId, name, description, color } = req.body;
      if (!teacherId || !name) return res.status(400).json({ error: 'Champs obligatoires manquants' });
      const group = await storage.createGroup({ teacherId, name, description: description || null, color: color || '#6366f1' });
      res.json(group);
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  app.patch('/api/groups/:id', async (req, res) => {
    try {
      const { name, description, color } = req.body;
      const group = await storage.updateGroup(req.params.id, name, description || '', color || '#6366f1');
      if (!group) return res.status(404).json({ error: 'Groupe introuvable' });
      res.json(group);
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  app.delete('/api/groups/:id', async (req, res) => {
    try {
      await storage.deleteGroup(req.params.id);
      res.json({ success: true });
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  app.get('/api/groups/:groupId/members', async (req, res) => {
    try {
      const members = await storage.getGroupMembers(req.params.groupId);
      res.json(members);
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  app.post('/api/groups/:groupId/members', async (req, res) => {
    try {
      const { studentId } = req.body;
      if (!studentId) return res.status(400).json({ error: 'studentId requis' });
      const member = await storage.addGroupMember(req.params.groupId, studentId);
      res.json(member);
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  app.delete('/api/groups/:groupId/members/:studentId', async (req, res) => {
    try {
      await storage.removeGroupMember(req.params.groupId, req.params.studentId);
      res.json({ success: true });
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  app.get('/api/groups/student/:studentId', async (req, res) => {
    try {
      const groups = await storage.getStudentGroups(req.params.studentId);
      res.json(groups);
    } catch (err) { res.status(500).send('Erreur serveur'); }
  });

  // ─── Téléchargement PDF du cahier de lecture ─────────────────────────────
  app.get('/api/cahier-pdf', async (_req, res) => {
    const ILLUS_PATH = '/home/runner/workspace/attached_assets/u6899119312_digital_textured_cartoon_illustration_in_the_styl__1777164459656.png';
    const fs = await import('fs');
    const illustrationExists = fs.existsSync(ILLUS_PATH);

    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 55, bottom: 55, left: 60, right: 60 },
      info: {
        Title: 'Cahier de lecture \u2014 Histoires du Qu\u00e9bec',
        Author: 'Fran\u00e7ais Actif',
        Subject: 'Cahier de lecture interactif',
      },
      bufferPages: true,
    });

    doc.initForm();

    res.setHeader('Content-Disposition', 'attachment; filename="cahier-lecture-histoires-du-quebec.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    const PW = doc.page.width;
    const PH = doc.page.height;
    const ML = 60; const MR = 60; const MT = 55; const MB = 55;
    const W = PW - ML - MR;

    const NAVY  = '#2D5A3D';
    const GOLD  = '#5A8F5A';
    const CREAM = '#F0F7F0';
    const DARK  = '#1C2E1C';
    const MID   = '#4A6B4A';
    const LIGHT = '#7A9B7A';

    const typeColors: Record<string, string> = {
      comprehension: '#2563EB',
      inference:     '#7C3AED',
      reaction:      '#059669',
      jugement:      '#DC2626',
      grammaire:     '#D97706',
    };
    const typeLabels: Record<string, string> = {
      comprehension: 'COMPR\u00c9HENSION',
      inference:     'INF\u00c9RENCE',
      reaction:      'R\u00c9ACTION PERSONNELLE',
      jugement:      'JUGEMENT CRITIQUE',
      grammaire:     'GRAMMAIRE',
    };
    const typeDescs: Record<string, string> = {
      comprehension: 'Repérer l\u2019information explicite',
      inference:     'Déduire ce qui est implicite',
      reaction:      'Réagir personnellement au texte',
      jugement:      'Évaluer et défendre une position',
      grammaire:     'Analyser la langue et les procédés',
    };

    // ── PAGE COUVERTURE ────────────────────────────────────────────────────────
    // Fond blanc crème
    doc.rect(0, 0, PW, PH).fill('#FFFFFF');

    // Illustration florale en haut (55 % de la hauteur)
    const imgH = Math.round(PH * 0.55);
    if (illustrationExists) {
      try {
        doc.image(ILLUS_PATH, 0, 0, { width: PW, height: imgH, cover: [PW, imgH] });
      } catch (_) { /* si l'image ne charge pas on continue */ }
    }

    // Bande vert pâle fine sous l'image (pas de boucle — évite les pages vides)
    doc.rect(0, imgH, PW, 5).fill(GOLD);

    // Zone inférieure blanche
    const zoneY = imgH + 5;

    // Pastille collection
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(8)
       .text('FRAN\u00c7AIS ACTIF \u2014 COLLECTION LECTURE', ML, zoneY + 14, { width: W, align: 'center' });

    // Grand titre
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(30)
       .text('Cahier de lecture', ML, zoneY + 28, { width: W, align: 'center' });

    doc.fillColor(MID).font('Helvetica').fontSize(15)
       .text('Histoires du Qu\u00e9bec', ML, zoneY + 64, { width: W, align: 'center' });

    doc.fillColor(LIGHT).font('Helvetica').fontSize(9)
       .text('10 histoires originales  \u2022  Niveau secondaire  \u2022  Exercices interactifs', ML, zoneY + 84, { width: W, align: 'center' });

    // Cartouche identification — fond vert très pâle
    const cartX = ML + 20; const cartW = W - 40; const cartY2 = zoneY + 104; const cartH2 = 96;
    doc.roundedRect(cartX, cartY2, cartW, cartH2, 6).fillAndStroke(CREAM, GOLD);
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(8)
       .text('IDENTIFICATION DE L\u2019\u00c9L\u00c8VE', cartX, cartY2 + 10, { width: cartW, align: 'center' });

    const idFields = [
      { label: 'Nom et prénom', name: 'id_nom', fy: cartY2 + 28 },
      { label: 'Groupe / classe', name: 'id_groupe', fy: cartY2 + 56 },
    ];
    idFields.forEach(f => {
      doc.fillColor(MID).font('Helvetica').fontSize(8).text(f.label + ' :', cartX + 10, f.fy + 3);
      doc.formText(f.name, cartX + 115, f.fy, cartW - 125, 18, {
        multiline: false,
        backgroundColor: '#FFFFFF',
        borderColor: GOLD,
        color: DARK,
        fontSize: 9,
      });
    });

    // Légende types de questions
    const legY2 = cartY2 + cartH2 + 12;
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7)
       .text('TYPES DE QUESTIONS', ML, legY2, { width: W, align: 'center' });

    const legItems2 = ['comprehension','inference','reaction','jugement','grammaire'];
    const itemW2 = (W - 8) / 5;
    legItems2.forEach((type, i) => {
      const lx = ML + i * (itemW2 + 2);
      const ly = legY2 + 12;
      doc.roundedRect(lx, ly, itemW2, 20, 3).fill(typeColors[type]);
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(5.5)
         .text(typeLabels[type], lx + 2, ly + 3, { width: itemW2 - 4, align: 'center' });
      doc.fillColor('#ffffff').font('Helvetica').fontSize(4.8)
         .text(typeDescs[type], lx + 2, ly + 11, { width: itemW2 - 4, align: 'center' });
    });

    // Pied de couverture
    doc.fillColor(LIGHT).font('Helvetica').fontSize(6.5)
       .text('Pour chaque bloc, ouvre le menu déroulant, choisis ta question et écris ta réponse dans la zone de texte. Tu peux sauvegarder le PDF rempli.', ML, PH - MB - 16, { width: W, align: 'center' });

    // ── HISTOIRES ──────────────────────────────────────────────────────────────
    let fieldIdx = 0;
    const USABLE_BOTTOM = PH - MB;

    for (const h of HISTOIRES) {
      doc.addPage();

      // ── En-tête histoire : fond vert foncé, texte blanc ──
      doc.rect(0, 0, PW, MT + 64).fill(NAVY);
      doc.rect(0, MT + 64, PW, 3).fill(GOLD);

      doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(8)
         .text(`HISTOIRE ${h.id} / 10`, ML, MT, { width: W });
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(22)
         .text(h.titre, ML, MT + 14, { width: W });
      doc.fillColor(CREAM).font('Helvetica').fontSize(9)
         .text(h.sousTitre, ML, MT + 42, { width: W });

      let y = MT + 75;

      // ── Section Texte — flux naturel, PDFKit gère les sauts de page ──
      doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(8.5)
         .text('TEXTE', ML, y);
      doc.moveTo(ML, y + 12).lineTo(ML + W, y + 12).strokeColor(GOLD).lineWidth(0.8).stroke();

      doc.fillColor(DARK).font('Helvetica').fontSize(10).lineGap(2);
      for (let pi = 0; pi < h.texte.length; pi++) {
        // Chaque paragraphe est positionné à doc.y courant (ou y+20 pour le premier)
        const startY = pi === 0 ? y + 20 : doc.y + 8;
        doc.text(h.texte[pi], ML, startY, { width: W, align: 'justify' });
        // PDFKit gère automatiquement les sauts de page si le texte déborde
      }
      y = doc.y + 14;

      // ── Section Questions ──
      if (y + 60 > USABLE_BOTTOM) { doc.addPage(); y = MT; }

      doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(8.5)
         .text(`QUESTIONS \u2014 ${h.titre}`, ML, y);
      doc.moveTo(ML, y + 12).lineTo(ML + W, y + 12).strokeColor(GOLD).lineWidth(0.8).stroke();
      y += 22;

      for (const bloc of h.questions) {
        const color = typeColors[bloc.type];

        // Hauteur totale d'un bloc : bande(26) + consigne(14) + combo(26) + label(12) + réponse(82) + marge(10) = 170 px
        // → Une seule vérification au début, pas de double saut de page
        const BLOC_H = 170;
        if (y + BLOC_H > USABLE_BOTTOM) { doc.addPage(); y = MT; }

        // ── Bande colorée : type + label ──
        doc.rect(ML, y, W, 22).fill(color);
        doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.5)
           .text(typeLabels[bloc.type], ML + 6, y + 4, { width: 130 });
        doc.fillColor('#ffffff').font('Helvetica').fontSize(7)
           .text(bloc.label, ML + 148, y + 5, { width: W - 155 });
        y += 26;

        // ── Consigne ──
        doc.fillColor(MID).font('Helvetica').fontSize(8)
           .text('Choisis la question qui t\u2019inspire dans le menu déroulant :', ML, y);
        y += 14;

        // ── Menu déroulant interactif ──
        const selectOpts = [
          '\u2014 Sélectionne une question \u2014',
          ...bloc.questions.map((q, qi) => `${String.fromCharCode(65 + qi)}. ${q}`),
        ];
        doc.formCombo(`combo_${fieldIdx}`, ML, y, W, 20, {
          select: selectOpts,
          color: DARK,
          fontSize: 8,
          backgroundColor: CREAM,
          borderColor: GOLD,
        });
        y += 26;

        // ── Zone de réponse ──
        doc.fillColor(MID).font('Helvetica').fontSize(8)
           .text('Ta réponse (écris en phrases complètes) :', ML, y);
        y += 12;

        doc.formText(`rep_${fieldIdx}`, ML, y, W, 80, {
          multiline: true,
          color: DARK,
          fontSize: 9.5,
          backgroundColor: '#FAFFFE',
          borderColor: GOLD,
        });
        y += 92;
        fieldIdx++;
      }
    }

    // ── Numérotation des pages ─────────────────────────────────────────────────
    const totalPages = doc.bufferedPageRange().count;
    for (let i = 0; i < totalPages; i++) {
      doc.switchToPage(i);
      if (i === 0) continue;
      doc.fillColor(LIGHT).font('Helvetica').fontSize(7.5)
         .text(`Page ${i} / ${totalPages - 1}`, ML, PH - MB + 18, { width: W, align: 'center' });
    }

    doc.end();
  });

  // ─── Téléchargement direct du cahier de lecture ───────────────────────────
  app.get('/api/cahier-download', (_req, res) => {
    const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const badges: Record<string,string> = { comprehension:'badge-c', inference:'badge-i', reaction:'badge-r', jugement:'badge-j', grammaire:'badge-g' };
    const blocs:  Record<string,string> = { comprehension:'bloc-c',  inference:'bloc-i',  reaction:'bloc-r',  jugement:'bloc-j',  grammaire:'bloc-g'  };
    const labels: Record<string,string> = { comprehension:'Compréhension', inference:'Inférence', reaction:'Réaction personnelle', jugement:'Jugement critique', grammaire:'Grammaire' };

    const storiesHTML = HISTOIRES.map(h => {
      const [first, ...rest] = h.texte;
      const texteHTML = [
        `<p><span class="dropcap">${first.charAt(0)}</span>${esc(first.slice(1))}</p>`,
        ...rest.map(p => `<p>${esc(p)}</p>`)
      ].join('\n');
      const qHTML = h.questions.map((bloc, bi) => {
        const uid = `h${h.id}b${bi}`;
        const opts = bloc.questions.map((q, qi) => `<option value="${esc(q)}">${String.fromCharCode(65+qi)}. ${esc(q)}</option>`).join('');
        return `<div class="bloc ${blocs[bloc.type]}">
  <span class="badge ${badges[bloc.type]}">${labels[bloc.type]}</span>
  <div class="bloc-label">${esc(bloc.label)}</div>
  <label class="field-label" for="${uid}-sel">Choisis ta question :</label>
  <select id="${uid}-sel" onchange="var d=document.getElementById('${uid}-qshow');d.textContent=this.value;d.style.display=this.value?'block':'none';">
    <option value="">— Sélectionne une question —</option>${opts}
  </select>
  <div id="${uid}-qshow" class="selected-q" style="display:none"></div>
  <label class="field-label" for="${uid}-rep">Ta réponse :</label>
  <textarea id="${uid}-rep" rows="7" placeholder="Écris ta réponse ici en phrases complètes\u2026" oninput="document.getElementById('${uid}-cnt').textContent=this.value.length+'\u00a0car.'"></textarea>
  <div id="${uid}-cnt" class="charcount">0\u00a0car.</div>
</div>`;
      }).join('\n');
      return `<div class="story" id="histoire-${h.id}">
  <div class="story-header">
    <div class="story-num">Histoire ${h.id}\u00a0/\u00a010</div>
    <div class="story-title">${esc(h.titre)}</div>
    <div class="story-sub">${esc(h.sousTitre)}</div>
  </div>
  <div class="story-text">${texteHTML}</div>
  <div class="questions">
    <div class="q-section-title">Questions \u2014 ${esc(h.titre)}</div>
    ${qHTML}
  </div>
</div>`;
    }).join('\n');

    const navLinks = HISTOIRES.map(h => `<a href="#histoire-${h.id}">H${h.id} — ${esc(h.titre)}</a>`).join('\n  ');

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cahier de lecture — Histoires du Québec</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:Georgia,'Times New Roman',serif;font-size:11.5pt;color:#1a1a1a;background:#f5f7f2;line-height:1.7}
.cover{min-height:100vh;display:flex;flex-direction:column;background:linear-gradient(160deg,#1a3d1a 0%,#2d6a2d 40%,#1a3d1a 100%);position:relative;overflow:hidden}
.cover::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%,rgba(255,255,255,.07) 0%,transparent 60%),radial-gradient(ellipse at 75% 65%,rgba(255,220,100,.06) 0%,transparent 55%)}
.cover-top{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px 40px;text-align:center}
.cover-chip{display:inline-block;border:1.5px solid rgba(255,255,255,.4);background:rgba(255,255,255,.1);color:#fff;font-size:9.5pt;letter-spacing:.18em;text-transform:uppercase;padding:5px 18px;border-radius:30px;margin-bottom:22px;font-family:Arial,sans-serif}
.cover-title{font-size:46pt;font-weight:bold;color:#fff;text-shadow:0 4px 24px rgba(0,0,0,.4);line-height:1.1;margin-bottom:10px}
.cover-title .gold{color:#f6c843}
.cover-sub{font-size:13.5pt;color:rgba(255,255,255,.85);font-style:italic;text-shadow:0 1px 10px rgba(0,0,0,.4);margin-bottom:30px}
.cover-deco{display:flex;align-items:center;gap:14px}.cover-deco-line{height:1px;width:70px;background:rgba(255,255,255,.35)}.cover-deco-dot{width:9px;height:9px;border-radius:50%;background:#f6c843;opacity:.8}
.cover-bottom{position:relative;z-index:2;background:rgba(245,247,242,.97);padding:36px 48px 44px}
.cartouche{max-width:700px;margin:0 auto;border:2px solid #6aad6a;border-radius:10px;background:#fff;padding:28px 36px}
.cartouche-title{text-align:center;font-size:9pt;font-weight:bold;letter-spacing:.15em;text-transform:uppercase;color:#2d7a2d;margin-bottom:20px;font-family:Arial,sans-serif}
.field-row{display:flex;align-items:flex-end;gap:14px;margin-bottom:16px}
.field-row label{font-size:10pt;color:#444;min-width:140px;white-space:nowrap;font-family:Arial,sans-serif}
.field-input{flex:1;border:none;border-bottom:1.5px solid #6aad6a;font-size:10.5pt;font-family:inherit;outline:none;background:transparent;padding:2px 4px;color:#1a1a1a}
.field-input:focus{border-bottom-color:#2d7a2d}
.legend{max-width:700px;margin:22px auto 0;display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.leg{border-radius:6px;border-width:1.5px;border-style:solid;padding:9px 10px;font-size:8.5pt}
.leg strong{display:block;font-size:8pt;margin-bottom:3px;font-family:Arial,sans-serif}
.leg-c{background:#eff6ff;border-color:#93c5fd;color:#1e40af}.leg-i{background:#f5f3ff;border-color:#c4b5fd;color:#5b21b6}
.leg-r{background:#ecfdf5;border-color:#6ee7b7;color:#065f46}.leg-j{background:#fef2f2;border-color:#fca5a5;color:#991b1b}
.leg-g{background:#fffbeb;border-color:#fcd34d;color:#78350f}
.consigne{max-width:700px;margin:16px auto 0;border-left:3.5px solid #6aad6a;padding:8px 16px;font-size:9.5pt;color:#555;font-style:italic;line-height:1.75}
.nav-bar{position:sticky;top:0;z-index:100;background:rgba(245,247,242,.97);backdrop-filter:blur(6px);border-bottom:1px solid #d4e8d4;padding:10px 24px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.nav-bar a{font-size:8pt;color:#2d6a2d;text-decoration:none;padding:3px 10px;border:1px solid #6aad6a;border-radius:20px;background:#fff;font-family:Arial,sans-serif;white-space:nowrap}
.nav-bar a:hover{background:#ecfdf5}
.nav-label{font-size:8.5pt;color:#555;font-family:Arial,sans-serif;margin-right:4px;font-weight:bold;white-space:nowrap}
.story{max-width:820px;margin:48px auto;background:#fff;border:1px solid #d4e8d4;border-radius:8px;overflow:hidden;page-break-before:always}
.story-header{background:linear-gradient(135deg,#2d6a2d,#e07b18);padding:22px 28px}
.story-num{display:inline-block;background:rgba(255,255,255,.2);color:#fff;font-size:8.5pt;font-weight:bold;padding:2px 12px;border-radius:20px;margin-bottom:8px;font-family:Arial,sans-serif}
.story-title{font-size:17pt;font-weight:bold;color:#fff;margin-bottom:4px}
.story-sub{font-size:9.5pt;color:rgba(255,255,255,.85);font-style:italic}
.story-text{padding:22px 28px;border-bottom:1px solid #e5f0e5;line-height:2}
.story-text p{margin-bottom:16px;font-size:11pt;text-align:justify}
.dropcap{float:left;font-size:38pt;font-weight:bold;color:#2d6a2d;line-height:.8;margin-right:5px;margin-top:5px}
.questions{padding:18px 28px 32px}
.q-section-title{font-size:11.5pt;font-weight:bold;color:#1a3a1a;border-top:1.5px solid #d4e8d4;padding-top:14px;margin-bottom:16px}
.bloc{border-radius:6px;padding:14px 16px;margin-bottom:14px;border-width:2px;border-style:solid}
.bloc-c{background:#eff6ff;border-color:#93c5fd}.bloc-i{background:#f5f3ff;border-color:#c4b5fd}
.bloc-r{background:#ecfdf5;border-color:#6ee7b7}.bloc-j{background:#fef2f2;border-color:#fca5a5}
.bloc-g{background:#fffbeb;border-color:#fcd34d}
.badge{font-size:7.5pt;font-weight:bold;padding:2px 9px;border-radius:4px;border-width:1px;border-style:solid;display:inline-block;margin-bottom:8px;font-family:Arial,sans-serif}
.badge-c{background:#dbeafe;border-color:#93c5fd;color:#1e40af}.badge-i{background:#ede9fe;border-color:#c4b5fd;color:#5b21b6}
.badge-r{background:#d1fae5;border-color:#6ee7b7;color:#065f46}.badge-j{background:#fee2e2;border-color:#fca5a5;color:#991b1b}
.badge-g{background:#fef3c7;border-color:#fcd34d;color:#78350f}
.bloc-label{font-size:9.5pt;font-weight:600;color:#374151;margin-bottom:10px;font-family:Arial,sans-serif}
.field-label{display:block;font-size:8.5pt;color:#666;font-weight:600;margin-bottom:4px;font-family:Arial,sans-serif}
select{width:100%;font-size:10pt;padding:7px 10px;border:1.5px solid #d1d5db;border-radius:5px;background:#fff;margin-bottom:10px;font-family:Georgia,serif;cursor:pointer}
select:focus{outline:none;border-color:#6aad6a}
.selected-q{font-style:italic;font-size:9.5pt;background:rgba(255,255,255,.75);border:1px solid #e5e7eb;border-radius:5px;padding:7px 10px;margin-bottom:10px;min-height:30px;color:#333}
textarea{width:100%;font-size:10.5pt;padding:8px 10px;border:1.5px solid #d1d5db;border-radius:5px;resize:vertical;font-family:Georgia,serif;min-height:115px;background:#fff;line-height:1.9}
textarea:focus{outline:none;border-color:#6aad6a}
.charcount{text-align:right;font-size:8pt;color:#9ca3af;margin-top:4px;font-family:Arial,sans-serif}
@media print{
  body{background:#fff}
  .nav-bar{display:none}
  .cover{page-break-after:always}
  .story{border:1px solid #bbb;border-radius:0;margin:0;page-break-before:always}
  select,textarea,.field-input{border-color:#999!important;background:#fff!important}
  textarea{min-height:100px!important}
  @page{margin:1.8cm;size:A4}
}
</style>
</head>
<body>
<div class="cover">
  <div class="cover-top">
    <div class="cover-chip">Cahier de lecture</div>
    <div class="cover-title">Histoires du<br><span class="gold">Québec</span></div>
    <div class="cover-sub">Dix récits pour explorer, comprendre et réagir</div>
    <div class="cover-deco"><div class="cover-deco-line"></div><div class="cover-deco-dot"></div><div class="cover-deco-line"></div></div>
  </div>
  <div class="cover-bottom">
    <div class="cartouche">
      <div class="cartouche-title">Informations de l'élève</div>
      <div class="field-row"><label>Nom et prénom :</label><input type="text" class="field-input" placeholder="________________________________"></div>
      <div class="field-row"><label>Groupe / classe :</label><input type="text" class="field-input" placeholder="________________"></div>
      <div class="field-row"><label>Enseignant(e) :</label><input type="text" class="field-input" placeholder="________________________________"></div>
      <div class="field-row"><label>Année scolaire :</label><input type="text" class="field-input" placeholder="__________"></div>
    </div>
    <div class="legend">
      <div class="leg leg-c"><strong>Compréhension</strong>Repérer l'information explicite</div>
      <div class="leg leg-i"><strong>Inférence</strong>Déduire ce qui est implicite</div>
      <div class="leg leg-r"><strong>Réaction</strong>Réagir personnellement</div>
      <div class="leg leg-j"><strong>Jugement critique</strong>Évaluer et défendre une position</div>
      <div class="leg leg-g"><strong>Grammaire</strong>Analyser la langue et les procédés</div>
    </div>
    <div class="consigne">Pour chaque bloc de questions, choisis la question qui t'inspire dans le menu déroulant, puis développe ta réponse en phrases complètes. Appuie-toi toujours sur des éléments précis du texte.</div>
  </div>
</div>
<div class="nav-bar">
  <span class="nav-label">Aller à :</span>
  ${navLinks}
</div>
${storiesHTML}
</body>
</html>`;

    res.setHeader('Content-Disposition', 'attachment; filename="cahier-lecture-histoires-du-quebec.html"');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  });

  return server;
}