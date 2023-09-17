import React, { useState, useEffect, createContext } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const lightTheme = createTheme({
  palette: {
    type: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#0d1538",
    },
  },
});

export const ThemeContext = createContext();

function ThemeProviderWrapper({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = React.useMemo(
    () => createTheme(isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProviderWrapper;
