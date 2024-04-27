import React, { createContext, useContext, useState } from 'react';

const initialColors = {
  primary: '#FF6347',
  secondary: '#FFA07A',
  background: '#F0F0F0',
  text: '#333',
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState(initialColors);

  const toggleTheme = () => {
    setColors((prevColors) => ({
      ...prevColors,
      background: prevColors.background === '#F0F0F0' ? '#333' : '#F0F0F0',
      text: prevColors.text === '#333' ? '#F0F0F0' : '#333',
    }));
  };

  return (
    <ThemeContext.Provider value={{ colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
