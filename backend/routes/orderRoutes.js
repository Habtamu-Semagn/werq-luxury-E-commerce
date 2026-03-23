import express from "express";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

// POST /api/orders
// Receive checkout payloads and persist to MongoDB
router.post("/", createOrder);

export default router;
