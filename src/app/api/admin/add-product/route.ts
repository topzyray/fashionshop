import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Product from "@/models/product";
import Joi from "joi";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export type IsAuthUserType =
  | (Jwt & JwtPayload & { role?: string })
  | false
  | undefined;

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectToDB();

    const isAuthUser: IsAuthUserType = await AuthenticateUser(request);

    if (!isAuthUser) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (isAuthUser?.role === "admin") {
      const extractData = await request.json();
      const {
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          status: 201,
          message: "New product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "Failed to add new product, please try again!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
    }
  } catch (err) {
    console.log("Error in adding new product", err);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
}
