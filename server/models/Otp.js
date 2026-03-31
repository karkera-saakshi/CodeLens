import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, index: true },
  otp: { type: String, required: true },  // stored hashed
  purpose: { type: String, enum: ["signup", "forgot-password"], required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }  // TTL 10 minutes
});

export default mongoose.model("Otp", otpSchema);
