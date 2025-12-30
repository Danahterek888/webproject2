import "../Assets/ProductCard.css";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return <div className="product-card">No product data</div>;
  }

  const handleAdd = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="card">
      <img src={product.image_url || product.image} alt={product.name} className="card-img" />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAdd} className="buy-btn">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
