import { serial, text, varchar, pgTable } from 'drizzle-orm/pg-core';  // Correct imports for PostgreSQL

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockid: varchar('mockid').notNull(),
});

export const UserAnswer=pgTable('userAnswer', {
  id: serial('id').primaryKey(),
  mockIdref: varchar('mockIdref').notNull(),
  question: varchar('question').notNull(),
  correctAnswer: varchar('correctAnswer').notNull(),
  userAnswer: text('userAnswer').notNull(),
  feedback: text('feedback').notNull(),
  rating: varchar('rating').notNull(),
  userEmail: varchar('userEmail').notNull(),
  questionId: varchar('questionId').notNull(),
  createdAt: varchar('createdAt'),
});