import * as Router from "koa-router";
import { likePost } from "./like.controller";

const like = new Router();

like.post("/", likePost);

export default like;
