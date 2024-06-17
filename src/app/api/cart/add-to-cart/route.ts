import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const AddToCartSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const isAuthUser = await AuthenticateUser(request);
    if (isAuthUser) {
      const data = await request.json();

      if (!data) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: "No data found. Please input cart data to continue.",
        });
      }

      const { userId, productId } = data;

      const { error } = AddToCartSchema.validate({ userId, productId });
      if (error) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: error.details[0].message,
        });
      }

      const isCurrentCartAreadyExist = await Cart.findOne({
        productId: productId,
        userId: userId,
      });

      if (isCurrentCartAreadyExist) {
        return NextResponse.json({
          success: false,
          status: 400,
          message:
            "Product is already in cart. Please add a different product.",
        });
      }

      const savedProductToCart = await Cart.create({
        productId: productId,
        userId: userId,
      });

      if (savedProductToCart) {
        return NextResponse.json({
          success: true,
          status: 201,
          message: "Product added to cart successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 400,
          message: "Failed to add product to cart. Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "You are not authenticated.",
      });
    }
  } catch (err) {
    console.log("Error in adding product to cart", err);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
}
