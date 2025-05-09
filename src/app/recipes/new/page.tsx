"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// TiptapEditor component for reuse
function TiptapEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] rounded border bg-background px-3 py-2 focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          className={`tiptap-toolbar-btn rounded border px-2 py-1 text-sm ${editor?.isActive("bold") ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={`tiptap-toolbar-btn rounded border px-2 py-1 text-sm ${editor?.isActive("bulletList") ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          className={`tiptap-toolbar-btn rounded border px-2 py-1 text-sm ${editor?.isActive("orderedList") ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
        >
          1. List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

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
  { value: "fish", label: "Fish", group: "Main Ingredient" }, // Sub of Seafood
  { value: "shrimp", label: "Shrimp", group: "Main Ingredient" }, // Sub of Seafood
  {
    value: "pasta-noodles",
    label: "Pasta & Noodles",
    group: "Main Ingredient",
  },
  { value: "rice", label: "Rice", group: "Main Ingredient" },
  { value: "eggs", label: "Eggs", group: "Main Ingredient" },
  { value: "vegetarian", label: "Vegetarian", group: "Main Ingredient" },
  { value: "vegan", label: "Vegan", group: "Main Ingredient" },
  {
    value: "tofu-tempeh",
    label: "Tofu & Tempeh",
    group: "Main Ingredient",
  },
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
  {
    value: "mediterranean",
    label: "Mediterranean",
    group: "Cuisine / Region",
  },
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
  {
    value: "gluten-free",
    label: "Gluten-Free",
    group: "Dietary Preference",
  },
  {
    value: "dairy-free",
    label: "Dairy-Free",
    group: "Dietary Preference",
  },
  { value: "keto", label: "Keto", group: "Dietary Preference" },
  { value: "paleo", label: "Paleo", group: "Dietary Preference" },
  { value: "low-carb", label: "Low-Carb", group: "Dietary Preference" },
  { value: "low-fat", label: "Low-Fat", group: "Dietary Preference" },
  {
    value: "high-protein",
    label: "High-Protein",
    group: "Dietary Preference",
  },
  { value: "nut-free", label: "Nut-Free", group: "Dietary Preference" },
  {
    value: "sugar-free",
    label: "Sugar-Free",
    group: "Dietary Preference",
  },
  { value: "whole30", label: "Whole30", group: "Dietary Preference" },
  { value: "healthy", label: "Healthy", group: "Dietary Preference" },

  // By Cooking Method
  { value: "baking", label: "Baking", group: "Cooking Method" },
  { value: "grilling-bbq", label: "Grilling & BBQ", group: "Cooking Method" },
  { value: "roasting", label: "Roasting", group: "Cooking Method" },
  { value: "sautéing", label: "Sautéing", group: "Cooking Method" },
  { value: "stir-frying", label: "Stir-Frying", group: "Cooking Method" },
  {
    value: "slow-cooker",
    label: "Slow Cooker / Crockpot",
    group: "Cooking Method",
  },
  {
    value: "instant-pot",
    label: "Instant Pot / Pressure Cooker",
    group: "Cooking Method",
  },
  { value: "air-fryer", label: "Air Fryer", group: "Cooking Method" },
  { value: "no-bake", label: "No-Bake", group: "Cooking Method" },
  {
    value: "one-pot-meals",
    label: "One-Pot / One-Pan Meals",
    group: "Cooking Method",
  },
  { value: "microwave", label: "Microwave", group: "Cooking Method" },

  // By Occasion / Season / Theme
  {
    value: "quick-easy",
    label: "Quick & Easy",
    group: "Occasion / Theme",
  },
  {
    value: "30-minute-meals",
    label: "30-Minute Meals",
    group: "Occasion / Theme",
  },
  {
    value: "budget-friendly",
    label: "Budget-Friendly",
    group: "Occasion / Theme",
  },
  {
    value: "kid-friendly",
    label: "Kid-Friendly",
    group: "Occasion / Theme",
  },
  { value: "comfort-food", label: "Comfort Food", group: "Occasion / Theme" },
  { value: "holiday", label: "Holiday", group: "Occasion / Theme" },
  {
    value: "christmas-recipes",
    label: "Christmas",
    group: "Occasion / Theme",
  },
  {
    value: "thanksgiving-recipes",
    label: "Thanksgiving",
    group: "Occasion / Theme",
  },
  { value: "easter-recipes", label: "Easter", group: "Occasion / Theme" },
  { value: "summer-recipes", label: "Summer", group: "Occasion / Theme" },
  { value: "winter-recipes", label: "Winter", group: "Occasion / Theme" },
  { value: "fall-recipes", label: "Fall", group: "Occasion / Theme" },
  { value: "spring-recipes", label: "Spring", group: "Occasion / Theme" },
  { value: "party-food", label: "Party Food", group: "Occasion / Theme" },
  {
    value: "romantic-dinners",
    label: "Romantic Dinners",
    group: "Occasion / Theme",
  },
  { value: "meal-prep", label: "Meal Prep", group: "Occasion / Theme" },
];

export default function NewRecipePage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    categories: [] as string[],
    prepTime: "",
    cookTime: "",
    servings: "",
    imageUrl: "",
  });

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = "Title is required.";
    if (!form.description.trim())
      errors.description = "Description is required.";
    if (!form.ingredients.trim())
      errors.ingredients = "Ingredients are required.";
    if (!form.instructions.trim())
      errors.instructions = "Instructions are required.";
    if (form.prepTime && isNaN(Number(form.prepTime)))
      errors.prepTime = "Prep time must be a number.";
    if (form.cookTime && isNaN(Number(form.cookTime)))
      errors.cookTime = "Cook time must be a number.";
    if (form.servings && isNaN(Number(form.servings)))
      errors.servings = "Servings must be a number.";
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: value });
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleQuillChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ingredients: form.ingredients.split("\n").map((line) => {
            const [name, quantity, unit] = line.split(":").map((s) => s.trim());
            return {
              name,
              quantity: quantity ? Number(quantity) : undefined,
              unit,
            };
          }),
          categories: form.categories,
          prepTime: form.prepTime ? Number(form.prepTime) : null,
          cookTime: form.cookTime ? Number(form.cookTime) : null,
          servings: form.servings ? Number(form.servings) : null,
          userId: user?.id,
        }),
      });
      if (!res.ok) {
        let message = "Failed to create recipe";
        let apiErrors = {};
        try {
          const data: unknown = await res.json();
          if (
            typeof data === "object" &&
            data !== null &&
            ("error" in data || "fieldErrors" in data)
          ) {
            const maybeData = data as {
              error?: unknown;
              fieldErrors?: unknown;
            };
            if (typeof maybeData.error === "string") message = maybeData.error;
            if (
              typeof maybeData.fieldErrors === "object" &&
              maybeData.fieldErrors !== null
            ) {
              apiErrors = maybeData.fieldErrors as Record<string, string>;
            }
          }
        } catch {}
        setError(message);
        setFieldErrors(apiErrors);
        throw new Error(message);
      }
      const data = (await res.json()) as { id: number };
      router.push(`/recipes/${data.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Spaghetti Carbonara"
            className="w-full rounded border bg-background px-3 py-2"
          />
          {fieldErrors.title && (
            <div className="text-sm text-red-500">{fieldErrors.title}</div>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">Description</label>
          <TiptapEditor
            value={form.description}
            onChange={(value) => handleQuillChange("description", value)}
            placeholder="Describe your recipe..."
          />
          {fieldErrors.description && (
            <div className="text-sm text-red-500">
              {fieldErrors.description}
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">
            Ingredients (one per line, format: name:quantity:unit)
          </label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
            placeholder={
              "e.g.\nSpaghetti:400:grams\nEggs:3\nParmesan Cheese:50:grams"
            }
            className="w-full rounded border bg-background px-3 py-2"
            rows={4}
          />
          {fieldErrors.ingredients && (
            <div className="text-sm text-red-500">
              {fieldErrors.ingredients}
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">Instructions</label>
          <TiptapEditor
            value={form.instructions}
            onChange={(value) => handleQuillChange("instructions", value)}
            placeholder="Step-by-step instructions..."
          />
          {fieldErrors.instructions && (
            <div className="text-sm text-red-500">
              {fieldErrors.instructions}
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">Categories</label>
          <div className="flex flex-col gap-2">
            <Command className="rounded-lg border p-0 text-sm shadow-md">
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <div className="max-h-60 overflow-y-auto">
                {Array.from(
                  new Set(recipeCategories.map((cat) => cat.group)),
                ).map((group) => (
                  <CommandGroup key={group} heading={group} className="p-0">
                    {recipeCategories
                      .filter((cat) => cat.group === group)
                      .map((cat) => (
                        <CommandItem
                          key={cat.value}
                          className="px-2 py-1 text-sm"
                          onSelect={() => {
                            setForm((prev) => ({
                              ...prev,
                              categories: prev.categories.includes(cat.value)
                                ? prev.categories.filter((c) => c !== cat.value)
                                : [...prev.categories, cat.value],
                            }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              form.categories.includes(cat.value)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {cat.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              </div>
            </Command>
            <div className="flex flex-wrap gap-2">
              {form.categories.map((catValue) => {
                const cat = recipeCategories.find((c) => c.value === catValue);
                if (!cat) return null;
                return (
                  <Badge
                    key={cat.value}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {cat.label}
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          categories: prev.categories.filter(
                            (c) => c !== cat.value,
                          ),
                        }));
                      }}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {cat.label}</span>
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
          {fieldErrors.categories && (
            <div className="text-sm text-red-500">{fieldErrors.categories}</div>
          )}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label className="mb-1 block font-medium">Prep Time (mins)</label>
            <input
              name="prepTime"
              type="number"
              value={form.prepTime}
              onChange={handleChange}
              placeholder="e.g. 10"
              className="w-full rounded border bg-background px-3 py-2"
            />
            {fieldErrors.prepTime && (
              <div className="text-sm text-red-500">{fieldErrors.prepTime}</div>
            )}
          </div>
          <div className="flex-1">
            <label className="mb-1 block font-medium">Cook Time (mins)</label>
            <input
              name="cookTime"
              type="number"
              value={form.cookTime}
              onChange={handleChange}
              placeholder="e.g. 20"
              className="w-full rounded border bg-background px-3 py-2"
            />
            {fieldErrors.cookTime && (
              <div className="text-sm text-red-500">{fieldErrors.cookTime}</div>
            )}
          </div>
          <div className="flex-1">
            <label className="mb-1 block font-medium">Servings</label>
            <input
              name="servings"
              type="number"
              value={form.servings}
              onChange={handleChange}
              placeholder="e.g. 4"
              className="w-full rounded border bg-background px-3 py-2"
            />
            {fieldErrors.servings && (
              <div className="text-sm text-red-500">{fieldErrors.servings}</div>
            )}
          </div>
        </div>
        <div>
          <label className="mb-1 block font-medium">Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="e.g. https://..."
            className="w-full rounded border bg-background px-3 py-2"
          />
          {fieldErrors.imageUrl && (
            <div className="text-sm text-red-500">{fieldErrors.imageUrl}</div>
          )}
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Recipe"}
        </Button>
      </form>
    </div>
  );
}
