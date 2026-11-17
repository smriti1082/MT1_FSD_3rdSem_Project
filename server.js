
// Import Express
const express = require("express");

// Create Express Application
const app = express();

// Port Number
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Initial Product Data
let products = [
    {
        id: 301,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 799,
        quantity: 25,
        inStock: true
    },
    {
        id: 302,
        name: "Notebook",
        category: "Stationery",
        price: 60,
        quantity: 100,
        inStock: true
    },
    {
        id: 303,
        name: "USB Keyboard",
        category: "Electronics",
        price: 999,
        quantity: 0,
        inStock: false
    }
];

// Validation Function
function validateProduct(data) {
    return (
        data &&
        typeof data.name === "string" &&
        data.name.trim() !== "" &&
        typeof data.category === "string" &&
        data.category.trim() !== "" &&
        typeof data.price === "number" &&
        Number.isFinite(data.price) &&
        data.price >= 0 &&
        typeof data.quantity === "number" &&
        Number.isInteger(data.quantity) &&
        data.quantity >= 0 &&
        typeof data.inStock === "boolean"
    );
}

// 1. GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
    res.status(200).json(products);
});

// 2. POST NEW PRODUCT
app.post("/api/products", (req, res) => {

    if (!validateProduct(req.body)) {
        return res.status(400).json({
            message: "Invalid product data"
        });
    }

    const { name, category, price, quantity, inStock } = req.body;

    const newProduct = {
        id: Math.max(...products.map(p => p.id), 300) + 1,
        name: name.trim(),
        category: category.trim(),
        price: price,
        quantity: quantity,
        inStock: inStock
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
});

// 3. FILTER PRODUCTS BY CATEGORY
app.get("/api/products/filter", (req, res) => {

    const category = req.query.category;

    if (typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    const filteredProducts = products.filter(
        p => p.category.toLowerCase() === category.trim().toLowerCase()
    );

    res.status(200).json(filteredProducts);
});

// 4. GET PRODUCT BY ID
app.get("/api/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
});

// 5. UPDATE PRODUCT (PUT)
app.put("/api/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (!validateProduct(req.body)) {
        return res.status(400).json({
            message: "Invalid product data"
        });
    }

    products[index] = {
        id: id,
        name: req.body.name.trim(),
        category: req.body.category.trim(),
        price: req.body.price,
        quantity: req.body.quantity,
        inStock: req.body.inStock
    };

    res.status(200).json({
        message: "Product updated successfully",
        product: products[index]
    });
});

// 6. DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(index, 1);

    res.status(200).json({
        message: "Product deleted successfully"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
