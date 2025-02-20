interface RecipesSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAuthors: string[];
  setSelectedAuthors: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[]; // Now a simple array of category names
  authors: string[]; // Now a simple array of author names
}

export function RecipesSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  selectedAuthors,
  setSelectedAuthors,
  categories,
  authors,
}: RecipesSidebarProps) {
  const handleCategoryChange = (
    category: string,
    checked: boolean | undefined,
  ) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category),
    );
  };

  const handleAuthorChange = (author: string, checked: boolean | undefined) => {
    setSelectedAuthors((prev) =>
      checked ? [...prev, author] : prev.filter((a) => a !== author),
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedAuthors([]);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">Search Recipes</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border py-2 pl-8 pr-4"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">Categories</h3>
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
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Authors */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">Authors</h3>
        <div className="space-y-2">
          {authors.map((author) => (
            <div key={author} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={author}
                checked={selectedAuthors.includes(author)}
                onChange={(e) => handleAuthorChange(author, e.target.checked)}
              />
              <label htmlFor={author}>{author}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full rounded-md border py-2 text-gray-700 hover:bg-gray-100"
      >
        Clear All Filters
      </button>
    </div>
  );
}
