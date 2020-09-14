import * as Router from "koa-router";

import { info, search } from "./posts.controller";

const posts = new Router();

posts.get("/", info);
posts.get("/:keyword", search);

export default posts;
