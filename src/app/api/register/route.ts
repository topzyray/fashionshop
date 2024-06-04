import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Connect to database
  await connectToDB();
  const { name, email, password, role } = await request.json();

  //   Validation schema
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check user already exists
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User already exists. Please try with a different email.",
      });
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (newUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully.",
        });
      }
    }
  } catch (err) {
    console.log("Error in new user registration");
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
}
