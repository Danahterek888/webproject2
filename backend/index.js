require("dotenv").config();
import cors from "cors";
import mysql from "mysql";
import express from "express";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Database connection
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Test DB connection
db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

/* ----------------------------------------------------
   GET ALL PRODUCTS
---------------------------------------------------- */
app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(204).send("No products found");
      }
      return res.status(200).json(data);
    }
  });
});

/* ----------------------------------------------------
   GET PRODUCTS BY ID
---------------------------------------------------- */
app.get("/products/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Product ID must be a number" });
  }

  const q = "SELECT * FROM products WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(404).json({ message: "Products not found" });
      }
      return res.status(200).json(data[0]);
    }
  });
});

/* ----------------------------------------------------
   ADD NEW PRODUCT
---------------------------------------------------- */
app.post("/products", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing"); //if im trying to add empty input for frontend checking
  }

  const { name, price, category, image_url } = req.body;

  const errors = [];
  if (!name) {
    errors.push("First name is required");
  }
  if (!price) {
    errors.push("Last name is required");
  }
  if (!category) {
    errors.push("Phone is required"); //validate required feilds
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  const q =
    "INSERT INTO products (name, price, category, image_url) VALUES (?, ?, ?, ?)";

  db.query(q, [name, price, category, image_url], (err, data) => {
    if (err) {
      if (err.errno === 1062) { //check for duplicate entry errors
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "Product created successfully",
        id: data.insertId,
      });
    }
  });
});

/* ----------------------------------------------------
   UPDATE PRODUCT
---------------------------------------------------- */
app.put("/products/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing"); //make sure that froentend sent data
  }

  const { id } = req.params; //comes from the URL (/products/:id)
  const { name, price, category, image_url } = req.body; //come from the request body

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" }); //Ensures the client provided an ID.
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Product ID must be a number" });
  }

  if (!name || !price || !category || !image_url) {
    return res.status(400).json({ message: "All fields are required" }); //Makes sure all product fields are present before updating
  }

  const q =
    "UPDATE products SET name = ?, price = ?, category = ?, image_url = ? WHERE id = ?";

  db.query(q, [name, price, category, image_url, id], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" }); //to check if the product deos even exist before update
      }
      return res.status(200).json({ message: "Product updated successfully" });
    }
  });
});

/* ----------------------------------------------------
   DELETE PRODUCT
---------------------------------------------------- */
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Product ID must be a number" });
  }

  const q = "DELETE FROM products WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    }
  });
});

/* ----------------------------------------------------
   DELETE ALL PRODUCTS FROM CART
---------------------------------------------------- */
app.delete("/cart", (req, res) => {
  const q = "DELETE FROM cart";

  db.query(q, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (result.affectedRows === 0) {
        return res.status(204).send("Cart is already empty");
      }
      return res.status(200).json({ message: "Cart cleared successfully" });
    }
  });
});

/* ----------------------------------------------------
   DELETE A PRODUCT FROM CART
---------------------------------------------------- */
app.delete("/cart/:product_id", (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  if (isNaN(Number(product_id))) {
    return res.status(400).json({ message: "Product ID must be a number" });
  }

  const q = "DELETE FROM cart WHERE product_id = ?";

  db.query(q, [product_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      return res.status(200).json({ message: "Cart item deleted successfully" });
    }
  });
});

/* ----------------------------------------------------
   ADD NEW CONTACT MESSAGE
---------------------------------------------------- */
app.post("/contactmessages", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing"); //if im trying to add empty input for frontend checking
  }

  const { name, email, message } = req.body;

  const errors = [];
  if (!name) {
    errors.push("Name is required");
  }
  if (!email) {
    errors.push("Email is required");
  }
  if (!message) {
    errors.push("Message is required"); //validate required feilds
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  const q =
    "INSERT INTO contactmessages (name, email, message) VALUES (?, ?, ?)";

  db.query(q, [name, email, message], (err, data) => {
    if (err) {
      if (err.errno === 1062) { //check for duplicate entry errors
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "contact message created successfully",
        id: data.insertId,
      });
    }
  });
});

/* ----------------------------------------------------
   GET ALL CART ITEMS
---------------------------------------------------- */
app.get("/cart", (req, res) => {
  const q = "SELECT * FROM cart";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    return res.status(200).json(data);
  });
});
