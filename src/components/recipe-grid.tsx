import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No recipes found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {recipes.map((recipe) => (
        <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="group">
          <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              width={400}
              height={300}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-600">By {recipe.author}</p>
              <p className="text-sm text-gray-500">{recipe.category}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
