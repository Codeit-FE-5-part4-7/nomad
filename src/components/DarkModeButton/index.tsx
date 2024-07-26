import React, { useState, useEffect } from 'react';

function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());

      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  // 디자인 수정 예정
  return (
    <button onClick={toggleDarkMode} className='p-[0.8rem] rounded-[0.6rem] border border-gray-300 shadow-sm dark:border-gray-500 bg-white dark:bg-nomad-black text-black text=[1.4rem] dark:text-white transition-colors duration-300'>
      {isDarkMode ? '🌙 Light Mode' : '🌞 Dark Mode'}
    </button>
  );
}

export default DarkModeButton;
