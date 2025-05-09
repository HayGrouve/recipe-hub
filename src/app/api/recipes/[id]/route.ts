import { NextResponse } from "next/server";
import { db, recipes } from "../../../../server/db";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const recipe = await db
      .select()
      .from(recipes)
      .where(eq(recipes.id, Number(id)))
      .limit(1);

    if (!recipe || recipe.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe[0]);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const deleted = await db.delete(recipes).where(eq(recipes.id, Number(id)));
    if (!deleted || deleted.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 },
    );
  }
}
