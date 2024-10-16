import { User } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { setUser } from "../utils/jwt.js";

/**
 * @desc Register a new user (Sign up)
 * @route POST /users/signup
 * @access Public
 */
const registerUser = async (req, res) => {
  const { firstname, lastname, phone, email, password } = req.body;

  try {
    // Check if a user with the same email or phone already exists
    let existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user with hashed password
    const user = new User({
      firstname,
      lastname,
      phone,
      email,
      password: await hashPassword(password),
    });

    await user.save();
    console.log("User registered:", user);

    // Generate JWT token and set it in cookies
    const token = setUser(user);
    res.cookie("uid", token, { httpOnly: true, sameSite: "Lax" });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (error) {
    console.error("Error in registering user:", error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

/**
 * @desc Login an existing user
 * @route POST /users/login
 * @access Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User is not registered" });
    }

    // Verify the password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token and set it in cookies
    const token = setUser(user);
    console.log("Login token:", token);

    res.cookie("uid", token, {
      httpOnly: true,
      sameSite: "Lax", // CSRF protection
      secure: false, // Use `true` for production (HTTPS)
      path: "/",
    });

    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export { registerUser, loginUser };
