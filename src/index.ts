import * as Koa from "koa";
const app = new Koa();

app.use(async (ctx: { body: string }, next: () => void) => {
  const msg: string = "dongyang market";
  ctx.body = msg;
  next();
});

app.listen(4000, () =>
  console.log("start koa server at http://localhost:4000")
);
