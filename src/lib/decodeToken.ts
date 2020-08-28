import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export default function decodeToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}
