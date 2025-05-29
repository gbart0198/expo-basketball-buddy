ALTER TABLE `sessions` ADD `isSynced` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD `isDeleted` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `shotSummaries` ADD `isSynced` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `shotSummaries` ADD `isDeleted` integer DEFAULT 0 NOT NULL;