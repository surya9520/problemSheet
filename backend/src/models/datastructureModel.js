import { Schema, model } from "mongoose";

// Define the schema for data structure tags
const dataStructureTagSchema = new Schema(
  {
    // The name of the data structure tag
    name: {
      type: String, // The field type is String
      required: true, // This field is mandatory
      unique: true, // Each tag name must be unique
      trim: true, // Removes leading and trailing whitespace from the string
    },
    
    // An optional description for the tag
    description: {
      type: String, // The field type is String
      required: false, // This field is optional
      trim: true, // Removes leading and trailing whitespace from the string
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the DataStructureTag model based on the schema
const DataStructureTag = model("DataStructureTag", dataStructureTagSchema);
export default DataStructureTag;
