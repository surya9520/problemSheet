import { Router } from "express";
import { getAllUsers, updateUser } from "../controllers/adminControllers.js";

const adminRouter = Router();

/**
 * @desc Get all users
 * @route GET /api/admin/users
 * @access Admin
 */
adminRouter.get('/users', getAllUsers);

/**
 * @desc Update a user's role
 * @route PUT /api/admin/users/:id/role
 * @access Admin
 */
adminRouter.put('/users/:id/role', updateUser);

export { adminRouter };
