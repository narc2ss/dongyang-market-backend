import { Next } from "koa";

import { generateToken, decodeToken } from "../lib";

const jwtMiddleware = async (ctx: any, next: Next) => {
  const token = ctx.cookies.get("access_token");
  if (!token) {
    return next();
  }

  try {
    const decoded: any = await decodeToken(token);
    console.log("decoded", decoded);

    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { id, nickname } = decoded;
      const freshToken = await generateToken({ id, nickname });
      ctx.cookies.set("access_token", freshToken as string, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }

    ctx.request.user = decoded;
  } catch (e) {
    ctx.request.user = null;
  }

  return next();
};

export default jwtMiddleware;
