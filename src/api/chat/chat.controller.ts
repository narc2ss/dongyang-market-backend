import { Context } from "koa";

export const getChat = async (ctx: Context) => {
  ctx.body = "get chat";
};

export const saveMessage = async (ctx: Context) => {
  ctx.body = "save message";
};

export const deleteChat = async (ctx: Context) => {
  ctx.body = "delete chat";
};
