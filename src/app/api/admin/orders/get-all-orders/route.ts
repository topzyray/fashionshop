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
      if (isAuthUser && isAuthUser?.role === "admin") {
        const extractAllOrdersForAllUsers = await Order.find({})
          .populate("user", "-password")
          .populate("orderItems.product")
          .populate("processedBy", "name _id");

        if (extractAllOrdersForAllUsers) {
          return NextResponse.json({
            success: true,
            status: 200,
            message: "All orders for all user fetched successfully",
            documentCount: extractAllOrdersForAllUsers.length,
            data: extractAllOrdersForAllUsers,
          });
        } else {
          return NextResponse.json({
            success: false,
            status: 404,
            message: "Failed to get Orders. Please try again.",
          });
        }
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          message: "You are not authorized.",
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
      message: "Something went wrong. Please try again.",
    });
  }
}
