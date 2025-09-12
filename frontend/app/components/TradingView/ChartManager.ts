import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private lastUpdateTime: number = 0;
  private chart: ReturnType<typeof createLightWeightChart>;
  private currentBar: {
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
  } = {
    open: null,
    high: null,
    low: null,
    close: null,
  };

  constructor(
    ref: HTMLDivElement,
    initialData: {
      timestamp: number;
      open: number;
      high: number;
      low: number;
      close: number;
    }[],
    layout: { background: string; color: string }
  ) {
    this.chart = createLightWeightChart(ref, {
      autoSize: true,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
      },
      grid: {
        horzLines: { visible: false },
        vertLines: { visible: false },
      },
      layout: {
        background: { type: ColorType.Solid, color: layout.background },
        textColor: layout.color,
      },
    });

    this.candleSeries = this.chart.addCandlestickSeries({
      upColor: "#4ade80",
      borderUpColor: "#4ade80",
      wickUpColor: "#4ade80",
      downColor: "#ef4444",
      borderDownColor: "#ef4444",
      wickDownColor: "#ef4444",
    });

    this.candleSeries.setData(
      initialData.map((d) => ({
        time: (d.timestamp / 1000) as UTCTimestamp,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))
    );
  }

  public update(updatedPrice: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    newCandleInitiated?: boolean;
  }) {
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = updatedPrice.time;
    }

    this.candleSeries.update({
      time: (this.lastUpdateTime / 1000) as UTCTimestamp,
      open: updatedPrice.open,
      high: updatedPrice.high,
      low: updatedPrice.low,
      close: updatedPrice.close,
    });

    if (updatedPrice.newCandleInitiated) {
      this.lastUpdateTime = updatedPrice.time;
    }
  }

  public destroy() {
    this.chart.remove();
  }
}
