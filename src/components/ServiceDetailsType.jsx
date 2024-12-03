import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import LoadingSpinner from "./LoadingSpinner";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const ServiceDetailsType = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [taxonomy, setTaxonomy] = useState({});
  const [loading, setLoading] = useState(true);

  const taxonomyEndpoint = `${baseUrl}/difficulty-level/${id}`;
  const postsEndpoint = `${baseUrl}/service_options?difficulty-level=${id}&_embed`;

  useEffect(() => {
    axios
      .get(taxonomyEndpoint)
      .then((res) => {
        setTaxonomy(res.data || { name: "Unknown Difficulty Level" });
      })
      .catch((err) => {
        setTaxonomy({ name: "Unknown Difficulty Level" });
      });
  }, [taxonomyEndpoint]);

  useEffect(() => {
    axios
      .get(postsEndpoint)
      .then((res) => {
        setPosts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setPosts([]);
        setLoading(false);
      });
  }, [postsEndpoint]);

  const getExcerpt = (content, wordLimit = 50) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  const renderPosts = () =>
    posts.length > 0 ? (
      posts.map((post, index) => {
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
                  to={`/services/details/${post.slug}`} // Ensure it points to /services/details/:slug
                  className={isEven ? "secondary-button" : "primary-button"}
                >
                  Read More...
                </Link>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p>No services found under this difficulty level.</p>
    );

  return (
    <>
      <Seo
        title={`${taxonomy.name || "Difficulty Level"} - Our Services`}
        description={`Explore all posts related to ${
          taxonomy.name || "this difficulty level"
        }.`}
        url={window.location.href}
      />
      {!taxonomy.name ? (
        <LoadingSpinner />
      ) : (
        <PageHeader
          title={taxonomy.name}
          image_url="/header-image/our-work.jpg"
          blurb={`Explore all services categorized under ${taxonomy.name}.`}
        />
      )}
      <div className="about-posts-container">
        {loading ? <LoadingSpinner /> : renderPosts()}
      </div>
    </>
  );
};

export default ServiceDetailsType;
