export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  ingredients: { name: string; quantity: number; unit?: string }[];
  instructions: string;
  categories: string[];
  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
