"use client";

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
import { motion } from "framer-motion";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "var(--card-hover-shadow)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="mx-auto h-full w-full max-w-sm overflow-hidden rounded-xl"
    >
      <Card className="h-full w-full overflow-hidden">
        {/* Recipe Image */}
        <Link href={`/recipes/${recipe.id}`} className="group block">
          <div className="relative h-48 w-full">
            <Image
              src={recipe.imageUrl ?? "/recipe.jpg"}
              alt={recipe.title || "Recipe Image"}
              fill
              className="object-cover transition duration-200 group-hover:brightness-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={recipe.id === 1}
            />
          </div>
        </Link>

        {/* Recipe Content */}
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-muted-foreground">
            <div
              dangerouslySetInnerHTML={{ __html: recipe.description ?? "" }}
            />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Prep Time:</span>
              {recipe.prepTime ?? "N/A"} mins
            </div>
            <div>
              <span className="font-medium">Cook Time:</span>
              {recipe.cookTime ?? "N/A"} mins
            </div>
            <div>
              <span className="font-medium">Servings:</span>
              {recipe.servings ?? "N/A"}
            </div>
          </div>
        </CardContent>

        {/* Footer with Button */}
        <CardFooter>
          <Link href={`/recipes/${recipe.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full"
              aria-label={`View details for ${recipe.title}`}
            >
              View Recipe
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
