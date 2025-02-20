export const mockedRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with creamy sauce and pancetta.",
    ingredients: [
      { name: "Spaghetti", quantity: 400, unit: "grams" },
      { name: "Pancetta", quantity: 150, unit: "grams" },
      { name: "Eggs", quantity: 3 },
      { name: "Parmesan Cheese", quantity: 50, unit: "grams" },
      { name: "Black Pepper", quantity: 1, unit: "teaspoon" },
      { name: "Salt", quantity: 1, unit: "teaspoon" },
    ],
    instructions:
      "1. Cook spaghetti in salted boiling water until al dente.\n2. In a bowl, whisk eggs and mix with grated Parmesan cheese.\n3. Cook pancetta in a pan until crispy.\n4. Combine spaghetti, pancetta, and egg mixture. Stir quickly to create a creamy sauce.\n5. Season with black pepper and serve immediately.",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BhZ2hldHRpJTIwQ2FyYm9uYXJhfGVufDB8fDB8fHww",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
    categories: ["Italian"],
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    description:
      "A flavorful Indian curry with marinated chicken in a creamy tomato sauce.",
    ingredients: [
      { name: "Chicken Breast", quantity: 500, unit: "grams" },
      { name: "Yogurt", quantity: 200, unit: "grams" },
      { name: "Garlic", quantity: 3, unit: "cloves" },
      { name: "Ginger", quantity: 1, unit: "tablespoon" },
      { name: "Tomato Puree", quantity: 400, unit: "grams" },
      { name: "Heavy Cream", quantity: 100, unit: "ml" },
      {
        name: "Spices (Cumin, Coriander, Turmeric, Paprika)",
        quantity: 1,
        unit: "tablespoon",
      },
    ],
    instructions:
      "1. Marinate chicken with yogurt, garlic, ginger, and spices for 1 hour.\n2. Cook marinated chicken in a pan until browned.\n3. Prepare the sauce by cooking tomato puree with spices and cream.\n4. Combine chicken with the sauce and simmer for 15 minutes.\n5. Serve with rice or naan bread.",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hpY2tlbiUyMFRpa2thJTIwTWFzYWxhfGVufDB8fDB8fHww",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user2",
    categories: ["Indian"],
  },
  {
    id: 3,
    title: "Vegetarian Tacos",
    description:
      "Delicious tacos filled with spiced vegetables and fresh toppings.",
    ingredients: [
      { name: "Tortillas", quantity: 8 },
      { name: "Bell Peppers", quantity: 2 },
      { name: "Onion", quantity: 1 },
      { name: "Black Beans", quantity: 400, unit: "grams" },
      { name: "Cumin", quantity: 1, unit: "teaspoon" },
      { name: "Chili Powder", quantity: 1, unit: "teaspoon" },
      { name: "Avocado", quantity: 1 },
      { name: "Sour Cream", quantity: 100, unit: "grams" },
    ],
    instructions:
      "1. Sauté bell peppers and onions in a pan with cumin and chili powder.\n2. Add black beans and cook until heated through.\n3. Warm tortillas in a pan or microwave.\n4. Fill tortillas with vegetable mixture and top with avocado and sour cream.\n5. Serve immediately.",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664648234166-c34e62e0941f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VmVnZXRhcmlhbiUyMFRhY29zfGVufDB8fDB8fHww",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user3",
    categories: ["Vegetarian"],
  },
  {
    id: 4,
    title: "Classic Cheeseburger",
    description: "A juicy beef burger with melted cheese and classic toppings.",
    ingredients: [
      { name: "Ground Beef", quantity: 500, unit: "grams" },
      { name: "Burger Buns", quantity: 4 },
      { name: "Cheddar Cheese", quantity: 4, unit: "slices" },
      { name: "Lettuce", quantity: 4, unit: "leaves" },
      { name: "Tomato", quantity: 1 },
      { name: "Onion", quantity: 1 },
      { name: "Ketchup", quantity: 4, unit: "tablespoons" },
      { name: "Mustard", quantity: 4, unit: "teaspoons" },
    ],
    instructions:
      "1. Form ground beef into 4 patties and season with salt and pepper.\n2. Cook patties in a pan or grill until desired doneness.\n3. Add cheese slices on top of patties and let melt.\n4. Toast burger buns and assemble with lettuce, tomato, onion, and condiments.\n5. Serve immediately.",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1582762147076-6d985d99975a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2xhc3NpYyUyMENoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
    categories: ["American"],
  },
  {
    id: 5,
    title: "Margherita Pizza",
    description:
      "A simple and delicious pizza with fresh mozzarella, tomatoes, and basil.",
    ingredients: [
      { name: "Pizza Dough", quantity: 1 },
      { name: "Tomato Sauce", quantity: 200, unit: "grams" },
      { name: "Fresh Mozzarella", quantity: 200, unit: "grams" },
      { name: "Fresh Basil", quantity: 10, unit: "leaves" },
      { name: "Olive Oil", quantity: 1, unit: "tablespoon" },
    ],
    instructions:
      "1. Preheat oven to 250°C (480°F).\n2. Roll out pizza dough and spread tomato sauce evenly.\n3. Add slices of fresh mozzarella and drizzle with olive oil.\n4. Bake in the oven for 10-12 minutes until crust is golden and cheese is bubbly.\n5. Top with fresh basil leaves and serve immediately.",
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFyZ2hlcml0YSUyMFBpenphfGVufDB8fDB8fHww",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user2",
    categories: ["Italian"],
  },
  {
    id: 6,
    title: "Chocolate Brownies",
    description: "Rich and fudgy chocolate brownies with a crackly top.",
    ingredients: [
      { name: "Dark Chocolate", quantity: 200, unit: "grams" },
      { name: "Butter", quantity: 150, unit: "grams" },
      { name: "Sugar", quantity: 200, unit: "grams" },
      { name: "Eggs", quantity: 3 },
      { name: "Flour", quantity: 100, unit: "grams" },
      { name: "Cocoa Powder", quantity: 2, unit: "tablespoons" },
    ],
    instructions:
      "1. Preheat oven to 180°C (350°F).\n2. Melt dark chocolate and butter together.\n3. Whisk in sugar and eggs until smooth.\n4. Fold in flour and cocoa powder.\n5. Pour batter into a greased baking pan and bake for 25-30 minutes.\n6. Let cool before slicing and serving.",
    prepTime: 15,
    cookTime: 30,
    servings: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1611625877932-6155840177a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hvY29sYXRlJTIwQnJvd25pZXN8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user3",
    categories: ["Dessert"],
  },
];

export const mockedCategories = [
  { id: 1, name: "Italian" },
  { id: 2, name: "Indian" },
  { id: 3, name: "Vegetarian" },
  { id: 4, name: "American" },
  { id: 5, name: "Dessert" },
];
