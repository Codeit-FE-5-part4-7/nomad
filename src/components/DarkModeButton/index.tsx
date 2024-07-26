import React from 'react';
import DarkModeStore from '@/context/themeContext';

function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = DarkModeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className='p-[0.8rem] rounded-[0.6rem] border border-gray-300 shadow-sm dark:border-gray-500 bg-white dark:bg-nomad-black text-black text-[1.4rem] dark:text-white transition-colors duration-300'
    >
      {isDarkMode ? '🌙 Light Mode' : '🌞 Dark Mode'}
    </button>
  );
}

export default DarkModeButton;
