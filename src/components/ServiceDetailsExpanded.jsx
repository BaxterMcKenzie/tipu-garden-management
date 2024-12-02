import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "./LoadingSpinner";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

// Taxonomies Component
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
    taxonomies
      .filter((taxonomyGroup) => taxonomyGroup[0]?.taxonomy !== 'service-category')
      .map((taxonomyGroup, index) => (
        <div key={index}>
          <h2>{taxonomyGroup[0]?.taxonomy}</h2>
          <div>
            {taxonomyGroup.map((taxonomy) => (
              <Link
                key={taxonomy.id}
                to={`/${
                  taxonomyGroup[0]?.taxonomy === 'difficulty-level'
                    ? 'difficulty-level'
                    : 'other-category'
                }/${taxonomy.id}`}
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


// ServiceDetailsExpanded Component
const ServiceDetailsExpanded = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/service_options?_embed&slug=${slug}`);
        setService(response.data[0]); // Get the first matching service
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [slug]);

  if (loading) return <LoadingSpinner/>;
  if (!service) return <p>Service not found.</p>;

  // Extract price range and duration from ACF fields
  const { price_range, duration } = service.acf || {};

  const getFeaturedImage = (service) =>
    service._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/150";

  return (
    <>
      <Seo
        title={service?.title?.rendered || "Service Details"}
        description={service?.excerpt?.rendered || "Learn more about this service."}
      />

      <PageHeader
        title={<span dangerouslySetInnerHTML={{ __html: service.title.rendered }} />}
        image_url="/header-image/fern-rock.jpg"
        blurb="Learn about the detailed offerings and specifics of this service."
      />

      <div className="custom-post-container">
        <div className="custom-post-inner">
          <div className="image-wrapper">
            <div
              className="custom-post-image"
              style={{ backgroundImage: `url(${getFeaturedImage(service)})` }}
            />
          </div>

          <div className="custom-post-text">
            <h2 dangerouslySetInnerHTML={{ __html: service.title.rendered }} />

            {/* Display Price Range */}
            {price_range && (
              <p>
                <strong>Price Range:</strong> {price_range}
              </p>
            )}

            {/* Display Duration */}
            {duration && (
              <p>
                <strong>Duration:</strong> {duration}
              </p>
            )}

            {/* Service Content */}
            <p dangerouslySetInnerHTML={{ __html: service.content.rendered }} />
          </div>
        </div>

        {/* Taxonomy Section */}
        <div className="tax-field">
          <Taxonomies post={service} />
        </div>
      </div>
    </>
  );
};

export default ServiceDetailsExpanded;
