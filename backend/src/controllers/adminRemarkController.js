import { AdminRemark } from "../models/adminRemarkModel.js";
import { getUser } from "../utils/jwt.js";

/**
 * @desc Post a remark by a mentor/admin
 * @route POST /api/admin/remarks
 * @access Admin/Mentor (Requires Login)
 */
const postRemark = async (req, res) => {
  const token = req.cookies?.uid; // Extract token from cookies
  const { remark, solutionId, userId } = req.body;

  try {
    if (token) {
      const mentor = getUser(token); // Extract mentor info from token
      const mentorId = mentor._doc._id;

      const adminRemark = new AdminRemark({
        remark,
        mentorId,
        solutionId,
        userId,
      });

      await adminRemark.save();
      res.status(200).json({ msg: "Remark sent successfully" });
    } else {
      res.status(401).json({ msg: "Please log in first" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

/**
 * @desc Get a specific remark by solution ID
 * @route GET /api/admin/remarks/:solutionId
 * @access Public
 */
const getRemark = async (req, res) => {
  const { solutionId } = req.params; // Extract solution ID from params

  try {
    const review = await AdminRemark.findOne({ solutionId });

    if (!review) {
      return res.status(404).json({ msg: "Remark not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

/**
 * @desc Update an existing remark
 * @route PUT /api/admin/remarks/
 * @access Admin/Mentor (Requires Login)
 */
const updateRemark = async (req, res) => {
  const token = req.cookies?.uid; // Extract token from cookies
  const { remark, solutionId } = req.body; // New remark from request body

  try {
    if (token) {
      const mentor = getUser(token); // Extract mentor info from token
      const mentorId = mentor._doc._id;

      const updatedRemark = await AdminRemark.findOneAndUpdate(
        { solutionId },
        { $set: { mentorId, remark } },
        { new: true }
      );

      if (!updatedRemark) {
        return res.status(404).json({ msg: "Solution not found" });
      }

      res.status(200).json({ msg: "Remark updated successfully" });
    } else {
      res.status(401).json({ msg: "Please log in first" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export { postRemark, getRemark, updateRemark };
