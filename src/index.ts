import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as Router from "koa-router";
import api from "./api";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
