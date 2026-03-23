import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category) {
            // Case-insensitive regex match for category
            query.category = { $regex: new RegExp(category, "i") };
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
