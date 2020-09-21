import { Context } from "koa";
import Post from "../../../models/post";
import { Op } from "sequelize";

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

export const search = async (ctx: Context) => {
  const { keyword } = ctx.params;

  try {
    const posts = await Post.findAll({
      where: { title: { [Op.like]: `%${keyword}%` } },
    });

    ctx.status = 200;
    ctx.body = posts;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const getSellList = async (ctx: Context) => {
  console.log("sell");
  const { id } = ctx.params;
  
  try {
    const sellList = await Post.findAll({
      where: {
        UserId: id,
        status: "0",
      },
    });
    ctx.status = 200;
    ctx.body = sellList;
  } catch (error) {
    ctx.throw(500, error);
  }
};
