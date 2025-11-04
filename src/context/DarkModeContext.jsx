import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored != null) return stored === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('darkMode', String(enabled));
  }, [enabled]);

  const value = useMemo(() => ({ enabled, toggle: () => setEnabled((v) => !v) }), [enabled]);

  return (
    <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
  );
};

export default DarkModeContext;


