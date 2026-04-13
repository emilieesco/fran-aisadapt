import { eq, inArray, or, and, isNull } from "drizzle-orm";
import { getDb } from "./db";
import { MemStorage } from "./storage";
import {
  users,
  studentResponses,
  studentProgress,
  studentBadges,
  assignments,
  inviteCodes,
  questions,
  studentDocuments,
  messages,
  notifications,
  studentGroups,
  groupMembers,
} from "@shared/schema";
import type {
  User,
  InsertUser,
  StudentResponse,
  InsertStudentResponse,
  StudentProgress,
  StudentBadge,
  Assignment,
  InviteCode,
  Question,
  InsertQuestion,
  StudentDocument,
  InsertStudentDocument,
  Message,
  InsertMessage,
  Notification,
  InsertNotification,
  StudentGroup,
  InsertStudentGroup,
  GroupMember,
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

  async getAllUsers(): Promise<User[]> {
    return this.db.select().from(users);
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.delete(users).where(eq(users.id, id));
  }

  // ─── QUESTIONS ──────────────────────────────────────────────────────────────

  async createQuestion(data: InsertQuestion): Promise<Question> {
    const rows = await this.db.insert(questions).values(data).returning();
    const question = rows[0];
    this.questions.set(question.id, question);
    return question;
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

  async updateResponseGrade(id: string, isCorrect: boolean, comment?: string): Promise<StudentResponse | undefined> {
    const updateData: Record<string, unknown> = { isCorrect };
    if (comment !== undefined) updateData.teacherComment = comment;
    const rows = await this.db.update(studentResponses)
      .set(updateData)
      .where(eq(studentResponses.id, id))
      .returning();
    return rows[0];
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

  async getProgress(studentId: string, courseId: string): Promise<StudentProgress | undefined> {
    const rows = await this.db.select().from(studentProgress)
      .where(eq(studentProgress.studentId, studentId));
    return rows.find((p) => p.courseId === courseId);
  }

  async updateProgress(
    studentId: string,
    courseId: string,
    progressPercentage: number,
    correctAnswers = 0,
    totalQuestions = 0,
    completed = false
  ): Promise<StudentProgress> {
    return this.upsertStudentProgress(studentId, courseId, progressPercentage, correctAnswers, totalQuestions, completed);
  }

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

  // ─── RAPPORTS ───────────────────────────────────────────────────────────────

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

  // ─── CODES D'INVITATION ──────────────────────────────────────────────────────

  async getAllInviteCodes(): Promise<InviteCode[]> {
    return this.db.select().from(inviteCodes);
  }

  async getInviteCode(code: string): Promise<InviteCode | undefined> {
    const rows = await this.db.select().from(inviteCodes).where(eq(inviteCodes.code, code));
    return rows[0];
  }

  async createInviteCode(data: { code: string; label?: string | null }): Promise<InviteCode> {
    const rows = await this.db
      .insert(inviteCodes)
      .values({ code: data.code, label: data.label ?? null })
      .returning();
    return rows[0];
  }

  async useInviteCode(code: string, userId: string): Promise<void> {
    await this.db
      .update(inviteCodes)
      .set({ usedBy: userId, usedAt: new Date() })
      .where(eq(inviteCodes.code, code));
  }

  async deleteInviteCode(id: string): Promise<void> {
    await this.db.delete(inviteCodes).where(eq(inviteCodes.id, id));
  }

  // ─── DOCUMENTS ÉLÈVES ────────────────────────────────────────────────────────

  async getDocument(id: string): Promise<StudentDocument | undefined> {
    const rows = await this.db.select().from(studentDocuments).where(eq(studentDocuments.id, id));
    return rows[0];
  }

  async getDocumentsByStudent(studentId: string): Promise<StudentDocument[]> {
    return this.db.select().from(studentDocuments).where(eq(studentDocuments.studentId, studentId));
  }

  async getDocumentsByTeacher(teacherId: string): Promise<StudentDocument[]> {
    // Get students assigned to this teacher, then their documents
    const students = await this.getStudentsByTeacher(teacherId);
    if (students.length === 0) return [];
    const studentIds = students.map(s => s.id);
    return this.db.select().from(studentDocuments).where(inArray(studentDocuments.studentId, studentIds));
  }

  async createDocument(doc: InsertStudentDocument): Promise<StudentDocument> {
    const rows = await this.db.insert(studentDocuments).values(doc).returning();
    return rows[0];
  }

  async updateDocumentComment(id: string, comment: string, reviewed: boolean): Promise<StudentDocument | undefined> {
    const rows = await this.db
      .update(studentDocuments)
      .set({ teacherComment: comment, teacherReviewed: reviewed, reviewedAt: reviewed ? new Date() : null })
      .where(eq(studentDocuments.id, id))
      .returning();
    return rows[0];
  }

  async deleteDocument(id: string): Promise<void> {
    await this.db.delete(studentDocuments).where(eq(studentDocuments.id, id));
  }

  // ─── MESSAGES ────────────────────────────────────────────────────────────────

  async getMessages(userId1: string, userId2: string): Promise<Message[]> {
    return this.db.select().from(messages).where(
      or(
        and(eq(messages.senderId, userId1), eq(messages.receiverId, userId2)),
        and(eq(messages.senderId, userId2), eq(messages.receiverId, userId1))
      )
    );
  }

  async sendMessage(msg: InsertMessage): Promise<Message> {
    const rows = await this.db.insert(messages).values(msg).returning();
    return rows[0];
  }

  async markMessagesRead(receiverId: string, senderId: string): Promise<void> {
    await this.db.update(messages)
      .set({ readAt: new Date() })
      .where(and(eq(messages.receiverId, receiverId), eq(messages.senderId, senderId), isNull(messages.readAt)));
  }

  async getUnreadCount(userId: string): Promise<number> {
    const rows = await this.db.select().from(messages).where(and(eq(messages.receiverId, userId), isNull(messages.readAt)));
    return rows.length;
  }

  // ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

  async getNotifications(userId: string): Promise<Notification[]> {
    return this.db.select().from(notifications).where(eq(notifications.userId, userId));
  }

  async createNotification(notif: InsertNotification): Promise<Notification> {
    const rows = await this.db.insert(notifications).values(notif).returning();
    return rows[0];
  }

  async markNotificationRead(id: string): Promise<void> {
    await this.db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
  }

  async markAllNotificationsRead(userId: string): Promise<void> {
    await this.db.update(notifications).set({ isRead: true }).where(eq(notifications.userId, userId));
  }

  async getUnreadNotificationCount(userId: string): Promise<number> {
    const rows = await this.db.select().from(notifications).where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
    return rows.length;
  }

  // Groupes d'eleves

  async getGroupsByTeacher(teacherId: string): Promise<StudentGroup[]> {
    return this.db.select().from(studentGroups).where(eq(studentGroups.teacherId, teacherId));
  }

  async createGroup(group: InsertStudentGroup): Promise<StudentGroup> {
    const rows = await this.db.insert(studentGroups).values(group).returning();
    return rows[0];
  }

  async updateGroup(id: string, name: string, description: string, color: string): Promise<StudentGroup | undefined> {
    const rows = await this.db.update(studentGroups).set({ name, description, color }).where(eq(studentGroups.id, id)).returning();
    return rows[0];
  }

  async deleteGroup(id: string): Promise<void> {
    await this.db.delete(studentGroups).where(eq(studentGroups.id, id));
  }

  async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    return this.db.select().from(groupMembers).where(eq(groupMembers.groupId, groupId));
  }

  async addGroupMember(groupId: string, studentId: string): Promise<GroupMember> {
    const rows = await this.db.insert(groupMembers).values({ groupId, studentId }).returning();
    return rows[0];
  }

  async removeGroupMember(groupId: string, studentId: string): Promise<void> {
    await this.db.delete(groupMembers).where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.studentId, studentId)));
  }

  async getStudentGroups(studentId: string): Promise<StudentGroup[]> {
    const members = await this.db.select().from(groupMembers).where(eq(groupMembers.studentId, studentId));
    if (members.length === 0) return [];
    const groupIds = members.map(m => m.groupId);
    return this.db.select().from(studentGroups).where(inArray(studentGroups.id, groupIds));
  }

  // ─── INITIALISATION ──────────────────────────────────────────────────────────

  async seedInitialUsers(): Promise<void> {
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin2025!";

    const toSeed = [
      { username: "admin", password: adminPassword, firstName: "Administrateur", lastName: "", role: "admin" },
      { username: "enseignant", password: "password123", firstName: "Marie", lastName: "Dubois", role: "teacher" },
      { username: "eleve", password: "password123", firstName: "Jean", lastName: "Martin", role: "student" },
    ];

    for (const userData of toSeed) {
      const existing = await this.db.select().from(users).where(eq(users.username, userData.username));
      if (existing.length === 0) {
        await this.db.insert(users).values(userData);
        console.log(`[DB] Compte créé: ${userData.username}`);
      }
    }
  }
}
