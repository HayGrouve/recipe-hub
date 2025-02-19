import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>;
}
