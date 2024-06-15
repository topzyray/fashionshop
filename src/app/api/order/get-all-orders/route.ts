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

      const extractAllOrders = await Order.find({ user: id }).populate({
        path: "orderItems.product",
        model: "Product",
      });

      if (extractAllOrders) {
        return NextResponse.json({
          success: true,
          status: 200,
          data: extractAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "Failed to get Order. Please try again.",
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
