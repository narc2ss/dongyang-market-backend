import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as Router from "koa-router";

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(async (ctx: { body: string }, next: () => void) => {
  const msg: string = "dongyang market";
  ctx.body = msg;
  next();
});

router.post("/api/auth/login", (ctx: Koa.Context) => {
  ctx.body = "login";
});

app.use(router.routes());

app.listen(process.env.PORT, () =>
  console.log("start koa server at http://localhost:4000")
);
