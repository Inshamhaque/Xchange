"use client";

import { useEffect, useRef, useState } from "react";
import { ChartManager } from "./ChartManager";
import { getKlines } from "../utils/httpClient";

export default function CandleChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ChartManager | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Set mounted after component is rendered on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !chartRef.current) return; // wait for div to mount

    let isActive = true;

    async function loadData() {
      try {
        const res = await getKlines();
        if (!res || !res.klines || !isActive) return;

        const formattedData = res.klines.map((d: any) => ({
          time: Math.floor(new Date(d.start).getTime() / 1000),
          open: parseFloat(d.open),
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          close: parseFloat(d.close),
        }));

        chartInstance.current = new ChartManager(chartRef.current!, formattedData, {
          background: "#0f172a",
          color: "white",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading candles:", err);
      }
    }

    loadData();

    return () => {
      isActive = false;
      chartInstance.current?.destroy();
    };
  }, [isMounted]); // only run after mount

  if (loading) return <div className="text-white p-4">Loading chart...</div>;

  return <div ref={chartRef} style={{ width: "100%", height: "600px" }} />;
}
