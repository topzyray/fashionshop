import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Order from "@/models/order";
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
          message: "Order ID is required.",
        });
      }

      const extractOrderDetails = await Order.findById(id).populate({
        path: "orderItems.product",
        model: "Product",
      });

      if (extractOrderDetails) {
        return NextResponse.json({
          success: true,
          status: 200,
          data: extractOrderDetails,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "Failed to get order details. Please try again.",
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
    console.log(err);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
}
