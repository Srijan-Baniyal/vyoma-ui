"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export interface ThemeConfig {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  componentScale: number;
  shadowIntensity: number;
}

const defaultTheme: ThemeConfig = {
  primary: "hsl(222.2, 84%, 4.9%)",
  primaryForeground: "hsl(210, 40%, 98%)",
  secondary: "hsl(210, 40%, 96%)",
  secondaryForeground: "hsl(222.2, 84%, 4.9%)",
  accent: "hsl(210, 40%, 96%)",
  accentForeground: "hsl(222.2, 84%, 4.9%)",
  background: "hsl(0, 0%, 100%)",
  foreground: "hsl(222.2, 84%, 4.9%)",
  muted: "hsl(210, 40%, 96%)",
  mutedForeground: "hsl(215.4, 16.3%, 46.9%)",
  border: "hsl(214.3, 31.8%, 91.4%)",
  input: "hsl(214.3, 31.8%, 91.4%)",
  ring: "hsl(222.2, 84%, 4.9%)",
  destructive: "hsl(0, 84.2%, 60.2%)",
  destructiveForeground: "hsl(210, 40%, 98%)",

  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },

  borderRadius: {
    none: "0px",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },

  componentScale: 1,
  shadowIntensity: 0.5,
};

interface ThemeCustomizerContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (themeJson: string) => void;
  applyTheme: () => void;
}

const ThemeCustomizerContext = createContext<
  ThemeCustomizerContextType | undefined
>(undefined);

export function ThemeCustomizerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(defaultTheme);
  }, []);

  const exportTheme = useCallback(() => {
    return JSON.stringify(theme, null, 2);
  }, [theme]);

  const importTheme = useCallback((themeJson: string) => {
    try {
      const parsedTheme = JSON.parse(themeJson);
      setTheme({ ...defaultTheme, ...parsedTheme });
    } catch (error) {
      console.error("Failed to import theme:", error);
    }
  }, []);

  const applyTheme = useCallback(() => {
    const root = document.documentElement;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-foreground", theme.primaryForeground);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--secondary-foreground", theme.secondaryForeground);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-foreground", theme.accentForeground);
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--muted-foreground", theme.mutedForeground);
    root.style.setProperty("--border", theme.border);
    root.style.setProperty("--input", theme.input);
    root.style.setProperty("--ring", theme.ring);
    root.style.setProperty("--destructive", theme.destructive);
    root.style.setProperty(
      "--destructive-foreground",
      theme.destructiveForeground
    );

    root.style.setProperty("--radius", theme.borderRadius.md);

    root.style.setProperty(
      "--component-scale",
      theme.componentScale.toString()
    );
          
    root.style.setProperty(
      "--shadow-intensity",
      theme.shadowIntensity.toString()
    );
  }, [theme]);

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  return (
    <ThemeCustomizerContext.Provider
      value={{
        theme,
        updateTheme,
        resetTheme,
        exportTheme,
        importTheme,
        applyTheme,
      }}
    >
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

export function useThemeCustomizer() {
  const context = useContext(ThemeCustomizerContext);
  if (context === undefined) {
    throw new Error(
      "useThemeCustomizer must be used within a ThemeCustomizerProvider"
    );
  }
  return context;
}
