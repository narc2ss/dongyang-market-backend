import "@babel/polyfill";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import api from "../api";
import db from "../models";
import { jwtMiddleware } from "../lib/token";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  db.sequelize.sync();
  // db.sequelize.sync({ force: true });
} else {
  db.sequelize.sync({ force: true });
}

app.use(jwtMiddleware);
app.use("/api", api);

app.listen(4000, () => console.log(`server is running on port ${port}`));

export default app;
