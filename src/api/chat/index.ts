import * as Router from "koa-router";
import { saveMessage, getChat, deleteChat } from "./chat.controller";

const chat = new Router();

chat.get("/", getChat);

export default chat;
