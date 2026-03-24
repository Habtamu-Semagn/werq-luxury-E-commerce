import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const { contact, shipping, items, totalAmount } = req.body;

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
        res.status(500).json({ message: "Server Error processing logic.", error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching orders mapping.", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order record disconnected." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error updating manifest.", error: error.message });
    }
};
