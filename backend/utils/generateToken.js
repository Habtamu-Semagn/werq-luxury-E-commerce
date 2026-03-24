import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    // Generates a stateless JWT mapping the internal MongoDB user payload.
    // Bypasses cookies to remain strictly RESTful returning to Next.js Zustand.
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "fallback_secret_for_werq_luxury", {
        expiresIn: "30d"
    });

    return token;
};

export default generateToken;
