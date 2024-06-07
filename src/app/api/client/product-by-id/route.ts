import connectToDB from "@/database";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Product Id is required.",
      });
    }

    const response = await Product.find({ _id: id });
    if (response && response.length) {
      return NextResponse.json({
        success: true,
        status: 200,
        data: response[0],
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 404,
        message: `No products with the category of ${id}.`,
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
