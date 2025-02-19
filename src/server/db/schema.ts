import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  primaryKey,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cooking_${name}`);

export const recipes = createTable(
  "recipe",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    ingredients: jsonb("ingredients")
      .$type<{ name: string; quantity: number; unit?: string }[]>()
      .notNull(),
    instructions: text("instructions").notNull(),
    prepTime: integer("prep_time"), // Prep time in minutes
    cookTime: integer("cook_time"), // Cook time in minutes
    servings: integer("servings"),
    imageUrl: varchar("image_url", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    userId: varchar("user_id", { length: 256 }).notNull(), // Clerk user ID
  },
  (recipe) => ({
    titleIndex: index("title_idx").on(recipe.title),
    userIdIndex: index("user_id_idx").on(recipe.userId),
  }),
);

//many-to-many relationship with categories
export const categories = createTable("category", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const recipeCategories = createTable(
  "recipe_category",
  {
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipes.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (rc) => ({
    pk: primaryKey({ columns: [rc.recipeId, rc.categoryId] }),
  }),
);

export type Recipe = typeof recipes.$inferSelect; // Type for SELECT
export type NewRecipe = typeof recipes.$inferInsert; // Type for INSERT
