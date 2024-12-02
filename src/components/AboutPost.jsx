import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const AboutPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${baseUrl}/about-post?_embed&slug=${slug}`;

    axios
      .get(endpoint)
      .then((response) => {
        setPost(response.data[0]); // Assuming the first result is the correct post
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false); // Set loading to false even on error
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>; // Graceful error handling
  }

  const getFeaturedImage = (post) =>
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/150";

  const isEven = 0; // For now, we're assuming the layout will always be 'odd' for a single post

  return (
    <>
      <Seo
        title={post?.title?.rendered || "About Post"}
        description={post?.excerpt?.rendered || "Learn more about this post."}
      />
      <div
        key={post.slug}
        className={`custom-post-container ${isEven ? "even" : "odd"}`}
      >
        <div className={`custom-post-inner ${isEven ? "reverse-layout" : ""}`}>
          <div
            className="custom-post-image"
            style={{
              backgroundImage: `url(${getFeaturedImage(post)})`,
            }}
          />
          <div className="custom-post-text">
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}/>
            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPost;
