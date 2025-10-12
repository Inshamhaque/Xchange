import solana from "@/assets/solana.png";
import Image from "next/image";
import { Ticker } from "./utils/types";
import { useEffect, useState } from "react";
import { getTicker } from "./utils/httpClient";

export const MarketBar = () => {
  const [ticker, setTicker] = useState<Ticker>();

  useEffect(() => {
    getTicker().then((data) => {
      setTicker(data);
    });
  }, []);

  return (
    <div className="flex py-3 space-x-4">
      <div className="ml-2 bg-baseBackgroundL2 rounded-lg px-2 ">
        <TickerComponent />
      </div>
      <div className="rounded-lg bg-baseBackgroundL2 px-2  flex items-center flex-row space-x-8 ">
        <div className="flex flex-col h-full justify-center">
          <p
            className={`font-medium tabular-nums text-baseTextHighEmphasis text-md text-green-500`}
          >
            {ticker?.lastPrice}
          </p>
          <p className="font-medium text-baseTextHighEmphasis text-sm text-sm tabular-nums">
            ${ticker?.lastPrice}
          </p>
        </div>
        <div className="flex flex-col">
          <p className={`font-medium text-xs text-slate-400 text-sm`}>
            24H Change
          </p>
          <p
            className={` text-sm font-medium tabular-nums leading-5 text-sm text-greenText ${Number(ticker?.priceChange) > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {Number(ticker?.priceChange) > 0 ? "+" : ""} {ticker?.priceChange}{" "}
            {Number(ticker?.priceChangePercent)?.toFixed(2)}%
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-xs text-slate-400 text-sm">24H High</p>
          <p className="text-sm font-medium text-baseTextHighEmphasis tabular-nums leading-5 text-sm ">
            {ticker?.high}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-xs text-slate-400 text-sm">24H Low</p>
          <p className="text-sm font-medium  text-baseTextHighEmphasis tabular-nums leading-5 text-sm ">
            {ticker?.low}
          </p>
        </div>
        <button
          type="button"
          className="font-medium transition-opacity hover:opacity-80 hover:cursor-pointer text-base text-left"
          data-rac=""
        >
          <div className="flex flex-col">
            <p className="font-medium text-xs text-slate-400 text-sm">
              24H Volume(USD)
            </p>
            <p className="mt-1 text-sm font-medium text-baseTextHighEmphasis tabular-nums leading-5 text-sm ">
              {ticker?.volume}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
const TickerComponent = () => {
  return (
    <div className="flex h-[60px] shrink-0 space-x-4">
      <div className="flex flex-row relative ml-2 -mr-4">
        <img
          alt="SOL Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="z-10 rounded-full h-6 w-6 mt-4 outline-baseBackgroundL1"
          src="/sol.webp"
        />
        <img
          alt="USDC Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="h-6 w-6 -ml-2 mt-4 rounded-full"
          src="/usdc.webp"
        />
      </div>
      <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
          <div className="flex items-center flex-row gap-2 undefined">
            <div className="flex flex-row relative">
              <p className="font-medium text-white text-sm undefined">
                SOL/USDC
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
