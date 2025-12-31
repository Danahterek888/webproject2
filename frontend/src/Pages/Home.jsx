import ProductCard from "../Components/ProductCard";
import "../Assets/Home.css";
import heroImage from "../Assets/heroo.png";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        // Example: pick first 4 products as "featured"
        // Or filter by a 'featured' flag if you add that in DB
        setFeatured(data.slice(0, 4));
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <img src={heroImage} alt="lenti" className="home-hero" />
        
        <div className="hero-text">
          <h1>EYECONIC LOOKS</h1>
          <p>Style that speaks louder than words!</p>
          <button className="hero-btn">Shop Now</button>
        </div>
      </div>

      <h2 className="bestseller">Best Sellers</h2>
      <p className="bestsellerp">Discover your ideal contacts for less!</p>

      <div className="featured-products">
        {featured.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
