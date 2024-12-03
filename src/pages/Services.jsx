import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import LoadingSpinner from "../components/LoadingSpinner";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Services = () => {
  const [servicePosts, setServicePosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/services?_embed&per_page=100`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setServicePosts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getExcerpt = (content, wordLimit = 80) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/); 
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  const ServicePostList = ({ posts }) => {
    return posts.map((post, index) => {
      const getFeaturedImage = (post) =>
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://via.placeholder.com/150";

      const isEven = index % 2 === 1;

      return (
        <div
          key={post.slug}
          className={`custom-post-container ${isEven ? "even" : "odd"}`}
        >
          <div
            className={`custom-post-inner ${isEven ? "reverse-layout" : ""}`}
          >
            <div
              className="custom-post-image"
              style={{
                backgroundImage: `url(${getFeaturedImage(post)})`,
              }}
            />
            <div className="custom-post-text">
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <p
                dangerouslySetInnerHTML={{
                  __html: getExcerpt(post.content.rendered),
                }}
              />
              <Link
                to={`/services/${post.slug}`}
                className={isEven ? "secondary-button" : "primary-button"}
              >
                Learn More...
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Seo
        title="Services - Tipu Garden Management"
        description="Discover the wide range of services we offer to help bring your garden to life."
        url={window.location.href}
      />
      <PageHeader
        title="Our Services"
        image_url="/header-image/services.jpg"
        blurb="Transforming gardens, one project at a time—tailored care, expert landscaping, and maintenance to bring your outdoor vision to life."
      />

      {/* Dynamic Service Posts */}
      <div className="about-posts-container">
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner />
            <p>Loading services...</p>
          </div>
        ) : (
          <ServicePostList posts={servicePosts} />
        )}
      </div>
    </>
  );
};

export default Services;
