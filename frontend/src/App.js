import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import { CartProvider } from "./context/CartContext";
import Cart from "./Pages/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
