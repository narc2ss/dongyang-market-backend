import User, { associate as associateUser } from "./user";
import Post, { associate as associatePost } from "./post";
export * from "./sequelize";

const db = {
  User,
  Post,
};

export type dbType = typeof db;

associateUser(db);
