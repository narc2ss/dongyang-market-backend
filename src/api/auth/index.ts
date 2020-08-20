import * as Router from "koa-router";
import {
  localRegister,
  localLogin,
  exists,
  logout,
  email,
} from "./auth.controller";

const auth = new Router();

auth.post("/register/local", localRegister);
auth.post("/login/local", localLogin);
auth.get("/exists/:key(email|username)/:value", exists);
auth.post("/email", email);
auth.post("/logout", logout);

export default auth;
