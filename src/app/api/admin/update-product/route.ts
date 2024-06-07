import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { IsAuthUserType } from "../add-product/route";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();

    const isAuthUser: IsAuthUserType = await AuthenticateUser(request);

    if (!isAuthUser) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (isAuthUser.role === "admin") {
      const extractData = await request.json();
      const {
        _id,
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractData;

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: _id },
        {
          name,
          description,
          price,
          category,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        { new: true }
      );

      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product updated successfully",
          updatedProduct: updatedProduct,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update product. Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
    }
  } catch (err) {
    console.log("Error in fetching product", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
}
