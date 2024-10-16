import { List } from "../models/listModel.js";
import { getUser } from "../utils/jwt.js";

/**
 * @desc Create a new list
 * @route POST /api/lists
 */
const createList = async (req, res) => {
  const token = req.cookies?.uid;
  const { name } = req.body;
  console.log(req.body);

  try {
    const createdBy = getUser(token)._doc._id;
    const newList = new List({ listName: name, createdBy });

    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

/**
 * @desc Get all lists
 * @route GET /api/lists
 */
const getLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export { createList, getLists };
