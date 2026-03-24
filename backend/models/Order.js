import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    contact: {
        email: { type: String, required: true },
        phone: { type: String }
    },
    shipping: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        lat: { type: Number },
        lng: { type: Number }
    },
    items: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            imageUrl: { type: String },
            category: { type: String }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered"],
        default: "Pending"
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
