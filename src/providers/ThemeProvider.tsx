
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // First check localStorage
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) return storedTheme;
    
    // If no stored theme, check system preference
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    
    // Fallback to default
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove("light", "dark");
    // Add the current theme class
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      const hasExplicitPreference = localStorage.getItem(storageKey) !== null;
      if (!hasExplicitPreference) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    
    // Add listener
    mediaQuery.addEventListener("change", handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [storageKey]);

  const value = {
    theme,
    setTheme: (theme: Theme) => setTheme(theme),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
