import { model, Schema } from "mongoose";

// Define the schema for lists
const listSchema = new Schema({
  // Name of the list
  listName: {
    type: String, // The field type is String
    required: true, // This field is mandatory
  },
  
  // Reference to the User who created the list
  createdBy: {
    type: Schema.Types.ObjectId, // The field type is ObjectId
    ref: 'User', // Reference to the User schema
    required: true, // This field is mandatory
  },
  
  // A mixed field that can hold any type of data
  mixedField: {
    type: Schema.Types.Mixed, // The field type can be any data type
    required: false, // This field is optional
  },
});

// Create and export the List model based on the schema
const List = model('List', listSchema);
export { List };
