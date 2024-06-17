import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();
    const isAuthUser = await AuthenticateUser(request);
    const data = request.json();

    if (isAuthUser) {
      if (isAuthUser && isAuthUser?.role === "admin") {
        const {
          _id,
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        } = data;

        const updateOrder = await Order.findOneAndUpdate(
          { _id: _id },
          {
            shippingAddress,
            orderItems,
            paymentMethod,
            isPaid,
            paidAt,
            isProcessing,
          },
          {
            new: true,
          }
        );

        if (updateOrder) {
          return NextResponse.json({
            success: true,
            status: 200,
            message: "Order status updated successfully.",
          });
        } else {
          return NextResponse.json({
            success: false,
            status: 404,
            message: "Failed to update status of the order. Please try again.",
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
