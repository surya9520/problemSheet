// Import necessary models for handling database operations
import DifficultyTag from "../models/complexityModel.js";
import DataStructureTag from "../models/datastructureModel.js";
import CompanyTag from "../models/companyModel.js";
import PlatformTag from "../models/platformModel.js";

/**
 * @desc Create a new difficulty tag
 * @route POST /api/admin/tags/complexities
 * @access Admin
 */
const createComplexity = async (req, res) => {
    const { level } = req.body;
    try {
        const difficulty = new DifficultyTag({ level });
        await difficulty.save();
        res.status(201).json(difficulty); // Changed status code to 201 for resource creation
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
};

/**
 * @desc Get all difficulty tags
 * @route GET /api/admin/tags/complexities
 * @access Public
 */
const getComplexity = async (req, res) => {
    try {
        const complexityTags = await DifficultyTag.find();
        res.status(200).json(complexityTags);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
};

/**
 * @desc Create a new data structure tag
 * @route POST /api/admin/tags/datastructures
 * @access Admin
 */
const createDataStructure = async (req, res) => {
    const { name } = req.body;
    try {
        const dataStructure = new DataStructureTag({ name });
        await dataStructure.save();
        res.status(201).json(dataStructure); // Changed status code to 201 for resource creation
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
};

/**
 * @desc Get all data structure tags
 * @route GET /api/admin/tags/datastructures
 * @access Public
 */
const getDataStructures = async (req, res) => {
    try {
        const dataStructures = await DataStructureTag.find();
        res.status(200).json(dataStructures);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
};

/**
 * @desc Create a new company tag
 * @route POST /api/admin/tags/companies
 * @access Admin
 */
const createCompany = async (req, res) => {
    console.log(req.body)
    const { name } = req.body;
 
    try {
        const companyTag = new CompanyTag({ name });
        await companyTag.save();
        res.status(201).json(companyTag); // Changed status code to 201 for resource creation
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", error });
    }
};

/**
 * @desc Get all company tags
 * @route GET /api/admin/tags/companies
 * @access Public
 */
const getCompanies = async (req, res) => {
    try {
        const companies = await CompanyTag.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
};

/**
 * @desc Create a new platform tag
 * @route POST /api/admin/tags/platforms
 * @access Admin
 */
const createPlatform = async (req, res) => {
    const { name } = req.body;
    try {
        const platform = new PlatformTag({ name });
        await platform.save();
        res.status(201).json(platform); // Changed status code to 201 for resource creation
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
};

/**
 * @desc Get all platform tags
 * @route GET /api/admin/tags/platforms
 * @access Public
 */
const getPlatforms = async (req, res) => {
    try {
        const platforms = await PlatformTag.find();
        res.status(200).json(platforms);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
};

// Export all controller functions to be used in routes
export {
    createComplexity,
    getComplexity,
    createDataStructure,
    getDataStructures,
    createCompany,
    getCompanies,
    createPlatform,
    getPlatforms,
};
