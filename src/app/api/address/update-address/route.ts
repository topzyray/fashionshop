import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Address from "@/models/address";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();

    const isAuthUser = await AuthenticateUser(request);
    if (isAuthUser) {
      const data = await request.json();

      const { _id, fullName, address, city, country, postalCode } = data;
      const updateAddress = await Address.findOneAndUpdate(
        { _id: _id },
        { fullName, address, city, country, postalCode },
        { new: true }
      );
      if (updateAddress) {
        return NextResponse.json({
          success: true,
          status: 200,
          message: "Address updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 500,
          message: "Failed to update address. Please try again",
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
    console.log("Error", err);
    return NextResponse.json({
      success: false,
      statusl: 500,
      message: "Something went wrong. Please try again",
    });
  }
}
