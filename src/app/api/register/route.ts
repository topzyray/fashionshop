import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .pattern(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain a uppercase, a lowercase, a number and minimum of 8 characters"
    )
    .required(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Connect to database
  await connectToDB();
  const { name, email, password } = await request.json();

  //   Validation schema
  const { error } = schema.validate({ name, email, password });

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
        role: "customer",
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
