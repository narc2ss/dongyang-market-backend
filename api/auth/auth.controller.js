import Joi from "joi";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import db from "../../models";
import { generateToken } from "../../lib/token";
import generateCode from "../../lib/emailAuth";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { reqUserId, reqUserPassword, reqUserEmail } = req.body;

    const schema = await Joi.object().keys({
      reqUserId: Joi.string().alphanum().min(4).max(15).required(),
      reqUserPassword: Joi.string().required().min(6).required(),
      reqUserEmail: Joi.string().email().required(),
    });
    const result = Joi.validate(req.body, schema);

    if (result.error)
      return res.status(400).json({ result: "데이터가 올바르지 않습니다." });

    const existsUserEmail = await db.User.findOne({
      where: {
        userEmail: reqUserEmail,
      },
    });
    const existsUserId = await db.User.findOne({
      where: {
        userId: reqUserId,
      },
    });

    if (existsUserEmail)
      return res.status(403).json({ result: "이미 사용중인 이메일 입니다." });
    if (existsUserId)
      return res.status(403).json({ result: "이미 사용중인 아이디 입니다." });

    const hashedPassword = await bcrypt.hash(reqUserPassword, 10);

    db.User.create({
      userId: reqUserId,
      userPassword: hashedPassword,
      userEmail: reqUserEmail,
      userProfileImage: null,
    });

    let token = null;
    try {
      token = await generateToken({ reqUserId });
    } catch (e) {
      return res.status(500).json({ result: "server error" });
    }

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({
      result: "회원가입이 완료되었습니다.",
    });
  } catch (error) {
    next(error);
  }
};

export const emailConfirm = async (req, res) => {
  const { reqUserEmail } = req.body;

  const emailService = process.env.EMAIL_SERVICE;
  const emailId = process.env.EMAIL_ID;
  const emailPassword = process.env.EMAIL_PASSWORD;

  const smtpTransport = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailId,
      pass: emailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailCode = await generateCode();

  const mailOptions = {
    from: emailId,
    to: reqUserEmail,
    subject: "nodemailer test",
    text: `
    안녕하세요 동양마켓 팀 입니다. 전송된 6자리 코드를 확인 후 이메일 인증 절차를 진행해주세요
    인증코드 : ${emailCode}
    `,
  };

  await smtpTransport.sendMail(mailOptions, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      const { accepted } = result;
      res.status(200).json({ accepted, emailCode });
    }
    smtpTransport.close();
  });
};

export const login = async (req, res) => {
  const { reqUserId, reqUserPassword } = req.body;

  const schema = await Joi.object().keys({
    reqUserId: Joi.string().required(),
    reqUserPassword: Joi.string().required().min(6).required(),
  });
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).json({ result: "데이터가 올바르지 않습니다." });

  let account = null;

  try {
    account = await db.User.findOne({
      where: {
        userId: reqUserId,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
  if (!account)
    return res.status(403).json({ result: "존재하지 않는 아이디 입니다." });

  const { id, userId, userPassword, userProfileImage } = account;
  const validatePassword = await bcrypt.compare(reqUserPassword, userPassword);
  if (!validatePassword)
    return res.status(403).json({ result: "비밀번호가 일치하지 않습니다." });

  let token = null;
  try {
    token = await generateToken({ userId });
  } catch (e) {
    console.error(e);
    next(e);
  }

  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res
    .status(200)
    .json({ id, userId, userProfileImage })
    .redirect(`${process.env.FRONT_URL}`);
};

export const exists = async (req, res) => {
  const { key, value } = req.params;

  let account = null;
  try {
    account = await (key === "userEmail"
      ? db.User.findOne({ where: { userEmail: value } })
      : db.User.findOne({ where: { userId: value } }));
  } catch (error) {
    res.status(500).json({ result: error });
  }
  if (!account) res.json({ message: "사용자가 존재하지 않습니다." });

  const { userId, userProfileImage } = account;
  res.status(200).json({
    result: {
      userId,
      userProfileImage,
    },
  });
};

export const logout = async (req, res) => {
  res.cookie("access_token", null, {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(204).json({ result: "로그아웃 하셨습니다." });
};

export const check = (req, res) => {
  const { user } = req;

  if (!user) {
    res.send("로그인이 필요한 서비스 입니다.");
    return;
  }

  res.status(200).json({ user });
};
