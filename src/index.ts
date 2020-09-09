import bodyParser = require("koa-bodyparser");
import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as morgan from "koa-morgan";
import * as cors from "@koa/cors";
import * as http from "http";
import * as socketio from "socket.io";

import api from "./api";
import { sequelize } from "../models";
import { jwtMiddleware } from "./middleware";
import { callbackPromise } from "nodemailer/lib/shared";

dotenv.config();
const PORT = process.env.PORT || 4000;
const FRONT_SERVER = process.env.FRONT_SERVER;

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketio(server);
const router = new Router();

app.use(morgan("dev"));
app.use(cors({ origin: FRONT_SERVER, credentials: true }));
app.use(bodyParser());
sequelize
  .sync({ force: false })
  .then(() => console.log("Success to connected database"))
  .catch((err) => console.error(err));
app.use(jwtMiddleware);

router.use("/api", api.routes());

io.on("connection", (socket) => {
  console.log("----");
  socket.on("join", ({ postId, sellerId, userId }, callbackPromise) => {
    socket.emit("message", {
      user: "admin",
      text: "hello world~",
    });

    callbackPromise();
  });

  socket.on("disconnect", () => {
    console.log("user had left");
  });
});

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

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
