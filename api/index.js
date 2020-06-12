import express from "express";
import auth from "./auth";
import post from "./post";
import posts from "./posts";

const api = express.Router();

api.use("/auth", auth);
api.use("/post", post);
api.use("/posts", posts);

export default api;
