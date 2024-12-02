import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const PageHeader = ({ title, blurb, image_url, showButton = true, scrollToForm }) => {
  const location = useLocation();

  // Check if we're on the Reviews page
  const isReviewPage = location.pathname === "/reviews";

  return (
    <div
      className="header-section"
      style={{
        backgroundImage: `url(${image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="header-overlay">
        <h1 className="hero-h1">{title}</h1>
        {blurb && <p className="hero-blurb">{blurb}</p>}

        {showButton && (
          isReviewPage ? (
            // Show the scroll-to-form button only on the Reviews page
            <button onClick={scrollToForm} className="primary-button">
              Leave a Review
            </button>
          ) : (
            // Show the Contact button on other pages
            <Link to="/contact">
              <button className="primary-button">Book a Job</button>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default PageHeader;
