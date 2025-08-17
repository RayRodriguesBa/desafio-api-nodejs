ALTER TABLE "enrollments" ALTER COLUMN "createAdt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "createAdt" SET DEFAULT now();