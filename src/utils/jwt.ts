import jwt from "jsonwebtoken";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    if (secret) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    }
  });
};
