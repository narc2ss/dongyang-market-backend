import * as Router from "koa-router";
import {
  changePassword,
  changeNickname,
  changeProfileImage,
  withdraw,
} from "./user.controller";

const user = new Router();

user.patch("/password", changePassword);
user.patch("/nickname", changeNickname);
user.patch("/profile/image", changeProfileImage);
user.delete("/withdraw", withdraw);

export default user;
