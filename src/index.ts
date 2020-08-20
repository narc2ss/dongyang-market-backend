import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as Router from "koa-router";
import api from "./api";
import morgan = require("koa-morgan");

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = new Router();

app.use(morgan("dev"));
app.use(router.routes()).use(router.allowedMethods());

router.use("/api", api.routes());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
