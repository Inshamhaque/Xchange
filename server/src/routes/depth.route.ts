import express from 'express';
import { getDepth } from '../controllers/depth.controller.js';
export const depthRouter = express.Router();
depthRouter.get('/fetch',(req,res)=>{
    getDepth(req,res);
})