import { Schema, model } from 'mongoose';

// Define the schema for company tags
const companyTagSchema = new Schema({
  // The name of the company tag
  name: {
    type: String, // Type of the field is String
    required: true, // This field is required
    unique: true, // Each company name should be unique
    trim: true, // Trims whitespace from both ends of the string
  },
  
  // An optional description of the company
  description: {
    type: String, // Type of the field is String
    required: false, // This field is optional
    trim: true, // Trims whitespace from both ends of the string
  }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create and export the CompanyTag model based on the companyTag schema
const CompanyTag = model('CompanyTag', companyTagSchema);
export default CompanyTag;
