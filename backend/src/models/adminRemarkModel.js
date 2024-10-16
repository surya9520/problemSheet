import { model, Schema } from "mongoose";

// Define the schema for admin remarks on solutions
const adminRemarkSchema = new Schema(
  {
    // Reference to the solution being commented on
    solutionId: {
      type: Schema.Types.ObjectId, // ObjectId type to reference the userdsa collection
      ref: "userdsa", // The model that this field references
      required: true, // This field is required
    },
    
    // Reference to the mentor providing the remark
    mentorId: {
      type: Schema.Types.ObjectId, // ObjectId type to reference the User collection
      ref: "User", // The model that this field references
      required: true, // This field is required
    },
    
    // Reference to the user who owns the solution
    userId: {
      type: Schema.Types.ObjectId, // ObjectId type to reference the User collection
      ref: "User", // The model that this field references
      required: true, // This field is required
    },
    
    // The remark or comment made by the mentor
    remark: {
      type: String, // String type for the content of the remark
      required: true, // This field is required
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the model based on the adminRemark schema
export const AdminRemark = model("adminRemark", adminRemarkSchema);
