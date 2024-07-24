// ThemeProvider.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme, Theme } from '@/style/themes';

type ThemeName = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  themeName: ThemeName; // Add this line
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light'); // Track theme name
  const theme = themeName === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setThemeName((prevThemeName) =>
      prevThemeName === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
