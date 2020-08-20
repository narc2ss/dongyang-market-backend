import { Context } from "koa";

export const changePassword = async (ctx: Context) => {
  ctx.body = "changed password";
};

export const changeNickname = async (ctx: Context) => {
  ctx.body = "changed nickname";
};

export const changeProfileImage = async (ctx: Context) => {
  ctx.body = "changed profile image";
};

export const withdraw = async (ctx: Context) => {
  ctx.body = "withdraw";
};
