import React, { createContext, useState, useContext } from 'react';
import { Colors } from '@/constants/Colors';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: Colors.light,
});

export const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
