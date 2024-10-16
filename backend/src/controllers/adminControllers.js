import { User } from "../models/userModel.js"; // Import User model

/**
 * @desc Get all users
 * @route GET /api/admin/users
 * @access Admin
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    if (!users.length) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json(users); // Send the users as JSON
  } catch (error) {
    console.error("Error fetching users:", error); // Log error for debugging
    res.status(500).json({ msg: "Internal server error" });
  }
};

/**
 * @desc Update a user's role
 * @route PUT /api/admin/users/:id/role
 * @access Admin
 */
const updateUser = async (req, res) => {
  const userId = req.params.id; // Get user ID from URL params
  const { role } = req.body; // Get new role from request body

  console.log("Updating user:", userId, "New Role:", role); // Debugging log

  try {
    const user = await User.findById(userId); // Check if the user exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user's role
    user.role = role;
    await user.save();

    res.status(200).json({ msg: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error); // Log error for debugging
    res.status(500).json({ msg: "Internal server error" });
  }
};

export { getAllUsers, updateUser };
