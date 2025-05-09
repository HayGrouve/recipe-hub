export interface RecipeCategory {
  value: string;
  label: string;
  group: string;
}

export const recipeCategories: RecipeCategory[] = [
  // By Meal Type
  { value: "breakfast", label: "Breakfast", group: "Meal Type" },
  { value: "brunch", label: "Brunch", group: "Meal Type" },
  { value: "lunch", label: "Lunch", group: "Meal Type" },
  { value: "dinner", label: "Dinner", group: "Meal Type" },
  {
    value: "appetizers-starters",
    label: "Appetizers & Starters",
    group: "Meal Type",
  },
  { value: "snacks", label: "Snacks", group: "Meal Type" },
  { value: "desserts", label: "Desserts", group: "Meal Type" },
  {
    value: "drinks-beverages",
    label: "Drinks & Beverages",
    group: "Meal Type",
  },
  { value: "soups", label: "Soups", group: "Meal Type" },
  { value: "salads", label: "Salads", group: "Meal Type" },
  { value: "side-dishes", label: "Side Dishes", group: "Meal Type" },

  // By Main Ingredient
  { value: "chicken", label: "Chicken", group: "Main Ingredient" },
  { value: "beef", label: "Beef", group: "Main Ingredient" },
  { value: "pork", label: "Pork", group: "Main Ingredient" },
  { value: "lamb", label: "Lamb", group: "Main Ingredient" },
  { value: "seafood", label: "Seafood", group: "Main Ingredient" },
  { value: "fish", label: "Fish", group: "Main Ingredient" },
  { value: "shrimp", label: "Shrimp", group: "Main Ingredient" },
  {
    value: "pasta-noodles",
    label: "Pasta & Noodles",
    group: "Main Ingredient",
  },
  { value: "rice", label: "Rice", group: "Main Ingredient" },
  { value: "eggs", label: "Eggs", group: "Main Ingredient" },
  { value: "vegetarian", label: "Vegetarian", group: "Main Ingredient" },
  { value: "vegan", label: "Vegan", group: "Main Ingredient" },
  { value: "tofu-tempeh", label: "Tofu & Tempeh", group: "Main Ingredient" },
  {
    value: "beans-legumes",
    label: "Beans & Legumes",
    group: "Main Ingredient",
  },

  // By Cuisine / Region
  { value: "american", label: "American", group: "Cuisine / Region" },
  { value: "italian", label: "Italian", group: "Cuisine / Region" },
  { value: "mexican", label: "Mexican", group: "Cuisine / Region" },
  { value: "chinese", label: "Chinese", group: "Cuisine / Region" },
  { value: "indian", label: "Indian", group: "Cuisine / Region" },
  { value: "japanese", label: "Japanese", group: "Cuisine / Region" },
  { value: "thai", label: "Thai", group: "Cuisine / Region" },
  { value: "vietnamese", label: "Vietnamese", group: "Cuisine / Region" },
  { value: "korean", label: "Korean", group: "Cuisine / Region" },
  { value: "french", label: "French", group: "Cuisine / Region" },
  { value: "mediterranean", label: "Mediterranean", group: "Cuisine / Region" },
  {
    value: "middle-eastern",
    label: "Middle Eastern",
    group: "Cuisine / Region",
  },
  { value: "greek", label: "Greek", group: "Cuisine / Region" },
  { value: "spanish", label: "Spanish", group: "Cuisine / Region" },
  { value: "caribbean", label: "Caribbean", group: "Cuisine / Region" },
  { value: "african", label: "African", group: "Cuisine / Region" },

  // By Dietary Preference / Restriction
  { value: "gluten-free", label: "Gluten-Free", group: "Dietary Preference" },
  { value: "dairy-free", label: "Dairy-Free", group: "Dietary Preference" },
  { value: "keto", label: "Keto", group: "Dietary Preference" },
  { value: "paleo", label: "Paleo", group: "Dietary Preference" },
  { value: "low-carb", label: "Low-Carb", group: "Dietary Preference" },
  { value: "low-fat", label: "Low-Fat", group: "Dietary Preference" },
  { value: "high-protein", label: "High-Protein", group: "Dietary Preference" },
  { value: "nut-free", label: "Nut-Free", group: "Dietary Preference" },
  { value: "sugar-free", label: "Sugar-Free", group: "Dietary Preference" },
  { value: "whole30", label: "Whole30", group: "Dietary Preference" },
  { value: "healthy", label: "Healthy", group: "Dietary Preference" },

  // By Cooking Method
  { value: "baking", label: "Baking", group: "Cooking Method" },
  { value: "grilling-bbq", label: "Grilling & BBQ", group: "Cooking Method" },
  { value: "roasting", label: "Roasting", group: "Cooking Method" },
  { value: "sautéing", label: "Sautéing", group: "Cooking Method" },
  { value: "stir-frying", label: "Stir-Frying", group: "Cooking Method" },
  { value: "slow-cooker", label: "Slow Cooker", group: "Cooking Method" },
  {
    value: "pressure-cooking",
    label: "Pressure Cooking",
    group: "Cooking Method",
  },
  { value: "steaming", label: "Steaming", group: "Cooking Method" },
  { value: "boiling", label: "Boiling", group: "Cooking Method" },
  { value: "frying", label: "Frying", group: "Cooking Method" },
  { value: "braising", label: "Braising", group: "Cooking Method" },
  { value: "poaching", label: "Poaching", group: "Cooking Method" },
  { value: "smoking", label: "Smoking", group: "Cooking Method" },
  { value: "raw", label: "Raw", group: "Cooking Method" },
  { value: "no-cook", label: "No-Cook", group: "Cooking Method" },
];
