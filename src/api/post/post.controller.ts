import { Context } from "koa";
import Post from "../../../models/post";

export const createPost = async (ctx: Context) => {
  const { seller, title, price, description } = ctx.request.body;
  let post = null;

  try {
    post = await Post.create({
      seller,
      title,
      price,
      description,
    });
    ctx.status = 201;
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const getPost = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    const post = await Post.findOne({
      where: {
        id,
      },
    });
    ctx.status = 200;
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const editPost = async (ctx: Context) => {
  ctx.body = "edit post";
};

export const deletePost = async (ctx: Context) => {
  ctx.body = "delete post";
};
