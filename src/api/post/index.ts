import * as Router from "koa-router";

import { createPost, getPost, editPost, deletePost } from "./post.controller";

const post = new Router();

post.post("/", createPost);
post.get("/:id", getPost);
post.patch("/", editPost);
post.delete("/:id", deletePost);

export default post;
