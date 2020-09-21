import * as Router from "koa-router";

import { info, search, getSellList } from "./posts.controller";

const posts = new Router();

posts.get("/", info);
posts.get("/:keyword", search);
posts.get("/sell/:id", getSellList);

export default posts;
