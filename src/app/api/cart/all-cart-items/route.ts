import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Cart from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const isAuthUser = await AuthenticateUser(request);
    if (isAuthUser) {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: "Please login to continue.",
        });
      }

      const extractAllCartItems = await Cart.find({ userID: id })
        .populate("userID")
        .populate("productID");

      if (extractAllCartItems) {
        return NextResponse.json({
          success: true,
          status: 200,
          data: extractAllCartItems,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "No cart items found.",
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
    console.log("Error in fetching product", err);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong. Please try again.",
    });
  }
}
