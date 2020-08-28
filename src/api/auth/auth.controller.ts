import { Context } from "koa";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";

import User from "../../../models/user";
import generateCode from "../../lib";

dotenv.config();

export const localRegister = async (ctx: Context) => {
  const { nickname, email, password } = ctx.request.body;
  try {
    const existsUser = await User.findOne({
      where: { nickname },
    });
    const existsEmail = await User.findOne({
      where: { email },
    });
    if (existsUser) {
      ctx.status = 409;
      ctx.body = "이미 사용중인 아이디입니다.";
      return;
    }
    if (existsEmail) {
      ctx.status = 409;
      ctx.body = "이미 사용중인 이메일입니다.";
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      nickname,
      email,
      password: hashedPassword,
    });
    ctx.status = 201;
    ctx.body = "회원가입이 완료되었습니다.";
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const localLogin = async (ctx: Context) => {
  ctx.body = "local login";
};

export const exists = async (ctx: Context) => {
  ctx.body = "exists";
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
  ctx.body = "log out";
};
