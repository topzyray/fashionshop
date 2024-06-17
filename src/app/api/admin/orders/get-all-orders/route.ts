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
        // const { searchParams } = new URL(request.url);
        // const id = searchParams.get("id");

        const extractAllOrdersForAllUsers = await Order.find({})
          .populate({
            path: "orderItems.product",
            model: "Product",
          })
          .populate("user", "_id name email role createdAt updatedAt"); // This line filters out what field to return

        if (extractAllOrdersForAllUsers) {
          return NextResponse.json({
            success: true,
            status: 200,
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
