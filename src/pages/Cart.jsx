import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Toast from "../components/Toast"; // Importing the Toast component for notifications
import LoadingSpinner from "../components/LoadingSpinner"; // Import spinner component

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastType, setToastType] = useState(""); // State for toast type
  const [loading, setLoading] = useState(false); // Loading state

  const handleIncrement = (item) => {
    setLoading(true); // Set loading to true while updating
    updateCart(item.id, item.quantity + 1);
    setToastMessage(`${item.name} quantity increased!`);
    setToastType("success");
    setLoading(false); // Set loading to false after the action is completed
  };

  const handleDecrement = (item) => {
    setLoading(true); // Set loading to true while updating
    if (item.quantity > 1) {
      updateCart(item.id, item.quantity - 1);
      setToastMessage(`${item.name} quantity decreased!`);
      setToastType("success");
    } else {
      removeFromCart(item.id);
      setToastMessage(`${item.name} removed from cart!`);
      setToastType("success");
    }
    setLoading(false); // Set loading to false after the action is completed
  };

  const handlePlaceOrder = () => {
    setLoading(true); // Set loading to true while placing the order
    // Simulate placing an order (you can replace this with an actual API call)
    setToastMessage("Order Placed Successfully!");
    setToastType("success");
    setLoading(false); // Set loading to false after the action is completed
  };

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + (item.prices.price * item.quantity) / 100,
        0
      ),
    [cart]
  );

  return (
    <>
      <Seo
        title="Cart - Tipu Garden Management"
        description="Browse this amazing Cart"
        url={window.location.href}
      />

      <PageHeader
        title="Cart"
        image_url="/header-image/cart.jpg"
        blurb="Your garden essentials are just a step away—review your items and get ready to grow!"
        showButton={false}
      />

      {/* Show the loader if the cart is updating */}
      {loading && <LoadingSpinner />}

      <div className="main-container-alt">
        <div className="inner-container">
          <div className="cart">
            {cart.length === 0 ? (
              <p>Your Cart is empty.</p>
            ) : (
              <div className="products">
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      {/* Product Card Layout */}
                      <div className="cart-item-card">
                        <div className="cart-item-image">
                          {item.images && item.images.length > 0 && (
                            <img
                              src={item.images[0].src}
                              alt={item.images[0].alt || item.name}
                            />
                          )}
                        </div>

                        <div className="cart-item-info">
                          <h5>{item.name}</h5>
                          <h4>
                            Price: ${parseFloat(item.prices.price / 100).toFixed(2)}
                          </h4>
                          <h4>Quantity: {item.quantity}</h4>

                          <div className="cart-item-actions">
                            <button
                              className="secondary-button"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove Item
                            </button>
                            <div className="cart-buttons">
                              <button
                                className="secondary-button"
                                onClick={() => handleDecrement(item)}
                              >
                                -
                              </button>
                              <button
                                className="secondary-button"
                                onClick={() => handleIncrement(item)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="primary-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
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

export default Cart;
