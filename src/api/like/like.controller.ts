import { Context } from "koa";

export const likePost = async (ctx: Context) => {
  ctx.body = "like or unlike";
};
