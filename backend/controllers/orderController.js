import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const { contact, shipping, items, totalAmount } = req.body;

        // Basic validation
        if (!contact || !shipping || !items || items.length === 0 || totalAmount === undefined) {
            return res.status(400).json({ message: "Missing required order fields." });
        }

        const newOrder = new Order({
            contact,
            shipping,
            items,
            totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order processed successfully", order: savedOrder });
    } catch (error) {
        console.error("Order processing error:", error);
        res.status(500).json({ message: "Server Error matching order logic.", error: error.message });
    }
};
