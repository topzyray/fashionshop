import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Address from "@/models/address";
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
        message: "Please user Id to continue.",
      });
    }

    const isAuthUser = await AuthenticateUser(request);

    if (isAuthUser) {
      const getAllAddress = await Address.find({ userId: id });

      if (getAllAddress) {
        return NextResponse.json({
          success: true,
          status: 200,
          data: getAllAddress,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "Failed to get addresses. Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Please login to continue.",
      });
    }
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json({
      success: false,
      statusl: 500,
      message: "Something went wrong. Please try again",
    });
  }
}
