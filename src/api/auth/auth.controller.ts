import { Context } from "koa";

export const localRegister = async (ctx: Context) => {
  ctx.body = "local register";
};

export const localLogin = async (ctx: Context) => {
  ctx.body = "local login";
};

export const exists = async (ctx: Context) => {
  ctx.body = "exists";
};

export const email = async (ctx: Context) => {
  ctx.body = "email";
};

export const logout = async (ctx: Context) => {
  ctx.body = "log out";
};
