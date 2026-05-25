"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themeConfig } from "@/config/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute={themeConfig.attribute as "class"}
      defaultTheme={themeConfig.defaultTheme}
      storageKey={themeConfig.storageKey}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
