import { useState, useEffect } from "react";
import axios from "axios";
import TestimonialSwiper from "./TestimonialSwiper";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/testimonial?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setTestimonials(response.data || []); // Fallback to an empty array
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ErrorBoundary>
      <TestimonialSwiper testimonials={testimonials} />
    </ErrorBoundary>
  );
};

export default Testimonials;
