import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import TestimonialSwiper from "../components/TestimonalSwiper";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/testimonial?_embed`;

  // Fetch testimonials
  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setTestimonials(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Seo
        title="Home - Tipu Garden Management"
        description="Welcome to Tipu Garden Management – expert gardening services from Seatoun to Titahi Bay. We specialize in creating and maintaining beautiful, thriving outdoor spaces. Explore our services, see our work, and discover how we can bring your garden vision to life. Contact us today!"
        url={window.location.href}
      />

      <PageHeader
        title="Get a Free Quote Today!"
        image_url="/header-image/front-house.jpg"
      />

      {/* Kia Ora */}
      <div className="main-container">
        <div className="inner-container">
          <div
            className="image-container"
            style={{
              backgroundImage: `url('/img/kia-ora-cropped.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="text-container">
            <h2>Kia Ora, Welcome to Tipu Garden Management</h2>
            <br />
            <p>
              At Tipu Garden Management, we believe that a well-cared-for garden
              isn’t just a space—it’s a sanctuary. Whether you’re dreaming of a
              lush, forest-like retreat, need regular maintenance for your
              outdoor spaces, or want advice on bringing native plants to life,
              we’re here to make it happen.
              <br />
              <br /> As a family-run business, we pride ourselves on delivering
              friendly, reliable, and personalized service. With over a decade
              of experience, we bring the knowledge and care needed to create
              outdoor spaces that reflect your vision. Whether it’s mowing the
              lawns, designing landscapes, or nurturing gardens to thrive in all
              seasons, we’ll go above and beyond to ensure your satisfaction.
              <br />
              <br />
              Our team is passionate about the beauty and sustainability of
              nature. That’s why we love working with native plants,
              eco-friendly solutions, and designs that not only enhance your
              property but also support local wildlife and the environment.
              <br />
              <br /> Let us handle the hard work while you enjoy the rewards of
              a beautiful, vibrant garden. Welcome to Tipu Garden
              Management—where your garden dreams grow.
            </p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="main-container">
  <div className=".inner-container-services-home">
    <div className="image-grid">
      <div className="service-card">
        <div
          className="image-container"
          style={{
            backgroundImage: `url('/img/hedges-service-icon.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Link to Hedge Services */}
        <Link to="/services/hedges-topiaries-services">
          <button className="secondary-button">Hedge Services</button>
        </Link>
      </div>

      <div className="service-card">
        <div
          className="image-container"
          style={{
            backgroundImage: `url('/img/lawn-care-service-icon.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Link to Lawn Care Services */}
        <Link to="/services/lawn-care-services">
          <button className="secondary-button">Lawn Care</button>
        </Link>
      </div>

      <div className="service-card">
        <div
          className="image-container"
          style={{
            backgroundImage: `url('/img/pest-control-service-icon.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Link to Pest Control Services */}
        <Link to="/services/pest-control-services">
          <button className="secondary-button">Pest Control</button>
        </Link>
      </div>

      <div className="service-card">
        <div
          className="image-container"
          style={{
            backgroundImage: `url('/img/section-clear-service-icon.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Link to Section Clear Services */}
        <Link to="/services/section-clearing-services">
          <button className="secondary-button">Section Clear</button>
        </Link>
      </div>
    </div>
  </div>
</div>

      {/* Free Quote */}
      <div className="main-container">
        <div className="inner-container">
          <div
            className="image-container"
            style={{
              backgroundImage: `url('/img/rob-teeps-truck-cropped.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="text-container">
            <h2>Free Quote, to make sure we’re right for you!</h2>
            <br />
            <p>
              Your garden should be your happy place, and we want to ensure
              we’re the right team to help bring your vision to life. That’s why
              we offer a no-obligation free quote tailored to your needs.
              Whether it’s regular maintenance, landscaping, or creating
              something truly unique, we’ll work with you to make it happen.
              Contact us today and take the first step toward your perfect
              outdoor space!
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="main-container-testimonal">
        <div className="inner-container-vertical">
          <h2 className="h2-alt">Testimonials</h2>
          <TestimonialSwiper testimonials={testimonials} />
        </div>
      </div>

      {/* Work Zone */}
      <div className="main-container">
        <div className="inner-container">
          <div
            className="image-container"
            style={{
              backgroundImage: `url('/img/service-area.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="text-container">
            <h2>Service Area</h2>
            <br />
            <p>
              Our main service area covers from Seatoun to Titahi Bay, and we focus our work within this region. However, if you're just outside these boundaries, please don’t hesitate to get in touch! We’ll do our best to accommodate you—we don’t want anyone to miss out on our services.
            </p>
            <Link to="/contact">
            <button className="primary-button">Contact</button>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
