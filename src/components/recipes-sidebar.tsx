"use client";

import type { Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { categories, authors } from "@/lib/mockedData";
import { Button } from "@/components/ui/button";

interface RecipesSidebarProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  selectedAuthors: string[];
  setSelectedAuthors: Dispatch<SetStateAction<string[]>>;
}

export function RecipesSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  selectedAuthors,
  setSelectedAuthors,
}: RecipesSidebarProps) {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedAuthors([]);
  };

  return (
    <div className="space-y-6 p-4">
      <SidebarGroup>
        <SidebarGroupLabel className="mb-2 text-lg font-semibold">
          Search Recipes
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white pl-8"
            />
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="mb-2 text-lg font-semibold">
          Categories
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  className="border-gray-300"
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
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
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="mb-2 text-lg font-semibold">
          Authors
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="space-y-2">
            {authors.map((author) => (
              <div key={author} className="flex items-center space-x-2">
                <Checkbox
                  id={author}
                  className="border-gray-300"
                  checked={selectedAuthors.includes(author)}
                  onCheckedChange={() => handleAuthorChange(author)}
                />
                <Label
                  htmlFor={author}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {author}
                </Label>
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
}
