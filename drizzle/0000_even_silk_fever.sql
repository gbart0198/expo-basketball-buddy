CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shotSummaries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`x` real NOT NULL,
	`y` real NOT NULL,
	`attempts` integer NOT NULL,
	`makes` integer NOT NULL,
	`lastShotAt` text,
	`sessionId` integer NOT NULL,
	FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
