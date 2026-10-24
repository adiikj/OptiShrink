CREATE TYPE "public"."file_kind" AS ENUM('image', 'pdf');--> statement-breakpoint
CREATE TABLE "compressed_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" "file_kind" NOT NULL,
	"file_name" text NOT NULL,
	"url" text NOT NULL,
	"original_bytes" integer NOT NULL,
	"compressed_bytes" integer NOT NULL,
	"page_count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"refresh_token_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "compressed_files" ADD CONSTRAINT "compressed_files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "compressed_files_user_created_idx" ON "compressed_files" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "compressed_files_user_kind_idx" ON "compressed_files" USING btree ("user_id","kind");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree (lower("email"));--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_unique" ON "users" USING btree (lower("username"));