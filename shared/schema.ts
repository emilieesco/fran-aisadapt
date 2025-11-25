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
  isCorrect: boolean("is_correct").notNull(),
  createdAt: timestamp("created_at").notNull(),
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
  createdAt: true,
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
