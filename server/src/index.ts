import express from "express";
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { depthRouter } from "./routes/depth.route.js";
dotenv.config()
const app = express();
app.use(cors());

// depth route
app.use('/depth',depthRouter);

// TODO : make port from .env
app.listen(8080,()=>{
    console.log("server running at port 8080");
})