export const dynamic = "force-dynamic";

import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Cart from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
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
          message: "Cart item Id is required.",
        });
      }

      const deletedCartItem = await Cart.findByIdAndDelete(id);
      if (deletedCartItem) {
        return NextResponse.json({
          success: true,
          status: 200,
          message: "Cart item deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 500,
          message: "Failed to delete the cart item. Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "You are not authorized to perform this action.",
      });
    }
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong. Please try again.",
    });
  }
}
