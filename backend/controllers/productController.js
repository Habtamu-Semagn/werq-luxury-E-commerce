import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const query = {};
        if (req.query.category && req.query.category !== "all") {
            query.category = req.query.category;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found inside luxury catalog." });
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by id:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, images } = req.body;
        const product = new Product({
            name: name || "Sample Luxury Artifact",
            price: price || 0,
            description: description || "A placeholder piece ready for your precise bespoke curation.",
            category: category || "leather",
            stock: stock || 0,
            images: images || ["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"]
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error creating placeholder artifact", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, images } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            product.images = images || product.images;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Artifact not located within the vault." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error updating artifact metadata.", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: "Artifact permanently removed from the master catalog." });
        } else {
            res.status(404).json({ message: "Artifact missing or previously deleted." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error executing catalog deletion.", error: error.message });
    }
};
