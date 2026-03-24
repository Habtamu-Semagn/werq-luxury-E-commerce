import express from "express";
import { authUser, registerUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);

export default router;
