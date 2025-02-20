import { Search, Filter, XCircle } from "lucide-react"; // Import icons

interface RecipesSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
}

export function RecipesSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  categories,
}: RecipesSidebarProps) {
  const handleCategoryChange = (
    category: string,
    checked: boolean | undefined,
  ) => {
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
      <div>
        <h3 className="mb-2 flex items-center space-x-2 text-lg font-semibold">
          <Search className="h-5 w-5 text-gray-600" />
          <span>Search Recipes</span>
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border py-2 pl-8 pr-4"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-2 flex items-center space-x-2 text-lg font-semibold">
          <Filter className="h-5 w-5 text-gray-600" />
          <span>Categories</span>
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={(e) =>
                  handleCategoryChange(category, e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={category}
                className="text-sm font-medium text-gray-700"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="flex w-full items-center justify-center space-x-2 rounded-md border py-2 text-gray-700 hover:bg-gray-100"
      >
        <XCircle className="h-5 w-5 text-gray-600" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
}
