import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const ProjectTypePosts = () => {
  const { id } = useParams(); // Retrieve the taxonomy ID or slug from the URL
  const [posts, setPosts] = useState([]);
  const [taxonomy, setTaxonomy] = useState({});
  const [loading, setLoading] = useState(true);

  const taxonomyEndpoint = `${baseUrl}/project-type/${id}`;
  const postsEndpoint = `${baseUrl}/our_work?project-type=${id}&_embed`;

  useEffect(() => {
    axios
      .get(taxonomyEndpoint)
      .then((res) => {
        setTaxonomy(res.data);
      })
      .catch((err) => {
        console.error("Error fetching taxonomy:", err); // Log the error
        setTaxonomy({ name: "Unknown Project Type" }); // Fallback
      });
  }, [taxonomyEndpoint]);
  

  // Fetch posts for the given project type
  useEffect(() => {
    axios
      .get(postsEndpoint)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [postsEndpoint]);

  const getExcerpt = (content, wordLimit = 50) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/); // Remove HTML tags
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  const renderPosts = () =>
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

  return (
    <>
      <Seo
        title={`${taxonomy.name || "Project Type"} - Our Work`}
        description={`Explore all posts related to ${taxonomy.name || "this project type"}.`}
        url={window.location.href}
      />
      <PageHeader
        title={taxonomy.name || "Project Type"}
        image_url="/header-image/our-work.jpg"
        blurb={`Explore all projects categorized under ${
          taxonomy.name || "this project type"
        }.`}
      />
      <div className="about-posts-container">
        {loading ? <p>Loading...</p> : renderPosts()}
      </div>
    </>
  );
};

export default ProjectTypePosts;
