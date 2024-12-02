import { useState, useEffect } from "react";
import axios from "axios";

const useCustomizer = () => {
  const [bgColor, setBgColor] = useState(""); // Background color
  const [fontFamily, setFontFamily] = useState(""); // Font family
  const [mobileMenu, setMobileMenu] = useState(""); // Mobile menu color
  const [navColor, setNavColor] = useState(""); // Navbar color
  const [primaryButtonColor, setPrimaryButtonColor] = useState(""); // Primary button color
  const [secondaryButtonColor, setSecondaryButtonColor] = useState(""); // Secondary button color

  const baseUrl = import.meta.env.VITE_WP_BASE_URL; // Your backend URL from environment variables

  useEffect(() => {
    axios.get(`${baseUrl}custom-theme/v1/customizer-settings`)
      .then((response) => {
        const {
          backgroundColor,
          fontFamily,
          mobileMenu,
          navbarColor,
          primaryButtonColor,
          secondaryButtonColor,
        } = response.data;

        setBgColor(backgroundColor || "#ffffff");
        setFontFamily(fontFamily || "Montserrat");
        setMobileMenu(mobileMenu || "#10381c");
        setNavColor(navbarColor || "#10381c");
        setPrimaryButtonColor(primaryButtonColor || "#ffd12e"); // Default primary color
        setSecondaryButtonColor(secondaryButtonColor || "#249836"); // Default secondary color
      })
      .catch((error) => {
        console.error("Error fetching customizer settings: ", error);
      });
  }, [baseUrl]);

  return {
    bgColor,
    fontFamily,
    mobileMenu,
    navColor,
    primaryButtonColor,
    secondaryButtonColor,
  };
};

export default useCustomizer;
