"use client";
import { useState } from "react";
import { RecipesSidebar } from "@/components/recipes-sidebar";
import { RecipeCard } from "@/components/recipe-card";
import { mockedRecipes } from "@/lib/mockedData";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      categories={Array.from(
        new Set(mockedRecipes.flatMap((recipe) => recipe.categories || [])),
      )}
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

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-row">
        {/* Desktop Sidebar */}
        <div
          className={`hidden transition-all duration-200 ease-in-out md:block ${
            isCollapsed
              ? "pointer-events-none w-0 min-w-0 max-w-0 overflow-hidden opacity-0"
              : "w-[300px]"
          }`}
        >
          {!isCollapsed && (
            <aside className="h-full overflow-hidden border-r bg-background p-4">
              {sidebarContent}
            </aside>
          )}
        </div>
        {/* Show Sidebar Button (Desktop only, when collapsed) */}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="fixed left-2 top-[110px] z-40 hidden items-center gap-1 rounded-full border bg-background shadow-md md:flex"
            onClick={toggleSidebar}
            tabIndex={0}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="text-sm font-normal">Show</span>
          </Button>
        )}
        {/* Main Section */}
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
                    categories={Array.from(
                      new Set(
                        mockedRecipes.flatMap(
                          (recipe) => recipe.categories || [],
                        ),
                      ),
                    )}
                    // No hide button in mobile drawer
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {filteredRecipes.length > 0 ? (
            <div className="grid select-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
