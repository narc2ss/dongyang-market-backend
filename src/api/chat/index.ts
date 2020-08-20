import * as Router from "koa-router";
import { saveMessage, getChat, deleteChat } from "./chat.controller";

const chat = new Router();

chat.get("/:id", getChat);
chat.post("/", saveMessage);
chat.delete("/", deleteChat);

export default chat;
