// import { getJwtSecretKey } from "@/utils/constants";
import { UserJwtPayload, verifyAuth } from "@/utils/jwtAuth";
// import { jwtVerify } from "jose";

import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const AuthenticateUser = async (request: NextRequest) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return false;
  }

  try {
    const decodeAuthtUserInfo = await verifyAuth(request);
    return decodeAuthtUserInfo as UserJwtPayload;
  } catch (err) {
    console.log("Error: " + err);
  }
};

export default AuthenticateUser;
