import type { Request, Response } from "express";
import axios from "axios";
export async function getKlines(req: Request, res: Response) {
  let { interval, startTime, symbol } = req.body;
  console.log(startTime);
  console.log(interval);
  if (!symbol) {
    symbol = "SOL_USDC";
  }
  // const startTime = 1756517400
  // const interval = '1h'
  const response = await axios.get(
    `https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=${interval}&startTime=${Number(startTime)}`
  );
  //api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=15m&startTime=1759966200
  if (!response) {
    return res.json({
      message: "some error occurred",
    });
  }
  console.log("from klines :", response.data);
  return res.status(200).json({
    message: "fetched successfully",
    klines: response.data,
  });
}

// ticker controller
export async function getTickers(req: Request, res: Response) {
  const response = await axios.get(
    "https://api.backpack.exchange/api/v1/tickers?symbol=SOL_USDC_PERP"
  );
  const tickers = response.data;
  if (!tickers) {
    return res.status(400).json({
      message: "some error occurred",
    });
  }
  return res.status(200).json({
    message: "ticker fetched successfully",
    tickers,
  });
}
