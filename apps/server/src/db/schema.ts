import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const users = sqliteTable("users", {
  // id refers to the user evm address
  id: text("id").primaryKey(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const profiles = sqliteTable("profiles", {
  // id refers to the lens id
  id: text("id").primaryKey(),
  whitelisted: integer("whitelisted", { mode: "boolean" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  posts: many(posts),
}));

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export const posts = sqliteTable("posts", {
  // id refers to the lens id
  id: text("id").primaryKey().$defaultFn(nanoid),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  coverImage: text("cover_image"),

  profileId: text("profile_id").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(profiles, {
    fields: [posts.profileId],
    references: [profiles.id],
  }),
}));

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;
