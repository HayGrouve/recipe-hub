import { mockedRecipes } from "@/lib/mockedData";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = mockedRecipes.find((r) => r.id === Number(params.id));

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
      <h1 className="mb-4 text-3xl font-bold">{recipe.title}</h1>
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
      <p className="mb-4 text-lg text-muted-foreground">{recipe.description}</p>
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
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>
              {ing.name}
              {ing.quantity ? `: ${ing.quantity}` : ""}
              {ing.unit ? ` ${ing.unit}` : ""}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Instructions</h2>
        <pre className="whitespace-pre-wrap rounded bg-muted p-4 font-sans text-base">
          {recipe.instructions}
        </pre>
      </div>
    </div>
  );
}
