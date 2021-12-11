import { useState } from 'react';

const useTheme = () => {
  const localTheme = localStorage.getItem('theme');
  const initialTheme = localTheme || 'light';
  const [theme, setTheme] = useState(initialTheme);
  const setMode = (mode) => {
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };
  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };
  return [theme, themeToggler];
};

export default useTheme;