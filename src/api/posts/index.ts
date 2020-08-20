import * as Router from "koa-router";

import { info } from "./posts.controller";

const posts = new Router();

posts.get("/", info);

export default posts;
