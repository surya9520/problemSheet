import { Router } from "express";
import { getRemark, postRemark, updateRemark } from "../controllers/adminRemarkController.js";

const adminRemarkRouter = Router();

// Route to post a new remark
adminRemarkRouter.post('/', postRemark);

// Route to get a remark by solutionId (using route parameter)
adminRemarkRouter.get('/:solutionId', getRemark);

// Route to update a remark (using solutionId from request body)
adminRemarkRouter.put('/', updateRemark);

export { adminRemarkRouter };
