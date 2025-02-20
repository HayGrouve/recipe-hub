import type { Recipe } from "@/lib/types";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-sm">
      <Image
        src={recipe.imageUrl ?? "/placeholder.jpg"}
        alt={recipe.title}
        width={640}
        height={320}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <p className="text-sm text-gray-500">{recipe.description}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>Prep Time: {recipe.prepTime ?? "N/A"} mins</p>
          <p>Cook Time: {recipe.cookTime ?? "N/A"} mins</p>
          <p>Servings: {recipe.servings ?? "N/A"}</p>
        </div>
        <button className="mt-4 text-blue-500 hover:underline">
          View Recipe
        </button>
      </div>
    </div>
  );
}
