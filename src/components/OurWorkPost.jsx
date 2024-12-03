import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Seo from "../components/Seo";
import PageHeader from "./PageHeader";
import LoadingSpinner from "./LoadingSpinner";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

// Updated Taxonomies Component
const Taxonomies = ({ post }) => {
  const [taxonomies, setTaxonomies] = useState([]);

  useEffect(() => {
    if (!post) return;

    // Fetch taxonomies
    const taxonomyEndpoints = post._links["wp:term"] || [];
    const taxonomyPromises = taxonomyEndpoints.map((link) =>
      axios.get(link.href)
    );

    // Wait for all taxonomy data to load
    Promise.all(taxonomyPromises)
      .then((responses) => {
        const taxonomyData = responses.map((response) => response.data);
        setTaxonomies(taxonomyData);
      })
      .catch((error) => console.error("Error fetching taxonomies:", error));
  }, [post]);

  const renderTaxonomies = (taxonomies) =>
    taxonomies.map((taxonomyGroup, index) => (
      <div key={index}>
        <h2>{taxonomyGroup[0]?.taxonomy}</h2>
        <div>
          {taxonomyGroup.map((taxonomy) => (
            <Link
              key={taxonomy.id}
              to={`/our-work/project-type/${taxonomy.id}`}
              className="taxonomy-term-pill"
            >
              {taxonomy.name}
            </Link>
          ))}
        </div>
      </div>
    ));

  return <div>{renderTaxonomies(taxonomies)}</div>;
};

const OurWorkPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${baseUrl}/our_work?_embed&slug=${slug}`;

    axios
      .get(endpoint)
      .then((response) => {
        setPost(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  const getFeaturedImage = (post) =>
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/150";

  const getSecondImage =
    post.acf?.["second-featured-image"] || "https://via.placeholder.com/150";

  return (
    <>
      <Seo
        title={post?.title?.rendered || "Our Work Post"}
        description={post?.excerpt?.rendered || "Learn more about this project."}
      />

      <PageHeader
        title="Our Work"
        image_url="/header-image/fern-rock.jpg"
        blurb="Showcasing the beauty we’ve created—explore the gardens and landscapes we’ve brought to life."
      />

      <div className="custom-post-container">
        <div className="custom-post-inner">
          {/* Image Wrapper to stack images */}
          <div className="image-wrapper">
            {/* Main Featured Image */}
            <div
              className="custom-post-image"
              style={{
                backgroundImage: `url(${getFeaturedImage(post)})`,
              }}
            />
            {/* Second Featured Image */}
            <div
              className="custom-post-image"
              style={{
                backgroundImage: `url(${getSecondImage})`,
              }}
            />
          </div>

          <div className="custom-post-text">
            {/* Title and Content */}
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

            {/* Client Name */}
            {post.acf?.client_name && (
              <p>
                <strong>Client Name:</strong> {post.acf.client_name}
              </p>
            )}

            {/* Location */}
            {post.acf?.location && (
              <p>
                <strong>Location:</strong> {post.acf.location}
              </p>
            )}

            {/* Project Date */}
            {post.acf?.project_date && (
              <p>
                <strong>Project Date:</strong> {post.acf.project_date}
              </p>
            )}

            {/* Services Provided */}
            {post.acf?.services_provided && (
              <p>
                <strong>Services Provided:</strong> {post.acf.services_provided}
              </p>
            )}

            {/* Materials Used */}
            {post.acf?.materials_used && post.acf.materials_used !== "" && (
              <p>
                <strong>Materials Used:</strong> {post.acf.materials_used}
              </p>
            )}

            {/* Project Cost */}
            {post.acf?.project_cost && post.acf.project_cost !== "" && (
              <p>
                <strong>Project Cost:</strong> {post.acf.project_cost}
              </p>
            )}

            <br />

            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>
        </div>

        {/* Taxonomy Section */}
        <div className="tax-field">
          <Taxonomies post={post} />
        </div>
      </div>
    </>
  );
};

export default OurWorkPost;
