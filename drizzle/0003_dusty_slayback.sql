PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`goalName` text NOT NULL,
	`goalType` text NOT NULL,
	`aggregationType` text NOT NULL,
	`targetValue` integer NOT NULL,
	`timePeriodStart` text NOT NULL,
	`timePeriodEnd` text NOT NULL,
	`isCompleted` integer DEFAULT 0 NOT NULL,
	`createdAt` text DEFAULT '2025-06-01T15:39:22.037Z' NOT NULL,
	`updatedAt` text DEFAULT '2025-06-01T15:39:22.037Z' NOT NULL,
	`isSynced` integer DEFAULT 0 NOT NULL,
	`isDeleted` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_goals`("id", "goalName", "goalType", "aggregationType", "targetValue", "timePeriodStart", "timePeriodEnd", "isCompleted", "createdAt", "updatedAt", "isSynced", "isDeleted") SELECT "id", "goalName", "goalType", "aggregationType", "targetValue", "timePeriodStart", "timePeriodEnd", "isCompleted", "createdAt", "updatedAt", "isSynced", "isDeleted" FROM `goals`;--> statement-breakpoint
DROP TABLE `goals`;--> statement-breakpoint
ALTER TABLE `__new_goals` RENAME TO `goals`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
