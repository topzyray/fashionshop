import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const isAuthUser = await AuthenticateUser(request);
    if (isAuthUser) {
      const data = await request.json();
      const { user } = data;

      const saveNewOrder = await Order.create(data);

      if (saveNewOrder) {
        await Cart.deleteMany({ userId: user });
        return NextResponse.json({
          success: true,
          status: 201,
          message: "Products are on the way.",
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          message: "Failed to create order. Please try again.",
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
