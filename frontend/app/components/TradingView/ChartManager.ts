import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private volumeSeries: ISeriesApi<"Histogram">;
  private volumeSMA: ISeriesApi<"Line">;
  private chart: any;

  constructor(
    ref: HTMLElement,
    initialData: any[],
    layout: { background: string; color: string }
  ) {
    const chart = createLightWeightChart(ref, {
      autoSize: true,
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "#3f3f46",
          width: 1,
          style: 1,
          labelBackgroundColor: "#1f2937",
        },
        horzLine: {
          color: "#3f3f46",
          width: 1,
          style: 1,
          labelBackgroundColor: "#1f2937",
        },
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        borderColor: "#2d3748",
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        borderColor: "#2d3748",
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: {
          color: "#1a1a1a",
          style: 1,
        },
        horzLines: {
          color: "#1a1a1a",
          style: 1,
        },
      },
      layout: {
        background: { type: ColorType.Solid, color: layout.background },
        textColor: layout.color,
      },
    });

    this.chart = chart;

    // Main candles
    this.candleSeries = chart.addCandlestickSeries({
      priceScaleId: "right",
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const candleData = initialData.map((data) => ({
      time: (data.timestamp.getTime() / 1000) as UTCTimestamp,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    }));

    this.candleSeries.setData(candleData);

    // Volume
    this.volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
      scaleMargins: { top: 0.7, bottom: 0 },
    });

    const volumeData = initialData.map((data) => ({
      time: (data.timestamp.getTime() / 1000) as UTCTimestamp,
      value: data.volume,
      color:
        data.close >= data.open
          ? "rgba(34, 197, 94, 0.3)"
          : "rgba(239, 68, 68, 0.3)",
    }));

    this.volumeSeries.setData(volumeData);

    // Volume SMA (20-period)
    this.volumeSMA = chart.addLineSeries({
      color: "#f59e0b",
      lineWidth: 2,
      priceScaleId: "volume",
      lastValueVisible: false,
      priceLineVisible: false,
    });

    const smaData = this.calculateSMA(volumeData, 20);
    if (smaData.length > 0) {
      this.volumeSMA.setData(smaData);
    }

    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.7, bottom: 0 },
    });

    // Fit content nicely
    chart.timeScale().fitContent();
  }

  private calculateSMA(
    data: { time: UTCTimestamp; value: number }[],
    period: number
  ) {
    const sma: { time: UTCTimestamp; value: number }[] = [];

    if (data.length < period) {
      return sma;
    }

    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const avg = slice.reduce((sum, item) => sum + item.value, 0) / period;
      sma.push({ time: data[i].time, value: avg });
    }

    return sma;
  }

  public destroy() {
    if (this.chart) {
      this.chart.remove();
      this.chart = null;
    }
  }
}
