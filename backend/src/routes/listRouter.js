import { Router } from "express";
import { createList, getLists } from "../controllers/listController.js";

const listRouter = Router();

// Route to create a new list
listRouter.post("/", createList);

// Route to get all lists
listRouter.get("/", getLists);

export { listRouter };
