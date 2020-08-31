import { Context } from "koa";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";

import User from "../../../models/user";
import { generateToken, generateCode } from "../../lib";

dotenv.config();

export const localRegister = async (ctx: Context) => {
  const { nickname, email, password } = ctx.request.body;

  try {
    const existsUser = await User.findOne({
      where: { nickname },
    });
    if (existsUser) {
      ctx.status = 409;
      ctx.body = { result: "이미 사용중인 닉네임입니다." };
      return;
    }

    const existsEmail = await User.findOne({
      where: { email },
    });
    if (existsEmail) {
      ctx.status = 409;
      ctx.body = { result: "이미 사용중인 이메일입니다." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const account = await User.create({
      nickname,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: account.id,
      nickname: account.nickname,
    };
    const token = await generateToken(payload);
    ctx.cookies.set("access_token", token as string, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.status = 201;
  ctx.body = { result: "회원가입이 완료되었습니다." };
  return;
};

export const localLogin = async (ctx: Context) => {
  const { nickname, password } = ctx.request.body;
  let account = null;
  let payload = null;

  try {
    account = await User.findOne({
      where: { nickname },
    });
    if (!account) {
      ctx.status = 400;
      ctx.body = { result: "존재하지 않는 사용자입니다." };
      return;
    }

    const validatePassword = await bcrypt.compare(password, account.password);
    if (!validatePassword) {
      ctx.status = 403;
      ctx.body = { result: "비밀번호가 일치하지 않습니다." };
      return;
    }

    const token = await generateToken(payload);
    ctx.cookies.set("access_token", token as string, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    payload = {
      id: account.id,
      nickname: account.nickname,
      access_token: token,
    };
  } catch (error) {
    ctx.throw(500, error);
  }

  ctx.status = 200;
  ctx.body = payload;
  return;
};

export const check = async (ctx: any) => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    return;
  }

  ctx.status = 200;
  ctx.body = user;
  return;
};

export const email = async (ctx: Context) => {
  const { email } = ctx.request.body;
  const { EMAIL_SERVICE, EMAIL_ID, EMAIL_PASSWORD } = process.env;
  const code = await generateCode();
  try {
    const smtpTransport = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `동양마켓 <${EMAIL_ID}>`,
      to: email,
      subject: "동양마켓 이메일 인증",
      html: `
        <h1 style="font-family: sans-serif;">안녕하세요 동양마켓 입니다.</h1>
        <p style="font-family: sans-serif;">전송된 6자리 코드를 확인 후 이메일 인증 절차를 진행해주세요</p>
        <p style="font-family: sans-serif;">${code}</p>
      `,
    };
    await smtpTransport.sendMail(mailOptions);
    smtpTransport.close();
  } catch (error) {
    ctx.throw(500, error);
  }

  ctx.status = 200;
  ctx.body = { result: code };
};

export const logout = async (ctx: Context) => {
  ctx.cookies.set("access_token", null, {
    maxAge: 0,
    httpOnly: true,
  });
  ctx.status = 204;
  ctx.body = { result: "로그아웃 되었습니다." };
  return;
};
