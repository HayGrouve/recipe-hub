"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import type { RecipeFormValues } from "@/components/recipe-form";
import RecipeForm from "@/components/recipe-form";

interface RecipeIngredient {
  name: string;
  quantity?: number;
  unit?: string;
}

interface Recipe {
  id: string;
  userId: string;
  title: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string;
  categories: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  imageUrl?: string;
}

// Helper to fetch recipe by id
async function fetchRecipe(id: string): Promise<Recipe | null> {
  const res = await fetch(`/api/recipes/${id}`);
  if (!res.ok) return null;
  const data = (await res.json()) as Recipe;
  return data;
}

export default function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<RecipeFormValues | null>(
    null,
  );

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError(null);
      const recipe = await fetchRecipe(id);
      if (!recipe) {
        setError("Recipe not found");
      } else if (user?.id !== recipe.userId) {
        setError("You are not authorized to edit this recipe.");
      } else {
        setInitialValues({
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients
            .map(
              (ing) =>
                `${ing.name}${ing.quantity ? ": " + ing.quantity : ""}${ing.unit ? ": " + ing.unit : ""}`,
            )
            .join("\n"),
          instructions: recipe.instructions,
          categories: recipe.categories,
          prepTime: recipe.prepTime?.toString() ?? "",
          cookTime: recipe.cookTime?.toString() ?? "",
          servings: recipe.servings?.toString() ?? "",
          imageUrl: recipe.imageUrl ?? "",
        });
      }
      setLoading(false);
    })();
  }, [id, user?.id]);

  const handleEdit = async (form: RecipeFormValues) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        ingredients: form.ingredients.split("\n").map((line) => {
          const [name, quantity, unit] = line.split(":").map((s) => s.trim());
          return {
            name,
            quantity: quantity ? Number(quantity) : undefined,
            unit,
          };
        }),
        categories: form.categories,
        prepTime: form.prepTime ? Number(form.prepTime) : null,
        cookTime: form.cookTime ? Number(form.cookTime) : null,
        servings: form.servings ? Number(form.servings) : null,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update recipe");
    }
    router.push(`/recipes/${id}`);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!initialValues) return null;

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Edit Recipe</h1>
      <RecipeForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleEdit}
      />
    </div>
  );
}
