import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull(), // "teacher" or "student"
  createdAt: timestamp("created_at").defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "classes_de_mots", "textes_narratifs", "ecriture"
  content: text("content").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Exercises table
export const exercises = pgTable("exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "multiple_choice", "text", "matching"
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Questions table
export const questions = pgTable("questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  exerciseId: varchar("exercise_id").notNull(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  type: text("type").notNull(), // "multiple_choice", "text", "matching"
  options: text("options"), // JSON string for multiple choice
  correctAnswer: text("correct_answer").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Student responses table
export const studentResponses = pgTable("student_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  questionId: varchar("question_id").notNull(),
  answer: text("answer").notNull(),
  isCorrect: boolean("is_correct"), // null = pending teacher review (for text questions)
  teacherComment: text("teacher_comment"),   // annotation de l'enseignant
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Student progress table
export const studentProgress = pgTable("student_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  courseId: varchar("course_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  progressPercentage: integer("progress_percentage").notNull().default(0),
  correctAnswers: integer("correct_answers").notNull().default(0),
  totalQuestions: integer("total_questions").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student badges table
export const studentBadges = pgTable("student_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  badgeType: text("badge_type").notNull(), // "first_exercise", "5_correct", "10_correct", etc.
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Teacher assignments
export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teacherId: varchar("teacher_id").notNull(),
  studentId: varchar("student_id").notNull(),
  courseId: varchar("course_id").notNull(),
  dueDate: text("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Student documents table
export const studentDocuments = pgTable("student_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  title: text("title").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  fileData: text("file_data").notNull(), // base64 encoded
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  teacherComment: text("teacher_comment"),
  teacherReviewed: boolean("teacher_reviewed").notNull().default(false),
  reviewedAt: timestamp("reviewed_at"),
});

export type StudentDocument = typeof studentDocuments.$inferSelect;
export const insertStudentDocumentSchema = createInsertSchema(studentDocuments).pick({
  studentId: true,
  title: true,
  fileName: true,
  fileType: true,
  fileSize: true,
  fileData: true,
});
export type InsertStudentDocument = z.infer<typeof insertStudentDocumentSchema>;

// Messages privés table
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull(),
  receiverId: varchar("receiver_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  readAt: timestamp("read_at"),
});

export type Message = typeof messages.$inferSelect;
export const insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  receiverId: true,
  content: true,
});
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Notifications table
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(), // "document_reviewed" | "assignment_due" | "new_message"
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  relatedId: varchar("related_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Notification = typeof notifications.$inferSelect;
export const insertNotificationSchema = createInsertSchema(notifications).pick({
  userId: true,
  type: true,
  title: true,
  message: true,
  relatedId: true,
});
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

// Invite codes table (codes générés par l'admin pour les enseignants)
export const inviteCodes = pgTable("invite_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  label: text("label"), // ex: "Pour Marie Tremblay"
  usedBy: varchar("used_by"), // userId de l'enseignant qui l'a utilisé
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InviteCode = typeof inviteCodes.$inferSelect;
export const insertInviteCodeSchema = createInsertSchema(inviteCodes).pick({
  code: true,
  label: true,
});
export type InsertInviteCode = z.infer<typeof insertInviteCodeSchema>;

// Schemas for insert operations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  role: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  category: true,
  content: true,
  order: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).pick({
  courseId: true,
  title: true,
  description: true,
  type: true,
  order: true,
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  exerciseId: true,
  title: true,
  text: true,
  type: true,
  options: true,
  correctAnswer: true,
  order: true,
});

export const insertResponseSchema = createInsertSchema(studentResponses).pick({
  studentId: true,
  questionId: true,
  answer: true,
  isCorrect: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type StudentResponse = typeof studentResponses.$inferSelect;
export type InsertStudentResponse = z.infer<typeof insertResponseSchema>;

export type StudentProgress = typeof studentProgress.$inferSelect;
export type StudentBadge = typeof studentBadges.$inferSelect;
export type Assignment = typeof assignments.$inferSelect;
