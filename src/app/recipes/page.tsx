"use client";
import { useState } from "react";
import { RecipesSidebar } from "@/components/recipes-sidebar";
import { RecipeCard } from "@/components/recipe-card";
import { mockedRecipes } from "@/lib/mockedData";

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter recipes based on search term, selected categories, and selected authors
  const filteredRecipes = mockedRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      (recipe.categories &&
        Array.isArray(recipe.categories) &&
        recipe.categories.some((category: string) =>
          selectedCategories.includes(category),
        ));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 border-r p-4">
        <RecipesSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={Array.from(
            new Set(mockedRecipes.flatMap((recipe) => recipe.categories || [])),
          )}
        />
      </aside>

      {/* Main Section */}
      <main className="w-3/4 p-4" style={{ minHeight: "calc(100dvh - 165px)" }}>
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No recipes found.</p>
        )}
      </main>
    </div>
  );
}
