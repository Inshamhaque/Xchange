import express from "express";
import { getKlines, getTickers } from "../controllers/klines.controller.js";
export const kLineRouter = express.Router();
kLineRouter.post("/fetch", (req, res) => {
  getKlines(req, res);
});
kLineRouter.get("/ticker", (req, res) => {
  getTickers(req, res);
});
