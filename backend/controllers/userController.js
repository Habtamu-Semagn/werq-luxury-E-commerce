import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(res, user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token
            });
        } else {
            res.status(401).json({ message: "Invalid email or master password." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User identity already exists inside the database." });
        }

        const user = await User.create({
            name,
            email,
            password,
            isAdmin: isAdmin || false
        });

        if (user) {
            const token = generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token
            });
        } else {
            res.status(400).json({ message: "Invalid user data properties." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
