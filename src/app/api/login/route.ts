import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Connect to database
  await connectToDB();
  const { email, password } = await request.json();

  //   Validation schema
  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check user already exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "User not found.",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: checkUser._id, email: checkUser?.email, role: checkUser?.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const finalData = {
      token,
      user: {
        _id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Login successful.",
      data: finalData,
    });
  } catch (err) {
    console.log("Error in new user registration");
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
}
