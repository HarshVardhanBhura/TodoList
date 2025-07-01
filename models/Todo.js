import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TodoSchema = new Schema({
  userId: { type: String, required: true }, // Clerk user ID
  todo: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: false },
  reminder: {
    type: Date, // <-- stores both date and time
    default: null,
  },
  reminderSent: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const Todo = mongoose.models.Todo || model("Todo", TodoSchema);