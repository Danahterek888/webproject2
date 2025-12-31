import ProductCard from "../Components/ProductCard";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [coloredLenses, setColoredLenses] = useState([]);
  const [clearLenses, setClearLenses] = useState([]);
  const [glasses, setGlasses] = useState([]);

  useEffect(() => {
    fetch("${process.env.REACT_APP_BACKEND_URL}/products")
      .then((res) => res.json())
      .then((data) => {
        // Split products by category (assuming your DB has a 'category' column)
        setColoredLenses(data.filter((p) => p.category === "colored"));
        setClearLenses(data.filter((p) => p.category === "clear"));
        setGlasses(data.filter((p) => p.category === "glasses"));
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="prdtitle">Our Products</h2>

      <h3 className="prdtextcolor">Colored Lenses</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginBottom: "30px" }}>
        {coloredLenses.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3 className="prdtextcolor">Clear Lenses</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginBottom: "30px" }}>
        {clearLenses.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3 className="prdtextcolor">Glasses</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "60px" }}>
        {glasses.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
