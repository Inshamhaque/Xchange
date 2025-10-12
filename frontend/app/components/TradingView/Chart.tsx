import { useEffect, useRef, useState } from "react";
import { ChartManager } from "./ChartManager";
import { getKlines } from "../utils/httpClient";
import { Klines } from "../utils/types";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d", "1w", "1M"];

export function TradeView({ market }: { market: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d");
  const [loading, setLoading] = useState(false);

  const initChart = async () => {
    if (!chartRef.current) return;

    setLoading(true);
    let klineData: Klines[] = [];

    try {
      klineData = await getKlines(market, selectedTimeframe);
      console.log(
        `Fetched ${selectedTimeframe} data:`,
        klineData?.length || 0,
        "candles"
      );
    } catch (err) {
      console.error("Error fetching klines:", err);
    } finally {
      setLoading(false);
    }

    // Clean up previous chart
    if (chartManagerRef.current) {
      chartManagerRef.current.destroy();
      chartManagerRef.current = null;
    }

    // Check if we have valid data
    if (!klineData || klineData.length === 0) {
      console.warn("No kline data received");
      return;
    }

    // Sort data oldest -> newest
    const sortedData = klineData
      .map((x) => ({
        close: parseFloat(x.close),
        high: parseFloat(x.high),
        low: parseFloat(x.low),
        open: parseFloat(x.open),
        volume: parseFloat(x.volume),
        timestamp: new Date(x.end),
      }))
      .sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1));

    console.log(`Creating chart with ${sortedData.length} candles`);
    console.log(
      `Date range: ${sortedData[0]?.timestamp.toISOString()} to ${sortedData[sortedData.length - 1]?.timestamp.toISOString()}`
    );

    // Create new chart
    const chartManager = new ChartManager(chartRef.current, sortedData, {
      background: "#000000",
      color: "white",
    });

    chartManagerRef.current = chartManager;
  };

  useEffect(() => {
    initChart();

    // Cleanup on unmount
    return () => {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
        chartManagerRef.current = null;
      }
    };
  }, [market, selectedTimeframe]);

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex space-x-2">
          {TIMEFRAMES.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTimeframe(t)}
              disabled={loading}
              className={`px-2 py-1 text-sm rounded-md border ${
                selectedTimeframe === t
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        {loading && <div className="text-gray-400 text-sm">Loading...</div>}
      </div>
      <div
        ref={chartRef}
        style={{ height: "520px", width: "100%", marginTop: 4 }}
      />
    </div>
  );
}
