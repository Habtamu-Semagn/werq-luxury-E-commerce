import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.json({ message: "Backend API is running" });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Database connection and Server startup
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/werq")
    .then(() => {
        console.log("Connected to MongoDB via Mongoose");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });