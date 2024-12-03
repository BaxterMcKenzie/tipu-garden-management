import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <div 
        className="footer-logo" 
        onClick={handleScrollToTop} 
        style={{ cursor: "pointer" }}
      >
        <img
          className="nav-logo"
          src="img/tipu-logo-dark-background.svg"
          alt="Website Logo"
        />
      </div>
      <div className="footer-info">
        <p className="footer-text">
          Phone: 022 175 3264 <br />
          Email: tipugarden@gmail.com
        </p>
        <a
          href="https://www.facebook.com/TipuGardens"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>

        <p className="footer-copyright">
          &copy; 2024 Tipu Garden Management
        </p>
      </div>
      <div className="fern-holder">
        <img className="fern" src="img/tipu-fern.svg" alt="Decorative Fern" />
      </div>
    </footer>
  );
};

export default Footer;
