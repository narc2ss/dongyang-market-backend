import * as Router from "koa-router";
import {
  localRegister,
  localLogin,
  check,
  logout,
  email,
} from "./auth.controller";

const auth = new Router();

auth.post("/register/local", localRegister);
auth.post("/login/local", localLogin);
auth.get("/check", check);
auth.get("/email", email);
auth.post("/logout", logout);

export default auth;
