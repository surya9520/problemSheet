import { mongoose, Schema } from "mongoose";

// Define the schema for user-submitted data structures and algorithms solutions
const userDsaSchema = new Schema({
  // Name of the approach taken by the user to solve the question
  approachName: {
    type: String, // The field type is String
    required: true, // This field is mandatory
  },
  
  // Reference to the user who submitted the solution
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Field type is ObjectId
    ref: 'User', // Reference to the User model
    required: true, // This field is mandatory
  },
  
  // Reference to the question being solved
  questionId: {
    type: mongoose.Schema.Types.ObjectId, // Field type is ObjectId
    ref: 'Dsa', // Reference to the Dsa model (Data Structures and Algorithms)
    required: true, // This field is mandatory
  },
  
  // The actual code solution submitted by the user
  solutionCode: {
    type: String, // The field type is String
    required: true, // This field is mandatory
  },
  
  // Programming language used for the solution
  language: {
    type: String, // The field type is String
    required: true, // This field is mandatory
    enum: ['JavaScript', 'Python', 'C++', 'Java'], // Allowed values for this field
  },
});

// Create and export the Userdsa model based on the schema
const Userdsa = mongoose.model('Userdsa', userDsaSchema);
export { Userdsa };
