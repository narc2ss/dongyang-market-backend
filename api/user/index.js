import express from "express";
import app from "../../src";

import {
  changePassword,
  updateProfileImage,
  withdrawal,
} from "./user.controller";

const user = express.Router();

user.patch("/password/:id", changePassword);
user.patch("/profileImage/:id", updateProfileImage);
user.delete("/:id", withdrawal);

export default user;
