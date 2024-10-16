import { mongoose, Schema } from "mongoose";

// Define the schema for tracking solved questions by users
const solvedquestionsSchema = new Schema(
  {
    // Reference to the user who solved the question
    userId: {
      type: Schema.Types.ObjectId, // The field type is ObjectId
      ref: "User", // Reference to the User model
      required: true, // This field is mandatory
    },
    
    // Reference to the question that has been solved
    question: {
      type: Schema.Types.ObjectId, // The field type is ObjectId
      ref: "Dsa", // Reference to the Dsa model (Data Structures and Algorithms)
      required: true, // This field is mandatory
    },
    
    // Array of solutions associated with this solved question
    solution: [
      {
        type: Schema.Types.ObjectId, // Each solution is represented by an ObjectId
        ref: "Userdsa", // Reference to the Userdsa model
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or retrieve the SolvedQuestions model
const SolvedQuestions = mongoose.models.SolvedQuestions || mongoose.model(
  "SolvedQuestions",
  solvedquestionsSchema
);

// Export the SolvedQuestions model for use in other parts of the application
export { SolvedQuestions };
