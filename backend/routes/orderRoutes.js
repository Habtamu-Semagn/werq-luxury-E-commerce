import express from "express";
import { createOrder, getOrders, updateOrderStatus, getOrderById } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Checkout Portal
router.post("/", createOrder);

// Super-User Order Manifests
router.get("/", protect, admin, getOrders);
router.get("/:id", protect, admin, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
