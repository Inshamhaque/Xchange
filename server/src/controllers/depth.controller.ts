import axios from "axios"
import type { Request, Response } from "express";
export async function getDepth(req:Request, res:Response){
    const response = await axios.get('https://api.backpack.exchange/api/v1/depth?symbol=SOL_USDC_PERP');
    const slicedAsks = response.data.asks.slice(0,20);
    const slicedBids = response.data.bids.slice(0,20);
    return res.json({
        message : "Depth fetched succesfully",
        asks : slicedAsks, 
        bids : slicedBids
    })
}