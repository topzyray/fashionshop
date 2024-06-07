import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { IsAuthUserType } from "../add-product/route";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const isAuthUser: IsAuthUserType = await AuthenticateUser(request);

    if (!isAuthUser) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (isAuthUser?.role === "admin") {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to deleted the product. Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
    }
  } catch (err) {
    console.log("Error in fetching product", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
}
