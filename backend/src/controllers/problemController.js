import { Dsa } from "../models/dsaModel.js";
import { SolvedQuestions } from "../models/solvedquestionsModel.js";

/**
 * @desc Adds a new DSA problem to the database
 * @route POST /api/dsa
 */
const addDsaProblem = async (req, res) => {
  const {
    questionName,
    link,
    solutionVideoLink,
    solutionArticleLink,
    difficultyTags,
    companyTags,
    dataStructureTags,
    lists,
    description,
    platformTags,
  } = req.body;

  try {
    const existingProblem = await Dsa.findOne({ questionName });
    if (existingProblem) {
      return res.status(400).json({ msg: `Question "${questionName}" already exists.` });
    }

    const newProblem = new Dsa({
      questionName,
      link,
      solutionVideoLink,
      solutionArticleLink,
      difficultyTags,
      companyTags,
      dataStructureTags,
      lists,
      description,
      platformTags,
    });

    await newProblem.save();
    console.log(newProblem);
    res.status(201).json({ msg: "Problem added successfully." });
  } catch (error) {
    console.error("Error adding problem:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

/**
 * @desc Retrieves all DSA problems with filtering, search, and pagination
 * @route GET /api/dsa
 */
const getAllProblems = async (req, res) => {
  const { page = 1, limit = 10, filter = {}, search = "" } = req.query;
  if (filter == "") {
    filter = {};
  }
  const filterObj = JSON.parse(filter);
  let listquery = {};
  let dsquery = {};
  let compquery = {};
  let diffquery = {};
  let pltquery = {};

  if (filterObj.Platform != "") {
    pltquery = { platformTags: { $in: filterObj.Platform } };
  }
  if (filterObj.Difficulty != "") {
    diffquery = {  difficultyTags: { $in: filterObj.Difficulty } };
  }
  if (filterObj.Company != "") {
    compquery = { companyTags: { $in: filterObj.Company } };
  }
  if (filterObj.datastructure != "") {
    dsquery = { dataStructureTags: { $in: filterObj.datastructure } };
  }
  if (filterObj.list != "") {
    listquery = { lists: { $in: `${filterObj.list}` } };
  }
  const query = {
    ...compquery,
    ...listquery,
    ...dsquery,
    ...diffquery,
    ...pltquery,
    questionName: { $regex: search, $options: "i" },
  };

  console.log("queryyy", query);
  // Calculate pagination parameters
  const skip = (page - 1) * limit;

  try {
    console.log(req.query);
    const total = await Dsa.countDocuments(query); // Get total documents for pagination
    const problems = await Dsa.find(query)
      .populate("dataStructureTags")
      .populate("companyTags")
      .populate("platformTags")
      .populate("difficultyTags")
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({ problems, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};



/**
 * @desc Retrieves solved problems for a specific user
 * @route GET /api/dsa/solved
 */
const getSolvedProblems = async (req, res) => {
  const { userId } = req.query;

  try {
    const solvedQuestions = await SolvedQuestions.find({ userId }).populate("question");
    const solvedList = solvedQuestions.map((q) => q.question);

    res.status(200).json(solvedList);
  } catch (error) {
    console.error("Error fetching solved problems:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export { addDsaProblem, getAllProblems, getSolvedProblems };
