import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  whatsappJoined: { type: Boolean, default: false },
   whatsappJoinedAt: { type: Date },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);