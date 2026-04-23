import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    // Explicitly scan the Header matrices for Bearer identifiers.
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // Decode the payload specifically isolating the injected User ID.
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_for_werq_luxury");

            // Attach securely validated full User profile without transmitting password hash.
            req.user = await User.findById(decoded.userId).select("-password");
            return next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Not authorized, token architecture failed." });
        }
    }

    return res.status(401).json({ message: "Not authorized, native token omitted." });
};

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized mechanically as an elevated administrator." });
    }
};
