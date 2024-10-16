import { Router } from "express";
import { 
    createCompany, 
    createComplexity, 
    createDataStructure, 
    createPlatform, 
    getCompanies, 
    getComplexity, 
    getDataStructures, 
    getPlatforms 
} from "../controllers/tagControllers.js";

const tagRouter = Router();

// Routes for Complexity Tags
tagRouter.post('/complexities', createComplexity); // Create a new complexity
tagRouter.get('/complexities', getComplexity);     // Get all complexities

// Routes for Data Structure Tags
tagRouter.post('/datastructures', createDataStructure); // Create a new data structure
tagRouter.get('/datastructures', getDataStructures);    // Get all data structures

// Routes for Company Tags
tagRouter.post('/companies', createCompany);  // Create a new company tag
tagRouter.get('/companies', getCompanies);    // Get all company tags

// Routes for Platform Tags
tagRouter.post('/platforms', createPlatform); // Create a new platform tag
tagRouter.get('/platforms', getPlatforms);    // Get all platform tags

export { tagRouter };
