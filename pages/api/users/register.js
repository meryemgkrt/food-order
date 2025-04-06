// pages/api/users/register.js

import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const body = req.body;

  try {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = new User({
      fullName: body.fullName, // ✅ modelle uyumlu
      email: body.email,
      password: hashedPassword,
      // confirmPassword eklemene gerek yok
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
