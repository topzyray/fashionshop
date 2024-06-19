import connectToDB from "@/database";
import Newsletter from "@/models/newsletter";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const ValidateNewsletter = Joi.object({
  email: Joi.string()
    .email()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email"
    )
    .required(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const data = await request.json();
    const { error } = ValidateNewsletter.validate(data);

    if (error) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: error.details[0].message,
      });
    }

    const newsletterExists = await Newsletter.findOne(data);
    if (newsletterExists) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Newsletter already exists. Please try again",
      });
    }

    const newsletter = await Newsletter.create(data);

    if (newsletter) {
      return NextResponse.json({
        success: true,
        status: 201,
        message: "Newsletter added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Failed to add newsletter. Please try again",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
}
