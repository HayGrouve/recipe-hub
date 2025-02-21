"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center space-x-2"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-4 w-4" />
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}
