import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Links from "./components/Links";

import useCustomizer from "./hooks/useCustomizer";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { bgColor, fontFamily, navColor } = useCustomizer();

  // Check if the customizer values are loaded
  const isCustomizerLoaded = bgColor && fontFamily && navColor;

  return (
    <>
      <HashRouter>
        {isCustomizerLoaded ? (
          <div className='custom-style' style={{ backgroundColor: `#${bgColor}`, fontFamily: fontFamily, gridRow: '2'}}>
            <ScrollToTop/>
            <Navbar style={{ backgroundColor: navColor }} />
            <Links />
            <Footer />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </HashRouter>
    </>
  );
};

export default App;
