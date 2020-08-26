import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as morgan from "koa-morgan";

import api from "./api";
import { sequelize } from "../models";
import bodyParser = require("koa-bodyparser");

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = new Router();

app.use(morgan("dev"));
app.use(bodyParser());
sequelize
  .sync({ force: false })
  .then(() => console.log("Success to connected database"))
  .catch((err) => console.error(err));

router.use("/api", api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
