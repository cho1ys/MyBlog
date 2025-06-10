'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeToggleContext = createContext(() => {});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeToggleContext.Provider>
  );
}
