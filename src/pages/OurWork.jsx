import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import LoadingSpinner from "../components/LoadingSpinner"; 

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const OurWork = () => {
  const [workPosts, setWorkPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/our_work?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setWorkPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const getExcerpt = (content, wordLimit = 50) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/); // Remove HTML tags
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  const WorkPostList = ({ posts }) => {
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
              <p>{getExcerpt(post.content.rendered)}</p>
              <Link
                to={`/our-work/${post.slug}`}
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
        title="Our Work - Tipu Garden Management"
        description="Showcasing the beauty we’ve created—explore the gardens and landscapes we’ve brought to life."
        url={window.location.href}
      />
      <PageHeader
        title="Our Work"
        image_url="/header-image/our-work.jpg"
        blurb="Explore the beautiful gardens we've created and see how we transform outdoor spaces."
      />

      {/* Dynamic Our Work Posts */}
      <div className="about-posts-container">
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner />
            <p>Loading our work...</p>
          </div>
        ) : (
          <WorkPostList posts={workPosts} />
        )}
      </div>
    </>
  );
};

export default OurWork;
