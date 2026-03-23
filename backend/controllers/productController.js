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
