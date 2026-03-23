import express from "express";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();

// GET /api/products
// Handles query filtering like ?category=bags
router.get("/", getProducts);

export default router;
