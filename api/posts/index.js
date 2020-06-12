import express from "express";

const posts = express.Router();

import { getTopPosts, userPostList } from "./posts.controller";

posts.get("/", getTopPosts);
posts.get("/:id", userPostList);

export default posts;
