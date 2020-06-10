import express from "express";
import auth from "./auth";

const api = express.Router();

api.use("/auth", auth);

export default api;
