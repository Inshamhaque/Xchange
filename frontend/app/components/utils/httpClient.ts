import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { Ticker } from "./types";

const tickerdefault: Ticker = {
  firstPrice: "0",
  high: "0",
  lastPrice: "0",
  low: "0",
  priceChange: "0",
  priceChangePercent: "0",
  quoteVolume: "0",
  symbol: "0",
  trades: "0",
  volume: "0",
};

export async function getDepth() {
  const response = await axios.get(`${BACKEND_URL}/depth/fetch`);
  console.log(response.data.asks);
  return response.data;
}

export async function getKlines(market: string, interval: string) {
  try {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    // Calculate how far back to fetch based on interval
    // This ensures we get enough candles to display a proper chart
    const lookbackPeriods: Record<string, number> = {
      "1m": 500, // 500 minutes
      "5m": 300, // 1500 minutes
      "15m": 200, // 3000 minutes
      "1h": 168, // 168 hours (1 week)
      "4h": 180, // 720 hours (30 days)
      "1d": 90, // 90 days
      "1w": 52, // 52 weeks (1 year)
      "1M": 24, // 24 months (2 years)
    };

    const intervalSeconds: Record<string, number> = {
      "1m": 60,
      "5m": 300,
      "15m": 900,
      "1h": 3600,
      "4h": 14400,
      "1d": 86400,
      "1w": 604800,
      "1M": 2592000, // Approximate 30 days
    };

    const periods = lookbackPeriods[interval] || 100;
    const secondsPerCandle = intervalSeconds[interval] || 3600;

    // Calculate start time: go back enough to get the desired number of candles
    const startTime = now - periods * secondsPerCandle;

    console.log(
      `Fetching ${interval} klines from ${new Date(startTime * 1000).toISOString()}`
    );

    const response = await axios.post(`${BACKEND_URL}/klines/fetch`, {
      interval,
      startTime,
      endTime: now, // Explicitly set end time to now
    });

    console.log(
      `Received ${response.data.klines?.length || 0} klines for ${interval}`
    );
    return response.data.klines;
  } catch (error) {
    console.error("Error fetching klines:", error);
    return [];
  }
}

// get all the tickers
async function getTickers(): Promise<Ticker[]> {
  try {
    const response = await axios.get(`${BACKEND_URL}/klines/ticker`);
    return response.data.tickers;
  } catch (e) {
    console.error("Error fetching tickers:", e);
    return [];
  }
}

// filter the ticker which matches the symbol
// TODO : improve the type return
export async function getTicker(): Promise<Ticker> {
  const tickers = await getTickers();
  const ticker: Ticker =
    tickers.find((t) => t.symbol == "SOL_USDC_PERP") ?? tickerdefault;
  console.log("ticker from the http client is : ", ticker);
  return ticker;
}
