"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
} from "@/components/ui/sidebar";
import { RecipesSidebar } from "@/components/recipes-sidebar";
import { RecipeGrid } from "@/components/recipe-grid";
import { recipes as allRecipes } from "@/lib/mockedData";

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);

  useEffect(() => {
    const filtered = allRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(recipe.category);
      const matchesAuthor =
        selectedAuthors.length === 0 || selectedAuthors.includes(recipe.author);

      return matchesSearch && matchesCategory && matchesAuthor;
    });
    setFilteredRecipes(filtered);
  }, [searchTerm, selectedCategories, selectedAuthors]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="w-64 border-r border-gray-200">
        <SidebarHeader className="flex h-[60px] flex-shrink-0 items-center justify-center border-b">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        </SidebarHeader>
        <SidebarContent>
          <RecipesSidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedAuthors={selectedAuthors}
            setSelectedAuthors={setSelectedAuthors}
          />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex-grow overflow-auto">
        <main className="mx-auto w-full p-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">Recipes</h1>
          <RecipeGrid recipes={filteredRecipes} />
        </main>
      </SidebarInset>
    </div>
  );
}
