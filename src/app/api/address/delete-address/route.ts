import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Address from "@/models/address";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
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
    if (!isAuthUser) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Please login to continue.",
      });
    }
    const deleteAddress = await Address.findByIdAndDelete(id);
    if (deleteAddress) {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Address deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 500,
        message: "Failed to delete the address. Please try again",
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
