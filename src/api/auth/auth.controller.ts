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
  console.log(EMAIL_PASSWORD, EMAIL_ID, EMAIL_SERVICE);

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

  const emailCode = await generateCode();

  const mailOptions = {
    from: EMAIL_ID,
    to: email,
    subject: "nodemailer test",
    text: `
    안녕하세요 동양마켓 팀 입니다. 전송된 6자리 코드를 확인 후 이메일 인증 절차를 진행해주세요
    인증코드 : ${emailCode}
    `,
  };

  await smtpTransport.sendMail(mailOptions);
  ctx.status = 200;
};

export const logout = async (ctx: Context) => {
  ctx.body = "log out";
};
