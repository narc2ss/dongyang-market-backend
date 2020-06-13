import express from "express";

import { createPost, getPost, updatePost, deletePost } from "./post.controller";

const post = express();

post.post("/", createPost);
post.get("/", getPost);
post.patch("/", updatePost);
post.delete("/", deletePost);

export default post;
