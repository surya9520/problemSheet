import { getUser } from "../utils/jwt.js";
import { User } from "../models/userModel.js";

/**
 * @desc Middleware to check if the user is an admin
 * @route POST /api/your-route
 */
const checkAdmin = async (req, res, next) => {
  const uid = req.cookies?.uid;

  // Only proceed if the request method is POST
  if (req.method !== "POST") {
    return next(); // If it's not a POST request, just move to the next middleware
  }

  if (!uid) {
    return res.status(401).json({ msg: "Login first" });
  }

  try {
    const userPayload = getUser(uid);
    if (!userPayload) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    const user = await User.findById(userPayload._doc._id);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if the user role is admin
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }
    req.user = user; // Attach user to request object for downstream use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking admin status:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export { checkAdmin };
