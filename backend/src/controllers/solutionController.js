import { Userdsa } from "../models/SolutionModel.js";
import { getUser } from "../utils/jwt.js";
import { User } from "../models/userModel.js";
import { SolvedQuestions } from "../models/solvedquestionsModel.js";

/**
 * @desc Submit a new solution
 * @route POST /api/solution
 */
const submitSolution = async (req, res) => {
  const { questionId, solutionCode, language, approachName } = req.body;

  try {
    let user = getUser(req.cookies?.uid);
    user = await User.findById(user._doc._id);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: User not found" });
    }

    const newSolution = new Userdsa({
      questionId,
      solutionCode,
      language,
      userId: user._id,
      approachName,
    });
    await newSolution.save();

    let solvedQuestion = await SolvedQuestions.findOne({
      userId: user._id,
      question: questionId,
    });

    if (solvedQuestion) {
      solvedQuestion.solutions.push(newSolution._id);
      await solvedQuestion.save();
    } else {
      solvedQuestion = new SolvedQuestions({
        userId: user._id,
        question: questionId,
        solutions: [newSolution._id],
      });
      await solvedQuestion.save();
    }

    res.status(201).json({ msg: "Solution submitted successfully" });
  } catch (error) {
    console.error("Error submitting solution:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

/**
 * @desc Get solutions by question ID and user
 * @route GET /api/solution
 */
const getSolution = async (req, res) => {
  const { questionid: questionId } = req.headers;

  try {
    let user = getUser(req.cookies?.uid);
    user = await User.findById(user._doc._id);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: User not found" });
    }

    const solutions = await Userdsa.find({ questionId, userId: user._id });
    if (!solutions.length) {
      return res.status(404).json({ msg: "No solutions found" });
    }

    res.status(200).json(solutions);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

/**
 * @desc Get a specific solution by ID using headers
 * @route GET /api/solution/specific
 */
const getSpecificSolution = async (req, res) => {
  const { solutionid: solutionId } = req.headers;

  try {
    const solution = await Userdsa.findById(solutionId);
    if (!solution) {
      return res.status(404).json({ msg: "Solution not found" });
    }

    res.status(200).json(solution);
  } catch (error) {
    console.error("Error fetching specific solution:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

/**
 * @desc Update a specific solution using headers
 * @route PUT /api/solution/update
 */
const updateSolution = async (req, res) => {
  const { solutionid } = req.headers;
  const { language, solutionCode, approachName } = req.body;

  try {
    const updatedSolution = await Userdsa.findByIdAndUpdate(
      solutionid,
      {
        $set: { language, solutionCode, approachName },
      },
      { new: true }
    );

    if (!updatedSolution) {
      return res.status(401).json({ msg: "Solution not found" });
    }

    res
      .status(200)
      .json({ msg: "Solution updated successfully", data: updatedSolution });
  } catch (error) {
    console.error("Error updating solution:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export { submitSolution, getSolution, getSpecificSolution, updateSolution };
