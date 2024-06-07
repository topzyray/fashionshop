import jwt from "jsonwebtoken";

import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const AuthenticateUser = async (request: NextRequest) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }

  try {
    const decodeAuthtUserInfo = jwt.verify(token, process.env.JWT_SECRET);
    return decodeAuthtUserInfo;
  } catch (err) {
    console.log("Error: " + err);
  }
};

export default AuthenticateUser;
