import React, { useEffect, useState } from 'react';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const classList = document.documentElement.classList;
    const updateTheme = () => setIsDarkMode(classList.contains('dark'));

    updateTheme(); // Initial check
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <h1
        className={`text-2xl md:text-3xl px-6 py-4 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        DoneDesk.nxt
      </h1>
    </div>
  );
}

export default Header;
