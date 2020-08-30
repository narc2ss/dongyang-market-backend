import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

import User from "../../models/user";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export type Payload = {
  id: number;
  nickname: string;
};

export default function generateToken(payload: Payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { ...payload },
      jwtSecret,
      {
        expiresIn: "7d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}
