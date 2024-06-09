import connectToDB from "@/database";
import AuthenticateUser from "@/middleware/Authenticate";
import Address from "@/models/address";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const AddNewAddressValidator = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const isAuthUser = await AuthenticateUser(request);

    if (isAuthUser) {
      const addressData = await request.json();
      if (!addressData) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: "Address data is required.",
        });
      }
      const { fullName, address, city, country, postalCode, userId } =
        addressData;
      const { error } = AddNewAddressValidator.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userId,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: error.details[0].message,
        });
      }
      const newAddress = await Address.create({
        ...addressData,
      });

      if (newAddress) {
        return NextResponse.json({
          success: true,
          status: 201,
          message: "New address added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          message: "Error adding new address. Please try again.",
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
      status: 500,
      message: "Something went wrong. Please try again.",
    });
  }
}
