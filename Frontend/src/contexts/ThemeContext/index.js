import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // locastorage de birşey yoksa default olarak light versin

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
      /*document.body.classList.remove("bg-white");
      document.body.classList.add("bg-gray-700");*/
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
      /*document.body.classList.remove("bg-gray-700");
      document.body.classList.add("bg-white");*/
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, []); // localstorageye kaydetmek için

  const values = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
