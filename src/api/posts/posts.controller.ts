import { Context } from "koa";

export const info = async (ctx: Context) => {
  ctx.body = "posts info";
};
