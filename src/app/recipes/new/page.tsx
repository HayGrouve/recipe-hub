"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import type { RecipeFormValues } from "@/components/recipe-form";
import RecipeForm from "@/components/recipe-form";

export default function NewRecipePage() {
  const { user } = useUser();
  const router = useRouter();

  const handleCreate = async (form: RecipeFormValues) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
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
        userId: user?.id,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to create recipe");
    }
    const data = (await res.json()) as { id: number };
    router.push(`/recipes/${data.id}`);
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Recipe</h1>
      <RecipeForm mode="create" onSubmit={handleCreate} />
    </div>
  );
}
