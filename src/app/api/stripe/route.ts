import AuthenticateUser from "@/middleware/Authenticate";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const dynamic = "force-dynamic";

export async function POST(response: NextRequest) {
  try {
    const isAuthUser = await AuthenticateUser(response);
    if (isAuthUser) {
      const res = await response.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url:
          `${process.env.NEXT_PUBLIC_HOST_URL}/checkout` + "?status=success",
        cancel_url:
          `${process.env.NEXT_PUBLIC_HOST_URL}/checkout` + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
