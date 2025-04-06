import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    job: { type: String },
    password: { type: String, required: true },
    // confirmPassword kaldırıldı
    emailVerified: { type: Boolean, default: null },
  },
  { timestamps: true }
);



export default mongoose.models.User || mongoose.model("User", userSchema);
