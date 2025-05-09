"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Pencil, Trash } from "lucide-react";
import type { Recipe } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default function RecipeDetailPage({ params }: Props) {
  const { id } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch recipe");
        }
        const data = (await response.json()) as Recipe;
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch recipe");
      } finally {
        setLoading(false);
      }
    };

    void fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Link
        href="/recipes"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Recipes
      </Link>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        {user?.id === recipe.userId && (
          <div className="ml-4 flex gap-2">
            <button
              className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-primary"
              title="Edit Recipe"
              onClick={() => router.push(`/recipes/${id}/edit`)}
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-red-600"
              title="Delete Recipe"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this recipe?")) {
                  const res = await fetch(`/api/recipes/${id}`, {
                    method: "DELETE",
                  });
                  if (res.ok) {
                    router.push("/recipes");
                  } else {
                    alert("Failed to delete recipe.");
                  }
                }
              }}
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={recipe.imageUrl ?? "/recipe.jpg"}
          alt={recipe.title || "Recipe Image"}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="mb-4 max-w-prose break-words text-lg text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: recipe.description ?? "" }}
      />
      <div className="mb-4 flex flex-wrap gap-6 text-sm">
        <div>
          <span className="font-medium">Prep Time:</span>{" "}
          {recipe.prepTime ?? "N/A"} mins
        </div>
        <div>
          <span className="font-medium">Cook Time:</span>{" "}
          {recipe.cookTime ?? "N/A"} mins
        </div>
        <div>
          <span className="font-medium">Servings:</span>{" "}
          {recipe.servings ?? "N/A"}
        </div>
        <div>
          <span className="font-medium">Categories:</span>{" "}
          {recipe.categories?.join(", ") || "N/A"}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Ingredients</h2>
        <ul className="list-inside list-disc space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}
              {ingredient.quantity ? `: ${ingredient.quantity}` : ""}
              {ingredient.unit ? ` ${ingredient.unit}` : ""}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Instructions</h2>
        <div
          className="prose prose-sm max-w-prose whitespace-pre-line break-words break-all"
          dangerouslySetInnerHTML={{ __html: recipe.instructions ?? "" }}
        />
      </div>
    </div>
  );
}
