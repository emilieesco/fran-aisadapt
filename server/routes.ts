import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertExerciseSchema, insertQuestionSchema, insertResponseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth Routes
  app.post("/api/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).send("L'utilisateur existe déjà");
      }
      const user = await storage.createUser(data);
      res.json(user);
    } catch (err) {
      res.status(400).send("Erreur lors de l'inscription");
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
      const data = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(data);
      res.json(course);
    } catch (err) {
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

  const httpServer = createServer(app);
  return httpServer;
}
