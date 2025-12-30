import { Link } from "react-router-dom";
import "../Assets/Navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../Assets/lentilogo.png";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Lenti Logo" className="logo" />
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="cart-link">
           Cart ({cartItems.length})
        </Link>
      </div>
    </nav>
  );
}

