import { NextResponse } from "next/server";
import { db, recipes } from "../../../server/db";
import { z } from "zod";

// Zod schema for recipe validation
const ingredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(0).optional(),
  unit: z.string().optional(),
});

const recipeSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().max(10000).optional().nullable(),
  ingredients: z.array(ingredientSchema).min(1),
  instructions: z.string().min(1),
  categories: z.array(z.string().min(1)).optional(),
  prepTime: z.number().int().min(0).nullable().optional(),
  cookTime: z.number().int().min(0).nullable().optional(),
  servings: z.number().int().min(1).nullable().optional(),
  imageUrl: z.string().url().max(256).nullable().optional(),
  userId: z.string().min(1),
});

export async function GET() {
  try {
    const allRecipes = await db.select().from(recipes);
    return NextResponse.json(allRecipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const parsed = recipeSchema.safeParse(body);
    if (!parsed.success) {
      // Map Zod's error.flatten() to a flat fieldErrors object
      const flat = parsed.error.flatten();
      const fieldErrors: Record<string, string> = {};
      Object.entries(
        flat.fieldErrors as Record<string, string[] | undefined>,
      ).forEach(([key, arr]) => {
        if (arr && arr.length > 0) fieldErrors[key] = arr[0] ?? "";
      });
      return NextResponse.json(
        { error: "Invalid data", fieldErrors },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // Ensure all ingredients have a required quantity (default to 0 if missing)
    const safeIngredients = data.ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity ?? 0,
      unit: ing.unit,
    }));

    // Insert recipe
    const inserted = await db
      .insert(recipes)
      .values({
        title: data.title,
        description: data.description ?? null,
        ingredients: safeIngredients,
        instructions: data.instructions,
        categories: data.categories ?? [],
        prepTime: data.prepTime ?? null,
        cookTime: data.cookTime ?? null,
        servings: data.servings ?? null,
        imageUrl: data.imageUrl ?? null,
        userId: data.userId,
      })
      .returning();
    const newRecipe = (inserted as { id: number }[])[0];
    if (!newRecipe) {
      return NextResponse.json(
        { error: "Failed to create recipe" },
        { status: 500 },
      );
    }

    // Insert categories if provided (assumes a join table and categories table exist)
    if (data.categories && data.categories.length > 0) {
      // You may need to implement category upsert and join logic here
      // This is a placeholder for category handling
    }

    return NextResponse.json({ id: newRecipe.id });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 },
    );
  }
}
