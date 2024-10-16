import { Schema, model } from 'mongoose';

const difficultyTagSchema = new Schema({
  level: {
    type: String,
    enum: ['easy', 'medium', 'hard'], // Predefined difficulty levels
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, { timestamps: true });

const DifficultyTag = model('DifficultyTag', difficultyTagSchema);
export default DifficultyTag;