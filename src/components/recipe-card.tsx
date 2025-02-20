import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/lib/types";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Recipe Image */}
      <div className="relative h-40 w-full">
        <Image
          src={recipe.imageUrl ?? "/recipe.jpg"}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={recipe.id === 1} // Prioritize the first recipe for better performance
        />
      </div>

      {/* Recipe Content */}
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {recipe.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Prep Time:</span> {recipe.prepTime}{" "}
            mins
          </div>
          <div>
            <span className="font-medium">Cook Time:</span> {recipe.cookTime}{" "}
            mins
          </div>
          <div>
            <span className="font-medium">Servings:</span> {recipe.servings}
          </div>
        </div>
      </CardContent>

      {/* Footer with Button */}
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
