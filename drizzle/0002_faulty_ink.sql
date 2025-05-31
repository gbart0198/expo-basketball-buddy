CREATE TABLE `goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`goalType` text NOT NULL,
	`aggregationType` text NOT NULL,
	`targetValue` integer NOT NULL,
	`timePeriodStart` text NOT NULL,
	`timePeriodEnd` text NOT NULL,
	`isCompleted` integer DEFAULT 0 NOT NULL,
	`createdAt` text DEFAULT '2025-05-31T23:50:45.496Z' NOT NULL,
	`updatedAt` text DEFAULT '2025-05-31T23:50:45.497Z' NOT NULL,
	`isSynced` integer DEFAULT 0 NOT NULL,
	`isDeleted` integer DEFAULT 0 NOT NULL
);
