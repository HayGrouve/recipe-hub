import type React from "react";
import { Search, Filter, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface RecipesSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
  toggleSidebarButton?: React.ReactNode;
}

export function RecipesSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  categories,
  toggleSidebarButton,
}: RecipesSidebarProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category),
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <h3 className="flex items-center space-x-2 text-lg font-semibold">
          <Search className="h-5 w-5" />
          <span>Search Recipes</span>
          {toggleSidebarButton && (
            <span className="ml-2">{toggleSidebarButton}</span>
          )}
        </h3>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h3 className="flex items-center space-x-2 text-lg font-semibold">
          <Filter className="h-5 w-5" />
          <span>Categories</span>
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button onClick={clearFilters} variant="outline" className="w-full">
        <XCircle className="mr-2 h-4 w-4" />
        Clear All Filters
      </Button>
    </div>
  );
}
