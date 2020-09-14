import { Context } from "koa";
import Post from "../../../models/post";
import User from "../../../models/user";

export const createPost = async (ctx: Context) => {
  const { seller, title, price, description } = ctx.request.body;
  let post = null;

  try {
    post = await Post.create({
      UserId: seller,
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
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
      attributes: [
        "id",
        "title",
        "price",
        "description",
        "status",
        "createdAt",
        "updatedAt",
      ],
      where: {
        id,
      },
    });
    console.log(post);
    ctx.status = 200;
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const editPost = async (ctx: Context) => {
  const { id, seller, title, price, status, description } = ctx.request.body;

  try {
    await Post.update({ title, price, status, description }, { where: { id } });
    ctx.status = 200;
    ctx.body = { result: "게시글이 성공적으로 수정되었습니다." };
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const deletePost = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    await Post.destroy({ where: { id } });
    // 요청을 성공적으로 수행 후 리소스 반환 X
    ctx.status = 204;
    ctx.body = { result: "게시글이 성공적으로 삭제되었습니다." };
  } catch (error) {
    ctx.throw(500, error);
  }
};
