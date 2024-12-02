import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner component

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const About = () => {
  const [aboutPosts, setAboutPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/about-post?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setAboutPosts(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const getExcerpt = (content, wordLimit = 50) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/); // Remove HTML tags
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  const AboutPostList = ({ posts }) => {
    return posts.map((post, index) => {
      const getFeaturedImage = (post) =>
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://via.placeholder.com/150";

      const isEven = index % 2 === 0; // Determine if the post is even (alternating layout)

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
              <p>{getExcerpt(post.content.rendered)}</p>
              <Link
                to={`/about/${post.slug}`}
                className={isEven ? "secondary-button" : "primary-button"}
              >
                Read More...
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
        title="About - Tipu Garden Management"
        description="Learn more about Tipu Garden Management"
        url={window.location.href}
      />
      <PageHeader
        title="About Us"
        image_url="/header-image/tree-path.jpg"
        blurb="Passionate about plants, dedicated to your garden—learn more about our story and what makes us different."
      />

      {/* Static Post at the top */}
      <div className="main-container">
        <div className="inner-container">
          <div
            className="image-container"
            style={{
              backgroundImage: `url('/img/teeps-mowing-cropped.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          />
          <div className="text-container">
            <h2>The Story of Tipu Garden Management</h2>
            <p>
              Tipu Gardens began in 2020, right in the middle of the challenging
              COVID-19 pandemic. Despite the uncertainty of the times, we pushed
              through with determination, turning our love for gardening into a
              thriving business. As a small, family-run team, we’ve worked hard to
              build something special, and we’ve loved every minute of helping our
              community create and care for beautiful gardens. Our journey has been
              one of growth, resilience, and plenty of digging—both in the garden
              and in building our dreams. We’re excited about what the future holds
              and can’t wait to continue transforming outdoor spaces and bringing
              people closer to nature for years to come.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic About Posts */}
      <div className="about-posts-container">
        {loading ? <LoadingSpinner /> : <AboutPostList posts={aboutPosts} />}
      </div>
    </>
  );
};

export default About;
