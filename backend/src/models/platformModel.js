import { Schema, model } from 'mongoose';

// Define the schema for platform tags
const platformTagSchema = new Schema({
  // Name of the platform tag
  name: {
    type: String, // The field type is String
    required: true, // This field is mandatory
    unique: true, // Each platform tag name must be unique
    trim: true, // Removes leading and trailing whitespace
  },
  
  // Optional description of the platform tag
  description: {
    type: String, // The field type is String
    required: false, // This field is optional
    trim: true, // Removes leading and trailing whitespace
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the PlatformTag model based on the schema
const PlatformTag = model('PlatformTag', platformTagSchema);
export default PlatformTag;
