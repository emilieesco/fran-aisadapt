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
      const allCourses = await storage.getAllCourses();
      const progress = await storage.getAllStudentProgress(req.params.id);

      const courses = allCourses.map((course) => {
        const studentProgress = progress.find((p) => p.courseId === course.id);
        return {
          ...course,
          progressPercentage: studentProgress?.progressPercentage || 0,
        };
      });

      res.json(courses);
    } catch (err) {
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

  return server;
}
