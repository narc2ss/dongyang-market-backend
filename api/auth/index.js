import express from "express";

import {
  emailConfirm,
  register,
  login,
  exists,
  logout,
  check,
} from "./auth.controller";

const auth = express.Router();

auth.post("/emailConfirm", emailConfirm);

auth.post("/register", register);

auth.post("/login", login);

auth.get("/check", check);

auth.get("/exists/:key(userEmail|userId)/:value", exists);

auth.post("/logout", logout);

export default auth;
