"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * Both icons are rendered and one is hidden with CSS, rather than picking one
 * in JavaScript. next-themes sets the `dark` class on <html> before paint, so
 * the right icon is visible on first frame — no mount flag, no hydration
 * mismatch, and nothing to re-render.
 */
export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  );
}
