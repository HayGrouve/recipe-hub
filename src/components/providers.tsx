"use client";

import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/lib/theme-provider";
import { dark } from "@clerk/themes";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <ThemeProvider>
      <ClerkProvider
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
}
