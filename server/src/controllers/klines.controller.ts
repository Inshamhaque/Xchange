import type { Request, Response } from "express";
import axios from "axios";
export async function getKlines(req:Request,res:Response){
    const { interval,startTime } = req.body;
    const response = await axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC_PERP&interval=1h&startTime=1756517400`);
    if(!response){
        return res.json({
            message : "some error occurred",
        })
    }
    console.log(response.data);
    return res.status(200).json({
        message : "fetched successfully",
        klines : response.data
    })
}