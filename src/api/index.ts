import * as Router from "koa-router";

import auth from "./auth";
import post from "./post";
import user from "./user";
import chat from "./chat";
import like from "./like";
import chats from "./chats";
import posts from "./posts";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/chat", chat.routes());
api.use("/chats", chats.routes());
api.use("/like", like.routes());
api.use("/post", post.routes());
api.use("/posts", posts.routes());
api.use("/user", user.routes());

export default api;
