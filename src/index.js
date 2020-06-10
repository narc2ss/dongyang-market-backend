import dotenv from "dotenv";
import express from "express";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";

import api from "../api";
import db from "../models";
import { jwtMiddleware } from "../lib/token";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync();
// db.sequelize.sync({ force: true });

app.use(jwtMiddleware);
app.use("/api", api);

if (process.env.NODE_ENV === "development") {
  app.listen(4000, () => console.log(`server is running on port ${port}`));
}

export const handler = serverless(app);
