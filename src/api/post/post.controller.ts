import { Context } from "koa";

export const createPost = async (ctx: Context) => {
  ctx.body = "craete post";
};

export const getPost = async (ctx: Context) => {
  ctx.body = "get post";
};

export const editPost = async (ctx: Context) => {
  ctx.body = "edit post";
};

export const deletePost = async (ctx: Context) => {
  ctx.body = "delete post";
};
