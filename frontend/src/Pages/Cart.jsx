import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Cart.css";

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart, clearCart } = useContext(CartContext);

  // Fetch cart items from backend when component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`)
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [setCartItems]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = async (product_id) => {
    console.log("Removing item with id:", product_id);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/${product_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        removeFromCart(product_id); // update local context
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleClear = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
        method: "DELETE",
      });
      if (res.ok) {
        clearCart(); // update local context
      }
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const handlePurchase = () => {
    alert("Thank you for your purchase!");
    handleClear(); // clear both backend + frontend
  };

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-card">
                <img src={item.image_url || item.image} alt={item.name} className="cart-img" />
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <button onClick={() => handleRemove(item.product_id)} className="cart-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <hr />
          <h3>Total: ${total}</h3>
          <div className="cart-actions">
            <button onClick={handleClear} className="cart-btn">
              Clear Cart
            </button>
            <button onClick={handlePurchase} className="cart-btn confirm-btn">
              Confirm Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
