import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const fileKind = pgEnum("file_kind", ["image", "pdf"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    refreshTokenHash: text("refresh_token_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("users_email_unique").on(sql`lower(${table.email})`),
    uniqueIndex("users_username_unique").on(sql`lower(${table.username})`),
  ],
);

export const compressedFiles = pgTable(
  "compressed_files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: fileKind("kind").notNull(),
    fileName: text("file_name").notNull(),
    url: text("url").notNull(),
    originalBytes: integer("original_bytes").notNull(),
    compressedBytes: integer("compressed_bytes").notNull(),
    pageCount: integer("page_count"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("compressed_files_user_created_idx").on(table.userId, table.createdAt),
    index("compressed_files_user_kind_idx").on(table.userId, table.kind),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  files: many(compressedFiles),
}));

export const compressedFilesRelations = relations(compressedFiles, ({ one }) => ({
  user: one(users, {
    fields: [compressedFiles.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type CompressedFile = typeof compressedFiles.$inferSelect;
export type FileKind = (typeof fileKind.enumValues)[number];
export type AuthUser = Pick<User, "id" | "name" | "username" | "email" | "createdAt">;
