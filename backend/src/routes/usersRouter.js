import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const userRouter = Router();

/**
 * @desc Register a new user
 * @route POST /users/signup
 */
userRouter.post('/signup', registerUser);

/**
 * @desc Login a user
 * @route POST /users/login
 */
userRouter.post('/login', loginUser);

export { userRouter };
