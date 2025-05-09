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

// Fixed category list
const CATEGORY_OPTIONS = [
  "Italian",
  "Indian",
  "Vegetarian",
  "American",
  "Dessert",
  "Pizza",
  "Breakfast",
  "Vegan",
  "Gluten-Free",
  "Quick & Easy",
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
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {CATEGORY_OPTIONS.map((category) => (
                  <CommandItem
                    key={category}
                    onSelect={() => {
                      setForm((prev) => ({
                        ...prev,
                        categories: prev.categories.includes(category)
                          ? prev.categories.filter((c) => c !== category)
                          : [...prev.categories, category],
                      }));
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        form.categories.includes(category)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
            <div className="flex flex-wrap gap-2">
              {form.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        categories: prev.categories.filter(
                          (c) => c !== category,
                        ),
                      }));
                    }}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {category}</span>
                  </button>
                </Badge>
              ))}
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
