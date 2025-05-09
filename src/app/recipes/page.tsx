"use client";
import { useState, useEffect } from "react";
import { RecipesSidebar } from "@/components/recipes-sidebar";
import { RecipeCard } from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { Recipe } from "@/lib/types";

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = (await response.json()) as Recipe[];
        setRecipes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch recipes",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
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

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Sidebar content for reuse
  const sidebarContent = (
    <RecipesSidebar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      toggleSidebarButton={
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 flex items-center gap-1"
          onClick={toggleSidebar}
          tabIndex={0}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm font-normal">Hide</span>
        </Button>
      }
    />
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading recipes...</p>
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

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Main Content Wrapper */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div
          className={`hidden border-r bg-background md:block ${
            isCollapsed ? "w-0" : "w-64"
          } transition-all duration-300`}
        >
          {!isCollapsed && sidebarContent}
        </div>

        {/* Main Content */}
        <main
          className="flex-1 p-4"
          style={{ minHeight: "calc(100dvh - 165px)" }}
        >
          {/* Mobile Filter Button */}
          <div className="mb-4 md:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="flex w-full items-center justify-center gap-2"
                >
                  <Menu className="h-5 w-5" />
                  <span className="font-medium">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 max-w-full p-0">
                <SheetTitle className="sr-only">Filters</SheetTitle>
                <SheetDescription className="sr-only">
                  Use the filters in this panel to refine your recipe search.
                </SheetDescription>
                <div className="h-full overflow-y-auto p-4">
                  <RecipesSidebar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No recipes found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
