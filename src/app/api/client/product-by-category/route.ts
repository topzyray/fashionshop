import connectToDB from "@/database";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    if (!category) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Category is required.",
      });
    }

    const response = await Product.find({ category: category });
    if (response.length > 0) {
      return NextResponse.json({
        success: true,
        status: 200,
        productsCount: response.length,
        data: response,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 404,
        message: `No products with the category of ${category}.`,
      });
    }
  } catch (err) {
    console.log("Error in fetching product", err);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
}
