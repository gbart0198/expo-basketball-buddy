import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  date: text("date").notNull(),
  isSynced: integer("isSynced").notNull().default(0),
  isDeleted: integer("isDeleted").notNull().default(0),
});

export const shotSummaries = sqliteTable("shotSummaries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  x: real("x").notNull(),
  y: real("y").notNull(),
  attempts: integer("attempts").notNull(),
  makes: integer("makes").notNull(),
  lastShotAt: text("lastShotAt"),
  sessionId: integer("sessionId")
    .notNull()
    .references(() => sessions.id),
  isSynced: integer("isSynced").notNull().default(0),
  isDeleted: integer("isDeleted").notNull().default(0),
});

export const goals = sqliteTable("goals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  goalName: text("goalName").notNull(),
  goalType: text("goalType").notNull(),
  aggregationType: text("aggregationType").notNull(),
  targetValue: integer("targetValue").notNull(),
  timePeriodStart: text("timePeriodStart").notNull(),
  timePeriodEnd: text("timePeriodEnd").notNull(),
  isCompleted: integer("isCompleted").notNull().default(0),
  createdAt: text("createdAt").notNull().default(new Date().toISOString()),
  updatedAt: text("updatedAt").notNull().default(new Date().toISOString()),
  isSynced: integer("isSynced").notNull().default(0),
  isDeleted: integer("isDeleted").notNull().default(0),
});

export type Session = typeof sessions.$inferInsert;
export type CreateSession = typeof sessions.$inferInsert;
export type ShotSummary = typeof shotSummaries.$inferSelect;
export type CreateShotSummary = typeof shotSummaries.$inferInsert;
export type Goal = typeof goals.$inferSelect;
export type CreateGoal = typeof goals.$inferInsert;
