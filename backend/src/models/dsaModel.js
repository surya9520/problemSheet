import { mongoose, Schema, Types } from "mongoose";

// Define the schema for Data Structures and Algorithms (DSA) questions
const dsaSchema = new Schema(
  {
    // Name of the question
    questionName: {
      type: String, // The field type is String
      required: true, // This field is mandatory
    },
    
    // Link to the question (e.g., LeetCode, HackerRank)
    link: {
      type: String, // The field type is String
      required: true, // This field is mandatory
    },
    
    // Optional link to a solution video
    solutionVideoLink: {
      type: String, // The field type is String
    },
    
    // Optional link to a solution article
    solutionArticleLink: {
      type: String, // The field type is String
    },
    
    // Indicates if the question is among the top questions
    intop: {
      type: Boolean, // The field type is Boolean
      default: false, // Default value is false
    },
    
    // Array of references to the List schema
    lists: [
      {
        type: Types.ObjectId, // The field type is ObjectId
        ref: "List", // Reference to List schema
      },
    ],
    
    // Array of references to the DataStructureTag schema
    dataStructureTags: [
      {
        type: Types.ObjectId, // The field type is ObjectId
        ref: "DataStructureTag", // Reference to DataStructureTag schema
      },
    ],
    
    // Array of references to the CompanyTag schema
    companyTags: [
      {
        type: Types.ObjectId, // The field type is ObjectId
        ref: "CompanyTag", // Reference to CompanyTag schema
      }, 
    ],
    
    // Array of references to the DifficultyTag schema
    difficultyTags: [
      {
        type: Types.ObjectId, // The field type is ObjectId
        ref: "DifficultyTag", // Reference to DifficultyTag schema
        required: true, // Difficulty is mandatory
      },
    ],
    
    // Array of references to the PlatformTag schema
    platformTags: [
      {
        type: Types.ObjectId, // The field type is ObjectId
        ref: "PlatformTag", // Reference to PlatformTag schema
      },
    ],
  
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Dsa model based on the schema
const Dsa = mongoose.model("Dsa", dsaSchema);

export { Dsa };
