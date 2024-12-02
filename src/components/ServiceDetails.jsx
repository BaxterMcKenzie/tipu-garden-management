import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import LoadingSpinner from "./LoadingSpinner";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaUrl = async (mediaHref) => {
      try {
        const response = await axios.get(mediaHref);
        return response.data.source_url || "https://via.placeholder.com/150";
      } catch (error) {
        console.error("Error fetching media URL:", error);
        return "https://via.placeholder.com/150";
      }
    };
  
    const fetchData = async () => {
      try {
        const serviceResponse = await axios.get(
          `${baseUrl}/services?slug=${slug}&_embed`
        );
        const serviceData = serviceResponse.data[0];
        setServiceDetails(serviceData);
  
        const optionsResponse = await axios.get(
          `${baseUrl}/service_options?per_page=100`
        );
        const optionsData = optionsResponse.data;
  
        // Filter and enrich the options with their media URLs
        const filteredOptions = await Promise.all(
          optionsData
            .filter((option) =>
              option["service-category"]?.includes(serviceData["service-category"][0])
            )
            .map(async (option) => {
              const mediaHref = option?._links?.["wp:featuredmedia"]?.[0]?.href;
              const featuredImage = mediaHref
                ? await fetchMediaUrl(mediaHref)
                : "https://via.placeholder.com/150";
              return { ...option, featuredImage };
            })
        );
  
        setServiceOptions(filteredOptions);
      } catch (error) {
        console.error("Error fetching service details or options:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [slug]);

  const getFeaturedImage = (post) =>
    post?.featuredImage || // For enriched options
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || // For serviceDetails
    "https://via.placeholder.com/150";

  const getExcerpt = (content, wordLimit = 50) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  if (loading) {
    return <LoadingSpinner/>;
  }

  return (
    <>
      <Seo
        title={`${serviceDetails?.title?.rendered || "Service"} - Tipu Garden Management`}
        description={`Explore the options for our ${serviceDetails?.title?.rendered} service.`}
        url={window.location.href}
      />

      <PageHeader
        title={<span dangerouslySetInnerHTML={{ __html: serviceDetails.title.rendered }} />}
        image_url={getFeaturedImage(serviceDetails)}
      />

      <div className="about-posts-container">
        {serviceOptions.map((option, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={option.id}
              className={`custom-post-container ${isEven ? "even" : "odd"}`}
            >
              <div
                className={`custom-post-inner ${isEven ? "reverse-layout" : ""}`}
              >
                <div
                  className="custom-post-image"
                  style={{
                    backgroundImage: `url(${getFeaturedImage(option)})`,
                  }}
                />
                <div className="custom-post-text">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: option.title.rendered,
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: getExcerpt(option.content.rendered),
                    }}
                  />
                  <Link
                    to={`/services/details/${option.slug}`}
                    className={isEven ? "secondary-button" : "primary-button"}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ServiceDetails;
