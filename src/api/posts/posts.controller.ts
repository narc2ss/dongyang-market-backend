import { Context } from "koa";
import Post from "../../../models/post";

export const info = async (ctx: Context) => {
  let test = null;
  try {
    test = await Post.findAll({ limit: 10 });
    ctx.status = 200;
    ctx.body = test;
  } catch (error) {
    ctx.throw(500, error);
  }
};
