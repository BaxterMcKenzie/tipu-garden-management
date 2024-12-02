import React, { useEffect, useState, useContext } from "react";
import wooCommerceApi from "../woocommerceApi";
import { CartContext } from "../context/CartContext";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Toast from "../components/Toast"; // Import the Toast component
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component
import { Link } from "react-router-dom"; // Import Link for navigation

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastType, setToastType] = useState(""); // State for toast type
  const [loading, setLoading] = useState(true); // Loading state
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await wooCommerceApi.get("/products");
        setProducts(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setToastMessage("Failed to load products. Please try again.");
        setToastType("error");
        setLoading(false); // Set loading to false even if there is an error
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    try {
      addToCart(product); // Add product to cart
      setToastMessage(`${product.name} added to cart!`);
      setToastType("success");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setToastMessage("Error adding product to cart.");
      setToastType("error");
    }
  };

  return (
    <>
      <Seo
        title="Shop - Tipu Garden Management"
        description="Browse this amazing shop"
        url={window.location.href}
      />

      <PageHeader
        title="Shop"
        image_url="/header-image/shop.jpg"
        blurb="Tools, accessories, and more—everything you need to grow and enjoy your garden."
      />

      <div className="contact-form-container">
        <div className="inner-container">
          <h2 className="h2-alt">Support Your Local</h2>
          <p>
            Maybe you already have a beautiful garden, but you’d still like to
            show your support?
            <br />
            <br />
            Explore our selection of gardening products below. Whether it's a
            handy tote for your tools or something special to enhance your
            outdoor space, your purchase helps us continue our work in creating
            beautiful gardens for others.
            <br />
            <br />
            Thank you for supporting our passion for gardening!
          </p>
        </div>
      </div>

      {/* Show the loader if products are being fetched */}
      {loading && <LoadingSpinner />}

      <div className="main-container-alt">
        <div className="inner-container">
          <div className="products">
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {/* Display the product image */}
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.name}
                    />
                  )}

                  <h5>{product.name}</h5>

                  {/* Display the product description */}
                  {product.description && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    />
                  )}

                  {/* Display the product price */}
                  <h4>
                    Price: $
                    {product.prices && product.prices.price
                      ? (parseFloat(product.prices.price) / 100).toFixed(2)
                      : "N/A"}
                  </h4>

                  <button
                    className="secondary-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
            {/* Proceed to Checkout Button */}
            <div className="checkout-container">
              <Link to="/cart">
                <button className="primary-button">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")} // Clear toast message when closed
      />
    </>
  );
};

export default Shop;
