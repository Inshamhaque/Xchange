import express from "express";
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { depthRouter } from "./routes/depth.route.js";
import { kLineRouter } from "./routes/klines.route.js";
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json())

// depth route
app.use('/depth',depthRouter);
app.use('/klines',kLineRouter);

// TODO : make port from .env
app.listen(8080,()=>{
    console.log("server running at port 8080");
})