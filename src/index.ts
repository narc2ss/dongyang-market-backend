import bodyParser = require("koa-bodyparser");
import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as morgan from "koa-morgan";
import * as cors from "@koa/cors";
import * as serve from "koa-static";
import * as path from "path";
import * as fs from "fs";
import * as send from "koa-send";

import api from "./api";
import { sequelize } from "../models";
import { jwtMiddleware } from "./middleware";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = new Router();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser());
sequelize
  .sync({ force: false })
  .then(() => console.log("Success to connected database"))
  .catch((err) => console.error(err));
app.use(jwtMiddleware);

router.use("/api", api.routes());

app.use(router.routes()).use(router.allowedMethods());

// # SSR 작업
// const indexHtml = fs.readFileSync(
//   path.resolve(__dirname, "../public/index.html"),
//   { encoding: "utf8" }
// );

// app.use(serve(path.resolve(__dirname, "../public")));

// app.use((ctx) => {
//   ctx.body = indexHtml;
// 오류나면 아래꺼 지우기 ( 404 페이지 띄우기 )
// if (ctx.status === 404)
//   await send(ctx, "index.html", { root: __dirname + "/public" });
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
