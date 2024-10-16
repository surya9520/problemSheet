import mongoose, { Schema } from "mongoose";

// Define the schema for the User model
const userSchema = new Schema(
  {
    // First name of the user
    firstname: {
      type: String, // The field type is String
      required: true, // This field is mandatory
    },
    
    // Last name of the user (optional)
    lastname: {
      type: String, // The field type is String
    },
    
    // Phone number of the user
    phone: {
      type: String, // The field type is String
      required: true, // This field is mandatory
      unique: true, // Each phone number must be unique
    },
    
    // Email address of the user
    email: {
      type: String, // The field type is String
      required: true, // This field is mandatory
      unique: true, // Each email address must be unique
    },
    
    // Password for the user's account
    password: {
      type: String, // The field type is String
      required: true, // This field is mandatory
    },
    
    // Role of the user in the system
    role: {
      type: String, // The field type is String
      enum: ["student", "intern", "manager", "admin", "employee"], // Limited to these values
      default: "student", // Default role is 'student'
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or retrieve the User model
const User = mongoose.models.user || mongoose.model("user", userSchema);

// Export the User model for use in other parts of the application
export { User };
