import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import useCustomizer from "../hooks/useCustomizer";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const baseUrl = import.meta.env.VITE_WP_BASE_URL;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const { mobileMenu, navColor, fontFamily, primaryButtonColor, secondaryButtonColor } = useCustomizer(); // Include fontFamily and button colors
  const { cart } = useContext(CartContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const mobile = document.querySelector(".nav-links");
    const rootStyles = getComputedStyle(document.documentElement);
    const defaultColor = rootStyles.getPropertyValue("--default-bg-color").trim();

    if (isOpen && mobile) {
      mobile.style.backgroundColor = mobileMenu;
    } else if (mobile) {
      mobile.style.backgroundColor = defaultColor;
    }
  }, [isOpen, mobileMenu]);

  useEffect(() => {
    const fetchNavLogo = async () => {
      try {
        const response = await axios.get(`${baseUrl}custom/v1/nav-logo`);
        if (response.status === 200) {
          setLogoUrl(response.data.url);
        } else {
          console.error("Failed to fetch logo URL");
        }
      } catch (error) {
        console.error("Error fetching logo", error);
      }
    };

    fetchNavLogo();
  }, []);

  useEffect(() => {
    if (fontFamily) {
      document.body.style.fontFamily = fontFamily;
    }
  }, [fontFamily]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Dynamically update button color variables
  useEffect(() => {
    if (primaryButtonColor && secondaryButtonColor) {
      document.documentElement.style.setProperty('--primary-button-color', primaryButtonColor);
      document.documentElement.style.setProperty('--secondary-button-color', secondaryButtonColor);
    }
  }, [primaryButtonColor, secondaryButtonColor]);

  return (
    <header>
      <nav
        className={`navbar ${isOpen ? "menu-open" : ""}`}
        style={{ backgroundColor: navColor }}
      >
        <NavLink to="/" className="logo">
          <img
            className="nav-logo"
            src={logoUrl || "img/tipu-logo-dark-background.svg"}
            alt="Website Logo"
          />
        </NavLink>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar bar1 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar2 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar3 ${isOpen ? "toggle" : ""}`}></div>
        </div>
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ourWork"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Our Work</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reviews"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Reviews</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Shop</span>
            </NavLink>
          </li>
          <li className="cart-number">
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Cart</span>
              {totalItems > 0 && (
                <span className="cart-span">{totalItems}</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Contact</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Navbar;
