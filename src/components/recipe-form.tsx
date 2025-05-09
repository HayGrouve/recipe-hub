"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { recipeCategories } from "@/lib/recipeCategories";
import TiptapEditor from "@/components/tiptap-editor";

export interface RecipeFormValues {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  categories: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  imageUrl: string;
}

interface RecipeFormProps {
  initialValues?: Partial<RecipeFormValues>;
  onSubmit: (values: RecipeFormValues) => Promise<void>;
  loading?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  mode: "create" | "edit";
}

export default function RecipeForm({
  initialValues = {},
  onSubmit,
  loading = false,
  error = "",
  fieldErrors = {},
  mode,
}: RecipeFormProps) {
  const [form, setForm] = useState<RecipeFormValues>({
    title: initialValues.title ?? "",
    description: initialValues.description ?? "",
    ingredients: initialValues.ingredients ?? "",
    instructions: initialValues.instructions ?? "",
    categories: initialValues.categories ?? [],
    prepTime: initialValues.prepTime ?? "",
    cookTime: initialValues.cookTime ?? "",
    servings: initialValues.servings ?? "",
    imageUrl: initialValues.imageUrl ?? "",
  });
  const [localError, setLocalError] = useState("");
  const [localFieldErrors, setLocalFieldErrors] = useState<
    Record<string, string>
  >({});

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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setLocalFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleQuillChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setLocalFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setLocalFieldErrors({});
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setLocalFieldErrors(errors);
      return;
    }
    await onSubmit(form);
  };

  return (
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
        {(fieldErrors.title ?? localFieldErrors.title) ? (
          <div className="text-sm text-red-500">
            {fieldErrors.title ?? localFieldErrors.title}
          </div>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block font-medium">Description</label>
        <TiptapEditor
          value={form.description}
          onChange={(value) => handleQuillChange("description", value)}
          placeholder="Describe your recipe..."
        />
        {(fieldErrors.description ?? localFieldErrors.description) ? (
          <div className="text-sm text-red-500">
            {fieldErrors.description ?? localFieldErrors.description}
          </div>
        ) : null}
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
        {(fieldErrors.ingredients ?? localFieldErrors.ingredients) ? (
          <div className="text-sm text-red-500">
            {fieldErrors.ingredients ?? localFieldErrors.ingredients}
          </div>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block font-medium">Instructions</label>
        <TiptapEditor
          value={form.instructions}
          onChange={(value) => handleQuillChange("instructions", value)}
          placeholder="Step-by-step instructions..."
        />
        {(fieldErrors.instructions ?? localFieldErrors.instructions) ? (
          <div className="text-sm text-red-500">
            {fieldErrors.instructions ?? localFieldErrors.instructions}
          </div>
        ) : null}
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
        {(fieldErrors.categories ?? localFieldErrors.categories) ? (
          <div className="text-sm text-red-500">
            {fieldErrors.categories ?? localFieldErrors.categories}
          </div>
        ) : null}
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
          {(fieldErrors.prepTime ?? localFieldErrors.prepTime) ? (
            <div className="text-sm text-red-500">
              {fieldErrors.prepTime ?? localFieldErrors.prepTime}
            </div>
          ) : null}
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
          {(fieldErrors.cookTime ?? localFieldErrors.cookTime) ? (
            <div className="text-sm text-red-500">
              {fieldErrors.cookTime ?? localFieldErrors.cookTime}
            </div>
          ) : null}
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
          {(fieldErrors.servings ?? localFieldErrors.servings) ? (
            <div className="text-sm text-red-500">
              {fieldErrors.servings ?? localFieldErrors.servings}
            </div>
          ) : null}
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
        {(fieldErrors.imageUrl ?? localFieldErrors.imageUrl) ? (
          <div className="text-sm text-red-500">
            {fieldErrors.imageUrl ?? localFieldErrors.imageUrl}
          </div>
        ) : null}
      </div>
      {(error ?? localError) && (
        <div className="text-red-500">{error ?? localError}</div>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? mode === "edit"
            ? "Saving..."
            : "Creating..."
          : mode === "edit"
            ? "Save Changes"
            : "Create Recipe"}
      </Button>
    </form>
  );
}
