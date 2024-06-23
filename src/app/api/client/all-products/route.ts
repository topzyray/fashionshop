import connectToDB from "@/database";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
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
  } catch (err) {
    console.log("Error in fetching product", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
}
