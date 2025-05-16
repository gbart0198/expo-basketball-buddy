import { relations } from "drizzle-orm";
import { sessions, shotSummaries } from "./schema";

export const sessionRelations = relations(sessions, ({ many }) => ({
    shots: many(shotSummaries),
}));

export const shotSummariesRelations = relations(shotSummaries, ({ one }) => ({
    session: one(sessions, {
        fields: [shotSummaries.sessionId],
        references: [sessions.id],
    }),
}));
