import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-background py-6 dark:bg-background">
      <div className="container mx-auto flex flex-col items-center space-y-2 text-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            RecipeHub
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your go-to hub for delicious recipes.
        </p>
      </div>
    </footer>
  );
}
