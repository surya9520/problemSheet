import { User } from "../models/userModel.js";
import { getUser } from "../utils/jwt.js";

/**
 * @desc Middleware to verify user authentication
 * @route /api/admin
 */
const verifiedUser = async (req, res, next) => {
  const uid = req.cookies?.uid;

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
      return res.status(400).json({ msg: "Wrong token" });
    }

    req.user = user; // Attach user to request object for downstream use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export { verifiedUser };
