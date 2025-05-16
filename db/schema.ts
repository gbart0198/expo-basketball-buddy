import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
});

export const shotSummaries = sqliteTable("shot_summaries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id")
    .notNull()
    .references(() => sessions.id),
  x: real("x").notNull(),
  y: real("y").notNull(),
  attempts: integer("attempts").notNull(),
  makes: integer("makes").notNull(),
  lastShotAt: text("last_shot_at").notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type ShotSummary = typeof shotSummaries.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type NewShotSummary = typeof shotSummaries.$inferInsert;
