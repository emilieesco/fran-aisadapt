import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { MemStorage } from "./storage";
import {
  users,
  studentResponses,
  studentProgress,
  studentBadges,
  assignments,
} from "@shared/schema";
import type {
  User,
  InsertUser,
  StudentResponse,
  InsertStudentResponse,
  StudentProgress,
  StudentBadge,
  Assignment,
} from "@shared/schema";

export class DatabaseStorage extends MemStorage {
  private get db() {
    return getDb();
  }

  // ─── UTILISATEURS ───────────────────────────────────────────────────────────

  async getUser(id: string): Promise<User | undefined> {
    const rows = await this.db.select().from(users).where(eq(users.id, id));
    return rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const rows = await this.db.select().from(users).where(eq(users.username, username));
    return rows[0];
  }

  async createUser(data: InsertUser): Promise<User> {
    const rows = await this.db.insert(users).values(data).returning();
    return rows[0];
  }

  // ─── RÉPONSES ÉLÈVES ────────────────────────────────────────────────────────

  async createResponse(data: InsertStudentResponse): Promise<StudentResponse> {
    const rows = await this.db.insert(studentResponses).values(data).returning();
    return rows[0];
  }

  async getResponsesByStudent(studentId: string): Promise<StudentResponse[]> {
    return this.db.select().from(studentResponses).where(eq(studentResponses.studentId, studentId));
  }

  async getResponsesByQuestion(questionId: string): Promise<StudentResponse[]> {
    return this.db.select().from(studentResponses).where(eq(studentResponses.questionId, questionId));
  }

  async updateResponseComment(id: string, comment: string): Promise<StudentResponse | undefined> {
    const rows = await this.db
      .update(studentResponses)
      .set({ teacherComment: comment })
      .where(eq(studentResponses.id, id))
      .returning();
    return rows[0];
  }

  // ─── PROGRESSION ────────────────────────────────────────────────────────────

  async getAllStudentProgress(studentId: string): Promise<StudentProgress[]> {
    return this.db.select().from(studentProgress).where(eq(studentProgress.studentId, studentId));
  }

  async upsertStudentProgress(
    studentId: string,
    courseId: string,
    progressPercentage: number,
    correctAnswers: number,
    totalQuestions: number,
    completed: boolean
  ): Promise<StudentProgress> {
    const existing = await this.db
      .select()
      .from(studentProgress)
      .where(eq(studentProgress.studentId, studentId));
    const row = existing.find((p) => p.courseId === courseId);

    if (row) {
      const rows = await this.db
        .update(studentProgress)
        .set({ progressPercentage, correctAnswers, totalQuestions, completed })
        .where(eq(studentProgress.id, row.id))
        .returning();
      return rows[0];
    } else {
      const rows = await this.db
        .insert(studentProgress)
        .values({ studentId, courseId, progressPercentage, correctAnswers, totalQuestions, completed })
        .returning();
      return rows[0];
    }
  }

  // ─── BADGES ─────────────────────────────────────────────────────────────────

  async getBadgesByStudent(studentId: string): Promise<StudentBadge[]> {
    return this.db.select().from(studentBadges).where(eq(studentBadges.studentId, studentId));
  }

  async createBadge(badge: Omit<StudentBadge, "id">): Promise<StudentBadge> {
    const rows = await this.db.insert(studentBadges).values(badge).returning();
    return rows[0];
  }

  // ─── ASSIGNATIONS ───────────────────────────────────────────────────────────

  async getAssignmentsByStudent(studentId: string): Promise<Assignment[]> {
    return this.db.select().from(assignments).where(eq(assignments.studentId, studentId));
  }

  async getAssignmentsByTeacher(teacherId: string): Promise<Assignment[]> {
    return this.db.select().from(assignments).where(eq(assignments.teacherId, teacherId));
  }

  async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
    return this.db.select().from(assignments).where(eq(assignments.courseId, courseId));
  }

  async createAssignment(assignment: Omit<Assignment, "id">): Promise<Assignment> {
    const rows = await this.db.insert(assignments).values(assignment).returning();
    return rows[0];
  }

  async deleteAssignment(assignmentId: string): Promise<void> {
    await this.db.delete(assignments).where(eq(assignments.id, assignmentId));
  }

  // ─── RAPPORTS (dépend des méthodes ci-dessus, héritage automatique) ──────────

  async getStudentsByTeacher(teacherId: string): Promise<(User & { progressPercentage: number })[]> {
    const teacherAssignments = await this.getAssignmentsByTeacher(teacherId);
    const studentIds = new Set(teacherAssignments.map((a) => a.studentId));

    const result: (User & { progressPercentage: number })[] = [];
    for (const studentId of studentIds) {
      const user = await this.getUser(studentId);
      if (user && user.role === "student") {
        const progress = await this.getAllStudentProgress(studentId);
        const avg =
          progress.length > 0
            ? Math.round(progress.reduce((s, p) => s + p.progressPercentage, 0) / progress.length)
            : 0;
        result.push({ ...user, progressPercentage: avg });
      }
    }
    return result;
  }

  async getStudentReports(teacherId: string): Promise<any[]> {
    const teacherAssignments = await this.getAssignmentsByTeacher(teacherId);
    const studentIds = new Set(teacherAssignments.map((a) => a.studentId));

    const reports: any[] = [];
    for (const studentId of studentIds) {
      const user = await this.getUser(studentId);
      if (!user || user.role !== "student") continue;

      const responses = await this.getResponsesByStudent(studentId);
      const progress = await this.getAllStudentProgress(studentId);

      const totalCorrect = responses.filter((r) => r.isCorrect).length;
      const totalAttempts = responses.length;
      const averageAccuracy =
        totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
      const coursesCompleted = progress.filter((p) => p.completed).length;

      const progressByCategory: Record<string, number> = {};
      for (const p of progress) {
        const course = await this.getCourse(p.courseId);
        if (course) progressByCategory[course.category] = p.progressPercentage;
      }

      reports.push({
        id: studentId,
        firstName: user.firstName,
        lastName: user.lastName,
        totalCorrect,
        totalAttempts,
        averageAccuracy,
        coursesCompleted,
        totalCourses: progress.length,
        progressByCategory,
      });
    }
    return reports;
  }

  // ─── INITIALISATION: seed les comptes de test si la DB est vide ────────────

  async seedInitialUsers(): Promise<void> {
    const existing = await this.db.select().from(users).where(eq(users.username, "enseignant"));
    if (existing.length > 0) return; // Déjà seedé

    await this.db.insert(users).values([
      {
        username: "enseignant",
        password: "password123",
        firstName: "Marie",
        lastName: "Dubois",
        role: "teacher",
      },
      {
        username: "eleve",
        password: "password123",
        firstName: "Jean",
        lastName: "Martin",
        role: "student",
      },
    ]);
    console.log("[DB] Comptes de test créés (enseignant / eleve)");
  }
}
