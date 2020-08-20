import * as Router from "koa-router";
import { info } from "./chats.controller";

const chats = new Router();

chats.get("/", info);

export default chats;
