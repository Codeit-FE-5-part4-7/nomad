import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeStore = create<ThemeState>((set) => ({
  isDarkMode: !!(typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true'),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;

      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', newMode.toString());
        document.documentElement.classList.toggle('dark', newMode);
      }

      return { isDarkMode: newMode };
    }),
}));

export default DarkModeStore;
