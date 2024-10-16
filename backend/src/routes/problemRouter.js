import { Router } from "express";
import { addDsaProblem, getAllProblems, getSolvedProblems } from "../controllers/problemController.js";



const problemRouter = Router();  // Renamed for clarity

// Route to add a new problem
problemRouter.post("/", addDsaProblem);

// Route to get all problems with filtering, search, and pagination
problemRouter.get("/", getAllProblems);

// Route to get solved problems for a specific user
problemRouter.get("/solved", getSolvedProblems);

export { problemRouter };
