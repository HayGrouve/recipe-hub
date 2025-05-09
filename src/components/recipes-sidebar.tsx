import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { recipeCategories } from "@/lib/recipeCategories";

interface RecipesSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  toggleSidebarButton?: React.ReactNode;
}

export function RecipesSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  toggleSidebarButton,
}: RecipesSidebarProps) {
  // Group categories by their group
  const groupedCategories = recipeCategories.reduce(
    (acc, category) => {
      acc[category.group] ??= [];
      acc[category.group]!.push(category);
      return acc;
    },
    {} as Record<string, typeof recipeCategories>,
  );

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {toggleSidebarButton}
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {Object.entries(groupedCategories).map(([group, categories]) => (
              <div key={group} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {group}
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <label
                      key={category.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category.value,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (c) => c !== category.value,
                              ),
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
