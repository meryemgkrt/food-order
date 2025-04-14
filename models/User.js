import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }, // İsim 'phoneNumber' değil, 'phone' olmalı
    address: { type: String },
    job: { type: String },
    bio: { type: String },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
