import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import TestimonialSwiper from "../components/TestimonalSwiper";
import Toast from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Reviews = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const reviewFormRef = useRef(null);

  // State for the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);

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

  const formEndpoint = import.meta.env.VITE_WP_API_FORM_ENDPOINT;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formEndpoint) {
      return;
    }

    const reviewForm = new FormData();
    reviewForm.append("reviewer-name", name);
    reviewForm.append("reviewer-email", email);
    reviewForm.append("review-message", message);
    reviewForm.append("review-rating", rating);

    axios
      .post(formEndpoint, reviewForm, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setSubmitted(true);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        setSubmitted(false);
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Reviews - Tipu Garden Management"
        description="Your custom page description here."
        url={window.location.href}
      />

      <PageHeader
        title="Leave a Review"
        image_url="/header-image/reviews.jpg"
        blurb="Leave a Review or Hear what our happy clients have to say—real feedback from those who’ve trusted us with their gardens."
        showButton={true}
        scrollToForm={() => reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' })}  // Pass scroll function as prop
      />

      <div className="main-container-testimonal">
        <div className="inner-container-vertical">
          <h2 className="h2-alt">Testimonials</h2>
          <TestimonialSwiper testimonials={testimonials} />
        </div>
      </div>

      <div className="main-container-contact">
        <div className="inner-container">
          <h2 className="h2-alt">Leave a Review</h2>
          <p>
            We’d love to hear from you! Do you have something nice to say about
            our work, or is there something we could improve on in the future?
            Let us know below—your feedback helps us grow and do better!
          </p>
          <div ref={reviewFormRef} className="form-container">
            <form onSubmit={handleSubmit} className="custom-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating (1-5):</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="secondary-button">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification for Success/Error */}
      <Toast
        message={submitted ? "Thank you for your review!" : error ? "Error submitting your review!" : ""}
        type={submitted ? "success" : "error"}
        onClose={() => {
          setSubmitted(false);
          setError(false);
        }}
      />
    </>
  );
};

export default Reviews;
