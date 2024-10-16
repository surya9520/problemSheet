import { Router } from "express";
import {
  submitSolution,
  getSolution,
  getSpecificSolution,
  updateSolution,
} from "../controllers/solutionController.js";

const solutionRouter = Router();

// Route to submit a solution
solutionRouter.post("/", submitSolution);

// Route to get solutions by question and user
solutionRouter.get("/", getSolution);

// Route to get a specific solution (using headers)
solutionRouter.get("/specific", getSpecificSolution);

// Route to update a solution (using headers)
solutionRouter.put("/update", updateSolution);

export { solutionRouter };
