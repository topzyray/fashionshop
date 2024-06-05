import connectToDB from "@/database";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  await connectToDB();
  try {
    const user = "admin";
    if (user === "admin") {
      const allProducts = await Product.find({});
      if (allProducts) {
        return NextResponse.json({
          success: true,
          productsCount: allProducts.length,
          data: allProducts,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No products found.",
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
