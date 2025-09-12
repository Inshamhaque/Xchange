import express from 'express';
import { getKlines } from '../controllers/klines.controller.js';
export const kLineRouter = express.Router();
kLineRouter.post('/fetch',(req,res)=>{
    getKlines(req,res);
})